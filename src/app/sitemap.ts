import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((lang) => [lang, `${siteConfig.url}/${lang}`]),
  );

  return locales.map((lang) => ({
    url: `${siteConfig.url}/${lang}`,
    alternates: { languages },
  }));
}
