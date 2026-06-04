"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  RADIO_STREAM,
  STREAM_RECONNECT,
  getFreshStreamUrl,
  type StreamStatus,
} from "@/lib/stream";

function reconnectDelayMs(attempt: number): number {
  return Math.min(
    STREAM_RECONNECT.baseDelayMs * 2 ** attempt,
    STREAM_RECONNECT.maxDelayMs,
  );
}

export function useLiveRadio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const wantsToPlayRef = useRef(false);
  const reconnectAttemptRef = useRef(0);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stallTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [status, setStatus] = useState<StreamStatus>("idle");
  const [volume, setVolume] = useState(0.85);
  const [muted, setMuted] = useState(false);

  const clearReconnectTimer = useCallback(() => {
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
  }, []);

  const clearStallTimer = useCallback(() => {
    if (stallTimerRef.current) {
      clearTimeout(stallTimerRef.current);
      stallTimerRef.current = null;
    }
  }, []);

  const attachFreshStream = useCallback((audio: HTMLAudioElement) => {
    audio.src = getFreshStreamUrl(RADIO_STREAM.streamUrl);
    audio.load();
  }, []);

  const scheduleReconnectRef = useRef<(immediate?: boolean) => void>(() => {});

  const scheduleReconnect = useCallback(
    (immediate = false) => {
      if (!wantsToPlayRef.current) return;

      clearReconnectTimer();
      clearStallTimer();

      const attempt = reconnectAttemptRef.current;
      if (attempt >= STREAM_RECONNECT.maxAttemptsBeforeError) {
        wantsToPlayRef.current = false;
        setStatus("error");
        return;
      }

      setStatus(attempt === 0 && !immediate ? "connecting" : "reconnecting");

      const delay = immediate ? 0 : reconnectDelayMs(attempt);
      reconnectAttemptRef.current += 1;

      reconnectTimerRef.current = setTimeout(() => {
        const audio = audioRef.current;
        if (!audio || !wantsToPlayRef.current) return;

        attachFreshStream(audio);
        audio
          .play()
          .then(() => {
            reconnectAttemptRef.current = 0;
          })
          .catch(() => {
            scheduleReconnectRef.current();
          });
      }, delay);
    },
    [attachFreshStream, clearReconnectTimer, clearStallTimer],
  );

  useEffect(() => {
    scheduleReconnectRef.current = scheduleReconnect;
  }, [scheduleReconnect]);

  const startStallWatch = useCallback(() => {
    clearStallTimer();
    stallTimerRef.current = setTimeout(() => {
      if (wantsToPlayRef.current) {
        scheduleReconnect(true);
      }
    }, STREAM_RECONNECT.stallTimeoutMs);
  }, [clearStallTimer, scheduleReconnect]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    wantsToPlayRef.current = true;
    reconnectAttemptRef.current = 0;
    clearReconnectTimer();
    clearStallTimer();
    setStatus("connecting");

    attachFreshStream(audio);

    try {
      await audio.play();
      reconnectAttemptRef.current = 0;
    } catch {
      scheduleReconnect(true);
    }
  }, [
    attachFreshStream,
    clearReconnectTimer,
    clearStallTimer,
    scheduleReconnect,
  ]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    wantsToPlayRef.current = false;
    reconnectAttemptRef.current = 0;
    clearReconnectTimer();
    clearStallTimer();
    audio.pause();
    setStatus("idle");
  }, [clearReconnectTimer, clearStallTimer]);

  const togglePlay = useCallback(() => {
    if (wantsToPlayRef.current) {
      pause();
    } else {
      void play();
    }
  }, [pause, play]);

  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onWaiting = () => {
      if (!wantsToPlayRef.current) return;
      setStatus((s) => (s === "playing" ? "reconnecting" : s));
      startStallWatch();
    };

    const onPlaying = () => {
      clearStallTimer();
      reconnectAttemptRef.current = 0;
      setStatus("playing");
    };

    const onPause = () => {
      clearStallTimer();
      if (!wantsToPlayRef.current) {
        setStatus((s) => (s === "error" ? "error" : "idle"));
      }
    };

    const onError = () => {
      clearStallTimer();
      if (wantsToPlayRef.current) {
        scheduleReconnect(true);
        return;
      }
      setStatus("error");
    };

    const onStalled = () => {
      if (wantsToPlayRef.current) {
        scheduleReconnect(true);
      }
    };

    const onCanPlay = () => {
      if (wantsToPlayRef.current && !audio.paused) {
        setStatus("playing");
      }
    };

    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);
    audio.addEventListener("stalled", onStalled);
    audio.addEventListener("canplay", onCanPlay);

    return () => {
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("stalled", onStalled);
      audio.removeEventListener("canplay", onCanPlay);
    };
  }, [clearStallTimer, scheduleReconnect, startStallWatch]);

  useEffect(() => {
    const onOnline = () => {
      if (!wantsToPlayRef.current) return;
      const audio = audioRef.current;
      if (!audio) return;

      if (audio.paused || audio.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
        reconnectAttemptRef.current = 0;
        scheduleReconnect(true);
      }
    };

    const onOffline = () => {
      if (wantsToPlayRef.current) {
        setStatus("reconnecting");
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState !== "visible" || !wantsToPlayRef.current) {
        return;
      }

      const audio = audioRef.current;
      if (!audio) return;

      if (audio.paused || audio.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
        reconnectAttemptRef.current = 0;
        scheduleReconnect(true);
      }
    };

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [scheduleReconnect]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;
  }, [volume, muted]);

  useEffect(
    () => () => {
      clearReconnectTimer();
      clearStallTimer();
    },
    [clearReconnectTimer, clearStallTimer],
  );

  const isActive =
    status === "playing" ||
    status === "connecting" ||
    status === "reconnecting";

  return {
    audioRef,
    status,
    isActive,
    volume,
    setVolume,
    muted,
    setMuted,
    toggleMute,
    togglePlay,
  };
}
