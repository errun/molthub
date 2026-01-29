import type { Metadata } from "next";
import { promises as fs } from "node:fs";
import { join } from "node:path";
import MarkdownContent from "@/components/MarkdownContent";
import JsonLd from "@/components/JsonLd";
import { getBaseUrl } from "@/lib/site-url";

const baseUrl = getBaseUrl();
const pageTitle = "Moltbot Installation & Troubleshooting Quickstart | molthub.bot";
const pageDescription =
  "Get Moltbot installed, running, and verifiable—fast. Install → Verify → Fix common issues. Minimal guide covering Node.js setup, installation methods, and troubleshooting.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/moltbot-install-guides"
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "article",
    url: `${baseUrl}/moltbot-install-guides`,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Moltbot Installation & Troubleshooting Guide"
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
    "Moltbot install",
    "Moltbot setup",
    "Moltbot troubleshooting",
    "Clawdbot install",
    "Node.js Moltbot",
    "npm Moltbot",
    "Moltbot doctor",
    "Moltbot onboard",
    "WSL2 Moltbot",
    "Moltbot daemon"
  ]
};

export default async function MoltbotInstallGuidesPage() {
  // Read the markdown file from the data directory
  const markdownPath = join(process.cwd(), "data", "moltbot_install_troubleshoot_quickstart.md");
  const markdownContent = await fs.readFile(markdownPath, "utf-8");

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Moltbot Installation & Troubleshooting Quickstart",
    description: pageDescription,
    url: `${baseUrl}/moltbot-install-guides`,
    datePublished: "2026-01-29",
    dateModified: "2026-01-29",
    author: {
      "@type": "Organization",
      name: "Molthub.bot"
    },
    publisher: {
      "@type": "Organization",
      name: "Molthub.bot",
      url: baseUrl
    },
    inLanguage: "en",
    about: {
      "@type": "SoftwareApplication",
      name: "Moltbot",
      applicationCategory: "DeveloperApplication"
    }
  };

  return (
    <section className="container py-16 md:py-24">
      <JsonLd id="ld-moltbot-install-guides" data={jsonLdData} />

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <span className="tag">Installation Guide</span>
        </div>

        <MarkdownContent content={markdownContent} />

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-sm text-muted">
            Last updated: January 29, 2026 | Source:{" "}
            <a
              href="https://molthub.bot"
              className="text-accent hover:text-accent/80 underline"
            >
              molthub.bot
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
