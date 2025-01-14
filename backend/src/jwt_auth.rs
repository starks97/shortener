use core::fmt;
use std::future::{ready, Ready};

use actix_web::error::{ErrorInternalServerError, ErrorUnauthorized};
use actix_web::{dev::Payload, Error as ActixWebError};
use actix_web::{http, web, FromRequest, HttpRequest};
use futures::executor::block_on;
use redis::Commands;
use serde::{Deserialize, Serialize};

use crate::app_state::AppState;
use crate::jwt_token::token::verify_jwt_token;
use crate::models::user::User;

#[derive(Debug, Serialize)]
struct ErrorResponse {
    status: String,
    message: String,
}

impl fmt::Display for ErrorResponse {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", serde_json::json!(&self))
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct JwtMiddleware {
    pub user: User,
    pub access_token_uuid: uuid::Uuid,
}

impl FromRequest for JwtMiddleware {
    type Error = ActixWebError;
    type Future = Ready<Result<Self, Self::Error>>;
    fn from_request(req: &HttpRequest, _: &mut Payload) -> Self::Future {
        let data = req.app_data::<web::Data<AppState>>().unwrap();

        let bearer_token = req
            .headers()
            .get(http::header::AUTHORIZATION)
            .and_then(|auth_header| auth_header.to_str().ok())
            .and_then(|auth_str| {
                if auth_str.starts_with("Bearer") {
                    Some(auth_str[7..].to_string())
                } else {
                    None
                }
            });

        if bearer_token.is_none() {
            let json_error = serde_json::json!(ErrorResponse {
                status: "fail".to_string(),
                message: "You are not logged in, please provide token".to_string(),
            });
            return ready(Err(ErrorUnauthorized(json_error)));
        }

        let access_token_details = match verify_jwt_token(
            data.secrets.access_token_public_key.to_owned(),
            &bearer_token.unwrap(),
        ) {
            Ok(token_details) => token_details,
            Err(e) => {
                let json_error = ErrorResponse {
                    status: "fail".to_string(),
                    message: format!("{:?}", e),
                };
                return ready(Err(ErrorUnauthorized(json_error)));
            }
        };

        let access_token_uuid =
            uuid::Uuid::parse_str(&access_token_details.token_uuid.to_string()).unwrap();

        let user_id_redis_result = async move {
            let mut redis_client = match data.redis_client.get_connection() {
                Ok(redis_client) => redis_client,
                Err(e) => {
                    return Err(ErrorInternalServerError(ErrorResponse {
                        status: "fail".to_string(),
                        message: format!("Could not connect to Redis: {}", e),
                    }));
                }
            };

            let redis_result = redis_client.get::<_, String>(access_token_uuid.clone().to_string());

            match redis_result {
                Ok(value) => Ok(value),
                Err(_) => Err(ErrorUnauthorized(ErrorResponse {
                    status: "fail".to_string(),
                    message: "Token is invalid or session has expired".to_string(),
                })),
            }
        };

        let user_exists_result = async move {
            let user_id = user_id_redis_result.await?;
            let user_id_uuid = uuid::Uuid::parse_str(user_id.as_str()).unwrap();

            let query_result =
                sqlx::query_as!(User, r#"SELECT * FROM users WHERE id = $1"#, user_id_uuid)
                    .fetch_optional(&data.db)
                    .await;

            match query_result {
                Ok(Some(user)) => Ok(user),
                Ok(None) => {
                    let json_error = ErrorResponse {
                        status: "fail".to_string(),
                        message: "the user belonging to this token no logger exists".to_string(),
                    };
                    Err(ErrorUnauthorized(json_error))
                }
                Err(_) => {
                    let json_error = ErrorResponse {
                        status: "error".to_string(),
                        message: "Faled to check user existence".to_string(),
                    };
                    Err(ErrorInternalServerError(json_error))
                }
            }
        };

        match block_on(user_exists_result) {
            Ok(user) => ready(Ok(JwtMiddleware {
                access_token_uuid,
                user,
            })),
            Err(error) => ready(Err(error)),
        }
    }
}
