import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { getDictionary } from "@/lib/dictionaries";
import { getBaseUrl } from "@/lib/site-url";
import { isLocale, type Locale } from "@/lib/i18n";

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!isLocale(params.locale)) {
    return {};
  }

  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  return {
    title: dict.home.metaTitle,
    description: dict.home.metaDescription,
    alternates: {
      canonical: `/${locale}`
    },
    openGraph: {
      title: dict.home.metaTitle,
      description: dict.home.metaDescription,
      type: "website",
      url: `/${locale}`,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Molthub.bot - Moltbot reliability signals"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: dict.home.metaTitle,
      description: dict.home.metaDescription,
      images: ["/twitter-image"]
    },
    keywords: dict.home.keywords
  };
}

export default async function LocaleHomePage({ params }: PageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const baseUrl = getBaseUrl();
  const prefix = `/${locale}`;

  return (
    <section className="container py-16 md:py-24">
      <JsonLd
        id={`ld-home-${locale}`}
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: dict.home.title,
          url: `${baseUrl}${prefix}`,
          description: dict.home.metaDescription,
          isPartOf: {
            "@type": "WebSite",
            name: "Molthub.bot",
            url: baseUrl
          },
          inLanguage: locale
        }}
      />
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="tag">{dict.home.heroTag}</span>
            <h1 className="font-display text-5xl leading-[1.05] tracking-tight md:text-7xl">
              {dict.home.title}
            </h1>
            <p className="text-lg text-muted md:text-xl">{dict.home.subtitle}</p>
            <p className="text-xl font-semibold md:text-2xl">{dict.home.slogan}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="btn-strong" href={`${prefix}/skills`}>
              {dict.home.ctaSkills}
            </Link>
            <Link className="btn" href={`${prefix}/radar`}>
              {dict.home.ctaRadar}
            </Link>
            <Link className="btn-ghost" href={`${prefix}/about`}>
              {dict.home.ctaAbout}
            </Link>
          </div>
          <Link
            href={`${prefix}/rename`}
            className="text-xs text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            {dict.home.renameLink}
          </Link>
        </div>
        <div className="card p-8 shadow-glow">
          <div className="flex items-center justify-between">
            <span className="tag">{dict.home.snapshotTag}</span>
            <span className="chip">
              {dict.home.updatedLabel} 2026-01-28
            </span>
          </div>
          <div className="mt-8 space-y-6">
            <div className="rounded-xl border border-border bg-black/40 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-muted">
                {dict.home.msiGuidanceLabel}
              </p>
              <div className="mt-4 grid gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>{dict.home.tiers.stable}</span>
                  <span className="text-muted">MSI &gt;= 80</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{dict.home.tiers.risky}</span>
                  <span className="text-muted">40 &lt;= MSI &lt; 80</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{dict.home.tiers.unstable}</span>
                  <span className="text-muted">MSI &lt; 40</span>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-black/20 p-5 text-sm text-muted">
              {dict.home.metaDescription}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {[`${prefix}/skills`, `${prefix}/radar`, `${prefix}/about`].map(
          (href, index) => {
            const item = dict.home.modules[index];

            return (
          <Link
            key={item.title}
            href={href}
            className="card p-6 transition hover:border-white/20 hover:bg-white/5"
          >
            <div className="flex items-center justify-between">
              <span className="tag">Module</span>
              <span className="text-xs text-muted">2026</span>
            </div>
            <h3 className="mt-5 font-display text-2xl">{item.title}</h3>
            <p className="mt-3 text-sm text-muted">{item.desc}</p>
            <span className="mt-6 inline-flex text-sm font-semibold text-accent">
              {item.cta} -&gt;
            </span>
          </Link>
          );
        }
        )}
      </div>
    </section>
  );
}
