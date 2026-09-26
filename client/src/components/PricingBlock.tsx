import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { MANAGEMENT_FEE_PERCENT, whatsappUrl } from "@/lib/contact";
import { trackEvent } from "@/lib/tracking";

const INCLUDED_ES = [
  "Estimación de ingresos y estudio de la licencia",
  "Fotografía profesional y anuncios en varios idiomas",
  "Airbnb, Booking y Vrbo con calendario sincronizado",
  "Precios dinámicos revisados cada día",
  "Atención a huéspedes antes, durante y después",
  "Check-in y check-out",
  "Coordinación de limpieza, lavandería y amenities",
  "Mantenimiento e incidencias con equipo local",
  "Registro de viajeros y ayuda con la licencia VV",
  "Informe mensual de ingresos y ocupación",
];

const INCLUDED_EN = [
  "Income estimate and licence check",
  "Professional photography and multilingual listings",
  "Airbnb, Booking.com and Vrbo with synced calendars",
  "Dynamic pricing reviewed every day",
  "Guest communication before, during and after the stay",
  "Check-in and check-out",
  "Cleaning, laundry and amenities coordination",
  "Maintenance and incidents handled by a local team",
  "Guest registration and VV licence support",
  "Monthly income and occupancy report",
];

/** Tarjeta de precio: la única tarifa publicada (desde el 15% por reserva). */
export default function PricingBlock({ lang = "es", showDetailsLink = true }: { lang?: "es" | "en"; showDetailsLink?: boolean }) {
  const en = lang === "en";
  const included = en ? INCLUDED_EN : INCLUDED_ES;
  return (
    <div className="reveal grid overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_40px_80px_-40px_rgb(16_40_59/0.35)] lg:grid-cols-[0.9fr_1.1fr]">
      <div className="relative flex flex-col justify-between overflow-hidden bg-ocean p-8 text-white sm:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
          style={{ background: "radial-gradient(circle, oklch(0.8 0.09 80 / 0.28), transparent 70%)" }}
        />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">{en ? "Full management" : "Gestión integral"}</p>
          <p className="mt-8 text-sm text-white/70">{en ? "From" : "Desde"}</p>
          <p className="font-display text-[6.5rem] font-medium leading-none tracking-tight sm:text-[8rem]">
            {MANAGEMENT_FEE_PERCENT}
            <span className="align-top text-5xl text-gold sm:text-6xl">%</span>
          </p>
          <p className="mt-4 max-w-xs text-lg text-white/80">
            {en ? "of each confirmed booking. That's all." : "de cada reserva confirmada. Nada más."}
          </p>
        </div>
        <ul className="relative mt-10 grid gap-3 text-sm text-white/80">
          {(en
            ? ["€0 in fixed monthly fees", "No hidden costs", "Free, no-obligation income estimate"]
            : ["0 € de cuotas fijas mensuales", "Sin gastos ocultos", "Estimación de ingresos gratuita y sin compromiso"]
          ).map(item => (
            <li key={item} className="flex items-center gap-3">
              <span className="h-px w-5 bg-gold" /> {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-8 sm:p-12">
        <p className="font-display text-3xl font-medium text-ocean">
          {en ? "We only earn when you earn." : "Solo ganamos si tú ganas."}
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          {en
            ? "No bookings, no fee. Our income depends on yours, so we are as interested as you are in filling your calendar at the best price."
            : "Sin reservas, no hay comisión. Nuestros ingresos dependen de los tuyos, así que nos interesa tanto como a ti llenar tu calendario al mejor precio."}
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {included.map(item => (
            <li key={item} className="flex gap-3 text-[0.95rem] leading-snug text-foreground/85">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-ink" /> {item}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={whatsappUrl(
              en
                ? "Hi, I'd like to know more about your holiday rental management fees in Tenerife."
                : "Hola, me gustaría conocer vuestras condiciones de gestión de alquiler vacacional para mi vivienda."
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("Lead", { content_name: "Tarifa" })}
            className="btn btn-ocean"
          >
            <MessageCircle className="h-5 w-5" /> {en ? "Ask for a proposal" : "Pedir propuesta"}
          </a>
          {showDetailsLink && (
            <a href="/tarifas" className="inline-flex items-center gap-2 text-sm font-semibold text-gold-ink hover:underline">
              {en ? "Full pricing details (Spanish)" : "Ver tarifas en detalle"} <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
