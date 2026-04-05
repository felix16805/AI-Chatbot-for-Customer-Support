// Load environment variables from .env file
import "dotenv/config";

// Prisma Client Singleton with Accelerate Support
// Best Practice: Prevents multiple database connections in development
// Reference: https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-instantiation-issue

import { PrismaClient } from "./generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const databaseUrl = process.env.DATABASE_URL;

// Allow build-time execution without DATABASE_URL
// Return undefined if not available, error will occur at runtime if actually used
let prismaInstance: PrismaClient | undefined;

if (databaseUrl) {
  prismaInstance =
    globalForPrisma.prisma ??
    new PrismaClient({
      accelerateUrl: databaseUrl,
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prismaInstance;
  }
}

export const prisma = prismaInstance as PrismaClient;