// Ilustración de bodega con muelles de carga, para la sección "Sobre nosotros".
// Decorativa (aria-hidden); los colores salen de los tokens de marca.

export function WarehouseScene({ className = "" }: { className?: string }) {
  const doors = [120, 270, 420];

  return (
    <svg
      viewBox="0 0 640 440"
      className={`rounded-3xl ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {/* fondo */}
      <rect width="640" height="440" className="fill-surface" />

      {/* nubes */}
      <ellipse cx="100" cy="70" rx="46" ry="14" className="fill-white" />
      <ellipse cx="128" cy="58" rx="28" ry="11" className="fill-white" />
      <ellipse cx="540" cy="60" rx="42" ry="12" className="fill-white" />

      {/* suelo */}
      <rect y="380" width="640" height="60" className="fill-line/70" />

      {/* techo */}
      <path d="M70 172 L320 96 L570 172Z" className="fill-brand-strong" />

      {/* muro */}
      <rect
        x="90"
        y="172"
        width="460"
        height="208"
        className="fill-white stroke-line"
        strokeWidth="2"
      />

      {/* letrero (reemplazar por el logo real) */}
      <rect x="240" y="190" width="160" height="36" rx="9" className="fill-brand" />
      <circle cx="262" cy="208" r="8" className="fill-accent" />
      <rect x="278" y="203" width="96" height="9" rx="4.5" className="fill-white/90" />

      {/* muelles de carga */}
      {doors.map((x, index) => (
        <g key={x}>
          {index === 1 ? (
            <>
              {/* muelle abierto con cajas */}
              <rect x={x} y="252" width="100" height="128" className="fill-ink/85" />
              <rect x={x + 12} y="326" width="38" height="34" rx="3" className="fill-accent" />
              <rect x={x + 54} y="336" width="32" height="24" rx="3" className="fill-brand-soft" />
              <rect x={x + 30} y="296" width="34" height="30" rx="3" className="fill-brand-soft" />
              <rect x={x} y="252" width="100" height="22" className="fill-surface" />
              <g className="stroke-line" strokeWidth="2">
                <line x1={x} y1="263" x2={x + 100} y2="263" />
              </g>
            </>
          ) : (
            <>
              {/* muelle cerrado */}
              <rect
                x={x}
                y="252"
                width="100"
                height="128"
                className="fill-surface stroke-line"
                strokeWidth="2"
              />
              <g className="stroke-line" strokeWidth="2">
                {[272, 292, 312, 332, 352].map((y) => (
                  <line key={y} x1={x} y1={y} x2={x + 100} y2={y} />
                ))}
              </g>
            </>
          )}
        </g>
      ))}

      {/* cajas y estiba en primer plano */}
      <rect x="566" y="374" width="64" height="8" rx="2" className="fill-ink/40" />
      <rect x="572" y="332" width="52" height="42" rx="4" className="fill-accent" />
      <rect x="580" y="296" width="36" height="36" rx="4" className="fill-brand" />
      <rect x="40" y="374" width="64" height="8" rx="2" className="fill-ink/40" />
      <rect x="48" y="340" width="48" height="34" rx="4" className="fill-brand-soft" />
    </svg>
  );
}
