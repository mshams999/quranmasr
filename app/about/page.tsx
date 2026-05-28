import type { Metadata } from "next";
import Link from "next/link";
import { RADIO_STREAM } from "@/lib/stream";

export const metadata: Metadata = {
  title: "عن الإذاعة",
  description:
    "تعرف على إذاعة القرآن الكريم من القاهرة — رسالتنا وبثنا المباشر للقرآن الكريم.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-amiri text-3xl font-bold text-emerald-50">
        عن الإذاعة
      </h1>
      <div className="mt-6 space-y-4 text-emerald-100/90 leading-relaxed">
        <p>
          {RADIO_STREAM.name} منصة استماع مخصصة لبث تلاوات القرآن الكريم
          مباشرة من القاهرة. هدفنا تقديم تجربة استماع بسيطة، سريعة، ومتوافقة
          مع الهواتف والأجهزة اللوحية، مع احترام خصوصية المستمعين.
        </p>
        <p>
          هذا المشروع واجهة حديثة للاستماع إلى البث — وليس بديلاً رسمياً عن
          الإذاعة ما لم يتم التعاون والترخيص مع الجهة المالكة. قبل الإطلاق
          العام، يُرجى التحقق من مصدر البث النهائي وحقوق الاستخدام.
        </p>
        <p>
          نعمل على إضافة جدول البرامج، وإحصائيات أعمق للمستمعين، وتعليقات
          مجتمعية معتمدة في المراحل القادمة.
        </p>
      </div>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-500"
      >
        العودة للبث المباشر
      </Link>
    </div>
  );
}
