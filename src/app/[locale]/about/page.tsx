import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CropMarks } from "@/components/brand/CropMarks";
import { Philosophy } from "@/components/home/Philosophy";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { site } from "@/content/site";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getImage } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "/about", title: dict.about.title, description: site.bio[locale][0] });
}

// Page blanche : « pages noires pour montrer, pages blanches pour lire ».
export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const portrait = await getImage(site.portrait);
  const [lead, ...rest] = site.bio[locale];

  return (
    <div className="tone-light pt-32 pb-8 md:pt-44">
      <div className="grid gap-12 px-gutter md:grid-cols-12 md:gap-gutter">
        <div className="md:col-span-5">
          <figure className="@container relative">
            <Image
              src={portrait.src}
              alt={dict.about.portraitAlt}
              width={portrait.width}
              height={portrait.height}
              sizes="(min-width: 768px) 40vw, 100vw"
              placeholder="blur"
              blurDataURL={portrait.blurDataURL}
              preload
              className="w-full grayscale"
            />
            <CropMarks />
          </figure>
        </div>
        <div className="md:col-span-6 md:col-start-7 md:pt-4">
          <p className="type-label text-black/60">{dict.about.title}</p>
          <Reveal as="h1" lines={[site.name]} className="type-title mt-5" />
          <p className="type-label mt-4">{dict.role}</p>
          <p className="type-lead mt-12 md:mt-16">{lead}</p>
          {rest.map((p) => (
            <p key={p} className="mt-6 max-w-[60ch] text-black/75">
              {p}
            </p>
          ))}
        </div>
      </div>

      <Philosophy locale={locale} label={dict.about.approach} line={dict.home.philosophyLine} tone="light" />

      <section aria-labelledby="collaborations" className="px-gutter pb-24 md:pb-36">
        <SectionLabel id="collaborations">{dict.about.collaborations}</SectionLabel>
        {site.collaborators.length > 0 ? (
          <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-4 font-display text-[clamp(1.75rem,3.4vw,3rem)] font-light italic">
            {site.collaborators.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        ) : (
          <p className="type-mono mt-10 text-black/55">{site.collaboratorsPlaceholder}</p>
        )}
      </section>

      {site.press.length > 0 && (
        <section aria-labelledby="press" className="px-gutter pb-24 md:pb-36">
          <SectionLabel id="press">{dict.about.press}</SectionLabel>
          <ul className="mt-10 border-t border-black/25">
            {site.press.map((item) => (
              <li key={`${item.outlet}-${item.title}`} className="grid gap-2 border-b border-black/15 py-4 md:grid-cols-12">
                <span className="type-mono text-black/55 md:col-span-2">{item.year}</span>
                <span className="md:col-span-7">
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                </span>
                <span className="type-label text-black/60 md:col-span-3 md:text-right">{item.outlet}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
