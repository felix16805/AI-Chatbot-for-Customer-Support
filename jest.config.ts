import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '@/lib/prisma': '<rootDir>/lib/__mocks__/prisma.ts',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@prisma)/)',
    'lib/generated/prisma/',
  ],
  collectCoverageFrom: [
    'lib/**/*.ts',
    'app/api/**/*.ts',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!lib/generated/**',
    '!lib/__mocks__/**',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'app/api/',
    'lib/prisma.ts',
    'lib/rabbitmq.ts',
    'lib/queue.ts',
    'lib/logger.ts',
    'lib/cache.ts',
    'lib/auth.ts',
    'lib/auth-config.ts',
    'lib/apiKeyManager.ts',
    'lib/authSecure.ts',
    'lib/rateLimiter.ts',
    'lib/sanitization.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;