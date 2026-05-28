export const RADIO_STREAM = {
  name: "إذاعة القرآن الكريم من القاهرة",
  nameEn: "Quran Radio Egypt Live",
  streamUrl:
    process.env.NEXT_PUBLIC_RADIO_STREAM_URL ??
    "https://stream.example.com/quran-cairo",
} as const;

export type StreamStatus = "idle" | "connecting" | "playing" | "error";

export const STREAM_STATUS_LABELS: Record<StreamStatus, string> = {
  idle: "اضغط للتشغيل",
  connecting: "جاري الاتصال",
  playing: "يعمل الآن",
  error: "تعذر التشغيل",
};
