import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Bricolage_Grotesque, IBM_Plex_Sans } from "next/font/google";

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

export const metadata: Metadata = {
  title: "Molthub.bot",
  description: "Community-driven reliability signals for Moltbot skills.",
  keywords: [
    "reliability",
    "stability",
    "survivability",
    "viability",
    "Moltbot skills"
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <div className="noise-layer" aria-hidden="true" />
        <div className="min-h-screen">
          <header className="border-b border-white/5 bg-black/30 backdrop-blur">
            <div className="container flex items-center justify-between py-6">
              <Link href="/" className="font-display text-lg tracking-[0.2em] uppercase">
                Molthub.bot
              </Link>
              <nav className="flex items-center gap-3 text-sm text-muted">
                <Link className="btn-ghost" href="/skills">
                  Skills
                </Link>
                <Link className="btn-ghost" href="/radar">
                  Radar
                </Link>
                <Link className="btn-ghost" href="/about">
                  About
                </Link>
              </nav>
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t border-white/5 py-10">
            <div className="container flex flex-col gap-3 text-xs text-muted">
              <span>Non-official reliability signal layer for Moltbot skills.</span>
              <span>MSI and Radar are descriptive, not prescriptive.</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
