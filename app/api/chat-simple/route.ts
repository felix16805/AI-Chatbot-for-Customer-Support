import { NextRequest, NextResponse } from "next/server";
import { apiKeyManager } from "@/lib/apiKeyManager";

/**
 * Simple chat endpoint - Works WITHOUT database
 * For testing the Gemini API without setting up a database
 */

const SYSTEM_PROMPT = `You are Aria, a friendly and engaging AI customer support assistant. Your personality:
- Warm, conversational, and approachable
- Genuinely interested in helping customers
- Natural language (not robotic or formal)
- Add personality and light humor when appropriate

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

async function callGeminiApi(content: string): Promise<string> {
  const apiKey = apiKeyManager.getApiKey("gemini");
  if (!apiKey) {
    throw new Error("Gemini API key not configured");
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
          parts: [{ text: `${SYSTEM_PROMPT}\n\nCustomer: ${content}` }],
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
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  
  if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
    throw new Error("Invalid response from Gemini API");
  }

  return data.candidates[0].content.parts[0].text;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const aiResponse = await callGeminiApi(message);

    return NextResponse.json({
      message: aiResponse,
      success: true,
    });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to process message",
        success: false,
      },
      { status: 500 }
    );
  }
}
