import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { defaultLocale, localePath, locales } from "@/i18n/config";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/work", "/about", "/on-set", "/contact", ...projects.map((p) => `/work/${p.slug}`)];
  return paths.map((path) => ({
    url: absoluteUrl(localePath(defaultLocale, path)),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.startsWith("/work/") ? 0.8 : 0.6,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, absoluteUrl(localePath(l, path))])),
    },
  }));
}
