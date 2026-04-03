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
  coverageThreshold: {
    global: {
      branches: 2,
      functions: 10,
      lines: 7,
      statements: 7,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;