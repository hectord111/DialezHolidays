import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { ZONES } from "@/data/zones";
import { DEFAULT_WHATSAPP_TEXT, PHONE_E164 } from "@/lib/contact";
import { trackEvent } from "@/lib/tracking";

const TEXT = {
  es: {
    zone: "¿Dónde está tu vivienda?",
    otherTenerife: "Otra zona de Tenerife",
    otherIsland: "Otra isla de Canarias",
    type: "Tipo de vivienda",
    types: ["Estudio o 1 dormitorio", "2 dormitorios", "3 o más dormitorios", "Villa o casa con piscina"],
    licence: "¿Tiene licencia de vivienda vacacional (VV)?",
    licences: ["Sí, ya tiene número VV", "Todavía no", "No lo sé"],
    name: "Tu nombre",
    namePlaceholder: "Opcional",
    submit: "Pedir estimación por WhatsApp",
    privacy: "Se abrirá WhatsApp con tu mensaje listo para enviar. Sin compromiso.",
    message: (f: Fields) =>
      `Hola${f.name ? `, soy ${f.name}` : ""}. Quiero una estimación de ingresos para mi vivienda vacacional.\n• Zona: ${f.zone}\n• Vivienda: ${f.type}\n• Licencia VV: ${f.licence}`,
  },
  en: {
    zone: "Where is your property?",
    otherTenerife: "Another area of Tenerife",
    otherIsland: "Another Canary Island",
    type: "Property type",
    types: ["Studio or 1 bedroom", "2 bedrooms", "3+ bedrooms", "Villa or house with pool"],
    licence: "Does it have a holiday rental licence (VV)?",
    licences: ["Yes, it has a VV number", "Not yet", "I don't know"],
    name: "Your name",
    namePlaceholder: "Optional",
    submit: "Request an estimate on WhatsApp",
    privacy: "WhatsApp will open with your message ready to send. No commitment.",
    message: (f: Fields) =>
      `Hi${f.name ? `, I'm ${f.name}` : ""}. I'd like an income estimate for my holiday rental.\n• Area: ${f.zone}\n• Property: ${f.type}\n• VV licence: ${f.licence}`,
  },
};

interface Fields {
  zone: string;
  type: string;
  licence: string;
  name: string;
}

const fieldClass =
  "w-full appearance-none rounded-xl border border-border bg-white px-4 py-3.5 text-[0.95rem] text-foreground outline-none transition-colors focus:border-gold-ink";

/**
 * Formulario de estimación: compone un mensaje de WhatsApp con los datos de
 * la vivienda (no guarda nada en ningún servidor). Sin JavaScript, envía el
 * mensaje genérico.
 */
export default function EstimateForm({ lang = "es" }: { lang?: "es" | "en" }) {
  const t = TEXT[lang];
  const [fields, setFields] = useState<Fields>({
    zone: ZONES[0].name,
    type: t.types[0],
    licence: t.licences[0],
    name: "",
  });
  const set = (key: keyof Fields) => (e: { target: { value: string } }) => setFields(f => ({ ...f, [key]: e.target.value }));

  function submit(e: FormEvent) {
    e.preventDefault();
    trackEvent("Lead", { content_name: "Formulario estimación" });
    const url = `https://wa.me/${PHONE_E164.replace("+", "")}?text=${encodeURIComponent(t.message({ ...fields, name: fields.name.trim() }))}`;
    window.open(url, "_blank", "noopener");
  }

  return (
    <form action={`https://wa.me/${PHONE_E164.replace("+", "")}`} method="get" target="_blank" onSubmit={submit} className="grid gap-5">
      <input type="hidden" name="text" value={DEFAULT_WHATSAPP_TEXT} />
      <div className="grid gap-2">
        <label htmlFor="est-zone" className="text-sm font-medium text-ocean">
          {t.zone}
        </label>
        <select id="est-zone" className={fieldClass} value={fields.zone} onChange={set("zone")}>
          {ZONES.map(zone => (
            <option key={zone.slug}>{zone.name}</option>
          ))}
          <option>{t.otherTenerife}</option>
          <option>{t.otherIsland}</option>
        </select>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="est-type" className="text-sm font-medium text-ocean">
            {t.type}
          </label>
          <select id="est-type" className={fieldClass} value={fields.type} onChange={set("type")}>
            {t.types.map(type => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <label htmlFor="est-name" className="text-sm font-medium text-ocean">
            {t.name}
          </label>
          <input id="est-name" className={fieldClass} value={fields.name} onChange={set("name")} placeholder={t.namePlaceholder} autoComplete="given-name" />
        </div>
      </div>
      <fieldset className="grid gap-3">
        <legend className="mb-2 text-sm font-medium text-ocean">{t.licence}</legend>
        <div className="flex flex-wrap gap-2">
          {t.licences.map(option => (
            <label
              key={option}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                fields.licence === option ? "border-ocean bg-ocean text-white" : "border-border bg-white text-foreground hover:border-gold-ink"
              }`}
            >
              <input type="radio" name="licence" value={option} checked={fields.licence === option} onChange={set("licence")} className="sr-only" />
              {option}
            </label>
          ))}
        </div>
      </fieldset>
      <button type="submit" className="btn btn-ocean mt-2 w-full">
        {t.submit} <ArrowRight className="h-4 w-4" />
      </button>
      <p className="text-center text-xs text-muted-foreground">{t.privacy}</p>
    </form>
  );
}
