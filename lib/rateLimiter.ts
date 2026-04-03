/**
 * Rate Limiting Middleware
 * OWASP Best Practice: API Rate Limiting & Throttling
 * 
 * Benefits:
 * - Prevents brute force attacks (credential stuffing, password guessing)
 * - Prevents DoS/DDoS attacks
 * - Prevents resource exhaustion
 * - Prevents scraping and API abuse
 * 
 * Strategy:
 * - IP-based: Global limit per IP address
 * - User-based: Per-authenticated user limit
 * - Endpoint-specific: Different limits for different endpoints
 */

import { NextRequest } from "next/server";
import { RateLimitError } from "./errors";

/**
 * In-memory storage for rate limit tracking
 * In production, use Redis for distributed rate limiting
 * 
 * Structure: { key: { count: number, resetTime: number } }
 */
class RateLimitStore {
  private store: Map<string, { count: number; resetTime: number }> = new Map();
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, value] of this.store.entries()) {
      if (value.resetTime < now) {
        this.store.delete(key);
      }
    }
  }

  increment(key: string, windowMs: number): number {
    const now = Date.now();
    const entry = this.store.get(key);

    if (!entry || entry.resetTime < now) {
      // Create new window or reset expired window
      this.store.set(key, { count: 1, resetTime: now + windowMs });
      return 1;
    }

    entry.count++;
    return entry.count;
  }

  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}

// Global rate limit store singleton
const store = new RateLimitStore();

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
  message?: string;
  skipSuccessfulRequests?: boolean; // Don't count successful requests
  skipFailedRequests?: boolean; // Don't count failed requests
}

/**
 * Get client IP from request
 * CRITICAL: Properly extract IP from proxies
 */
export function getClientIp(request: NextRequest): string {
  // Check X-Forwarded-For (handles proxies like Cloudflare, Vercel)
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // Take the first IP if multiple are present
    return forwarded.split(",")[0].trim();
  }

  // Check X-Real-IP (some proxies use this)
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  // Fallback to "unknown" - NextRequest doesn't expose IP directly
  return "unknown";
}

/**
 * Create a rate limiter function for specific endpoint
 * 
 * Usage:
 * ```
 * const limiter = createRateLimiter({
 *   windowMs: 15 * 60 * 1000, // 15 minutes
 *   maxRequests: 100,
 * });
 * 
 * export async function POST(request: NextRequest) {
 *   await limiter(request); // Throws if limit exceeded
 *   // ... handler code
 * }
 * ```
 */
export function createRateLimiter(config: RateLimitConfig) {
  return async (request: NextRequest, userId?: string) => {
    const {
      windowMs,
      maxRequests,
      message = "Too many requests, please try again later",
    } = config;

    // Create composite key: endpoint + IP + (userId if authenticated)
    // Use getClientIp function to properly extract IP from proxies
    const ip = getClientIp(request);
    const path = request.nextUrl.pathname;
    const key = userId ? `user:${userId}` : `ip:${ip}:${path}`;

    // Increment counter and check limit
    const count = store.increment(key, windowMs);

    if (count > maxRequests) {
      // Include retry-after header for client guidance (in seconds)
      const retryAfter = Math.ceil(windowMs / 1000);
      throw new RateLimitError(message, retryAfter);
    }
  };
}

/**
 * Predefined rate limiters for common use cases
 * These follow OWASP recommendations
 */

// Authentication endpoints: Strict rate limiting to prevent brute force
// 5 requests per 15 minutes per IP
export const authRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5,
  message: "Too many authentication attempts. Please try again later.",
});

// Public API endpoints: Moderate rate limiting
// 100 requests per 15 minutes per IP
export const apiRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100,
  message: "API rate limit exceeded. Please wait before making more requests.",
});

// Authenticated endpoints: Generous limit
// 1000 requests per hour per user
export const userRateLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 1000,
  message: "User rate limit exceeded.",
});

// Strict endpoint: Login, signup, password reset
// 3 requests per 5 minutes per IP
export const strictAuthRateLimiter = createRateLimiter({
  windowMs: 5 * 60 * 1000, // 5 minutes
  maxRequests: 3,
  message: "Too many attempts. Please try again in a few minutes.",
});

/**
 * Enhanced RateLimitError to include retry-after header
 */
export function createRateLimitResponse(retryAfter: number) {
  return {
    statusCode: 429,
    message: "Too many requests",
    retryAfter,
  };
}

export default store;