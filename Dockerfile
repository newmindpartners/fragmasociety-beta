# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Build-time arguments for Vite
ARG VITE_API_URL
ARG VITE_CLERK_PUBLISHABLE_KEY

# Set as environment variables for build
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage - serve static files with Node
FROM node:20-alpine

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Railway provides PORT env variable
ENV PORT=3000

EXPOSE $PORT

# Serve the static files (-s for SPA mode)
CMD ["sh", "-c", "serve dist -s -l $PORT"]
