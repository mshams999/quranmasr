import { RadioPlayer } from "@/components/RadioPlayer";
import { MetricsPanel } from "@/components/MetricsPanel";
import { SocialComments } from "@/components/SocialComments";
import { RADIO_STREAM } from "@/lib/stream";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <div className="space-y-8">
          <RadioPlayer />
          <SeoIntro />
        </div>
        <MetricsPanel />
      </div>

      <div className="mt-10">
        <SocialComments />
      </div>
    </div>
  );
}

function SeoIntro() {
  return (
    <article className="prose prose-invert max-w-none rounded-2xl border border-emerald-800/20 bg-emerald-950/30 p-5 text-emerald-100/90 sm:p-6">
      <h2 className="font-amiri text-xl font-bold text-emerald-50">
        عن البث المباشر
      </h2>
      <p className="mt-3 text-sm leading-relaxed sm:text-base">
        {RADIO_STREAM.name} تقدّم بثاً مباشراً لتلاوات القرآن الكريم على مدار
        الساعة من العاصمة المصرية. استمع أينما كنت إلى صوت القرآن بجودة عالية
        عبر متصفحك أو هاتفك أو جهازك اللوحي —{" "}
        <strong className="font-normal text-emerald-200">
          بث مباشر قرآن كريم
        </strong>{" "}
        و{" "}
        <strong className="font-normal text-emerald-200">
          Quran Kareem Radio Cairo
        </strong>
        .
      </p>
      <p className="mt-3 text-sm leading-relaxed text-emerald-300/70">
        تأكد من صحة رابط البث وحقوق النشر قبل النشر العام. يمكن ضبط عنوان
        البث عبر متغير البيئة{" "}
        <code className="rounded bg-emerald-900/50 px-1 text-xs">
          NEXT_PUBLIC_RADIO_STREAM_URL
        </code>
        .
      </p>
    </article>
  );
}
