import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, type Locale } from "@/lib/i18n";

// Elige el idioma según la cabecera Accept-Language del navegador.
function getLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";

  const requested = header
    .split(",")
    .map((part) => {
      const [tag, quality] = part.trim().split(";q=");
      return {
        lang: tag.toLowerCase().split("-")[0],
        q: quality ? Number.parseFloat(quality) : 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of requested) {
    if (hasLocale(lang)) return lang;
  }
  return defaultLocale;
}

// Se ejecuta antes de cada petición: si la URL no empieza por /es o /en,
// redirige al idioma preferido del visitante (por ejemplo "/" -> "/es").
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocalePrefix = pathname
    .split("/")
    .slice(1, 2)
    .some((segment) => hasLocale(segment));
  if (hasLocalePrefix) return;

  request.nextUrl.pathname = `/${getLocale(request)}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Ignora /api, archivos internos de Next.js y cualquier archivo con extensión
  // (favicon.ico, robots.txt, sitemap.xml, imágenes, etc.).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
