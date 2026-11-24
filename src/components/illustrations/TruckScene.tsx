// Ilustración principal: camión de carga en carretera. Es decorativa (aria-hidden):
// el contenido importante está en el texto. Usa clases de Tailwind para los colores,
// así toma automáticamente los colores de marca definidos en globals.css.

export function TruckScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 420"
      className={`rounded-t-[2.5rem] ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {/* cielo */}
      <rect width="800" height="420" className="fill-brand-soft" />

      {/* sol */}
      <circle cx="130" cy="110" r="46" className="fill-accent/20" />
      <circle cx="130" cy="110" r="28" className="fill-accent/30" />

      {/* nubes */}
      <ellipse cx="420" cy="70" rx="52" ry="14" className="fill-white/80" />
      <ellipse cx="455" cy="58" rx="34" ry="12" className="fill-white/80" />
      <ellipse cx="640" cy="40" rx="40" ry="11" className="fill-white/70" />

      {/* colinas */}
      <path
        d="M0 300 Q120 230 260 280 T520 270 T800 255 V370 H0Z"
        className="fill-brand/10"
      />
      <path
        d="M0 335 Q200 290 380 332 T800 320 V370 H0Z"
        className="fill-brand/20"
      />

      {/* ruta punteada con destino */}
      <path
        d="M110 200 C 300 70, 520 70, 700 140"
        className="fill-none stroke-brand/40"
        strokeWidth="3"
        strokeDasharray="2 10"
        strokeLinecap="round"
      />
      <g transform="translate(700 140)">
        <path
          d="M0 0 C-14 -16 -22 -30 -22 -44 A22 22 0 0 1 22 -44 C22 -30 14 -16 0 0Z"
          className="fill-accent"
        />
        <circle cy="-44" r="8" className="fill-white" />
      </g>

      {/* carretera */}
      <rect y="362" width="800" height="58" className="fill-ink" />
      <line
        x1="0"
        y1="392"
        x2="800"
        y2="392"
        className="road-dash stroke-white/70"
        strokeWidth="4"
        strokeDasharray="40 40"
      />

      {/* líneas de velocidad */}
      <g className="stroke-white" strokeWidth="5" strokeLinecap="round" opacity="0.9">
        <line x1="40" y1="215" x2="115" y2="215" />
        <line x1="70" y1="245" x2="130" y2="245" />
        <line x1="30" y1="275" x2="100" y2="275" />
      </g>

      {/* camión */}
      <g className="truck-bob">
        {/* chasis */}
        <rect x="150" y="320" width="500" height="14" rx="4" className="fill-ink/80" />

        {/* furgón */}
        <rect
          x="150"
          y="170"
          width="380"
          height="150"
          rx="12"
          className="fill-white stroke-line"
          strokeWidth="2"
        />
        <rect x="150" y="262" width="380" height="36" className="fill-brand" />
        {/* marca de ejemplo en el furgón (reemplazar por el logo real) */}
        <circle cx="200" cy="214" r="18" className="fill-accent" />
        <rect x="232" y="202" width="130" height="12" rx="6" className="fill-brand-strong" />
        <rect x="232" y="222" width="86" height="10" rx="5" className="fill-line" />

        {/* cabina */}
        <path
          d="M540 320 V215 Q540 200 556 200 H610 Q624 200 632 212 L664 262 Q668 268 668 276 V320Z"
          className="fill-brand-strong"
        />
        <path d="M556 214 H606 L634 258 H556Z" className="fill-brand-soft" />
        <rect x="662" y="294" width="9" height="12" rx="3" className="fill-accent" />
        <rect x="540" y="316" width="134" height="12" rx="5" className="fill-ink" />

        {/* ruedas */}
        {[210, 270, 590].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="338" r="26" className="fill-ink" />
            <circle cx={cx} cy="338" r="12" className="fill-surface" />
            <circle cx={cx} cy="338" r="4" className="fill-line" />
          </g>
        ))}
      </g>
    </svg>
  );
}
