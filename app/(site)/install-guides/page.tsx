import type { Metadata } from "next";
import InstallGuidesContent from "@/components/InstallGuidesContent";

const pageTitle = "Moltbot/Clawdbot 安装教程合集（Windows/macOS/Linux）| molthub.bot";
const pageDescription =
  "聚合 Windows、macOS（含 Mac mini）、Linux 三平台最成熟的 Moltbot/Clawdbot 安装文章与视频教程，并附官方文档与通用资源，适合快速安装与排错。";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/install-guides"
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: "/install-guides",
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

export default function InstallGuidesPage() {
  return <InstallGuidesContent />;
}
