import { CATEGORIES } from "@/blog/categories";
import { ZONES, zonePath } from "@/data/zones";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF, whatsappUrl } from "@/lib/contact";
import Logo from "./Logo";

function Column({ title, links }: { title: string; links: { href: string; label: string; strong?: boolean }[] }) {
  return (
    <div>
      <p className="label text-sand-600">{title}</p>
      <ul className="mt-6 space-y-3">
        {links.map(link => (
          <li key={link.href}>
            <a href={link.href} className={`text-[0.92rem] transition-colors hover:text-ink ${link.strong ? "font-semibold text-ink" : "text-ink-500"}`}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SiteFooter({ lang = "es" }: { lang?: "es" | "en" }) {
  const en = lang === "en";
  return (
    <footer className="border-t border-ink/10 bg-ivory">
      <div className="container py-16 lg:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-16">
          <div>
            <a href={en ? "/en" : "/"} aria-label="Dialez Holidays">
              <Logo />
            </a>
            <p className="mt-7 max-w-sm text-[0.95rem] leading-[1.75] text-ink-500">
              {en
                ? "Full-service holiday rental management in Tenerife. From 15% of each confirmed booking, with no fixed fees."
                : "Gestión integral de viviendas vacacionales en Tenerife. Desde el 15% de cada reserva confirmada, sin cuotas fijas."}
            </p>
            <ul className="mt-7 space-y-2 text-[0.92rem] text-ink">
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-sea">
                  WhatsApp · {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={PHONE_HREF} className="hover:text-sea">
                  {en ? "Phone" : "Teléfono"} · {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="hover:text-sea">
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>

          <Column
            title={en ? "Areas" : "Zonas de Tenerife"}
            links={ZONES.map(zone => ({ href: zonePath(zone.slug), label: zone.name }))}
          />
          <Column
            title={en ? "Service" : "Servicio"}
            links={[
              { href: "/", label: en ? "Management in Tenerife (ES)" : "Gestión de alquiler vacacional" },
              { href: "/tarifas", label: en ? "Pricing (ES)" : "Tarifas" },
              { href: "/canarias", label: en ? "Canary Islands (ES)" : "Gestión en Canarias" },
              { href: "/en", label: "Holiday rental management (EN)" },
            ]}
          />
          <Column
            title="Blog"
            links={[
              ...CATEGORIES.map(category => ({ href: `/blog/categoria/${category.slug}`, label: category.name })),
              { href: "/blog", label: en ? "All articles (ES)" : "Todos los artículos", strong: true },
            ]}
          />
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink/10 pt-8 text-[0.8rem] text-ink-400 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} Dialez Holidays · {en ? "A brand of " : "Una marca de "}
            <a href="https://dialezproperties.es/" className="underline-offset-4 hover:text-ink hover:underline">
              Dialez Properties
            </a>
          </span>
          <span className="flex gap-6">
            <a href="/blog/rss.xml" className="hover:text-ink">
              RSS
            </a>
            <a href="/politica-privacidad" className="hover:text-ink">
              {en ? "Privacy policy" : "Política de privacidad"}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
