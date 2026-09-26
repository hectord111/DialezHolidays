import { BadgeCheck, BarChart3, Camera, Globe2, KeyRound, LineChart, MessagesSquare, ScrollText, Sparkles, Wrench } from "lucide-react";
import { MANAGEMENT_FEE_PERCENT, whatsappUrl } from "@/lib/contact";
import { trackEvent } from "@/lib/tracking";
import IconList, { type IconItem } from "./IconList";

const INCLUDED: Record<"es" | "en", IconItem[]> = {
  es: [
    { icon: Camera, label: "Fotografía profesional y anuncios" },
    { icon: Globe2, label: "Airbnb, Booking y Vrbo sincronizados" },
    { icon: LineChart, label: "Precios dinámicos cada día" },
    { icon: MessagesSquare, label: "Atención a huéspedes en varios idiomas" },
    { icon: KeyRound, label: "Check-in y check-out" },
    { icon: Sparkles, label: "Limpieza, lavandería y amenities" },
    { icon: Wrench, label: "Mantenimiento con equipo local" },
    { icon: ScrollText, label: "Licencia VV y registro de viajeros" },
    { icon: BadgeCheck, label: "Gestión de reseñas" },
    { icon: BarChart3, label: "Informe mensual de ingresos" },
  ],
  en: [
    { icon: Camera, label: "Professional photos and listings" },
    { icon: Globe2, label: "Airbnb, Booking.com and Vrbo in sync" },
    { icon: LineChart, label: "Dynamic pricing every day" },
    { icon: MessagesSquare, label: "Multilingual guest communication" },
    { icon: KeyRound, label: "Check-in and check-out" },
    { icon: Sparkles, label: "Cleaning, laundry and amenities" },
    { icon: Wrench, label: "Maintenance by a local team" },
    { icon: ScrollText, label: "VV licence and guest registration" },
    { icon: BadgeCheck, label: "Review management" },
    { icon: BarChart3, label: "Monthly income report" },
  ],
};

/**
 * The management fee as a single typographic moment, with what it covers.
 * Rendered inside a section: the caller sets the background.
 */
export default function PricingBlock({ lang = "es", showDetailsLink = true }: { lang?: "es" | "en"; showDetailsLink?: boolean }) {
  const en = lang === "en";
  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
      <div className="reveal lg:col-span-5">
        <p className="eyebrow">{en ? "Our fee" : "Lo que cobramos"}</p>
        <p className="mt-8 font-display text-[1rem] font-normal text-ink-500 sm:mt-10">{en ? "From" : "Desde el"}</p>
        <p className="font-display text-[8rem] font-light leading-[0.85] tracking-[-0.04em] text-ink sm:text-[10rem] lg:text-[12rem]">
          {MANAGEMENT_FEE_PERCENT}
          <span className="text-sand-500">%</span>
        </p>
        <p className="label mt-6 text-ink-500">{en ? "of each confirmed booking" : "de cada reserva confirmada"}</p>
        <ul className="mt-10 space-y-3 border-t border-ink/12 pt-8 text-[0.95rem] text-ink-500">
          {(en
            ? ["€0 in fixed monthly fees", "No hidden costs", "Free, no-obligation income estimate"]
            : ["0 € de cuotas fijas mensuales", "Sin gastos ocultos", "Estimación de ingresos gratuita y sin compromiso"]
          ).map(item => (
            <li key={item} className="flex items-center gap-4">
              <span aria-hidden className="h-px w-5 bg-sand-500" /> {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col justify-end lg:col-span-7">
        <div className="reveal">
          <h2 className="display text-[2.05rem] sm:text-5xl">
            {en ? "One fee. Everything that matters, included." : "Una comisión. Todo lo importante, incluido."}
          </h2>
          <p className="mt-6 max-w-xl text-[1.02rem] leading-[1.8] text-ink-500">
            {en
              ? "No bookings, no fee. Our income depends on yours, so we are as interested as you are in filling your calendar at the best price."
              : "Sin reservas, no hay comisión. Nuestros ingresos dependen de los tuyos, así que nos interesa tanto como a ti llenar tu calendario al mejor precio."}
          </p>
          <p className="label mt-10 text-sand-600">{en ? "Included in the management fee" : "Incluido en la comisión de gestión"}</p>
        </div>
        <div className="reveal mt-6 border-t border-ink/12 pt-8">
          <IconList items={INCLUDED[lang]} columns={2} />
        </div>
        <div className="reveal mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-md">
            <p className="text-[0.88rem] leading-relaxed text-ink-500">
              {en
                ? "The property's own running costs (utilities, community fees, IBI, insurance), repairs and replacements, platform fees and taxes are separate from the management fee and are set out in the proposal."
                : "Los gastos propios de la vivienda (suministros, comunidad, IBI, seguro), las reparaciones y reposiciones, las comisiones de las plataformas y los impuestos son independientes de la comisión y se detallan en la propuesta."}
            </p>
            {showDetailsLink && (
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
                <a href="/tarifas" className="text-link">
                  {en ? "Full pricing (ES)" : "Tarifas en detalle"}
                </a>
                <a href={en ? "#calculator" : "/#calculadora"} className="text-link">
                  {en ? "Estimate your income" : "Calcula tus ingresos"}
                </a>
              </div>
            )}
          </div>
          <a
            href={whatsappUrl(
              en
                ? "Hi, I'd like a management proposal for my holiday rental in Tenerife."
                : "Hola, me gustaría recibir una propuesta de gestión para mi vivienda vacacional en Tenerife."
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("Lead", { content_name: "Tarifa" })}
            className="btn btn-ink shrink-0"
          >
            {en ? "Ask for a proposal" : "Pedir propuesta"}
          </a>
        </div>
      </div>
    </div>
  );
}
