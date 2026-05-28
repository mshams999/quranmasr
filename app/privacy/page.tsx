import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "سياسة الخصوصية",
  description:
    "سياسة الخصوصية لموقع إذاعة القرآن الكريم من القاهرة — بث مباشر قرآن كريم.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "الرئيسية", path: "/" },
          { name: "سياسة الخصوصية", path: "/privacy" },
        ])}
      />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="font-amiri text-3xl font-bold text-emerald-50">
          سياسة الخصوصية
        </h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-emerald-100/85 sm:text-base">
          <p>
            نحترم خصوصيتك. لا نجمع بيانات شخصية مثل الاسم أو البريد الإلكتروني
            عند استخدام الموقع أو الاستماع إلى بث إذاعة القرآن الكريم من
            القاهرة.
          </p>
        </div>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-500"
        >
          العودة للرئيسية
        </Link>
      </div>
    </>
  );
}
