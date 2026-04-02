# Docker Containerization & Deployment Guide

Complete containerization guide for the AI Chatbot application with production-ready Docker setup.

## Overview

This guide covers:
- Docker containerization strategy
- Multi-stage builds for optimization
- Docker Compose for local development and testing
- Production deployment configurations
- Security best practices

## Prerequisites

- Docker Desktop or Docker Engine (v20+)
- Docker Compose (v2+)
- 4GB+ RAM available
- Port availability: 3000 (app), 5432 (PostgreSQL), 6379 (Redis), 5672 (RabbitMQ)

## Project Structure

```
├── Dockerfile                 # Multi-stage build
├── docker-compose.yml         # Local development stack
├── .dockerignore              # Docker build exclusions
├── docker-entrypoint.sh       # Database initialization
└── .env.example               # Environment template
```

## Quick Start

### 1. Local Development with Docker Compose

```bash
# Clone and navigate to project
git clone https://github.com/felix16805/AI-Chatbot-for-Customer-Support.git
cd AI-Chatbot-for-Customer-Support

# Create environment file
cp .env.example .env.local

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Services will start automatically:
- **App**: http://localhost:3000
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379
- **RabbitMQ Admin**: http://localhost:15672 (guest/guest)

### 2. Build Docker Image Locally

```bash
# Build image
docker build -t chatbot-app:latest .

# View image
docker images | grep chatbot

# Build with custom tag
docker build -t chatbot-app:v1.0.0 .
```

### 3. Run Single Container

```bash
# Connect to existing docker-compose network
docker-compose up -d postgres redis rabbitmq

# Run app container
docker run --rm \
  --network software-project_chatbot-network \
  -p 3000:3000 \
  -e DATABASE_URL="postgresql://chatbot_user:chatbot_password@postgres:5432/chatbot_db" \
  -e REDIS_URL="redis://:redis_password@redis:6379" \
  -e RABBITMQ_URL="amqp://guest:guest@rabbitmq:5672" \
  -e NEXTAUTH_SECRET="your-secret-here" \
  chatbot-app:latest
```

## Architecture

### Multi-Stage Build

The Dockerfile uses multi-stage compilation:

**Stage 1: Builder**
- Uses Node 20 Alpine
- Installs all dependencies
- Compiles TypeScript
- Builds Next.js application
- Size: ~500MB (discarded after build)

**Stage 2: Runtime**
- Uses Node 20 Alpine (minimal base)
- Installs only production dependencies
- Copies built artifacts
- Creates non-root user
- Final size: ~200-250MB

### Benefits

- Smaller final image (~50% smaller)
- Faster deployment
- Reduced attack surface
- Faster startup time

## Docker Compose Services

### PostgreSQL

```yaml
Service: postgres
Image: postgres:16-alpine
Port: 5432
Credentials: chatbot_user / chatbot_password
Database: chatbot_db
Volumes: postgres_data (persistent)
Health: pg_isready check
```

**Features:**
- Alpine base (minimal size)
- Health checks every 10s
- Persistent volume storage
- Environment-based configuration

### Redis

```yaml
Service: redis
Image: redis:7-alpine
Port: 6379
Security: Password required
Features: AOF persistence
Volumes: redis_data (persistent)
Health: PING check
```

**Features:**
- Append-only file persistence
- Memory-efficient Alpine
- Automatic restart on failure
- Password protection

### RabbitMQ

```yaml
Service: rabbitmq
Image: rabbitmq:3.13-management-alpine
Ports: 5672 (AMQP), 15672 (Management)
Credentials: guest / guest
Volumes: rabbitmq_data (persistent)
Health: rabbitmq-diagnostics check
```

**Features:**
- Management console included
- Persistent message store
- Health checks every 10s
- Auto-restart policy

### Next.js Application

```yaml
Service: app
Build: Dockerfile (local)
Port: 3000
Depends On: postgres, redis, rabbitmq (wait for health)
Environment: DATABASE_URL, REDIS_URL, etc.
Restart: unless-stopped
```

**Features:**
- Waits for all dependencies
- Environment variable injection
- Health checks
- Automatic restart

## Environment Variables

### Required

```env
# Authentication
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@host:5432/db

