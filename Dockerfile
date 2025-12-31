FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the app (VITE_API_URL comes from Railway build args)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Expose port (Railway sets PORT env var)
EXPOSE 3000

# Start server
CMD ["node", "server.js"]
