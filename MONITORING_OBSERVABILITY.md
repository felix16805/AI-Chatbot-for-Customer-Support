# Monitoring & Observability Guide

## Overview

Monitoring and observability are critical for maintaining production reliability, understanding system behavior, and responding quickly to issues.

## Three Pillars of Observability

### 1. Logs

Detailed records of application events and activities.

**Implementation**:
```typescript
import { logger } from '@/lib/logger';

// Structured logging
logger.info('User login successful', { userId: 123, timestamp: new Date() });
logger.error('Database connection failed', { error, retryCount: 3 });
logger.warn('Rate limit approaching', { userId, requests: 95 });
logger.debug('Processing payment', { orderId, amount, currency });
```

**Log Levels**:
- `DEBUG`: Detailed diagnostic information (development only)
- `INFO`: General informational messages (normal operation)
- `WARN`: Warning messages for potentially problematic situations
- `ERROR`: Error messages for failure conditions

**Log Retention**:
- Development: 7 days
- Production: 30 days (configurable)
- Critical logs (errors, security): 90 days

### 2. Metrics

Quantifiable measurements of system health and performance.

**Key Metrics to Track**:

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| CPU Usage | < 70% | > 80% |
| Memory Usage | < 75% | > 85% |
| Disk Usage | < 80% | > 90% |
| API Response Time (p95) | < 200ms | > 500ms |
| Database Query Time (p95) | < 100ms | > 250ms |
| Error Rate | < 0.1% | > 1% |
| Success Rate | > 99.9% | < 99% |
| Active Connections | - | > threshold |
| Queue Depth | - | > threshold |
| Cache Hit Rate | > 80% | < 60% |

**Implementation Example**:
```typescript
// Custom metric collection
const requestDuration = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    metrics.recordTime('http_request_duration', entry.duration, {
      path: entry.name,
      method: 'GET'
    });
  }
});
```

### 3. Traces

Distributed tracing tracks requests through the entire system.

**Implementation**:
```typescript
// Trace user action across services
const traceId = generateTraceId();
logger.info('User action started', { traceId, userId, action });
// ... service calls ...
logger.info('User action completed', { traceId, duration });
```

## Logging Implementation

### Setup

```typescript
// lib/logger.ts
import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';
const logLevel = process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug');

export const logger = pino({
  level: logLevel,
  transport: isProduction ? undefined : {
    target: 'pino-pretty',
    options: {
      colorize: true,
      singleLine: false,
    }
  }
});
```

### API Middleware Logging

```typescript
// middleware for logging requests
export function loggingMiddleware(req, res, next) {
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.info('HTTP Request', {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userId: req.user?.id,
      ip: req.ip
    });
  });
  
  next();
}
```

### Error Logging

```typescript
// Log errors but don't expose sensitive details to users
try {
  await saveUserData(userData);
} catch (error) {
  logger.error('Failed to save user data', {
    userId: userData.id,
    errorMessage: error.message,
    errorStack: error.stack,
    context: 'userDataStorage'
  });
  
  res.status(500).json({ error: 'An error occurred' });
}
```

## Metrics Collection

### Application Metrics

```typescript
// Track business metrics
logger.info('User registered', { userId: newUser.id, source: 'web' });
logger.info('Chat created', { chatId, participants: 2 });
logger.info('API quota', { userId, used: 850, limit: 1000 });
```

### Performance Metrics

```typescript
// Measure critical operations
const startTime = performance.now();
const result = await expensiveOperation();
const duration = performance.now() - startTime;

logger.info('Operation completed', {
  operation: 'expensiveOperation',
  duration: `${duration}ms`,
  itemCount: result.length
});
```

### Resource Metrics

Monitor with system tools:
- **CPU**: `node --inspect` flag
- **Memory**: `process.memoryUsage()`
- **Disk**: System disk monitoring
- **Network**: Request frequency analysis

## Alert Configuration

### Critical Alerts (Page on-call)

```yaml
- Alert: Service Down
  Condition: Response code 5xx > 10% for 5 minutes
  Action: Page on-call immediately
  
- Alert: High Error Rate
  Condition: Error rate > 5% for 10 minutes
  Action: Page on-call
  
- Alert: Database Down
  Condition: Database connection fails 3 times
  Action: Page on-call immediately
```

### Warning Alerts (Email/Slack)

```yaml
- Alert: High Memory Usage
  Condition: Memory > 80% for 15 minutes
  Action: Send alert email
  
- Alert: Slow API Responses
  Condition: Response time p95 > 500ms for 10 minutes
  Action: Slack notification
  
- Alert: Disk Space Low
  Condition: Disk usage > 85%
  Action: Email alert
```

### Info Alerts (Logs only)

```yaml
- Log: Request completed
  Info: Duration, endpoint, status code
  Purpose: Trend analysis, capacity planning
```

