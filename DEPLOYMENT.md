# Deployment & Production Guide

Complete guide for deploying the AI Chatbot application to production environments.

## Overview

This guide covers deployment strategies for various platforms:
- **Vercel** (Recommended for Next.js)
- **AWS** (EC2, ECS Fargate, Elastic Beanstalk)
- **Railway** (Simple Docker deployment)
- **DigitalOcean** (App Platform, Droplets)
- **Self-hosted** (VPS with Docker)

## Pre-Deployment Checklist

### ✅ Code Readiness

- [ ] All tests passing (60/60) ✅
- [ ] TypeScript compilation without errors ✅
- [ ] No security vulnerabilities (npm audit) ✅
- [ ] All environment variables documented
- [ ] Database migrations tested
- [ ] API endpoints verified
- [ ] Error handling functional
- [ ] Logging configured

### ✅ Infrastructure

- [ ] PostgreSQL database provisioned
- [ ] Redis instance available
- [ ] RabbitMQ broker configured
- [ ] Domain name acquired (optional)
- [ ] SSL/TLS certificates ready
- [ ] Backups configured
- [ ] Monitoring setup

### ✅ Secrets & Security

- [ ] `NEXTAUTH_SECRET` generated (at least 32 characters)
- [ ] Database credentials strong
- [ ] Redis password set
- [ ] RabbitMQ password changed from default
- [ ] API keys stored securely
- [ ] Environment variables encrypted
- [ ] No secrets in code/git

### ✅ Documentation

- [ ] Deployment runbook created
- [ ] Rollback procedure documented
- [ ] Incident response plan ready
- [ ] Support contact info updated

## Deployment Platforms

---

## 1. Vercel (Recommended for Next.js)

Vercel is the official Next.js hosting platform with zero-config deployment.

### Setup

1. **Push code to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select GitHub repository
   - Import: `AI-Chatbot-for-Customer-Support`

