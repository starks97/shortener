pub fn slugify(value: &str) -> String {
    value.trim().to_lowercase().replace(" ", "-")
}
