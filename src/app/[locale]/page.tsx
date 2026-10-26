import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingCta } from "@/components/home/BookingCta";
import { Featured } from "@/components/home/Featured";
import { Philosophy } from "@/components/home/Philosophy";
import { ShowreelHero } from "@/components/home/ShowreelHero";
import { SignatureIntro } from "@/components/home/SignatureIntro";
import { site } from "@/content/site";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  return pageMetadata({ locale, path: "/", description: getDictionary(locale).meta.description });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const { showreel } = site;

  return (
    <>
      <SignatureIntro alt={dict.footer.signature} />
      <ShowreelHero
        name={site.name}
        src={showreel.src}
        poster={showreel.poster}
        loopStart={showreel.loopStart}
        year={showreel.year}
        captions={showreel.captions?.[locale]}
        lang={locale}
        labels={{
          showreel: dict.showreel.label,
          watch: dict.showreel.watch,
          close: dict.showreel.close,
          muted: dict.showreel.muted,
          role: dict.role,
          play: dict.cursor.play,
        }}
      />
      <Featured locale={locale} dict={dict} />
      <Philosophy locale={locale} label={dict.home.philosophy} line={dict.home.philosophyLine} />
      <BookingCta locale={locale} dict={dict} />
    </>
  );
}
