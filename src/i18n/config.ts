export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

/** Texte disponible dans les deux langues. */
export type Localized<T = string> = Record<Locale, T>;

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Chemin public d'une page : le français n'a pas de préfixe (/work), l'anglais si (/en/work). */
export function localePath(locale: Locale, path = "/"): string {
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Retire le préfixe de langue d'un chemin public : /en/work → /work. */
export function stripLocale(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname;
}

export function localeFromPathname(pathname: string): Locale {
  const first = pathname.split("/")[1];
  return first && hasLocale(first) ? first : defaultLocale;
}

export const ogLocale: Localized = { fr: "fr_FR", en: "en_US" };
