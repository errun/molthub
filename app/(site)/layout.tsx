import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

export default async function SiteLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const dict = await getDictionary("en");

  return (
    <div className="min-h-screen">
      <header className="relative z-50 border-b border-white/5 bg-black/30 backdrop-blur">
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
            <LanguageSwitcher
              label={dict.nav.language}
              options={dict.nav.languageOptions as Record<Locale, string>}
            />
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
