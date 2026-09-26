import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { MANAGEMENT_FEE_PERCENT, whatsappUrl } from "@/lib/contact";
import { formatEn, formatEs } from "@/lib/format";
import { trackEvent } from "@/lib/tracking";

const TEXT = {
  es: {
    rate: "Precio medio por noche",
    occupancy: "Ocupación media",
    perMonth: "al mes",
    bookings: "Ingresos por reservas",
    fee: `Nuestra gestión (${MANAGEMENT_FEE_PERCENT}%)`,
    net: "Para ti",
    yearly: "Al año, para ti",
    nights: "noches ocupadas al mes",
    cta: "Quiero una estimación real",
    note: "Cálculo orientativo con los valores que elijas, antes de los gastos propios de la vivienda, las comisiones de las plataformas y los impuestos. La estimación real depende de la zona, el tamaño, el estado de la vivienda y la temporada: te la preparamos gratis.",
    whatsapp: (rate: number, occ: number) =>
      `Hola, he usado la calculadora de Dialez Holidays (${rate} €/noche, ${occ}% de ocupación) y quiero una estimación real para mi vivienda en Tenerife.`,
  },
  en: {
    rate: "Average nightly rate",
    occupancy: "Average occupancy",
    perMonth: "per month",
    bookings: "Booking revenue",
    fee: `Our management (${MANAGEMENT_FEE_PERCENT}%)`,
    net: "For you",
    yearly: "Per year, for you",
    nights: "nights booked per month",
    cta: "Get a real estimate",
    note: "Indicative calculation with the values you choose, before the property's own running costs, platform fees and taxes. The real figure depends on the area, size, condition of the property and season: we will prepare it for free.",
    whatsapp: (rate: number, occ: number) =>
      `Hi, I used the Dialez Holidays calculator (€${rate}/night, ${occ}% occupancy) and I'd like a real estimate for my property in Tenerife.`,
  },
};

function Slider({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
  id,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  id: string;
}) {
  const fill = `${((value - min) / (max - min)) * 100}%`;
  return (
    <div>
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-white/70">
          {label}
        </label>
        <output htmlFor={id} className="font-display text-3xl font-semibold text-white">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        className="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ "--fill": fill } as React.CSSProperties}
      />
    </div>
  );
}

/**
 * Calculadora de ingresos: el propietario elige precio por noche y ocupación
 * y ve cuánto le quedaría tras nuestra comisión. No publica cifras de mercado:
 * los valores iniciales son solo un ejemplo editable.
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
    <div className="glass rounded-[2rem] p-6 sm:p-10">
      <div className="grid gap-10">
        <Slider id="calc-rate" label={t.rate} value={rate} display={money(rate)} min={40} max={450} step={5} onChange={setRate} />
        <Slider id="calc-occupancy" label={t.occupancy} value={occupancy} display={`${occupancy}%`} min={30} max={95} step={5} onChange={setOccupancy} />
      </div>

      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-3">
        <div className="bg-ocean-deep/60 p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-white/50">{t.bookings}</p>
          <p className="mt-2 font-display text-3xl text-white">{money(gross)}</p>
          <p className="mt-1 text-xs text-white/45">
            {nights} {t.nights}
          </p>
        </div>
        <div className="bg-ocean-deep/60 p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-white/50">{t.fee}</p>
          <p className="mt-2 font-display text-3xl text-white/80">− {money(fee)}</p>
          <p className="mt-1 text-xs text-white/45">{t.perMonth}</p>
        </div>
        <div className="bg-gold/15 p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-gold">{t.net}</p>
          <p className="mt-2 font-display text-4xl font-semibold text-white">{money(net)}</p>
          <p className="mt-1 text-xs text-white/60">
            {t.yearly}: {money(net * 12)}
          </p>
        </div>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-white/50">{t.note}</p>

      <a
        href={whatsappUrl(t.whatsapp(rate, occupancy))}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("Lead", { content_name: "Calculadora" })}
        className="btn btn-gold mt-8 w-full sm:w-auto"
      >
        <MessageCircle className="h-5 w-5" /> {t.cta}
      </a>
    </div>
  );
}
