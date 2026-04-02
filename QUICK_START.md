# 🚀 Quick Start Guide - Software Engineering Features

## What's Been Implemented

Your AI Chatbot now has **production-grade software engineering features**. Here's what you need to know:

---

## 📦 Installation & Setup

### 1. Install Dependencies (Already Done ✅)
```bash
npm install
```

Dependencies added:
- `next-auth` - Authentication
- `prisma` `@prisma/client` - Database ORM
- `zod` - Input validation
- `pino` - Structured logging
- `bcryptjs` - Password hashing

### 2. Configure Database (Next Step)

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL locally or use Docker
docker run --name pg -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres

# Update .env
DATABASE_URL="postgresql://postgres:password@localhost:5432/software_project?schema=public"
```

**Option B: Cloud PostgreSQL (Free)**
```bash
# Create free database
npx create-db

# Copy DATABASE_URL to .env
```

### 3. Initialize Database
```bash
# Generate Prisma client
npx prisma generate

# Create database schema
npx prisma migrate dev --name init

# View database UI
npx prisma studio
```

---

## 🔑 Key Files & Their Purpose

### Authentication
- **`lib/auth-config.ts`** - NextAuth configuration with credentials provider
- **`app/api/auth/[...nextauth]/route.ts`** - Auth API routes

### Validation
- **`lib/validation.ts`** - Zod schemas for all inputs

### Logging
- **`lib/logger.ts`** - Structured logging functions

### Error Handling
- **`lib/errors.ts`** - Error classes and utilities

### Database
- **`lib/prisma.ts`** - Prisma client singleton
- **`prisma/schema.prisma`** - Complete database schema

### API
- **`app/api/chat/route.ts`** - Chat endpoint with all SE practices

---

## 💻 Development Commands

```bash
# Start development server
npm run dev

# TypeScript type checking
npx tsc --noEmit

# Database UI
npx prisma studio

# Generate Prisma client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration_name

# View database
npx prisma studio

# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

---

## 🧪 Testing Features

### Test Authentication
```bash
# 1. Create user (signup)
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'

# 2. Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'

# 3. Response includes JWT token
{
  "user": { "id": "...", "email": "john@example.com" },
  "token": "eyJhbGc..."
}
```

### Test Chat with Validation
```bash
# Invalid input (should fail validation)
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"chatSessionId":"","content":""}'

# Response: 400 Validation Error
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": [
      { "path": "content", "message": "Message cannot be empty" }
    ]
  }
}
```

---

## 📊 Database Schema Overview

### User Table
```typescript
User {
  id: String @id
  email: String @unique
  password: String (hashed with bcrypt)
  name: String
  
  // Relations
  chatSessions: ChatSession[]
  auditLogs: AuditLog[]
}
```

### ChatSession Table
```typescript
ChatSession {
  id: String @id
  userId: String
  title: String
  messages: Message[]
  isArchived: Boolean
  createdAt: DateTime
}
```

### Message Table
```typescript
Message {
  id: String @id
  chatSessionId: String
  content: String
  role: "user" | "assistant"
  
  // Performance tracking
  modelUsed: String
  responseTime: Int (milliseconds)
  tokensUsed: Int
  
  // Error tracking
  error: String
  retryCount: Int
}
```

### ErrorLog Table
```typescript
ErrorLog {
  id: String @id
  userId: String
  message: String
  stack: String
  path: String
  statusCode: Int
  severity: "error" | "warn" | "info"
  createdAt: DateTime
}
```

### AuditLog Table
```typescript
AuditLog {
  id: String @id
  userId: String
  action: String
  resource: String
  resourceId: String
  changes: JSON
  ipAddress: String
  userAgent: String
  status: "success" | "failed"
  createdAt: DateTime
}
```

---

## 🛡️ Security Features

### Password Security
- Passwords hashed with `bcryptjs`
- Minimum 6 characters
- Can enforce complexity rules
- Never stored in plain text

### Session Management
- JWT tokens (JSON Web Tokens)
- 7-day expiration
- HTTP-only cookies (in browser)
- Automatic validation

### Authorization
- Users can only access their own data
- Resource ownership verification
- Chat session isolation per user

