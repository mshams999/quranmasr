"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useState } from "react";
import { RADIO_STREAM } from "@/lib/stream";

const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "عن الإذاعة" },
  { href: "/schedule", label: "الجدول" },
] as const;

export function Header() {
  const pathname = usePathname();
  const menuId = useId();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen, closeMenu]);

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
          className="hidden items-center gap-1 text-sm md:flex md:gap-2"
          aria-label="التنقل الرئيسي"
        >
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`whitespace-nowrap rounded-lg px-3 py-2 transition-colors ${
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

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-emerald-100 hover:bg-emerald-800/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 md:hidden"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {menuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 top-[57px] z-40 bg-black/50 md:hidden"
            aria-label="إغلاق القائمة"
            onClick={closeMenu}
          />
          <nav
            id={menuId}
            className="absolute inset-x-0 top-full z-50 border-b border-emerald-900/30 bg-[#0c1f17] px-4 py-3 shadow-xl shadow-black/30 md:hidden"
            aria-label="التنقل للجوال"
          >
            <ul className="space-y-1">
              {NAV_LINKS.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`block rounded-xl px-4 py-3 text-base transition-colors ${
                        active
                          ? "bg-emerald-600/30 font-medium text-emerald-50"
                          : "text-emerald-100/90 hover:bg-emerald-800/30 hover:text-emerald-50"
                      }`}
                      onClick={closeMenu}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
