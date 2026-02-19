// src/lib/rate-limit.ts
// In-memory per-IP rate limiting using lru-cache sliding window
// NOTE: Cache resets on cold start — acceptable for v1 with organic traffic
import { LRUCache } from 'lru-cache';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// Separate caches for chat (tight) and search (relaxed)
const chatCache = new LRUCache<string, RateLimitEntry>({
  max: 500,       // Track at most 500 unique IPs
  ttl: 60_000,   // 1 minute window
});

const searchCache = new LRUCache<string, RateLimitEntry>({
  max: 500,
  ttl: 60_000,
});

const CHAT_LIMIT = 10;   // 10 req/min per IP — protect the wallet on Claude calls
const SEARCH_LIMIT = 30; // 30 req/min per IP — search is cheaper (just OpenAI + Qdrant)

function checkLimit(
  cache: LRUCache<string, RateLimitEntry>,
  key: string,
  limit: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = cache.get(key);

  if (!entry || now > entry.resetAt) {
    // First request or window expired — start fresh
    cache.set(key, { count: 1, resetAt: now + 60_000 });
    return { allowed: true, remaining: limit - 1, resetAt: now + 60_000 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  cache.set(key, entry);
  return { allowed: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}

export function checkChatRateLimit(ip: string) {
  return checkLimit(chatCache, ip, CHAT_LIMIT);
}

export function checkSearchRateLimit(ip: string) {
  return checkLimit(searchCache, ip, SEARCH_LIMIT);
}

/**
 * Extract client IP from request headers.
 * x-forwarded-for may contain a comma-separated list — use the first value.
 * Falls back to '127.0.0.1' for local development.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';
}
