import { stripLocale } from "@/i18n/config";

// « Pages noires pour montrer, pages blanches pour lire. » Seule /about est blanche.
const lightPaths = ["/about"];

export function isLightPath(pathname: string): boolean {
  return lightPaths.includes(stripLocale(pathname));
}
