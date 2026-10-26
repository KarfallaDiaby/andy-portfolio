import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Grain } from "@/components/brand/Grain";
import { Cursor } from "@/components/layout/Cursor";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { site } from "@/content/site";
import { hasLocale, locales, ogLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { fontVariables } from "@/lib/fonts";
import { personJsonLd, siteUrl } from "@/lib/seo";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: dict.meta.title, template: `%s | ${site.name}` },
    description: dict.meta.description,
    applicationName: site.name,
    authors: [{ name: site.name }],
    creator: site.name,
    openGraph: { siteName: site.name, locale: ogLocale[locale], type: "website" },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

// Avant le premier affichage : signale que JavaScript tourne (révélations),
// et coupe l'intro si elle a déjà été vue dans la session ou si l'utilisateur limite les animations.
const bootScript = `(function(){var d=document.documentElement;d.classList.add("js");try{if(sessionStorage.getItem("andy-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches)d.dataset.intro="off"}catch(e){}})();`;

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body id="top">
        <Header locale={locale} labels={{ ...dict.nav, role: dict.role }} name={site.name} />
        <main id="main">{children}</main>
        <Footer locale={locale} dict={dict} />
        <Grain />
        <Cursor />
        <SmoothScroll />
        <JsonLd data={personJsonLd(locale, dict.role)} />
      </body>
    </html>
  );
}
