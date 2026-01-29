import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { getBaseUrl } from "@/lib/site-url";
import type { Locale } from "@/lib/i18n";
import {
  windowsSection,
  macSection,
  linuxSection,
  linuxVideoSearchTips,
  crossPlatformResources,
  type GuideResource
} from "@/lib/install-guides-data";

type InstallGuidesCopy = {
  tag: string;
  keywordLine: string;
  title: string;
  subtitle: string;
  intro: string;
  ctas: {
    install: string;
    security: string;
    providers: string;
  };
  nav: {
    windows: string;
    mac: string;
    linux: string;
    cross: string;
  };
  labels: {
    source: string;
    audience: string;
    articlesTitle: string;
    videosTitle: string;
    videosSearchTitle: string;
    collapsed: string;
    searchHint: string;
  };
  audiences: {
    beginner: string;
    intermediate: string;
    production: string;
  };
  sections: {
    windows: { summary: string; recommended: string };
    mac: { summary: string; recommended: string };
    linux: { summary: string; recommended: string };
    cross: {
      badge: string;
      fastLabel: string;
      fastSuffix: string;
      securityLabel: string;
      securitySuffix: string;
      consultLabel: string;
      consultSuffix: string;
    };
  };
  faqTitle: string;
  faq: { question: string; answer: string }[];
  disclaimer: {
    line1: string;
    line2: string;
    sourceLabel: string;
  };
};

type InstallGuidesContentProps = {
  copy: InstallGuidesCopy;
  locale: Locale;
  canonicalPath?: string;
};

const allResources: GuideResource[] = [
  ...windowsSection.articles,
  ...windowsSection.videos,
  ...macSection.articles,
  ...macSection.videos,
  ...linuxSection.articles
];

const renderResourceCard = (
  item: GuideResource,
  copy: InstallGuidesCopy,
  locale: Locale
) => (
  <article key={item.url} className="card p-5">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold text-ink transition hover:text-accent"
        >
          {item.title}
        </a>
        <p className="mt-1 text-xs text-muted">
          {copy.labels.source}: {item.source}
        </p>
      </div>
      <span className="chip">
        {copy.labels.audience}: {copy.audiences[item.audience]}
      </span>
    </div>
    <p className="mt-3 text-sm text-muted">{item.summary[locale]}</p>
    <div className="mt-4 flex flex-wrap gap-2">
      {item.tags.map((tag) => (
        <span key={`${item.url}-${tag}`} className="chip">
          {tag}
        </span>
      ))}
    </div>
  </article>
);

