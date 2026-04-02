# API Documentation

## Base URL

```
http://localhost:3000/api
```

## Authentication

All endpoints (except `/auth/signup` and `/auth/login`) require authentication via JWT token in the `Authorization` header:

```
Authorization: Bearer <session_token>
```

## Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    "id": "...",
    "message": "..."
  }
}
```

### Error Response

```json
{
  "error": {
    "type": "ValidationError",
    "message": "Invalid input",
    "statusCode": 400,
    "details": {}
  }
}
```

---

## Authentication Endpoints

### POST /auth/signup

Register a new user account.

**Request**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Account created successfully",
  "user": {
    "id": "clxyz123456789",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:45Z"
  }
}
```

**Error Cases**:
- `400` - Invalid input (weak password, invalid email)
- `409` - Email already exists
- `500` - Server error

**Validation Rules**:
- Name: 2+ characters
- Email: Valid email format
- Password: Minimum 6 characters, at least 1 uppercase, 1 number

---

### POST /auth/login

Authenticate user and create session.

**Request**:
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clxyz123456789",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Cases**:
- `400` - Invalid credentials
- `401` - Email not found
- `401` - Invalid password
- `500` - Server error

---

### GET /auth/logout

Terminate user session.

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Chat Endpoints

### POST /chat

Create chat session or send message.

**Request**:
```json
{
  "chatSessionId": "clxyz987654321",
  "content": "Hello, how can I help you with this problem?"
}
```

**Response** (202):
```json
{
  "success": true,
  "message": "Message sent",
  "data": {
    "messageId": "clxyz111111111",
    "sessionId": "clxyz987654321",
    "content": "Hello, how can I help...",
    "role": "user",
    "createdAt": "2024-01-15T10:35:20Z"
  }
}
```

**Error Cases**:
- `400` - Empty message or exceeds 5000 characters
- `401` - Not authenticated
- `403` - No access to this chat session
- `404` - Chat session not found
- `429` - Rate limit exceeded
- `500` - Server error

**Rate Limiting**:
- 100 messages per hour per user
- Returns `429` when limit exceeded

**Response Status**:
- `202 Accepted` - Message received and queued for processing
- Response does NOT wait for LLM response (async processing)

---

### GET /chat/sessions

List all chat sessions for authenticated user.

**Headers**:
```
Authorization: Bearer <token>
```

**Query Parameters**:
- `page` (optional): Page number, default 1
- `limit` (optional): Items per page, only 1-100, default 20

**Response** (200):
```json
{
  "success": true,
  "data": {
    "sessions": [
      {
        "id": "clxyz987654321",
        "title": "Debugging Database Issue",
        "createdAt": "2024-01-15T10:00:00Z",
        "updatedAt": "2024-01-15T10:35:00Z",
        "messageCount": 12
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45
    }
  }
}
```

---

### GET /chat/history/:sessionId

Retrieve message history for a chat session.

**Path Parameters**:
- `sessionId` (required): Chat session ID (CUID format)

