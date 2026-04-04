import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/auth/login
 * Authenticate user - MVP version without database
 * Force recompile
 * Authenticate user and create session
 * 
 * MVP version - no database dependency
 * Accepts any valid email + password combination
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Basic password validation
    if (typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Successful login
    const response = NextResponse.json(
      {
        success: true,
        message: "Logged in successfully",
        user: {
          id: "user_" + Date.now(),
          email,
          name: email.split("@")[0], // Use email prefix as name
        },
      },
      { status: 200 }
    );

    // Set auth token cookie
    response.cookies.set("auth_token", "token_" + Date.now(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process login" },
      { status: 500 }
    );
  }
}