import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/auth/signup
 * Simple signup endpoint - no database required
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (email, password, name)" },
        { status: 400 }
      );
    }

    if (typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    if (!String(email).includes("@")) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        user: {
          id: "user_" + Date.now(),
          email,
          name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process signup" },
      { status: 500 }
    );
  }
}