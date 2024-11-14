/*#[cfg(test)]
mod tests {

    use crate::config_secrets::Config;
    use crate::tests::common::init_test_app;
    use crate::{api::url::create_url, tests::common};
    use actix_web::{http::StatusCode, test, App};
    use serde_json::json;

    #[actix_web::test]
    async fn test_create_url() {
        let mut app = test::init_service(App::new().app_data(web::Data::new(AppState::new(
            common::setup_db().await,
            common::setup_redis().await,
            Config::init(secret_store),
        ))))
        .await;

        let req = test::TestRequest::post()
            .uri("/url")
            .set_json(&json!({
                "original_url": "https://www.google.com",
                "short_url": "google",
                "category": "search"
            }))
            .to_request();

        let resp = test::call_service(&mut app, req).await;

        assert_eq!(resp.status(), StatusCode::CREATED);
    }
    }*/
