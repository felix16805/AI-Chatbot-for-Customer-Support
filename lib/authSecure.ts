/**
 * Secure Authentication Utilities
 * OWASP Best Practices:
 * - CWE-256: Plaintext Storage of Password - Use bcrypt for hashing
 * - CWE-327: Use of Broken/Risky Cryptographic Algorithm - Use bcryptjs
 * - CWE-340: Generation of Predictable Numbers - Use secure random tokens
 * 
 * Security improvements:
 * - Replaces base64 encoding with proper bcrypt hashing
 * - Uses bcryptjs with appropriate salt rounds
 * - Implements JWT-like tokens (can be extended with real JWT)
 * - Prevents timing attacks in password comparison
 */

import bcrypt from "bcryptjs";
import crypto from "crypto";

/**
 * Configuration for password hashing
 * - 12 rounds = ~250ms per hash (good balance between security and performance)
 * - Higher rounds = more resilient against brute force but slower
 * - OWASP recommendation: minimum 10 rounds
 */
export const BCRYPT_ROUNDS = 12;

/**
 * Token configuration
 */
export const TOKEN_EXPIRY_HOURS = 24 * 7; // 7 days
export const TOKEN_ALGORITHM = "HS256";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface SecureUser extends User {
  passwordHash: string;
}

/**
 * Hash a password using bcrypt
 * SECURITY: This replaces the old base64 encoding
 * 
 * @param password - Plain text password
 * @returns Hashed password safe for database storage
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    // bcrypt will generate a salt internally using BCRYPT_ROUNDS
    const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    return hash;
  } catch (error) {
    throw new Error(`Failed to hash password: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Compare plain password with bcrypt hash
 * SECURITY: Uses timing-safe comparison to prevent timing attacks
 * 
 * @param password - Plain text password to verify
 * @param hash - Bcrypt hash from database
 * @returns true if password matches hash
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash);
  } catch {
    // Log error but don't expose details to user
    return false;
  }
}

/**
 * Create a secure authentication token
 * 
 * SECURITY NOTE: This is a simple token implementation
 * For production, consider using:
 * - JWT (jsonwebtoken library)
 * - OAuth2 with proper token refresh
 * - Session-based auth with secure cookies
 * 
 * Current implementation:
 * - Uses crypto.randomBytes for token generation
 * - Includes user data and expiration
 * - Should only be sent over HTTPS
 */
export function createToken(user: User, expiryHours: number = TOKEN_EXPIRY_HOURS): string {
  try {
    // Generate a random token 
    const randomToken = crypto.randomBytes(32).toString("hex");

    // Create payload
    const payload = {
      token: randomToken,
      userId: user.id,
      email: user.email,
      expiresAt: new Date(Date.now() + expiryHours * 60 * 60 * 1000).toISOString(),
      issuedAt: new Date().toISOString(),
    };

    // Simple encoding (in production, use JWT with signing)
    const encoded = Buffer.from(JSON.stringify(payload)).toString("base64");
    return encoded;
  } catch (error) {
    throw new Error(`Failed to create token: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Verify and decode authentication token
 * SECURITY: Checks expiration and validates structure
 */
export function verifyToken(
  token: string
): { userId: string; email: string } | null {
  try {
    // Decode from base64
    const decoded = JSON.parse(
      Buffer.from(token, "base64").toString("utf-8")
    );

    // Verify structure
    if (!decoded.userId || !decoded.email) {
      return null;
    }

    // Check expiration
    if (new Date(decoded.expiresAt) < new Date()) {
      return null;
    }

    return {
      userId: decoded.userId,
      email: decoded.email,
    };
  } catch {
    return null;
  }
}

/**
 * Generate secure random password reset token
 * SECURITY: Use crypto.randomBytes for cryptographic strength
 */
export function generateResetToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Hash password reset token for database storage
 * SECURITY: Never store plain reset tokens
 */
export async function hashResetToken(token: string): Promise<string> {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * Sanitize user object before sending to client
 * SECURITY: Never expose password hashes or sensitive data
 */
export function sanitizeUserForResponse(user: SecureUser): User {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
  };
}

/**
 * Validate email format
 * SECURITY: Prevent email injection
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

/**
 * Rate limiting helper for authentication attempts
 * Can be used to track failed login attempts
 */
export interface AuthAttempt {
  email: string;
  timestamp: number;
  success: boolean;
}

let authAttempts: AuthAttempt[] = [];

/**
 * Check if email is locked due to too many failed attempts
 * SECURITY: Prevents brute force attacks
 */
export function isAccountLocked(email: string): boolean {
  const MAX_ATTEMPTS = 5;
  const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

  const now = Date.now();
  const recentAttempts = authAttempts.filter(
    (attempt) =>
      attempt.email === email &&
      attempt.timestamp > now - LOCKOUT_DURATION_MS &&
      !attempt.success
  );

  return recentAttempts.length >= MAX_ATTEMPTS;
}

/**
 * Record authentication attempt
 */
export function recordAuthAttempt(email: string, success: boolean): void {
  authAttempts.push({
    email,
    timestamp: Date.now(),
    success,
  });

  // Clean up old attempts
  const CLEANUP_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours
  authAttempts = authAttempts.filter(
    (attempt) => attempt.timestamp > Date.now() - CLEANUP_DURATION_MS
  );
}

const authSecureExports = {
  hashPassword,
  verifyPassword,
  createToken,
  verifyToken,
  generateResetToken,
  hashResetToken,
  sanitizeUserForResponse,
  isValidEmail,
  isAccountLocked,
  recordAuthAttempt,
};

export default authSecureExports;