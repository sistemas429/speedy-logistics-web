"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n";

type Props = {
  lang: Locale;
  banner?: unknown;
  cta?: unknown;
};

export function CoverageBand({ lang }: Props) {
  const isEs = lang === "es";
  const phone = "573508774939";

  // Estado Rastreo
  const [trackingCode, setTrackingCode] = useState("");

  // Estado Calculadora CBM / Peso Volumétrico
  const [boxes, setBoxes] = useState("10");
  const [lengthCm, setLengthCm] = useState("60");
  const [widthCm, setWidthCm] = useState("40");
  const [heightCm, setHeightCm] = useState("50");
  const [weightKg, setWeightKg] = useState("250");

  const qty = Math.max(1, Number(boxes) || 0);
  const l = Math.max(0, Number(lengthCm) || 0);
  const w = Math.max(0, Number(widthCm) || 0);
  const h = Math.max(0, Number(heightCm) || 0);
  const totalWeight = Math.max(0, Number(weightKg) || 0);

  const cbm = ((l * w * h) / 1_000_000) * qty;
  const airVolumetricWeight = ((l * w * h) / 6000) * qty;
  const chargeableAirWeight = Math.max(totalWeight, airVolumetricWeight);

  const getRecommendation = () => {
    if (cbm <= 0 && totalWeight <= 0) {
      return isEs ? "Ingrese medidas" : "Enter dimensions";
    }
    if (cbm < 1.2 && chargeableAirWeight <= 180) {
      return isEs ? "Carga Aérea Express / Consolidada" : "Air Freight Express / Consolidated";
    }
    if (cbm <= 18) {
      return isEs ? "Marítimo Consolidado (LCL)" : "Ocean LCL Consolidation";
    }
    if (cbm <= 28) {
      return isEs ? "Contenedor Completo 20' (FCL)" : "Full Container 20' (FCL)";
    }
    return isEs ? "Contenedor Completo 40' HQ (FCL)" : "Full Container 40' HQ (FCL)";
  };

  const recommendation = getRecommendation();

  const stats = isEs
    ? [
        { value: "+US$5M", label: "En mercancía movilizada" },
        { value: "+100", label: "Clientes activos en Colombia" },
        { value: "+20", label: "Países con red de aliados" },
        { value: "24/7", label: "Visibilidad de su operación" },
      ]
    : [
        { value: "+US$5M", label: "In cargo moved" },
        { value: "+100", label: "Active clients in Colombia" },
        { value: "+20", label: "Countries with partner network" },
        { value: "24/7", label: "Shipment visibility" },
      ];

  const handleTrack = (e: FormEvent) => {
    e.preventDefault();
    const cleanCode = trackingCode.trim();
    if (!cleanCode) return;

    const msg = isEs
      ? `Hola, quiero consultar el estado de mi embarque con guía / BL / contenedor: ${cleanCode}`
      : `Hello, I would like to check the status of my shipment (AWB / BL / Container): ${cleanCode}`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleSendCalculation = () => {
    const msg = isEs
      ? [
          "Hola, calculé mi carga en la web de Speedy Logistics y quiero cotizar:",
          `• Bultos: ${qty} cajas (${l}×${w}×${h} cm c/u)`,
          `• Volumen total: ${cbm.toFixed(2)} m³ (CBM)`,
          `• Peso bruto: ${totalWeight.toFixed(1)} kg (Volumétrico aéreo: ${airVolumetricWeight.toFixed(1)} kg)`,
          `• Modalidad sugerida: ${recommendation}`,
        ].join("\n")
      : [
          "Hello, I calculated my cargo on Speedy Logistics website and would like a quote:",
          `• Packages: ${qty} boxes (${l}×${w}×${h} cm each)`,
          `• Total volume: ${cbm.toFixed(2)} m³ (CBM)`,
          `• Gross weight: ${totalWeight.toFixed(1)} kg (Air volumetric: ${airVolumetricWeight.toFixed(1)} kg)`,
          `• Suggested mode: ${recommendation}`,
        ].join("\n");

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section
      id="tracking"
      className="border-y border-line/60 bg-slate-50 py-20 px-6 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        {/* 1. Cifras de respaldo */}
        <div className="grid grid-cols-2 gap-6 rounded-3xl border border-line/70 bg-white p-8 shadow-sm md:grid-cols-4 md:p-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <p className="text-3xl font-extrabold tracking-tight text-[#0066FF] sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1.5 text-xs font-medium text-muted sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* 2. Calculadora de Volumen (CBM) y Peso Volumétrico */}
        <div
          id="calculator"
          className="mt-12 rounded-3xl border border-line/70 bg-white p-8 shadow-sm md:p-10"
        >
          <div className="flex flex-col justify-between gap-4 border-b border-line/60 pb-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF6B00]">
                {isEs ? "Herramienta logística" : "Logistics tool"}
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {isEs
                  ? "Calculadora de Volumen (CBM) y Modalidad"
                  : "Volume (CBM) & Freight Mode Calculator"}
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted">
              {isEs
                ? "Calcule metros cúbicos y peso volumétrico para saber al instante si le conviene aéreo, consolidado LCL o contenedor."
                : "Calculate cubic meters and volumetric weight to instantly see whether air, LCL, or full container fits best."}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Inputs */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-5 lg:col-span-7">
              <div>
                <label
                  htmlFor="calc-boxes"
                  className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-600"
                >
                  {isEs ? "Bultos" : "Boxes"}
                </label>
                <input
                  id="calc-boxes"
                  type="number"
                  min={1}
                  value={boxes}
                  onChange={(e) => setBoxes(e.target.value)}
                  className="w-full rounded-xl border border-line bg-slate-50/60 px-3.5 py-2.5 text-sm font-medium text-ink outline-none focus:border-[#0066FF] focus:bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="calc-length"
                  className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-600"
                >
                  {isEs ? "Largo (cm)" : "Length (cm)"}
                </label>
                <input
                  id="calc-length"
                  type="number"
                  min={0}
                  value={lengthCm}
                  onChange={(e) => setLengthCm(e.target.value)}
                  className="w-full rounded-xl border border-line bg-slate-50/60 px-3.5 py-2.5 text-sm font-medium text-ink outline-none focus:border-[#0066FF] focus:bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="calc-width"
                  className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-600"
                >
                  {isEs ? "Ancho (cm)" : "Width (cm)"}
                </label>
                <input
                  id="calc-width"
                  type="number"
                  min={0}
                  value={widthCm}
                  onChange={(e) => setWidthCm(e.target.value)}
                  className="w-full rounded-xl border border-line bg-slate-50/60 px-3.5 py-2.5 text-sm font-medium text-ink outline-none focus:border-[#0066FF] focus:bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="calc-height"
                  className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-600"
                >
                  {isEs ? "Alto (cm)" : "Height (cm)"}
                </label>
                <input
                  id="calc-height"
                  type="number"
                  min={0}
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full rounded-xl border border-line bg-slate-50/60 px-3.5 py-2.5 text-sm font-medium text-ink outline-none focus:border-[#0066FF] focus:bg-white"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="calc-weight"
                  className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-600"
                >
                  {isEs ? "Peso total (kg)" : "Total kg"}
                </label>
                <input
                  id="calc-weight"
                  type="number"
                  min={0}
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full rounded-xl border border-line bg-slate-50/60 px-3.5 py-2.5 text-sm font-medium text-ink outline-none focus:border-[#0066FF] focus:bg-white"
                />
              </div>
            </div>

            {/* Resultados */}
            <div className="flex flex-col justify-between rounded-2xl bg-slate-900 p-6 text-white lg:col-span-5">
              <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400">
                    {isEs ? "Volumen Marítimo" : "Ocean Volume"}
                  </span>
                  <p className="mt-1 font-mono text-2xl font-bold text-[#3b82f6]">
                    {cbm.toFixed(2)} m³
                  </p>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400">
                    {isEs ? "Peso Vol. Aéreo" : "Air Vol. Weight"}
                  </span>
                  <p className="mt-1 font-mono text-2xl font-bold text-white">
                    {airVolumetricWeight.toFixed(1)} kg
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400">
                    {isEs ? "Modalidad recomendada" : "Recommended mode"}
                  </span>
                  <p className="text-sm font-semibold text-[#FF6B00]">
                    {recommendation}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSendCalculation}
                  className="shrink-0 cursor-pointer rounded-xl bg-[#FF6B00] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#e56000]"
                >
                  {isEs ? "Cotizar este cálculo" : "Quote this cargo"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Buscador de Rastreo */}
        <div className="mt-12 rounded-3xl bg-[#0b0f17] p-8 text-white shadow-xl md:flex md:items-center md:justify-between md:gap-10 md:p-12">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF6B00]">
              {isEs ? "Rastreo de carga" : "Cargo Tracking"}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {isEs
                ? "¿Ya tiene carga en tránsito?"
                : "Already have cargo in transit?"}
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
              {isEs
                ? "Ingrese su número de guía aérea (AWB), conocimiento de embarque (BL) o contenedor para recibir el estatus actualizado."
                : "Enter your Air Waybill (AWB), Bill of Lading (BL), or container number to receive an immediate status update."}
            </p>
          </div>

          <form
            onSubmit={handleTrack}
            className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row md:mt-0"
          >
            <input
              type="text"
              required
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder={
                isEs ? "Ej. MSCU1234567 o BL" : "E.g. MSCU1234567 or BL"
              }
              className="w-full rounded-xl border border-white/15 bg-[#131924] px-4 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-[#FF6B00]"
            />
            <button
              type="submit"
              className="shrink-0 cursor-pointer rounded-xl bg-[#FF6B00] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e56000]"
            >
              {isEs ? "Rastrear" : "Track"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}