# 🏗️ Software Engineering Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                         │
│                    - Next.js Pages & Components                  │
│                    - User Authentication UI                      │
│                    - Chat Interface                              │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTP/HTTPS
            ┌──────────────┴──────────────┐
            │                             │
    ┌───────▼────────┐          ┌────────▼───────┐
    │  /api/auth/*   │          │ /api/chat      │
    │  (NextAuth)    │          │ (Chat Handler) │
    └────────┬───────┘          └────────┬───────┘
             │                           │
   ┌─────────▼────────┐      ┌──────────▼──────────┐
   │  Authentication  │      │  Chat Processing    │
   │  ✅ Validation   │      │  ✅ Validation      │
   │  ✅ JWT Token    │      │  ✅ Authorization   │
   │  ✅ Session Mgmt │      │  ✅ AI Model Call   │
   └────────┬─────────┘      └──────────┬──────────┘
            │                           │
            └───────────────┬───────────┘
                            │
        ┌───────────────────▼────────────────────┐
        │                                        │
   ┌────▼────────────────┐          ┌────────────▼──────┐
   │  LOGGING SYSTEM     │          │  ERROR HANDLER    │
   │                     │          │                   │
   │  ✅ API Requests    │          │  ✅ Custom Errors │
   │  ✅ Auth Events    │          │  ✅ Validation    │
   │  ✅ Model Usage    │          │  ✅ Logging       │
   │  ✅ Errors         │          │  ✅ Response Fmt  │
   └────┬────────────────┘          └────────────┬──────┘
        │                                        │
        └────────────────────┬───────────────────┘
                             │
        ┌────────────────────▼────────────────────┐
        │                                         │
        │         POSTGRESQL DATABASE            │
        │                                         │
        │  ┌─────────────────────────────────┐   │
        │  │ User                            │   │
        │  │ ├─ id, email, password (hashed) │   │
        │  │ ├─ name, avatar                 │   │
        │  │ └─ timestamps (created, updated)│   │
        │  └─────────────────────────────────┘   │
        │                                         │
        │  ┌─────────────────────────────────┐   │
        │  │ ChatSession                     │   │
        │  │ ├─ id, userId                   │   │
        │  │ ├─ title, isArchived            │   │
        │  │ └─ messages (relation)          │   │
        │  └─────────────────────────────────┘   │
        │                                         │
        │  ┌─────────────────────────────────┐   │
        │  │ Message                         │   │
        │  │ ├─ id, chatSessionId            │   │
        │  │ ├─ content, role (user/assist)  │   │
        │  │ ├─ modelUsed, responseTime      │   │
        │  │ ├─ tokensUsed, error, retry     │   │
        │  │ └─ timestamps                   │   │
        │  └─────────────────────────────────┘   │
        │                                         │
        │  ┌─────────────────────────────────┐   │
        │  │ ErrorLog                        │   │
        │  │ ├─ message, stack, code         │   │
        │  │ ├─ method, path, statusCode     │   │
        │  │ ├─ severity, userId             │   │
        │  │ └─ timestamp                    │   │
        │  └─────────────────────────────────┘   │
        │                                         │
        │  ┌─────────────────────────────────┐   │
        │  │ AuditLog                        │   │
        │  │ ├─ action, resource, resourceId │   │
        │  │ ├─ userId, status, changes      │   │
        │  │ ├─ ipAddress, userAgent         │   │
        │  │ └─ timestamp                    │   │
        │  └─────────────────────────────────┘   │
        │                                         │
        └─────────────────────────────────────────┘
```

---

## Authentication Flow

```
User                 API                  NextAuth            Database
 │                   │                       │                   │
 ├─ POST /login ────>│                       │                   │
 │ (email, pwd)      │                       │                   │
 │                   │─ Validate Input ─────>│                   │
 │                   │                       │                   │
 │                   │─ Find User ───────────────────────────────>│
 │                   │                       │                   │
 │                   │<──────── User ────────────────────────────<│
 │                   │                       │                   │
 │                   │─ Compare Password ───>│                   │
 │                   │   (bcrypt)            │                   │
 │                   │                       │                   │
 │                   │<─ Password Match ─────│                   │
 │                   │                       │                   │
 │                   │─ Create JWT Token ───>│                   │
 │                   │                       │                   │
 │<─ 200 OK ─────────│<─ Token + User ──────│                   │
 │   (JWT, cookie)   │                      │                   │
 │                   │                       │                   │
 │─ Authenticated ──                       │                   │
```

---

## Chat Message Processing Flow

```
User Message                Chat API          Validation       AI Model
     │                         │                  │               │
     ├───── POST /chat ───────>│                  │               │
     │    (message content)    │                  │               │
     │                         │                  │               │
     │                    ┌────▼─────────────────────────────┐
     │                    │  1. AUTHENTICATION CHECK        │
     │                    │     - Check session             │
     │                    │     - Verify JWT token          │
     │                    └────┬─────────────────────────────┘
     │                         │
     │                    ┌────▼─────────────────────────────┐
     │                    │  2. INPUT VALIDATION (Zod)     │
     │                    │     - Schema validation         │
     │                    │     - Message length check      │
     │                    │     - Type checking             │
     │                    └────┬─────────────────────────────┘
     │                         │
     │                    ┌────▼─────────────────────────────┐
     │                    │  3. AUTHORIZATION CHECK        │
     │                    │     - Verify user owns session  │
     │                    │     - Check chat access         │
     │                    └────┬─────────────────────────────┘
     │                         │
     │                    ┌────▼─────────────────────────────┐
     │                    │  4. STORE USER MESSAGE         │
     │                    │     - Create Message record    │
     │                    │     - Log to database          │
     │                    └────┬─────────────────────────────┘
     │                         │
     │                         ├─────────> Prisma Insert
     │                         │
     │                    ┌────▼─────────────────────────────┐
     │                    │  5. CALL AI MODEL               │
     │                    │     ├─ Send message to Gemini  │
     │                    ├─────────────────────────────────>│
     │                    │                                  │
     │                    │<─────────────────────────────────├─ AI Response
     │                    │         Parse Response          │
     │                    └────┬─────────────────────────────┘
     │                         │
     │                    ┌────▼─────────────────────────────┐
     │                    │  6. STORE RESPONSE             │
     │                    │     - Save AI message          │
     │                    │     - Record response time      │
     │                    │     - Track tokens used        │
     │                    └────┬─────────────────────────────┘
     │                         │
     │                         ├─────────> Prisma Insert
     │                         │
     │                    ┌────▼─────────────────────────────┐
     │                    │  7. LOGGING                    │
     │                    │     ├─ Log model usage          │
     │                    │     ├─ Track response time      │
     │                    │     ├─ Record user intent       │
     │                    │     └─ Audit trail             │
     │                    └────┬─────────────────────────────┘
     │                         │
     │<─── 200 OK ────────────<│
     │  { success: true,
     │    data: { messages,
     │           modelResponse,
     │           responseTime }
     │  }
```

---

## Error Handling Flow

```
Request
   │
   ├─> Validation Error
   │   ├─ 400 Bad Request
   │   ├─ Log to ErrorLog
   │   └─ Return Error Response
   │
   ├─> Authentication Error
   │   ├─ 401 Unauthorized
   │   ├─ Log to AuditLog
   │   └─ Redirect to Login
   │
   ├─> Authorization Error
   │   ├─ 403 Forbidden
   │   ├─ Log to AuditLog
   │   └─ Access Denied Response
   │
   ├─> Not Found Error
   │   ├─ 404 Not Found
   │   ├─ Log to ErrorLog
   │   └─ Resource Not Found
   │
   ├─> Rate Limit Error
   │   ├─ 429 Too Many Requests
   │   ├─ Log to ErrorLog
   │   └─ Retry-After Header
   │
   └─> Internal Server Error
       ├─ 500 Server Error
       ├─ Log to ErrorLog with stack
       └─ Generic Error Response
```

---

## Data Flow: Logging System

```
API Request/Response
        │
        ├────> logger.logApiRequest()
        │      ├─ Log to console (dev)
        │      └─ Store in ErrorLog table
        │
        ├────> logger.logAuthEvent()
        │      ├─ Log to console
        │      └─ Store in AuditLog table
        │
        ├────> logger.logModelUsage()
        │      ├─ Log to console
        │      └─ Store in AuditLog table
        │
        └────> logger.logDatabaseOperation()
               ├─ Log to console
               └─ Store in ErrorLog table
```

---

## Security Layers

```
┌─────────────────────────────────────────────────────────┐
│                    Layer 1: Input                       │
│              Validation (Zod Schemas)                   │
│     - Type checking                                     │
│     - Format validation                                 │
│     - Length/range constraints                          │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│               Layer 2: Authentication                   │
│                 (NextAuth + JWT)                        │
│     - User identity verification                        │
│     - Session management                               │
│     - Token expiration                                 │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│              Layer 3: Authorization                     │
│           (Resource Ownership Check)                    │
│     - Verify user owns resource                         │
│     - Check permissions                                │
│     - Enforce data isolation                           │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│              Layer 4: Error Handling                    │
│           (Type-Safe Error Classes)                     │
│     - Domain-specific errors                           │
│     - Proper HTTP status codes                         │
│     - Detailed logging and audit trails                │
└──────────────────────┬──────────────────────────────────┘
                       │
                   Secure!
```

---

## Type Safety Architecture

```
Compile Time                Runtime
    │                          │
    ├─ TypeScript              ├─ Zod Validation
    │  ├─ Type checking        │  ├─ Schema parsing
    │  ├─ Interface validation │  ├─ Runtime type guards
    │  └─ Static analysis      │  └─ Error messages
    │                          │
    ├─ NextAuth Types          ├─ Prisma Client
    │  ├─ Session shapes       │  ├─ Type-safe queries
    │  └─ User objects         │  └─ Model validation
    │                          │
    └─ ErrorCatching           └─ Error Classification
       ├─ Custom error types      ├─ Safe error handling
       └─ Type assertions          └─ Proper status codes
```

---

**Diagram Version**: 1.0  
**Last Updated**: April 2, 2026  
**Status**: ✅ Complete
