"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { DataLine } from "@/components/brand/DataLine";
import { Logo } from "@/components/brand/Logo";
import { RedDot } from "@/components/brand/RedDot";
import { type Locale, localePath, stripLocale } from "@/i18n/config";
import { LocaleSwitch } from "./LocaleSwitch";
import { type NavLabels, isActive, navLinks } from "./nav";

/** Menu plein écran sur mobile (dialog natif : piège du focus et touche Échap inclus). */
export function MobileMenu({ locale, labels, name }: { locale: Locale; labels: NavLabels; name: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const current = stripLocale(pathname);

  useEffect(() => {
    dialog.current?.close();
  }, [pathname]);

  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
        className="type-label py-2 md:hidden"
      >
        {labels.menu}
      </button>
      <dialog
        ref={dialog}
        aria-label={labels.primary}
        data-lenis-prevent
        className="fixed inset-0 h-dvh w-screen flex-col bg-black text-white open:flex md:hidden"
      >
        <div className="flex items-center justify-between px-gutter py-4">
          <Link href={localePath(locale, "/")} onClick={close} aria-label={labels.home}>
            <Logo variant="horizontal" alt="Andy" className="h-auto w-30" />
          </Link>
          <button type="button" onClick={close} className="type-label py-2">
            {labels.close}
          </button>
        </div>
        <nav aria-label={labels.primary} className="flex flex-1 flex-col justify-center px-gutter">
          <ul className="space-y-3">
            {navLinks.map(({ key, path }) => {
              const active = isActive(current, path);
              return (
                <li key={key}>
                  <Link
                    href={localePath(locale, path)}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className="inline-flex items-center gap-4 font-display text-[clamp(2.75rem,12vw,4.5rem)] leading-[1.05] font-light italic"
                  >
                    <span>{labels[key]}</span>
                    <span aria-hidden className={active ? "inline-flex" : "hidden"}>
                      <RedDot />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-end justify-between gap-6 px-gutter pb-8">
          <LocaleSwitch locale={locale} label={labels.language} />
          <DataLine items={[name, labels.role]} className="justify-end text-right text-white/60" />
        </div>
      </dialog>
    </>
  );
}
