/*use crate::api::url::create_url;
use crate::app_state::AppState;
use crate::config_secrets::Config;
use actix_web::{dev::ServiceFactory, web, App};
use redis::Client;

use sqlx::PgPool;
use std::env;

use actix_web::web::{Data, ServiceConfig};

use shuttle_actix_web::ShuttleActixWeb;

use shuttle_runtime::SecretStore;

pub async fn setup_db() -> PgPool {
    // Use the `DATABASE_URL` environment variable or set up a test database
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = PgPool::connect(&database_url)
        .await
        .expect("Failed to connect to database");

    // Run migrations or setup necessary for tests
    sqlx::migrate!()
        .run(&pool)
        .await
        .expect("Failed to run migrations");

    pool
}

pub async fn setup_secrets(
    #[shuttle_runtime::Secrets] secrets: SecretStore,
) -> ShuttleActixWeb<impl FnOnce(&mut ServiceConfig) + Send + Clone + 'static> {
}

pub async fn setup_redis() -> Client {
    // Connect to the Redis instance (you might want to point this to a test Redis instance)
    let redis_url = env::var("REDIS_URL").expect("REDIS_URL must be set");
    Client::open(redis_url).expect("Failed to connect to Redis")
}

pub fn init_test_app(
    pool: PgPool,
    redis_client: Client,
    config: Config,
) -> App<
    impl ServiceFactory<
        actix_web::dev::ServiceRequest,
        Config = (),
        InitError = (),
        Error = actix_web::Error,
        Response = actix_web::dev::ServiceResponse,
    >,
> {
    App::new()
        .app_data(web::Data::new(AppState::new(pool, config, redis_client)))
        .service(create_url)
}
*/