# Cache
REDIS_URL=redis://:password@host:6379
REDIS_PASSWORD=redis_password

# Queue
RABBITMQ_URL=amqp://user:password@host:5672
RABBITMQ_USER=guest
RABBITMQ_PASSWORD=guest
```

### Optional

```env
# Node environment
NODE_ENV=production

# Database
DB_USER=chatbot_user
DB_PASSWORD=chatbot_password
DB_NAME=chatbot_db
DB_PORT=5432

# Redis
REDIS_PORT=6379

# RabbitMQ
RABBITMQ_PORT=5672

# App
APP_PORT=3000
```

## Common Commands

### Container Management

```bash
# Build image
docker build -t chatbot-app:latest .

# List images
docker images

# Remove image
docker rmi chatbot-app:latest

# View image history
docker history chatbot-app:latest

# Tag image
docker tag chatbot-app:latest chatbot-app:v1.0.0
```

### Compose Operations

```bash
# Start services in background
docker-compose up -d

# Start with build
docker-compose up -d --build

# View logs (all services)
docker-compose logs

# View logs (specific service)
docker-compose logs app

# Follow logs
docker-compose logs -f

# Stop services
docker-compose stop

# Stop and remove containers
docker-compose down

# Remove volumes too
docker-compose down -v

# Restart services
docker-compose restart

# Restart specific service
docker-compose restart app
```

### Container Inspection

```bash
# List running containers
docker ps

# List all containers
docker ps -a

# View logs
docker logs container-id
docker logs -f container-id  # Follow

# Execute command
docker exec container-id whoami
docker exec -it container-id sh  # Interactive shell

# View processes
docker top container-id

# View resource usage
docker stats container-id

# View container details
docker inspect container-id
```

### Database Operations

```bash
# Connect to PostgreSQL
docker-compose exec postgres psql -U chatbot_user -d chatbot_db

# Backup database
docker-compose exec postgres pg_dump -U chatbot_user chatbot_db > backup.sql

# Restore database
docker-compose exec -T postgres psql -U chatbot_user chatbot_db < backup.sql

# Connect to Redis
docker-compose exec redis redis-cli -a redis_password

# Connect to RabbitMQ shell
docker-compose exec rabbitmq sh
```

## Production Deployment

### Kubernetes Deployment

```yaml
# Example Kubernetes manifest
apiVersion: apps/v1
kind: Deployment
metadata:
  name: chatbot-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: chatbot
  template:
    metadata:
      labels:
        app: chatbot
    spec:
      containers:
      - name: app
        image: chatbot-app:v1.0.0
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: chatbot-secrets
              key: database-url
        - name: NEXTAUTH_SECRET
          valueFrom:
            secretKeyRef:
              name: chatbot-secrets
              key: nextauth-secret
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 40
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 20
          periodSeconds: 5
```

### Docker Registry

```bash
# Tag for registry
docker tag chatbot-app:latest registry.example.com/chatbot-app:latest

# Push to registry
docker push registry.example.com/chatbot-app:latest

# Pull from registry
docker pull registry.example.com/chatbot-app:latest

# Login to registry
docker login registry.example.com
```

## Security Best Practices

### ✅ Implemented

1. **Non-Root User**: Application runs as `nodejs` user (UID 1001)
2. **Alpine Base**: Minimal attack surface with Alpine Linux
3. **Read-Only Filesystem** (optional): Can be enabled for hardened deployments
4. **Health Checks**: Automatic restart on failure
5. **Signal Handling**: `dumb-init` for proper signal propagation
6. **Secret Management**: Environment variables for secrets (not in Dockerfile)
7. **Network Isolation**: Services on internal Docker network

### 🔒 Recommendations

1. **Secrets Management**
   ```bash
   # Use Docker secrets for production
   # Create secret
   echo "mypassword" | docker secret create db_password -
   
   # Reference in compose
   secrets:
     db_password:
       external: true
   ```

2. **Container Registry Security**
   ```bash
   # Scan image for vulnerabilities
   docker scan chatbot-app:latest
   
   # Use signed images
   docker content trust enable
   ```

3. **Network Security**
   ```yaml
   # Use custom network instead of default bridge
   networks:
     internal:
       driver: bridge
       driver_opts:
         com.docker.network.bridge.name: br_internal
     external:
       driver: bridge
   ```

4. **Resource Limits**
   ```yaml
   services:
     app:
       deploy:
         resources:
           limits:
             cpus: '0.5'
             memory: 512M
           reservations:
             cpus: '0.25'
             memory: 256M
   ```

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker-compose logs app

# Common issues:
# 1. Port already in use
docker ps | grep :3000
lsof -i :3000  # Linux/Mac
netstat -ano | findstr :3000  # Windows

# 2. Database not ready
docker-compose logs postgres
docker-compose ps  # Check health status

# 3. Missing environment variables
docker-compose config  # Verify configuration

# Solution: Restart services
docker-compose restart
docker-compose down && docker-compose up -d --build
```

