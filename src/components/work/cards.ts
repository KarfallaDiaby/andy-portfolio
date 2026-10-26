import "server-only";
import type { Project } from "@/content/types";
import { type Locale, localePath } from "@/i18n/config";
import type { Dictionary } from "@/i18n/fr";
import { getImage } from "@/lib/images";
import type { ProjectCardData } from "./ProjectCard";

/** Prépare un projet pour l'affichage en vignette (image mesurée au build). */
export async function toCard(project: Project, locale: Locale, dict: Dictionary): Promise<ProjectCardData> {
  return {
    slug: project.slug,
    href: localePath(locale, `/work/${project.slug}`),
    title: project.title,
    meta: [project.artist, project.year, dict.category[project.category]],
    image: project.cover ? await getImage(project.cover) : null,
  };
}
