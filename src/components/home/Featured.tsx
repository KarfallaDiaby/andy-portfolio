import Link from "next/link";
import { SectionLabel } from "@/components/SectionLabel";
import { ProjectCard } from "@/components/work/ProjectCard";
import { toCard } from "@/components/work/cards";
import { getFeaturedProjects } from "@/content/projects";
import { type Locale, localePath } from "@/i18n/config";
import type { Dictionary } from "@/i18n/fr";
import { cn } from "@/lib/cn";

/** Sélection de projets phares : le premier en grand, les suivants par deux. */
export async function Featured({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const cards = await Promise.all(getFeaturedProjects().map((p) => toCard(p, locale, dict)));

  return (
    <section aria-labelledby="featured" className="px-gutter py-24 md:py-36">
      <SectionLabel
        id="featured"
        aside={
          <Link
            href={localePath(locale, "/work")}
            className="type-label opacity-60 transition-opacity hover:opacity-100"
          >
            {dict.home.allWork}
          </Link>
        }
      >
        {dict.home.selected}
      </SectionLabel>
      <ul className="mt-10 grid gap-x-gutter gap-y-16 md:mt-14 md:grid-cols-2 md:gap-y-24">
        {cards.map((card, i) => (
          <li key={card.slug} className={cn(i === 0 && "md:col-span-2")}>
            <ProjectCard
              project={card}
              large={i === 0}
              sizes={i === 0 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
              noImage={dict.project.noImage}
              cursor={dict.cursor.view}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
