import type { Metadata } from "next";
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
    title: dict.rename.metaTitle,
    description: dict.rename.metaDescription,
    alternates: {
      canonical: `/${locale}/rename`
    },
    openGraph: {
      title: dict.rename.metaTitle,
      description: dict.rename.metaDescription,
      type: "article",
      url: `/${locale}/rename`,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Molthub.bot - Clawdbot to Moltbot rename"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: dict.rename.metaTitle,
      description: dict.rename.metaDescription,
      images: ["/twitter-image"]
    },
    keywords: dict.rename.keywords
  };
}

export default async function LocaleRenamePage({ params }: PageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const baseUrl = getBaseUrl();

  return (
    <section className="container py-16">
      <JsonLd
        id={`ld-rename-${locale}`}
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: dict.rename.title,
          description: dict.rename.metaDescription,
          url: `${baseUrl}/${locale}/rename`,
          datePublished: "2026-01-29",
          dateModified: "2026-01-29",
          author: {
            "@type": "Organization",
            name: "Molthub.bot"
          },
          publisher: {
            "@type": "Organization",
            name: "Molthub.bot"
          },
          inLanguage: locale,
          isPartOf: {
            "@type": "WebSite",
            name: "Molthub.bot",
            url: baseUrl
          }
        }}
      />
      <div className="space-y-8">
        <div className="card p-6">
          <span className="tag">{dict.rename.tag}</span>
          <h1 className="mt-4 font-display text-4xl">{dict.rename.title}</h1>
          <p className="mt-3 text-sm text-muted">{dict.rename.intro}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="font-display text-2xl">{dict.rename.primaryTitle}</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {dict.rename.primaryReasons.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h2 className="font-display text-2xl">{dict.rename.impactTitle}</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {dict.rename.impactItems.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-display text-2xl">{dict.rename.timelineTitle}</h2>
          <p className="mt-3 text-sm text-muted">{dict.rename.timelinePara}</p>
        </div>

        <div className="card p-6">
          <h2 className="font-display text-2xl">{dict.rename.terminologyTitle}</h2>
          <p className="mt-3 text-sm text-muted">{dict.rename.terminologyPara}</p>
        </div>
      </div>
    </section>
  );
}
