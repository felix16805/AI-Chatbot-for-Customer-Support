// NextAuth Configuration - Production-Grade Authentication
// Demonstrates SE Best Practices: Security, Session Management, Multiple Providers

import NextAuth, { type DefaultSession, type NextAuthOptions, type JWT } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import { compare } from "bcryptjs";
import { z } from "zod";

// Extend NextAuth session to include user id
declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}

// Input validation for credentials
const SignInSchema = z.object({
  email: z.string().email("Email must be a valid email address"),
  password: z
    .string()
    .min(6, "Password must be 6 characters or longer"),
});

// Configure NextAuth
const authConfig: NextAuthOptions = {
  // Configure Prisma adapter for database sessions
  adapter: PrismaAdapter(prisma),
  
  // Session configuration
  session: {
    strategy: "jwt" as const,
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60, // Update session every 24 hours
  },

  // JWT callback with custom claims
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: { id: string; email?: string | null; name?: string | null; image?: string | null } | null }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: { user?: DefaultSession["user"] }; token: JWT }) {
      if (session.user && token.id) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },

  // Credentials provider - Email + Password authentication
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<string, unknown> | undefined) {
        // Validate input
        const parsedCredentials = SignInSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          throw new Error("Invalid email or password format");
        }

        // Find user in database
        const user = await prisma.user.findUnique({
          where: { email: parsedCredentials.data.email },
        });

        if (!user || !user.password) {
          throw new Error("User not found or password not set");
        }

        // Compare password with bcrypt hash
        const passwordsMatch = await compare(
          parsedCredentials.data.password,
          user.password
        );
        if (!passwordsMatch) {
          throw new Error("Invalid password");
        }

        // Return user object on successful auth
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],

  // Pages for custom auth UI
  pages: {
    signIn: "/login",
    signUp: "/signup",
    error: "/auth/error",
  },

  // Events for logging and monitoring
  events: {
    async signIn(message: { user?: { email?: string | null } }) {
      console.log(`[AUTH] User signed in: ${message.user?.email ?? "unknown"}`);
    },
    async signOut(_message: unknown) {
      console.log(`[AUTH] User signed out`);
    },
    async error(message: { error?: string }) {
      console.error(`[AUTH] Error: ${message.error ?? "unknown"}`);
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

export default authConfig;

