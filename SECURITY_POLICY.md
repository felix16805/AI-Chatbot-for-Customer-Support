# Security Policy

## Security Principles

1. **Defense in Depth**: Multiple layers of security controls
2. **Least Privilege**: Users have minimum necessary permissions
3. **Security by Default**: Secure configuration is the default
4. **Transparency**: Security issues reported responsibly
5. **Continuous Improvement**: Security practices reviewed regularly

## Vulnerability Reporting

### Report Security Issues Responsibly

**DO NOT** open public GitHub issues for security vulnerabilities.

**Instead**, email: security@yourcompany.com (setup per your infrastructure)

Include:
- Description of vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)

**Response Timeline**:
- Acknowledgment: Within 24 hours
- Investigation: Within 72 hours
- Fix timeline: Depends on severity
- Public disclosure: After fix is deployed

### Severity Levels

| Level | Criteria | Response Time |
|-------|----------|----------------|
| Critical | Complete account takeover, data breach | 4 hours |
| High | Unauthorized data access, privilege escalation | 24 hours |
| Medium | Information disclosure, bypass of controls | 72 hours |
| Low | Minor security concern, defense in depth | 1 week |

## Code Security

### 1. Input Validation

```typescript
// Always validate and sanitize user input
import { z } from 'zod';

const emailSchema = z.string().email();
const inputSchema = z.object({
  name: z.string().min(1).max(100),
  email: emailSchema,
  age: z.number().min(0).max(150)
});

const validated = inputSchema.parse(req.body);
// Process validated input
```

### 2. SQL Injection Prevention

```typescript
// ✅ Good: Use parameterized queries
const user = await db.user.findUnique({
  where: { email: userInput }
});

// ❌ Bad: String concatenation
const query = `SELECT * FROM users WHERE email = '${userInput}'`;
```

### 3. Authentication & Authorization

```typescript
// Require authentication for protected routes
export async function middleware(req) {
  const session = await getSession(req);
  
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  return NextResponse.next();
}

// Check permissions
function requirePermission(permission) {
  return (req, res, next) => {
    if (!req.user?.permissions?.includes(permission)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}
```

### 4. XSS Prevention

```typescript
// React auto-escapes by default
const userContent = req.body.content; // ✅ Safe: auto-escaped
<div>{userContent}</div>

// ❌ Dangerous: using dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// ✅ Safe: sanitize if HTML needed
import DOMPurify from 'dompurify';
const cleanContent = DOMPurify.sanitize(userContent);
```

### 5. CSRF Protection

```typescript
// NextAuth provides CSRF protection
// Use proper HTTP methods:
// - GET: Safe operations
// - POST: State-changing operations
// - DELETE: Destructive operations
```

### 6. Rate Limiting

```typescript
// Prevent brute force attacks
import { rateLimit } from '@/lib/rateLimiter';

export async function POST(req) {
  const userId = req.user?.id;
  const allowed = await rateLimit(userId, 'api', 100, 60); // 100 req/min
  
  if (!allowed) {
    return new Response('Too many requests', { status: 429 });
  }
  
  // Process request...
}
```

### 7. Secrets Management

```typescript
// ✅ Good: Environment variables
const apiKey = process.env.EXTERNAL_API_KEY;

// ❌ Bad: Hardcoded secrets
const apiKey = 'sk-1234567890';

// ✅ Good: Never log sensitive data
logger.info('API call', { endpoint, userId }); // No apiKey!

// ❌ Bad: Logging secrets
logger.info('API call', { endpoint, apiKey }); // Exposed!
```

## Dependency Security

### 1. Monitor for Vulnerabilities

```bash
# Check for known vulnerabilities
npm audit

# Install updates (carefully test after)
npm audit fix

# Auto-update in CI/CD pipeline
# See: .github/workflows/dependencies.yml
```

### 2. Dependency Policy

- [ ] Only use trusted, maintained packages
- [ ] Review major version changes before updating
- [ ] Keep security patches current (automated)
- [ ] Document why specific versions are pinned
- [ ] Evaluate new dependencies for: security, maintenance, license

### 3. License Compliance

- Use only compatible licenses
- Document dependencies and licenses
- Avoid GPL in closed-source code
- Popular safe licenses: MIT, Apache 2.0, BSD

## Database Security

### 1. Connection Security

```typescript
// Use encrypted connections
const databaseUrl = process.env.DATABASE_URL;
// Should start with: postgresql://
// In production: should use SSL connection
```

### 2. Access Control

