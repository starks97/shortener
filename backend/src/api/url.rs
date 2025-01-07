use actix_web::{delete, get, patch, post, web, HttpResponse};

use validator::Validate;

use crate::models::url::{
    CreateUrl, OriginalUrl, UpdateUrl, Url, UrlPath, UrlPathRedirect, UrlQuery, UrlRecord,
};

use crate::jwt_auth::JwtMiddleware;

use crate::app_state::AppState;

use crate::custom_error::{handle_validation_error, CustomError, CustomHttpError};

use crate::utils::slugify::slugify;

#[post("/url")]
pub async fn create_url(
    body: web::Json<CreateUrl>,
    data: web::Data<AppState>,
    auth_guard: JwtMiddleware,
) -> Result<HttpResponse, CustomError> {
    let is_valid = body.validate();

    if let Err(validation_error) = is_valid {
        return handle_validation_error(validation_error);
    }

    let new_url: Url = match sqlx::query_as!(
        Url,
        r#"
        INSERT INTO urls (original_url, short_url, user_id, views, category, slug)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        "#,
        body.original_url.to_string(),
        body.short_url.to_string(),
        auth_guard.user.id,
        0,
        body.category.to_string().into(),
        slugify(&body.short_url)
    )
    .fetch_one(&data.db)
    .await
    {
        Ok(url) => url,
        Err(e) => {
            println!("Error creating URL: {:?}", e);
            return Err(CustomError::DataBaseError(e));
        }
    };

    Ok(HttpResponse::Created().json(serde_json::json!({
        "status": "success",
        "data": new_url
    })))
}

#[get("/url")]
pub async fn get_all_url_record(
    data: web::Data<AppState>,
    query: web::Query<UrlQuery>,
    auth_guard: JwtMiddleware,
) -> Result<HttpResponse, CustomError> {
    let limit = query.limit.unwrap_or(5);
    let offset = query.offset.unwrap_or(0);

    let records = match query.category.clone() {
        Some(category) => {
            sqlx::query_as!(
                Url,
                r#"
                SELECT id, original_url, short_url, user_id, views, category, slug, created_at, updated_at
                FROM urls
                WHERE user_id = $1
                AND (urls.category = $2 OR $2 = 'All')
                ORDER BY created_at DESC
                LIMIT $3 OFFSET $4
                "#,
                auth_guard.user.id,
                category.to_string(),
                limit,
                offset
            )
            .fetch_all(&data.db)
            .await
            .map_err(CustomError::DataBaseError)?
        },
        None => {
            sqlx::query_as!(
                Url,
                r#"
                SELECT id, original_url, short_url, user_id, views, category, slug, created_at, updated_at
                FROM urls
                WHERE user_id = $1
                ORDER BY created_at DESC
                LIMIT $2 OFFSET $3
                "#,
                auth_guard.user.id,
                limit,
                offset
            )
            .fetch_all(&data.db)
            .await
            .map_err(CustomError::DataBaseError)?
        }
    };

    let url_records: Vec<UrlRecord> = records
        .into_iter()
        .map(|record| UrlRecord {
            user_id: auth_guard.user.id,
            id: record.id,
            original_url: record.original_url,
            short_url: record.short_url.clone(),
            views: record.views,
            category: record.category.clone(),
            slug: slugify(&record.short_url),
            created_at: record.created_at,
            updated_at: record.updated_at,
        })
        .collect();

    Ok(HttpResponse::Ok().json(serde_json::json!({"status": "success", "data": url_records})))
}

#[patch("/url/{url_id}")]
pub async fn update_url(
    data: web::Data<AppState>,
    body: web::Json<UpdateUrl>,
    _auth_guard: JwtMiddleware,
    path: web::Path<UrlPath>,
) -> Result<HttpResponse, CustomError> {
    let is_valid = body.validate();

    if let Err(validation_error) = is_valid {
        return handle_validation_error(validation_error);
    }

    let update_result = if let Some(original_url) = &body.original_url {
        sqlx::query!(
            r#"UPDATE urls SET original_url = $1, updated_at = NOW() WHERE id = $2"#,
            original_url,
            path.url_id.clone()
        )
    } else if let Some(short_url) = &body.short_url {
        sqlx::query!(
            r#"UPDATE urls SET short_url = $1, slug = $2, updated_at = NOW() WHERE id = $3"#,
            short_url,
            slugify(&short_url),
            path.url_id.clone()
        )
    } else if let Some(category) = &body.category {
        sqlx::query!(
            r#"UPDATE urls SET category = $1, updated_at = NOW() WHERE id = $2"#,
            category.to_string(),
            path.url_id.clone()
        )
    } else {
        return Err(CustomError::OtherError(
            "An error occurred while attempting to update the fields.".to_string(),
        ));
    }
    .execute(&data.db)
    .await;

    match update_result {
        Ok(_) => Ok(HttpResponse::Ok().json(serde_json::json!({
            "status": "success",
            "message": "URL updated successfully"
        }))),
        Err(e) => {
            println!("Error updating URL: {:?}", e);
            Err(CustomError::DataBaseError(e))
        }
    }
}

#[delete("/url/{url_id}")]
pub async fn delete_url(
    path: web::Path<UrlPath>,
    data: web::Data<AppState>,
    _auth_guard: JwtMiddleware,
) -> Result<HttpResponse, CustomError> {
    let delete_result = sqlx::query!(r#"DELETE FROM "urls" WHERE id = $1"#, path.url_id.clone())
        .execute(&data.db)
        .await;

    match delete_result {
        Ok(_) => Ok(HttpResponse::Ok().json(serde_json::json!({
            "status": "success",
            "message": "URL deleted successfully"
        }))),
        Err(e) => Err(CustomError::DataBaseError(e)),
    }
}

#[get("/url/{url_id}")]
pub async fn get_url_by_id(
    path: web::Path<UrlPath>,
    data: web::Data<AppState>,
    _auth_guard: JwtMiddleware,
) -> Result<HttpResponse, CustomError> {
    sqlx::query_as!(
        Url,
        r#"SELECT * FROM urls WHERE id = $1"#,
        path.url_id.clone()
    )
    .fetch_one(&data.db)
    .await
    .map(|url| {
        HttpResponse::Ok().json(serde_json::json!({
            "status": "success",
            "data": url
        }))
    })
    .map_err(|err| {
        println!("Error fetching URL: {:?}", err);
        CustomError::HttpError(CustomHttpError::UrlNotFound)
    })
}

#[get("/url/redirect/{slug}")]
pub async fn redirect_to_original_url(
    data: web::Data<AppState>,
    path: web::Path<UrlPathRedirect>,
) -> Result<HttpResponse, CustomError> {
    let original_url = match sqlx::query_as!(
        OriginalUrl,
        r#"UPDATE urls
    SET views = views + 1
    WHERE slug = $1
    RETURNING original_url"#,
        path.slug.clone()
    )
    .fetch_one(&data.db)
    .await
    {
        Ok(row) => row.original_url,
        Err(e) => {
            println!("Error fetching URL: {:?}", e);
            return Err(CustomError::DataBaseError(e));
        }
    };

    Ok(HttpResponse::Ok().json(
        serde_json::json!({"status": "success", "data": {"original_url": original_url.clone()}}),
    ))
}
