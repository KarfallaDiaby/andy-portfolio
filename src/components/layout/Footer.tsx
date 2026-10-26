import Link from "next/link";
import { DataLine } from "@/components/brand/DataLine";
import { Logo } from "@/components/brand/Logo";
import { site } from "@/content/site";
import { type Locale, localePath } from "@/i18n/config";
import type { Dictionary } from "@/i18n/fr";
import { SocialLinks } from "./SocialLinks";
import { navLinks } from "./nav";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/25 bg-black px-gutter pt-16 pb-8 text-white md:pt-24">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo variant="signature" alt={dict.footer.signature} className="h-auto w-28 md:w-36" />
        </div>
        <nav aria-label={dict.nav.primary} className="md:col-span-3">
          <ul className="type-label space-y-3">
            {navLinks.map(({ key, path }) => (
              <li key={key}>
                <Link href={localePath(locale, path)} className="opacity-65 transition-opacity hover:opacity-100">
                  {dict.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <SocialLinks socials={site.socials} />
        </div>
        <div className="md:col-span-2 md:text-right">
          <a href="#top" className="type-label whitespace-nowrap opacity-65 transition-opacity hover:opacity-100">
            {dict.footer.top}
          </a>
        </div>
      </div>
      <div className="mt-16 flex flex-col gap-4 border-t border-white/25 pt-6 md:mt-24 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Logo variant="star" alt="" className="h-auto w-6" />
          <DataLine items={[`© ${year} ${site.name}`]} className="text-white/60" />
        </div>
        <DataLine items={[`${dict.footer.design} ${site.designCredit}`]} className="text-white/60" />
      </div>
    </footer>
  );
}
