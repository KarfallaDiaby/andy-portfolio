import { type NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

// Le français est servi sans préfixe : /work affiche en interne /fr/work.
// L'anglais garde son préfixe : /en/work.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const prefixed = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (prefixed) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Tout sauf les fichiers internes de Next et les fichiers avec extension (images, vidéos, icônes, sitemap.xml…).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
