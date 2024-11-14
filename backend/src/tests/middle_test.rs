/*#[cfg(test)]
mod tests {
    use super::*;
    use actix_service::Service;
    use actix_web::{dev::ServiceRequest, test, web, App, Error as ActixWebError, HttpResponse};
    use futures::future::{ok, Ready};
    use serde_json::json;
    use sqlx::{Pool, Postgres};
    use std::sync::Arc;
    use uuid::Uuid;

    // Mock structures
    #[derive(Clone)]
    struct MockAppState {
        db: Pool<Postgres>,
        secrets: Config,
        redis_client: redis::Client,
    }

    #[derive(Debug, Serialize, Deserialize)]
    struct MockUser {
        id: Uuid,
        name: String,
        email: String,
    }

    impl FromRequest for JwtMiddleware {
        type Error = ActixWebError;
        type Future = Ready<Result<Self, Self::Error>>;
        fn from_request(req: &HttpRequest, _: &mut Payload) -> Self::Future {
            let data = req.app_data::<web::Data<MockAppState>>().unwrap();

            let access_token = req
                .cookie("access_token")
                .map(|c| c.value().to_string())
                .or_else(|| {
                    req.headers()
                        .get(http::header::AUTHORIZATION)
                        .map(|h| h.to_str().unwrap().split_at(7).1.to_string())
                });

            if access_token.is_none() {
                let json_error = serde_json::json!(ErrorResponse {
                    status: "fail".to_string(),
                    message: "You are not logged in, please provide token".to_string(),
                });
                return ready(Err(ErrorUnauthorized(json_error)));
            }

            let access_token_details = match verify_jwt_token(
                data.secrets.access_token_public_key.to_owned(),
                &access_token.unwrap(),
            ) {
                Ok(token_details) => token_details,
                Err(e) => {
                    let json_error = ErrorResponse {
                        status: "fail".to_string(),
                        message: format!("{:?}", e),
                    };
                    return ready(Err(ErrorUnauthorized(json_error)));
                }
            };

            let access_token_uuid =
                uuid::Uuid::parse_str(&access_token_details.token_uuid.to_string()).unwrap();

            let user_id_redis_result = async move {
                let mut redis_client = match data.redis_client.get_connection() {
                    Ok(redis_client) => redis_client,
                    Err(e) => {
                        return Err(ErrorInternalServerError(ErrorResponse {
                            status: "fail".to_string(),
                            message: format!("Could not connect to Redis: {}", e),
                        }));
                    }
                };

                let redis_result =
                    redis_client.get::<_, String>(access_token_uuid.clone().to_string());

                match redis_result {
                    Ok(value) => Ok(value),
                    Err(_) => Err(ErrorUnauthorized(ErrorResponse {
                        status: "fail".to_string(),
                        message: "Token is invalid or session has expired".to_string(),
                    })),
                }
            };

            let user_exists_result = async move {
                let user_id = user_id_redis_result.await?;
                let user_id_uuid = uuid::Uuid::parse_str(user_id.as_str()).unwrap();

                let query_result = sqlx::query_as!(
                    MockUser,
                    r#"SELECT * FROM users WHERE id = $1"#,
                    user_id_uuid
                )
                .fetch_optional(&data.db)
                .await;

                match query_result {
                    Ok(Some(user)) => Ok(user),
                    Ok(None) => {
                        let json_error = ErrorResponse {
                            status: "fail".to_string(),
                            message: "the user belonging to this token no longer exists"
                                .to_string(),
                        };
                        Err(ErrorUnauthorized(json_error))
                    }
                    Err(_) => {
                        let json_error = ErrorResponse {
                            status: "error".to_string(),
                            message: "Failed to check user existence".to_string(),
                        };
                        Err(ErrorInternalServerError(json_error))
                    }
                }
            };

            match block_on(user_exists_result) {
                Ok(user) => ready(Ok(JwtMiddleware {
                    access_token_uuid,
                    user,
                })),
                Err(error) => ready(Err(error)),
            }
        }
    }

    #[actix_rt::test]
    async fn test_jwt_middleware_valid_token() {
        let mut app = test::init_service(
            App::new()
                .data(MockAppState {
                    db: setup_mock_db().await,        // Function to set up a mock database
                    secrets: setup_mock_secrets(),    // Function to set up mock secrets
                    redis_client: setup_mock_redis(), // Function to set up a mock Redis client
                })
                .route("/", web::get().to(|| async { HttpResponse::Ok().finish() })),
        )
        .await;

        let req =
            test::TestRequest::with_header("Authorization", "Bearer valid_token").to_request();

        let resp = test::call_service(&mut app, req).await;
        assert_eq!(resp.status(), http::StatusCode::OK);
    }

    #[actix_rt::test]
    async fn test_jwt_middleware_invalid_token() {
        let mut app = test::init_service(
            App::new()
                .data(MockAppState {
                    db: setup_mock_db().await,
                    secrets: setup_mock_secrets(),
                    redis_client: setup_mock_redis(),
                })
                .route("/", web::get().to(|| async { HttpResponse::Ok().finish() })),
        )
        .await;

        let req =
            test::TestRequest::with_header("Authorization", "Bearer invalid_token").to_request();

        let resp = test::call_service(&mut app, req).await;
        assert_eq!(resp.status(), http::StatusCode::UNAUTHORIZED);
    }

    async fn setup_mock_db() -> Pool<Postgres> {
        // Set up your mock database here
    }

    fn setup_mock_secrets() -> Config {
        // Set up your mock secrets here
    }

    fn setup_mock_redis() -> redis::Client {
        // Set up your mock Redis client here
    }
    }*/
