# Software Engineering Features - Implementation Guide

## Overview
This document demonstrates **10+ core software engineering practices** implemented in the AI Chatbot project for your college course. Each feature is production-grade and explains the SE principles behind it.

---

## 1. ✅ DATABASE & DATA PERSISTENCE

### Feature: PostgreSQL with Prisma ORM
**Location**: `prisma/schema.prisma`

**SE Principles Demonstrated**:
- **Data Modeling** - Proper schema design with relationships
- **Migrations** - Version-controlled database changes
- **Normalization** - Avoiding data duplication

**Models Implemented**:
```
User → ChatSession → Message
     → Account (OAuth)
     → Session (Token management)
     → AuditLog (Compliance)
     → ErrorLog (Monitoring)
```

**Key Tables**:
- `User` - User authentication & profile
- `ChatSession` - Conversation grouping
- `Message` - Individual messages with performance tracking
- `ErrorLog` - Application errors for debugging
- `AuditLog` - Security audit trails
- `ApiMetric` - Performance metrics

**Usage Example**:
```typescript
// Store message with error tracking
await prisma.message.create({
  data: {
    chatSessionId,
    content: userMessage,
    role: "user",
    retryCount: 0,
  },
});
```

---

## 2. ✅ AUTHENTICATION & SECURITY

### Feature: NextAuth.js v5 with JWT
**Location**: `lib/auth-config.ts`, `app/api/auth/[...nextauth]/route.ts`

**SE Principles Demonstrated**:
- **Authentication** - Secure user identity verification
- **Authorization** - Permission-based access control
- **Session Management** - Stateless JWT tokens
- **Password Security** - Bcrypt hashing

**Security Features**:
- Credentials provider with email/password
- Password validation with Zod schema
- 7-day session expiration
- Secure HTTP-only cookies
- CORS protection

**Implementation**:
```typescript
// Credentials validation with Zod
const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Password comparison with bcrypt
const passwordsMatch = await compare(plainPassword, hashedPassword);

// JWT callback with custom claims
async jwt({ token, user }) {
  if (user) token.id = user.id;
  return token;
}
```

---

## 3. ✅ INPUT VALIDATION

### Feature: Zod Schema Validation
**Location**: `lib/validation.ts`

**SE Principles Demonstrated**:
- **Type Safety** - Compile-time and runtime validation
- **Data Integrity** - Preventing malformed inputs
- **Error Handling** - Clear validation error messages

**Validation Schemas**:
- `LoginSchema` - Email + password format
- `SignupSchema` - Password complexity rules
- `SendMessageSchema` - Message content validation
- `PaginationSchema` - Query parameter validation
- `ErrorLogFilterSchema` - Advanced filtering

**Example**:
```typescript
// Strong password validation
password: z
  .string()
  .min(6, "Password must be at least 6 characters")
  .regex(/[A-Z]/, "Must contain uppercase letter")
  .regex(/[0-9]/, "Must contain number")

// Type-safe helper
const [isValid, data, errors] = validateInput(LoginSchema, inputs);
```

---

## 4. ✅ STRUCTURED LOGGING

### Feature: Pino Structured Logger
**Location**: `lib/logger.ts`

**SE Principles Demonstrated**:
- **Observability** - Understanding application behavior
- **Performance Tracking** - Response times and metrics
- **Security Auditing** - User activity tracking
- **Debugging** - Structured logs for troubleshooting

**Log Types**:

1. **API Requests**
```typescript
logApiRequest({
  userId: "user-id",
  method: "POST",
  path: "/api/chat",
  statusCode: 200,
  responseTime: 245,
});
```

2. **Authentication Events**
```typescript
logAuthEvent({
  action: "LOGIN",
  email: "user@example.com",
  success: true,
  ipAddress: "192.168.1.1",
});
```

3. **Model Usage Tracking**
```typescript
logModelUsage({
  userId,
  model: "gemini-2.5-flash",
  inputTokens: 150,
  outputTokens: 98,
  responseTime: 450,
  success: true,
});
```

4. **Database Operations**
```typescript
logDatabaseOperation({
  operation: "SELECT",
  table: "messages",
  duration: 12,
});
```

