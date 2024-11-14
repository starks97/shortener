use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;

use validator::{Validate, ValidationError};

use lazy_static::lazy_static;
use regex::Regex;

lazy_static! {
    static ref RE_SPECIAL_CHAR: Regex = Regex::new("^.*?[@$!%*?&].*$").unwrap();
}

#[derive(Debug, FromRow, Deserialize, Serialize)]
#[allow(non_snake_case)]
pub struct User {
    pub id: Uuid,
    pub name: String,
    pub email: String,
    pub password: String,
    #[serde(rename = "createdAt")]
    pub created_at: Option<chrono::DateTime<chrono::Utc>>,
    #[serde(rename = "updatedAt")]
    pub updated_at: Option<chrono::DateTime<chrono::Utc>>,
}

#[derive(Debug, Deserialize, Validate)]
pub struct RegisterUserSchema {
    #[validate(length(
        min = 3,
        code = "code_str",
        message = "Name must be greater than 3 chars"
    ))]
    pub name: String,
    #[validate(email(
        code = "code_str",
        message = "Invalid Email, please provide a valid email."
    ))]
    pub email: String,
    #[validate(
        custom(
            function = "validate_password",
            message = "Must Contain At Least and Number. Dont use spaces."
        ),
        regex(
            path = "RE_SPECIAL_CHAR",
            message = "Must Contain At Least One Special Character"
        )
    )]
    pub password: String,
}

fn validate_password(password: &str) -> Result<(), ValidationError> {
    if password.chars().any(char::is_numeric) {
        Ok(())
    } else {
        Err(ValidationError::new("Must Contain At Least and Number"))
    }
}

#[derive(Debug, Deserialize, Validate)]
pub struct LoginUserSchema {
    #[validate(email(message = "Invalid Email"))]
    pub email: String,
    pub password: String,
}
