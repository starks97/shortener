-- Add migration script here
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS urls (
    id UUID PRIMARY KEY DEFAULT (uuid_generate_v4()),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    original_url TEXT NOT NULL,
    short_url VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    views INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
