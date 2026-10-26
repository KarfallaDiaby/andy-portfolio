import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BriefForm } from "@/components/contact/BriefForm";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { site } from "@/content/site";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { isFilled } from "@/lib/placeholder";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/contact",
    title: dict.contact.title,
    description: dict.contact.headline.join(" "),
  });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const { email, whatsapp, formMode } = site.contact;
  const big = "mt-6 block font-display text-[clamp(1.75rem,3.2vw,3rem)] leading-tight font-light italic break-words";

  return (
    <div className="px-gutter pt-32 pb-24 md:pt-44 md:pb-36">
      <p className="type-label text-white/60">{dict.contact.title}</p>
      <Reveal
        as="h1"
        lines={dict.contact.headline}
        className="mt-6 font-display text-[clamp(2.75rem,8vw,8.5rem)] leading-[0.98] font-light tracking-[-0.01em] italic"
      />

      <div className="mt-20 grid gap-20 md:mt-32 md:grid-cols-12 md:gap-gutter">
        <div className="space-y-16 md:col-span-5">
          <section>
            <SectionLabel>{dict.contact.booking}</SectionLabel>
            {isFilled(email) ? (
              <a href={`mailto:${email}`} className={`${big} underline-offset-8 hover:underline`}>
                {email}
              </a>
            ) : (
              <p className={`${big} text-white/55`}>{email}</p>
            )}
          </section>
          <section>
            <SectionLabel>{dict.contact.whatsapp}</SectionLabel>
            {whatsapp.url ? (
              <a href={whatsapp.url} target="_blank" rel="noopener noreferrer" className={`${big} underline-offset-8 hover:underline`}>
                {whatsapp.label}
              </a>
            ) : (
              <p className={`${big} text-white/55`}>{whatsapp.label}</p>
            )}
          </section>
          <section>
            <SectionLabel>{dict.contact.socials}</SectionLabel>
            <SocialLinks socials={site.socials} className="mt-6" />
          </section>
        </div>

        <section className="md:col-span-6 md:col-start-7">
          <SectionLabel>{dict.contact.form.title}</SectionLabel>
          <div className="mt-10">
            <BriefForm
              email={email}
              mode={formMode}
              labels={{
                ...dict.contact.form,
                types: [...Object.values(dict.category), dict.contact.form.other],
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
