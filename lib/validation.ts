// Validation Schemas using Zod
// Best Practice: Centralized, reusable validation for API inputs
// Demonstrates: Type safety and data integrity

import { z } from "zod";

// ============================================================================
// AUTH VALIDATION
// ============================================================================

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password too long"),
});

export const SignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password too long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

// ============================================================================
// CHAT VALIDATION
// ============================================================================

export const CreateChatSessionSchema = z.object({
  title: z.string().min(1).max(200).optional(),
});

export const SendMessageSchema = z.object({
  chatSessionId: z.string().cuid("Invalid chat session ID"),
  content: z
    .string()
    .min(1, "Message cannot be empty")
    .max(5000, "Message too long"),
});

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
