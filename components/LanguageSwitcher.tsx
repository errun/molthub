"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultLocale, locales, type Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  label: string;
  options: Record<Locale, string>;
};

const stripLocalePrefix = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && locales.includes(segments[0] as Locale)) {
    segments.shift();
  }
  return segments.length ? `/${segments.join("/")}` : "/";
};

const buildHref = (locale: Locale, pathname: string) => {
  const basePath = stripLocalePrefix(pathname);
  if (locale === defaultLocale) {
    return basePath;
  }
  return basePath === "/" ? `/${locale}` : `/${locale}${basePath}`;
};

export default function LanguageSwitcher({ label, options }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? "/";

  return (
    <details className="group relative">
      <summary className="btn-ghost cursor-pointer list-none text-xs">
        {label}
      </summary>
      <div className="absolute right-0 mt-2 w-40 rounded-xl border border-border bg-black/80 p-2 text-xs text-muted shadow-glow">
        {locales.map((locale) => (
          <Link
            key={locale}
            className="block rounded-lg px-3 py-2 hover:bg-white/10"
            href={buildHref(locale, pathname)}
          >
            {options[locale]}
          </Link>
        ))}
      </div>
    </details>
  );
}
