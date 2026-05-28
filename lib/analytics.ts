export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";

export function isGoogleAnalyticsEnabled(): boolean {
  return GA_MEASUREMENT_ID.length > 0;
}

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      targetId: string,
      params?: GtagParams,
    ) => void;
  }
}

/** Send a custom GA4 event (no-op when measurement ID is unset). */
export function trackEvent(
  eventName: string,
  params?: GtagParams,
): void {
  if (!isGoogleAnalyticsEnabled() || typeof window === "undefined") return;
  window.gtag?.("event", eventName, params);
}

export const AnalyticsEvents = {
  streamPlay: "stream_play",
  streamPause: "stream_pause",
  streamError: "stream_error",
  share: "share",
} as const;
