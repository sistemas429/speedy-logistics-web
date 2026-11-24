import { notFound } from "next/navigation";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { CoverageBand } from "@/components/sections/CoverageBand";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Hero } from "@/components/sections/Hero";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Hero lang={lang} hero={dict.hero} />
      <About about={dict.about} />
      <FeatureGrid
        id="why-us"
        tone="surface"
        title={dict.whyUs.title}
        subtitle={dict.whyUs.subtitle}
        items={dict.whyUs.items}
      />
      <FeatureGrid
        id="services"
        tone="white"
        title={dict.services.title}
        subtitle={dict.services.subtitle}
        items={dict.services.items}
      />
      <CoverageBand lang={lang} banner={dict.banner} cta={dict.hero.primaryCta} />
      <Contact contact={dict.contact} />
    </>
  );
}