**Storage**: Logs are both printed (development) and stored in `ErrorLog` and `AuditLog` tables.

---

## 5. ✅ ERROR HANDLING

### Feature: Custom Error Classes & Middleware
**Location**: `lib/errors.ts`

**SE Principles Demonstrated**:
- **Exception Handling** - Typed errors for different scenarios
- **Fail-Safe Design** - Graceful error recovery
- **User-Friendly Messages** - Clear error communication
- **Logging Integration** - Automatic error tracking

**Error Hierarchy**:
```
AppError (base)
├── ValidationError (400)
├── AuthenticationError (401)
├── AuthorizationError (403)
├── NotFoundError (404)
├── ConflictError (409)
├── RateLimitError (429)
└── InternalServerError (500)
```

**Usage in Chat API**:
```typescript
if (!session?.user?.id) {
  throw new AuthenticationError("You must be logged in");
}

if (!chatSession) {
  throw new ValidationError("Chat session not found");
}

// Automatic error response
return errorResponse(error, error.statusCode);
```

**Response Format** (Consistent API responses):
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": [
      { "path": "email", "message": "Invalid email" }
    ]
  },
  "timestamp": "2024-04-02T10:30:00Z"
}
```

---

## 6. ✅ MODEL INTEGRATION & COST TRACKING

### Feature: AI Model Usage Analytics
**Location**: `app/api/chat/route.ts`

**SE Principles Demonstrated**:
- **Cost Monitoring** - Tracking API usage and expenses
- **Performance Metrics** - Response time analysis
- **Model Versioning** - Tracking which model version was used
- **Retry Logic** - Error recovery with retry tracking

**Tracked Metrics**:
```typescript
// Store in Message table
{
  modelUsed: "gemini-2.5-flash",
  responseTime: 450,  // milliseconds
  tokensUsed: 248,    // input + output
  error: null,
  retryCount: 0,
}

// Log to AuditLog for analytics
logModelUsage({
  model: "gemini-2.5-flash",
  inputTokens: 150,
  outputTokens: 98,
  responseTime: 450,
  success: true,
});
```

---

## 7. ✅ API DESIGN & CONSISTENCY

### Feature: RESTful API with Standardized Responses
**Location**: `app/api/chat/route.ts`

**SE Principles Demonstrated**:
- **REST Conventions** - Proper HTTP methods and status codes
- **Response Consistency** - All endpoints return same format
- **Status Codes** - Semantic HTTP status usage
- **Documentation** - Inline comments explaining design

**Standardized Response Structure**:
```typescript
// Success response
{
  success: true,
  data: { /* response data */ },
  timestamp: "2024-04-02T10:30:00Z"
}

// Error response
{
  success: false,
  error: {
    message: "...",
    code: "ERR_CODE",
    details: { /* optional */ }
  },
  timestamp: "2024-04-02T10:30:00Z"
}
```

---

## 8. ✅ PERMISSION & ACCESS CONTROL

### Feature: User-Scoped Data Access
**Location**: `app/api/chat/route.ts` (lines ~125-130)

**SE Principles Demonstrated**:
- **Authorization** - Verify user owns resource
- **Data Privacy** - Prevent unauthorized access
- **Resource Isolation** - Multi-tenant safety

**Implementation**:
```typescript
// Verify user owns chat session
const chatSession = await prisma.chatSession.findFirst({
  where: { 
    id: chatSessionId,
    userId,  // ← Prevents other users accessing this session
  },
});

if (!chatSession) {
  throw new ValidationError("Chat session not found");
}
```

---

## 9. ✅ DATABASE TRANSACTIONS & CONSISTENCY

### Feature: Multi-Step Operations with Error Recovery
**Location**: `app/api/chat/route.ts`

**SE Principles Demonstrated**:
- **Data Consistency** - Atomic operations
- **Error Recovery** - Rollback on failure
- **Audit Trails** - Tracking all changes

**Example Flow**:
```
1. Create user message ✓
2. Call AI model ✓
3. Create AI response ✓
4. Log to audit trail ✓
5. Return combined response ✓

