import { getZone, zonePath, type ZoneSlug } from "@/data/zones";
import { MANAGEMENT_FEE_PERCENT, PHONE_DISPLAY, PHONE_HREF, whatsappUrl } from "@/lib/contact";
import { trackEvent } from "@/lib/tracking";

/** Contact block at the end of each article (and in its sidebar, compact). */
export default function BlogCta({ zone: zoneSlug, compact = false }: { zone?: ZoneSlug; compact?: boolean }) {
  const zone = zoneSlug ? getZone(zoneSlug) : undefined;
  const where = zone ? `en ${zone.name}` : "en Tenerife";
  const title = `¿Tienes una vivienda vacacional ${where}?`;
  const text = `Nos ocupamos de todo: anuncios en Airbnb, Booking y Vrbo, huéspedes, check-in, limpieza, mantenimiento, licencia y precios dinámicos. Desde el ${MANAGEMENT_FEE_PERCENT}% por reserva y sin cuotas fijas.`;
  const whatsapp = whatsappUrl(`Hola, vengo del blog de Dialez Holidays y me interesa la gestión de mi vivienda vacacional ${where}.`);
  const pageHref = zone ? zonePath(zone.slug) : "/";
  const pageLabel = zone ? `Gestión en ${zone.name}` : "Gestión de alquiler vacacional";

  if (compact) {
    return (
      <aside className="border border-ink/12 bg-sand-100 p-7">
        <p className="eyebrow">Dialez Holidays</p>
        <p className="mt-5 font-display text-2xl font-normal leading-snug text-ink">{title}</p>
        <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-500">{text}</p>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("Lead", { content_name: "WhatsApp Blog Sidebar" })}
          className="btn btn-ink mt-6 w-full !min-h-12"
        >
          Estimación gratuita
        </a>
        <a href={pageHref} className="text-link mt-5">
          {pageLabel}
        </a>
      </aside>
    );
  }

  return (
    <section className="border-y border-ink/15 bg-sand-100 px-6 py-12 sm:px-12 sm:py-14">
      <p className="eyebrow">Dialez Holidays</p>
      <h2 className="display mt-6 text-[2rem] sm:text-[2.6rem]">{title}</h2>
      <p className="mt-5 max-w-2xl leading-[1.8] text-ink-500">{text}</p>
      <div className="mt-9 flex flex-wrap items-center gap-4">
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("Lead", { content_name: "WhatsApp Blog CTA" })} className="btn btn-ink">
          Calcular mis ingresos
        </a>
        <a href={PHONE_HREF} onClick={() => trackEvent("Contact", { content_name: "Llamar Blog CTA" })} className="btn btn-outline">
          {PHONE_DISPLAY}
        </a>
      </div>
      <a href={pageHref} className="text-link mt-8">
        {pageLabel}
      </a>
    </section>
  );
}
