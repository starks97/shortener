use chrono;
use serde::Serialize;

use crate::models::{url::Url, user::User};

#[allow(non_snake_case)]
#[derive(Debug, Serialize)]
pub struct FilteredUser {
    pub id: String,
    pub name: String,
    pub email: String,
    pub createdAt: Option<chrono::DateTime<chrono::Utc>>,
    pub updatedAt: Option<chrono::DateTime<chrono::Utc>>,
}

#[derive(Serialize, Debug)]
pub struct UserData {
    pub user: FilteredUser,
}

#[derive(Serialize, Debug)]
pub struct UserResponse {
    pub status: String,
    pub data: UserData,
}

pub fn filter_user_record(user: &User) -> UserData {
    let filtered_user = FilteredUser {
        id: user.id.to_string(),
        email: user.email.to_owned(),
        name: user.name.to_owned(),
        createdAt: Some(user.created_at.unwrap()),
        updatedAt: Some(user.updated_at.unwrap()),
    };

    UserData {
        user: filtered_user,
    }
}

#[derive(Serialize, Debug)]
pub struct UrlResponse {
    pub status: String,
    pub data: Url,
}
