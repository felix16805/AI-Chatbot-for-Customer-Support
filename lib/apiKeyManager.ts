/**
 * Secure API Key Management
 * OWASP Best Practices:
 * - CWE-798: Use of Hard-Coded Credentials - Move to env variables
 * - CWE-200: Exposure of Sensitive Information - Don't expose keys client-side
 * - CWE-290: Authentication Bypass by Spoofing - Validate API responses
 * - CWE-326: Inadequate Encryption Strength - Use HTTPS only
 * 
 * Key Security Principles:
 * 1. Never hardcode API keys in code
 * 2. Never pass API keys in query parameters (exposed in logs, history, referer)
 * 3. Always use HTTP Authorization headers (hidden in headers)
 * 4. Use server-side proxies for external API calls
 * 5. Implement key rotation
 * 6. Monitor API key usage
 */

import { logger } from "./logger";

/**
 * API Key Manager - Securely manages external API keys
 */
export class ApiKeyManager {
  private apiKeys: Map<string, string> = new Map();
  private keyRotationDates: Map<string, Date> = new Map();
  private usageStats: Map<string, { count: number; lastUsed: Date }> =
    new Map();

  constructor() {
    this.loadApiKeys();
  }

  /**
   * Load API keys from environment variables
   * SECURITY: All keys must be in env vars, never hardcoded
   */
  private loadApiKeys(): void {
    const supportedProviders = [
      { env: "GEMINI_API_KEY", name: "gemini" },
      { env: "OPENAI_API_KEY", name: "openai" },
      { env: "ANTHROPIC_API_KEY", name: "anthropic" },
      // Add more providers as needed
    ];

    for (const provider of supportedProviders) {
      const key = process.env[provider.env];
      if (key) {
        this.apiKeys.set(provider.name, key);
        // Initialize rotation date (assume keys were created today)
        this.keyRotationDates.set(provider.name, new Date());
        // Initialize usage stats
        this.usageStats.set(provider.name, { count: 0, lastUsed: new Date() });
      }
    }

    // Log loaded providers (without exposing keys)
    const loadedProviders = Array.from(this.apiKeys.keys());
    if (loadedProviders.length > 0) {
      logger.info(
        { providers: loadedProviders },
        "AI providers loaded successfully"
      );
    } else {
      logger.warn("No AI provider API keys found in environment variables");
    }
  }

  /**
   * Get API key for a provider
   * SECURITY: Return key only if needed, never log it
   */
  getApiKey(provider: string): string | undefined {
    const key = this.apiKeys.get(provider);

    if (key) {
      // Track usage
      const stats = this.usageStats.get(provider) || { count: 0, lastUsed: new Date() };
      stats.count++;
      stats.lastUsed = new Date();
      this.usageStats.set(provider, stats);
    }

    return key;
  }

  /**
   * Check if provider is configured
   */
  isProviderConfigured(provider: string): boolean {
    return this.apiKeys.has(provider);
  }

  /**
   * Build secure request headers for external API
   * SECURITY: Uses Authorization header, not query parameters
   *
   * @param provider Name of the provider
   * @param authType Type of authorization (Bearer, ApiKey, etc.)
   * @returns Object to spread into fetch headers
   */
  getAuthHeaders(
    provider: string,
    authType: "Bearer" | "ApiKey" | "Basic" = "Bearer"
  ): Record<string, string> {
    const key = this.getApiKey(provider);
    if (!key) {
      throw new Error(`API key not configured for provider: ${provider}`);
    }

    return {
      Authorization: `${authType} ${key}`,
    };
  }

  /**
   * Get usage statistics for monitoring
   * Can be used to detect unusual activity
   */
  getUsageStats(provider?: string): Record<string, any> {
    if (provider) {
      const stats = this.usageStats.get(provider);
      return stats ? { [provider]: stats } : {};
    }

    const allStats: Record<string, any> = {};
    for (const [name, stats] of this.usageStats.entries()) {
      allStats[name] = stats;
    }
    return allStats;
  }

  /**
   * Rotate API key for a provider
   * SECURITY: Implement regular key rotation
   *
   * In production, this would:
   * 1. Accept new key from secure source (Secret Manager, Vault, etc.)
   * 2. Validate new key works
   * 3. Update the old key
   * 4. Revoke old key at provider
   */
  rotateKey(provider: string, newKey: string): void {
    if (!newKey || newKey.length === 0) {
      throw new Error("New key cannot be empty");
    }

    this.apiKeys.set(provider, newKey);
    this.keyRotationDates.set(provider, new Date());

    logger.info(
      { provider, rotationTime: new Date().toISOString() },
      "API key rotated"
    );
  }

  /**
   * Validate API key format (provider-specific)
   * Prevents accidental use of wrong key
   */
  validateKeyFormat(provider: string, key: string): boolean {
    const validators: Record<string, (k: string) => boolean> = {
      gemini: (k) => k.length > 20 && /^[a-zA-Z0-9_-]+$/.test(k),
      openai: (k) => k.startsWith("sk-") && k.length > 20,
      anthropic: (k) => k.startsWith("sk-ant-") && k.length > 20,
    };

    const validator = validators[provider];
    return validator ? validator(key) : true; // Allow if no validator
  }

  /**
   * Check if key is approaching rotation date
   * OWASP: Implement key rotation (recommend every 90 days)
   */
  shouldRotateKey(provider: string, rotationIntervalDays: number = 90): boolean {
    const rotationDate = this.keyRotationDates.get(provider);
    if (!rotationDate) return false;

    const daysSinceRotation = Math.floor(
      (Date.now() - rotationDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    return daysSinceRotation >= rotationIntervalDays;
  }
}

// Global API key manager singleton
export const apiKeyManager = new ApiKeyManager();

export default apiKeyManager;
