import { NextRequest } from "next/server";
import { auth } from "@/lib/auth-config";
import {
  successResponse,
  AuthenticationError,
  ValidationError,
  withErrorHandling,
} from "@/lib/errors";
import { SendMessageSchema } from "@/lib/validation";
import { logModelUsage, logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";

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
- End with a helpful next step or question`;

/**
 * Detect user intent from message
 * Demonstrates: Intent classification for analytics and routing
 */
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

/**
 * Chat Handler with Software Engineering Best Practices:
 * ✅ Authentication - Verify user session
 * ✅ Input validation - Zod schema validation
 * ✅ Authorization - Verify resource ownership
 * ✅ Error handling - Custom error classes with logging
 * ✅ Database persistence - Store messages and tracking
 * ✅ Structured logging - Track usage and performance
 * ✅ Performance monitoring - Response times and metrics
 */
const chatHandler = withErrorHandling(async (request: Request | NextRequest) => {
  const startTime = Date.now();

  // ========== AUTHENTICATION ==========
  const session = await auth();
  if (!session?.user?.id) {
    throw new AuthenticationError("You must be logged in to send messages");
  }
  const userId = session.user.id;

  // ========== INPUT VALIDATION ==========
  let body;
  try {
    body = await request.json();
  } catch {
    throw new ValidationError("Invalid JSON body");
  }

  // Validate using Zod schema
  const validation = SendMessageSchema.safeParse(body);
  if (!validation.success) {
    const errors = validation.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new ValidationError(errors);
  }

  const { chatSessionId, content } = validation.data;

  // ========== AUTHORIZATION ==========
  // Verify user owns this chat session
  const chatSession = await prisma.chatSession.findFirst({
    where: { id: chatSessionId, userId },
  });

  if (!chatSession) {
    throw new ValidationError("Chat session not found or access denied");
  }

  // ========== PERSIST USER MESSAGE ==========
  const userMessage = await prisma.message.create({
    data: {
      chatSessionId,
      content,
      role: "user",
    },
  });

  logger.debug(
    { userId, chatSessionId, messageId: userMessage.id },
    "User message created"
  );

  // ========== API KEY CHECK ==========
  if (!GEMINI_API_KEY) {
    await prisma.message.create({
      data: {
        chatSessionId,
        content:
          "I'm temporarily unavailable. Please contact support.",
        role: "assistant",
        error: "GEMINI_API_KEY not configured",
      },
    });

    throw new Error("AI API not configured");
  }

  // ========== CALL AI MODEL ==========
  const modelStartTime = Date.now();
  let aiResponse: string;
  let tokensUsed: number | undefined;

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      logger.error(
        { status: response.status, error },
        "Gemini API error"
      );

      // Store error message in DB
      await prisma.message.create({
        data: {
          chatSessionId,
          content: "Sorry, I'm having trouble responding right now. Try again.",
          role: "assistant",
          error: `API returned ${response.status}`,
          retryCount: 1,
        },
      });

      throw new Error(`Gemini API returned ${response.status}`);
    }

    const data = await response.json();

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error("Invalid response format from Gemini API");
    }

    aiResponse = data.candidates[0].content.parts[0].text;

    // Extract usage metrics if available
    tokensUsed = data.usageMetadata
      ? data.usageMetadata.inputTokenCount +
        data.usageMetadata.outputTokenCount
      : undefined;
  } catch (apiError) {
    logger.error(
      { error: apiError instanceof Error ? apiError.message : apiError },
      "Failed to call Gemini API"
    );

    throw new Error("Failed to generate AI response");
  }

  const modelResponseTime = Date.now() - modelStartTime;

  // ========== PERSIST AI RESPONSE ==========
  const assistantMessage = await prisma.message.create({
    data: {
      chatSessionId,
      content: aiResponse,
      role: "assistant",
      modelUsed: "gemini-2.5-flash",
      responseTime: modelResponseTime,
      tokensUsed,
    },
  });

  // ========== LOG MODEL USAGE ==========
  const intent = detectIntent(content);
  await logModelUsage({
    userId,
    model: "gemini-2.5-flash",
    inputTokens: tokensUsed ? Math.floor(tokensUsed * 0.3) : 0,
    outputTokens: tokensUsed ? Math.floor(tokensUsed * 0.7) : 0,
    responseTime: modelResponseTime,
    success: true,
  });

  logger.info(
    { userId, chatSessionId, intent, responseTime: modelResponseTime },
    "Chat message processed successfully"
  );

  // ========== RETURN RESPONSE ==========
  return successResponse({
    messages: [
      { id: userMessage.id, content, role: "user" },
      { id: assistantMessage.id, content: aiResponse, role: "assistant" },
    ],
    intent,
    modelResponse: aiResponse,
    responseTime: Date.now() - startTime,
  });
});

// Export handler with error handling
export const POST = chatHandler;
