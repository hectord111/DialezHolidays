import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";

/** Cabecera clara de las páginas del blog (índice y categorías). */
export default function BlogHeader({
  breadcrumbs,
  eyebrow,
  title,
  intro,
  children,
}: {
  breadcrumbs: { label: string; href?: string }[];
  eyebrow: string;
  title: string;
  intro: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="bg-sand">
      <div className="container py-14 md:py-20">
        <Breadcrumbs items={breadcrumbs} />
        <span className="eyebrow mt-10">{eyebrow}</span>
        <h1 className="mt-5 max-w-4xl text-5xl font-medium leading-[1.05] text-ocean md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{intro}</p>
        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  );
}
