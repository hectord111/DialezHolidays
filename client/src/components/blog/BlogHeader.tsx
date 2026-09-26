import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";

/** Opening of the blog pages (index and categories). */
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
    <section className="bg-ivory">
      <div className="container pt-10 sm:pt-14">
        <div className="rise">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-8">
            <p className="eyebrow rise" style={{ "--rise-delay": "100ms" } as React.CSSProperties}>
              {eyebrow}
            </p>
            <h1 className="display rise mt-7 text-[2.5rem] sm:mt-9 sm:text-6xl lg:text-[4.6rem]" style={{ "--rise-delay": "200ms" } as React.CSSProperties}>
              {title}
            </h1>
          </div>
          <p className="rise text-[1.02rem] leading-[1.8] text-ink-500 lg:col-span-4" style={{ "--rise-delay": "350ms" } as React.CSSProperties}>
            {intro}
          </p>
        </div>
        {children && <div className="rise mt-14 border-b border-ink/12 pb-0" style={{ "--rise-delay": "450ms" } as React.CSSProperties}>{children}</div>}
      </div>
    </section>
  );
}
