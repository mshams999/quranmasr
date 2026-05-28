"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  RADIO_STREAM,
  STREAM_STATUS_LABELS,
  type StreamStatus,
} from "@/lib/stream";
import { ShareButton } from "./ShareButton";

export function RadioPlayer() {
  const audioId = useId();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [status, setStatus] = useState<StreamStatus>("idle");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [muted, setMuted] = useState(false);

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
  }, []);

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
      return;
    }

    setStatus("connecting");
    try {
      await audio.play();
    } catch {
      setStatus("error");
    }
  };

  const toggleMute = () => setMuted((m) => !m);

  const statusLabel = STREAM_STATUS_LABELS[status];
  const showLiveBadge = status === "playing" || status === "connecting";

  return (
    <section
      className="relative w-full overflow-hidden rounded-[2rem] border border-emerald-700/25 bg-gradient-to-b from-emerald-950/90 to-[#071510] shadow-2xl shadow-black/40"
      aria-labelledby="player-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(16, 185, 129, 0.22), transparent 55%)",
        }}
      />

      <div className="relative flex flex-col items-center px-6 py-10 text-center sm:px-10 sm:py-12">
        <div className="space-y-3">
          <h1
            id="player-heading"
            className="font-amiri text-3xl font-bold leading-tight text-emerald-50 sm:text-4xl"
          >
            {RADIO_STREAM.name}
          </h1>
          <p className="text-sm text-emerald-300/70 sm:text-base">
            Quran Radio Egypt — بث مباشر
          </p>
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

        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={togglePlay}
            className={`flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500 text-[#071510] shadow-lg shadow-emerald-500/25 transition hover:scale-[1.03] hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 active:scale-95 sm:h-28 sm:w-28 ${
              isPlaying ? "ring-4 ring-emerald-400/20" : ""
            }`}
            aria-label={isPlaying ? "إيقاف مؤقت" : "تشغيل البث"}
            aria-pressed={isPlaying}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <p
            className={`min-h-[1.5rem] text-sm font-medium ${
              status === "error"
                ? "text-red-400"
                : status === "playing"
                  ? "text-emerald-300"
                  : "text-emerald-200/75"
            }`}
            role="status"
            aria-live="polite"
          >
            {statusLabel}
          </p>
        </div>

        <div className="mt-10 flex w-full max-w-xs flex-col items-center gap-4">
          <div className="flex w-full items-center gap-3">
            <button
              type="button"
              onClick={toggleMute}
              className="shrink-0 rounded-lg p-2 text-emerald-200 hover:bg-emerald-800/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
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
              className="h-1.5 w-full cursor-pointer accent-emerald-500"
            />
          </div>
          <ShareButton className="w-full" />
        </div>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-11 w-11 sm:h-12 sm:w-12" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-11 w-11 sm:h-12 sm:w-12" fill="currentColor" aria-hidden>
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
