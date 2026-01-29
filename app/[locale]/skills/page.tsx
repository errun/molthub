import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SkillsClient, { type Skill } from "@/components/SkillsClient";
import JsonLd from "@/components/JsonLd";
import skillsDataRaw from "@/data/skills.json";
import { getDictionary } from "@/lib/dictionaries";
import { getBaseUrl } from "@/lib/site-url";
import { isLocale, type Locale } from "@/lib/i18n";

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!isLocale(params.locale)) {
    return {};
  }

  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  return {
    title: dict.skills.metaTitle,
    description: dict.skills.metaDescription,
    alternates: {
      canonical: `/${locale}/skills`
    },
    openGraph: {
      title: dict.skills.metaTitle,
      description: dict.skills.metaDescription,
      type: "website",
      url: `/${locale}/skills`,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Molthub.bot - Moltbot skills dashboard"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: dict.skills.metaTitle,
      description: dict.skills.metaDescription,
      images: ["/twitter-image"]
    },
    keywords: dict.skills.keywords
  };
}

export default async function LocaleSkillsPage({ params }: PageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const baseUrl = getBaseUrl();
  const skillsData = skillsDataRaw as Skill[];

  return (
    <section className="container py-16">
      <JsonLd
        id={`ld-skills-${locale}`}
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: dict.skills.title,
          url: `${baseUrl}/${locale}/skills`,
          description: dict.skills.metaDescription,
          isPartOf: {
            "@type": "WebSite",
            name: "Molthub.bot",
            url: baseUrl
          },
          inLanguage: locale
        }}
      />
      <SkillsClient skills={skillsData} labels={dict.skills} />
    </section>
  );
}
