"use client";

import { useParams } from "next/navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

type Props = {
  about?: unknown;
};

export function About(_props: Props) {
  const params = useParams<{ lang?: string }>();
  const isEs = params?.lang !== "en";
  const phone = "573508774939";

  const profiles = isEs
    ? [
        {
          tag: "Primera importación",
          title: "Importo por primera vez",
          description:
            "Le acompañamos desde el primer proveedor para que su primera operación salga bien y sin sorpresas en la factura.",
          bullets: [
            "Asesoría para elegir el Incoterm",
            "Costo total puesto en su bodega",
            "Documentos revisados antes de embarcar",
          ],
          cta: "Quiero importar",
          waMessage:
            "Hola, voy a importar por primera vez y quiero asesoría con Speedy Logistics.",
          accent: "border-t-4 border-t-[#0066FF]",
        },
        {
          tag: "Operación recurrente",
          title: "Importo con frecuencia",
          description:
            "Su departamento de comercio exterior, sin nómina. Tarifas negociadas y un responsable para cada operación.",
          bullets: [
            "Consolidados semanales desde China",
            "Seguimiento en cada punto",
            "Reportes y soportes contables al día",
          ],
          cta: "Hablemos de volumen",
          waMessage:
            "Hola, importamos con frecuencia y queremos revisar tarifas y servicio.",
          accent: "border-t-4 border-t-[#FF6B00] shadow-xl ring-1 ring-black/5",
        },
        {
          tag: "Empresas en el exterior",
          title: "Envío carga a Colombia",
          description:
            "¿Su empresa vende o envía a Colombia? Somos su aliado local en aduana, normativa y entrega.",
          bullets: [
            "Conocimiento regulatorio y tributario",
            "Coordinación de aduana en destino",
            "Entrega hasta su cliente final",
          ],
          cta: "Enviar a Colombia",
          waMessage:
            "Hola, somos una empresa del exterior y queremos enviar carga a Colombia.",
          accent: "border-t-4 border-t-[#343D48]",
        },
      ]
    : [
        {
          tag: "First-time import",
          title: "Importing for the first time",
          description:
            "We guide you from your very first supplier so your operation runs smoothly with zero billing surprises.",
          bullets: [
            "Guidance to choose the right Incoterm",
            "Total landed cost to your warehouse",
            "Documents verified prior to shipping",
          ],
          cta: "Start importing",
          waMessage:
            "Hello, I am importing for the first time and would like guidance from Speedy Logistics.",
          accent: "border-t-4 border-t-[#0066FF]",
        },
        {
          tag: "Recurring operations",
          title: "I import frequently",
          description:
            "Your foreign trade department without payroll overhead. Negotiated rates and a dedicated specialist.",
          bullets: [
            "Weekly consolidations from China",
            "Milestone tracking at every stage",
            "Up-to-date accounting & tax supports",
          ],
          cta: "Let's talk volume",
          waMessage:
            "Hello, we import regularly and would like to review rates and service.",
          accent: "border-t-4 border-t-[#FF6B00] shadow-xl ring-1 ring-black/5",
        },
        {
          tag: "Foreign companies",
          title: "Shipping cargo to Colombia",
          description:
            "Does your company sell or ship to Colombia? We are your local partner for customs, compliance, and delivery.",
          bullets: [
            "Local regulatory and tax expertise",
            "Destination customs coordination",
            "Last-mile delivery to your end client",
          ],
          cta: "Ship to Colombia",
          waMessage:
            "Hello, we are an international company looking to ship cargo to Colombia.",
          accent: "border-t-4 border-t-[#343D48]",
        },
      ];

  return (
    <section id="about" className="bg-slate-50/80 py-20 px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-16 rounded-3xl border border-line/60 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF6B00]">
              {isEs ? "Quiénes somos" : "About us"}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {isEs
                ? "Su departamento de comercio exterior. Sin nómina. Sin fricción."
                : "Your foreign trade department. No payroll. No friction."}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
              {isEs
                ? "Asumimos la gestión integral de su logística y su aduana para que usted se concentre en su negocio, con la tranquilidad de contar con un aliado que opera con transparencia y dentro del marco legal."
                : "We take on the end-to-end management of your logistics and customs clearance so you can focus on your business, backed by a transparent and fully compliant partner."}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <SectionHeading
            kicker={isEs ? "Soluciones a su medida" : "Tailored solutions"}
            title={isEs ? "¿Cuál es su caso?" : "Which describes you best?"}
            subtitle={
              isEs
                ? "Cada empresa importa distinto. Elija la opción que se parece a la suya y empecemos por ahí."
                : "Every business imports differently. Pick the option that matches yours and let's start there."
            }
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {profiles.map((profile, idx) => {
            const waHref = `https://wa.me/${phone}?text=${encodeURIComponent(
              profile.waMessage
            )}`;

            return (
              <Reveal key={profile.tag} delay={idx * 120} className="flex">
                <article
                  className={`group flex w-full flex-col justify-between rounded-2xl border border-line/70 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${profile.accent}`}
                >
                  <div>
                    <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600">
                      {profile.tag}
                    </span>

                    <h3 className="mt-4 text-2xl font-bold tracking-tight text-ink">
                      {profile.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {profile.description}
                    </p>

                    <ul className="mt-6 space-y-3 border-t border-line/60 pt-6">
                      {profile.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2.5 text-sm text-ink"
                        >
                          <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="mt-0.5 size-4 shrink-0 text-[#FF6B00]"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center justify-between rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 group-hover:bg-[#FF6B00]"
                  >
                    <span>{profile.cta}</span>
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}