```typescript
// Database user should have minimal permissions
CREATE USER app_user WITH PASSWORD 'strong-password';
GRANT SELECT, INSERT, UPDATE, DELETE ON all tables IN SCHEMA public TO app_user;
```

### 3. Data Protection

```typescript
// Never expose connection strings in logs
logger.info('Connected to database'); // ✅ Safe
logger.info(`Connected to ${process.env.DATABASE_URL}`); // ❌ Exposed!

// Sensitivity data should be hashed
import bcrypt from 'bcryptjs';
const hashedPassword = await bcrypt.hash(password, 10);
```

## API Security

### 1. Validation

```typescript
// Always validate request bodies
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const result = schema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({ errors: result.error.flatten() });
}
```

### 2. Authentication

```typescript
// Use NextAuth with OAUTH or secure sessions
// Never transmit tokens in query params
// Always use HTTPS

// ❌ Bad: Token in URL
redirect(`/api/callback?token=${token}`);

// ✅ Good: Token in HTTP-only cookie
res.setHeader('Set-Cookie', `auth=${token}; HttpOnly; Secure; SameSite=Strict`);
```

### 3. CORS

```typescript
// Restrict cross-origin requests
const headers = {
  'Access-Control-Allow-Origin': 'https://trusted-domain.com',
  'Access-Control-Allow-Methods': 'GET, POST',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400'
};
```

### 4. API Rate Limiting

```typescript
// Limit API requests per user/IP
// Prevent: brute force, DDoS, resource exhaustion

const config = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
};
```

## Deployment Security

### 1. Environment Variables

```bash
# Production environment should have:
- NEXTAUTH_SECRET (random, unique)
- DATABASE_URL (encrypted, restricted access)
- API_KEYS (restricted, rotated regularly)
- NODE_ENV=production
```

### 2. Secrets Rotation

- Database passwords: Every 90 days
- API keys: Every 180 days
- OAuth secrets: Per provider requirements
- SSH keys: Every 365 days

### 3. Server Security

- [ ] Keep OS and packages updated
- [ ] Use firewall rules
- [ ] Disable unnecessary services
- [ ] Use SSH keys (not passwords)
- [ ] Monitor failed login attempts
- [ ] Regular security patching

## Audit Logging

```typescript
// Track security-relevant events
logger.info('Audit: Action performed', {
  userId: req.user.id,
  action: 'password_change',
  timestamp: new Date(),
  ip: req.ip,
  userAgent: req.headers['user-agent']
});

logger.warn('Audit: Suspicious activity', {
  userId,
  activity: 'multiple_failed_logins',
  count: 5,
  ip
});
```

## Security Checklist

Before deploying to production:

- [ ] All user inputs validated
- [ ] Sensitive data is encrypted
- [ ] No hardcoded secrets or API keys
- [ ] HTTPS/TLS enabled
- [ ] Authentication implemented
- [ ] Authorization implemented
- [ ] Rate limiting configured
- [ ] CSRF protection enabled
- [ ] Security headers set
- [ ] Dependencies scanned for vulnerabilities
- [ ] No sensitive data in logs
- [ ] Error messages don't leak information
- [ ] Database backups encrypted
- [ ] Monitoring and alerting configured
- [ ] Incident response plan documented

## Security Headers

```typescript
// Recommended headers for all responses
const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Content-Security-Policy': "default-src 'self';",
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=()'
};
```

## Third-Party Services

When integrating external services:

- [ ] Verify API key security
- [ ] Review service's security practices
- [ ] Check for data sharing agreements
- [ ] Implement rate limiting
- [ ] Monitor for suspicious activity
- [ ] Rotate API keys regularly
- [ ] Document access controls

## Incident Response

If security incident detected:

1. **Isolate**: Stop the bleeding
   - Revoke compromised credentials
   - Block malicious IP addresses
   - Disable affected accounts (if necessary)

2. **Investigate**: Understand the scope
   - Check logs for timeline
   - Identify affected data
   - Find root cause
   - Document evidence

3. **Communicate**: Notify stakeholders
   - Internal team
   - Affected users
   - Comply with regulations (GDPR, etc.)

4. **Fix**: Address the vulnerability
   - Patch the code
   - Update credentials
   - Deploy fix to production
   - Verify fix works

5. **Review**: Prevent recurrence
   - Write postmortem
   - Update security controls
   - Train team
   - Update documentation

## References

- [OWASP Top 10](https://owasp.org/Top10/)
- [OWASP API Top 10](https://owasp.org/API-Security/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

## Questions?

Security concerns? Email: security@yourcompany.com
Documentation questions? Open an issue or PR.
