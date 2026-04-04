import { NextRequest, NextResponse } from "next/server";

// Global model instance - persists across requests for performance
let pipeline: any = null;

/**
 * Initialize the transformer model on first request
 * Using Xenova/distilgpt2 - a lightweight, fast model perfect for customer support
 * Download happens automatically on first use (~350MB)
 */
async function initializeModel() {
  if (pipeline) return pipeline;

  try {
    console.log("📥 Loading AI model for first time (one-time, ~30 seconds)...");
    
    const { pipeline: transformersPipeline } = await import("@xenova/transformers");
    
    // Using DistilGPT2 - lightweight, fast, and good for conversations
    // Other options: Xenova/Phi-2 (better quality, ~2GB), Xenova/LLaMA2-Chat (more powerful, ~4GB)
    pipeline = await transformersPipeline("text-generation", "Xenova/distilgpt2");
    
    console.log("✅ AI model loaded successfully!");
    return pipeline;
  } catch (error) {
    console.error("Failed to load model:", error);
    throw new Error("Failed to initialize AI model");
  }
}

/**
 * Format the system prompt for customer support
 */
function getSystemPrompt(): string {
  return `You are Aria, a friendly and professional AI customer support assistant.

Guidelines:
- Be warm, conversational, and genuinely helpful
- Keep responses 2-3 sentences, natural and friendly
- Help with: orders, tracking, billing, technical issues, returns, product questions
- Show empathy for customer problems
- End with a helpful next step or follow-up question
- Use "I'd be happy to help!" or "Great question!"
- Write like you're texting a knowledgeable friend (professional but casual)
- If unsure, offer to escalate to a human agent

Customer message:`;
}

/**
 * Generate response using local transformer model
 */
async function generateResponse(userMessage: string): Promise<string> {
  try {
    // Initialize model if needed
    const model = await initializeModel();

    // Build the prompt
    const prompt = `${getSystemPrompt()} ${userMessage}

Response:`;

    console.log("🤖 Generating response...");

    // Generate text
    const result = await model(prompt, {
      max_new_tokens: 150,
      temperature: 0.7,
      top_p: 0.9,
      repetition_penalty: 1.2,
    });

    // Extract generated text
    let response = result[0].generated_text;

    // Clean up response - remove the prompt, keep only the generated part
    if (response.includes("Response:")) {
      response = response.split("Response:")[1].trim();
    }

    // Remove any trailing incomplete sentences
    response = response.split("\n")[0]; // Get first line only
    response = response.trim();

    // Ensure response is not too short and not repeating the user message
    if (response.length < 10 || response.toLowerCase() === userMessage.toLowerCase()) {
      return "I'd be happy to help! Could you provide more details about your question so I can assist you better?";
    }

    return response;
  } catch (error) {
    console.error("Generation error:", error);
    throw error;
  }
}

/**
 * POST /api/chat-local
 * No authentication required, no database needed
 * Perfect for testing and development
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    // Validate input
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { success: false, error: "Message is required" },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { success: false, error: "Message is too long (max 1000 characters)" },
        { status: 400 }
      );
    }

    // Generate response
    console.log(`📨 Received: "${message}"`);
    const response = await generateResponse(message);
    console.log(`📤 Responding: "${response}"`);

    return NextResponse.json({
      success: true,
      message: response,
      model: "distilgpt2",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to generate response",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/chat-local - Health check
 * Returns status and model info
 */
export async function GET() {
  const modelLoaded = pipeline !== null;

  return NextResponse.json({
    status: "ok",
    modelLoaded,
    model: "Xenova/distilgpt2",
    endpoint: "/api/chat-local",
    description: "Local AI chat using Hugging Face transformers",
    firstRequestNote: modelLoaded
      ? "model ready"
      : "model will load on first chat request (~30s)",
  });
}
