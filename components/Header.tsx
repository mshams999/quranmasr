"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RADIO_STREAM } from "@/lib/stream";

const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "عن الإذاعة" },
  { href: "/schedule", label: "الجدول" },
  { href: "/contact", label: "تواصل معنا" },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-900/20 bg-[#0c1f17]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3"
          aria-label={RADIO_STREAM.name}
        >
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600/20 text-lg text-emerald-300 ring-1 ring-emerald-500/40"
            aria-hidden
          >
            ☪
          </span>
          <span className="min-w-0">
            <span className="block truncate font-semibold text-emerald-50 text-sm sm:text-base leading-tight">
              {RADIO_STREAM.name}
            </span>
            <span className="hidden text-xs text-emerald-400/80 sm:block">
              بث مباشر
            </span>
          </span>
        </Link>

        <nav
          className="flex items-center gap-1 overflow-x-auto text-sm sm:gap-2"
          aria-label="التنقل الرئيسي"
        >
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`whitespace-nowrap rounded-lg px-2.5 py-2 transition-colors sm:px-3 ${
                  active
                    ? "bg-emerald-600/30 text-emerald-100"
                    : "text-emerald-200/80 hover:bg-emerald-800/30 hover:text-emerald-50"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
