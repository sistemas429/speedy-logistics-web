import type { Locale } from "./i18n";

// El archivo es.json define la "forma" del diccionario. TypeScript obliga a que
// en.json tenga exactamente las mismas claves, así nunca falta una traducción.
export type Dictionary = typeof import("@/dictionaries/es.json");

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  es: () => import("@/dictionaries/es.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
};

// Se ejecuta en el servidor: solo el HTML resultante viaja al navegador,
// los JSON de traducción no aumentan el JavaScript del cliente.
export const getDictionary = (locale: Locale) => dictionaries[locale]();
