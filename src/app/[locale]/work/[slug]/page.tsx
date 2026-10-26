import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { DataLine } from "@/components/brand/DataLine";
import { Reveal } from "@/components/motion/Reveal";
import { Credits } from "@/components/project/Credits";
import { Bts, Stills } from "@/components/project/Gallery";
import { LiteVideo } from "@/components/project/LiteVideo";
import { ProjectNav } from "@/components/project/ProjectNav";
import { getAdjacentProjects, getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import type { Project } from "@/content/types";
import { type Locale, hasLocale, localePath, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getImage, getImages } from "@/lib/images";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { embedUrl, parseVideoUrl, youtubeThumbnail } from "@/lib/video";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(locale) || !project) return {};
  const dict = getDictionary(locale);
  return pageMetadata({
    locale,
    path: `/work/${slug}`,
    title: project.title,
    description: `${dict.category[project.category]}, ${project.artist}. ${project.intention[locale]}`,
  });
}

/** JSON-LD VideoObject, seulement si le projet a une vidéo. */
function videoJsonLd(project: Project, locale: Locale) {
  const video = parseVideoUrl(project.videoUrl);
  if (!video) return null;
  const thumbnail = project.cover
    ? absoluteUrl(project.cover)
    : video.kind === "youtube"
      ? youtubeThumbnail(video.id)
      : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: project.title,
    description: project.intention[locale],
    ...(thumbnail && { thumbnailUrl: thumbnail }),
    ...(project.releaseDate && { uploadDate: project.releaseDate }),
    ...(video.kind === "file" ? { contentUrl: absoluteUrl(video.src) } : { embedUrl: embedUrl(video) }),
    director: { "@type": "Person", name: site.name },
    url: absoluteUrl(localePath(locale, `/work/${project.slug}`)),
  };
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/work/[slug]">) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(locale) || !project) notFound();
  const dict = getDictionary(locale);
  const { previous, next } = getAdjacentProjects(slug);

  const [cover, stills, bts] = await Promise.all([
    project.cover ? getImage(project.cover) : null,
    getImages(project.stills),
    getImages(project.bts),
  ]);
  const jsonLd = videoJsonLd(project, locale);

  return (
    <article className="px-gutter pt-32 pb-8 md:pt-44">
      <header className="mb-10 md:mb-14">
        <p className="type-label text-white/60">{dict.category[project.category]}</p>
        <Reveal
          as="h1"
          lines={[project.title]}
          className="mt-5 font-display text-[clamp(3rem,9vw,9.5rem)] leading-[0.95] font-light tracking-[-0.015em] italic"
        />
        <p className="type-label mt-6">{project.artist}</p>
      </header>

      <LiteVideo
        url={project.videoUrl}
        poster={cover}
        title={project.title}
        labels={{ play: dict.project.play, noVideo: dict.project.noVideo, cursor: dict.cursor.play }}
      />
      <DataLine
        items={[project.year, project.location, project.format, project.duration]}
        className="mt-5 text-white/60"
      />

      <div className="mt-20 grid gap-16 md:mt-28 md:grid-cols-12 md:gap-gutter">
        <section className="md:col-span-6">
          <h2 className="type-label text-white/60">{dict.project.intention}</h2>
          <p className="type-subtitle mt-6 max-w-[34ch] text-white/90">{project.intention[locale]}</p>
        </section>
        <section className="md:col-span-5 md:col-start-8">
          <h2 className="type-label mb-6 text-white/60">{dict.project.credits}</h2>
          <Credits credits={project.credits} labels={dict.credits} />
        </section>
      </div>

      {stills.length > 0 && (
        <Stills images={stills} label={dict.project.stills} alt={`${dict.project.stillAlt} ${project.title},`} />
      )}
      {bts.length > 0 && <Bts images={bts} label={dict.project.bts} alt={`${dict.project.btsAlt} ${project.title},`} />}

      <ProjectNav
        previous={previous}
        next={next}
        locale={locale}
        labels={{
          previous: dict.project.previous,
          next: dict.project.next,
          nav: dict.work.title,
          cursor: dict.cursor.view,
        }}
      />
      {jsonLd && <JsonLd data={jsonLd} />}
    </article>
  );
}
