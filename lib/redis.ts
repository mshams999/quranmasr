import { Redis } from "@upstash/redis";

const LISTENER_PREFIX = "listener:";
const LISTENER_TTL_SECONDS = 90;
const DAILY_PLAYS_PREFIX = "plays:daily:";

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

/** In-memory fallback when Upstash is not configured (local dev). */
const memoryListeners = new Map<string, number>();
const memoryDailyPlays = new Map<string, number>();

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function registerListener(sessionId: string): Promise<void> {
  const redis = getRedis();
  const key = `${LISTENER_PREFIX}${sessionId}`;

  if (redis) {
    await redis.set(key, Date.now(), { ex: LISTENER_TTL_SECONDS });
    return;
  }

  memoryListeners.set(sessionId, Date.now() + LISTENER_TTL_SECONDS * 1000);
}

export async function refreshListener(sessionId: string): Promise<void> {
  await registerListener(sessionId);
}

export async function removeListener(sessionId: string): Promise<void> {
  const redis = getRedis();
  const key = `${LISTENER_PREFIX}${sessionId}`;

  if (redis) {
    await redis.del(key);
    return;
  }

  memoryListeners.delete(sessionId);
}

export async function getActiveListenerCount(): Promise<number> {
  const redis = getRedis();
  const now = Date.now();

  if (redis) {
    const keys = await redis.keys(`${LISTENER_PREFIX}*`);
    return keys.length;
  }

  for (const [id, expires] of memoryListeners) {
    if (expires < now) memoryListeners.delete(id);
  }
  return memoryListeners.size;
}

export async function incrementDailyPlays(): Promise<number> {
  const redis = getRedis();
  const day = todayKey();
  const key = `${DAILY_PLAYS_PREFIX}${day}`;

  if (redis) {
    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, 60 * 60 * 48);
    }
    return count;
  }

  const current = memoryDailyPlays.get(day) ?? 0;
  const next = current + 1;
  memoryDailyPlays.set(day, next);
  return next;
}

export async function getDailyPlays(): Promise<number> {
  const redis = getRedis();
  const day = todayKey();
  const key = `${DAILY_PLAYS_PREFIX}${day}`;

  if (redis) {
    const count = await redis.get<number>(key);
    return count ?? 0;
  }

  return memoryDailyPlays.get(day) ?? 0;
}

export function isRedisConfigured(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
  );
}
