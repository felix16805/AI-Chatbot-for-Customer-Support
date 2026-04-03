# 🔒 Security Hardening Documentation

## Overview

This document outlines all security improvements and best practices implemented in this application, following **OWASP Top 10** and industry standards.

---

## 🎯 Quick Summary of Security Improvements

### 1. ✅ Rate Limiting Implementation
**Problem Solved:** No protection against brute force attacks or DoS attacks  
**Solution Implemented:**
- **IP-based rate limiting**: Limits requests per IP address
- **User-based rate limiting**: Limits requests per authenticated user
- **Endpoint-specific limits**: Different limits for different endpoints
- **Graceful 429 responses**: Returns `Retry-After` header for client guidance

**Usage:**
```typescript
// Authentication endpoints: 5 requests per 15 minutes per IP
await strictAuthRateLimiter(request);

// General public endpoints: 100 requests per 15 minutes per IP  
await apiRateLimiter(request);

// Authenticated user endpoints: 1000 requests per hour per user
await userRateLimiter(request, userId);
```

**Configuration in `.env`:**
```env
RATE_LIMIT_AUTH_WINDOW_MS=900000
RATE_LIMIT_AUTH_MAX=5
```

---

### 2. ✅ Strict Input Validation & Sanitization
**Problem Solved:** 
- No protection against XSS attacks
- No validation of unexpected fields
- Passwords stored with weak encoding (base64)

**Solution Implemented:**

#### A. Zod Schema Validation with `.strict()`
```typescript
// Rejects unknown fields - prevents injection of extra data
export const SignupSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  password: z.string().min(8).max(100)
    .regex(/[A-Z]/)      // Uppercase
    .regex(/[a-z]/)      // Lowercase
    .regex(/[0-9]/)      // Number
    .regex(/[!@#$%^&*]/), // Special char
}).strict(); // CRITICAL: Rejects unknown fields
```

#### B. Input Sanitization Functions
```typescript
import { sanitizeString, sanitizeEmail, stripSensitiveFields } from "@/lib/sanitization";

// Remove XSS attacks
const cleanInput = sanitizeString(userInput);

// Normalize and sanitize email
const email = sanitizeEmail(raw_email);

// Strip sensitive fields before logging
const safeData = stripSensitiveFields({ 
  password: "secret", 
  email: "user@example.com" 
});
// Result: { email: "user@example.com" } (password removed)
```

#### C. Available Sanitization Utilities
- `sanitizeString()` - Removes XSS, control characters, script tags
- `sanitizeEmail()` - Normalizes and sanitizes email
- `stripSensitiveFields()` - Removes passwords, tokens, API keys before logging
- `isValidURL()` - Prevents SSRF attacks
- `isValidUUID()` - Validates resource IDs
- `validatePasswordStrength()` - Enforces password requirements
- `escapeHtml()` - Escapes HTML entities in output
- `containsSQLInjectionPatterns()` - Detects SQL injection attempts

---

### 3. ✅ Secure API Key Management
**Problem Solved:**
- API keys exposed in URL query parameters (visible in logs, browser history, referer header)
- No key rotation mechanism
- Keys hardcoded in source code

**Solution Implemented:**

#### A. Server-Side Proxy Pattern
```typescript
// BEFORE (INSECURE) - Key exposed in URL:
const GEMINI_API_URL = 
  `https://api.example.com?key=${GEMINI_API_KEY}`;  // ❌ EXPOSED

// AFTER (SECURE) - Key in Authorization header:
const headers = apiKeyManager.getAuthHeaders("gemini", "Bearer");
// Automatically uses: Authorization: Bearer <key>  ✅ HIDDEN
```

#### B. Centralized API Key Manager
```typescript
import { apiKeyManager } from "@/lib/apiKeyManager";

// Check if provider is configured
if (!apiKeyManager.isProviderConfigured("gemini")) {
  throw new Error("Gemini not configured");
}

// Get key securely (usage is tracked)
const key = apiKeyManager.getApiKey("gemini");

