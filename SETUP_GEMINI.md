# AI Integration Setup Guide - Google Gemini

## Overview

This chatbot is configured to use **Google Gemini API** for AI-powered responses. Gemini offers:
- **Free tier**: 60 requests/minute (great for testing & small projects)
- **Extremely fast**: < 1 second typical response time
- **Very affordable**: ~$0.0003 per message (cheaper than OpenAI)
- **Simple setup**: Just an API key, no credit card required initially

## Quick Setup (3 Steps)

### Step 1: Get Your Free API Key

1. Visit https://aistudio.google.com/app/apikey
2. Click "Get API Key" → "Create API key in new project"
3. Google will automatically create a key for you
4. Copy the API key (looks like: `AIzaSy...`)

### Step 2: Configure Environment Variable

Create a `.env.local` file in your project root with:

```
GEMINI_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual API key from Step 1.

### Step 3: Restart Development Server

```bash
# Stop the current server (Ctrl+C if running)
# Then restart:
npm run dev
```

The chatbot will now use real AI responses from Google Gemini!

---

## Model Information

### Current Model: `gemini-pro`

**Why Gemini?**
- **Speed**: Typical response < 0.5 seconds
- **Cost**: Free tier (60 req/min), then $0.00075/1K input, $0.003/1K output
- **Quality**: Excellent for customer support
- **Availability**: Global, highly reliable

**Performance Specs:**
- Input context: 30K tokens
- Output per message: 150 tokens (configured)
- Free tier: 60 requests/minute
- Paid tier rate limits: 10K requests/minute

### Alternative Models

**`gemini-1.5-pro`**
- Faster inference than pro
- 1M token context window (for large documents)
- Better reasoning capabilities
- Slightly higher cost

**`gemini-pro-vision`** (if you add image support)
- Analyze images/screenshots
- Good for visual troubleshooting

To use a different model, update `app/api/chat/route.ts`:
```typescript
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";
```

---

## Pricing & Cost Estimation

### Free Tier
- **Limit**: 60 requests/minute (forever free)
- **Cost**: $0
- **Best for**: Development, testing, low-traffic sites

### Paid Tier (usage-based)
- **Input**: $0.00075 per 1,000 tokens
- **Output**: $0.003 per 1,000 tokens
- **Triggered**: Only after free tier quota exceeded

### Monthly Cost Examples

**Typical per-message cost breakdown:**
- System prompt: ~150 tokens
- User message: ~50 tokens  
- AI response: ~100 tokens
- **Total**: ~300 tokens ≈ $0.00045

**Different traffic levels:**
- **Development** (10 messages/day): Free tier only
- **Small** (100 messages/day): ~$0.14/month
- **Startup** (1,000 messages/day): ~$1.30/month
- **Growing** (10,000 messages/day): ~$13/month
- **Enterprise** (100,000 messages/day): ~$130/month

### Money-Saving Tips
- Keep `maxOutputTokens` at 150 (responses are concise)
- Optimize system prompt (shorter = less tokens)
- Cache responses for common questions
- Monitor usage in Google AI Studio

---

## Customizing AI Behavior

### Edit System Prompt

Edit `app/api/chat/route.ts` and modify `SYSTEM_PROMPT`:

```typescript
const SYSTEM_PROMPT = `You are Aria, AI customer support for [YOUR COMPANY].

You help with:
- Orders and tracking
- Refunds and returns
- Technical issues
- General questions

Guidelines:
- Be professional but friendly
- Keep responses 2-3 sentences max
- Provide specific solutions
- Offer escalation if needed`;
```

### Adjust Response Settings

In `app/api/chat/route.ts`, modify `generationConfig`:

```typescript
generationConfig: {
  maxOutputTokens: 150,    // Increase for longer responses
  temperature: 0.7,         // 0=factual, 1=creative
  topP: 0.95,              // Diversity control
}
```

### Customize Intent Detection

Edit `detectIntent()` function to match your business:

```typescript
function detectIntent(message: string): string {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes("subscription") || lowerMsg.includes("recurring")) {
    return "subscription";
  }
  if (lowerMsg.includes("pricing") || lowerMsg.includes("cost")) {
    return "pricing";
  }
  
  return "general";
}
```

---

## Troubleshooting

### "AI API not configured" Error
**Symptom**: Message says "AI API not configured"

**Solution**:
1. Verify `.env.local` file exists in project root
2. Check spelling: `GEMINI_API_KEY` (exact capitalization)
3. Restart dev server: `npm run dev`
4. Check browser console (F12) for details

### Slow Responses (> 3 seconds)
**Symptom**: Responses take a long time

**Solution**:
- First request is slower (system warming up) - normal
- Check your internet connection
- Free tier rate limit (60/min): Wait a minute if you hit it
- Switch to paid tier for higher limits

### "Invalid API key" Error
**Symptom**: API says key is invalid

**Solution**:
1. Double-check key is copied completely (no spaces)
2. Verify key format: starts with `AIzaSy...`
3. Generate new key: https://aistudio.google.com/app/apikey
4. Update `.env.local` and restart

### Empty/Blank Responses
**Symptom**: AI returns nothing or incomplete text

**Solution**:
- Increase `maxOutputTokens` in config (try 200 or 250)
- Check user input isn't empty
- Test directly: https://aistudio.google.com (paste your key there)
- Verify project has API enabled in Google Cloud

### Rate Limit Exceeded
**Symptom**: Getting errors after multiple quick requests

**Solution**:
- Free tier: 60 requests/minute limit
- Wait 60 seconds before making new requests
- Or add payment method to get higher limits (10K/minute)
- Implement request queuing in your app

---

## Monitoring & Analysis

### Check Usage in Google AI Studio

1. Go to https://aistudio.google.com
2. Click your API key
3. View quota and usage stats
4. See cost breakdown by date

### Logging Requests

Add to `app/api/chat/route.ts` to log each request:

```typescript
console.log(`[GEMINI] Request: "${message.substring(0, 50)}..."`);
console.log(`[GEMINI] Intent: ${intent}`);
console.log(`[GEMINI] Response: "${aiMessage.substring(0, 50)}..."`);
```

View logs with:
```bash
npm run dev 2>&1 | grep GEMINI
```

---

## Advanced Usage

### Multi-turn Conversations

To enable chat history (previous messages in context):

```typescript
const messages = [
  { role: "user", parts: [{ text: "What's your return policy?" }] },
  { role: "model", parts: [{ text: "We offer 30-day returns..." }] },
  { role: "user", parts: [{ text: "What about international?" }] },  // New message
];

