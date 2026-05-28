import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "جدول البرامج",
  description:
    "جدول برامج إذاعة القرآن الكريم من القاهرة — بث قرآن كريم مباشر على مدار الساعة من مصر.",
  path: "/schedule",
  keywords: ["جدول إذاعة القرآن", "Quran radio Cairo schedule"],
});

export default function SchedulePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "الرئيسية", path: "/" },
          { name: "جدول البرامج", path: "/schedule" },
        ])}
      />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="font-amiri text-3xl font-bold text-emerald-50">
          جدول برامج إذاعة القرآن الكريم
        </h1>
        <p className="mt-6 text-emerald-100/80 leading-relaxed">
          جدول البرامج اليومي سيُضاف قريباً. حالياً البث متواصل على مدار
          الساعة بتلاوات قرآنية متنوعة من القاهرة. للاستماع الفوري، ارجع إلى{" "}
          <Link href="/" className="text-emerald-300 underline hover:text-emerald-200">
            البث المباشر
          </Link>
          .
        </p>
        <div className="mt-8 rounded-2xl border border-dashed border-emerald-700/40 bg-emerald-950/30 p-8 text-center text-emerald-400/80">
          قريباً
        </div>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-500"
        >
          استمع الآن
        </Link>
      </div>
    </>
  );
}
