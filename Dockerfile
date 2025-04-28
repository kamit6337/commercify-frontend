# Stage 1: Build the application
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./ 
RUN npm install --frozen-lockfile

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:22-alpine AS runner

# Set environment variables
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/next.config.js /app/package.json /app/public ./ 
COPY --from=builder /app/.next ./.next 
COPY --from=builder /app/node_modules ./node_modules 

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
