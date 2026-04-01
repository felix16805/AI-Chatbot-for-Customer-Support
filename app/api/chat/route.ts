import { NextRequest, NextResponse } from "next/server";

// Google Gemini API integration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// System prompt for Aria - customer support AI
const SYSTEM_PROMPT = `You are Aria, a friendly and engaging AI customer support assistant. Your personality:
- Warm, conversational, and approachable
- Genuinely interested in helping customers
- Natural language (not robotic or formal)
- Add personality and light humor when appropriate
- Use conversational phrases like "I'd be happy to help!" or "Great question!"

Your expertise:
- Order tracking and status
- Billing and payment issues
- Technical troubleshooting
- Returns and refunds
- General product questions

Style guidelines:
- Write naturally, like texting a friend (but professional)
- Keep responses 2-3 sentences, conversational
- Use "I", "you", "we" - be personal
- Ask follow-up questions to understand better
- Show empathy when customers have problems
- End with a helpful next step or question

Examples of good responses:
❌ "Your order status is currently pending."
✅ "Your order is on the way! 🚀 Should arrive by Friday. Want me to check the exact tracking number?"

❌ "We support returns within 30 days."
✅ "Good news - we totally accept returns within 30 days. What's going on with your order?"`;

function detectIntent(message: string): string {
  const lowerMsg = message.toLowerCase();

  if (
    lowerMsg.includes("order") ||
    lowerMsg.includes("track") ||
    lowerMsg.includes("package")
  ) {
    return "order";
  }
  if (
    lowerMsg.includes("bill") ||
    lowerMsg.includes("payment") ||
    lowerMsg.includes("invoice")
  ) {
    return "billing";
  }
  if (
    lowerMsg.includes("problem") ||
    lowerMsg.includes("issue") ||
    lowerMsg.includes("error") ||
    lowerMsg.includes("bug")
  ) {
    return "technical";
  }
  if (
    lowerMsg.includes("return") ||
    lowerMsg.includes("exchange") ||
    lowerMsg.includes("refund")
  ) {
    return "returns";
  }

  return "general";
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { 
          error: "AI API not configured. Please set GEMINI_API_KEY in environment variables.",
          message: "I'm temporarily unavailable. Please contact support.",
          intent: "error"
        },
        { status: 500 }
      );
    }

    try {
      // Call Google Gemini API
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `${SYSTEM_PROMPT}\n\nCustomer: ${message}`,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.7,
            topP: 0.95,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Gemini API error:", error);
        
        return NextResponse.json(
          { 
            error: "Failed to get AI response",
            message: "Sorry, I'm having trouble responding right now. Please try again in a moment.",
            intent: "error"
          },
          { status: 500 }
        );
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
        throw new Error("Invalid response format from Gemini API");
      }

      const aiMessage = data.candidates[0].content.parts[0].text;
      const intent = detectIntent(message);

      return NextResponse.json({
        message: aiMessage,
        intent,
        timestamp: new Date().toISOString(),
      });
    } catch (apiError) {
      console.error("Error calling Gemini API:", apiError);
      return NextResponse.json(
        { 
          error: "API request failed",
          message: "I'm experiencing connection issues. Please try again later.",
          intent: "error"
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
