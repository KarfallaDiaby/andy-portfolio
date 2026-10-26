import Image from "next/image";
import { CinemaFrame } from "@/components/brand/CinemaFrame";
import { SectionLabel } from "@/components/SectionLabel";
import type { ImageMeta } from "@/lib/images";
import { cn } from "@/lib/cn";

/** Images du film : toujours avec leur étalonnage, dans la fenêtre 2.39. La première en grand. */
export function Stills({ images, label, alt }: { images: ImageMeta[]; label: string; alt: string }) {
  return (
    <section className="mt-24 md:mt-36">
      <SectionLabel>{label}</SectionLabel>
      <ul className="mt-8 grid gap-gutter md:mt-10 md:grid-cols-2">
        {images.map((img, i) => (
          <li key={img.src} className={cn(i === 0 && "md:col-span-2")}>
            <CinemaFrame marks={i === 0}>
              <Image
                src={img.src}
                alt={`${alt} ${i + 1}`}
                fill
                sizes={i === 0 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                placeholder="blur"
                blurDataURL={img.blurDataURL}
                className="object-cover"
              />
            </CinemaFrame>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Coulisses : noir et blanc, contraste poussé, même recette pour chaque photo. */
export function Bts({ images, label, alt }: { images: ImageMeta[]; label: string; alt: string }) {
  return (
    <section className="mt-24 md:mt-36">
      <SectionLabel>{label}</SectionLabel>
      <ul className="mt-8 grid grid-cols-2 gap-gutter md:mt-10 md:grid-cols-3">
        {images.map((img, i) => (
          <li key={img.src}>
            <figure>
              <Image
                src={img.src}
                alt={`${alt} ${i + 1}`}
                width={img.width}
                height={img.height}
                sizes="(min-width: 768px) 33vw, 50vw"
                placeholder="blur"
                blurDataURL={img.blurDataURL}
                className="aspect-[4/5] w-full object-cover contrast-[1.08] grayscale"
              />
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
