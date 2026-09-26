import type { ReactNode } from "react";

/** Eyebrow + light display H2 + optional intro, left-aligned or centred. */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
  id,
  size = "lg",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
  id?: string;
  size?: "md" | "lg" | "xl";
}) {
  const sizes = {
    md: "text-[1.9rem] sm:text-4xl lg:text-[2.9rem]",
    lg: "text-[2.05rem] sm:text-5xl lg:text-[3.6rem]",
    xl: "text-[2.2rem] sm:text-6xl lg:text-7xl",
  };
  return (
    <div className={`reveal ${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      <p className={`eyebrow ${center ? "eyebrow-center" : ""}`}>{eyebrow}</p>
      <h2 id={id} className={`display mt-7 sm:mt-9 ${sizes[size]}`}>
        {title}
      </h2>
      {intro && <p className={`mt-6 text-[1.02rem] leading-[1.8] text-ink-500 sm:mt-8 sm:text-[1.06rem] ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>{intro}</p>}
    </div>
  );
}
