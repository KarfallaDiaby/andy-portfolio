import Link from "next/link";
import { DataLine } from "@/components/brand/DataLine";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { site } from "@/content/site";
import { type Locale, localePath } from "@/i18n/config";
import type { Dictionary } from "@/i18n/fr";

/** Appel au booking. La ligne rouge est le seul signal de couleur de la section. */
export function BookingCta({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section aria-labelledby="booking" className="px-gutter pt-12 pb-24 md:pb-36">
      <SectionLabel as="p">{dict.home.booking}</SectionLabel>
      <Link href={localePath(locale, "/contact")} className="group mt-14 block md:mt-20">
        <Reveal
          as="h2"
          id="booking"
          lines={dict.home.bookingTitle}
          className="font-display text-[clamp(2.75rem,8.4vw,9rem)] leading-[0.98] font-light tracking-[-0.01em] italic"
        />
        <span className="type-label mt-10 inline-flex items-center gap-4">
          {dict.home.bookingCta}
          <span
            aria-hidden
            className="h-px w-12 bg-white transition-[width,background-color] duration-500 ease-film group-hover:w-24 group-hover:bg-signal"
          />
        </span>
      </Link>
      <DataLine items={[site.contact.email]} className="mt-6 text-white/55" />
    </section>
  );
}
