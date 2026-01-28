"use client";

import { useMemo, useState } from "react";

export type Skill = {
  name: string;
  msi: number;
  tier: "Stable" | "Risky" | "Unstable";
  notes: string;
  lastUpdate: string;
};

const tierStyles: Record<Skill["tier"], string> = {
  Stable: "border-emerald-400/30 text-emerald-200",
  Risky: "border-amber-400/30 text-amber-200",
  Unstable: "border-rose-400/30 text-rose-200"
};

export default function SkillsClient({ skills }: { skills: Skill[] }) {
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
          <h1 className="font-display text-4xl">Skills Dashboard</h1>
          <p className="text-sm text-muted">
            Search by name, then sort by MSI to review current reliability posture.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search skills"
            className="w-56 rounded-full border border-border bg-black/40 px-4 py-2 text-sm text-ink outline-none transition focus:border-white/30"
            aria-label="Search skills by name"
          />
          <button
            type="button"
            onClick={() => setDescending((prev) => !prev)}
            className="btn"
          >
            Sort: MSI {descending ? "High ¡ú Low" : "Low ¡ú High"}
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
              <div className="text-xs uppercase tracking-[0.2em] text-muted">Name</div>
              <div className="mt-1 text-lg font-semibold">{skill.name}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted">MSI</div>
              <div className="mt-1 text-lg font-semibold text-accent">{skill.msi}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted">Tier</div>
              <div
                className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs ${
                  tierStyles[skill.tier]
                }`}
              >
                {skill.tier}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted">Notes</div>
              <div className="mt-1 text-sm text-muted">{skill.notes}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted">Last Update</div>
              <div className="mt-1 text-sm text-muted">{skill.lastUpdate}</div>
            </div>
          </div>
        ))}
      </div>

      {visible.length === 0 && (
        <div className="card p-6 text-sm text-muted">
          No skills match the current search.
        </div>
      )}
    </div>
  );
}
