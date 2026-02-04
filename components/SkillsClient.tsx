"use client";

import { useMemo, useState } from "react";

export type SkillLink = {
  label: string;
  url: string;
};

export type Skill = {
  name: string;
  reason: string;
  scenario: string;
  value: string;
  links: SkillLink[];
};

export type SkillsIntro = {
  description: string;
  notes: string[];
};

export type SkillsSecurity = {
  title: string;
  prefix: string;
  linkLabel: string;
  linkUrl: string;
  suffix: string;
};

export type SkillsData = {
  intro: SkillsIntro;
  items: Skill[];
  security?: SkillsSecurity;
};

export type SkillsLabels = {
  title: string;
  searchPlaceholder: string;
  sections?: {
    reason: string;
    scenario: string;
    value: string;
    links: string;
  };
  empty: string;
};

const defaultSections = {
  reason: "Reason",
  scenario: "Scenario",
  value: "Value",
  links: "Links"
};

export default function SkillsClient({
  data,
  labels
}: {
  data: SkillsData;
  labels: SkillsLabels;
}) {
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return data.items;
    }

    return data.items.filter((skill) =>
      skill.name.toLowerCase().includes(trimmed)
    );
  }, [data.items, query]);

  const sections = labels.sections ?? defaultSections;
  const searchPlaceholder = labels.searchPlaceholder ?? "Search skills";
  const introNotes = data.intro?.notes ?? [];

  return (
    <div className="space-y-6">
      <div className="card flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="font-display text-4xl">{labels.title}</h1>
          <p className="text-sm text-muted">{data.intro?.description}</p>
          <div className="space-y-1 text-sm text-muted">
            {introNotes.map((note, index) => (
              <p key={`intro-note-${index}`} className="whitespace-pre-line">
                {note}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            className="w-56 rounded-full border border-border bg-black/40 px-4 py-2 text-sm text-ink outline-none transition focus:border-white/30"
            aria-label={searchPlaceholder}
          />
        </div>
      </div>

      <div className="grid gap-4">
        {visible.map((skill, index) => (
          <div key={`${skill.name}-${index}`} className="card p-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="tag">#{index + 1}</span>
                <h2 className="text-2xl font-semibold">{skill.name}</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted">
                    {sections.reason}
                  </div>
                  <div className="mt-1 text-sm text-muted">{skill.reason}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted">
                    {sections.scenario}
                  </div>
                  <div className="mt-1 text-sm text-muted">{skill.scenario}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted">
                    {sections.value}
                  </div>
                  <div className="mt-1 text-sm text-muted">{skill.value}</div>
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted">
                  {sections.links}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skill.links?.length ? (
                    skill.links.map((link, linkIndex) => (
                      <a
                        key={`${link.label}-${linkIndex}`}
                        className="chip text-accent transition hover:border-white/30"
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${link.label}: ${link.url}`}
                      >
                        {link.label}
                      </a>
                    ))
                  ) : (
                    <span className="text-sm text-muted">-</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visible.length === 0 && (
        <div className="card p-6 text-sm text-muted">{labels.empty}</div>
      )}

      {data.security && (
        <div className="card p-6 text-sm text-muted">
          <div className="text-xs uppercase tracking-[0.2em] text-muted">
            {data.security.title}
          </div>
          <p className="mt-2 leading-relaxed">
            {data.security.prefix}
            <a
              className="text-accent underline underline-offset-2"
              href={data.security.linkUrl}
              target="_blank"
              rel="noreferrer"
            >
              {data.security.linkLabel}
            </a>
            {data.security.suffix}
          </p>
        </div>
      )}
    </div>
  );
}
