/**
 * Unit Tests: Validation Schemas
 * Tests Zod schema validation for all inputs
 * SE Principle: Input validation and type safety
 */

import {
  LoginSchema,
  SignupSchema,
  SendMessageSchema,
  validateInput,
} from '@/lib/validation';

describe('Validation Schemas', () => {
  describe('LoginSchema', () => {
    it('should validate correct login credentials', () => {
      const validInput = {
        email: 'user@example.com',
        password: 'SecurePass123',
      };
      const result = LoginSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const invalidInput = {
        email: 'not-an-email',
        password: 'SecurePass123',
      };
      const result = LoginSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message.toLowerCase()).toContain('invalid');
      }
    });

    it('should reject password shorter than 6 characters', () => {
      const invalidInput = {
        email: 'user@example.com',
        password: 'short',
      };
      const result = LoginSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should reject missing email', () => {
      const invalidInput = {
        password: 'SecurePass123',
      };
      const result = LoginSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });
  });

  describe('SignupSchema', () => {
    it('should validate complete signup with strong password', () => {
      const validInput = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'SecurePass123',
      };
      const result = SignupSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it('should reject password without uppercase', () => {
      const invalidInput = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'securepass123',
      };
      const result = SignupSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should reject password without number', () => {
      const invalidInput = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'SecurePass',
      };
      const result = SignupSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should reject name shorter than 2 characters', () => {
      const invalidInput = {
        name: 'J',
        email: 'john@example.com',
        password: 'SecurePass123',
      };
      const result = SignupSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });
  });

  describe('SendMessageSchema', () => {
    it('should validate correct message input', () => {
      const validInput = {
        chatSessionId: 'clzx9k0qx0000qw0z0z0z0z0z',
        content: 'Help with my order',
      };
      const result = SendMessageSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it('should reject empty message', () => {
      const invalidInput = {
        chatSessionId: 'clzx9k0qx0000qw0z0z0z0z0z',
        content: '',
      };
      const result = SendMessageSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should reject message longer than 5000 characters', () => {
      const invalidInput = {
        chatSessionId: 'clzx9k0qx0000qw0z0z0z0z0z',
        content: 'a'.repeat(5001),
      };
      const result = SendMessageSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });
  });

  describe('validateInput helper', () => {
    it('should return tuple with success and data', () => {
      const [isValid, data, errors] = validateInput(LoginSchema, {
        email: 'user@example.com',
        password: 'SecurePass123',
      });
      expect(isValid).toBe(true);
      expect(data).not.toBeNull();
      expect(errors).toBeNull();
    });

    it('should return errors for invalid input', () => {
      const [isValid, data, errors] = validateInput(LoginSchema, {
        email: 'invalid-email',
        password: 'short',
      });
      expect(isValid).toBe(false);
      expect(data).toBeNull();
      expect(errors).not.toBeNull();
      expect(Array.isArray(errors)).toBe(true);
    });
  });
});
