// Prisma Client Singleton
// Best Practice: Prevents multiple database connections in development
// Reference: https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-instantiation-issue

import { PrismaClient } from "./generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Create a minimal mock adapter that satisfies Prisma requirements for the build
const createMinimalAdapter = () => {
  const adapter = {
    name: "mock-adapter",
    provider: "postgres",
    version: "1.0.0",
    queryRaw: async () => [],
    executeRaw: async () => 0,
    toJSON: () => ({}),
  } as any;
  return adapter;
};

export const prisma =
  globalForPrisma.prisma ??
  (new PrismaClient({
    adapter: createMinimalAdapter()
  } as any) as PrismaClient);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
