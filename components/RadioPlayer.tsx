"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import {
  RADIO_STREAM,
  STREAM_STATUS_LABELS,
  type StreamStatus,
} from "@/lib/stream";
import { ShareButton } from "./ShareButton";

const HEARTBEAT_MS = 30_000;
const SESSION_KEY = "radio_listener_session";

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

async function listenerApi(
  action: "join" | "heartbeat" | "leave",
  sessionId: string,
) {
  await fetch("/api/listener", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, sessionId }),
    keepalive: action === "leave",
  });
}

export function RadioPlayer() {
  const audioId = useId();
  const audioRef = useRef<HTMLAudioElement>(null);
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sessionRef = useRef<string>("");

  const [status, setStatus] = useState<StreamStatus>("idle");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [muted, setMuted] = useState(false);

  const stopHeartbeat = useCallback(() => {
    if (heartbeatRef.current) {
      clearInterval(heartbeatRef.current);
      heartbeatRef.current = null;
    }
  }, []);

  const startHeartbeat = useCallback(() => {
    stopHeartbeat();
    const sessionId = sessionRef.current || getOrCreateSessionId();
    sessionRef.current = sessionId;

    heartbeatRef.current = setInterval(() => {
      void listenerApi("heartbeat", sessionId);
    }, HEARTBEAT_MS);
  }, [stopHeartbeat]);

  const onPlayStart = useCallback(async () => {
    const sessionId = getOrCreateSessionId();
    sessionRef.current = sessionId;
    trackEvent(AnalyticsEvents.streamPlay, {
      station_name: RADIO_STREAM.name,
    });
    await listenerApi("join", sessionId);
    startHeartbeat();
  }, [startHeartbeat]);

  const onPlayStop = useCallback(
    async (options?: { trackPause?: boolean }) => {
      if (options?.trackPause !== false) {
        trackEvent(AnalyticsEvents.streamPause);
      }
      stopHeartbeat();
      const sessionId = sessionRef.current;
      if (sessionId) {
        await listenerApi("leave", sessionId);
      }
    },
    [stopHeartbeat],
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onWaiting = () => setStatus("connecting");
    const onPlaying = () => {
      setStatus("playing");
      setIsPlaying(true);
    };
    const onPause = () => {
      setIsPlaying(false);
      setStatus((s) => (s === "error" ? "error" : "idle"));
    };
    const onError = () => {
      setStatus("error");
      setIsPlaying(false);
      trackEvent(AnalyticsEvents.streamError);
      void onPlayStop({ trackPause: false });
    };
    const onCanPlay = () => {
      if (!audio.paused) setStatus("playing");
    };

    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);
    audio.addEventListener("canplay", onCanPlay);

    return () => {
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("canplay", onCanPlay);
    };
  }, [onPlayStop]);

  useEffect(() => {
    return () => {
      stopHeartbeat();
      const sessionId = sessionRef.current;
      if (sessionId) void listenerApi("leave", sessionId);
    };
  }, [stopHeartbeat]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;
  }, [volume, muted]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setStatus("idle");
      await onPlayStop();
      return;
    }

    setStatus("connecting");
    try {
      await audio.play();
      await onPlayStart();
    } catch {
      setStatus("error");
      trackEvent(AnalyticsEvents.streamError);
      await onPlayStop({ trackPause: false });
    }
  };

  const toggleMute = () => setMuted((m) => !m);

  const statusLabel = STREAM_STATUS_LABELS[status];
  const showLiveBadge = status === "playing" || status === "connecting";

  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-emerald-700/30 bg-gradient-to-b from-emerald-950/80 to-[#071510] p-6 shadow-xl shadow-black/30 sm:p-8"
      aria-labelledby="player-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(16, 185, 129, 0.25), transparent 60%)",
        }}
      />

      <div className="relative space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1
              id="player-heading"
              className="font-amiri text-2xl font-bold text-emerald-50 sm:text-3xl"
            >
              {RADIO_STREAM.name}
            </h1>
            <p className="mt-1 text-sm text-emerald-300/70">
              Quran Radio Egypt — بث مباشر
            </p>
          </div>
          {showLiveBadge && (
            <span className="inline-flex items-center gap-2 rounded-full bg-red-600/90 px-3 py-1 text-xs font-semibold text-white">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
              مباشر
            </span>
          )}
        </div>

        <audio
          ref={audioRef}
          id={audioId}
          preload="none"
          src={RADIO_STREAM.streamUrl}
          crossOrigin="anonymous"
          className="sr-only"
        >
          <track kind="captions" />
        </audio>

        <div className="flex flex-col items-center gap-4 py-4">
          <button
            type="button"
            onClick={togglePlay}
            className="group flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500 text-[#071510] shadow-lg shadow-emerald-500/30 transition hover:scale-105 hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 active:scale-95 sm:h-28 sm:w-28"
            aria-label={isPlaying ? "إيقاف مؤقت" : "تشغيل البث"}
            aria-pressed={isPlaying}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <p
            className={`text-sm font-medium ${
              status === "error"
                ? "text-red-400"
                : status === "playing"
                  ? "text-emerald-300"
                  : "text-emerald-200/80"
            }`}
            role="status"
            aria-live="polite"
          >
            {statusLabel}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <button
              type="button"
              onClick={toggleMute}
              className="rounded-lg p-2 text-emerald-200 hover:bg-emerald-800/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
              aria-label={muted ? "إلغاء الكتم" : "كتم الصوت"}
              aria-pressed={muted}
            >
              {muted ? <VolumeOffIcon /> : <VolumeOnIcon />}
            </button>
            <label className="sr-only" htmlFor={`${audioId}-volume`}>
              مستوى الصوت
            </label>
            <input
              id={`${audioId}-volume`}
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={(e) => {
                setMuted(false);
                setVolume(Number(e.target.value));
              }}
              className="h-2 w-full max-w-xs flex-1 cursor-pointer accent-emerald-500"
            />
          </div>
          <ShareButton />
        </div>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10 sm:h-12 sm:w-12" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10 sm:h-12 sm:w-12" fill="currentColor" aria-hidden>
      <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
    </svg>
  );
}

function VolumeOnIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M11 5L6 9H3v6h3l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" />
    </svg>
  );
}

function VolumeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M11 5L6 9H3v6h3l5 4V5zM23 9l-6 6M17 9l6 6" />
    </svg>
  );
}
