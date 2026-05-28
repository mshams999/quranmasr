"use client";

import { useCallback, useEffect, useState } from "react";
import type { MetricsSnapshot } from "@/lib/metrics";

const POLL_MS = 30_000;

function formatArabicTime(iso: string): string {
  try {
    return new Intl.DateTimeFormat("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function formatNumber(n: number): string {
  return new Intl.NumberFormat("ar-EG").format(n);
}

export function MetricsPanel() {
  const [metrics, setMetrics] = useState<MetricsSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = useCallback(async () => {
    try {
      const res = await fetch("/api/metrics", { cache: "no-store" });
      if (!res.ok) throw new Error("metrics failed");
      const data = (await res.json()) as MetricsSnapshot;
      setMetrics(data);
    } catch {
      setMetrics(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMetrics();
    const id = setInterval(fetchMetrics, POLL_MS);
    return () => clearInterval(id);
  }, [fetchMetrics]);

  const items = [
    {
      label: "المستمعون الآن",
      value: metrics ? formatNumber(metrics.activeListeners) : "—",
    },
    {
      label: "إجمالي مرات التشغيل اليوم",
      value: metrics ? formatNumber(metrics.dailyPlays) : "—",
    },
    {
      label: "آخر تحديث",
      value: metrics ? formatArabicTime(metrics.lastUpdated) : "—",
    },
  ];

  return (
    <section
      className="rounded-2xl border border-emerald-800/30 bg-emerald-950/50 p-5 sm:p-6"
      aria-labelledby="metrics-heading"
    >
      <h2
        id="metrics-heading"
        className="mb-4 text-lg font-semibold text-emerald-50"
      >
        إحصائيات البث
      </h2>
      <ul className="grid gap-4 sm:grid-cols-3">
        {items.map(({ label, value }) => (
          <li
            key={label}
            className="rounded-xl bg-[#0a1812]/80 px-4 py-4 ring-1 ring-emerald-800/40"
          >
            <p className="text-xs text-emerald-400/90">{label}</p>
            <p
              className="mt-1 text-2xl font-bold tabular-nums text-emerald-100"
              aria-busy={loading}
            >
              {value}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-emerald-500/60">
        المستمعون النشطون محلياً على الموقع. زيارات الصفحات وتشغيلات البث
        التفصيلية في{" "}
        <a
          href="https://analytics.google.com/"
          className="text-emerald-400 underline hover:text-emerald-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Analytics
        </a>
        .
      </p>
      {metrics?.source === "mock" && (
        <p className="mt-1 text-xs text-emerald-500/50">
          أرقام تجريبية — فعّل Upstash Redis للعدادات الحية.
        </p>
      )}
    </section>
  );
}
