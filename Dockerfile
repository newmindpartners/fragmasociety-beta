FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build arguments for Vite (passed from Railway)
ARG VITE_API_URL
ARG VITE_CLERK_PUBLISHABLE_KEY

# Set environment variables for build
ENV VITE_API_URL=${VITE_API_URL:-https://fragmasociety-beta-production.up.railway.app}
ENV VITE_CLERK_PUBLISHABLE_KEY=${VITE_CLERK_PUBLISHABLE_KEY}

RUN npm run build

# Expose port (Railway sets PORT env var)
EXPOSE 3000

# Start server
CMD ["node", "server.js"]
