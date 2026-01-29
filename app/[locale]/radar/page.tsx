import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import radarData from "@/data/radar.json";
import { getDictionary } from "@/lib/dictionaries";
import { getBaseUrl } from "@/lib/site-url";
import { isLocale, type Locale } from "@/lib/i18n";

const severityStyles: Record<string, string> = {
  Low: "border-sky-400/30 text-sky-200",
  Medium: "border-amber-400/30 text-amber-200",
  High: "border-rose-400/30 text-rose-200"
};

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
    title: dict.radar.metaTitle,
    description: dict.radar.metaDescription,
    alternates: {
      canonical: `/${locale}/radar`
    },
    openGraph: {
      title: dict.radar.metaTitle,
      description: dict.radar.metaDescription,
      type: "website",
      url: `/${locale}/radar`,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Molthub.bot - Moltbot reliability radar"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: dict.radar.metaTitle,
      description: dict.radar.metaDescription,
      images: ["/twitter-image"]
    },
    keywords: dict.radar.keywords
  };
}

export default async function LocaleRadarPage({ params }: PageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const baseUrl = getBaseUrl();

  return (
    <section className="container py-16">
      <JsonLd
        id={`ld-radar-${locale}`}
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: dict.radar.title,
          url: `${baseUrl}/${locale}/radar`,
          description: dict.radar.metaDescription,
          isPartOf: {
            "@type": "WebSite",
            name: "Molthub.bot",
            url: baseUrl
          },
          inLanguage: locale
        }}
      />
      <div className="space-y-6">
        <div className="card p-6">
          <span className="tag">{dict.radar.tag}</span>
          <h1 className="mt-4 font-display text-4xl">{dict.radar.title}</h1>
          <p className="mt-2 text-sm text-muted">{dict.radar.intro}</p>
          <p className="mt-2 text-sm text-muted">{dict.radar.support}</p>
        </div>

        <div className="grid gap-5">
          {radarData.map((item, index) => (
            <article key={`${item.title}-${index}`} className="card p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="tag">{item.type}</span>
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs ${
                    severityStyles[item.severity] ?? "border-border text-muted"
                  }`}
                >
                  {item.severity}
                </span>
                <span className="chip">
                  {dict.radar.updatedLabel} {item.updatedAt}
                </span>
              </div>
              <h2 className="mt-5 text-2xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm text-muted">{item.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.affectedSkills.map((skill) => (
                  <span key={skill} className="chip">
                    {skill}
                  </span>
                ))}
              </div>
              {item.sourceUrl && (
                <a
                  href={item.sourceUrl}
                  className="mt-4 inline-flex text-sm font-semibold text-accent"
                  target="_blank"
                  rel="noreferrer"
                >
                  {dict.radar.sourceLabel} -&gt;
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
