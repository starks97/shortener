use actix_web::{get, HttpResponse, Responder};
use serde_json::json;

#[get("/api/healthchecker")]
pub async fn health_checker() -> impl Responder {
    const MESSAGE: &str = "Server is running successfully! 🚀";
    HttpResponse::Ok().json(json!({"status": "success", "message": MESSAGE}))
}
