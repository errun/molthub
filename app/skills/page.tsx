import type { Metadata } from "next";
import SkillsClient from "@/components/SkillsClient";
import skillsData from "@/data/skills.json";

export const metadata: Metadata = {
  title: "Molthub.bot ¡ª Moltbot Skills Dashboard",
  description:
    "Browse Moltbot skills with reliability signals, MSI tiers, and recent updates.",
  openGraph: {
    title: "Molthub.bot ¡ª Moltbot Skills Dashboard",
    description:
      "Browse Moltbot skills with reliability signals, MSI tiers, and recent updates.",
    type: "website"
  },
  keywords: [
    "reliability",
    "stability",
    "survivability",
    "viability",
    "Moltbot skills"
  ]
};

export default function SkillsPage() {
  return (
    <section className="container py-16">
      <SkillsClient skills={skillsData} />
    </section>
  );
}
