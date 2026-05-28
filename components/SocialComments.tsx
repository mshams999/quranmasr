import {
  getCuratedComments,
  getPlatformLabel,
  type SocialComment,
} from "@/lib/comments";

const PLATFORM_ICONS: Record<SocialComment["platform"], string> = {
  facebook: "f",
  x: "𝕏",
  youtube: "▶",
  manual: "✦",
};

function formatDate(date: string): string {
  try {
    return new Intl.DateTimeFormat("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

export function SocialComments() {
  const comments = getCuratedComments();

  return (
    <section
      className="rounded-2xl border border-emerald-800/30 bg-emerald-950/40 p-5 sm:p-6"
      aria-labelledby="comments-heading"
    >
      <h2
        id="comments-heading"
        className="mb-2 text-lg font-semibold text-emerald-50"
      >
        آراء المستمعين
      </h2>
      <p className="mb-5 text-sm text-emerald-300/70">
        تعليقات مختارة من مجتمع المستمعين — المرحلة الأولى.
      </p>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="rounded-xl border border-emerald-800/25 bg-[#0a1812]/60 p-4"
          >
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <span className="font-medium text-emerald-100">
                {comment.author}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-900/50 px-2.5 py-0.5 text-xs text-emerald-300">
                <span aria-hidden>{PLATFORM_ICONS[comment.platform]}</span>
                {getPlatformLabel(comment.platform)}
              </span>
            </div>
            <p className="leading-relaxed text-emerald-100/90">{comment.text}</p>
            <time
              className="mt-2 block text-xs text-emerald-500/70"
              dateTime={comment.date}
            >
              {formatDate(comment.date)}
            </time>
          </li>
        ))}
      </ul>
    </section>
  );
}
