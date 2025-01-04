# Use Node.js 20 for compatibility with Remix
FROM node:20-alpine AS base

# Install libc6-compat and pnpm globally
RUN apk add --no-cache libc6-compat \
    && npm install -g pnpm

# Dependencies stage
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# Install dev dependencies (Remix CLI is in devDependencies)
RUN pnpm install --frozen-lockfile

# Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Run the build process
RUN pnpm run build && pnpm cache clean

# Runner stage
FROM node:20-alpine AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 remix
COPY --from=builder /app .
USER remix
EXPOSE 3000
ENV PORT=3000
CMD ["pnpm", "run", "start"]
