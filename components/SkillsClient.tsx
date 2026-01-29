"use client";

import { useMemo, useState } from "react";

export type Skill = {
  name: string;
  msi: number;
  tier: "Stable" | "Risky" | "Unstable";
  notes: string;
  lastUpdate: string;
};

export type SkillsLabels = {
  title: string;
  summary: string;
  summary2: string;
  searchPlaceholder: string;
  sortHigh: string;
  sortLow: string;
  columns: {
    name: string;
    msi: string;
    tier: string;
    notes: string;
    lastUpdate: string;
  };
  empty: string;
};

const tierStyles: Record<Skill["tier"], string> = {
  Stable: "border-emerald-400/30 text-emerald-200",
  Risky: "border-amber-400/30 text-amber-200",
  Unstable: "border-rose-400/30 text-rose-200"
};

export default function SkillsClient({
  skills,
  labels
}: {
  skills: Skill[];
  labels: SkillsLabels;
}) {
  const [query, setQuery] = useState("");
  const [descending, setDescending] = useState(true);

  const visible = useMemo(() => {
    const filtered = skills.filter((skill) =>
      skill.name.toLowerCase().includes(query.trim().toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) =>
      descending ? b.msi - a.msi : a.msi - b.msi
    );

    return sorted;
  }, [skills, query, descending]);

  return (
    <div className="space-y-6">
      <div className="card flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="font-display text-4xl">{labels.title}</h1>
          <p className="text-sm text-muted">{labels.summary}</p>
          <p className="text-sm text-muted">{labels.summary2}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.searchPlaceholder}
            className="w-56 rounded-full border border-border bg-black/40 px-4 py-2 text-sm text-ink outline-none transition focus:border-white/30"
            aria-label={labels.searchPlaceholder}
          />
          <button
            type="button"
            onClick={() => setDescending((prev) => !prev)}
            className="btn"
          >
            {descending ? labels.sortHigh : labels.sortLow}
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {visible.map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="card grid gap-4 p-5 md:grid-cols-[1.2fr_0.6fr_0.6fr_1.2fr_0.7fr] md:items-center"
          >
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted">
                {labels.columns.name}
              </div>
              <div className="mt-1 text-lg font-semibold">{skill.name}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted">
                {labels.columns.msi}
              </div>
              <div className="mt-1 text-lg font-semibold text-accent">{skill.msi}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted">
                {labels.columns.tier}
              </div>
              <div
                className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs ${
                  tierStyles[skill.tier]
                }`}
              >
                {skill.tier}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted">
                {labels.columns.notes}
              </div>
              <div className="mt-1 text-sm text-muted">{skill.notes}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted">
                {labels.columns.lastUpdate}
              </div>
              <div className="mt-1 text-sm text-muted">{skill.lastUpdate}</div>
            </div>
          </div>
        ))}
      </div>

      {visible.length === 0 && (
        <div className="card p-6 text-sm text-muted">
          {labels.empty}
        </div>
      )}
    </div>
  );
}

