import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";

/** Cabecera de las páginas interiores: foto a sangre, migas, H1 y entradilla. */
export default function PageHero({
  image,
  imageAlt,
  eyebrow,
  title,
  intro,
  breadcrumbs,
  children,
}: {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  breadcrumbs: { label: string; href?: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-ocean-deep pb-16 pt-36 text-white md:pb-24">
      <img src={image} alt={imageAlt} fetchPriority="high" decoding="async" className="animate-slow-zoom absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/60 to-ocean-deep/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/70 to-transparent" />
      <div className="container relative">
        <div className="animate-fade-up">
          <Breadcrumbs items={breadcrumbs} light />
        </div>
        <div className="mt-8 max-w-4xl">
          <p className="eyebrow eyebrow-light animate-fade-up delay-1">{eyebrow}</p>
          <h1 className="animate-fade-up delay-2 mt-5 text-5xl font-medium leading-[1.02] md:text-6xl lg:text-7xl">{title}</h1>
          {intro && <p className="animate-fade-up delay-3 mt-7 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">{intro}</p>}
          {children && <div className="animate-fade-up delay-4 mt-9">{children}</div>}
        </div>
      </div>
    </section>
  );
}
