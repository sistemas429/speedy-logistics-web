type Props = {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  dark?: boolean;
};

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "center",
  dark = false,
}: Props) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";
  const titleColor = dark ? "text-white" : "text-ink";
  const subtitleColor = dark ? "text-slate-300" : "text-muted";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {kicker ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF6B00]">
          {kicker}
        </p>
      ) : null}
      <h2
        className={`text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 text-base md:text-lg ${subtitleColor}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}