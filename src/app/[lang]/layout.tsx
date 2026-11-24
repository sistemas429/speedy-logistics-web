import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale, locales } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL(siteConfig.url),
    title: `${siteConfig.name} | ${dict.meta.tagline}`,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
    openGraph: {
      title: siteConfig.name,
      description: dict.meta.description,
      locale: lang === "es" ? "es_CO" : "en_US",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className="h-full">
      <body className="flex min-h-full flex-col bg-white font-sans text-ink antialiased">
        <Header lang={lang} siteName={siteConfig.name} nav={dict.nav} />
        <main className="flex-1">{children}</main>
        <Footer footer={dict.footer} />
      </body>
    </html>
  );
}