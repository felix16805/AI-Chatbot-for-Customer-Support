# Queue & Message System Documentation

## Overview

This project implements two async task processing systems:
1. **Bull + Redis** (./lib/queue.ts) - Simpler, Redis-backed job queue
2. **RabbitMQ** (./lib/rabbitmq.ts) - Enterprise message broker

Choose based on your requirements:
- **Bull**: Perfect for smaller apps, fewer external dependencies
- **RabbitMQ**: Enterprise features, advanced routing, multiple consumers

## Architecture

### Bull Queue System

```
Application → Job Added → Bull Queue (Redis) → Worker Process → Task Execution
                                    ↓
                            Job Retry (on failure)
                            Job Tracking (status)
                            Job Events (completed, failed)
```

**Features**:
- Built-in job retries with exponential backoff
- Job progress tracking
- Concurrent job processing
- Dead-letter queue support
- Redis persistence

**Queues**:
- `emails` - Email sending
- `notifications` - In-app notifications
- `chat-processing` - LLM API calls

### RabbitMQ System

```
Application → Message Published → RabbitMQ → Consumer → Task Execution
                                      ↓
                            Message Acknowledgment
                            Dead Letter Exchange
                            Topic-based Routing
```

**Features**:
- Multiple exchange types (direct, topic, fanout)
- Message routing patterns
- Consumer groups
- DLX (Dead Letter Exchange) for failed messages
- Persistent queues

**Exchanges & Queues**:
- Direct: Email and notification routing
- Topic: Wildcard chat processing
- Fanout: Broadcast messages

## Installation

### Bull + Redis

```bash
# Install dependencies
npm install bull redis
npm install --save-dev @types/bull

# Install Redis locally (macOS)
brew install redis
redis-server

# Or use Docker
docker run -d -p 6379:6379 redis:latest
```

### RabbitMQ

```bash
# Install dependencies
npm install amqplib
npm install --save-dev @types/amqplib

# Install RabbitMQ locally (macOS)
brew install rabbitmq
brew services start rabbitmq

# Or use Docker
docker run -d -p 5672:5672 -p 15672:15672 rabbitmq:latest
```

## Configuration

### Environment Variables

```env
# For Bull + Redis
REDIS_URL=redis://127.0.0.1:6379

# For RabbitMQ
RABBITMQ_URL=amqp://guest:guest@localhost:5672

# Choose which system to use
QUEUE_SYSTEM=bull  # or rabbitmq
```

## API Examples

### Bull: Send Email

```typescript
import { sendEmailAsync } from '@/lib/queue';

const jobId = await sendEmailAsync({
  to: 'user@example.com',
  subject: 'Welcome!',
  template: 'welcome',
  data: { name: 'John' }
});

// Returns job ID for tracking
console.log(`Email job queued: ${jobId}`);
```

### Bull: Check Job Status

```typescript
import { getJobStatus } from '@/lib/queue';

const status = await getJobStatus('email', jobId);
console.log(status);
// {
//   id: "1",
//   state: "completed",
//   progress: 100,
//   result: { success: true, to: "..." }
// }
```

### Bull: Get Queue Statistics

```typescript
import { getQueueStats } from '@/lib/queue';

const stats = await getQueueStats('email');
console.log(stats);
// {
//   queue: 'email',
//   waiting: 5,
//   active: 1,
//   completed: 42,
//   failed: 0,
//   delayed: 0,
//   paused: 0,
//   isPaused: false
// }
```

### RabbitMQ: Publish Email

```typescript
import { publishEmail } from '@/lib/rabbitmq';

await publishEmail({
  to: 'user@example.com',
  subject: 'Welcome!',
  template: 'welcome',
  htmlContent: '<h1>Welcome!</h1>'
});
```

### RabbitMQ: Register Consumer

```typescript
import { consumeEmails } from '@/lib/rabbitmq';

await consumeEmails(async (msg) => {
  if (!msg) return;
  
  const data = JSON.parse(msg.content.toString());
  console.log(`Sending email to ${data.to}`);
  
  // Send actual email here
  // await emailService.send(data);
});
```

## Queue Workflows

### Email Workflow

```
User Signs Up
    ↓
POST /api/auth/signup (User created)
    ↓
sendEmailAsync({template: 'welcome', ...}) → Returns 202 Accepted
    ↓
Email added to bull queue
    ↓
Email worker processes → Sends via SendGrid
    ↓
Email delivered or failed → Retry or DLX
```

**Response to User**: Immediate confirmation (Job ID)
**Actual Execution**: Background task completes within minutes

### Chat Processing Workflow

