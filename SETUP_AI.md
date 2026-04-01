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

To use a different model, update `app/api/chat/route.ts`:
```typescript
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";
```

---

## Pricing

### Free Tier
- **Limit**: 60 requests/minute (forever)
- **Cost**: $0

### Paid Tier
- **Input**: $0.00075 per 1,000 tokens
- **Output**: $0.003 per 1,000 tokens

### Cost Examples
- **Development** (10 msg/day): Free
- **Startup** (1,000 msg/day): ~$1.30/month
- **Growing** (10,000 msg/day): ~$13/month

---

## Customizing Behavior

### Edit System Prompt

Modify `SYSTEM_PROMPT` in `app/api/chat/route.ts`:

```typescript
const SYSTEM_PROMPT = `You are Aria, AI support for YOUR_COMPANY...`;
```

### Adjust Settings

```typescript
generationConfig: {
  maxOutputTokens: 150,    // Response length
  temperature: 0.7,         // 0=factual, 1=creative
}
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "API not configured" | Check `.env.local` has `GEMINI_API_KEY`, restart dev server |
| Slow responses | First request is slower (normal); free tier has 60/min limit |
| "Invalid API key" | Verify key copied completely, get new key at https://aistudio.google.com/app/apikey |
| Empty responses | Increase `maxOutputTokens` to 200 |

---

## Quick Links

- **Get API Key**: https://aistudio.google.com/app/apikey
- **Docs**: https://ai.google.dev/
- **Check Usage**: https://aistudio.google.com

**Status**: ✅ Ready for production
