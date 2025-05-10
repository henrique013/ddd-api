# 🚀 DDD API

This is a basic template for an Fastify API with TypeScript, configured for development using Docker.

## 📋 Prerequisites

- Docker and Docker Compose

## ⚙️ Installation and Execution

1. Clone the repository and navigate to the project directory:

   ```bash
   git clone git@github.com:henrique013/ddd-api.git
   cd ddd-api
   ```

2. Set up environment variables:

   ```bash
   # Copy API environment variables
   cp .env.example .env

   # Copy Docker Compose environment variables
   cp dev/.env.example dev/.env
   ```

3. Start the application:

   ```bash
   # Navigate to the docker directory
   cd dev

   # Start all containers
   ./up.sh
   ```

4. Access the application:
   - The API will be available at `http://localhost:8080`
   - You can test the endpoints using the documentation below

## 🔑 Important Commands

- `./up.sh`: Starts all containers needed for development
- `./down.sh`: Stops and removes all containers

## 🌐 Endpoints

- `GET /`: Root endpoint
  - Response:
    - `message`: string
- `GET /system/health`: Health check endpoint
  - Query Parameters:
    - `uptime` (optional): boolean - Include uptime in response
  - Response:
    - `message`: string
    - `timestamp`: string
    - `uptime`: number (optional)
