"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CinemaFrame } from "@/components/brand/CinemaFrame";
import { Rec } from "@/components/brand/RedDot";
import { localeFromPathname, localePath } from "@/i18n/config";
import en from "@/i18n/en";
import fr from "@/i18n/fr";

// not-found ne reçoit pas les paramètres : la langue se lit dans l'adresse.
export default function NotFound() {
  const locale = localeFromPathname(usePathname());
  const t = (locale === "en" ? en : fr).notFound;
  return (
    <section className="flex min-h-svh flex-col justify-center px-gutter pt-28 pb-16">
      <CinemaFrame hud={{ tl: <Rec />, tr: <span>404</span>, br: <span>TC 00.00.00.00</span> }}>
        <div className="absolute inset-0 grid place-items-center px-6 text-center">
          <div>
            <h1 className="font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-none font-light italic">{t.title}</h1>
            <p className="mt-4 text-white/70">{t.text}</p>
          </div>
        </div>
      </CinemaFrame>
      <Link href={localePath(locale, "/")} className="type-label mt-8 self-start opacity-70 hover:opacity-100">
        {t.back}
      </Link>
    </section>
  );
}
