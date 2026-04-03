// Validation Schemas using Zod
// Best Practice: Centralized, reusable validation for API inputs
// Demonstrates: Type safety and data integrity

import { z } from "zod";

// ============================================================================
// AUTH VALIDATION
// ============================================================================

/**
 * Login validation schema with strict field checking
 * - Rejects unknown fields (security: prevents injection of extra data)
 * - Email validation
 * - Password length limits
 */
export const LoginSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address")
      .max(255, "Email too long"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password too long"),
  })
  .strict(); // SECURITY: Reject unknown fields

/**
 * Signup validation schema with strict field checking
 * - Enhanced password requirements (8+ chars, uppercase, lowercase, number)
 * - Name validation with length limits
 * - Rejects unknown fields
 */
export const SignupSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name too long")
      .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address")
      .max(255, "Email too long"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password too long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, "Password must contain at least one special character"),
  })
  .strict(); // SECURITY: Reject unknown fields

// ============================================================================
// CHAT VALIDATION
// ============================================================================

/**
 * Create chat session validation
 * - Rejects unknown fields
 * - Optional title with length limits
 */
export const CreateChatSessionSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title cannot be empty")
      .max(200, "Title too long")
      .optional(),
  })
  .strict(); // SECURITY: Reject unknown fields

/**
 * Send message validation with strict input checking
 * - CUID validation for chat session ID
 * - Message length limits (prevents DoS via huge messages)
 * - Rejects unknown fields
 * - No HTML/script tags allowed (handled by sanitization layer)
 */
export const SendMessageSchema = z
  .object({
    chatSessionId: z
      .string()
      .cuid("Invalid chat session ID")
      .min(1, "Chat session ID is required"),
    content: z
      .string()
      .min(1, "Message cannot be empty")
      .max(5000, "Message too long (max 5000 characters)"),
  })
  .strict(); // SECURITY: Reject unknown fields

// ============================================================================
// PAGINATION & FILTERING
// ============================================================================

export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce
    .number()
    .int()
    .positive()
    .max(100)
    .default(20),
});

// ============================================================================
// FILTER SCHEMAS
// ============================================================================

export const DateRangeSchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export const ErrorLogFilterSchema = PaginationSchema.merge(
  z.object({
    severity: z.enum(["error", "warn", "info"]).optional(),
    userId: z.string().optional(),
    path: z.string().optional(),
  })
);

export const AuditLogFilterSchema = PaginationSchema.merge(
  z.object({
    action: z.string().optional(),
    userId: z.string().optional(),
  })
);

// ============================================================================
// TYPE EXPORTS - For TypeScript type safety
// ============================================================================

export type LoginInput = z.infer<typeof LoginSchema>;
export type SignupInput = z.infer<typeof SignupSchema>;
export type CreateChatSessionInput = z.infer<typeof CreateChatSessionSchema>;
export type SendMessageInput = z.infer<typeof SendMessageSchema>;
export type PaginationInput = z.infer<typeof PaginationSchema>;
export type ErrorLogFilterInput = z.infer<typeof ErrorLogFilterSchema>;
export type AuditLogFilterInput = z.infer<typeof AuditLogFilterSchema>;

/**
 * Validation helper - Returns tuple [isValid, data, errors]
 * Demonstrates: Composable, reusable validation utilities
 */
export function validateInput<T>(
  schema: z.ZodSchema,
  data: unknown
): [boolean, T | null, string[] | null] {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues.map(
      (issue) =>
        `${issue.path.join(".")} - ${issue.message}`
    );
    return [false, null, errors];
  }
  return [true, result.data as T, null];
}
