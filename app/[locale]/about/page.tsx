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
    title: dict.about.metaTitle,
    description: dict.about.metaDescription,
    alternates: {
      canonical: `/${locale}/about`
    },
    openGraph: {
      title: dict.about.metaTitle,
      description: dict.about.metaDescription,
      type: "website",
      url: `/${locale}/about`,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Molthub.bot - Moltbot methodology"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: dict.about.metaTitle,
      description: dict.about.metaDescription,
      images: ["/twitter-image"]
    },
    keywords: dict.about.keywords
  };
}

export default async function LocaleAboutPage({ params }: PageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const baseUrl = getBaseUrl();

  return (
    <section className="container py-16">
      <JsonLd
        id={`ld-about-${locale}`}
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: dict.about.title,
          url: `${baseUrl}/${locale}/about`,
          description: dict.about.metaDescription,
          isPartOf: {
            "@type": "WebSite",
            name: "Molthub.bot",
            url: baseUrl
          },
          inLanguage: locale
        }}
      />
      <div className="space-y-8">
        <div className="card p-6">
          <span className="tag">{dict.about.tag}</span>
          <h1 className="mt-4 font-display text-4xl">{dict.about.title}</h1>
          <p className="mt-3 text-sm text-muted">{dict.about.intro}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="font-display text-2xl">{dict.about.scopeTitle}</h2>
            <p className="mt-3 text-sm text-muted">{dict.about.scopePara1}</p>
            <p className="mt-3 text-sm text-muted">{dict.about.scopePara2}</p>
          </div>
          <div className="card p-6">
            <h2 className="font-display text-2xl">{dict.about.msiTitle}</h2>
            <p className="mt-3 text-sm text-muted">{dict.about.msiPara1}</p>
            <p className="mt-3 text-sm text-muted">{dict.about.msiPara2}</p>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-display text-2xl">{dict.about.radarTitle}</h2>
          <p className="mt-3 text-sm text-muted">{dict.about.radarPara}</p>
        </div>

        <div className="card p-6">
          <h2 className="font-display text-2xl">{dict.about.disclaimerTitle}</h2>
          <p className="mt-3 text-sm text-muted">{dict.about.disclaimerPara}</p>
        </div>
      </div>
    </section>
  );
}
