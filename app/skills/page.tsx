import type { Metadata } from "next";
import SkillsClient, { type Skill } from "@/components/SkillsClient";
import skillsDataRaw from "@/data/skills.json";

export const metadata: Metadata = {
  title: "Molthub.bot - Moltbot Skills Dashboard",
  description:
    "Browse Moltbot skills with reliability signals, MSI tiers, and recent updates.",
  openGraph: {
    title: "Molthub.bot - Moltbot Skills Dashboard",
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
  const skillsData = skillsDataRaw as Skill[];

  return (
    <section className="container py-16">
      <SkillsClient skills={skillsData} />
    </section>
  );
}

