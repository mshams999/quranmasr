import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description:
    "سياسة الخصوصية لموقع إذاعة القرآن الكريم من القاهرة — التحليلات وملفات الجلسة.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-amiri text-3xl font-bold text-emerald-50">
        سياسة الخصوصية
      </h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-emerald-100/85 sm:text-base">
        <p>
          نحترم خصوصيتك. يوضح هذا المستند كيفية جمع البيانات على هذا الموقع.
        </p>
        <h2 className="text-lg font-semibold text-emerald-50">
          بيانات الاستماع
        </h2>
        <p>
          عند تشغيل البث، نُنشئ معرف جلسة عشوائياً في متصفحك (localStorage)
          لحساب عدد المستمعين النشطين وإرسال نبضات كل 30 ثانية. لا نجمع
          الاسم أو البريد الإلكتروني ضمن هذه الآلية.
        </p>
        <h2 className="text-lg font-semibold text-emerald-50">التحليلات</h2>
        <p>
          نستخدم Google Analytics (GA4) لقياس زيارات الموقع وأحداث مثل تشغيل
          البث والمشاركة. قد تُستخدم ملفات تعريف ارتباط وفق سياسة Google. يمكنك
          إدارة التفضيلات عبر إعدادات المتصفح أو أدوات حظر التتبع.
        </p>
        <h2 className="text-lg font-semibold text-emerald-50">
          التعليقات الاجتماعية
        </h2>
        <p>
          التعليقات المعروضة حالياً مختارة يدوياً ولا تُجلب تلقائياً من
          شبكات التواصل إلا في مرحلة لاحقة وبموافقة المنصات.
        </p>
        <h2 className="text-lg font-semibold text-emerald-50">حقوقك</h2>
        <p>
          يمكنك مسح بيانات الجلسة بحذف بيانات الموقع من المتصفح. للاستفسارات،
          راجع صفحة{" "}
          <Link href="/contact" className="text-emerald-300 underline">
            تواصل معنا
          </Link>
          .
        </p>
      </div>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-500"
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}
