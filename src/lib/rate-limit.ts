// src/lib/rate-limit.ts
// Best-effort fixed windows per server instance. These are not global spending limits.
// Counts reset on cold starts and are not shared between instances.
import { LRUCache } from 'lru-cache';
import { isIP } from 'node:net';

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

const commentaryCache = new LRUCache<string, RateLimitEntry>({
  max: 500,
  ttl: 60_000,
});

const subscribeCache = new LRUCache<string, RateLimitEntry>({ max: 500, ttl: 60_000 });

const CHAT_LIMIT = 10;       // 10 req/min per IP — protect the wallet on Claude calls
const SEARCH_LIMIT = 30;     // 30 req/min per IP — search is cheaper (just OpenAI + Qdrant)
const COMMENTARY_LIMIT = 30; // 30 req/min per IP — same cost profile as search (OpenAI + Qdrant)

function checkLimit(
  cache: LRUCache<string, RateLimitEntry>,
  key: string,
  limit: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = cache.get(key);

  if (!entry || now >= entry.resetAt) {
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

export function checkCommentaryRateLimit(ip: string) {
  return checkLimit(commentaryCache, ip, COMMENTARY_LIMIT);
}

export function checkSubscribeRateLimit(ip: string) {
  return checkLimit(subscribeCache, ip, 5);
}

// Only trust the deployment platform's client address, never caller-supplied proxies.
export function getClientIp(request: Request): string {
  const ip = process.env.VERCEL === '1'
    ? request.headers.get('x-vercel-forwarded-for')?.trim()
    : undefined;
  return ip && isIP(ip) ? ip : 'unknown';
}
