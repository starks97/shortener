use serde::{Deserialize, Serialize};

use uuid::Uuid;

use sqlx::FromRow;

use core::fmt;

use validator::Validate;

lazy_static::lazy_static! {
    static ref SHORT_URL_REGEX: regex::Regex = regex::Regex::new(r"^[a-zA-Z0-9_ ]{5,30}$").unwrap();
}

#[derive(Debug, FromRow, Deserialize, Serialize)]
#[allow(non_snake_case)]
pub struct Url {
    pub id: Uuid,
    pub original_url: String,
    pub short_url: String,
    pub user_id: Option<Uuid>,
    pub views: Option<i32>,
    pub category: UrlCategory,
    pub slug: String,
    #[serde(default)]
    #[serde(rename = "createdAt")]
    pub created_at: Option<chrono::DateTime<chrono::Utc>>,
    #[serde(rename = "updatedAt")]
    pub updated_at: Option<chrono::DateTime<chrono::Utc>>,
}

#[derive(Debug, Deserialize, Validate)]
pub struct CreateUrl {
    #[validate(url(code = "code_str", message = "Invalid URL, please provide a valid URL"))]
    pub original_url: String,
    #[validate(length(
        min = 5,
        max = 30,
        code = "code_str",
        message = "Short URL must be between 5 and 30 characters"
    ))]
    #[validate(regex(
        path = "SHORT_URL_REGEX",
        message = "Short URL can only contain letters, numbers, underscores"
    ))]
    pub short_url: String,
    pub category: UrlCategory,
}

#[derive(Debug, Deserialize, Validate)]
pub struct UpdateUrl {
    #[validate(url(code = "code_str", message = "Invalid URL, please provide a valid URL"))]
    pub original_url: Option<String>,
    #[validate(length(
        min = 5,
        max = 30,
        code = "code_str",
        message = "Short URL must be between 5 and 30 characters"
    ))]
    #[validate(regex(
        path = "SHORT_URL_REGEX",
        message = "Short URL can only contain letters, numbers, underscores, and hyphens"
    ))]
    pub short_url: Option<String>,
    pub category: Option<UrlCategory>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UrlRecord {
    pub user_id: Uuid,
    pub id: Uuid,
    pub views: Option<i32>,
    pub original_url: String,
    pub short_url: String,
    pub category: UrlCategory,
    pub slug: String,
    #[serde(default)]
    #[serde(rename = "createdAt")]
    pub created_at: Option<chrono::DateTime<chrono::Utc>>,
    #[serde(rename = "updatedAt")]
    pub updated_at: Option<chrono::DateTime<chrono::Utc>>,
}

#[derive(Debug, Deserialize)]
pub struct UrlQuery {
    pub limit: Option<i64>,
    pub offset: Option<i64>,
    pub category: Option<UrlCategory>,
}

#[derive(Debug, Deserialize, Serialize, Clone, PartialEq)]
pub enum UrlCategory {
    All,
    Tech,
    News,
    Music,
    Sports,
    Gaming,
    Movies,
    Education,
    Science,
}

impl fmt::Display for UrlCategory {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let category = match self {
            UrlCategory::All => "All",
            UrlCategory::Tech => "Tech",
            UrlCategory::News => "News",
            UrlCategory::Music => "Music",
            UrlCategory::Sports => "Sports",
            UrlCategory::Gaming => "Gaming",
            UrlCategory::Movies => "Movies",
            UrlCategory::Education => "Education",
            UrlCategory::Science => "Science",
        };
        write!(f, "{}", category)
    }
}

impl From<String> for UrlCategory {
    fn from(s: String) -> UrlCategory {
        match s.as_str() {
            "All" => UrlCategory::All,
            "Tech" => UrlCategory::Tech,
            "News" => UrlCategory::News,
            "Music" => UrlCategory::Music,
            "Sports" => UrlCategory::Sports,
            "Gaming" => UrlCategory::Gaming,
            "Movies" => UrlCategory::Movies,
            "Education" => UrlCategory::Education,
            "Science" => UrlCategory::Science,
            _ => UrlCategory::All,
        }
    }
}

#[derive(Debug, Deserialize)]
pub struct UrlPath {
    pub url_id: Uuid,
}

#[derive(Debug, Deserialize)]
pub struct UrlPathRedirect {
    pub slug: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct OriginalUrl {
    pub original_url: String,
}
