import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "جدول البرامج",
  description: "جدول برامج إذاعة القرآن الكريم من القاهرة — قريباً.",
};

export default function SchedulePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-amiri text-3xl font-bold text-emerald-50">
        جدول البرامج
      </h1>
      <p className="mt-6 text-emerald-100/80 leading-relaxed">
        جدول البرامج اليومي سيُضاف قريباً. حالياً البث متواصل على مدار
        الساعة بتلاوات قرآنية متنوعة.
      </p>
      <div className="mt-8 rounded-2xl border border-dashed border-emerald-700/40 bg-emerald-950/30 p-8 text-center text-emerald-400/80">
        قريباً — تابعنا عبر صفحة{" "}
        <Link href="/contact" className="text-emerald-300 underline">
          تواصل معنا
        </Link>
      </div>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-500"
      >
        استمع الآن
      </Link>
    </div>
  );
}