### Database Connection Failed

```bash
# Check PostgreSQL
docker-compose exec postgres pg_isready -U chatbot_user

# Test connection
docker-compose exec postgres psql -U chatbot_user -d chatbot_db -c "SELECT 1"

# Check connection string
echo $DATABASE_URL

# Rebuild with fresh database
docker-compose down -v
docker-compose up -d
```

### Redis Connection Issues

```bash
# Test Redis
docker-compose exec redis redis-cli -a redis_password ping

# Check memory
docker-compose exec redis redis-cli -a redis_password info memory

# Flush cache if needed
docker-compose exec redis redis-cli -a redis_password FLUSHALL
```

### RabbitMQ Issues

```bash
# Check RabbitMQ status
docker-compose exec rabbitmq rabbitmq-diagnostics status

# List queues
docker-compose exec rabbitmq rabbitmqctl list_queues

# Access management UI
# Visit: http://localhost:15672
# Default: guest / guest
```

### Disk Space

```bash
# Check Docker disk usage
docker system df

# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Clean up everything unused
docker system prune -a
```

## Performance Tuning

### Memory Management

```bash
# Monitor resource usage
docker stats --no-stream

# Set memory limits in compose
services:
  postgres:
    deploy:
      resources:
        limits:
          memory: 1G
        reservations:
          memory: 512M
```

### Database Performance

```bash
# Check PostgreSQL config
docker-compose exec postgres show shared_buffers
docker-compose exec postgres show work_mem

# Connection pooling
DATABASE_URL="postgresql://...?schema=public&pool=10"
```

### Redis Optimization

```bash
# Analyze memory usage
docker-compose exec redis redis-cli -a redis_password info memory

# Check slow commands
docker-compose exec redis redis-cli -a redis_password slowlog get 10

# Monitor connections
docker-compose exec redis redis-cli -a redis_password info clients
```

## Monitoring & Logging

### Centralized Logging

```yaml
# Add logging driver in docker-compose
services:
  app:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### Application Metrics

```bash
# Access container logs
docker-compose logs --tail=100 app

# Export logs
docker-compose logs app > app-logs.txt

# Log driver options
# - json-file (default)
# - splunk
# - awslogs
# - gcplogs
```

## CI/CD Integration

### GitHub Actions with Docker

```yaml
# .github/workflows/docker-build.yml
name: Docker Build & Push

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: docker build -t chatbot-app:${{ github.sha }} .
      
      - name: Push to registry
        run: |
          docker login -u ${{ secrets.REGISTRY_USER }} -p ${{ secrets.REGISTRY_PASS }}
          docker tag chatbot-app:${{ github.sha }} registry.example.com/chatbot-app:latest
          docker push registry.example.com/chatbot-app:latest
```

## Cleanup

```bash
# Stop and remove all containers
docker-compose down

# Remove all volumes (delete data!)
docker-compose down -v

# Remove images
docker rmi $(docker images -q "chatbot-*")

# Full cleanup
docker system prune -a --volumes
```

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Best Practices for Docker](https://docs.docker.com/develop/dev-best-practices/)
- [Node.js Docker](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Multi-Stage Builds](https://docs.docker.com/build/building/multi-stage/)

## Status

- ✅ Dockerfile (multi-stage build)
- ✅ docker-compose.yml (complete stack)
- ✅ .dockerignore (optimized)
- ✅ docker-entrypoint.sh (database init)
- ✅ Security best practices implemented
- ✅ Production-ready configuration

---

**Ready for**: Local development, container orchestration, production deployment