## Dashboards

### Executive Dashboard
- Uptime percentage
- User count (active/daily)
- Transaction volume
- Revenue metrics

### Operations Dashboard
- System health
- Error rates
- Response times
- Database metrics
- Queue depth

### Performance Dashboard
- API latency percentiles (p50, p95, p99)
- CPU/Memory usage
- Database query times
- Cache hit rates

### Security Dashboard
- Failed login attempts
- Rate limit violations
- Suspicious activity flags
- Dependency vulnerabilities

## Best Practices

### Do's ✅

- [ ] Log at appropriate levels (not everything as INFO)
- [ ] Use structured logging (JSON format)
- [ ] Include correlation IDs for tracing
- [ ] Log meaningful context (userId, requestId, etc.)
- [ ] Archive old logs regularly
- [ ] Set up alerts for critical failures
- [ ] Monitor during deployments
- [ ] Review logs after incidents

### Don'ts ❌

- [ ] Log sensitive data (passwords, tokens, PII)
- [ ] Create excessive log volume
- [ ] Use try/catch without logging errors
- [ ] Log at ERROR level for expected conditions
- [ ] Ignore warnings and error rates
- [ ] Deploy without monitoring setup
- [ ] Leave debug logging in production code
- [ ] Alert on every minor issue (alert fatigue)

## Security Logging

```typescript
// Log security-relevant events
logger.warn('Failed authentication attempt', {
  username: req.body.username,
  ip: req.ip,
  attempts: failedAttempts
});

logger.warn('Unauthorized access attempt', {
  userId: req.user?.id,
  resource: req.path,
  ip: req.ip
});

logger.error('Security policy violation', {
  type: 'rateLimit',
  userId,
  endpoint: req.path,
  requests: count
});
```

## Database Monitoring

```typescript
// Monitor database performance
logger.info('Database query', {
  query: 'SELECT * FROM users WHERE id = $1',
  duration: `${queryTime}ms`,
  rowsAffected: result.rowCount,
  slowQuery: queryTime > 1000 // Alert if > 1 second
});
```

## Health Checks

### Liveness Check (Is the app running?)

```typescript
// GET /health/live
app.get('/health/live', (req, res) => {
  res.status(200).json({ status: 'alive' });
});
```

### Readiness Check (Is the app ready to serve?)

```typescript
// GET /health/ready
app.get('/health/ready', async (req, res) => {
  try {
    await checkDatabase();
    await checkRedis();
    res.status(200).json({ status: 'ready' });
  } catch (error) {
    res.status(503).json({ status: 'not_ready', error: error.message });
  }
});
```

## Monitoring Tools Setup

### Recommended Stack

| Component | Tool | Purpose |
|-----------|------|---------|
| Log Aggregation | ELK / Datadog / Splunk | Centralize and analyze logs |
| Metrics | Prometheus / Datadog | Collect and store metrics |
| Alerting | PagerDuty / Opsgenie | Alert on-call |
| APM | DataDog / New Relic | Application performance |
| Error Tracking | Sentry / Rollbar | Monitor exceptions |
| Uptime | Pingdom / Uptime Robot | External monitoring |

### Minimal Setup (for starting)

```bash
# Local metrics with Prometheus (optional)
npm install prom-client

# Error tracking (free tier available)
npm install @sentry/node @sentry/tracing
```

## Incident Response

When alerted to an issue:

1. **Acknowledge** the alert in PagerDuty/Opsgenie
2. **Check** monitoring dashboard for context
3. **Review** recent logs and errors
4. **Verify** if production is affected
5. **Take action** (rollback, hotfix, scale up, etc.)
6. **Communicate** status to stakeholders
7. **Document** the incident and postmortem

## SLO (Service Level Objectives)

**Target SLOs**:
- Availability: 99.9% uptime (8.76 hours down/year)
- Response time: 95th percentile < 200ms
- Error rate: < 0.1% of requests
- Data loss: Zero

**Measure monthly**:
```
Uptime % = (Total seconds - Downtime seconds) / Total seconds × 100
Error rate = Failed requests / Total requests × 100
```

## Incident Follow-up

After incident resolution:

1. Write postmortem within 48 hours
2. Identify root cause
3. Create action items to prevent recurrence
4. Update runbooks and documentation
5. Share lessons learned with team
6. Add monitoring/alerts if missing

## References

- [Google SRE Book - Monitoring](https://sre.google/sre-book/monitoring-distributed-systems/)
- [Observability Engineering](https://www.oreilly.com/library/view/observability-engineering/9781492076438/)
- [Pino Logger Documentation](https://getpino.io/)
- [Prometheus Best Practices](https://prometheus.io/docs/practices/naming/)

---

**Setup Status**: ⏳ To be implemented with cloud platform selection
**Recommended First Step**: Start with console logging, upgrade as scale increases