If step 3 fails:
- Error logged automatically
- User still sees the attempt
- Retry count tracked
```

---

## 10. ✅ ENVIRONMENT & CONFIGURATION MANAGEMENT

### Feature: Environment Variables with Validation
**Location**: `.env`

**SE Principles Demonstrated**:
- **Security** - Sensitive data not in code
- **Configuration** - Environment-specific settings
- **DevSecOps** - Secret management

**Configuration**:
```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=...
GEMINI_API_KEY=...
NODE_ENV=development
```

---

## 11. ✅ PERFORMANCE MONITORING

### Feature: Response Time Tracking
**Location**: `lib/logger.ts`, `app/api/chat/route.ts`

**SE Principles Demonstrated**:
- **Performance Analysis** - Identifying bottlenecks
- **SLA Compliance** - Tracking response time SLAs
- **Optimization** - Data-driven improvements

**Tracking**:
```typescript
const startTime = Date.now();
// ... do work ...
const duration = Date.now() - startTime;

// Store in ApiMetric table
await prisma.apiMetric.create({
  data: {
    endpoint: "/api/chat",
    responseTime: duration,
    statusCode: 200,
  },
});
```

---

## 12. ✅ AUDIT LOGGING & COMPLIANCE

### Feature: Complete Audit Trail
**Location**: `prisma/schema.prisma` (AuditLog model)

**SE Principles Demonstrated**:
- **Compliance** - Meeting regulatory requirements
- **Security** - Detecting unauthorized access
- **Debugging** - Finding when things changed

**Audit Log Fields**:
```typescript
{
  action: "LOGIN" | "CREATE_CHAT" | "DELETE_MESSAGE",
  userId: "user-id",
  resource: "ChatSession",
  resourceId: "chat-id",
  changes: JSON.stringify(before), // before/after values
  ipAddress: "192.168.1.1",
  userAgent: "Mozilla/5.0...",
  status: "success" | "failed",
  createdAt: timestamp,
}
```

---

## Setup & Usage

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
# Edit .env with your values
cp .env.example .env.local
```

### 3. Initialize Database (When ready with PostgreSQL)
```bash
# Generate Prisma client
npx prisma generate

# Create database schema
npx prisma migrate dev --name init

# View database UI
npx prisma studio
```

### 4. Run Development Server
```bash
npm run dev
```

---

## Testing the Features

### Test Authentication
```bash
# Signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"Secure123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Secure123"}'
```

### Test Chat with Validation
```bash
# Invalid input (should return 400)
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"content":""}'

# Valid input (requires authentication)
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"chatSessionId":"xyz","content":"Help with my order"}'
```

---

## Project Structure

```
lib/
  ├── auth-config.ts      [SE] Authentication strategy
  ├── prisma.ts           [SE] Database singleton
  ├── logger.ts           [SE] Structured logging
  ├── validation.ts       [SE] Input validation schemas
  └── errors.ts           [SE] Error handling utilities

app/api/
  ├── auth/               [SE] Authentication routes
  ├── chat/               [SE] Chat with all SE practices

prisma/
  ├── schema.prisma       [SE] Data models with audit logs
  └── migrations/         [SE] Version-controlled schema changes
```

---

## SE Features Checklist for Your Course

- ✅ Database Design & Migration
- ✅ Authentication & Session Management
- ✅ Authorization & Access Control
- ✅ Input Validation
- ✅ Error Handling
- ✅ Structured Logging
- ✅ Audit Trails
- ✅ Performance Monitoring
- ✅ API Design Standards
- ✅ Configuration Management
- ✅ Cost Tracking (Model Usage)
- ✅ Type Safety (TypeScript + Zod)

---

## Next Steps (Phase 2)

These features are ready to implement:
1. **RabbitMQ Integration** - Async message queue for notifications
2. **Redis Caching** - Session and response caching
3. **Rate Limiting** - Prevent abuse
4. **CI/CD Pipeline** - GitHub Actions for testing
5. **Testing Suite** - Jest + API tests

---

**Author**: College Software Engineering Project
**Date**: April 2024
**Stack**: Next.js 16 + React 19 + TypeScript + PostgreSQL + Prisma
