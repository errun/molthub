import "server-only";
import type { Locale } from "./i18n";

const dictionaries: Record<Locale, () => Promise<Record<string, any>>> = {
  en: () => import("@/messages/en.json").then((module) => module.default),
  zh: () => import("@/messages/zh.json").then((module) => module.default),
  ja: () => import("@/messages/ja.json").then((module) => module.default),
  ko: () => import("@/messages/ko.json").then((module) => module.default)
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
