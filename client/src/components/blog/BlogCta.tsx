import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { getZone, zonePath, type ZoneSlug } from "@/data/zones";
import { MANAGEMENT_FEE_PERCENT, PHONE_DISPLAY, PHONE_HREF, whatsappUrl } from "@/lib/contact";
import { trackEvent } from "@/lib/tracking";

/** Contact block shown at the end of each article (and in its sidebar, compact). */
export default function BlogCta({ zone: zoneSlug, compact = false }: { zone?: ZoneSlug; compact?: boolean }) {
  const zone = zoneSlug ? getZone(zoneSlug) : undefined;
  const where = zone ? `en ${zone.name}` : "en Tenerife";
  const title = `¿Tienes una vivienda vacacional ${where}?`;
  const text = `Nos ocupamos de todo: anuncios en Airbnb, Booking y Vrbo, huéspedes, check-in, limpieza, mantenimiento, licencia y precios dinámicos. Desde el ${MANAGEMENT_FEE_PERCENT}% por reserva y sin cuotas fijas.`;
  const whatsapp = whatsappUrl(`Hola, vengo del blog de Dialez Holidays y me interesa la gestión de mi vivienda vacacional ${where}.`);
  const pageHref = zone ? zonePath(zone.slug) : "/";
  const pageLabel = zone ? `Gestión de alquiler vacacional en ${zone.name}` : "Gestión de alquiler vacacional en Tenerife";

  if (compact) {
    return (
      <aside className="rounded-[1.5rem] bg-ocean p-7 text-white">
        <p className="font-display text-2xl font-medium leading-snug">{title}</p>
        <p className="mb-6 mt-3 text-sm leading-relaxed text-white/70">{text}</p>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("Lead", { content_name: "WhatsApp Blog Sidebar" })}
          className="btn btn-gold w-full !py-3 text-sm"
        >
          <MessageCircle className="h-4 w-4" /> Estimación gratuita
        </a>
        <a href={pageHref} className="mt-4 flex items-center justify-center gap-1.5 text-sm text-white/75 hover:text-white">
          {pageLabel} <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </aside>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-ocean px-7 py-12 text-white md:px-14 md:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full"
        style={{ background: "radial-gradient(circle, oklch(0.8 0.09 80 / 0.25), transparent 70%)" }}
      />
      <span className="eyebrow eyebrow-light relative">Dialez Holidays</span>
      <h2 className="relative mt-5 text-3xl font-medium leading-tight md:text-5xl">{title}</h2>
      <p className="relative mt-5 max-w-2xl leading-relaxed text-white/75">{text}</p>
      <div className="relative mt-9 flex flex-wrap gap-3">
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("Lead", { content_name: "WhatsApp Blog CTA" })}
          className="btn btn-gold"
        >
          <MessageCircle className="h-5 w-5" /> Calcular mis ingresos
        </a>
        <a href={PHONE_HREF} onClick={() => trackEvent("Contact", { content_name: "Llamar Blog CTA" })} className="btn btn-ghost-light">
          <Phone className="h-5 w-5" /> {PHONE_DISPLAY}
        </a>
        <a href={pageHref} className="inline-flex items-center gap-2 px-2 py-3 font-semibold text-white/85 hover:text-white">
          {pageLabel} <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
