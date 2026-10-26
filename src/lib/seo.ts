import type { Metadata } from "next";
import { site } from "@/content/site";
import { type Locale, defaultLocale, localePath, locales, ogLocale } from "@/i18n/config";

/** Adresse publique du site : NEXT_PUBLIC_SITE_URL (ex. https://directedbyandy.com), sinon celle de Vercel. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path}`;
}

export function alternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = localePath(l, path);
  languages["x-default"] = localePath(defaultLocale, path);
  return languages;
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title?: string;
  description: string;
}): Metadata {
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: localePath(locale, path), languages: alternates(path) },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: ogLocale[locale],
      url: localePath(locale, path),
      title: title ?? site.name,
      description,
    },
    twitter: { card: "summary_large_image", title: title ?? site.name, description },
  };
}

/** JSON-LD Person : le réalisateur. */
export function personJsonLd(locale: Locale, jobTitle: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.shortName,
    jobTitle,
    url: absoluteUrl(localePath(locale, "/")),
    image: absoluteUrl(site.portrait),
    sameAs: site.socials.map((s) => s.url).filter(Boolean),
  };
}
