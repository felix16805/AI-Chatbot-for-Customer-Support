import { NextRequest, NextResponse } from "next/server";
import { SignupSchema } from "@/lib/validation";
import {
  ValidationError,
  ConflictError,
  withErrorHandling,
} from "@/lib/errors";
import {
  hashPassword,
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
 * POST /api/auth/signup
 * Register a new user account
 * 
 * Security measures:
 * - Rate limiting (3 requests per 5 minutes per IP)
 * - Strict input validation with Zod (rejects unknown fields)
 * - Input sanitization (XSS prevention)
 * - Bcrypt password hashing (not base64)
 * - Account lockout after multiple failed attempts
 * - Email normalization
 */
export const POST = withErrorHandling(async (request: NextRequest | Request) => {
  // Cast to NextRequest for rate limiter if needed
  const nextReq = request instanceof NextRequest ? request : (request as NextRequest);
  
  // ========== RATE LIMITING ==========
  // Prevent brute force attacks on signup endpoint
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
  const validation = SignupSchema.safeParse(body);
  if (!validation.success) {
    const errors = validation.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    logger.warn({ inputs: Object.keys(body) }, `Signup validation failed: ${errors}`);
    throw new ValidationError(errors);
  }

  const { email: rawEmail, password: rawPassword, name: rawName } = validation.data;
  let email = sanitizeEmail(rawEmail);
  const password = rawPassword;
  let name = rawName.trim();

  // ========== SECURITY: Check for account lockout ==========
  if (isAccountLocked(email)) {
    logger.warn({ email }, "Signup attempt on locked account");
    throw new ValidationError(
      "Too many signup attempts. Please try again in 15 minutes."
    );
  }

  // ========== CHECK EXISTING USER ==========
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      recordAuthAttempt(email, false);
      throw new ConflictError("An account with this email already exists");
    }
  } catch (error) {
    if (error instanceof ConflictError) throw error;
    logger.error({ error, email }, "Database check failed during signup");
    throw error;
  }

  // ========== HASH PASSWORD ==========
  // Use bcrypt with 12 rounds (replaces old base64 encoding)
  let passwordHash;
  try {
    passwordHash = await hashPassword(password);
  } catch (error) {
    logger.error({ error }, "Password hashing failed");
    throw new Error("Failed to process signup. Please try again.");
  }

  // ========== CREATE USER ==========
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: passwordHash, // Use 'password' field (not passwordHash)
      },
    });

    // Record successful auth attempt
    recordAuthAttempt(email, true);

    // ========== CREATE TOKEN ==========
    const token = createToken({ 
      id: user.id, 
      email: user.email || "", 
      name: user.name || "" 
    });

    // ========== LOG SIGNUP EVENT ==========
    logger.info({ userId: user.id, email }, "User signed up successfully");

    // ========== RETURN RESPONSE ==========
    const response = NextResponse.json(
      {
        success: true,
        data: {
          message: "Account created successfully",
          user: sanitizeUserForResponse({
            id: user.id,
            email: user.email || "",
            name: user.name || "",
            passwordHash: passwordHash,
          }),
        },
      },
      { status: 201 }
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
  } catch (error) {
    if (error instanceof ConflictError) {
      recordAuthAttempt(email, false);
      throw error;
    }

    logger.error({ error, email }, "Failed to create user account");
    throw error;
  }
});