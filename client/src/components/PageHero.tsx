import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";

/**
 * Opening of the inner pages: breadcrumbs, eyebrow, light display H1 and
 * intro on ivory, then a wide photograph.
 */
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
    <section className="bg-ivory pt-10 sm:pt-14">
      <div className="container">
        <div className="rise">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-8">
            <p className="eyebrow rise" style={{ "--rise-delay": "100ms" } as React.CSSProperties}>
              {eyebrow}
            </p>
            <h1 className="display rise mt-7 text-[2.5rem] sm:mt-9 sm:text-6xl lg:text-[5rem]" style={{ "--rise-delay": "200ms" } as React.CSSProperties}>
              {title}
            </h1>
          </div>
          <div className="rise lg:col-span-4" style={{ "--rise-delay": "350ms" } as React.CSSProperties}>
            {intro && <p className="text-[1.02rem] leading-[1.8] text-ink-500 sm:text-[1.06rem]">{intro}</p>}
            {children && <div className="mt-8">{children}</div>}
          </div>
        </div>
      </div>
      <div className="rise container mt-14 sm:mt-20" style={{ "--rise-delay": "450ms" } as React.CSSProperties}>
        <div className="relative aspect-[4/3] overflow-hidden bg-sand-200 sm:aspect-[21/9]">
          <img src={image} alt={imageAlt} fetchPriority="high" decoding="async" className="drift absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}
