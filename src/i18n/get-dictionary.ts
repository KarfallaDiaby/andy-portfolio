import "server-only";
import type { Locale } from "./config";
import en from "./en";
import fr, { type Dictionary } from "./fr";

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