// Send in request body:
body: JSON.stringify({
  contents: messages,
  generationConfig: { ... }
})
```

### Streaming Responses (Real-time)

For typed-out responses (better UX):

```typescript
const GEMINI_API_URL = "...models/gemini-pro:streamContent";
// Use EventTarget and parse streaming chunks
```

### System-Only Responses (No User Context)

For automated responses without user messages:

```typescript
const contents = [
  {
    role: "user",
    parts: [{ text: "Generate 5 FAQ questions about returns" }]
  }
];
```

---

## Switching from OpenAI

If you were previously using OpenAI GPT:

**Key Differences:**
| OpenAI | Gemini |
|--------|--------|
| `gpt-3.5-turbo` | `gemini-pro` |
| Bearer token auth | API key in URL |
| `"messages"` format | `"contents"` format |
| ~$0.0005/1K input | $0.00075/1K input |
| No free tier | 60 req/min free |

**To switch back to OpenAI:**
1. Replace `app/api/chat/route.ts` with OpenAI version
2. Update `.env.local` to use `OPENAI_API_KEY`
3. See `SETUP_OPENAI.md` for details

---

## Alternative AI Services

### OpenAI GPT-4
- **Cost**: More expensive (~$0.015/1K input)
- **Quality**: Better reasoning, longer responses
- **Setup**: https://platform.openai.com/account/api-keys

### Anthropic Claude 3
- **Cost**: Competitive ($3/1M input tokens, $15/1M output)
- **Quality**: Excellent reasoning, very safe
- **Setup**: https://console.anthropic.com/

### Mistral AI
- **Cost**: Budget-friendly ($0.0002/1K input)
- **Quality**: Good for most tasks  
- **Setup**: https://console.mistral.ai/

### Self-Hosted LLaMA (Open Source)
- **Cost**: Free (runs on your hardware)
- **Quality**: Variable, depends on model size
- **Setup**: https://ollama.ai

---

## Getting Help

- **Google Gemini Docs**: https://ai.google.dev/
- **API Reference**: https://ai.google.dev/api/python/google/generativeai
- **Status & Quotas**: https://aistudio.google.com
- **Community Chat**: https://ai.google.dev/community
- **FAQ**: https://ai.google.dev/guide/faq

## Quick Links

- Get API Key: https://aistudio.google.com/app/apikey
- Test Playground: https://aistudio.google.com
- Pricing: https://ai.google.dev/pricing
- Models List: https://ai.google.dev/models

---

**Last Updated**: April 2026  
**Status**: ✅ Production ready  
**Tested With**: Next.js 14+, Node 18+, TypeScript