import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Bricolage_Grotesque, IBM_Plex_Sans } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import { getBaseUrl } from "@/lib/site-url";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "600", "700"]
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"]
});

const baseUrl = getBaseUrl();
const siteDescription =
  "Molthub.bot provides community-driven reliability signals for Moltbot skills, including MSI(TM) tiers, stability notes, and Radar(TM) briefs. Descriptive only.";
const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Molthub.bot",
  url: baseUrl,
  description: siteDescription,
  inLanguage: "en",
  keywords: "reliability, stability, survivability, viability, Moltbot skills"
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Molthub.bot - Moltbot Reliability Signals & MSI(TM) Tiers",
  description: siteDescription,
  keywords: [
    "Moltbot reliability",
    "Moltbot stability",
    "Moltbot survivability",
    "Moltbot viability",
    "Molthub.bot"
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Molthub.bot",
    title: "Molthub.bot - Moltbot Reliability Signals & MSI(TM) Tiers",
    description: siteDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Molthub.bot - Moltbot reliability signals"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Molthub.bot - Moltbot Reliability Signals & MSI(TM) Tiers",
    description: siteDescription,
    images: ["/twitter-image"]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <JsonLd id="ld-website" data={siteJsonLd} />
        <div className="noise-layer" aria-hidden="true" />
        <div className="min-h-screen">{children}</div>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DWVQPZW48G"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-DWVQPZW48G');`}
        </Script>
      </body>
    </html>
  );
}

