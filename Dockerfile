# 1. Install build dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 2. Build the application
FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# 3. Create the production image
FROM node:22-alpine AS runner
WORKDIR /app

# Set NODE_ENV for production optimizations
ENV NODE_ENV=production

# Only copy over what’s needed
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Expose Next.js default port
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]
