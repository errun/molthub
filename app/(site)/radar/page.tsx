import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import radarData from "@/data/radar.json";
import { getBaseUrl } from "@/lib/site-url";

const baseUrl = getBaseUrl();
const pageTitle = "Molthub.bot - Moltbot Reliability Radar & Risk Signals";
const pageDescription =
  "Reliability Radar(TM) highlights elevated risk, degraded behavior, and configuration sensitivity for Moltbot skills. Review affected skills and severity.";

const severityStyles: Record<string, string> = {
  Low: "border-sky-400/30 text-sky-200",
  Medium: "border-amber-400/30 text-amber-200",
  High: "border-rose-400/30 text-rose-200"
};

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/radar"
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: "/radar",
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
    title: pageTitle,
    description: pageDescription,
    images: ["/twitter-image"]
  },
  keywords: [
    "Moltbot reliability radar",
    "Moltbot risk signals",
    "Moltbot degraded behavior",
    "Moltbot configuration stability",
    "Moltbot reliability briefs"
  ]
};

export default function RadarPage() {
  return (
    <section className="container py-16">
      <JsonLd
        id="ld-radar"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Molthub.bot - Moltbot Reliability Radar",
          url: `${baseUrl}/radar`,
          description: pageDescription,
          isPartOf: {
            "@type": "WebSite",
            name: "Molthub.bot",
            url: baseUrl
          },
          inLanguage: "en"
        }}
      />
      <div className="space-y-6">
        <div className="card p-6">
          <span className="tag">Reliability Radar(TM)</span>
          <h1 className="mt-4 font-display text-4xl">Moltbot Reliability Radar</h1>
          <p className="mt-2 text-sm text-muted">
            Neutral summaries of elevated risk, instability, and configuration signals
            for Moltbot skills.
          </p>
          <p className="mt-2 text-sm text-muted">
            Use these briefs to track reliability posture changes and prioritize validation.
          </p>
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
                <span className="chip">Updated {item.updatedAt}</span>
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
                  Source link -&gt;
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

