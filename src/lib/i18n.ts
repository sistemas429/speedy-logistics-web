// Configuración de idiomas. Este archivo es seguro de importar desde el proxy,
// los componentes de servidor y los componentes de cliente.

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

// Idioma por defecto: español (el cliente está en Colombia).
export const defaultLocale: Locale = "es";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
