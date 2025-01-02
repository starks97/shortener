use actix_web::HttpRequest;
use actix_web::{
    cookie::{time::Duration as ActixWebDuration, Cookie},
    get, post, web, HttpResponse, Responder,
};
use uuid::Uuid;

use validator::Validate;

use crate::models::user::{LoginUserSchema, RegisterUserSchema, User};

use super::reponse::{filter_user_record, UserResponse};

use crate::app_state::AppState;

use crate::jwt_token::token::{generate_jwt_token, verify_jwt_token};

use argon2::{
    password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Argon2,
};

use redis::AsyncCommands;

use crate::jwt_auth::JwtMiddleware;

use crate::custom_error::{handle_validation_error, CustomError, CustomHttpError};

#[post("/auth/login")]
pub async fn login(
    body: web::Json<LoginUserSchema>,
    data: web::Data<AppState>,
) -> Result<HttpResponse, CustomError> {
    let is_valid = body.validate();

    if let Err(validation_error) = is_valid {
        return handle_validation_error(validation_error);
    }

    let user = match sqlx::query_as!(
        User,
        r#"SELECT * FROM "users" WHERE email = $1"#,
        body.email.to_string()
    )
    .fetch_optional(&data.db)
    .await
    {
        Ok(user) => {
            if let Some(user) = user {
                user
            } else {
                print!("user not found");
                return Err(CustomError::HttpError(CustomHttpError::UserNotFound));
            }
        }
        Err(e) => {
            print!("there is not a client with that");
            return Err(CustomError::DataBaseError(e));
        }
    };

    let is_valid = PasswordHash::new(&user.password)
        .and_then(|parsed_hash| {
            Argon2::default().verify_password(body.password.as_bytes(), &parsed_hash)
        })
        .map_or(false, |_| true);

    if !is_valid {
        return Err(CustomError::HttpError(
            CustomHttpError::CredentialsNotCorrect,
        ));
    }

    let access_token_details = generate_jwt_token(
        user.id,
        data.secrets.access_token_max_age,
        data.secrets.access_token_private_key.to_owned(),
    )
    .map_err(|err| CustomError::OtherError(err.to_string()))?;

    let refresh_token_details = generate_jwt_token(
        user.id,
        data.secrets.refresh_token_max_age,
        data.secrets.refresh_token_private_key.to_owned(),
    )
    .map_err(|err| CustomError::OtherError(err.to_string()))?;

    let mut redis_client = data
        .redis_client
        .get_async_connection()
        .await
        .map_err(CustomError::RedisError)?;

    let access_result: redis::RedisResult<()> = redis_client
        .set_ex(
            access_token_details.token_uuid.to_string(),
            user.id.to_string(),
            (data.secrets.access_token_max_age * 60) as usize,
        )
        .await;

    if let Err(e) = access_result {
        println!("something happened to access to redis: {:?}", e);
        return Err(CustomError::HttpError(CustomHttpError::InternalServerError));
    }

    let refresh_result: redis::RedisResult<()> = redis_client
        .set_ex(
            refresh_token_details.token_uuid.to_string(),
            user.id.to_string(),
            (data.secrets.refresh_token_max_age * 60) as usize,
        )
        .await;

    if let Err(e) = refresh_result {
        print!("something happened to access to redis: {:?}", e);
        return Err(CustomError::HttpError(CustomHttpError::RedisProblem));
    }

    let refresh_cookie = Cookie::build(
        "refresh_token",
        refresh_token_details.token.clone().unwrap(),
    )
    .path("/")
    .max_age(ActixWebDuration::seconds(
        data.secrets.refresh_token_max_age * 60,
    ))
    .http_only(true)
    .domain(data.secrets.domain.clone())
    .secure(cfg!(not(debug_assertions)))
    .same_site(actix_web::cookie::SameSite::None)
    .finish();

    Ok(HttpResponse::Ok()
        .cookie(refresh_cookie)
        .json(serde_json::json!({"status": "success", "data": { "access_token": access_token_details.token.unwrap() }})))
}

#[post("/auth/register")]
pub async fn register(
    body: web::Json<RegisterUserSchema>,
    data: web::Data<AppState>,
) -> Result<HttpResponse, CustomError> {
    let is_valid = body.validate();

    if let Err(validation_error) = is_valid {
        return handle_validation_error(validation_error);
    }

    match sqlx::query_as!(
        User,
        r#"SELECT * FROM "users" WHERE email = $1"#,
        body.email.to_string(),
    )
    .fetch_optional(&data.db)
    .await
    {
        Ok(user) => {
            if user.is_some() {
                return Err(CustomError::HttpError(CustomHttpError::UserAlreadyExists));
            }
        }
        Err(e) => {
            println!("Error occurred while querying the database");
            return Err(CustomError::DataBaseError(e));
        }
    }

    let salt = SaltString::generate(&mut OsRng);
    let hash_pass = Argon2::default()
        .hash_password(body.password.as_bytes(), &salt)
        .expect("Error hashing password")
        .to_string();

    match sqlx::query_as!(
        User,
        r#"INSERT INTO "users" (name, email, password) VALUES ($1, $2, $3) RETURNING *"#,
        body.name.to_string(),
        body.email.to_string().to_lowercase(),
        hash_pass
    )
    .fetch_one(&data.db)
    .await
    {
        Ok(user) => Ok(HttpResponse::Ok().json(UserResponse {
            status: "success".to_string(),
            data: filter_user_record(&user),
        })),
        Err(e) => {
            println!("Error occurred while querying the database");
            Err(CustomError::DataBaseError(e))
        }
    }
}

