import type { ReactNode } from "react";

/** Eyebrow dorado + H2 + entradilla, alineado a la izquierda o centrado. */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
  light = false,
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
  light?: boolean;
  id?: string;
}) {
  return (
    <div className={`reveal ${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      <span className={`eyebrow ${light ? "eyebrow-light" : ""} ${center ? "justify-center" : ""}`}>{eyebrow}</span>
      <h2
        id={id}
        className={`mt-5 text-4xl font-medium leading-[1.08] md:text-5xl lg:text-[3.5rem] ${light ? "text-white" : "text-ocean"}`}
      >
        {title}
      </h2>
      {intro && <p className={`mt-6 text-lg leading-relaxed ${light ? "text-white/70" : "text-muted-foreground"}`}>{intro}</p>}
    </div>
  );
}
