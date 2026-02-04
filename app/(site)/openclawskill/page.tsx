import type { Metadata } from "next";
import MarkdownContent from "@/components/MarkdownContent";
import JsonLd from "@/components/JsonLd";
import { getBaseUrl } from "@/lib/site-url";
import { getSkillTableMarkdown } from "@/lib/skill-table";

const baseUrl = getBaseUrl();
const pageTitle = "OpenClaw Skills Table | molthub.bot";
const pageDescription =
  "OpenClaw skill table with plain-English explanations, scenarios, and install commands.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/openclawskill"
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "article",
    url: "/openclawskill",
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
    title: pageTitle,
    description: pageDescription,
    images: ["/twitter-image"]
  },
  keywords: [
    "OpenClaw skills",
    "OpenClaw skill table",
    "OpenClaw integrations",
    "OpenClaw install command"
  ]
};

export default async function OpenClawSkillPage() {
  const markdownContent = await getSkillTableMarkdown("en");

  return (
    <section className="container py-16 md:py-24">
      <JsonLd
        id="ld-openclawskill"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: pageTitle,
          url: `${baseUrl}/openclawskill`,
          description: pageDescription,
          isPartOf: {
            "@type": "WebSite",
            name: "Molthub.bot",
            url: baseUrl
          },
          inLanguage: "en"
        }}
      />

      <div className="mx-auto max-w-5xl space-y-6">
        <div className="card p-6 md:p-8">
          <span className="tag">OpenClaw Skills</span>
          <p className="mt-4 text-sm text-muted">{pageDescription}</p>
        </div>

        <div className="card p-6 md:p-10">
          <MarkdownContent content={markdownContent} />
        </div>
      </div>
    </section>
  );
}