**Query Parameters**:
- `page` (optional): Page number, default 1
- `limit` (optional): Messages per page, 1-100, default 20

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "sessionId": "clxyz987654321",
    "messages": [
      {
        "id": "msg123456789",
        "role": "user",
        "content": "How do I optimize database queries?",
        "createdAt": "2024-01-15T10:30:00Z"
      },
      {
        "id": "msg987654321",
        "role": "assistant",
        "content": "Here are some tips for optimizing...",
        "createdAt": "2024-01-15T10:30:15Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50
    }
  }
}
```

**Error Cases**:
- `404` - Session not found
- `403` - No access to session
- `401` - Not authenticated

---

## Queue Status Endpoints

### GET /queue/status/:type/:jobId

Check the status of a queued job (email, notification, chat-processing).

**Path Parameters**:
- `type` (required): `email`, `notification`, or `chat-processing`
- `jobId` (required): Job ID from queue

**Response** (200):
```json
{
  "job": {
    "id": "1",
    "state": "completed",
    "progress": 100,
    "result": {
      "success": true,
      "messageId": "msg123456789"
    },
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

**States**:
- `waiting` - Queued, waiting to process
- `active` - Currently being processed
- `completed` - Successfully finished
- `failed` - Processing failed
- `delayed` - Waiting for retry

---

## Admin Endpoints

### GET /admin/queue/health

Get system health and queue statistics.

**Headers**:
```
Authorization: Bearer <admin_token>
X-Admin-Key: <admin_secret>
```

**Response** (200):
```json
{
  "status": "healthy",
  "queues": {
    "email": {
      "queue": "email",
      "waiting": 5,
      "active": 1,
      "completed": 1234,
      "failed": 2,
      "isPaused": false
    },
    "chat-processing": {
      "queue": "chat-processing",
      "waiting": 2,
      "active": 1,
      "completed": 789,
      "failed": 0,
      "isPaused": false
    }
  }
}
```

---

### GET /admin/cache/stats

Get Redis cache statistics.

**Headers**:
```
Authorization: Bearer <admin_token>
X-Admin-Key: <admin_secret>
```

**Response** (200):
```json
{
  "totalKeys": 50000,
  "usedMemory": "45.32M",
  "usedMemoryPeak": "67.89M",
  "connectedClients": 15,
  "totalOperations": "1234567"
}
```

---

## Error Codes

| Code | Message | Meaning |
|------|---------|---------|
| 400 | Validation Error | Invalid input format |
| 401 | Authentication Error | Missing or invalid token |
| 403 | Authorization Error | No permission for resource |
| 404 | Not Found Error | Resource doesn't exist |
| 409 | Conflict Error | Resource already exists |
| 429 | Rate Limit Error | Too many requests |
| 500 | Internal Server Error | Server error |

---

## Rate Limiting

**Per User**:
- Chat messages: 100 per hour
- API requests: 1000 per hour

**Response Headers**:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 2024-01-15T11:30:00Z
```

---

## Examples

### Example 1: Complete Chat Flow

```bash
# 1. Sign up
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'

# Response contains: token

# 2. Send message
curl -X POST http://localhost:3000/api/chat \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "chatSessionId": "clxyz123456789",
    "content": "How do I use Redis for caching?"
  }'

# Response: messageId with 202 Accepted

# 3. Check processing status
curl http://localhost:3000/api/queue/status/chat-processing/1 \
  -H "Authorization: Bearer <token>"

# Response: { state: "completed", progress: 100, result: {...} }

# 4. Get chat history
curl "http://localhost:3000/api/chat/history/clxyz123456789?page=1&limit=20" \
  -H "Authorization: Bearer <token>"

# Response: [ { role: "user", content: "..." }, { role: "assistant", content: "..." } ]
```

### Example 2: Rate Limiting

```bash
# Make 100 requests - succeeds
for i in {1..100}; do
  curl -X POST http://localhost:3000/api/chat \
    -H "Authorization: Bearer <token>" \
    -d '{"chatSessionId": "xyz", "content": "Test"}'
done

# 101st request
curl -X POST http://localhost:3000/api/chat \
  -H "Authorization: Bearer <token>" \
  -d '{"chatSessionId": "xyz", "content": "Test"}'

# Response: 429 Too Many Requests
# Body: { error: { type: "RateLimitError", statusCode: 429, ... } }
# Headers: X-RateLimit-Reset: 2024-01-15T11:30:00Z
```

---

## Testing with cURL

### Setup
```bash
# Store token
TOKEN=$(curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "Password123"}' \
  | jq -r '.token')

echo "Token: $TOKEN"
```

### Usage
```bash
# All subsequent requests
curl http://localhost:3000/api/chat/sessions \
  -H "Authorization: Bearer $TOKEN"
```

---

## OpenAPI/Swagger

Full OpenAPI 3.0 specification available in development mode:

```
http://localhost:3000/api/docs
```

---

## Webhooks (Future)

Subscribe to events:

```json
POST /api/webhooks/subscribe
{
  "endpoint": "https://yourapp.com/webhooks/chat",
  "events": ["chat.message_received", "chat.response_generated"]
}
```

---

## SDK & Client Libraries

### Node.js/TypeScript

```typescript
import { ChatClient } from '@/lib/client';

const client = new ChatClient(token);
await client.sendMessage(sessionId, 'Hello!');
const history = await client.getHistory(sessionId);
```

### Python

```python
from chat_sdk import ChatClient

client = ChatClient(token)
client.send_message(session_id, "Hello!")
history = client.get_history(session_id)
```

---

## Support

For issues or questions:
- Email: support@example.com
- GitHub Issues: https://github.com/yourname/project/issues
- Documentation: See QUEUE_SYSTEM.md, CACHING.md

---

**Version**: 1.0
**Last Updated**: 2024-01-15
**Status**: Production Ready ✅
