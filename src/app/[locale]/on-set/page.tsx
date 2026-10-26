import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getImages } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { pad2 } from "@/lib/timecode";

export async function generateMetadata({ params }: PageProps<"/[locale]/on-set">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "/on-set", title: dict.onSet.title, description: dict.onSet.intro });
}

/** Mur des coulisses, en noir et blanc. */
export default async function OnSetPage({ params }: PageProps<"/[locale]/on-set">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const photos = await getImages(site.onSet);

  return (
    <div className="px-gutter pt-32 pb-24 md:pt-44 md:pb-36">
      <header className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
        <Reveal as="h1" lines={[dict.onSet.title]} className="type-display italic" />
        <p className="max-w-sm text-white/65">{dict.onSet.intro}</p>
      </header>
      <ul className="columns-1 gap-gutter sm:columns-2 lg:columns-3">
        {photos.map((photo, i) => (
          <li key={photo.src} className="mb-gutter break-inside-avoid">
            <figure>
              <Image
                src={photo.src}
                alt={`${dict.onSet.alt} ${i + 1}`}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                placeholder="blur"
                blurDataURL={photo.blurDataURL}
                className="w-full contrast-[1.08] grayscale"
              />
              <figcaption className="type-mono mt-3 text-white/50">
                {dict.onSet.title} {pad2(i + 1)}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
