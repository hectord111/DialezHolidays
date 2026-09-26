import { Mail, MessageCircle, Phone } from "lucide-react";
import { CATEGORIES } from "@/blog/categories";
import { ZONES, zonePath } from "@/data/zones";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF, whatsappUrl } from "@/lib/contact";
import Logo from "./Logo";

export default function SiteFooter({ lang = "es" }: { lang?: "es" | "en" }) {
  const en = lang === "en";
  return (
    <footer className="bg-ocean-deep text-white">
      <div className="container py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href={en ? "/en" : "/"} aria-label="Dialez Holidays">
              <Logo light />
            </a>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              {en
                ? "Full-service holiday rental management in Tenerife. From 15% per confirmed booking, with no fixed fees."
                : "Gestión integral de viviendas vacacionales en Tenerife. Desde el 15% por reserva confirmada, sin cuotas fijas."}
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/80 hover:text-white">
                  <MessageCircle className="h-4 w-4 text-gold" /> WhatsApp {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={PHONE_HREF} className="flex items-center gap-3 text-white/80 hover:text-white">
                  <Phone className="h-4 w-4 text-gold" /> {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-white/80 hover:text-white">
                  <Mail className="h-4 w-4 text-gold" /> {EMAIL}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-gold">{en ? "Areas" : "Zonas de Tenerife"}</p>
            <ul className="space-y-3 text-sm">
              {ZONES.map(zone => (
                <li key={zone.slug}>
                  <a href={zonePath(zone.slug)} className="text-white/70 transition-colors hover:text-white">
                    {en ? zone.name : `Alquiler vacacional en ${zone.name}`}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-gold">{en ? "Service" : "Servicio"}</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/" className="text-white/70 hover:text-white">
                  Gestión de alquiler vacacional en Tenerife
                </a>
              </li>
              <li>
                <a href="/tarifas" className="text-white/70 hover:text-white">
                  {en ? "Pricing (Spanish)" : "Tarifas de gestión"}
                </a>
              </li>
              <li>
                <a href="/canarias" className="text-white/70 hover:text-white">
                  {en ? "Canary Islands (Spanish)" : "Gestión de alquiler vacacional en Canarias"}
                </a>
              </li>
              <li>
                <a href="/en" className="text-white/70 hover:text-white">
                  Holiday rental management (English)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-gold">Blog</p>
            <ul className="space-y-3 text-sm">
              {CATEGORIES.map(category => (
                <li key={category.slug}>
                  <a href={`/blog/categoria/${category.slug}`} className="text-white/70 hover:text-white">
                    {category.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="/blog" className="font-semibold text-white hover:text-gold">
                  {en ? "All articles (Spanish)" : "Todos los artículos"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} Dialez Holidays ·{" "}
            {en ? "A brand of " : "Una marca de "}
            <a href="https://dialezproperties.es/" className="underline-offset-2 hover:text-white hover:underline">
              Dialez Properties
            </a>
          </span>
          <span className="flex gap-5">
            <a href="/blog/rss.xml" className="hover:text-white">
              RSS
            </a>
            <a href="/politica-privacidad" className="hover:text-white">
              {en ? "Privacy policy" : "Política de privacidad"}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
