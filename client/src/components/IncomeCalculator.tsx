import { useState } from "react";
import { MANAGEMENT_FEE_PERCENT, whatsappUrl } from "@/lib/contact";
import { formatEn, formatEs } from "@/lib/format";
import { trackEvent } from "@/lib/tracking";

const TEXT = {
  es: {
    rate: "Precio medio por noche",
    occupancy: "Ocupación media",
    bookings: "Reservas al mes",
    fee: `Gestión (${MANAGEMENT_FEE_PERCENT}%)`,
    net: "Para ti, al mes",
    yearly: "al año",
    nights: "noches ocupadas",
    cta: "Quiero una estimación real",
    note: "Cálculo orientativo con los valores que elijas, antes de los gastos propios de la vivienda, las comisiones de las plataformas y los impuestos. La estimación real depende de la zona, el tamaño, el estado de la vivienda y la temporada: te la preparamos gratis.",
    whatsapp: (rate: number, occ: number) =>
      `Hola, he usado la calculadora de Dialez Holidays (${rate} €/noche, ${occ}% de ocupación) y quiero una estimación real para mi vivienda en Tenerife.`,
  },
  en: {
    rate: "Average nightly rate",
    occupancy: "Average occupancy",
    bookings: "Bookings per month",
    fee: `Management (${MANAGEMENT_FEE_PERCENT}%)`,
    net: "For you, per month",
    yearly: "per year",
    nights: "nights booked",
    cta: "Get a real estimate",
    note: "Indicative calculation with the values you choose, before the property's own running costs, platform fees and taxes. The real figure depends on the area, size, condition of the property and season: we will prepare it for free.",
    whatsapp: (rate: number, occ: number) =>
      `Hi, I used the Dialez Holidays calculator (€${rate}/night, ${occ}% occupancy) and I'd like a real estimate for my property in Tenerife.`,
  },
};

function Slider(props: { id: string; label: string; value: number; display: string; min: number; max: number; step: number; onChange: (v: number) => void }) {
  const fill = `${((props.value - props.min) / (props.max - props.min)) * 100}%`;
  return (
    <div>
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <label htmlFor={props.id} className="label text-ink-500">
          {props.label}
        </label>
        <output htmlFor={props.id} className="font-display text-3xl font-normal text-ink">
          {props.display}
        </output>
      </div>
      <input
        id={props.id}
        type="range"
        className="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={e => props.onChange(Number(e.target.value))}
        style={{ "--fill": fill } as React.CSSProperties}
      />
    </div>
  );
}

/**
 * Income calculator: the owner picks a nightly rate and an occupancy and sees
 * what would be left after our fee. It publishes no market figures: the
 * starting values are just an editable example.
 */
export default function IncomeCalculator({ lang = "es" }: { lang?: "es" | "en" }) {
  const t = TEXT[lang];
  const fmt = lang === "en" ? formatEn : formatEs;
  const money = (n: number) => (lang === "en" ? `€${fmt(n)}` : `${fmt(n)} €`);
  const [rate, setRate] = useState(110);
  const [occupancy, setOccupancy] = useState(70);

  const nights = Math.round((30 * occupancy) / 100);
  const gross = rate * nights;
  const fee = (gross * MANAGEMENT_FEE_PERCENT) / 100;
  const net = gross - fee;

  return (
    <div className="border border-ink/12 bg-ivory-50 p-6 sm:p-10">
      <div className="grid gap-10">
        <Slider id="calc-rate" label={t.rate} value={rate} display={money(rate)} min={40} max={450} step={5} onChange={setRate} />
        <Slider id="calc-occupancy" label={t.occupancy} value={occupancy} display={`${occupancy}%`} min={30} max={95} step={5} onChange={setOccupancy} />
      </div>

      <dl className="mt-10 grid border-t border-ink/12 sm:grid-cols-3">
        <div className="border-b border-ink/12 py-5 sm:border-b-0 sm:pr-5">
          <dt className="label text-ink-400">{t.bookings}</dt>
          <dd className="mt-2 font-display text-[1.8rem] font-normal text-ink">{money(gross)}</dd>
          <dd className="mt-1 text-[0.82rem] text-ink-500">
            {nights} {t.nights}
          </dd>
        </div>
        <div className="border-b border-ink/12 py-5 sm:border-b-0 sm:border-l sm:px-5">
          <dt className="label text-ink-400">{t.fee}</dt>
          <dd className="mt-2 font-display text-[1.8rem] font-normal text-ink-500">− {money(fee)}</dd>
        </div>
        <div className="py-5 sm:border-l sm:pl-5">
          <dt className="label text-sand-600">{t.net}</dt>
          <dd className="mt-2 font-display text-[2.4rem] font-normal leading-none text-ink">{money(net)}</dd>
          <dd className="mt-2 text-[0.82rem] text-ink-500">
            {money(net * 12)} {t.yearly}
          </dd>
        </div>
      </dl>

      <p className="mt-4 border-t border-ink/12 pt-5 text-[0.85rem] leading-relaxed text-ink-500">{t.note}</p>

      <a
        href={whatsappUrl(t.whatsapp(rate, occupancy))}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("Lead", { content_name: "Calculadora" })}
        className="btn btn-ink mt-8 w-full sm:w-auto"
      >
        {t.cta}
      </a>
    </div>
  );
}
