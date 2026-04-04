import { NextRequest, NextResponse } from "next/server";

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
- End with a helpful next step or question`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { success: false, error: "Message is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${SYSTEM_PROMPT}\n\nCustomer: ${message}` }],
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
        { success: false, error: `Gemini API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      return NextResponse.json(
        { success: false, error: "Invalid response from Gemini API" },
        { status: 500 }
      );
    }

    const aiResponse = data.candidates[0].content.parts[0].text;

    return NextResponse.json({
      success: true,
      message: aiResponse,
    });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process message",
      },
      { status: 500 }
    );
  }
}
