"use client";

import { useParams } from "next/navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

type Props = {
  id: string;
  tone?: "surface" | "white";
  title?: string;
  subtitle?: string;
  items?: unknown[];
};

export function FeatureGrid({ id }: Props) {
  const params = useParams<{ lang?: string }>();
  const isEs = params?.lang !== "en";

  if (id === "why-us") {
    const steps = isEs
      ? [
          {
            step: "01",
            title: "Cotización ágil",
            text: "Cotizaciones completas desde el inicio, sin recargos ocultos, para que no pierda la ventana de embarque.",
          },
          {
            step: "02",
            title: "Documentos validados antes de zarpar",
            text: "El error se corrige cuando cuesta cero, no cuando paga bodegaje en puerto.",
          },
          {
            step: "03",
            title: "Seguimiento en cada punto",
            text: "Cada operación tiene un responsable y usted sabe dónde está su carga sin tener que preguntarlo.",
          },
        ]
      : [
          {
            step: "01",
            title: "Fast, transparent quoting",
            text: "Complete quotes upfront with no hidden surcharges so you never miss your sailing window.",
          },
          {
            step: "02",
            title: "Documents validated before sailing",
            text: "Mistakes are fixed when they cost zero, not while paying port demurrage.",
          },
          {
            step: "03",
            title: "Milestone-by-milestone tracking",
            text: "Every shipment has a dedicated owner so you know where your cargo is without asking.",
          },
        ];

    return (
      <section id="why-us" className="bg-[#0b0f17] py-20 px-6 text-white md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              dark
              kicker={isEs ? "Cómo trabajamos" : "How we work"}
              title={isEs ? "Nos anticipamos." : "We stay ahead."}
              subtitle={
                isEs
                  ? "Su carga no debería esperar por un papel. Cada día de espera es dinero."
                  : "Your cargo shouldn't wait for paperwork. Every day of delay costs money."
              }
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((item, idx) => (
              <Reveal key={item.step} delay={idx * 120} className="flex">
                <div className="group w-full rounded-2xl border border-white/10 bg-[#131924] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF6B00]/60 hover:shadow-xl hover:shadow-[#FF6B00]/10">
                  <span className="inline-block font-mono text-2xl font-bold text-[#FF6B00] transition-transform duration-300 group-hover:scale-110">
                    {item.step}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const services = isEs
    ? [
        {
          number: "01",
          title: "Transporte internacional de carga",
          description:
            "Carga aérea con guías directas o consolidada. Marítima FCL y LCL, con consolidados semanales desde China. Terrestre para cerrar el trayecto.",
          tags: ["Aéreo", "Marítimo FCL/LCL", "Terrestre"],
          image:
            "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80",
          wide: true,
        },
        {
          number: "02",
          title: "Gestión aduanera con aliados",
          description:
            "Coordinamos sus trámites con una agencia de aduanas aliada, autorizada por la DIAN, y validamos la documentación antes del embarque.",
          tags: ["Importación", "Exportación", "DIAN"],
          image: null,
          wide: false,
        },
        {
          number: "03",
          title: "Almacenamiento y distribución",
          description:
            "Red de bodegas estratégicamente ubicadas, con seguridad, eficiencia y trazabilidad hasta su destino final.",
          tags: ["Bodegaje", "Última milla"],
          image: null,
          wide: false,
        },
        {
          number: "04",
          title: "Seguros de carga",
          description:
            "Su mercancía protegida en tránsito internacional y en bodega, de punta a punta.",
          tags: ["Cobertura total"],
          image: null,
          wide: false,
        },
        {
          number: "05",
          title: "Consultoría logística",
          description:
            "Diagnóstico de su operación, optimización de costos y procesos, y soluciones a la medida con mejora continua.",
          tags: ["Incoterms", "Optimización"],
          image: null,
          wide: false,
        },
        {
          number: "06",
          title: "Tráfico y servicio al cliente",
          description:
            "Seguimiento en tiempo real, respuesta rápida y soporte constante de una persona que conoce su operación.",
          tags: ["Un solo interlocutor"],
          image:
            "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
          wide: true,
        },
      ]
    : [
        {
          number: "01",
          title: "International Freight Forwarding",
          description:
            "Air freight with direct or consolidated AWBs. Ocean FCL and LCL with weekly consolidations from China. Inland trucking to close the route.",
          tags: ["Air", "Ocean FCL/LCL", "Inland"],
          image:
            "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80",
          wide: true,
        },
        {
          number: "02",
          title: "Customs Brokerage Coordination",
          description:
            "We coordinate clearance with a DIAN-authorized customs partner and validate every document before departure.",
          tags: ["Import", "Export", "Compliance"],
          image: null,
          wide: false,
        },
        {
          number: "03",
          title: "Warehousing & Distribution",
          description:
            "Strategically located warehouse network with security, efficiency, and full traceability.",
          tags: ["Storage", "Last-mile"],
          image: null,
          wide: false,
        },
        {
          number: "04",
          title: "Cargo Insurance",
          description:
            "End-to-end protection for your goods in transit and in storage.",
          tags: ["All-risk coverage"],
          image: null,
          wide: false,
        },
        {
          number: "05",
          title: "Logistics Consulting",
          description:
            "Operational diagnostics, cost and process optimization, and tailored continuous improvement.",
          tags: ["Incoterms", "Cost reduction"],
          image: null,
          wide: false,
        },
        {
          number: "06",
          title: "Traffic & Customer Support",
          description:
            "Real-time tracking, fast response, and dedicated support from someone who knows your cargo.",
          tags: ["Single point of contact"],
          image:
            "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
          wide: true,
        },
      ];

  return (
    <section id="services" className="bg-white py-20 px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            kicker={isEs ? "Servicios" : "Services"}
            title={isEs ? "Todo, bajo un mismo techo." : "Everything under one roof."}
            subtitle={
              isEs
                ? "Un solo equipo para cada paso de su operación. Usted habla con una persona; nosotros coordinamos al resto."
                : "One team for every step of your operation. You talk to one person; we coordinate the rest."
            }
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <Reveal
              key={service.number}
              delay={(idx % 3) * 100}
              className={`flex ${service.wide ? "lg:col-span-2" : ""}`}
            >
              <article className="group relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-line/70 bg-slate-50/50 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0066FF]/40 hover:bg-white hover:shadow-xl">
                {service.image ? (
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover object-center opacity-85 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  </div>
                ) : null}

                <div className="p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold tracking-widest text-[#FF6B00]">
                      {service.number}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-medium text-slate-600 ring-1 ring-line/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="mt-4 text-xl font-bold tracking-tight text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}