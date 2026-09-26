/**
 * TARIFAS — cuánto cuesta la gestión de alquiler vacacional
 * Ruta: /tarifas
 * Palabras clave: cuánto cobra una gestora de alquiler vacacional, precio
 * gestión Airbnb Tenerife, comisión gestora vivienda vacacional.
 */
import { Check, Minus } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import FinalCta from "@/components/FinalCta";
import IncomeCalculator from "@/components/IncomeCalculator";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import PricingBlock from "@/components/PricingBlock";
import SectionHeading from "@/components/SectionHeading";
import { MANAGEMENT_FEE_PERCENT } from "@/lib/contact";
import { formatEs } from "@/lib/format";

const COMPARISON: { task: string; alone: string; us: string }[] = [
  { task: "Fotos, anuncios y traducciones", alone: "Tú, o pagas a un fotógrafo aparte", us: "Incluido" },
  { task: "Precio de cada noche", alone: "Revisarlo a mano y adivinar la demanda", us: "Precios dinámicos revisados cada día" },
  { task: "Mensajes y consultas de huéspedes", alone: "Tú, a cualquier hora y en varios idiomas", us: "Incluido, antes, durante y después" },
  { task: "Entradas y salidas", alone: "Tú o alguien de confianza en la isla", us: "Incluido" },
  { task: "Limpieza y lavandería", alone: "Buscar, coordinar y revisar", us: "Coordinación incluida" },
  { task: "Averías e incidencias", alone: "Encontrar profesionales con urgencia", us: "Equipo local que lo resuelve" },
  { task: "Licencia, registro de viajeros y normativa", alone: "Estudiarlo y tramitarlo tú", us: "Te ayudamos y lo cumplimos en cada estancia" },
  { task: "Informe de ingresos", alone: "Hojas de cálculo propias", us: "Informe mensual" },
];

const NOT_INCLUDED = [
  {
    title: "Gastos propios de la vivienda",
    text: "Suministros, internet, comunidad, IBI y seguro del hogar siguen siendo del propietario, igual que si la vivienda estuviera vacía.",
  },
  {
    title: "Reparaciones y reposiciones",
    text: "Los materiales, reparaciones y la reposición de menaje o textiles se facturan aparte, con justificante. Las intervenciones importantes se consultan contigo antes.",
  },
  {
    title: "Comisiones de las plataformas e impuestos",
    text: "Airbnb, Booking y Vrbo cobran su propia comisión según el modelo de tarifa, y la actividad tiene sus impuestos (IGIC, IRPF o IRNR). Te lo explicamos en la propuesta.",
  },
];

const TARIFAS_FAQS = [
  {
    question: "¿Cuánto cuesta vuestra gestión de alquiler vacacional?",
    answer: `Desde el ${MANAGEMENT_FEE_PERCENT}% de cada reserva confirmada. No hay cuotas mensuales fijas ni gastos ocultos: si la vivienda no genera ingresos, no nos pagas nada.`,
  },
  {
    question: "¿Por qué decís «desde» el 15%?",
    answer:
      "Porque cada vivienda es distinta: el tamaño, la ubicación, si tiene piscina o jardín y el nivel de servicio que necesitas influyen en el trabajo que requiere. En la propuesta te indicamos por escrito el porcentaje exacto para tu vivienda.",
  },
  {
    question: "¿La limpieza está incluida en la comisión?",
    answer:
      "Coordinamos la limpieza y la lavandería entre estancias. Su coste se suele repercutir al huésped mediante la tarifa de limpieza de cada reserva; te lo detallamos en la propuesta para tu vivienda.",
  },
  {
    question: "¿Cuándo y cómo cobro mis ingresos?",
    answer: "Recibes una liquidación periódica con el detalle de cada reserva, nuestra comisión y cualquier gasto, junto con el informe mensual de ingresos y ocupación.",
  },
  {
    question: "¿Cuánto cobra normalmente una gestora de alquiler vacacional en Tenerife?",
    answer:
      "La mayoría trabaja con un porcentaje de cada reserva que varía según lo que incluye el servicio. Para comparar, pide siempre por escrito qué está incluido y qué se factura aparte: limpieza, lavandería, fotos, mantenimiento o altas.",
  },
];

/** Ejemplo fijo (el mismo para servidor y cliente) para el desglose. */
const EXAMPLE = { gross: 3000 };

