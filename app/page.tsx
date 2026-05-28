import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { RadioPlayer } from "@/components/RadioPlayer";
import {
  createPageMetadata,
  DEFAULT_DESCRIPTION,
  FAQ_ITEMS,
  homePageJsonLdGraph,
} from "@/lib/seo";
import { RADIO_STREAM } from "@/lib/stream";

export const metadata = createPageMetadata({
  title: "إذاعة القرآن الكريم من القاهرة بث مباشر | Quran Radio Egypt",
  description: DEFAULT_DESCRIPTION,
  path: "/",
  keywords: [
    "راديو قرآن القاهرة",
    "بث قرآن مباشر مصر",
    "quran masr radio live",
  ],
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={homePageJsonLdGraph()} />
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-10 sm:py-16">
        <RadioPlayer />

        <div className="mt-10 w-full space-y-8">
          <SeoIntro />
          <WhyListen />
          <FaqSection />
        </div>
      </div>
    </>
  );
}

function SeoIntro() {
  return (
    <article className="rounded-2xl border border-emerald-800/20 bg-emerald-950/30 p-5 text-center text-emerald-100/90 sm:p-6">
      <h2 className="font-amiri text-xl font-bold text-emerald-50">
        بث مباشر لإذاعة القرآن الكريم من القاهرة
      </h2>
      <p className="mt-3 text-sm leading-relaxed sm:text-base">
        {RADIO_STREAM.name} تقدّم بثاً مباشراً لتلاوات القرآن الكريم على مدار
        الساعة من العاصمة المصرية. استمع أينما كنت إلى{" "}
        <strong className="font-normal text-emerald-200">
          بث مباشر قرآن كريم
        </strong>{" "}
        بجودة عالية عبر متصفحك أو هاتفك —{" "}
        <strong className="font-normal text-emerald-200">
          Quran Kareem Radio Cairo
        </strong>{" "}
        و{" "}
        <strong className="font-normal text-emerald-200">
          Quran Radio Egypt live
        </strong>
        .
      </p>
      <p className="mt-3 text-sm leading-relaxed text-emerald-300/80">
        موقع بسيط وسريع للاستماع إلى راديو القرآن الكريم من مصر دون تطبيق أو
        تسجيل. اضغط تشغيل وابدأ الاستماع فوراً.
      </p>
    </article>
  );
}

function WhyListen() {
  const points = [
    "بث قرآن كريم مباشر على مدار 24 ساعة من القاهرة.",
    "يعمل على الهاتف والكمبيوتر والتابلت.",
    "واجهة عربية بسيطة — بدون إعلانات معقدة أو تسجيل.",
    "مناسب للاستماع أثناء العمل أو القيادة أو الراحة.",
  ];

  return (
    <section
      className="rounded-2xl border border-emerald-800/20 bg-emerald-950/20 p-5 sm:p-6"
      aria-labelledby="why-listen-heading"
    >
      <h2
        id="why-listen-heading"
        className="font-amiri text-xl font-bold text-emerald-50"
      >
        لماذا تستمع عبر موقعنا؟
      </h2>
      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-emerald-100/85 sm:text-base">
        {points.map((point) => (
          <li key={point} className="flex gap-2">
            <span className="text-emerald-400" aria-hidden>
              ✦
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-emerald-300/70">
        تعرّف أكثر على{" "}
        <Link href="/about" className="text-emerald-300 underline hover:text-emerald-200">
          إذاعة القرآن الكريم من القاهرة
        </Link>{" "}
        أو راجع{" "}
        <Link href="/schedule" className="text-emerald-300 underline hover:text-emerald-200">
          جدول البرامج
        </Link>
        .
      </p>
    </section>
  );
}

function FaqSection() {
  return (
    <section
      className="rounded-2xl border border-emerald-800/20 bg-emerald-950/20 p-5 sm:p-6"
      aria-labelledby="faq-heading"
    >
      <h2 id="faq-heading" className="font-amiri text-xl font-bold text-emerald-50">
        أسئلة شائعة
      </h2>
      <dl className="mt-4 space-y-5">
        {FAQ_ITEMS.map(({ question, answer }) => (
          <div key={question}>
            <dt className="font-medium text-emerald-100">{question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-emerald-100/80 sm:text-base">
              {answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
