import Link from "next/link";
import { notFound } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export const dynamicParams = false;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const prefix = `/${locale}`;

  return (
    <div className="min-h-screen">
      <header className="relative z-50 border-b border-white/5 bg-black/30 backdrop-blur">
        <div className="container flex items-center justify-between py-6">
          <Link href={prefix} className="font-display text-lg tracking-[0.2em] uppercase">
            Molthub.bot
          </Link>
          <nav className="flex items-center gap-3 text-sm text-muted">
            <Link className="btn-ghost" href={`${prefix}/skills`}>
              {dict.nav.skills}
            </Link>
            <Link className="btn-ghost" href={`${prefix}/radar`}>
              {dict.nav.radar}
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