3. **Configure Environment**
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm ci
   ```

4. **Add Environment Variables**
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (your Vercel domain)
   - `DATABASE_URL`
   - `REDIS_URL`
   - `RABBITMQ_URL`
   - All other variables from `.env.example`

5. **Deploy**
   ```bash
   # Automatic on git push
   # Manual deployment via Vercel CLI
   npm i -g vercel
   vercel --prod
   ```

### Features

- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Serverless functions
- ✅ Auto scaling
- ✅ Preview deployments
- ✅ Analytics included
- ✅ Git integration

### Limitations

- No always-on server (invocations can cold start)
- External databases required
- Limited to Node.js runtime

### Cost

- Free: 100GB bandwidth/month
- Pro: $20/month
- Enterprise: Custom pricing

---

## 2. AWS Deployment

Multiple options for AWS deployment:

### Option A: Elastic Container Service (ECS Fargate)

Best for containers with managed infrastructure.

**Steps:**

1. **Create ECR Repository**
   ```bash
   aws ecr create-repository --repository-name chatbot-app --region us-east-1
   ```

2. **Build and Push Image**
   ```bash
   aws ecr get-login-password --region us-east-1 | docker login \
     --username AWS --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com
   
   docker build -t chatbot-app .
   docker tag chatbot-app:latest 123456789.dkr.ecr.us-east-1.amazonaws.com/chatbot-app:latest
   docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/chatbot-app:latest
   ```

3. **Create RDS Database**
   ```bash
   aws rds create-db-instance \
     --db-instance-identifier chatbot-db \
     --db-instance-class db.t3.micro \
     --engine postgres \
     --master-username admin \
     --master-user-password <STRONG_PASSWORD>
   ```

4. **Create ElastiCache Redis**
   ```bash
   aws elasticache create-cache-cluster \
     --cache-cluster-id chatbot-redis \
     --cache-node-type cache.t3.micro \
     --engine redis
   ```

5. **Create ECS Cluster**
   ```bash
   aws ecs create-cluster --cluster-name chatbot
   
   # Register task definition
   aws ecs register-task-definition --cli-input-json file://task-definition.json
   
   # Create service
   aws ecs create-service \
     --cluster chatbot \
     --service-name chatbot-app \
     --task-definition chatbot-app \
     --desired-count 2 \
     --launch-type FARGATE
   ```

**task-definition.json:**
```json
{
  "family": "chatbot-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "chatbot-app",
      "image": "123456789.dkr.ecr.us-east-1.amazonaws.com/chatbot-app:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "hostPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "DATABASE_URL",
          "value": "postgresql://admin:password@chatbot-db.xxxxx.us-east-1.rds.amazonaws.com:5432/chatbot_db"
        },
        {
          "name": "REDIS_URL",
          "value": "redis://chatbot-redis.xxxxx.ng.0001.use1.cache.amazonaws.com:6379"
        },
        {
          "name": "NEXTAUTH_URL",
          "value": "https://yourdomain.com"
        },
        {
          "name": "NEXTAUTH_SECRET",
          "value": "your-secret-here"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/chatbot-app",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

### Option B: Elastic Beanstalk

Simplified deployment with managed scaling.

```bash
# Initialize Elastic Beanstalk
eb init -p "Node.js 20 running on 64bit Amazon Linux 2" chatbot-app

# Create environment
eb create chatbot-prod

# Deploy
eb deploy

# Monitor
eb logs
eb open
```

### Option C: EC2 with Docker

Full control with manual management.

```bash
# Connect to EC2 instance
ssh -i key.pem ec2-user@your-instance-ip

# Install Docker & Docker Compose
sudo yum update -y
sudo yum install docker -y
sudo curl -L "https://github.com/docker/compose/releases/download/v2.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Clone repository
git clone https://github.com/felix16805/AI-Chatbot-for-Customer-Support.git
cd AI-Chatbot-for-Customer-Support

# Setup environment
cp .env.example .env.local
# Edit with production values

# Start application
docker-compose up -d

# Setup auto-restart
sudo systemctl enable docker
```

---

## 3. Railway

Simple Docker deployment with integrated services.

### Steps

1. **Connect GitHub**
   - Visit [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Connect your account
   - Select repository

2. **Add Services**
   - Infrastructure → Databases → PostgreSQL
   - Infrastructure → Databases → Redis
   - Manually configure RabbitMQ image or use external service

3. **Configure Environment**
   - Click project → Variables
   - Add all variables from `.env.example`
   - Link database variables:
     ```
     DATABASE_URL=${{Postgres.DATABASE_URL}}
     REDIS_URL=${{Redis.REDIS_URL}}
     ```

4. **Deploy**
   - Automatic on git push
   - Trigger deploy button if needed

### Features

- ✅ GitHub integration
- ✅ Built-in PostgreSQL & Redis
- ✅ Auto-scaling
- ✅ Custom domains
- ✅ Environment variables UI
- ✅ Logs and monitoring

### Pricing

- Usage-based: $5 base + compute ($0.000463/GB-hour)
- More affordable for low traffic

---

## 4. DigitalOcean

Flexible options for various deployment levels.

### Option A: App Platform (Recommended)

```bash
# Create app.yaml
cat > app.yaml << 'EOF'
name: chatbot-app
services:
- name: chatbot-app
  github:
    repo: felix16805/AI-Chatbot-for-Customer-Support
    branch: main
  build_command: npm run build
  run_command: npm start
  http_port: 3000
  envs:
  - key: NODE_ENV
    value: production
    scope: RUN_TIME
  - key: NEXTAUTH_SECRET
    value: ${NEXTAUTH_SECRET}
    scope: RUN_TIME
databases:
- name: chatbot-db
  engine: PG
  production: true
- name: chatbot-redis
  engine: REDIS
  production: true
EOF

# Deploy
doctl apps create --spec app.yaml
```

### Option B: Droplet (VPS)

```bash
# Create $6/month Droplet
doctl compute droplet create chatbot-server \
  --region nyc3 \
  --image ubuntu-24-04-x64 \
  --size s-1vcpu-1gb

# SSH in and setup
ssh root@<droplet-ip>

# Install Docker & Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Deploy
git clone <repo>
cd AI-Chatbot-for-Customer-Support
docker-compose up -d
```

---

## 5. Self-Hosted (VPS)

Deploy on any Linux VPS (Linode, Vultr, Azure VM, etc).

### Prerequisites

```bash
# SSH into VPS
ssh root@your-vps-ip

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/latest/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Deploy Application

```bash
# Clone repository
git clone https://github.com/felix16805/AI-Chatbot-for-Customer-Support.git
cd AI-Chatbot-for-Customer-Support

# Setup environment
cp .env.example .env.local
nano .env.local  # Edit with real values

# Create directories for persistent data
mkdir -p volumes/{postgres,redis,rabbitmq}

# Start services
docker-compose up -d

# Verify
docker-compose ps
curl http://localhost:3000
```

### Setup Nginx Reverse Proxy

```bash
# Install Nginx
sudo apt install nginx -y

# Create config
sudo nano /etc/nginx/sites-available/chatbot

# Add:
upstream chatbot {
    server localhost:3000;
}

server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://chatbot;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable
sudo ln -s /etc/nginx/sites-available/chatbot /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Setup SSL with Let's Encrypt

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx -y

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

### Systemd Service

Create auto-start on reboot:

```bash
# Create service file
sudo nano /etc/systemd/system/chatbot.service

# Add:
[Unit]
Description=Chatbot Application
After=docker.service
Requires=docker.service

[Service]
Type=simple
Restart=always
RestartSec=10
User=ubuntu
WorkingDirectory=/home/ubuntu/AI-Chatbot-for-Customer-Support
ExecStart=/usr/bin/docker-compose up
ExecStop=/usr/bin/docker-compose down

[Install]
WantedBy=multi-user.target

# Enable
sudo systemctl daemon-reload
sudo systemctl enable chatbot.service
sudo systemctl start chatbot.service
```

---

## Database Migrations

### For Managed Services (RDS, Cloud SQL, etc.)

```bash
# Initial migration
PRODUCTION_DATABASE_URL="postgresql://..." npx prisma migrate deploy

# Via application startup
# (Prisma automatically runs migrations on deploy if configured)
```

### Backup Database

```bash
# PostgreSQL backup
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql

# Docker backup
docker-compose exec postgres pg_dump -U chatbot_user chatbot_db > backup.sql
```

---

## Monitoring & Logging

### Application Logs

```bash
# View production logs
docker-compose logs -f app

# Export logs
docker-compose logs app > app.log

# Cloud-specific
# AWS: CloudWatch Logs
# GCP: Cloud Logging
# Azure: Log Analytics
```

### Health Checks

```bash
# Create health check endpoint
GET /api/health
Response: { status: "ok", checks: { db: true, redis: true } }

# Configure monitoring
# - Add health check to load balancer
# - Setup alerting on endpoint failures
# - Monitor response times
```

### Performance Monitoring

```bash
# Container metrics
docker stats

# Database query logs
docker-compose exec postgres psql -U chatbot_user -d chatbot_db \
  -c "SELECT * FROM pg_stat_statements LIMIT 10;"

# Redis analysis
docker-compose exec redis redis-cli info stats
```

---

## Scaling Strategies

### Horizontal Scaling

1. **Load Balancing**
   - AWS ALB / NLB
   - Nginx reverse proxy
   - Cloud load balancers

2. **Multiple Instances**
   ```bash
   # Docker Compose scale
   docker-compose up -d --scale app=3
   ```

3. **Kubernetes** (Advanced)
   - Deploy multiple replicas
   - Using HPA for auto-scaling
   - See DOCKER.md for Kubernetes manifests

### Vertical Scaling

- Increase container resources (CPU, memory)
- Use larger database instance sizes
- Upgrade Redis memory tier

### Database Optimization

- Connection pooling (PgBouncer for PostgreSQL)
- Read replicas for queries
- Caching layer (Redis)
- Index optimization

---

## Rollback Procedure

### If Deployment Fails

**Option 1: Git/GitHub**
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Trigger redeploy
# (Vercel, Railway auto-redeploy)
```

**Option 2: Docker**
```bash
# Revert to previous image tag
docker-compose down
docker tag chatbot-app:previous chatbot-app:latest
docker-compose up -d
```

**Option 3: Database**
```bash
# Restore from backup
psql $DATABASE_URL < backup.sql

# Verify data integrity
SELECT COUNT(*) FROM users;
```

---

## Incident Response

### Application Down

1. Check docker containers:
   ```bash
   docker-compose ps
   docker-compose logs app
   ```

2. Restart services:
   ```bash
   docker-compose restart
   docker-compose down && docker-compose up -d
   ```

3. Check dependencies:
   ```bash
   docker-compose logs postgres
   docker-compose logs redis
   docker-compose logs rabbitmq
   ```

### Database Issues

1. Connection pooling exhaustion → Restart app/pooler
2. Disk full → Clean old data/increase storage
3. Query performance → Run EXPLAIN, add indexes
4. Backup and restore if corrupted

### Memory Leak

1. Identify culprit:
   ```bash
   docker stats --no-stream
   ```

2. Increase limits or restart:
   ```bash
   docker-compose restart app
   ```

3. Review logs for leaks

---

## Maintenance Tasks

### Scheduled

- **Daily**: Monitor uptime, check error logs
- **Weekly**: Review performance metrics, backup verification
- **Monthly**: Database optimization, dependency updates
- **Quarterly**: Security audit, penetration testing

### Recurring

```bash
# Update dependencies
npm update

# Run security audit
npm audit

# Rebuild Docker image
docker build -t chatbot-app:latest .

# Clean Docker system
docker system prune -a
```

---

## Production Checklist

- [ ] Environment variables configured
- [ ] SSL/HTTPS enforced
- [ ] Database backups scheduled
- [ ] Monitoring alerts set
- [ ] Error tracking configured
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Logs centralized
- [ ] Staging environment matches production
- [ ] Runbook documented
- [ ] Team trained
- [ ] Support plan established

---

## Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Docs](https://vercel.com/docs)
- [AWS ECS Guide](https://docs.aws.amazon.com/en_us/ecs/)
- [Railway Documentation](https://docs.railway.app)
- [DigitalOcean Docs](https://docs.digitalocean.com)
- [Docker Compose Production](https://docs.docker.com/compose/production/)

---

**Status**: Production-ready deployment guide complete ✅

Ready for: Staging, production deployment, scaling
