import type { MetadataRoute } from "next";

import { getBaseUrl } from "@/lib/site-url";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const lastModified = new Date();

  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${baseUrl}/skills`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/radar`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/install-guides`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: `${baseUrl}/rename`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5
    }
  ];

  const localeEntries: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: `${baseUrl}/${locale}/skills`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6
    },
    {
      url: `${baseUrl}/${locale}/radar`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.5
    },
    {
      url: `${baseUrl}/${locale}/install-guides`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.55
    },
    {
      url: `${baseUrl}/${locale}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.4
    },
    {
      url: `${baseUrl}/${locale}/rename`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3
    }
  ]);

  return [...baseEntries, ...localeEntries];
}
