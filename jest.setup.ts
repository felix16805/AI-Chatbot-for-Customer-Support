import '@testing-library/jest-dom';

// Mock environment variables for tests
process.env.NEXTAUTH_SECRET = 'test-secret-key-for-testing-only';
process.env.NEXTAUTH_URL = 'http://localhost:3000';
process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/test_db';
// NODE_ENV is read-only in Jest, so we don't set it here

// Mock the logger before any imports
jest.mock('@/lib/logger', () => ({
  logger: {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
  logApiRequest: jest.fn(),
  logAuthEvent: jest.fn(),
  logModelUsage: jest.fn(),
  logDatabaseOperation: jest.fn(),
}));
