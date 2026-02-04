import type { Metadata } from "next";
import SkillsClient, { type SkillsData } from "@/components/SkillsClient";
import JsonLd from "@/components/JsonLd";
import skillsDataRaw from "@/data/skills.json";
import { getDictionary } from "@/lib/dictionaries";
import { getBaseUrl } from "@/lib/site-url";

const baseUrl = getBaseUrl();
const pageTitle = "OpenClaw Top 10 Skills & Integrations";
const pageDescription =
  "Curated Top 10 OpenClaw skills/integrations with reasons, scenarios, value, and official links.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/skills"
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: "/skills",
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
    title: pageTitle,
    description: pageDescription,
    images: ["/twitter-image"]
  },
  keywords: [
    "Moltbot skills dashboard",
    "Moltbot MSI scores",
    "Moltbot skill stability",
    "Moltbot tiers",
    "Moltbot reliability index"
  ]
};

export default async function SkillsPage() {
  const dict = await getDictionary("en");
  const skillsData = skillsDataRaw as SkillsData;

  return (
    <section className="container py-16">
      <JsonLd
        id="ld-skills"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Molthub.bot - Moltbot Skills Dashboard",
          url: `${baseUrl}/skills`,
          description: pageDescription,
          isPartOf: {
            "@type": "WebSite",
            name: "Molthub.bot",
            url: baseUrl
          },
          inLanguage: "en"
        }}
      />
      <SkillsClient data={skillsData} labels={dict.skills} />
    </section>
  );
}

