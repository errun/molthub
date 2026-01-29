export type LocalizedText = {
  en: string;
  zh: string;
  ja: string;
  ko: string;
};

export type GuideResource = {
  title: string;
  url: string;
  source: string;
  summary: LocalizedText;
  tags: string[];
  audience: "beginner" | "intermediate" | "production";
  publisher?: string;
  about: string;
};

export type GuideSection = {
  articles: GuideResource[];
  videos: GuideResource[];
};

export const windowsSection: GuideSection = {
  articles: [
    {
      title: "How to Set up Clawdbot (Or MoltBot) On Windows — Beebom",
      url: "https://beebom.com/how-to-set-up-clawdbot-or-moltbot-on-windows/",
      source: "Beebom",
      summary: {
        en: "Step-by-step Windows install/setup, including dependencies and troubleshooting.",
        zh: "完整 Windows 安装流程，覆盖依赖准备、install/setup 步骤与常见问题定位。",
        ja: "Windows のインストール/セットアップ手順と依存関係・トラブル対応を整理。",
        ko: "Windows 설치/설정 절차와 의존성, 문제 해결을 단계별로 설명."
      },
      tags: ["Windows", "install", "setup", "beginner", "troubleshooting"],
      audience: "beginner",
      publisher: "Beebom",
      about: "Windows install setup"
    },
    {
      title: "Moltbot (Clawdbot) Tutorial: Control Your PC from WhatsApp — DataCamp",
      url: "https://www.datacamp.com/tutorial/moltbot-clawdbot-tutorial",
      source: "DataCamp",
      summary: {
        en: "End-to-end tutorial to get Moltbot/Clawdbot running with basic setup.",
        zh: "从零到可用的 Moltbot/Clawdbot 教程，包含基础安装与上手流程。",
        ja: "Moltbot/Clawdbot を動かすための入門チュートリアル。",
        ko: "Moltbot/Clawdbot을 실행하는 입문 튜토리얼, 기본 설정 포함."
      },
      tags: ["Windows", "install", "tutorial", "beginner"],
      audience: "beginner",
      publisher: "DataCamp",
      about: "Windows install tutorial"
    }
  ],
  videos: [
    {
      title: "Moltbot on Windows: Complete Setup Guide (YouTube)",
      url: "https://www.youtube.com/watch?v=ioGr5NfbqNg",
      source: "YouTube",
      summary: {
        en: "Full Windows setup walkthrough you can follow along.",
        zh: "Windows 完整 setup 演示，适合跟做复现。",
        ja: "Windows セットアップの一連を実演。",
        ko: "Windows 설정 전체 과정을 따라 할 수 있는 영상."
      },
      tags: ["Windows", "setup", "video"],
      audience: "beginner",
      publisher: "YouTube",
      about: "Windows setup video"
    }
  ]
};

export const macSection: GuideSection = {
  articles: [
    {
      title: "Moltbot Quickstart Guide — DigitalOcean",
      url: "https://www.digitalocean.com/community/tutorials/moltbot-quickstart-guide",
      source: "DigitalOcean",
      summary: {
        en: "Quickstart for macOS/Mac mini to finish install and setup fast.",
        zh: "快速上手指南，适合 macOS/Mac mini 用户快速跑通 install 与 setup。",
        ja: "macOS/Mac mini のクイックスタート。",
        ko: "macOS/Mac mini 빠른 시작 가이드."
      },
      tags: ["macOS", "Mac mini", "install", "setup"],
      audience: "beginner",
      publisher: "DigitalOcean",
      about: "macOS install guide"
    },
    {
      title:
        "How to Set Up Moltbot: Your Personal AI Assistant Running Locally on Your Computer — Medium (Kasata)",
      url: "https://kasata.medium.com/how-to-set-up-moltbot-your-personal-ai-assistant-running-locally-on-your-computer-5f9b932e4793",
      source: "Medium",
      summary: {
        en: "Local-run focused steps for macOS/Mac mini setups.",
        zh: "本地运行视角的详细步骤，适合 Mac mini / macOS 设备本地安装。",
        ja: "macOS/Mac mini のローカル実行手順を詳説。",
        ko: "macOS/Mac mini 로컬 실행 중심 안내."
      },
      tags: ["macOS", "Mac mini", "local", "install"],
      audience: "intermediate",
      publisher: "Medium",
      about: "macOS local setup"
    }
  ],
  videos: [
    {
      title: "Moltbot: The Safe & Easy Way (Beginner Tutorial) (YouTube)",
      url: "https://www.youtube.com/watch?v=mDsyFrQPPfg",
      source: "YouTube",
      summary: {
        en: "Beginner-friendly install and basic configuration walkthrough.",
        zh: "从零开始的安装与基础配置讲解，适合新手入门。",
        ja: "初心者向けのインストールと基本設定。",
        ko: "초보자를 위한 설치 및 기본 설정."
      },
      tags: ["macOS", "install", "video", "beginner"],
      audience: "beginner",
      publisher: "YouTube",
      about: "macOS setup video"
    }
  ]
};

