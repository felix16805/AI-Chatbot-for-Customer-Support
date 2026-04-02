// Prisma Client Singleton
// Best Practice: Prevents multiple database connections in development
// Reference: https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-instantiation-issue

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  (new PrismaClient({
    // Note: In production, connect to PostgreSQL via DATABASE_URL env var
    // For development, ensure DATABASE_URL is set in .env
  } as any) as PrismaClient);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
