import { NextRequest, NextResponse } from "next/server";
import { LoginSchema } from "@/lib/validation";
import {
  ValidationError,
  AuthenticationError,
  withErrorHandling,
  successResponse,
} from "@/lib/errors";
import {
  verifyPassword,
  createToken,
  sanitizeUserForResponse,
  isAccountLocked,
  recordAuthAttempt,
} from "@/lib/authSecure";
import { sanitizeEmail } from "@/lib/sanitization";
import { strictAuthRateLimiter } from "@/lib/rateLimiter";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

/**
 * POST /api/auth/login
 * Authenticate user and create session
 * 
 * Security measures:
 * - Rate limiting (5 requests per 15 minutes per IP)
 * - Strict input validation with Zod (rejects unknown fields)
 * - Input sanitization (XSS prevention)
 * - Timing-safe password comparison (bcrypt)
 * - Account lockout after multiple failed attempts
 * - Email normalization
 */
export const POST = withErrorHandling(async (request: NextRequest | Request) => {
  // Cast to NextRequest for rate limiter if needed
  const nextReq = request instanceof NextRequest ? request : (request as NextRequest);
  
  // ========== RATE LIMITING ==========
  // Prevent brute force password guessing attacks
  await strictAuthRateLimiter(nextReq);

  // ========== PARSE REQUEST ==========
  let body;
  try {
    body = await request.json();
  } catch {
    throw new ValidationError("Invalid JSON in request body");
  }

  // ========== INPUT VALIDATION ==========
  // Use Zod schema with strict mode (rejects unknown fields)
  const validation = LoginSchema.safeParse(body);
  if (!validation.success) {
    const errors = validation.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    logger.warn({ inputs: Object.keys(body) }, `Login validation failed: ${errors}`);
    throw new ValidationError(errors);
  }

  let { email, password } = validation.data;

  // ========== INPUT SANITIZATION ==========
  email = sanitizeEmail(email);

  // ========== SECURITY: Check for account lockout ==========
  if (isAccountLocked(email)) {
    logger.warn({ email }, "Login attempt on locked account");
    throw new ValidationError(
      "Too many failed attempts. Please try again in 15 minutes."
    );
  }

  // ========== FIND USER ==========
  let user;
  try {
    user = await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    logger.error({ error, email }, "Database error during login");
    throw new Error("Failed to authenticate. Please try again.");
  }

  // ========== VERIFY PASSWORD ==========
  // Use timing-safe comparison (bcrypt.compare)
  if (!user) {
    // Record failed attempt
    recordAuthAttempt(email, false);
    logger.warn({ email }, "Login attempt with non-existent email");
    // Generic error message prevents user enumeration
    throw new AuthenticationError("Invalid email or password");
  }

  // Verify password using bcrypt (timing-safe comparison)
  // This replaces the old base64 comparison
  let passwordMatch: boolean;
  try {
    // Use 'password' field from schema (not passwordHash)
    passwordMatch = await verifyPassword(password, user.password || "");
  } catch (error) {
    logger.error({ error }, "Password verification error");
    recordAuthAttempt(email, false);
    throw new AuthenticationError("Invalid email or password");
  }

  if (!passwordMatch) {
    recordAuthAttempt(email, false);
    logger.warn({ userId: user.id, email }, "Failed login attempt (invalid password)");
    // Generic error message prevents user enumeration
    throw new AuthenticationError("Invalid email or password");
  }

  // ========== SUCCESSFUL LOGIN ==========
  recordAuthAttempt(email, true);

  // ========== CREATE TOKEN ==========
  const token = createToken({
    id: user.id,
    email: user.email || "",
    name: user.name || "",
  });

  // ========== LOG AUTH EVENT ==========
  logger.info(
    { userId: user.id, email },
    "User logged in successfully"
  );

  // ========== RETURN RESPONSE ==========
  const response = NextResponse.json(
    {
      success: true,
      data: {
        message: "Logged in successfully",
        user: sanitizeUserForResponse({
          id: user.id,
          email: user.email || "",
          name: user.name || "",
          passwordHash: user.password || "",
        }),
      },
    },
    { status: 200 }
  );

  // Set secure HTTP-only cookie
  response.cookies.set("auth_token", token, {
    httpOnly: true, // Prevents JavaScript access (XSS protection)
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "strict", // CSRF protection
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return response;
});