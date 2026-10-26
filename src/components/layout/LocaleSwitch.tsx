"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { type Locale, localePath, locales, stripLocale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/** Sélecteur discret FR / EN : garde la même page dans l'autre langue. */
export function LocaleSwitch({ locale, label, className }: { locale: Locale; label: string; className?: string }) {
  const current = stripLocale(usePathname());
  return (
    <div role="group" aria-label={label} className={cn("type-label flex items-center gap-2", className)}>
      {locales.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && <span aria-hidden className="opacity-40">/</span>}
          <Link
            href={localePath(l, current)}
            hrefLang={l}
            lang={l}
            aria-current={l === locale ? "true" : undefined}
            className={cn("transition-opacity", l === locale ? "opacity-100" : "opacity-45 hover:opacity-100")}
          >
            {l.toUpperCase()}
          </Link>
        </Fragment>
      ))}
    </div>
  );
}
