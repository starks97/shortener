# Build stage
FROM rust:bookworm AS builder

WORKDIR /app

# Install required dependencies for the build stage (including OpenSSL)
RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copy your source code into the image
COPY . .

# Build the Rust application in release mode
RUN cargo build --release

# Final run stage
FROM debian:bookworm-slim AS runner

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    libssl-dev \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copy the built binary from the builder stage
COPY --from=builder /app/target/release/backend /app/backend

# Set the command to run the application
CMD ["/app/backend"]
