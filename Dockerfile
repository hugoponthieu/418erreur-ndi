# Use Node.js LTS as the base image
FROM node:18-alpine AS build

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /app

# Copy package.json, pnpm-lock.yaml, and .npmrc if present
COPY package.json pnpm-lock.yaml .npmrc* ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the source code
COPY . .

# Build the Vite project
RUN pnpm run build

# Use a lightweight web server to serve the app
FROM nginx:stable-alpine

# Copy the build output to Nginx's default public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port Nginx is running on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
