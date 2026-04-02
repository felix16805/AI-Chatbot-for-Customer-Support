// Error Handling & Response Utilities
// Best Practice: Centralized error handling, consistent API responses
// Demonstrates: Custom error classes, error serialization, logging integration

import { NextResponse, NextRequest } from "next/server";
import { ZodError } from "zod";
import { logApiRequest } from "./logger";

/**
 * Custom Error Classes - Demonstrates SE best practice of domain-specific errors
 */

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number,
    code: string,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// Domain-specific error classes
export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, "VALIDATION_ERROR", true);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = "Authentication failed") {
    super(message, 401, "AUTHENTICATION_ERROR", true);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = "Not authorized to perform this action") {
    super(message, 403, "AUTHORIZATION_ERROR", true);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = "Resource") {
    super(`${resource} not found`, 404, "NOT_FOUND", true);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, "CONFLICT", true);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = "Too many requests") {
    super(message, 429, "RATE_LIMIT", true);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = "Internal server error") {
    super(message, 500, "INTERNAL_SERVER_ERROR", false);
  }
}

/**
 * Standardized API Response Format
 * Demonstrates: Consistent REST API response structure
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    details?: unknown;
  };
  timestamp: string;
}

/**
 * Create standardized success response
 */
export function successResponse<T>(
  data: T,
  statusCode: number = 200
): NextResponse<ApiResponse<T>> {
  return new NextResponse(
    JSON.stringify({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    } as ApiResponse<T>),
    {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    }
  );
}

/**
 * Create standardized error response
 */
export function errorResponse(
  error: Error | AppError | string,
  statusCode: number = 500
): NextResponse<ApiResponse> {
  let message = "An error occurred";
  let code = "INTERNAL_SERVER_ERROR";
  let details: unknown;

  if (typeof error === "string") {
    message = error;
  } else if (error instanceof ZodError) {
    statusCode = 400;
    code = "VALIDATION_ERROR";
    message = "Validation failed";
    details = error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    code = error.code;
    message = error.message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return new NextResponse(
    JSON.stringify({
      success: false,
      error: { message, code, details },
      timestamp: new Date().toISOString(),
    } as ApiResponse),
    {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    }
  );
}

/**
 * Wrapper for async route handlers with automatic error handling
 * Demonstrates: Middleware pattern for cross-cutting concerns
 */

type RouteHandler = (req: NextRequest | Request) => Promise<NextResponse>;

export function withErrorHandling(handler: RouteHandler): RouteHandler {
  return async (req: NextRequest | Request) => {
    const startTime = Date.now();
    try {
      const response = await handler(req);

      // Log successful request
      const duration = Date.now() - startTime;
      await logApiRequest({
        method: req.method,
        path: new URL(req.url).pathname,
        statusCode: response.status,
        responseTime: duration,
      });

      return response;
    } catch (error) {
      const duration = Date.now() - startTime;

      // Log error
      if (error instanceof Error) {
        await logApiRequest({
          method: req.method,
          path: new URL(req.url).pathname,
          statusCode: error instanceof AppError ? error.statusCode : 500,
          responseTime: duration,
          error,
        });
      }

      // Return standardized error response
      if (error instanceof AppError) {
        return errorResponse(error, error.statusCode);
      }

      if (error instanceof ZodError) {
        return errorResponse(error, 400);
      }

      if (error instanceof Error) {
        return errorResponse(error, 500);
      }

      return errorResponse("An unknown error occurred", 500);
    }
  };
}

/**
 * Global error logger for unhandled errors
 */
export function handleUnhandledError(error: unknown): void {
  console.error("[UNHANDLED ERROR]", {
    timestamp: new Date().toISOString(),
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
  });
}
