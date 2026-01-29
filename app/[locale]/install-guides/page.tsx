import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InstallGuidesContent from "@/components/InstallGuidesContent";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";

const pageTitle = "Moltbot/Clawdbot 安装教程合集（Windows/macOS/Linux）| molthub.bot";
const pageDescription =
  "聚合 Windows、macOS（含 Mac mini）、Linux 三平台最成熟的 Moltbot/Clawdbot 安装文章与视频教程，并附官方文档与通用资源，适合快速安装与排错。";

type PageProps = {
  params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!isLocale(params.locale)) {
    return {};
  }

  const locale = params.locale as Locale;
  const canonical = `/${locale}/install-guides`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "website",
      url: canonical,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Moltbot/Clawdbot install guides"
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
      "Clawdbot install",
      "Windows Moltbot setup",
      "macOS Moltbot install",
      "Mac mini Moltbot",
      "Linux Moltbot setup",
      "Docker Moltbot",
      "NPM Moltbot"
    ]
  };
}

export default async function LocaleInstallGuidesPage({ params }: PageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  return (
    <InstallGuidesContent
      copy={dict.installGuides}
      locale={locale}
      canonicalPath={`/${params.locale}/install-guides`}
    />
  );
}
