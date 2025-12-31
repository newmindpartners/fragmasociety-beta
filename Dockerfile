FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the app with API URL
ENV VITE_API_URL=https://fragmasociety-beta-production.up.railway.app

RUN npm run build

# Expose port (Railway sets PORT env var)
EXPOSE 3000

# Start server
CMD ["node", "server.js"]
