import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { pad2 } from "@/lib/timecode";
import { cn } from "@/lib/cn";

/** « Less, but better. » et les cinq piliers, comme la page Philosophy du brand book. */
export function Philosophy({
  locale,
  label,
  line,
  tone = "dark",
}: {
  locale: Locale;
  label: string;
  line: string;
  tone?: "dark" | "light";
}) {
  const muted = tone === "dark" ? "text-white/65" : "text-black/65";
  return (
    <section aria-labelledby="philosophy" className="px-gutter py-24 md:py-36">
      <SectionLabel as="p">{label}</SectionLabel>
      <Reveal
        as="h2"
        id="philosophy"
        lines={["Less, but better."]}
        className="mt-16 font-display text-[clamp(3.25rem,11vw,12rem)] leading-[0.95] font-light tracking-[-0.015em] italic md:mt-24"
      />
      <p className={cn("type-subtitle mt-6 md:mt-8", tone === "dark" ? "text-white/80" : "text-black/80")}>{line}</p>

      <ol className="mt-20 grid border-t border-current/25 md:mt-28 md:grid-cols-5">
        {site.approach.map((pillar, i) => (
          <li
            key={pillar.title.en}
            className="border-b border-current/25 py-6 md:border-b-0 md:border-l md:px-6 md:pt-6 md:pb-2 md:first:border-l-0 md:first:pl-0"
          >
            <span className="type-mono text-signal">{pad2(i + 1)}</span>
            <h3 className="mt-5 font-display text-[1.75rem] leading-tight font-light italic md:mt-10">
              {pillar.title[locale]}
            </h3>
            <p className={cn("mt-3 max-w-[32ch] text-[0.9375rem] leading-[1.55]", muted)}>{pillar.text[locale]}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
