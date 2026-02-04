import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MarkdownContent from "@/components/MarkdownContent";
import OpenClawSkillTable from "@/components/OpenClawSkillTable";
import JsonLd from "@/components/JsonLd";
import { getBaseUrl } from "@/lib/site-url";
import { getSkillTableMarkdown, parseSkillTableMarkdown } from "@/lib/skill-table";
import { isLocale, type Locale } from "@/lib/i18n";

type PageProps = {
  params: { locale: string };
};

const copyByLocale = {
  en: {
    metaTitle: "OpenClaw Skills Table | molthub.bot",
    metaDescription:
      "OpenClaw skill table with plain-English explanations, scenarios, and install commands.",
    tag: "OpenClaw Skills",
    keywords: [
      "OpenClaw skills",
      "OpenClaw skill table",
      "OpenClaw integrations",
      "OpenClaw install command"
    ]
  },
  zh: {
    metaTitle: "OpenClaw 技能表 | molthub.bot",
    metaDescription: "OpenClaw 技能清单，包含通俗解释、适用场景与安装命令。",
    tag: "OpenClaw 技能",
    keywords: [
      "OpenClaw 技能",
      "OpenClaw 技能表",
      "OpenClaw 集成",
      "OpenClaw 安装命令"
    ]
  }
};

const getCopy = (locale: Locale) => (locale === "zh" ? copyByLocale.zh : copyByLocale.en);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!isLocale(params.locale)) {
    return {};
  }

  const locale = params.locale as Locale;
  const copy = getCopy(locale);

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: `/${locale}/openclawskill`
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      type: "article",
      url: `/${locale}/openclawskill`,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "OpenClaw skills table"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metaTitle,
      description: copy.metaDescription,
      images: ["/twitter-image"]
    },
    keywords: copy.keywords
  };
}

export default async function LocaleOpenClawSkillPage({ params }: PageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const copy = getCopy(locale);
  const baseUrl = getBaseUrl();
  const markdownContent = await getSkillTableMarkdown(locale);
  const { title, headers, rows, restMarkdown } = parseSkillTableMarkdown(markdownContent);
  const normalizedHeaders = headers.map((header) =>
    header.toLowerCase().replace(/\s+/g, "")
  );
  const installHeaderIndex = normalizedHeaders.findIndex(
    (header) =>
      header.includes("install") || header.includes("安装") || header.includes("安裝")
  );
  const installColumnIndex =
    installHeaderIndex >= 0 ? installHeaderIndex : Math.max(headers.length - 1, 0);
  const copyLabels: Record<Locale, { copy: string; copied: string }> = {
    en: { copy: "Copy", copied: "Copied" },
    zh: { copy: "复制", copied: "已复制" },
    ja: { copy: "コピー", copied: "コピー済み" },
    ko: { copy: "복사", copied: "복사됨" }
  };
  const { copy: copyLabel, copied: copiedLabel } =
    copyLabels[locale] ?? copyLabels.en;
  const contentLanguage = locale === "zh" ? "zh" : "en";

  return (
    <section className="container py-16 md:py-24">
      <JsonLd
        id={`ld-openclawskill-${locale}`}
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: copy.metaTitle,
          url: `${baseUrl}/${locale}/openclawskill`,
          description: copy.metaDescription,
          isPartOf: {
            "@type": "WebSite",
            name: "Molthub.bot",
            url: baseUrl
          },
          inLanguage: contentLanguage
        }}
      />

      <div className="mx-auto max-w-5xl space-y-6">
        <div className="card p-6 md:p-8">
          <span className="tag">{copy.tag}</span>
          <p className="mt-4 text-sm text-muted">{copy.metaDescription}</p>
        </div>

        <div className="card p-6 md:p-10">
          <div className="space-y-6">
            {title && (
              <h1 className="font-display text-3xl md:text-4xl">{title}</h1>
            )}
            {restMarkdown && <MarkdownContent content={restMarkdown} />}
            <OpenClawSkillTable
              headers={headers}
              rows={rows}
              installColumnIndex={installColumnIndex}
              copyLabel={copyLabel}
              copiedLabel={copiedLabel}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
