import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { getBaseUrl } from "@/lib/site-url";

const baseUrl = getBaseUrl();
const pageTitle = "Molthub.bot - Why Clawdbot Became Moltbot";
const pageDescription =
  "Explanation of why Clawdbot was renamed to Moltbot, including naming alignment, clarity, and long-term viability. Neutral, engineering-first context.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/rename"
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "article",
    url: "/rename",
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
    title: pageTitle,
    description: pageDescription,
    images: ["/twitter-image"]
  },
  keywords: [
    "Clawdbot rename",
    "Moltbot rename",
    "Clawdbot to Moltbot",
    "Moltbot naming",
    "Moltbot identity"
  ]
};

export default function RenamePage() {
  return (
    <section className="container py-16">
      <JsonLd
        id="ld-rename"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Why Clawdbot Became Moltbot",
          description: pageDescription,
          url: `${baseUrl}/rename`,
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
          inLanguage: "en",
          isPartOf: {
            "@type": "WebSite",
            name: "Molthub.bot",
            url: baseUrl
          }
        }}
      />
      <div className="space-y-8">
        <div className="card p-6">
          <span className="tag">Rename Note</span>
          <h1 className="mt-4 font-display text-4xl">Why Clawdbot Became Moltbot</h1>
          <p className="mt-3 text-sm text-muted">
            This note documents the rename from Clawdbot to Moltbot in a neutral,
            engineering-first tone. It is descriptive only.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="font-display text-2xl">Primary reasons</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Alignment: the new name matches the Moltbot skill ecosystem naming.</li>
              <li>Clarity: reduced ambiguity in documentation, URLs, and references.</li>
              <li>Viability: a simpler name improves long-term consistency and recall.</li>
            </ul>
          </div>
          <div className="card p-6">
            <h2 className="font-display text-2xl">Operational impact</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>All reliability signals continue under the same neutral methodology.</li>
              <li>Data sources remain local JSON, unchanged in structure.</li>
              <li>Legacy references can be mapped to the new name without drift.</li>
            </ul>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-display text-2xl">Timeline</h2>
          <p className="mt-3 text-sm text-muted">
            The rename is effective as of 2026-01-29. Earlier mentions of Clawdbot
            should be considered equivalent to Moltbot for documentation and signal
            tracking purposes.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="font-display text-2xl">Terminology</h2>
          <p className="mt-3 text-sm text-muted">
            "Clawdbot" is now a legacy label. "Moltbot" is the active name used across
            all reliability, stability, survivability, and viability signals.
          </p>
        </div>
      </div>
    </section>
  );
}
