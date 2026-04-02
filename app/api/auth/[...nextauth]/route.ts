// NextAuth Route Handler
// Manages all authentication requests: sign in, sign up, sign out, callbacks
// This is the main entry point for all auth operations

import { auth } from "@/lib/auth-config";
import NextAuth from "next-auth";
import authConfig from "@/lib/auth-config";

// Create the NextAuth handler for the dynamic route
const handler = NextAuth(authConfig);

// Export handlers for both GET and POST methods
export const GET = handler;
export const POST = handler;

// Export auth function for server-side session checks
export { auth };

