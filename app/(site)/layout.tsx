import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";

export default async function SiteLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const dict = await getDictionary("en");

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/5 bg-black/30 backdrop-blur">
        <div className="container flex items-center justify-between py-6">
          <Link href="/" className="font-display text-lg tracking-[0.2em] uppercase">
            Molthub.bot
          </Link>
          <nav className="flex items-center gap-3 text-sm text-muted">
            <Link className="btn-ghost" href="/skills">
              {dict.nav.skills}
            </Link>
            <Link className="btn-ghost" href="/radar">
              {dict.nav.radar}
            </Link>
            <Link className="btn-ghost" href="/install-guides">
              {dict.nav.installGuides}
            </Link>
            <details className="group relative">
              <summary className="btn-ghost cursor-pointer list-none text-xs">
                {dict.nav.language}
              </summary>
              <div className="absolute right-0 mt-2 w-40 rounded-xl border border-border bg-black/80 p-2 text-xs text-muted shadow-glow">
                <Link className="block rounded-lg px-3 py-2 hover:bg-white/10" href="/">
                  {dict.nav.languageOptions.en}
                </Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-white/10" href="/zh">
                  {dict.nav.languageOptions.zh}
                </Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-white/10" href="/ja">
                  {dict.nav.languageOptions.ja}
                </Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-white/10" href="/ko">
                  {dict.nav.languageOptions.ko}
                </Link>
              </div>
            </details>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-white/5 py-10">
        <div className="container flex flex-col gap-3 text-xs text-muted">
          <span>{dict.footer.line1}</span>
          <span>{dict.footer.line2}</span>
        </div>
      </footer>
    </div>
  );
}
