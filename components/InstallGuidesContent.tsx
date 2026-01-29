import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { getBaseUrl } from "@/lib/site-url";
import {
  keywordLine,
  windowsSection,
  macSection,
  linuxSection,
  linuxVideoSearchTips,
  crossPlatformResources,
  faqItems,
  type GuideResource
} from "@/lib/install-guides-data";

type InstallGuidesContentProps = {
  canonicalPath?: string;
};

const allResources: GuideResource[] = [
  ...windowsSection.articles,
  ...windowsSection.videos,
  ...macSection.articles,
  ...macSection.videos,
  ...linuxSection.articles
];

const renderResourceCard = (item: GuideResource) => (
  <article key={item.url} className="card p-5">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold text-ink transition hover:text-accent"
        >
          {item.title}
        </a>
        <p className="mt-1 text-xs text-muted">来源：{item.source}</p>
      </div>
      <span className="chip">适合人群：{item.audience}</span>
    </div>
    <p className="mt-3 text-sm text-muted">{item.summary}</p>
    <div className="mt-4 flex flex-wrap gap-2">
      {item.tags.map((tag) => (
        <span key={`${item.url}-${tag}`} className="chip">
          {tag}
        </span>
      ))}
    </div>
  </article>
);

export default function InstallGuidesContent({
  canonicalPath = "/install-guides"
}: InstallGuidesContentProps) {
  const baseUrl = getBaseUrl();

  const itemListData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: allResources.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: item.url,
      publisher: item.publisher
        ? {
            "@type": "Organization",
            name: item.publisher
          }
        : undefined,
      about: item.about
    }))
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <section className="container py-16 md:py-24">
      <JsonLd id="ld-install-guides" data={itemListData} />
      <JsonLd id="ld-install-guides-faq" data={faqData} />
      <div className="space-y-8">
        <div className="space-y-4">
          <span className="tag">Install Guides</span>
          <p className="text-xs text-muted md:text-sm">{keywordLine}</p>
          <h1 className="font-display text-4xl leading-[1.1] tracking-tight md:text-6xl">
            三大平台最成熟的 Moltbot / Clawdbot 安装教程（Windows / macOS / Linux）
          </h1>
          <p className="text-lg text-muted md:text-xl">
            精选权威文章与视频，快速上手；并提供官方文档与通用资源入口。
          </p>
          <p className="text-sm text-muted">
            本页是面向 install/setup 搜索流量的权威聚合页，同时提供一键安装、
            安全说明与模型接入路径，方便进一步验证与部署。
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link className="btn-strong" href="/install">
            一键安装 /install
          </Link>
          <Link className="btn" href="/security">
            安全说明 /security
          </Link>
          <Link className="btn-ghost" href="/providers">
            模型接入 /providers
          </Link>
        </div>
        <div className="card sticky top-4 z-10 flex flex-wrap gap-2 p-4">
          {[
            { label: "Windows", href: "#windows" },
            { label: "macOS（含 Mac mini）", href: "#macos" },
            { label: "Linux", href: "#linux" },
            { label: "跨平台通用资源", href: "#cross-platform" }
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="chip transition hover:border-white/30 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-10">
        <section id="windows" className="scroll-mt-24">
          <div className="card p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-display text-3xl">Windows</h2>
              <span className="chip">{windowsSection.recommended}</span>
            </div>
            <p className="mt-4 text-sm text-muted">{windowsSection.summary}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {windowsSection.articles.map(renderResourceCard)}
            </div>
            <h3 className="mt-8 text-xl font-semibold">最佳视频教程</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {windowsSection.videos.map(renderResourceCard)}
            </div>
          </div>
        </section>

        <section id="macos" className="scroll-mt-24">
          <div className="card p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-display text-3xl">macOS（含 Mac mini）</h2>
              <span className="chip">{macSection.recommended}</span>
            </div>
            <p className="mt-4 text-sm text-muted">{macSection.summary}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {macSection.articles.map(renderResourceCard)}
            </div>
            <h3 className="mt-8 text-xl font-semibold">最佳视频教程</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {macSection.videos.map(renderResourceCard)}
            </div>
          </div>
        </section>

        <section id="linux" className="scroll-mt-24">
          <details className="card p-0">
            <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-3 px-6 py-5">
              <div>
                <h2 className="font-display text-3xl">Linux</h2>
                <p className="mt-2 text-xs text-muted">{linuxSection.recommended}</p>
              </div>
              <span className="chip">默认收起</span>
            </summary>
            <div className="space-y-6 px-6 pb-6">
              <p className="text-sm text-muted">{linuxSection.summary}</p>
              <div className="grid gap-4 md:grid-cols-2">
                {linuxSection.articles.map(renderResourceCard)}
              </div>
              <div>
                <h3 className="text-xl font-semibold">视频教程（搜索建议）</h3>
                <div className="mt-3 card p-4">
                  <p className="text-sm text-muted">
                    目前未收录稳定链接，建议在 YouTube 搜索以下关键词：
                  </p>
                  <ul className="mt-3 grid gap-2 text-sm text-ink">
                    {linuxVideoSearchTips.map((tip) => (
                      <li key={tip} className="chip w-fit">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </details>
        </section>

        <section id="cross-platform" className="scroll-mt-24">
          <div className="card p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-display text-3xl">跨平台通用资源</h2>
              <span className="chip">官方 + 社区</span>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[crossPlatformResources.official, crossPlatformResources.community].map(
                (item) => (
                  <article key={item.url} className="card p-5">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-ink transition hover:text-accent"
                    >
                      {item.title}
                    </a>
                    <p className="mt-1 text-xs text-muted">来源：{item.source}</p>
                    <p className="mt-3 text-sm text-muted">{item.summary}</p>
                  </article>
                )
              )}
            </div>
            <div className="mt-6 grid gap-3 text-sm text-muted">
              <span>
                想要更快：看 <Link href="/install" className="text-accent">/install</Link> 一键安装
              </span>
              <span>
                担心安全：看 <Link href="/security" className="text-accent">/security</Link> Key/日志说明
              </span>
              <span>
                需要帮忙？<Link href="/consulting" className="text-accent">/consulting</Link> 进入咨询入口
              </span>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24">
          <div className="card p-6">
            <h2 className="font-display text-3xl">FAQ</h2>
            <div className="mt-6 space-y-4">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-xl border border-border p-4">
                  <h3 className="text-base font-semibold">{item.question}</h3>
                  <p className="mt-2 text-sm text-muted">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="mt-10 text-xs text-muted">
        <p>本页聚合第三方教程，版权归原作者；如链接失效请反馈。</p>
        <p>安全与隐私实践以 /security 为准。</p>
        <p className="mt-2">页面来源：{baseUrl}{canonicalPath}</p>
      </div>
    </section>
  );
}
