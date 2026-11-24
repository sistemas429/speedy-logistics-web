// Mapa estilizado de rutas entre ciudades. Pensado para fondos oscuros (banda de marca).
// Decorativo (aria-hidden).

const cities = [
  { x: 70, y: 230 },
  { x: 180, y: 120 },
  { x: 300, y: 200 },
  { x: 470, y: 170 },
];

export function RouteMap({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 540 300"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* rutas */}
      <g
        className="fill-none stroke-white/50"
        strokeWidth="3"
        strokeDasharray="2 9"
        strokeLinecap="round"
      >
        <path d="M70 230 Q110 140 180 120" />
        <path d="M180 120 Q250 110 300 200" />
        <path d="M300 200 Q370 40 410 70" />
        <path d="M410 70 Q480 80 470 170" />
        <path d="M300 200 Q380 250 470 170" />
      </g>

      {/* ciudades */}
      {cities.map(({ x, y }) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="16" className="fill-white/10" />
          <circle cx={x} cy={y} r="7" className="fill-white" />
        </g>
      ))}

      {/* destino principal */}
      <g transform="translate(410 70)">
        <circle r="26" className="fill-accent/25" />
        <circle r="15" className="fill-accent/40" />
        <circle r="8" className="fill-accent" />
      </g>
    </svg>
  );
}
