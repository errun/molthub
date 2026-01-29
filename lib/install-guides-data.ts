export type GuideResource = {
  title: string;
  url: string;
  source: string;
  summary: string;
  tags: string[];
  audience: string;
  publisher?: string;
  about: string;
};

export type GuideSection = {
  id: string;
  title: string;
  summary: string;
  recommended: string;
  articles: GuideResource[];
  videos: GuideResource[];
  notes?: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const keywordLine =
  "关键词：Moltbot, Clawdbot, Windows, macOS, Mac mini, Linux, Docker, NPM, install, setup";

export const windowsSection: GuideSection = {
  id: "windows",
  title: "Windows",
  summary:
    "适合希望在 Windows 上快速完成 Moltbot / Clawdbot install 与 setup 的用户。推荐从 NPM 快速安装开始，遇到兼容性问题再考虑 WSL2 或 Docker。",
  recommended: "推荐路径：NPM / WSL2 / Docker",
  articles: [
    {
      title: "How to Set up Clawdbot (Or MoltBot) On Windows — Beebom",
      url: "https://beebom.com/how-to-set-up-clawdbot-or-moltbot-on-windows/",
      source: "Beebom",
      summary: "完整 Windows 安装流程，覆盖依赖准备、install/setup 步骤与常见问题定位。",
      tags: ["Windows", "install", "setup", "beginner", "troubleshooting"],
      audience: "新手",
      publisher: "Beebom",
      about: "Windows install setup"
    },
    {
      title: "Moltbot (Clawdbot) Tutorial: Control Your PC from WhatsApp — DataCamp",
      url: "https://www.datacamp.com/tutorial/moltbot-clawdbot-tutorial",
      source: "DataCamp",
      summary: "从零到可用的 Moltbot/Clawdbot 教程，包含基础安装与上手流程。",
      tags: ["Windows", "install", "tutorial", "beginner"],
      audience: "新手",
      publisher: "DataCamp",
      about: "Windows install tutorial"
    }
  ],
  videos: [
    {
      title: "Moltbot on Windows: Complete Setup Guide (YouTube)",
      url: "https://www.youtube.com/watch?v=ioGr5NfbqNg",
      source: "YouTube",
      summary: "Windows 完整 setup 演示，适合跟做复现。",
      tags: ["Windows", "setup", "video"],
      audience: "新手",
      publisher: "YouTube",
      about: "Windows setup video"
    }
  ]
};

export const macSection: GuideSection = {
  id: "macos",
  title: "macOS（含 Mac mini）",
  summary:
    "适合 macOS 与 Mac mini 用户，尤其是 Apple Silicon 环境。推荐 NPM 快速安装，必要时使用 Docker 以便隔离依赖。",
  recommended: "推荐路径：NPM / Docker / 本地运行",
  articles: [
    {
      title: "Moltbot Quickstart Guide — DigitalOcean",
      url: "https://www.digitalocean.com/community/tutorials/moltbot-quickstart-guide",
      source: "DigitalOcean",
      summary: "快速上手指南，适合 macOS/Mac mini 用户快速跑通 install 与 setup。",
      tags: ["macOS", "Mac mini", "install", "setup"],
      audience: "新手",
      publisher: "DigitalOcean",
      about: "macOS install guide"
    },
    {
      title:
        "How to Set Up Moltbot: Your Personal AI Assistant Running Locally on Your Computer — Medium (Kasata)",
      url: "https://kasata.medium.com/how-to-set-up-moltbot-your-personal-ai-assistant-running-locally-on-your-computer-5f9b932e4793",
      source: "Medium",
      summary: "本地运行视角的详细步骤，适合 Mac mini / macOS 设备本地安装。",
      tags: ["macOS", "Mac mini", "local", "install"],
      audience: "进阶",
      publisher: "Medium",
      about: "macOS local setup"
    }
  ],
  videos: [
    {
      title: "Moltbot: The Safe & Easy Way (Beginner Tutorial) (YouTube)",
      url: "https://www.youtube.com/watch?v=mDsyFrQPPfg",
      source: "YouTube",
      summary: "从零开始的安装与基础配置讲解，适合新手入门。",
      tags: ["macOS", "install", "video", "beginner"],
      audience: "新手",
      publisher: "YouTube",
      about: "macOS setup video"
    }
  ]
};

export const linuxSection: GuideSection = {
  id: "linux",
  title: "Linux",
  summary:
    "适合服务器、自托管或生产环境用户。推荐 Docker Compose 快速落地，生产环境建议补充监控与安全控制。",
  recommended: "推荐路径：Docker Compose / server / production",
  articles: [
    {
      title:
        "Self-Hosted AI Assistant: Complete Moltbot Installation Guide for Docker — DEV Community",
      url: "https://dev.to/1richter/self-hosted-ai-assistant-complete-moltbot-installation-guide-for-docker-558a",
      source: "DEV Community",
      summary: "Docker 视角的完整安装指南，适合 Linux 服务器与自托管场景。",
      tags: ["Linux", "Docker", "install", "server"],
      audience: "进阶",
      publisher: "DEV Community",
      about: "Linux Docker installation"
    },
    {
      title:
        "How to install and run Moltbot (formerly Clawdbot) on QNAP Ubuntu Linux Station — QNAP",
      url: "https://www.qnap.com/en/how-to/tutorial/article/how-to-install-and-run-moltbot-formerly-clawdbot-on-qnap-ubuntu-linux-station",
      source: "QNAP",
      summary: "面向 Ubuntu Linux Station 的实际部署步骤，适合需要图形化环境的用户。",
      tags: ["Linux", "Ubuntu", "install", "setup"],
      audience: "进阶",
      publisher: "QNAP",
      about: "Linux Ubuntu setup"
    },
    {
      title:
        "Everyone's Installing Moltbot (Clawdbot). A Full How-To Production Guide — Medium",
      url: "https://alirezarezvani.medium.com/everyones-installing-moltbot-clawdbot-here-s-why-i-m-not-running-it-in-production-yet-04f9ec596ef5",
      source: "Medium",
      summary: "偏生产环境的完整指南，覆盖稳定性评估与上线前注意事项。",
      tags: ["Linux", "production", "risk", "guide"],
      audience: "生产环境",
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
    summary: "官方入门文档，适合作为基线安装与配置参考。"
  },
  community: {
    title: "Moltbot: The Ultimate Personal AI Assistant Guide for 2026 — DEV Community",
    url: "https://dev.to/czmilo/moltbot-the-ultimate-personal-ai-assistant-guide-for-2026-d4e",
    source: "DEV Community",
    summary: "社区视角的全面指南，适合系统性补齐知识点。"
  }
};

export const faqItems: FaqItem[] = [
  {
    question: "Moltbot/Clawdbot 用 NPM 安装还是 Docker 安装更好？",
    answer:
      "新手建议优先 NPM install/setup，路径短且易排错；需要隔离依赖或多实例时再用 Docker。生产环境通常选择 Docker Compose 便于回滚与运维。"
  },
  {
    question: "Windows 推荐用 WSL2 安装吗？不想用 WSL 怎么办？",
    answer:
      "兼容性优先时推荐 WSL2；如果不想用 WSL，可使用 Windows 原生 NPM 安装，遇到依赖问题再考虑 Docker。"
  },
  {
    question: "macOS / Mac mini（Apple Silicon）有什么注意事项？",
    answer:
      "Mac mini 与 Apple Silicon 建议使用官方推荐的 Node 版本，遇到依赖差异可通过 Docker 统一环境。"
  },
  {
    question: "Linux 生产环境部署有哪些最低安全建议？",
    answer:
      "生产环境建议最小权限运行、隔离网络、开启日志审计，并将 API Key 与配置文件独立存储。"
  },
  {
    question: "API Key 放哪里最安全？如何避免泄露到 GitHub？",
    answer:
      "优先使用环境变量或密钥管理工具存放 API Key；避免写入仓库与镜像，提交前检查 .env 与配置文件是否被追踪。"
  }
];
