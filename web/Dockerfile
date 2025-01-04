FROM node:20-alpine AS base

# Install libc6-compat and pnpm globally
RUN apk add --no-cache libc6-compat \
    && npm install -g pnpm --prefix /usr/local

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy app files and build
COPY . .
RUN pnpm run build && pnpm cache clean

# Set user and start app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 remix
USER remix
EXPOSE 3000
ENV PORT=3000
CMD ["pnpm", "run", "start"]
