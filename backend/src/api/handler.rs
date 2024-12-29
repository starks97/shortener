use actix_cors::Cors;
//use actix_files as fs;
use actix_web::{http::header, web};

use super::auth::{login, logout, me, refresh_access_token, register};

use super::url::{
    create_url, delete_url, get_all_url_record, get_url_by_id, redirect_to_original_url, update_url,
};

use super::health_route::health_checker;
use crate::config_env;

pub fn config_handler(config: &mut web::ServiceConfig, config_data: &config_env::Config) {
    let cors = Cors::default()
        .allowed_origin(&config_data.client_origin)
        .allowed_methods(vec!["GET", "POST", "PUT", "DELETE", "PATCH"])
        .allowed_headers(vec![
            header::AUTHORIZATION,
            header::CONTENT_TYPE,
            header::ACCEPT,
            header::ACCESS_CONTROL_ALLOW_ORIGIN,
        ])
        .supports_credentials()
        .max_age(3600);

    let scope = web::scope("/api")
        .wrap(cors)
        .service(health_checker)
        .service(create_url)
        .service(delete_url)
        .service(get_all_url_record)
        .service(get_url_by_id)
        .service(redirect_to_original_url)
        .service(update_url)
        .service(register)
        .service(me)
        .service(login)
        .service(logout)
        .service(refresh_access_token);
    //.service(fs::Files::new("/", "../web/public").index_file("index.html"));

    config.service(scope);
}
