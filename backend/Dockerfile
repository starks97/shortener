# Build stage
FROM rust:bookworm AS builder

WORKDIR /app

COPY . .

RUN cargo build --release

# Final run stage
FROM debian:bookworm-slim AS runner

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/target/release/backend /app/backend

CMD ["/app/backend"]