```
User sends message
    ↓
POST /api/chat (Content validated)
    ↓
processChatAsync({sessionId, content, userId}) → Job ID
    ↓
    ├→ Job Progress 0% (queued)
    ├→ Job Progress 25% (preparing request)
    ├→ Job Progress 50% (calling LLM)
    ├→ Job Progress 75% (processing response)
    └→ Job Progress 100% (saving to DB)
    ↓
WebSocket notification sent to user
    ↓
Client fetches response from DB
```

**Response to User**: Immediate acknowledgment with job ID
**Actual Processing**: 5-10 seconds in background
**UI Updates**: WebSocket progress notifications

## Database Models (Prisma Integration)

```prisma
// Queue job tracking table
model QueueJob {
  id String @id @default(cuid())
  queueName String // 'email', 'notification', 'chat-processing'
  jobId String
  status String // 'waiting', 'active', 'completed', 'failed'
  data Json
  result Json?
  error String?
  attempts Int
  createdAt DateTime @default(now())
  completedAt DateTime?
  userId String?
  
  @@unique([queueName, jobId])
  @@index([userId, createdAt])
}

// Example queries
// 1. Get user's pending jobs
const pendingJobs = await prisma.queueJob.findMany({
  where: {
    userId: currentUser.id,
    status: 'waiting'
  }
});

// 2. Track failed jobs
const failedJobs = await prisma.queueJob.findMany({
  where: { status: 'failed' },
  orderBy: { createdAt: 'desc' }
});

// 3. Cleanup old completed jobs
await prisma.queueJob.deleteMany({
  where: {
    status: 'completed',
    completedAt: { lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
  }
});
```

## Monitoring & Management

### Health Checks

```typescript
import { initializeQueues, getQueueStats } from '@/lib/queue';

// Check queue health
export async function checkQueueHealth() {
  try {
    await initializeQueues();
    
    const emailStats = await getQueueStats('email');
    const notificationStats = await getQueueStats('notification');
    const chatStats = await getQueueStats('chat-processing');
    
    return {
      status: 'healthy',
      queues: {
        email: emailStats,
        notification: notificationStats,
        chat: chatStats
      }
    };
  } catch (error) {
    return { status: 'unhealthy', error: error.message };
  }
}
```

### API Endpoint

```typescript
// GET /api/admin/queue/health
export async function GET() {
  const health = await checkQueueHealth();
  return NextResponse.json(health);
}
```

### Dashboard Metrics

- Queue sizes (waiting, active, completed, failed)
- Job success/failure rate
- Average job duration
- Failed job reasons
- Worker utilization

## Error Handling

### Bull Error Handling

```typescript
emailQueue.on('failed', (job, err) => {
  logApiRequest({
    method: 'EMAIL_FAILED',
    path: '/queue/email/failed',
    statusCode: 500,
    customData: {
      jobId: job.id,
      error: err.message,
      attempts: job.attempts
    }
  });
  
  // Alert admins if critical jobs fail
  if (job.attemptsMade >= job.opts.attempts) {
    alertAdmin(`Critical job failed: ${job.id}`);
  }
});
```

### RabbitMQ Error Handling

```typescript
// Message requeue on error
ch.nack(msg, false, true);  // Requeue if unacknowledged delivery

// Dead Letter Exchange
await ch.assertExchange(`${EXCHANGES.DIRECT}-dlx`, 'direct', { durable: true });
await ch.assertQueue(`${QUEUES.EMAIL}-dlx`, { durable: true });
```

## Performance Considerations

### Bull
- **Concurrency**: Process X jobs simultaneously
- **Memory**: Redis in-memory storage
- **Scaling**: Single Redis instance vs Sentinel/Cluster

### RabbitMQ
- **Concurrency**: Multiple consumers per queue
- **Memory**: Persistent queue storage
- **Scaling**: Native clustering support

### Recommendations

1. **Low Volume** (<1000 jobs/day): Bull + Redis
2. **Medium Volume** (1000-10000 jobs/day): Bull + Redis Cluster
3. **High Volume** (>10000 jobs/day): RabbitMQ Cluster

## SE course Alignment

This queue system demonstrates:

1. **Software Architecture** - Async patterns, decoupled systems
2. **System Design** - Scalable job queueing, load distribution
3. **Error Handling** - Retry logic, dead-letter queues, failure tracking
4. **Monitoring** - Job status tracking, queue statistics, health checks
5. **Testing** - Mocking queue systems in unit tests
6. **Best Practices** - Separation of concerns, event-driven architecture

## References

- [Bull Documentation](https://github.com/OptimalBits/bull)
- [RabbitMQ Documentation](https://www.rabbitmq.com/documentation.html)
- [Message Queue Pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/queue-based-load-leveling)

---

**Status**: Production Ready ✅
**Last Updated**: 2024
