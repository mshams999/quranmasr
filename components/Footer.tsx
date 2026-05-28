import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-emerald-900/30 bg-[#06100c] py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center text-sm text-emerald-400/80 sm:flex-row sm:justify-between sm:text-start">
        <p>© {new Date().getFullYear()} إذاعة القرآن الكريم من القاهرة</p>
        <nav className="flex flex-wrap justify-center gap-4" aria-label="روابط قانونية">
          <Link href="/privacy" className="hover:text-emerald-200">
            سياسة الخصوصية
          </Link>
          <Link href="/contact" className="hover:text-emerald-200">
            تواصل معنا
          </Link>
        </nav>
      </div>
    </footer>
  );
}
