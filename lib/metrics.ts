import {
  getActiveListenerCount,
  getDailyPlays,
  isRedisConfigured,
} from "./redis";

export type MetricsSnapshot = {
  activeListeners: number;
  dailyPlays: number;
  lastUpdated: string;
  source: "live" | "mock";
};

export async function getMetrics(): Promise<MetricsSnapshot> {
  const now = new Date().toISOString();

  if (!isRedisConfigured()) {
    return getMockMetrics(now);
  }

  const [activeListeners, dailyPlays] = await Promise.all([
    getActiveListenerCount(),
    getDailyPlays(),
  ]);

  return {
    activeListeners: Math.max(activeListeners, 0),
    dailyPlays,
    lastUpdated: now,
    source: "live",
  };
}

function getMockMetrics(now: string): MetricsSnapshot {
  const hour = new Date().getHours();
  const baseListeners = 120 + (hour % 8) * 15;
  const variance = Math.floor(Math.sin(Date.now() / 60000) * 12);

  return {
    activeListeners: baseListeners + variance,
    dailyPlays: 2400 + hour * 180 + Math.floor(variance * 3),
    lastUpdated: now,
    source: "mock",
  };
}
