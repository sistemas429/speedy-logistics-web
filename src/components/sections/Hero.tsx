"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n";

type Props = {
  lang: Locale;
  hero?: unknown;
};

export function Hero({ lang }: Props) {
  const isEs = lang === "es";

  const [mode, setMode] = useState(isEs ? "Marítimo FCL" : "Ocean FCL");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [cargo, setCargo] = useState("");

  const modes = isEs
    ? ["Marítimo FCL", "Marítimo LCL", "Aéreo"]
    : ["Ocean FCL", "Ocean LCL", "Air Freight"];

  const handleQuoteSubmit = (e: FormEvent) => {
    e.preventDefault();

    const phone = "573508774939";
    const lines = isEs
      ? [
          "Hola, quiero cotizar con Speedy Logistics.",
          `• Modalidad: ${mode}`,
          `• Origen: ${origin || "Por definir"}`,
          `• Destino: ${destination || "Por definir"}`,
          cargo ? `• Mercancía: ${cargo}` : null,
        ]
      : [
          "Hello, I would like a quote with Speedy Logistics.",
          `• Mode: ${mode}`,
          `• Origin: ${origin || "TBD"}`,
          `• Destination: ${destination || "TBD"}`,
          cargo ? `• Cargo: ${cargo}` : null,
        ];

    const message = encodeURIComponent(lines.filter(Boolean).join("\n"));
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden bg-[#0b0f17] px-4 py-20 text-center text-white"
    >
      {/* Imagen de fondo real de terminal marítima de contenedores */}
      <img
        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80"
        alt="Operación portuaria y contenedores internacionales Speedy Logistics"
        className="pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover object-center opacity-30 transition-transform duration-1000"
      />

      {/* Capas de degradado oscuro para máxima legibilidad */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(29,78,216,0.22),_transparent_65%),radial-gradient(ellipse_at_bottom,_rgba(255,107,0,0.14),_transparent_60%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0f17]/75 via-[#0b0f17]/80 to-[#0b0f17]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center">
        {/* Logo animado */}
        <svg
          viewBox="0 0 320 95"
          className="animate-fade-up mb-6 h-20 w-auto md:h-24"
          role="img"
          aria-label="Speedy Logistics S.A.S"
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

        {/* Título y subtítulo */}
        <h1 className="animate-fade-up-delay-1 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          {isEs ? (
            <>
              Comercio exterior, <span className="text-[#3b82f6]">sin fricción.</span>
            </>
          ) : (
            <>
              Foreign trade, <span className="text-[#3b82f6]">without friction.</span>
            </>
          )}
        </h1>

        <p className="animate-fade-up-delay-1 mt-4 max-w-xl text-base text-slate-200 md:text-lg">
          {isEs
            ? "Fletes internacionales, aduana y logística integral. Desde Bogotá, hacia el mundo."
            : "International freight, customs, and end-to-end logistics. From Bogotá to the world."}
        </p>

        {/* Tarjeta interactiva: Cotice en un minuto */}
        <form
          onSubmit={handleQuoteSubmit}
          className="animate-fade-up-delay-2 mt-10 w-full max-w-3xl rounded-2xl border border-white/15 bg-[#131924]/90 p-5 text-left shadow-2xl backdrop-blur-md transition-all hover:border-white/25 sm:p-6"
        >
          <p className="text-sm font-semibold text-white">
            {isEs ? "Cotice en un minuto" : "Get a quote in one minute"}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {modes.map((item) => {
              const active = mode === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setMode(item)}
                  className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    active
                      ? "bg-white text-[#0b0f17] shadow-sm"
                      : "border border-white/15 bg-white/5 text-slate-300 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-12 sm:items-end">
            <div className="sm:col-span-3">
              <label
                htmlFor="hero-origin"
                className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-400"
              >
                {isEs ? "Origen" : "Origin"}
              </label>
              <input
                id="hero-origin"
                type="text"
                required
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder={isEs ? "Ej. Shanghái" : "E.g. Shanghai"}
                className="w-full rounded-xl border border-white/15 bg-[#0b0f17]/85 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-[#FF6B00]"
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="hero-dest"
                className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-400"
              >
                {isEs ? "Destino" : "Destination"}
              </label>
              <input
                id="hero-dest"
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder={isEs ? "Ej. Bogotá" : "E.g. Bogotá"}
                className="w-full rounded-xl border border-white/15 bg-[#0b0f17]/85 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-[#FF6B00]"
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="hero-cargo"
                className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-400"
              >
                {isEs ? "¿Qué transporta?" : "Cargo details"}
              </label>
              <input
                id="hero-cargo"
                type="text"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                placeholder={isEs ? "Opcional, ej. 3 pallets" : "Optional, e.g. 3 pallets"}
                className="w-full rounded-xl border border-white/15 bg-[#0b0f17]/85 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-[#FF6B00]"
              />
            </div>

            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full cursor-pointer rounded-full bg-[#FF6B00] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-[#FF6B00]/25 transition-all hover:scale-[1.02] hover:bg-[#e56000] active:scale-[0.98]"
              >
                {isEs ? "Cotizar por WhatsApp" : "Quote via WhatsApp"}
              </button>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            {isEs ? (
              <>
                Le respondemos por WhatsApp con su cotización.{" "}
                <a href="#services" className="text-slate-200 underline hover:text-white">
                  Ver servicios ↓
                </a>
              </>
            ) : (
              <>
                We reply via WhatsApp with your quote.{" "}
                <a href="#services" className="text-slate-200 underline hover:text-white">
                  View services ↓
                </a>
              </>
            )}
          </p>
        </form>
      </div>
    </section>
  );
}