### Input Validation
- All inputs validated with Zod
- Type-safe at compile-time
- Runtime validation on API calls
- Clear error messages

---

## 📝 Error Codes Reference

| Code | Status | Meaning |
|------|--------|---------|
| `VALIDATION_ERROR` | 400 | Invalid input data |
| `AUTHENTICATION_ERROR` | 401 | Not logged in |
| `AUTHORIZATION_ERROR` | 403 | Don't have permission |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource already exists |
| `RATE_LIMIT` | 429 | Too many requests |
| `INTERNAL_SERVER_ERROR` | 500 | Server error |

---

## 🔍 Logging Examples

All logs are stored in the database for debugging:

### ErrorLog Table
```json
{
  "message": "User not found",
  "severity": "warn",
  "path": "/api/chat",
  "statusCode": 404,
  "userId": "user-123",
  "createdAt": "2024-04-02T10:30:00Z"
}
```

### AuditLog Table
```json
{
  "action": "LOGIN",
  "userId": "user-123",
  "status": "success",
  "ipAddress": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "createdAt": "2024-04-02T10:30:00Z"
}
```

---

## 🚨 Common Issues & Solutions

### Issue: "Cannot find module Prisma"
**Solution**:
```bash
npx prisma generate
```

### Issue: "DATABASE_URL is not set"
**Solution**: 
- Add DATABASE_URL to `.env` file
- Ensure PostgreSQL is running
- Check connection string format

### Issue: "Password comparison failed"
**Solution**:
- Ensure password has uppercase, number
- Check email exists in database
- Verify hashed password in DB

### Issue: "JWT token invalid"
**Solution**:
- Check NEXTAUTH_SECRET in `.env`
- Verify token hasn't expired
- Clear cookies and login again

---

## 📈 Performance Monitoring

### View Performance Metrics
```sql
-- Most time-consuming operations
SELECT endpoint, AVG(responseTime) as avg_time 
FROM ApiMetric 
GROUP BY endpoint 
ORDER BY avg_time DESC;

-- Recent errors
SELECT message, severity, path, COUNT(*) as count
FROM ErrorLog
WHERE createdAt > now() - interval '1 hour'
GROUP BY message, severity, path;

-- User activity
SELECT action, status, COUNT(*) as count
FROM AuditLog
WHERE createdAt > now() - interval '24 hours'
GROUP BY action, status;
```

---

## 📚 Documentation Files

- **`SE_FEATURES.md`** - Detailed feature documentation
- **`ARCHITECTURE.md`** - System architecture and flows
- **`IMPLEMENTATION_SUMMARY.md`** - Implementation summary
- **`README.md`** - Basic project info

---

## 🎓 For Your Course Presentation

**Key Points to Explain**:

1. **Database**: PostgreSQL + Prisma (migrations, relationships)
2. **Authentication**: NextAuth.js (JWT, sessions, credentials)
3. **Validation**: Zod (type-safe, runtime checking)
4. **Logging**: Pino + Database (observability, auditing)
5. **Error Handling**: Custom classes (fail-safe, standardized)
6. **API Design**: RESTful, consistent responses
7. **Security**: Password hashing, authorization, validation
8. **Type Safety**: TypeScript + Zod (compile + runtime)

**Code to Show**:
- `prisma/schema.prisma` - Database design
- `lib/auth-config.ts` - Auth implementation
- `lib/validation.ts` - Validation strategy
- `lib/errors.ts` - Error handling
- `app/api/chat/route.ts` - Complete integration

---

## 🔄 Phase 2 Roadmap

Ready for next phase:
- ✅ Database (PostgreSQL)
- ✅ Authentication (NextAuth)
- ✅ Validation (Zod)
- ✅ Logging (Pino)
- ✅ Error Handling

**Next steps**:
- [ ] RabbitMQ (message queue)
- [ ] Redis (caching)
- [ ] Rate Limiting
- [ ] Testing Suite (Jest)
- [ ] CI/CD Pipeline (GitHub Actions)

---

**Version**: 1.0  
**Status**: ✅ Ready to Deploy  
**Last Updated**: April 2, 2026
