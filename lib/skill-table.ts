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

export type SkillTableData = {
  title?: string;
  headers: string[];
  rows: string[][];
  restMarkdown: string;
};

const splitRow = (line: string) =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());

export function parseSkillTableMarkdown(content: string): SkillTableData {
  const lines = content.split(/\r?\n/);
  let title = "";
  let titleIndex = -1;
  let tableStart = -1;

  for (let i = 0; i < lines.length; i += 1) {
    const trimmed = lines[i].trim();
    if (!title && trimmed.startsWith("#")) {
      title = trimmed.replace(/^#+\s*/, "").trim();
      titleIndex = i;
    }
    if (trimmed.startsWith("|")) {
      tableStart = i;
      break;
    }
  }

  if (tableStart === -1) {
    return {
      title: title || undefined,
      headers: [],
      rows: [],
      restMarkdown: content
    };
  }

  const headers = splitRow(lines[tableStart] ?? "");
  let rowStart = tableStart + 1;

  const separator = lines[rowStart] ?? "";
  if (separator.trim().startsWith("|") && separator.includes("---")) {
    rowStart += 1;
  }

  const rows: string[][] = [];
  let tableEnd = rowStart;

  for (let i = rowStart; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.trim().startsWith("|")) {
      tableEnd = i;
      break;
    }
    rows.push(splitRow(line));
    tableEnd = i + 1;
  }

  const tableLineIndexes = new Set<number>();
  for (let i = tableStart; i < tableEnd; i += 1) {
    tableLineIndexes.add(i);
  }

  const restLines = lines.filter((_, index) => {
    if (tableLineIndexes.has(index)) {
      return false;
    }
    if (index === titleIndex) {
      return false;
    }
    return true;
  });

  return {
    title: title || undefined,
    headers,
    rows,
    restMarkdown: restLines.join("\n").trim()
  };
}
