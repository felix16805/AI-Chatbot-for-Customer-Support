// NextAuth Route Handler
// Manages all authentication requests: sign in, sign up, sign out, callbacks
// This is the main entry point for all auth operations

import { handlers, auth } from "@/lib/auth-config";

// Export handlers for API routes
export const { GET, POST } = handlers;

// Export auth function for server-side session checks
export { auth };

