import Image from "next/image";
import Link from "next/link";
import { CinemaFrame, FramePlaceholder } from "@/components/brand/CinemaFrame";
import { DataLine } from "@/components/brand/DataLine";
import type { ImageMeta } from "@/lib/images";

export type ProjectCardData = {
  slug: string;
  href: string;
  title: string;
  meta: string[];
  image: ImageMeta | null;
};

/** Projet en vignette : l'image dans sa fenêtre 2.39, le titre en Sectra Light Italic, la ligne de données. */
export function ProjectCard({
  project,
  sizes,
  noImage,
  cursor,
  large = false,
}: {
  project: ProjectCardData;
  sizes: string;
  noImage: string;
  cursor: string;
  large?: boolean;
}) {
  return (
    <Link href={project.href} data-cursor={cursor} className="group block">
      <CinemaFrame>
        {project.image ? (
          <Image
            src={project.image.src}
            alt=""
            fill
            sizes={sizes}
            placeholder="blur"
            blurDataURL={project.image.blurDataURL}
            className="object-cover transition-transform duration-[1.4s] ease-film group-hover:scale-[1.035]"
          />
        ) : (
          <FramePlaceholder label={noImage} />
        )}
      </CinemaFrame>
      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 md:mt-5">
        <h3
          className={
            large
              ? "font-display text-[clamp(2.25rem,5vw,4.75rem)] leading-none font-light italic"
              : "font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-none font-light italic"
          }
        >
          {project.title}
        </h3>
        <DataLine items={project.meta} className="text-white/60" />
      </div>
    </Link>
  );
}
