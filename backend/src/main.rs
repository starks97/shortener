use actix_web::{web::Data, App, HttpServer};

use sqlx::{postgres::PgPoolOptions, Pool, Postgres};

use redis::Client;

use backend::{
    api::handler::config_handler, app_state::AppState, config_env, custom_error::CustomError,
};

use tracing::{info, warn};

#[actix_web::main]
async fn main() -> Result<(), CustomError> {
    let config_data = config_env::Config::init();

    tracing_subscriber::fmt::init();

    let database_url = config_data.database_url.to_owned();
    let pool: Pool<Postgres> = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .map_err(|err| {
            warn!("Failed to connect to the database: {:?}", err);
            CustomError::DataBaseError(err)
        })?;

    info!("✅ Connection to the db is successful");

    sqlx::migrate!("./migrations")
        .run(&pool)
        .await
        .map_err(|err| {
            warn!("Failed to connect to run migration: {:?}", err);
            CustomError::OtherError(format!("error: {:?}", err))
        })?;

    info!("Migrations ran successfully");
    info!("Server started successfully 🚀!");

    let redis_client = Client::open(config_data.redis_url.to_owned()).map_err(|err| {
        warn!("failed to connect to redis: {:?}", err);
        CustomError::RedisError(err)
    })?;

    HttpServer::new(move || {
        App::new()
            .app_data(Data::new(AppState {
                db: pool.clone(),
                secrets: config_data.clone(),
                redis_client: redis_client.clone(),
            }))
            .configure(|ctx| config_handler(ctx, &config_data))
    })
    .bind("0.0.0.0:8000")
    .map_err(|err| {
        warn!("Failed to bind server: {:?}", err);
        CustomError::OtherError(err.to_string())
    })?
    .run()
    .await
    .map_err(|err| {
        warn!("Failed to run the server: {:?}", err);
        CustomError::OtherError(err.to_string())
    })?;

    Ok(())
}
