"use client";

import { useCallback, useState } from "react";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";
import { RADIO_STREAM } from "@/lib/stream";

type ShareButtonProps = {
  className?: string;
};

export function ShareButton({ className = "" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const share = useCallback(async () => {
    const url =
      typeof window !== "undefined" ? window.location.href : "";
    const shareData = {
      title: RADIO_STREAM.name,
      text: "استمع إلى بث مباشر لإذاعة القرآن الكريم من القاهرة",
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        trackEvent(AnalyticsEvents.share, { method: "native" });
        return;
      } catch {
        /* user cancelled or unsupported */
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      trackEvent(AnalyticsEvents.share, { method: "clipboard" });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, []);

  return (
    <button
      type="button"
      onClick={share}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-600/40 bg-emerald-900/30 px-4 py-2.5 text-sm font-medium text-emerald-100 transition hover:bg-emerald-800/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ${className}`}
      aria-label="مشاركة البث"
    >
      <ShareIcon />
      {copied ? "تم النسخ" : "مشاركة"}
    </button>
  );
}

function ShareIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4-4 4M12 2v14" />
    </svg>
  );
}
