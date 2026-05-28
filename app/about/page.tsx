import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { RADIO_STREAM } from "@/lib/stream";

export const metadata: Metadata = createPageMetadata({
  title: "عن الإذاعة",
  description:
    "تعرف على إذاعة القرآن الكريم من القاهرة — بث مباشر لتلاوات القرآن الكريم من مصر على مدار الساعة. Quran Radio Egypt from Cairo.",
  path: "/about",
  keywords: ["عن إذاعة القرآن", "Quran radio Cairo about"],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "الرئيسية", path: "/" },
          { name: "عن الإذاعة", path: "/about" },
        ])}
      />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="font-amiri text-3xl font-bold text-emerald-50">
          عن إذاعة القرآن الكريم من القاهرة
        </h1>
        <div className="mt-6 space-y-4 text-emerald-100/90 leading-relaxed">
          <p>
            {RADIO_STREAM.name} محطة راديو مصرية مخصصة لبث تلاوات القرآن الكريم
            على مدار الساعة. يوفّر هذا الموقع واجهة عربية بسيطة للاستماع إلى
            البث المباشر من القاهرة عبر الإنترنت — على الهاتف أو الكمبيوتر.
          </p>
          <p>
            هدفنا تقديم تجربة استماع سريعة وواضحة لمن يبحث عن{" "}
            <strong className="font-normal text-emerald-200">
              بث مباشر قرآن كريم
            </strong>{" "}
            من مصر، مع احترام خصوصية المستمعين ودون الحاجة إلى تسجيل حساب.
          </p>
          <p>
            يمكنك الاستماع الآن من{" "}
            <Link href="/" className="text-emerald-300 underline hover:text-emerald-200">
              الصفحة الرئيسية
            </Link>{" "}
            أو متابعة{" "}
            <Link href="/schedule" className="text-emerald-300 underline hover:text-emerald-200">
              جدول البرامج
            </Link>{" "}
            عند توفره.
          </p>
        </div>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-500"
        >
          العودة للبث المباشر
        </Link>
      </div>
    </>
  );
}
