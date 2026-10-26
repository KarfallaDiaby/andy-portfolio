import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { type WorkItem, WorkIndex } from "@/components/work/WorkIndex";
import { toCard } from "@/components/work/cards";
import { projects } from "@/content/projects";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/work">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "/work", title: dict.work.title, description: dict.work.intro });
}

export default async function WorkPage({ params }: PageProps<"/[locale]/work">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const items: WorkItem[] = await Promise.all(
    projects.map(async (p) => ({
      ...(await toCard(p, locale, dict)),
      artist: p.artist,
      year: p.year,
      category: p.category,
      categoryLabel: dict.category[p.category],
    })),
  );

  return (
    <div className="px-gutter pt-32 pb-24 md:pt-44 md:pb-36">
      <header className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
        <Reveal as="h1" lines={[dict.work.title]} className="type-display italic" />
        <p className="max-w-sm text-white/65">{dict.work.intro}</p>
      </header>
      <WorkIndex
        items={items}
        labels={{
          view: dict.work.view,
          list: dict.work.list,
          grid: dict.work.grid,
          filter: dict.work.filter,
          projects: dict.work.projects,
          empty: dict.work.empty,
          noImage: dict.project.noImage,
          cursor: dict.cursor.view,
          categories: dict.categories,
        }}
      />
    </div>
  );
}