export default function InstallGuidesContent({
  copy,
  locale,
  canonicalPath = "/install-guides"
}: InstallGuidesContentProps) {
  const baseUrl = getBaseUrl();

  const itemListData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: allResources.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: item.url,
      publisher: item.publisher
        ? {
            "@type": "Organization",
            name: item.publisher
          }
        : undefined,
      about: item.about
    }))
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <section className="container py-16 md:py-24">
      <JsonLd id="ld-install-guides" data={itemListData} />
      <JsonLd id="ld-install-guides-faq" data={faqData} />
      <div className="space-y-8">
        <div className="space-y-4">
          <span className="tag">{copy.tag}</span>
          <p className="text-xs text-muted md:text-sm">{copy.keywordLine}</p>
          <h1 className="font-display text-4xl leading-[1.1] tracking-tight md:text-6xl">
            {copy.title}
          </h1>
          <p className="text-lg text-muted md:text-xl">{copy.subtitle}</p>
          <p className="text-sm text-muted">{copy.intro}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link className="btn-strong" href="/install">
            {copy.ctas.install}
          </Link>
          <Link className="btn" href="/security">
            {copy.ctas.security}
          </Link>
          <Link className="btn-ghost" href="/providers">
            {copy.ctas.providers}
          </Link>
        </div>
        <div className="card sticky top-4 z-10 flex flex-wrap gap-2 p-4">
          {[
            { label: copy.nav.windows, href: "#windows" },
            { label: copy.nav.mac, href: "#macos" },
            { label: copy.nav.linux, href: "#linux" },
            { label: copy.nav.cross, href: "#cross-platform" }
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="chip transition hover:border-white/30 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-10">
        <section id="windows" className="scroll-mt-24">
          <div className="card p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-display text-3xl">{copy.nav.windows}</h2>
              <span className="chip">{copy.sections.windows.recommended}</span>
            </div>
            <p className="mt-4 text-sm text-muted">{copy.sections.windows.summary}</p>
            <h3 className="mt-6 text-xl font-semibold">{copy.labels.articlesTitle}</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {windowsSection.articles.map((item) =>
                renderResourceCard(item, copy, locale)
              )}
            </div>
            <h3 className="mt-8 text-xl font-semibold">{copy.labels.videosTitle}</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {windowsSection.videos.map((item) =>
                renderResourceCard(item, copy, locale)
              )}
            </div>
          </div>
        </section>

        <section id="macos" className="scroll-mt-24">
          <div className="card p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-display text-3xl">{copy.nav.mac}</h2>
              <span className="chip">{copy.sections.mac.recommended}</span>
            </div>
            <p className="mt-4 text-sm text-muted">{copy.sections.mac.summary}</p>
            <h3 className="mt-6 text-xl font-semibold">{copy.labels.articlesTitle}</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {macSection.articles.map((item) =>
                renderResourceCard(item, copy, locale)
              )}
            </div>
            <h3 className="mt-8 text-xl font-semibold">{copy.labels.videosTitle}</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {macSection.videos.map((item) => renderResourceCard(item, copy, locale))}
            </div>
          </div>
        </section>

        <section id="linux" className="scroll-mt-24">
          <details className="card p-0">
            <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-3 px-6 py-5">
              <div>
                <h2 className="font-display text-3xl">{copy.nav.linux}</h2>
                <p className="mt-2 text-xs text-muted">{copy.sections.linux.recommended}</p>
              </div>
              <span className="chip">{copy.labels.collapsed}</span>
            </summary>
            <div className="space-y-6 px-6 pb-6">
              <p className="text-sm text-muted">{copy.sections.linux.summary}</p>
              <h3 className="text-xl font-semibold">{copy.labels.articlesTitle}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {linuxSection.articles.map((item) =>
                  renderResourceCard(item, copy, locale)
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{copy.labels.videosSearchTitle}</h3>
                <div className="mt-3 card p-4">
                  <p className="text-sm text-muted">{copy.labels.searchHint}</p>
                  <ul className="mt-3 grid gap-2 text-sm text-ink">
                    {linuxVideoSearchTips.map((tip) => (
                      <li key={tip} className="chip w-fit">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </details>
        </section>

        <section id="cross-platform" className="scroll-mt-24">
          <div className="card p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-display text-3xl">{copy.nav.cross}</h2>
              <span className="chip">{copy.sections.cross.badge}</span>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[crossPlatformResources.official, crossPlatformResources.community].map(
                (item) => (
                  <article key={item.url} className="card p-5">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-ink transition hover:text-accent"
                    >
                      {item.title}
                    </a>
                    <p className="mt-1 text-xs text-muted">
                      {copy.labels.source}: {item.source}
                    </p>
                    <p className="mt-3 text-sm text-muted">{item.summary[locale]}</p>
                  </article>
                )
              )}
            </div>
            <div className="mt-6 grid gap-3 text-sm text-muted">
              <span>
                {copy.sections.cross.fastLabel} <Link href="/install" className="text-accent">/install</Link>{" "}
                {copy.sections.cross.fastSuffix}
              </span>
              <span>
                {copy.sections.cross.securityLabel} <Link href="/security" className="text-accent">/security</Link>{" "}
                {copy.sections.cross.securitySuffix}
              </span>
              <span>
                {copy.sections.cross.consultLabel} <Link href="/consulting" className="text-accent">/consulting</Link>{" "}
                {copy.sections.cross.consultSuffix}
              </span>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24">
          <div className="card p-6">
            <h2 className="font-display text-3xl">{copy.faqTitle}</h2>
            <div className="mt-6 space-y-4">
              {copy.faq.map((item) => (
                <div key={item.question} className="rounded-xl border border-border p-4">
                  <h3 className="text-base font-semibold">{item.question}</h3>
                  <p className="mt-2 text-sm text-muted">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="mt-10 text-xs text-muted">
        <p>{copy.disclaimer.line1}</p>
        <p>{copy.disclaimer.line2}</p>
        <p className="mt-2">
          {copy.disclaimer.sourceLabel}：{baseUrl}{canonicalPath}
        </p>
      </div>
    </section>
  );
}
