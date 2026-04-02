/**
 * Redis Caching Service
 * Demonstrates: Distributed caching, session management, rate limiting
 * Best Practice: Cache invalidation strategies, TTL management, fallback handling
 */

import { createClient } from "redis";
import { logger } from './logger';

type RedisClientType = ReturnType<typeof createClient>;

let redisClient: RedisClientType | null = null;

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

// ============================================================================
// CACHE KEY PREFIXES
// ============================================================================

const CACHE_KEYS = {
  SESSION: 'session:',
  USER: 'user:',
  CHAT_HISTORY: 'chat:',
  API_RESPONSE: 'response:',
  RATE_LIMIT: 'ratelimit:',
  FEATURE_FLAG: 'feature:',
  MODEL_RESPONSE: 'model:'
} as const;

// ============================================================================
// CONNECTION MANAGEMENT
// ============================================================================

/**
 * Connect to Redis
 */
export async function connectRedis(): Promise<RedisClientType> {
  try {
    if (redisClient && redisClient.isOpen) {
      return redisClient;
    }

    redisClient = createClient({ url: REDIS_URL });

    redisClient.on('error', (err) => {
      logger.error({
        type: 'redis_error',
        error: err.message
      });
    });

    redisClient.on('connect', () => {
      logger.info({ type: 'redis_connected' });
    });

    await redisClient.connect();
    return redisClient;
  } catch (error) {
    throw new Error(
      `Failed to connect to Redis: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Disconnect from Redis
 */
export async function disconnectRedis() {
  try {
    if (redisClient && redisClient.isOpen) {
      await redisClient.quit();
      redisClient = null;
    }
    logger.info({ type: 'redis_disconnected' });
  } catch (error) {
    logger.error({
      type: 'redis_disconnect_error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

/**
 * Get Redis client
 */
export async function getRedis(): Promise<RedisClientType> {
  if (!redisClient || !redisClient.isOpen) {
    return connectRedis();
  }
  return redisClient;
}

// ============================================================================
// CACHE OPERATIONS - GET/SET
// ============================================================================

/**
 * Get value from cache
 */
export async function get<T>(key: string): Promise<T | null> {
  try {
    const redis = await getRedis();
    const value = await redis.get(key);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    } catch {
      return value as unknown as T;
    }
  } catch (error) {
    logger.error({
      type: 'cache_get_error',
      key,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return null;
  }
}

/**
 * Set value in cache with optional TTL
 */
export async function set(key: string, value: unknown, ttlSeconds?: number): Promise<boolean> {
  try {
    const redis = await getRedis();
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);

    if (ttlSeconds) {
      await redis.setEx(key, ttlSeconds, serialized);
    } else {
      await redis.set(key, serialized);
    }

    logger.debug({
      type: 'cache_set',
      key,
      ttl: ttlSeconds
    });

    return true;
  } catch (error) {
    logger.error({
      type: 'cache_set_error',
      key,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return false;
  }
}

/**
 * Delete key from cache
 */
export async function del(key: string | string[]): Promise<number> {
  try {
    const redis = await getRedis();
    const keys = Array.isArray(key) ? key : [key];
    const deleted = await redis.del(keys);

    logger.debug({
      type: 'cache_delete',
      keysDeleted: deleted
    });

    return deleted;
  } catch (error) {
    logger.error({
      type: 'cache_delete_error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return 0;
  }
}

/**
 * Check if key exists
 */
export async function exists(key: string): Promise<boolean> {
  try {
    const redis = await getRedis();
    const exists = await redis.exists(key);
    return exists === 1;
  } catch (error) {
    return false;
  }
}

// ============================================================================
// PATTERN-BASED OPERATIONS
// ============================================================================

/**
 * Invalidate all keys matching pattern (e.g., "user:123:*")
 */
export async function invalidatePattern(pattern: string): Promise<number> {
  try {
    const redis = await getRedis();
    const keys = await redis.keys(pattern);

    if (keys.length === 0) {
      return 0;
    }

    const deleted = await redis.del(keys);

    logger.info({
      type: 'cache_pattern_invalidated',
      pattern,
      keysDeleted: deleted
    });

    return deleted;
  } catch (error) {
    logger.error({
      type: 'cache_pattern_error',
      pattern,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return 0;
  }
}

// ============================================================================
// SESSION CACHING
// ============================================================================

export interface SessionData {
  userId: string;
  email: string;
  sessionToken: string;
  expiresAt: string;
  createdAt: string;
}

/**
 * Cache user session
 */
export async function cacheSession(sessionToken: string, sessionData: SessionData, ttlSeconds: number = 86400): Promise<boolean> {
  const key = `${CACHE_KEYS.SESSION}${sessionToken}`;
  return set(key, sessionData, ttlSeconds);
}

/**
 * Get cached session
 */
export async function getSession(sessionToken: string): Promise<SessionData | null> {
  const key = `${CACHE_KEYS.SESSION}${sessionToken}`;
  return get<SessionData>(key);
}

/**
 * Invalidate session
 */
export async function invalidateSession(sessionToken: string): Promise<void> {
  const key = `${CACHE_KEYS.SESSION}${sessionToken}`;
  await del(key);
}

/**
 * Invalidate all user sessions
 */
export async function invalidateUserSessions(userId: string): Promise<number> {
  return invalidatePattern(`${CACHE_KEYS.SESSION}user:${userId}:*`);
}

// ============================================================================
// RATE LIMITING
// ============================================================================

/**
 * Check rate limit
 * Returns: { remaining: number, resetAt: Date }
 */
export async function checkRateLimit(
  identifier: string,
  maxRequests: number = 100,
  windowSeconds: number = 3600
): Promise<{ allowed: boolean; remaining: number; resetAt: Date }> {
  try {
    const redis = await getRedis();
    const key = `${CACHE_KEYS.RATE_LIMIT}${identifier}`;

    const current = await redis.incr(key);

    if (current === 1) {
      // First request in this window
      await redis.expire(key, windowSeconds);
    }

    const ttl = await redis.ttl(key);
    const remaining = Math.max(0, maxRequests - current);
    const resetAt = new Date(Date.now() + ttl * 1000);

    const allowed = current <= maxRequests;

    if (!allowed) {
      logger.warn({
        type: 'rate_limit_exceeded',
        identifier,
        current,
        maxRequests
      });
    }

    return { allowed, remaining, resetAt };
  } catch (error) {
    logger.error({
      type: 'rate_limit_error',
      identifier,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    // Fail open - allow request if Redis is down
    return { allowed: true, remaining: 0, resetAt: new Date() };
  }
}

// ============================================================================
// CACHE-ASIDE PATTERN
// ============================================================================

/**
 * Get or compute value (cache-aside pattern)
 */
export async function getOrCompute<T>(
  key: string,
  computeFn: () => Promise<T>,
  ttlSeconds?: number
): Promise<T> {
  try {
    // Try to get from cache
    const cached = await get<T>(key);
    if (cached !== null) {
      logger.debug({ type: 'cache_hit', key });
      return cached;
    }

    // Cache miss - compute value
    logger.debug({ type: 'cache_miss', key });
    const value = await computeFn();

    // Store in cache
    await set(key, value, ttlSeconds);

    return value;
  } catch (error) {
    logger.error({
      type: 'cache_aside_error',
      key,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    // If caching fails, just return the computed value
    return computeFn();
  }
}

// ============================================================================
// STATISTICS & MONITORING
// ============================================================================

/**
 * Get Redis statistics
 */
export async function getStats() {
  try {
    const redis = await getRedis();
    const info = await redis.info();
    const keys = await redis.dbSize();

    const statsArray = info.split('\r\n');
    const stats: Record<string, string> = {};
    
    for (const stat of statsArray) {
      if (stat && stat.includes(':')) {
        const [key, value] = stat.split(':');
        stats[key] = value;
      }
    }

    return {
      totalKeys: keys,
      usedMemory: stats['used_memory_human'] || 'unknown',
      usedMemoryPeak: stats['used_memory_peak_human'] || 'unknown',
      connectedClients: stats['connected_clients'] || 'unknown',
      totalOperations: stats['total_commands_processed'] || 'unknown'
    };
  } catch (error) {
    logger.error({
      type: 'cache_stats_error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return {};
  }
}

/**
 * Clear entire cache (use with caution)
 */
export async function flushAll(): Promise<boolean> {
  try {
    const redis = await getRedis();
    await redis.flushAll();

    logger.warn({ type: 'cache_flushed_all' });
    return true;
  } catch (error) {
    logger.error({
      type: 'cache_flush_error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return false;
  }
}

// ============================================================================
// CACHE KEY BUILDERS
// ============================================================================

/** Build session key */
export function sessionKey(userId: string, token: string): string {
  return `${CACHE_KEYS.SESSION}${userId}:${token}`;
}

/** Build user key */
export function userKey(userId: string): string {
  return `${CACHE_KEYS.USER}${userId}`;
}

/** Build chat history key */
export function chatKey(sessionId: string, page: number = 1): string {
  return `${CACHE_KEYS.CHAT_HISTORY}${sessionId}:p${page}`;
}

/** Build rate limit key */
export function rateLimitKey(userId: string, endpoint: string): string {
  return `${CACHE_KEYS.RATE_LIMIT}${userId}:${endpoint}`;
}

// ============================================================================
// EXPORTS
// ============================================================================

export { CACHE_KEYS };
export type { RedisClientType };
