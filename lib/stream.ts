export const RADIO_STREAM = {
  name: "إذاعة القرآن الكريم من القاهرة",
  nameEn: "Quran Radio Egypt Live",
  streamUrl:
    process.env.NEXT_PUBLIC_RADIO_STREAM_URL ??
    "https://stream.example.com/quran-cairo",
} as const;

export type StreamStatus =
  | "idle"
  | "connecting"
  | "reconnecting"
  | "playing"
  | "error";

export const STREAM_STATUS_LABELS: Record<StreamStatus, string> = {
  idle: "اضغط للتشغيل",
  connecting: "جاري الاتصال",
  reconnecting: "جاري إعادة الاتصال",
  playing: "يعمل الآن",
  error: "تعذر التشغيل",
};

/** Cache-bust so each play/reconnect joins the live edge, not stale buffered audio. */
export function getFreshStreamUrl(baseUrl: string): string {
  const url = new URL(baseUrl);
  url.searchParams.set("_live", Date.now().toString());
  return url.href;
}

export const STREAM_RECONNECT = {
  maxDelayMs: 30_000,
  baseDelayMs: 1_000,
  stallTimeoutMs: 8_000,
  maxAttemptsBeforeError: 12,
} as const;
