use redis::Client;
use sqlx::PgPool;

use crate::config_env::Config;

pub struct AppState {
    pub db: PgPool,
    pub secrets: Config,
    pub redis_client: Client,
}

impl AppState {
    pub fn new(db: PgPool, secrets: Config, redis_client: Client) -> Self {
        Self {
            db,
            secrets,
            redis_client,
        }
    }
}
