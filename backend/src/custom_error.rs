use actix_web::http::header::ContentType;
use actix_web::{error::ResponseError, http::StatusCode, HttpResponse};

use serde_json::json;
use thiserror::Error;
use validator::ValidationErrors;

use redis::RedisError as redisError;

use sqlx::Error as DbError;

#[derive(Debug, Error)]
pub enum CustomError {
    #[error("Other error: {0}")]
    OtherError(String),

    #[error("Database error: {0}")]
    DataBaseError(#[from] DbError),

    #[error("Validation error: {0}")]
    ValidationError(ValidationModelsErrors),

    #[error("{0}")]
    HttpError(#[from] CustomHttpError),

    #[error("Redis error: {0}")]
    RedisError(#[from] redisError),
}

impl CustomError {
    fn log_error(&self) {
        match self {
            CustomError::DataBaseError(_) => log::error!("Database error: {:?}", self),
            CustomError::OtherError(_) => log::error!("Other error has happened: {:?}", self),
            CustomError::ValidationError(_) => log::error!("Validation error: {:?}", self),
            CustomError::HttpError(_) => log::error!("HTTP error: {:?}", self),
            CustomError::RedisError(_) => log::error!("Redis error: {:?}", self),
        }
    }
}

impl ResponseError for CustomError {
    fn error_response(&self) -> HttpResponse {
        self.log_error();
        match self {
            CustomError::HttpError(http_err) => http_err.error_response(),
            CustomError::OtherError(_) => HttpResponse::BadRequest().json(json!({
                "status": "error",
                "message": format!("{}", self)
            })),
            CustomError::DataBaseError(_) => HttpResponse::ServiceUnavailable().json(json!({
                "status": "error",
                "message": format!("{}", self)
            })),
            CustomError::ValidationError(validation_err) => validation_err.error_response(),
            CustomError::RedisError(_) => HttpResponse::ServiceUnavailable().json(json!({
                "status": "error",
                "message": format!("{}", self)
            })),
        }
    }
}

#[derive(Debug)]
pub enum ValidationModelsErrors {
    Error(String),
}

impl ValidationModelsErrors {
    fn error_message(&self) -> String {
        match self {
            ValidationModelsErrors::Error(msg) => msg.to_string(),
        }
    }
}

impl std::fmt::Display for ValidationModelsErrors {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}", self.error_message())
    }
}

impl ResponseError for ValidationModelsErrors {
    fn error_response(&self) -> HttpResponse {
        HttpResponse::BadRequest().json(serde_json::json!({
            "status": "error",
            "message": self.error_message()
        }))
    }
}

#[derive(Debug, Error)]
pub enum CustomHttpError {
    #[error("Internal Server Error")]
    InternalServerError,
    #[error("Unauthorized")]
    Unauthorized,
    #[error("The email provided was not found, please try again.")]
    EmailNotFound,
    #[error("The token provided was not found, please provide a valid token by logging in")]
    TokenNotProvided,
    #[error("Service Unavailable")]
    ServiceUnavailable,
    #[error("Credentials not correct, please check the email and password.")]
    CredentialsNotCorrect,
    #[error("Token not generated, please try again.")]
    TokenNotGenerated,
    #[error("There was a problem with the Redis connection.")]
    RedisProblem,
    #[error("The email provided already exists, please use another one.")]
    UserAlreadyExists,
    #[error("The token provided is expired or not valid, please login to get a new one.")]
    TokenNotMatch,
    #[error("User not found, please provide a correct user or register to have an account")]
    UserNotFound,
    #[error("There was a problem finding the user in Redis, please try again.")]
    UserNotInRedis,
    #[error("Record were not found.")]
    RecordNotFound,
    #[error("Url not found with the given ID")]
    UrlNotFound,
}

impl ResponseError for CustomHttpError {
    fn error_response(&self) -> HttpResponse {
        HttpResponse::build(self.status_code())
            .insert_header(ContentType::json())
            .json(serde_json::json!({
                "status": "error",
                "message": format!("{}", self)
            }))
    }

    fn status_code(&self) -> StatusCode {
        match *self {
            CustomHttpError::InternalServerError => StatusCode::INTERNAL_SERVER_ERROR,
            CustomHttpError::Unauthorized => StatusCode::UNAUTHORIZED,
            CustomHttpError::ServiceUnavailable => StatusCode::SERVICE_UNAVAILABLE,
            CustomHttpError::EmailNotFound => StatusCode::NOT_FOUND,
            CustomHttpError::TokenNotProvided => StatusCode::FORBIDDEN,
            CustomHttpError::CredentialsNotCorrect => StatusCode::UNAUTHORIZED,
            CustomHttpError::TokenNotGenerated => StatusCode::NOT_IMPLEMENTED,
            CustomHttpError::RedisProblem => StatusCode::SERVICE_UNAVAILABLE,
            CustomHttpError::UserAlreadyExists => StatusCode::CONFLICT,
            CustomHttpError::TokenNotMatch => StatusCode::FORBIDDEN,
            CustomHttpError::UserNotInRedis => StatusCode::NOT_FOUND,
            CustomHttpError::RecordNotFound => StatusCode::NOT_FOUND,
            CustomHttpError::UrlNotFound => StatusCode::NOT_FOUND,
            CustomHttpError::UserNotFound => StatusCode::NOT_FOUND,
        }
    }
}

pub fn handle_validation_error(
    validation_error: ValidationErrors,
) -> Result<HttpResponse, CustomError> {
    let error_message = validation_error
        .field_errors()
        .values()
        .map(|errors| {
            errors
                .iter()
                .map(|err| err.to_string())
                .collect::<Vec<String>>()
        })
        .flatten()
        .collect::<Vec<String>>()
        .join(", ");

    Err(CustomError::ValidationError(ValidationModelsErrors::Error(
        error_message,
    )))
}
