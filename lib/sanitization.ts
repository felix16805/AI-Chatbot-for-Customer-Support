/**
 * Input Sanitization & Security Utilities
 * OWASP Best Practices:
 * - CWE-79: Cross-site Scripting (XSS) - Sanitize HTML/JS content
 * - CWE-200: Exposure of Sensitive Information - Don't log sensitive data
 * - CWE-400: Uncontrolled Resource Consumption - Validate lengths
 * - CWE-441: Unintended Proxy or Middleware ('confused deputy')
 */

/**
 * Sanitize string input to prevent XSS attacks
 * Removes potentially dangerous HTML/JavaScript
 */
export function sanitizeString(input: string): string {
  if (typeof input !== "string") {
    return "";
  }

  return input
    // Remove null bytes
    .replace(/\0/g, "")
    // Remove control characters except tabs, newlines
    .replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F]/g, "")
    // Remove script tags and content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    // Remove event handlers
    .replace(/on\w+\s*=\s*["']?[^"']*["']?/gi, "")
    // Trim whitespace
    .trim();
}

/**
 * Sanitize email address to prevent injection
 */
export function sanitizeEmail(email: string): string {
  return sanitizeString(email).toLowerCase();
}

/**
 * Remove sensitive fields from objects before logging
 * OWASP: Don't expose credentials, tokens, or sensitive data
 */
export function stripSensitiveFields<T extends Record<string, any>>(
  obj: T,
  sensitiveFields: string[] = [
    "password",
    "token",
    "apiKey",
    "secret",
    "bearer",
    "authorization",
  ]
): Partial<T> {
  const sanitized = { ...obj };

  for (const field of sensitiveFields) {
    // Check for exact matches and case-insensitive variations
    for (const key in sanitized) {
      if (
        key.toLowerCase() === field.toLowerCase() ||
        key.includes(field.toLowerCase())
      ) {
        delete sanitized[key];
      }
    }
  }

  return sanitized;
}

/**
 * Validate URL to prevent SSRF (Server-Side Request Forgery)
 * Only allow http/https and specific domains
 */
export function isValidUrl(
  urlString: string,
  allowedDomains?: string[]
): boolean {
  try {
    const url = new URL(urlString);

    // Only allow http and https
    if (!["http:", "https:"].includes(url.protocol)) {
      return false;
    }

    // Prevent localhost/private IPs for external requests
    const hostname = url.hostname.toLowerCase();
    const privateRanges = [
      "localhost",
      "127.0.0.1",
      "0.0.0.0",
      "::1",
      "10.",
      "172.16.",
      "192.168.",
    ];

    if (privateRanges.some((range) => hostname.startsWith(range))) {
      return false;
    }

    // If allowedDomains specified, check whitelist
    if (
      allowedDomains &&
      !allowedDomains.some((domain) => hostname.includes(domain))
    ) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Validate UUID format
 */
export function isValidUUID(id: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const cuidRegex = /^c[0-9a-z]+$/;
  return uuidRegex.test(id) || cuidRegex.test(id);
}

/**
 * Validate password strength
 * OWASP recommendations: min 8 chars, uppercase, lowercase, number, special char
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Escape HTML entities to prevent XSS in responses
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Check if string contains SQL injection patterns
 * WARNING: This is a basic check. Always use parameterized queries!
 */
export function containsSQLInjectionPatterns(input: string): boolean {
  const sqlPatterns = [
    /(\b(UNION|SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/i,
    /(-{2}|\/\*|\*\/|;)/,
    /(\bOR\b|\bAND\b).*?=.*?['"\d]/i,
  ];

  return sqlPatterns.some((pattern) => pattern.test(input));
}

/**
 * Validate and sanitize input object against schema
 * Rejects unknown fields for security
 */
export function validateAndSanitize<T extends Record<string, any>>(
  input: unknown,
  allowedFields: string[]
): T {
  if (typeof input !== "object" || input === null) {
    throw new Error("Input must be an object");
  }

  const sanitized: any = {};

  for (const field of allowedFields) {
    if (field in input) {
      const value = (input as Record<string, any>)[field];

      // Sanitize string values
      if (typeof value === "string") {
        sanitized[field] = sanitizeString(value);
      } else if (typeof value === "object" && value !== null) {
        // Recursively sanitize nested objects (but not arrays)
        if (Array.isArray(value)) {
          sanitized[field] = value;
        } else {
          sanitized[field] = sanitizeNestedObject(value);
        }
      } else {
        sanitized[field] = value;
      }
    }
  }

  // Check for unknown fields - CRITICAL for API security
  const inputKeys = Object.keys(input as Record<string, any>);
  const unknownFields = inputKeys.filter(
    (key) => !allowedFields.includes(key)
  );

  if (unknownFields.length > 0) {
    throw new Error(
      `Unexpected fields: ${unknownFields.join(", ")}. Only these fields are allowed: ${allowedFields.join(", ")}`
    );
  }

  return sanitized;
}

/**
 * Recursively sanitize nested objects
 */
function sanitizeNestedObject(obj: any): any {
  const sanitized: any = {};

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "string") {
      sanitized[key] = sanitizeString(value);
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizeNestedObject(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

export default {
  sanitizeString,
  sanitizeEmail,
  stripSensitiveFields,
  isValidUrl,
  isValidUUID,
  validatePasswordStrength,
  escapeHtml,
  containsSQLInjectionPatterns,
  validateAndSanitize,
};
