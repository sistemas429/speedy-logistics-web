import { cacheLife } from "next/cache";
import { SocialLinks } from "@/components/SocialLinks";
import type { Dictionary } from "@/lib/dictionaries";
import { siteConfig } from "@/lib/site";

// Con Cache Components, leer la fecha actual debe hacerse dentro de una función
// cacheada. Así el año se calcula una vez y entra en el HTML estático.
async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer({ footer }: { footer: Dictionary["footer"] }) {
  const year = await getCurrentYear();
  const isEs = footer.rights.toLowerCase().includes("derechos");
  const langPrefix = isEs ? "/es" : "/en";

  const address =
    "address" in siteConfig && siteConfig.address
      ? siteConfig.address
      : "Av. El Dorado 97-51 Of. 215, Bogotá D.C., Colombia";
  const phone =
    "phone" in siteConfig && siteConfig.phone
      ? siteConfig.phone
      : "+57 350 877 4939";
  const email =
    "email" in siteConfig && siteConfig.email
      ? siteConfig.email
      : "gerencia@speedylogisticssas.com";

  return (
    <footer className="border-t border-white/10 bg-[#0b0f17] text-slate-300">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Columna 1: Marca y propuesta */}
          <div className="md:col-span-5">
            <svg
              viewBox="0 0 320 95"
              className="h-11 w-auto"
              role="img"
              aria-label={siteConfig.name}
            >
              <text
                x="2"
                y="40"
                fill="#FFFFFF"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="800"
                fontSize="44"
                letterSpacing="-1.5"
              >
                Speedy
              </text>
              <polygon points="175,18 228,18 234,24 172,24" fill="#FF6B00" />
              <polygon points="170,28 238,28 248,32 232,40 235,34 167,34" fill="#0066FF" />
              <polygon points="165,37 224,37 219,43 162,43" fill="#FF6B00" />
              <text
                x="2"
                y="82"
                fill="#FFFFFF"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="800"
                fontSize="44"
                letterSpacing="-1.5"
              >
                Logistics
              </text>
              <text
                x="208"
                y="82"
                fill="#FFFFFF"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="800"
                fontSize="14"
              >
                S.A.S
              </text>
            </svg>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              {isEs
                ? "Agencia de carga internacional y soluciones integrales en comercio exterior. Su departamento logístico en Bogotá, conectado con el mundo."
                : "International freight forwarder and end-to-end foreign trade solutions. Your logistics department in Bogotá, connected to the world."}
            </p>

            <p className="mt-4 font-mono text-xs text-slate-400">
              NIT 901.805.361-8 · Bogotá D.C., Colombia
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              {isEs ? "Navegación" : "Navigation"}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`${langPrefix}#home`} className="transition-colors hover:text-[#FF6B00]">
                  {isEs ? "Cotizador rápido" : "Quick quote"}
                </a>
              </li>
              <li>
                <a href={`${langPrefix}#about`} className="transition-colors hover:text-[#FF6B00]">
                  {isEs ? "Perfiles de cliente" : "Client profiles"}
                </a>
              </li>
              <li>
                <a href={`${langPrefix}#services`} className="transition-colors hover:text-[#FF6B00]">
                  {isEs ? "Servicios logísticos" : "Logistics services"}
                </a>
              </li>
              <li>
                <a href={`${langPrefix}#tracking`} className="transition-colors hover:text-[#FF6B00]">
                  {isEs ? "Rastreo de carga" : "Cargo tracking"}
                </a>
              </li>
              <li>
                <a href={`${langPrefix}#contact`} className="transition-colors hover:text-[#FF6B00]">
                  {isEs ? "Contacto" : "Contact"}
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto directo */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              {isEs ? "Contacto directo" : "Direct contact"}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li>{address}</li>
              <li>
                <a
                  href={`https://wa.me/${phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-200 transition-colors hover:text-[#FF6B00]"
                >
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="text-slate-200 transition-colors hover:text-[#FF6B00]"
                >
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior legal y redes */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-400 md:flex-row">
          <div className="text-center md:text-left">
            <p>
              © {year} {siteConfig.name}. {footer.rights}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              {isEs
                ? "Operamos bajo la normativa aduanera vigente en Colombia (DIAN) y protección de datos personales (Ley 1581 de 2012)."
                : "Operating under current Colombian customs regulations (DIAN) and personal data protection laws (Law 1581 of 2012)."}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span>{footer.follow}</span>
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}