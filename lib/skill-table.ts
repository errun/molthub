import "server-only";
import { promises as fs } from "node:fs";
import { join } from "node:path";
import type { Locale } from "@/lib/i18n";

const skillTableCandidates: Record<"en" | "zh", string[]> = {
  en: ["skill-table-en.md", "skills-table-en.md"],
  zh: ["skill-table-zh.md", "skills-table-zh.md"]
};

export async function getSkillTableMarkdown(locale: Locale) {
  const localeKey: "en" | "zh" = locale === "zh" ? "zh" : "en";

  for (const filename of skillTableCandidates[localeKey]) {
    try {
      return await fs.readFile(join(process.cwd(), "data", filename), "utf-8");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error;
      }
    }
  }

  throw new Error(`Missing skill table markdown for locale "${localeKey}".`);
}
