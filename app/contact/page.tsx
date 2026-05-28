import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "تواصل مع فريق إذاعة القرآن الكريم من القاهرة.",
};

const SOCIAL_LINKS = [
  { label: "فيسبوك", href: "#", note: "أضف رابط الصفحة الرسمية" },
  { label: "يوتيوب", href: "#", note: "أضف رابط القناة الرسمية" },
  { label: "إكس (X)", href: "#", note: "أضف الحساب الرسمي" },
] as const;

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-amiri text-3xl font-bold text-emerald-50">
        تواصل معنا
      </h1>
      <p className="mt-6 text-emerald-100/80 leading-relaxed">
        للاستفسارات والاقتراحات والتعاون الإعلامي، يمكنكم التواصل عبر
        القنوات التالية. حدّث الروابط قبل الإطلاق.
      </p>

      <ul className="mt-8 space-y-4">
        {SOCIAL_LINKS.map(({ label, href, note }) => (
          <li
            key={label}
            className="flex flex-col gap-1 rounded-xl border border-emerald-800/30 bg-emerald-950/40 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="font-medium text-emerald-100">{label}</span>
            <span className="text-sm text-emerald-400/70">{note}</span>
            <a
              href={href}
              className="text-sm text-emerald-300 hover:underline"
              rel="noopener noreferrer"
            >
              الرابط
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-emerald-400/70">
        البريد الإلكتروني: أضف{" "}
        <code className="rounded bg-emerald-900/40 px-1">CONTACT_EMAIL</code> في
        متغيرات البيئة عند الحاجة.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-500"
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}
