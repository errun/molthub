import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { getBaseUrl } from "@/lib/site-url";

const baseUrl = getBaseUrl();
const pageTitle = "Molthub.bot - Moltbot Methodology & Neutral Signals";
const pageDescription =
  "Understand Molthub.bot's neutral methodology for Moltbot reliability signals, covering MSI(TM) tiers, evidence sources, and update cadence. Descriptive only.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/about"
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: "/about",
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
    title: pageTitle,
    description: pageDescription,
    images: ["/twitter-image"]
  },
  keywords: [
    "reliability",
    "stability",
    "survivability",
    "viability",
    "Moltbot skills"
  ]
};

export default function AboutPage() {
  return (
    <section className="container py-16">
      <JsonLd
        id="ld-about"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Molthub.bot - Moltbot Methodology",
          url: `${baseUrl}/about`,
          description: pageDescription,
          isPartOf: {
            "@type": "WebSite",
            name: "Molthub.bot",
            url: baseUrl
          },
          inLanguage: "en"
        }}
      />
      <div className="space-y-8">
        <div className="card p-6">
          <span className="tag">About</span>
          <h1 className="mt-4 font-display text-4xl">Moltbot Methodology</h1>
          <p className="mt-3 text-sm text-muted">
            Molthub.bot is a non-official, community-driven reliability signal layer
            for Moltbot skills. The goal is to document stability, survivability, and
            viability signals in a neutral, engineering-first tone.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="font-display text-2xl">Signal Scope</h2>
            <p className="mt-3 text-sm text-muted">
              Signals are compiled from user reports, reproducible setups, and
              operator notes. We focus on behavioral consistency, configuration
              sensitivity, and environment variance.
            </p>
            <p className="mt-3 text-sm text-muted">
              The content is descriptive only. It does not prescribe or restrict
              usage decisions.
            </p>
          </div>
          <div className="card p-6">
            <h2 className="font-display text-2xl">MSI Tiers</h2>
            <p className="mt-3 text-sm text-muted">
              MSI is presented as a single score for quick scanning. Tier labels
              indicate relative stability at the time of the latest update.
            </p>
            <p className="mt-3 text-sm text-muted">
              A skill can move between Stable, Risky, and Unstable tiers as
              configuration, environment, or implementation details change.
            </p>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-display text-2xl">Reliability Radar(TM)</h2>
          <p className="mt-3 text-sm text-muted">
            Radar entries highlight elevated risk or degraded behavior when
            specific conditions are observed. Each entry lists affected skills
            and the latest update time.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="font-display text-2xl">Disclaimer</h2>
          <p className="mt-3 text-sm text-muted">
            Molthub.bot does not provide warranties. The signals may be incomplete
            or become unstable as upstream changes occur. Validate in your own
            environment before critical use.
          </p>
        </div>
      </div>
    </section>
  );
}