// Get authentication headers for API calls
const headers = apiKeyManager.getAuthHeaders("gemini");
// Usage in fetch:
const response = await fetch(url, {
  headers: {
    ...headers,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});
```

#### C. Key Rotation Support
```typescript
// Check if key needs rotation (recommend 90 days)
if (apiKeyManager.shouldRotateKey("gemini", 90)) {
  console.log("⚠️  API key rotation recommended");
  // Implement key rotation procedure
}

// Get usage statistics for monitoring
const stats = apiKeyManager.getUsageStats();
// Track suspicious activity or excessive usage

// Rotate key when needed
apiKeyManager.rotateKey("gemini", newKeyValue);
```

#### D. Environment Variables (`.env`)
```env
# SECURITY CRITICAL - Never commit to git!
GEMINI_API_KEY=AIzaSyGd8S...
OPENAI_API_KEY=sk-proj-...
ANTHROPIC_API_KEY=sk-ant-...

# Rotation tracking
API_KEY_ROTATION_DAYS=90
```

---

### 4. ✅ Password Security & Hashing
**Problem Solved:**
- Passwords stored with base64 encoding (trivial to decode)
- No password strength requirements
- No account lockout protection

**Solution Implemented:**

#### A. Bcrypt Password Hashing
```typescript
import { 
  hashPassword, 
  verifyPassword, 
  BCRYPT_ROUNDS 
} from "@/lib/authSecure";

// Hash password on signup (async operation ~250ms)
const passwordHash = await hashPassword(userPassword);
// Stores: $2b$12$... (bcrypt hash with salt)

// Verify password on login (timing-safe comparison)
const isValid = await verifyPassword(userPassword, storedHash);
```

#### B. Password Requirements
- Minimum 8 characters (configurable: `MIN_PASSWORD_LENGTH`)
- Must include uppercase letter
- Must include lowercase letter
- Must include number
- Must include special character (!@#$%^&*)

#### C. Account Lockout Protection
```typescript
import { isAccountLocked, recordAuthAttempt } from "@/lib/authSecure";

if (isAccountLocked(email)) {
  throw new ValidationError("Account locked. Try again in 15 minutes.");
}

// After failed attempt
recordAuthAttempt(email, false);

// After successful login
recordAuthAttempt(email, true);
```

**Configuration:**
```env
MAX_LOGIN_ATTEMPTS=5           # Lock after 5 failures
ACCOUNT_LOCKOUT_MINUTES=15     # Unlock after 15 minutes
```

---

### 5. ✅ Authentication Endpoint Security
**Affected Endpoints:** `POST /api/auth/signup`, `POST /api/auth/login`

**Security Measures:**
1. **Strict rate limiting** (5 attempts per 15 minutes per IP)
2. **Strict input validation** (Zod with `.strict()`)
3. **Input sanitization** (XSS prevention)
4. **Bcrypt password hashing** (not base64)
5. **Account lockout** (after 5 failed attempts)
6. **Generic error messages** (prevents user enumeration)
7. **Timing-safe comparison** (prevents timing attacks)
8. **Secure HTTP-only cookies** (XSS protection)

**Example Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clxyz123",
      "email": "user@example.com",
      "name": "John Doe"
    }
  },
  "timestamp": "2024-01-15T10:30:45Z"
}
```

**Response (Rate Limited):**
```json
HTTP/1.1 429 Too Many Requests
Retry-After: 900

{
  "success": false,
  "error": {
    "message": "Too many login attempts. Please try again later.",
    "code": "RATE_LIMIT_ERROR"
  }
}
```

---

### 6. ✅ Chat Endpoint Security
**Endpoint:** `POST /api/chat`

**Security Measures:**
1. **User-based rate limiting** (1000 requests/hour per user)
2. **Strict input validation** (Zod with `.strict()`)
3. **Input sanitization** (XSS prevention via `sanitizeString()`)
4. **Authorization check** (verify user owns chat session)
5. **Secure API key handling** (via `apiKeyManager`)
6. **Sensitive data filtering** (strip keys before logging)
7. **Error handling** (graceful failures, no info leakage)

**Example Implementation:**
```typescript
// Rate limiting for authenticated users
await userRateLimiter(request, userId);

// Strict validation rejects unknown fields
const validation = SendMessageSchema.safeParse(body);

// Sanitize input to prevent XSS
let content = sanitizeString(validatedContent);

// Secure API key retrieval
const apiKey = apiKeyManager.getApiKey("gemini");

// Strip sensitive data before logging
logger.info(stripSensitiveFields(requestData), "Chat request");
```

---

## 🛡️ Security Best Practices Implemented

### OWASP Top 10 Coverage

| OWASP Risk | Status | Solution |
|-----------|--------|----------|
| **A01: Broken Access Control** | ✅ Fixed | Rate limiting, authorization checks, strict validation |
| **A02: Cryptographic Failures** | ✅ Fixed | Bcrypt hashing, HTTPS enforcement, secure cookies |
| **A03: Injection** | ✅ Fixed | Zod validation, input sanitization, parameterized queries |
| **A04: Insecure Design** | ✅ Fixed | Rate limiting, account lockout, secure defaults |
| **A05: Security Misconfiguration** | ✅ Fixed | Environment variables, security headers enabled |
| **A06: Vulnerable & Outdated Components** | ✅ Fixed | Regular dependency updates, bcryptjs, zod |
| **A07: Identification & Authentication Failures** | ✅ Fixed | Bcrypt, rate limiting, account lockout, session security |
| **A08: Data Integrity Failures** | ✅ Fixed | Input validation, error handling, logging |
| **A09: Logging & Monitoring Failures** | ✅ Fixed | Structured logging with Pino, security event tracking |
| **A10: SSRF** | ✅ Fixed | URL validation, whitelisting allowed external services |

### CWE Mitigation

| CWE ID | Issue | Mitigation |
|--------|-------|-----------|
| **CWE-79** | Cross-site Scripting (XSS) | Input sanitization, output escaping |
| **CWE-89** | SQL Injection | Prisma parameterized queries, input validation |
| **CWE-200** | Exposure of Sensitive Info | Strip before logging, use Authorization headers |
| **CWE-256** | Plaintext Password Storage | Bcrypt hashing with 12 rounds |
| **CWE-287** | Improper Authentication | Rate limiting, account lockout, secure session |
| **CWE-327** | Weak Cryptography | Bcryptjs instead of base64 |
| **CWE-352** | Cross-Site Request Forgery | CSRF-safe cookies (`sameSite: strict`) |
| **CWE-613** | Insufficient Session Expiration | 7-day token expiry |
| **CWE-640** | Weak Password Recovery | Account lockout prevents brute force |
| **CWE-798** | Hardcoded Credentials | All secrets in `.env`, never in code |

---

## 📋 API Key Rotation Procedure

### Monthly Rotation (Recommended Every 90 Days)

**Step 1: Generate New Key**
```bash
# Generate new API key from provider dashboard
# Example: Google Gemini: https://makersuite.google.com/app/apikey
# Copy new key value
```

**Step 2: Update Environment Variable**
```bash
# In production secret manager (AWS Secrets Manager, Azure Key Vault, etc.)
# Update GEMINI_API_KEY to new value
# Service should automatically reload

# Or manually update .env and restart:
GEMINI_API_KEY=AIzaSyGd8S... # new key
```

**Step 3: Verify New Key Works**
```bash
# Test chat endpoint to verify API connectivity
curl -X POST http://localhost:3000/api/chat \
  -H "Authorization: Bearer <auth_token>" \
  -H "Content-Type: application/json" \
  -d '{"chatSessionId":"...", "content":"test"}'
```

**Step 4: Revoke Old Key**
```bash
# Go to provider dashboard and disable old key
# Monitor for any errors (indicates old key still in use)
```

**Step 5: Document Rotation**
```bash
# Log the rotation in a document:
# Last rotated: 2024-01-15
# Next rotation due: 2024-04-15 (90 days)
```

---

## 🚀 Deployment Security Checklist

### Pre-Deployment

- [ ] All secrets moved to `.env` (not in code)
- [ ] `.env` file is in `.gitignore` (not committed)
- [ ] API keys are production keys (not test/dev keys)
- [ ] Database password is 20+ characters with special chars
- [ ] DATABASE_URL includes `?sslmode=require` for TLS
- [ ] NEXTAUTH_SECRET is 32+ random characters
- [ ] NEXTAUTH_URL is set to production HTTPS domain
- [ ] NODE_ENV=production
- [ ] Rate limiting configured for production load
- [ ] Error messages don't expose sensitive info
- [ ] All dependencies are up-to-date
- [ ] Security headers are enabled

### Post-Deployment

- [ ] Test rate limiting on auth endpoints
- [ ] Monitor for unusual API key usage
- [ ] Verify HTTPS/TLS is working
- [ ] Check security headers in response
- [ ] Monitor failed login attempts
- [ ] Setup alerts for security events
- [ ] Verify backups are working
- [ ] Test password reset functionality
- [ ] Verify session timeout works
- [ ] Monitor logs for suspicious activity

---

## 🔍 Monitoring & Auditing

### Security Events to Monitor

```typescript
// These are automatically logged:
- User signup attempts (success/failure)
- User login attempts (success/failure)
- Failed password attempts (track for lockout)
- Rate limit violations (HTTP 429)
- Authentication failures (invalid token)
- Authorization failures (no access)
- Input validation failures
- API errors and exceptions

// Access logs (via Pino logger)
logger.info({ userId, action }, "User logged in");
logger.warn({ email, attempts }, "Multiple failed logins");
logger.error({ error }, "Database connection failed");
```

### Key Usage Monitoring

```typescript
// Track API key usage
const stats = apiKeyManager.getUsageStats();
// Returns: { gemini: { count: 1234, lastUsed: "2024-01-15T..." } }

// Alert if usage spikes (possible compromise)
if (stats.gemini.count > expectedDaily * 2) {
  alert("Unusual API key usage detected!");
}
```

---

## 🔐 Secret Management Best Practices

### Development Environment
```bash
# Local .env file (git-ignored)
GEMINI_API_KEY=AIzaSyGd8S...
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...

# Use: npm run dev
```

### Production Environment
```bash
# Use secret manager service:
# AWS:   AWS Secrets Manager
# Azure: Azure Key Vault
# GCP:   Google Cloud Secret Manager
# Other: HashiCorp Vault, 1Password, LastPass

# Never store secrets in:
# ❌ Code repository
# ❌ Docker images
# ❌ Configuration files
# ❌ Email or Slack
# ❌ Unencrypted logs
```

---

## 📝 Code Examples by Use Case

### Use Case 1: Adding New Rate-Limited Endpoint

```typescript
import { createRateLimiter } from "@/lib/rateLimiter";

// Define rate limit (100 per hour per IP)
const myEndpointLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000,  // 1 hour
  maxRequests: 100,
  message: "Too many requests to this endpoint"
});

export async function POST(request: NextRequest) {
  // Apply rate limiting
  await myEndpointLimiter(request);
  
  // ... rest of handler
}
```

### Use Case 2: Validating & Sanitizing Input

```typescript
import { z } from "zod";
import { sanitizeString, sanitizeEmail } from "@/lib/sanitization";

// Define validation schema (strict mode)
const MySchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
}).strict();  // Rejects unknown fields

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = MySchema.safeParse(body);
  
  if (!validation.success) {
    throw new ValidationError("Invalid input");
  }
  
  // Sanitize inputs
  const email = sanitizeEmail(validation.data.email);
  const name = sanitizeString(validation.data.name);
  
  // ... process safe data
}
```

### Use Case 3: Logging While Stripping Sensitive Data

```typescript
import { stripSensitiveFields } from "@/lib/sanitization";
import { logger } from "@/lib/logger";

const userData = {
  email: "user@example.com",
  password: "SecurePass123!",
  apiKey: "secret_key_12345",
  id: 123
};

// Before logging, remove sensitive fields
logger.info(
  stripSensitiveFields(userData),
  "User data received"
);
// Logged: { email: "user@example.com", id: 123 }
// NOT logged: password, apiKey (removed)
```

---

## 🆘 Security Incident Response

### If You Suspect an API Key Compromise

1. **Immediately rotate the key**
   ```bash
   # Generate new key from provider
   # Update environment variable
   ```

2. **Audit access logs**
   ```bash
   # Check for unusual API usage in the last 24-48 hours
   # Estimate potential damage
   ```

3. **Monitor for fraud**
   ```bash
   # Watch for unexpected charges
   # Check API logs for suspicious requests
   ```

4. **Document the incident**
   ```bash
   # When discovered: 2024-01-15 10:30 UTC
   # Rotation completed: 2024-01-15 10:45 UTC
   # Potential exposure window: ~15 minutes
   ```

### If You Notice Rate Limit Bypasses

1. **Check IP addresses**
   ```bash
   # Multiple IPs with same attack pattern = distributed attack
   # Implement additional IP blocking if needed
   ```

2. **Review failed login attempts**
   ```bash
   # Confirm account lockout is working
   # Check if specific accounts are targeted
   ```

3. **Increase rate limits if needed**
   ```env
   RATE_LIMIT_AUTH_WINDOW_MS=600000  # Reduce to 10 minutes
   RATE_LIMIT_AUTH_MAX=3              # Reduce to 3 attempts
   ```

---

## 📚 Additional Resources

- [OWASP Top 10 2021](https://owasp.org/Top10/)
- [OWASP Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework/framework)
- [Bcryptjs Documentation](https://www.npmjs.com/package/bcryptjs)
- [Zod Validation](https://zod.dev/?id=strict)
- [OWASP API Security](https://owasp.org/www-project-api-security/)

---

## ✅ Summary

This application now implements:
- ✅ **Rate Limiting** - IP & user-based with graceful 429 responses
- ✅ **Strict Input Validation** - Zod schemas that reject unknown fields
- ✅ **Input Sanitization** - XSS prevention and dangerous content removal
- ✅ **Secure Password Hashing** - Bcrypt with 12 rounds (replaces base64)
- ✅ **Account Lockout** - Protection against brute force attacks
- ✅ **Secure API Keys** - Server-side proxy, no URL exposure
- ✅ **Key Rotation** - Built-in support for regular rotation
- ✅ **Comprehensive Logging** - Security events tracked
- ✅ **Error Handling** - Sensitive data never exposed
- ✅ **Security Headers** - HTTPS-only, secure cookies, CSRF protection

All code includes comments explaining the security benefits and following OWASP best practices.
