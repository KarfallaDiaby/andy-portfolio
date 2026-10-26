import type { Dictionary } from "@/i18n/fr";

export const navLinks: { key: keyof Pick<Dictionary["nav"], "work" | "about" | "onSet" | "contact">; path: string }[] = [
  { key: "work", path: "/work" },
  { key: "about", path: "/about" },
  { key: "onSet", path: "/on-set" },
  { key: "contact", path: "/contact" },
];

export type NavLabels = Dictionary["nav"] & { role: string };

export function isActive(current: string, path: string): boolean {
  return current === path || current.startsWith(`${path}/`);
}