export default function Tarifas() {
  const fee = (EXAMPLE.gross * MANAGEMENT_FEE_PERCENT) / 100;
  return (
    <Layout whatsappText="Hola, me gustaría conocer vuestras tarifas de gestión de alquiler vacacional para mi vivienda en Tenerife.">
      <PageHero
        image="/images/apartamento-bienvenida.webp"
        imageAlt="Dormitorio de una vivienda vacacional en Tenerife preparado para huéspedes, con cesta de bienvenida y toallas"
        eyebrow="Tarifas claras"
        title={
          <>
            Tarifas de gestión de alquiler vacacional en Tenerife: <em className="text-sea">desde el {MANAGEMENT_FEE_PERCENT}%</em>
          </>
        }
        intro="Un único porcentaje sobre cada reserva confirmada, con la gestión completa de tu vivienda incluida. Sin cuotas fijas, sin gastos ocultos y sin sorpresas en la liquidación."
        breadcrumbs={[{ label: "Inicio", href: "/" }, { label: "Tarifas" }]}
      />

      <section className="section bg-ivory">
        <div className="container">
          <PricingBlock showDetailsLink={false} />
        </div>
      </section>

      {/* ── EJEMPLO ─────────────────────────────────────────────────────── */}
      <section className="section bg-sand-100">
        <div className="container grid items-center gap-14 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Un ejemplo sencillo"
              size="md"
              title="Qué significa el 15% en tu liquidación."
              intro={`Si en un mes tus reservas suman ${formatEs(EXAMPLE.gross)} €, nuestra gestión son ${formatEs(fee)} € y el resto es tuyo. Ese porcentaje cubre todo el trabajo de ese mes: anuncios, precios, huéspedes, entradas y salidas, coordinación de limpieza, incidencias e informe.`}
            />
          </div>
          <div className="reveal border border-ink/12 bg-ivory-50 lg:col-span-7">
            {[
              { label: "Reservas confirmadas del mes", value: `${formatEs(EXAMPLE.gross)} €` },
              { label: `Gestión Dialez Holidays (${MANAGEMENT_FEE_PERCENT}%)`, value: `− ${formatEs(fee)} €` },
              { label: "Cuotas fijas", value: "0 €" },
            ].map(row => (
              <div key={row.label} className="flex items-baseline justify-between gap-6 border-b border-ink/10 px-6 py-6 sm:px-10">
                <span className="label text-ink-500">{row.label}</span>
                <span className="font-display text-[1.8rem] font-light text-ink">{row.value}</span>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-6 px-6 py-7 sm:px-10">
              <span className="label text-sand-600">Para ti*</span>
              <span className="font-display text-5xl font-light text-ink">{formatEs(EXAMPLE.gross - fee)} €</span>
            </div>
            <p className="border-t border-ink/10 px-6 py-5 text-[0.8rem] leading-relaxed text-ink-400 sm:px-10">
              *Ejemplo ilustrativo con cifras redondas, antes de los gastos propios de la vivienda, las comisiones de las plataformas y los impuestos.
            </p>
          </div>
        </div>
      </section>

      {/* ── COMPARATIVA ─────────────────────────────────────────────────── */}
      <section className="section bg-ivory">
        <div className="container">
          <SectionHeading
            eyebrow="Tú o nosotros"
            size="xl"
            title="Gestionarla tú mismo o con una gestora."
            intro="Gestionarla por tu cuenta ahorra la comisión, pero no es gratis: te cuesta tiempo, disponibilidad y, muchas veces, ingresos por noches mal vendidas."
          />
          <div className="reveal mt-14 overflow-x-auto border-t border-ink sm:mt-20">
            <table className="w-full min-w-[680px] text-left text-[0.95rem]">
              <thead>
                <tr className="border-b border-ink/25">
                  <th scope="col" className="label py-5 pr-6 font-semibold text-ink">
                    Tarea
                  </th>
                  <th scope="col" className="label py-5 pr-6 font-semibold text-ink-400">
                    Si lo gestionas tú
                  </th>
                  <th scope="col" className="label py-5 font-semibold text-sea">
                    Con Dialez Holidays
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(row => (
                  <tr key={row.task} className="border-b border-ink/10">
                    <th scope="row" className="py-6 pr-6 align-top font-display text-[1.2rem] font-light text-ink">
                      {row.task}
                    </th>
                    <td className="py-6 pr-6 align-top text-ink-400">
                      <span className="flex gap-3">
                        <Minus className="mt-1 h-4 w-4 flex-shrink-0 text-ink-300" strokeWidth={1.5} /> {row.alone}
                      </span>
                    </td>
                    <td className="py-6 align-top text-ink">
                      <span className="flex gap-3">
                        <Check className="mt-1 h-4 w-4 flex-shrink-0 text-sea" strokeWidth={1.8} /> {row.us}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── QUÉ NO INCLUYE ──────────────────────────────────────────────── */}
      <section className="section bg-mist">
        <div className="container">
          <SectionHeading
            eyebrow="Sin letra pequeña"
            title="Lo que no incluye la comisión."
            intro="Preferimos decirlo claro desde el principio. Estos costes existen gestione quien gestione tu vivienda:"
          />
          <ol className="mt-14 grid border-t border-ink/15 lg:grid-cols-3">
            {NOT_INCLUDED.map((item, i) => (
              <li key={item.title} className={`reveal border-b border-ink/15 py-9 lg:border-b-0 lg:pr-10 ${i > 0 ? "lg:border-l lg:pl-10" : ""}`}>
                <p className="label text-sand-600">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-display text-[1.7rem] font-light leading-tight text-ink">{item.title}</h3>
                <p className="mt-4 leading-[1.75] text-ink-500">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── CALCULADORA ─────────────────────────────────────────────────── */}
      <section id="calculadora" className="section bg-ivory">
        <div className="container grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Calculadora"
              title="Haz tus propios números."
              intro="Elige un precio medio por noche y una ocupación y comprueba cuánto te quedaría después de nuestra comisión."
            />
          </div>
          <div className="reveal lg:col-span-7">
            <IncomeCalculator />
          </div>
        </div>
      </section>

      <FaqSection faqs={TARIFAS_FAQS} className="border-t border-ink/10 bg-ivory-50" title="Dudas sobre nuestras tarifas." />

      <FinalCta title="Pide tu propuesta con el porcentaje exacto para tu vivienda." image="/images/salon-vistas-mar-tenerife.webp" />
    </Layout>
  );
}