#[get("/auth/refresh")]
async fn refresh_access_token(
    req: HttpRequest,
    data: web::Data<AppState>,
) -> Result<HttpResponse, CustomError> {
    let refresh_token = match req.cookie("refresh_token") {
        Some(c) => c.value().to_string(),
        None => return Err(CustomError::HttpError(CustomHttpError::TokenNotProvided)),
    };

    let refresh_token_details = match verify_jwt_token(
        data.secrets.refresh_token_public_key.to_owned(),
        &refresh_token,
    ) {
        Ok(token_details) => token_details,
        Err(_) => {
            return Err(CustomError::HttpError(CustomHttpError::TokenNotMatch));
        }
    };

    let result = data.redis_client.get_async_connection().await;
    let mut redis_client = match result {
        Ok(redis_client) => redis_client,
        Err(e) => {
            return Err(CustomError::RedisError(e));
        }
    };
    let redis_result: redis::RedisResult<String> = redis_client
        .get(refresh_token_details.token_uuid.to_string())
        .await;

    let user_id = match redis_result {
        Ok(value) => value,
        Err(_) => {
            return Err(CustomError::HttpError(CustomHttpError::UserNotInRedis));
        }
    };

    let user_id_uuid = Uuid::parse_str(&user_id).unwrap();
    let query_result = sqlx::query_as!(User, "SELECT * FROM users WHERE id = $1", user_id_uuid)
        .fetch_optional(&data.db)
        .await
        .unwrap();

    if query_result.is_none() {
        return Err(CustomError::HttpError(CustomHttpError::TokenNotMatch));
    }

    let user = query_result.unwrap();

    let access_token_details = match generate_jwt_token(
        user.id,
        data.secrets.access_token_max_age,
        data.secrets.access_token_private_key.to_owned(),
    ) {
        Ok(token_details) => token_details,
        Err(_) => return Err(CustomError::HttpError(CustomHttpError::TokenNotGenerated)),
    };

    let redis_result: redis::RedisResult<()> = redis_client
        .set_ex(
            access_token_details.token_uuid.to_string(),
            user.id.to_string(),
            (data.secrets.access_token_max_age * 60) as usize,
        )
        .await;

    if redis_result.is_err() {
        return Err(CustomError::HttpError(CustomHttpError::RedisProblem));
    }

    Ok(HttpResponse::Ok()
    .json(serde_json::json!({"status": "success", "data": { "access_token": access_token_details.token.unwrap() }})))
}

#[post("/auth/logout")]
async fn logout(
    req: HttpRequest,
    auth_guard: JwtMiddleware,
    data: web::Data<AppState>,
) -> Result<HttpResponse, CustomError> {
    let refresh_token = match req.cookie("refresh_token") {
        Some(c) => c.value().to_string(),
        None => return Err(CustomError::HttpError(CustomHttpError::TokenNotProvided)),
    };

    let refresh_token_details = match verify_jwt_token(
        data.secrets.refresh_token_public_key.to_owned(),
        &refresh_token,
    ) {
        Ok(token_details) => token_details,
        Err(_) => return Err(CustomError::HttpError(CustomHttpError::TokenNotMatch)),
    };

    let mut redis_client = data.redis_client.get_async_connection().await.unwrap();
    let redis_result: redis::RedisResult<usize> = redis_client
        .del(&[
            refresh_token_details.token_uuid.to_string(),
            auth_guard.access_token_uuid.to_string(),
        ])
        .await;

    if let Err(err) = redis_result {
        return Err(CustomError::RedisError(err));
    }
    let access_cookie = Cookie::build("access_token", "")
        .path("/")
        .max_age(ActixWebDuration::new(-1, 0))
        .http_only(true)
        .finish();
    let refresh_cookie = Cookie::build("refresh_token", "")
        .path("/")
        .max_age(ActixWebDuration::new(-1, 0))
        .http_only(true)
        .finish();

    Ok(HttpResponse::Ok()
        .cookie(access_cookie)
        .cookie(refresh_cookie)
        .json(serde_json::json!({"status": "success", "message": "you have been log out. Have a nice day"})))
}

#[get("/users/me")]
async fn me(jwt_guard: JwtMiddleware) -> impl Responder {
    let json_response = serde_json::json!({
        "status":  "success",
        "data": serde_json::json!(
             filter_user_record(&jwt_guard.user))
    });

    HttpResponse::Ok().json(json_response)
}
