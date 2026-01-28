import type { Metadata } from "next";
import radarData from "@/data/radar.json";

const severityStyles: Record<string, string> = {
  Low: "border-sky-400/30 text-sky-200",
  Medium: "border-amber-400/30 text-amber-200",
  High: "border-rose-400/30 text-rose-200"
};

export const metadata: Metadata = {
  title: "Molthub.bot - Moltbot Reliability Radar",
  description:
    "Reliability Radar(TM) highlights elevated risk signals and stability observations for Moltbot skills.",
  openGraph: {
    title: "Molthub.bot - Moltbot Reliability Radar",
    description:
      "Reliability Radar(TM) highlights elevated risk signals and stability observations for Moltbot skills.",
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

export default function RadarPage() {
  return (
    <section className="container py-16">
      <div className="space-y-6">
        <div className="card p-6">
          <span className="tag">Reliability Radar(TM)</span>
          <h1 className="mt-4 font-display text-4xl">Moltbot Reliability Radar</h1>
          <p className="mt-2 text-sm text-muted">
            Neutral summaries of elevated risk, instability, and configuration signals
            for Moltbot skills.
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

