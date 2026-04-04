import { NextRequest, NextResponse } from "next/server";

/**
 * Enhanced Chat Endpoint for Delivery, Logistics & Tracking
 * ✅ Specialized responses for shipping, delivery, and logistics
 * ✅ Off-topic detection to keep conversations focused
 * ✅ Clickable options for guided user experience
 * ✅ No database dependency - fully stateless
 */

// Specialized knowledge base for logistics, delivery, and tracking
const specializedResponses: Record<string, string[]> = {
  track_order: [
    "I can help you track your order! Please share your 6-10 digit order number and I'll get you the latest status.",
    "Great! To track your shipment, I'll need your order number. Once you provide it, I can tell you exactly where it is.",
    "I'm ready to help you track! What's your order ID? I'll pull up the tracking details immediately.",
  ],
  delivery_status: [
    "Let me help with your delivery! Please share your order number so I can check the current shipping status and estimated delivery date.",
    "I can look that up for you! What order number are you asking about? I'll get you the delivery timeline.",
    "Happy to help! Could you provide your order number? I'll check the carrier and delivery status right away.",
  ],
  track_order_advanced: [
    "Your order is currently in transit with our logistics partner. The estimated delivery is within 3-5 business days. You should receive tracking updates via email.",
    "Your package is at the sorting facility and is on schedule for delivery. We'll send you another update when it's out for delivery today.",
    "Great news! Your order was delivered today. If you don't see it, please check with neighbors or leave a message.",
  ],
  shipping_help: [
    "I'm here to help with any shipping questions! Are you having issues with delayed delivery, lost package, or need carrier information?",
    "Got it! Let me help with your shipping concern. Can you tell me more about what's happening with your package?",
    "I can definitely assist! What's your shipping issue? Let me know if your package is delayed, missing, or something else.",
  ],
  return_item: [
    "I'll help you start a return. First, tell me your order number and which item you'd like to return.",
    "Sure thing! To process your return, I need your order number. Once you provide it, I'll give you the return shipping label.",
    "No problem! I can help with that. What's your order number and which item would you like to send back?",
  ],
  off_topic: [
    "I appreciate the question, but I'm specifically here to help with delivery, tracking, shipping, and returns. Let's get back to your logistics needs—what can I help you with?",
    "That's an interesting topic! However, I specialize in order tracking and delivery. Do you need help with a shipment or return?",
    "I'm focused on helping with shipping and delivery issues. Let's stick to what I can help with best—is there tracking or delivery info you need?",
  ],
};

function isOffTopic(message: string): boolean {
  const lower = message.toLowerCase().trim();
  
  // Check if message relates to our specialization
  const onTopicPatterns = /track|order|deliver|ship|logistic|return|refund|package|parcel|cargo|transit|arrival|status|number|carrier|trace|location|address|shipping|expense|label|tracking/i;
  
  // If it contains on-topic words, it's on topic
  if (onTopicPatterns.test(lower)) {
    return false;
  }
  
  // Common on-topic responses
  if (/track order|delivery status|return item|shipping help/i.test(lower)) {
    return false;
  }
  
  // Quick options from UI
  if (/^(Track Order|Delivery Status|Return Item|Shipping Help)$/i.test(lower)) {
    return false;
  }
  
  // Everything else is off-topic
  return true;
}

function detectSpecificIntent(message: string): string {
  const lower = message.toLowerCase().trim();
  
  // Quick option buttons clicked
  if (/^track order$/i.test(lower)) return "track_order";
  if (/^delivery status$/i.test(lower)) return "delivery_status";
  if (/^return item$/i.test(lower)) return "return_item";
  if (/^shipping help$/i.test(lower)) return "shipping_help";
  
  // Order tracking
  if (/track|where.*order|where.*package|status.*order|trace|location.*order/i.test(lower)) {
    return /^\d+$/.test(lower.trim()) ? "track_order_advanced" : "track_order";
  }
  
  // Delivery status
  if (/deliver|arrival|when.*arrive|when.*delivery|ETA|estimated|shipping.*status/i.test(lower)) {
    return "delivery_status";
  }
  
  // Returns
  if (/return|send back|exchange|refund|money back|replacement/i.test(lower)) {
    return "return_item";
  }
  
  // Shipping help
  if (/ship|carrier|fedex|ups|usps|dhl|logistics|transport|reroute|intercept/i.test(lower)) {
    return "shipping_help";
  }
  
  // Check if just a number (order ID)
  if (/^\d{6,10}$/.test(lower)) {
    return "track_order_advanced";
  }
  
  return "track_order"; // Default to tracking
}

function getSpecializedResponse(message: string, intent: string): string {
  const responses = specializedResponses[intent] || specializedResponses["track_order"];
  return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * POST /api/chat - Specialized logistics and delivery support
 */
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

    if (message.length > 1000) {
      return NextResponse.json(
        { success: false, error: "Message is too long (max 1000 characters)" },
        { status: 400 }
      );
    }

    console.log(`📨 Chat request: "${message.substring(0, 50)}..."`);

    // Check if message is off-topic
    const offTopic = isOffTopic(message);
    
    let aiResponse: string;
    let intent: string;
    
    if (offTopic) {
      // Off-topic message - redirect to original topics
      aiResponse = specializedResponses["off_topic"][Math.floor(Math.random() * specializedResponses["off_topic"].length)];
      intent = "off-topic";
    } else {
      // On-topic - provide specialized response
      intent = detectSpecificIntent(message);
      aiResponse = getSpecializedResponse(message, intent);
    }

    console.log(`📤 Chat response: "${aiResponse.substring(0, 50)}..." (Intent: ${intent})`);

    return NextResponse.json({
      success: true,
      message: aiResponse,
      intent: intent,
      isOffTopic: offTopic,
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
 * GET /api/chat - Health check
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    specialization: "Delivery, Logistics, and Order Tracking",
    features: ["Order Tracking", "Delivery Status", "Returns", "Shipping Help"],
    offTopicDetection: true,
  });
}