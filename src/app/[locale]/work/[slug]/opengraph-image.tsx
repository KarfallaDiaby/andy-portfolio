import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = site.name;

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const dict = getDictionary(hasLocale(locale) ? locale : "fr");
  const project = getProject(slug);
  if (!project) return renderOg({ title: site.name, data: [dict.role] });
  return renderOg({
    title: project.title,
    data: [dict.category[project.category], project.artist, project.year],
  });
}
