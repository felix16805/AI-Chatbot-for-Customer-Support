import { NextRequest } from "next/server";
import { auth } from "@/lib/auth-config";
import {
  successResponse,
  AuthenticationError,
  ValidationError,
  withErrorHandling,
  InternalServerError,
} from "@/lib/errors";
import { SendMessageSchema } from "@/lib/validation";
import { logModelUsage, logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { userRateLimiter } from "@/lib/rateLimiter";
import { sanitizeString, stripSensitiveFields } from "@/lib/sanitization";
import { apiKeyManager } from "@/lib/apiKeyManager";

/**
 * SECURITY IMPROVEMENTS in this chat endpoint:
 * ✅ Rate limiting - User-based limits to prevent abuse
 * ✅ API key security - Use Authorization header, not query parameters
 * ✅ Input sanitization - XSS prevention via sanitization layer
 * ✅ Zod validation - Strict validation with unknown fields rejection
 * ✅ Sensitive data - Strip before logging
 */

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
 * Call Gemini API securely with Authorization header
 * SECURITY: API key passed in header, not query params
 */
async function callGeminiApi(content: string): Promise<{
  response: string;
  tokensUsed?: number;
}> {
  // Check if Gemini is configured
  if (!apiKeyManager.isProviderConfigured("gemini")) {
    throw new Error("Gemini API is not configured");
  }

  // Get API key securely
  const apiKey = apiKeyManager.getApiKey("gemini");
  if (!apiKey) {
    throw new Error("Failed to retrieve Gemini API key");
  }

  // Build the URL without the API key (key goes in header)
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // SECURITY: Pass API key in Authorization header, not query params
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
      logger.error(
        { status: response.status, error: stripSensitiveFields(error) },
        "Gemini API error"
      );
      throw new Error(`Gemini API returned ${response.status}`);
    }

    const data = await response.json();

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error("Invalid response format from Gemini API");
    }

    const aiResponse = data.candidates[0].content.parts[0].text;

    // Extract usage metrics if available
    const tokensUsed = data.usageMetadata
      ? data.usageMetadata.inputTokenCount +
        data.usageMetadata.outputTokenCount
      : undefined;

    return { response: aiResponse, tokensUsed };
  } catch (error) {
    logger.error(
      {
        error: error instanceof Error ? error.message : String(error),
      },
      "Failed to call Gemini API"
    );
    throw error;
  }
}

/**
 * Chat Handler with Security Best Practices:
 * ✅ Rate limiting - User-based limits
 * ✅ Authentication - Verify user session
 * ✅ Input validation - Zod schema (rejects unknown fields)
 * ✅ Input sanitization - XSS prevention
 * ✅ Authorization - Verify resource ownership
 * ✅ Error handling - Custom error classes with logging
 * ✅ Secure API calls - No exposed credentials
 * ✅ Database persistence - Messages and tracking
 * ✅ Structured logging - Usage and performance metrics
 */
const chatHandler = withErrorHandling(
  async (request: Request | NextRequest) => {
    const startTime = Date.now();

    // ========== AUTHENTICATION ==========
    const session = await auth();
    if (!session?.user?.id) {
      throw new AuthenticationError("You must be logged in to send messages");
    }
    const userId = session.user.id;

    // ========== RATE LIMITING ==========
    // SECURITY: User-based rate limiting (1000 requests/hour per user)
    // Also prevents authenticated users from overwhelming the server
    await userRateLimiter(request, userId);

    // ========== INPUT PARSING ==========
    let body;
    try {
      body = await request.json();
    } catch {
      throw new ValidationError("Invalid JSON body");
    }

    // ========== INPUT VALIDATION ==========
    // Zod schema with strict mode (rejects unknown fields)
    const validation = SendMessageSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; ");
      throw new ValidationError(errors);
    }

    let { chatSessionId, content } = validation.data;

    // ========== INPUT SANITIZATION ==========
    // SECURITY: Remove potentially dangerous content
    content = sanitizeString(content);

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

    // ========== CALL AI MODEL ==========
    const modelStartTime = Date.now();
    let aiResponse: string;
    let tokensUsed: number | undefined;

    try {
      const result = await callGeminiApi(content);
      aiResponse = result.response;
      tokensUsed = result.tokensUsed;
    } catch (apiError) {
      // Store error message in database
      await prisma.message.create({
        data: {
          chatSessionId,
          content: "Sorry, I'm having trouble responding right now. Please try again.",
          role: "assistant",
          error: apiError instanceof Error ? apiError.message : "Unknown error",
          retryCount: 1,
        },
      });

      throw new InternalServerError(
        "Failed to generate AI response. Please try again."
      );
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
      {
        userId,
        chatSessionId,
        intent,
        responseTime: modelResponseTime,
        tokensUsed,
      },
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
  }
);

// Export handler with error handling
export const POST = chatHandler;
