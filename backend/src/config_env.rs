use std::env;

use dotenv::dotenv;
use serde::Deserialize;

fn parse_duration(duration_str: &str) -> Option<i64> {
    let mut numeric_part = String::new();
    for c in duration_str.chars() {
        if c.is_numeric() {
            numeric_part.push(c);
        } else {
            break;
        }
    }
    numeric_part.parse::<i64>().ok()
}

#[derive(Debug, Clone, Deserialize)]
pub struct Config {
    pub database_url: String,
    pub redis_url: String,
    pub client_origin: String,
    pub domain: String,
    pub access_token_private_key: String,
    pub access_token_public_key: String,
    pub access_token_expires_in: String,
    pub access_token_max_age: i64,
    pub refresh_token_private_key: String,
    pub refresh_token_public_key: String,
    pub refresh_token_expires_in: String,
    pub refresh_token_max_age: i64,
}

impl Config {
    pub fn init() -> Config {
        dotenv().ok();

        let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set in .env file");
        let redis_url = env::var("REDIS_URL").expect("REDIS_URL must be set in .env file");
        let client_origin =
            env::var("CLIENT_ORIGIN").expect("CLIENT_ORIGIN must be set in .env file");
        let domain = env::var("DOMAIN").expect("DOMAIN must be set in .env file");
        let access_token_private_key = env::var("ACCESS_TOKEN_PRIVATE_KEY")
            .expect("ACCESS_TOKEN_PRIVATE_KEY must be set in .env file");
        let access_token_public_key = env::var("ACCESS_TOKEN_PUBLIC_KEY")
            .expect("ACCESS_TOKEN_PUBLIC_KEY must be set in .env file");
        let access_token_expires_in = env::var("ACCESS_TOKEN_EXPIRED_IN")
            .expect("ACCESS_TOKEN_EXPIRES_IN must be set in .env file");
        let access_token_max_age =
            env::var("ACCESS_TOKEN_MAXAGE").expect("ACCESS_TOKEN_MAXAGE must be set in .env file");
        let refresh_token_private_key = env::var("REFRESH_TOKEN_PRIVATE_KEY")
            .expect("REFRESH_TOKEN_PRIVATE_KEY must be set in .env file");
        let refresh_token_public_key = env::var("REFRESH_TOKEN_PUBLIC_KEY")
            .expect("REFRESH_TOKEN_PUBLIC_KEY must be set in .env file");
        let refresh_token_expires_in = env::var("REFRESH_TOKEN_EXPIRED_IN")
            .expect("REFRESH_TOKEN_EXPIRES_IN must be set in .env file");
        let refresh_token_max_age = env::var("REFRESH_TOKEN_MAXAGE")
            .expect("REFRESH_TOKEN_MAXAGE must be set in .env file");

        Config {
            database_url,
            redis_url,
            client_origin,
            domain,
            access_token_private_key,
            access_token_public_key,
            access_token_expires_in,
            access_token_max_age: parse_duration(&access_token_max_age)
                .unwrap_or_else(|| panic!("Invalid duration: {}", access_token_max_age)),
            refresh_token_private_key,
            refresh_token_public_key,
            refresh_token_expires_in,
            refresh_token_max_age: parse_duration(&refresh_token_max_age)
                .unwrap_or_else(|| panic!("Invalid duration: {}", refresh_token_max_age)),
        }
    }
}
