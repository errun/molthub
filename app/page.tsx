import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Molthub.bot ¡ª Reliability Signals",
  description:
    "Community-driven reliability signals for Moltbot skills. Check MSI? before you ship.",
  openGraph: {
    title: "Molthub.bot ¡ª Reliability Signals",
    description:
      "Community-driven reliability signals for Moltbot skills. Check MSI? before you ship.",
    type: "website"
  },
  keywords: [
    "reliability",
    "stability",
    "survivability",
    "viability",
    "Moltbot skills"
  ]
};

export default function HomePage() {
  return (
    <section className="container py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="tag">Community Signal Layer</span>
            <h1 className="font-display text-5xl leading-[1.05] tracking-tight md:text-7xl">
              Molthub.bot
            </h1>
            <p className="text-lg text-muted md:text-xl">
              Community-Driven Reliability Signals for Moltbot Skills
            </p>
            <p className="text-xl font-semibold md:text-2xl">
              Check MSI? before you ship.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
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
                  <span className="text-muted">MSI ¡Ý 80</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Risky</span>
                  <span className="text-muted">40 ¡Ü MSI &lt; 80</span>
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
            title: "Reliability Radar?",
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
              {item.cta} ¡ú
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
