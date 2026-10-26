"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { RedDot } from "@/components/brand/RedDot";
import { type Locale, localePath, stripLocale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { isLightPath } from "@/lib/tone";
import { LocaleSwitch } from "./LocaleSwitch";
import { MobileMenu } from "./MobileMenu";
import { type NavLabels, isActive, navLinks } from "./nav";

/** En-tête : se retire quand on descend, revient quand on remonte. */
export function Header({ locale, labels, name }: { locale: Locale; labels: NavLabels; name: string }) {
  const pathname = usePathname();
  const current = stripLocale(pathname);
  const light = isLightPath(pathname);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setHidden(y > last && y > 160);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="type-label sr-only fixed top-4 left-4 z-100 bg-white px-4 py-3 text-black focus:not-sr-only"
      >
        {labels.skip}
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[translate,background-color] duration-500 ease-film",
          hidden && "-translate-y-full",
          light ? "text-black" : "text-white",
          scrolled && (light ? "bg-white/90" : "bg-black/80"),
        )}
      >
        <div className="flex items-center justify-between px-gutter py-4 md:py-6">
          <Link href={localePath(locale, "/")} aria-label={`${name}, ${labels.home}`}>
            <Logo
              variant="horizontal"
              tone={light ? "black" : "white"}
              alt="Andy"
              className="h-auto w-30 md:w-34"
              preload
            />
          </Link>
          <nav aria-label={labels.primary} className="hidden items-center gap-12 md:flex">
            <ul className="type-label flex items-center gap-8">
              {navLinks.map(({ key, path }) => {
                const active = isActive(current, path);
                return (
                  <li key={key}>
                    <Link
                      href={localePath(locale, path)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-flex items-center gap-2 transition-opacity",
                        active ? "opacity-100" : "opacity-65 hover:opacity-100",
                      )}
                    >
                      {/* Structure fixe (point masqué, texte enveloppé) : React n'insère jamais
                          de nœud à côté d'un texte qu'un traducteur ou une extension a pu réécrire. */}
                      <span aria-hidden className={active ? "inline-flex" : "hidden"}>
                        <RedDot />
                      </span>
                      <span>{labels[key]}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <LocaleSwitch locale={locale} label={labels.language} />
          </nav>
          <MobileMenu locale={locale} labels={labels} name={name} />
        </div>
      </header>
    </>
  );
}