export const linuxSection: GuideSection = {
  articles: [
    {
      title:
        "Self-Hosted AI Assistant: Complete Moltbot Installation Guide for Docker — DEV Community",
      url: "https://dev.to/1richter/self-hosted-ai-assistant-complete-moltbot-installation-guide-for-docker-558a",
      source: "DEV Community",
      summary: {
        en: "Docker-based install guide for Linux servers and self-hosted setups.",
        zh: "Docker 视角的完整安装指南，适合 Linux 服务器与自托管场景。",
        ja: "Linux サーバー向け Docker インストールガイド。",
        ko: "Linux 서버/자가 호스팅용 Docker 설치 가이드."
      },
      tags: ["Linux", "Docker", "install", "server"],
      audience: "intermediate",
      publisher: "DEV Community",
      about: "Linux Docker installation"
    },
    {
      title:
        "How to install and run Moltbot (formerly Clawdbot) on QNAP Ubuntu Linux Station — QNAP",
      url: "https://www.qnap.com/en/how-to/tutorial/article/how-to-install-and-run-moltbot-formerly-clawdbot-on-qnap-ubuntu-linux-station",
      source: "QNAP",
      summary: {
        en: "Ubuntu Linux Station deployment steps for QNAP environments.",
        zh: "面向 Ubuntu Linux Station 的实际部署步骤，适合需要图形化环境的用户。",
        ja: "QNAP の Ubuntu Linux Station での導入手順。",
        ko: "QNAP Ubuntu Linux Station 설치 절차."
      },
      tags: ["Linux", "Ubuntu", "install", "setup"],
      audience: "intermediate",
      publisher: "QNAP",
      about: "Linux Ubuntu setup"
    },
    {
      title:
        "Everyone's Installing Moltbot (Clawdbot). A Full How-To Production Guide — Medium",
      url: "https://alirezarezvani.medium.com/everyones-installing-moltbot-clawdbot-here-s-why-i-m-not-running-it-in-production-yet-04f9ec596ef5",
      source: "Medium",
      summary: {
        en: "Production-oriented guide with stability and launch considerations.",
        zh: "偏生产环境的完整指南，覆盖稳定性评估与上线前注意事项。",
        ja: "本番視点の運用・安定性の注意点を含むガイド。",
        ko: "프로덕션 관점의 안정성 및 운영 고려사항."
      },
      tags: ["Linux", "production", "risk", "guide"],
      audience: "production",
      publisher: "Medium",
      about: "Linux production guide"
    }
  ],
  videos: []
};

export const linuxVideoSearchTips = [
  "Moltbot Linux installation",
  "Clawdbot Moltbot docker compose",
  "Moltbot server setup"
];

export const crossPlatformResources = {
  official: {
    title: "Moltbot 官方 Getting Started",
    url: "https://docs.molt.bot/start/getting-started",
    source: "docs.molt.bot",
    summary: {
      en: "Official getting started docs for install and configuration baselines.",
      zh: "官方入门文档，适合作为基线安装与配置参考。",
      ja: "公式の入門ドキュメント。",
      ko: "공식 시작 문서."
    }
  },
  community: {
    title: "Moltbot: The Ultimate Personal AI Assistant Guide for 2026 — DEV Community",
    url: "https://dev.to/czmilo/moltbot-the-ultimate-personal-ai-assistant-guide-for-2026-d4e",
    source: "DEV Community",
    summary: {
      en: "Community guide to fill gaps and provide broader context.",
      zh: "社区视角的全面指南，适合系统性补齐知识点。",
      ja: "コミュニティ視点の総合ガイド。",
      ko: "커뮤니티 관점의 종합 가이드."
    }
  }
};
