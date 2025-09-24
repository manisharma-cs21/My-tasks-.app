# backend/Dockerfile
FROM node:18-alpine

# Create app dir
WORKDIR /app

# Copy package files first (layer caching)
COPY package*.json ./

# Install only production deps (faster)
RUN npm ci --only=production

# Copy app source
COPY . .

# If you use build step (e.g. TypeScript), do it here:
# RUN npm run build

# Use non-root user (optional, but good practice)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3200

# Use start script from package.json or fallback to index.js
CMD ["node", "index.js"]
# OR if you prefer npm start:
# CMD ["npm", "start"]
