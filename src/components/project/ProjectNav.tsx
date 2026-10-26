import Link from "next/link";
import type { Project } from "@/content/types";
import { type Locale, localePath } from "@/i18n/config";

export function ProjectNav({
  previous,
  next,
  locale,
  labels,
}: {
  previous: Project;
  next: Project;
  locale: Locale;
  labels: { previous: string; next: string; nav: string; cursor: string };
}) {
  const title = "mt-4 block font-display text-[clamp(2rem,4.4vw,4rem)] leading-none font-light italic";
  return (
    <nav aria-label={labels.nav} className="mt-24 grid border-t border-white/25 md:mt-36 md:grid-cols-2">
      <Link
        href={localePath(locale, `/work/${previous.slug}`)}
        rel="prev"
        data-cursor={labels.cursor}
        className="group border-b border-white/25 py-10 transition-opacity hover:opacity-100 md:border-r md:border-b-0 md:pr-gutter md:opacity-70"
      >
        <span className="type-label text-white/55">{labels.previous}</span>
        <span className={title}>{previous.title}</span>
      </Link>
      <Link
        href={localePath(locale, `/work/${next.slug}`)}
        rel="next"
        data-cursor={labels.cursor}
        className="group py-10 transition-opacity hover:opacity-100 md:pl-gutter md:text-right md:opacity-70"
      >
        <span className="type-label text-white/55">{labels.next}</span>
        <span className={title}>{next.title}</span>
      </Link>
    </nav>
  );
}
