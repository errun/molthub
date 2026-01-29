import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { getBaseUrl } from "@/lib/site-url";

const baseUrl = getBaseUrl();
const pageTitle = "Molthub.bot - Moltbot Reliability Signals & MSI(TM) Tiers";
const pageDescription =
  "Track Moltbot reliability signals and MSI(TM) tiers for community-vetted skills. Explore stability, survivability, and viability notes before you ship.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: "/",
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
    title: pageTitle,
    description: pageDescription,
    images: ["/twitter-image"]
  },
  keywords: [
    "Moltbot reliability",
    "Moltbot MSI",
    "Moltbot reliability signals",
    "Moltbot skills ecosystem",
    "Molthub.bot"
  ]
};

export default function HomePage() {
  return (
    <section className="container py-16 md:py-24">
      <JsonLd
        id="ld-homepage"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Molthub.bot - Moltbot Reliability Signals",
          url: baseUrl,
          description: pageDescription,
          isPartOf: {
            "@type": "WebSite",
            name: "Molthub.bot",
            url: baseUrl
          },
          inLanguage: "en"
        }}
      />
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="tag">Community Signal Layer</span>
            <h1 className="font-display text-5xl leading-[1.05] tracking-tight md:text-7xl">
              Moltbot Reliability Signals
            </h1>
            <p className="text-lg text-muted md:text-xl">
              Community-Driven Reliability Signals for Moltbot Skills
            </p>
            <p className="text-xl font-semibold md:text-2xl">
              Check MSI(TM) before you ship.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="btn-strong" href="/moltbot-install-guides">
              Install Guides (Windows/macOS/Linux)
            </Link>
            <Link className="btn-strong" href="/skills">
              Skills
            </Link>
            <Link className="btn" href="/radar">
              Radar
            </Link>
            <Link className="btn-ghost" href="/about">
              About
            </Link>
          </div>
          <Link
            href="/rename"
            className="text-xs text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            Why Clawdbot became Moltbot
          </Link>
        </div>
        <div className="card p-8 shadow-glow">
          <div className="flex items-center justify-between">
            <span className="tag">Signal Snapshot</span>
            <span className="chip">Updated 2026-01-28</span>
          </div>
          <div className="mt-8 space-y-6">
            <div className="rounded-xl border border-border bg-black/40 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-muted">
                MSI Range Guidance
              </p>
              <div className="mt-4 grid gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>Stable</span>
                  <span className="text-muted">MSI &gt;= 80</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Risky</span>
                  <span className="text-muted">40 &lt;= MSI &lt; 80</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Unstable</span>
                  <span className="text-muted">MSI &lt; 40</span>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-black/20 p-5 text-sm text-muted">
              Molthub.bot aggregates community signal updates to describe reliability,
              stability, survivability, and viability signals for Moltbot skills.
              Use the signals to complement your own validation.
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Skills Dashboard",
            desc: "Sort by MSI and scan tier posture at a glance.",
            cta: "Explore skills",
            href: "/skills"
          },
          {
            title: "Reliability Radar(TM)",
            desc: "Track elevated risk signals and configuration instability notes.",
            cta: "View radar",
            href: "/radar"
          },
          {
            title: "Methodology",
            desc: "Neutral explanations of how signals are compiled.",
            cta: "Read approach",
            href: "/about"
          }
        ].map((item) => (
          <Link
            key={item.title}
            href={item.href}
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
        ))}
      </div>
    </section>
  );
}

