// Structured Logging System
// Best Practice: Centralized, structured logging for debugging and monitoring
// Uses Pino for performance and structured JSON output

import pino from "pino";
import { prisma } from "./prisma";

// Create logger instance
const isDevelopment = process.env.NODE_ENV === "development";

export const logger = pino(
  {
    level: isDevelopment ? "debug" : "info",
    transport: isDevelopment
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        }
      : undefined,
  },
  pino.destination()
);

/**
 * Log API request with context
 * Demonstates: Request tracking, user attribution, performance monitoring
 */
export async function logApiRequest(options: {
  userId?: string;
  method: string;
  path: string;
  statusCode: number;
  responseTime: number;
  error?: Error;
}) {
  const { userId, method, path, statusCode, responseTime, error } = options;

  logger.info(
    {
      type: "api_request",
      userId,
      method,
      path,
      statusCode,
      responseTime,
      timestamp: new Date().toISOString(),
    },
    `${method} ${path} - ${statusCode} (${responseTime}ms)`
  );

  // Store error in database for later analysis
  if (error) {
    try {
      await prisma.errorLog.create({
        data: {
          userId,
          message: error.message,
          stack: error.stack,
          method,
          path,
          statusCode,
          severity: statusCode >= 500 ? "error" : "warn",
        },
      });
    } catch (dbError) {
      logger.error(dbError, "Failed to log error to database");
    }
  }
}

/**
 * Log authentication event
 * Demonstrates: Security audit trails
 */
export async function logAuthEvent(options: {
  action: "LOGIN" | "LOGOUT" | "SIGNUP" | "PASSWORD_RESET";
  userId?: string;
  email?: string;
  success: boolean;
  ipAddress?: string;
  userAgent?: string;
  error?: string;
}) {
  const { action, userId, email, success, ipAddress, userAgent, error } =
    options;

  logger.info(
    {
      type: "auth_event",
      action,
      userId,
      email,
      success,
      ipAddress,
      timestamp: new Date().toISOString(),
    },
    `Auth ${action}: ${success ? "success" : "failed"}`
  );

  // Store in audit log for compliance
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        status: success ? "success" : "failed",
        ipAddress,
        userAgent,
        details: error || undefined,
      },
    });
  } catch (dbError) {
    logger.error(dbError, "Failed to log auth event");
  }
}

/**
 * Log database operation
 * Demonstrates: Performance monitoring
 */
export function logDatabaseOperation(options: {
  operation: string;
  table: string;
  duration: number;
  error?: Error;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { operation, table, duration, error: _error } = options;

  logger.info(
    {
      type: "database",
      operation,
      table,
      duration,
      timestamp: new Date().toISOString(),
    },
    `${operation} on ${table} (${duration}ms)`
  );
}

/**
 * Log AI model usage
 * Demonstrates: Cost tracking and usage analytics
 */
export async function logModelUsage(options: {
  userId: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  responseTime: number;
  success: boolean;
  error?: string;
}) {
  const {
    userId,
    model,
    inputTokens,
    outputTokens,
    responseTime,
    success,
  } = options;

  logger.info(
    {
      type: "model_usage",
      userId,
      model,
      inputTokens,
      outputTokens,
      responseTime,
      success,
      timestamp: new Date().toISOString(),
    },
    `${model} usage - ${inputTokens + outputTokens} tokens (${responseTime}ms)`
  );
}

export default logger;
