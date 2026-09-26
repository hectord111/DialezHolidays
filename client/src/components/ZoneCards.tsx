import { ArrowUpRight } from "lucide-react";
import { ZONES, zonePath, type ZoneSlug } from "@/data/zones";

/** Tarjetas de las zonas de Tenerife con enlace a su página. */
export default function ZoneCards({ only, headingLevel = "h3", lang = "es" }: { only?: ZoneSlug[]; headingLevel?: "h2" | "h3"; lang?: "es" | "en" }) {
  const zones = only ? ZONES.filter(zone => only.includes(zone.slug)) : ZONES;
  const Heading = headingLevel;
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {zones.map(zone => (
        <a
          key={zone.slug}
          href={zonePath(zone.slug)}
          className="reveal group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-[1.75rem] p-7 text-white"
        >
          <img
            src={zone.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/95 via-ocean-deep/45 to-ocean-deep/5" />
          <div className="relative">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
              {zone.area}
            </p>
            <Heading className="mt-2 font-display text-3xl font-medium leading-tight">{zone.name}</Heading>
            {lang === "es" && <p className="mt-2 text-sm leading-relaxed text-white/75">{zone.tagline}</p>}
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition-colors group-hover:text-gold">
              {lang === "es" ? `Gestión en ${zone.name.split(" y ")[0]}` : "Read more (Spanish)"} <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
