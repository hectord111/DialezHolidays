import { ZONES, zonePath, type ZoneSlug } from "@/data/zones";

/** Editorial grid of the Tenerife areas: photograph, then caption. */
export default function ZoneCards({ only, headingLevel = "h3", lang = "es" }: { only?: ZoneSlug[]; headingLevel?: "h2" | "h3"; lang?: "es" | "en" }) {
  const zones = only ? ZONES.filter(zone => only.includes(zone.slug)) : ZONES;
  const Heading = headingLevel;
  return (
    <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {zones.map((zone, i) => (
        <li key={zone.slug} className="reveal" style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}>
          <a href={zonePath(zone.slug)} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden bg-sand-200">
              <img
                src={zone.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
            </div>
            <p className="label mt-6 text-sand-600">
              {zone.area} · {zone.municipality.split(" y ")[0]}
            </p>
            <Heading className="mt-3 font-display text-[1.75rem] font-light leading-tight tracking-[-0.01em] text-ink">{zone.name}</Heading>
            {lang === "es" && <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-500">{zone.tagline}</p>}
            <span className="text-link mt-5">{lang === "es" ? "Ver la zona" : "View area (ES)"}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
