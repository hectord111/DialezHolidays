/**
 * HOME — Gestión de alquiler vacacional en Tenerife
 * Ruta: /
 * Palabras clave: gestión alquiler vacacional Tenerife, gestora Airbnb Tenerife,
 * empresa gestión alquiler vacacional Canarias.
 */
import { getPostCard } from "@/blog/posts";
import BlogHighlights from "@/components/BlogHighlights";
import Comparison from "@/components/Comparison";
import FaqSection from "@/components/FaqSection";
import FinalCta from "@/components/FinalCta";
import IconList from "@/components/IconList";
import IncomeCalculator from "@/components/IncomeCalculator";
import Layout from "@/components/Layout";
import PricingBlock from "@/components/PricingBlock";
import SectionHeading from "@/components/SectionHeading";
import Timeline from "@/components/Timeline";
import ZoneCards from "@/components/ZoneCards";
import { HERO_IMAGES } from "@/data/images";
import { BENEFITS, HOME_FAQS, OUTCOMES, PROCESS, STANDARD } from "@/data/service";
import { MANAGEMENT_FEE_PERCENT, whatsappUrl } from "@/lib/contact";
import { trackEvent } from "@/lib/tracking";

const delay = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as React.CSSProperties;

const HERO_FACTS = [
  { value: `${MANAGEMENT_FEE_PERCENT}%`, label: "Desde, por reserva confirmada" },
  { value: "0 €", label: "De cuotas fijas mensuales" },
  { value: "3", label: "Plataformas: Airbnb, Booking y Vrbo" },
  { value: "Local", label: "Equipo en la isla" },
];

/** Link to a blog post only once it is published (plain text before). */
function PostLink({ slug, children }: { slug: string; children: string }) {
  return getPostCard(slug) ? (
    <a href={`/blog/${slug}`} className="text-ink underline decoration-sand-400 underline-offset-4 hover:decoration-ink">
      {children}
    </a>
  ) : (
    <>{children}</>
  );
}

/** Link to the seasons guide from the "two seasons" block, once it is published. */
function SeasonsLink() {
  const post = getPostCard("temporada-alta-tenerife-precios-alquiler-vacacional");
  if (!post) return null;
  return (
    <a href={`/blog/${post.slug}`} className="text-link mt-8">
      Temporadas y precios, mes a mes
    </a>
  );
}

export default function Home() {
  return (
    <Layout overlay>
      {/* ── HERO: full-bleed Tenerife beach, light wash for the copy ─────── */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ivory">
        <picture>
          <source media="(max-width: 767px)" srcSet={HERO_IMAGES.mobile} type="image/webp" />
          <img
            src={HERO_IMAGES.desktop}
            alt={HERO_IMAGES.alt}
            fetchPriority="high"
            decoding="async"
            width={2400}
            height={1358}
            className="drift absolute inset-0 -z-10 h-full w-full object-cover object-[70%_50%]"
          />
        </picture>
        {/* Legibility: an ivory wash behind the copy and the figures; the photograph stays vivid on the right */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ivory/95 via-ivory/75 to-ivory/10 md:bg-gradient-to-r md:from-ivory md:via-ivory/70 md:to-ivory/0" />
        <div aria-hidden className="absolute inset-0 -z-10 hidden bg-gradient-to-b from-ivory/60 via-transparent to-ivory/40 md:block" />

        <div className="container flex flex-1 flex-col justify-center pb-12 pt-[calc(var(--header-height)+2.5rem)] sm:pb-16 sm:pt-[calc(var(--header-height)+4rem)]">
          <div className="max-w-3xl">
            <h1>
              <span className="eyebrow rise" style={delay(150)}>
                Gestión de alquiler vacacional · Tenerife
              </span>
              <span className="display rise mt-7 block text-[2.55rem] leading-[1.02] sm:mt-9 sm:text-6xl lg:text-[5.4rem]" style={delay(300)}>
                <span className="block">Tu vivienda en Tenerife,</span>
                <span className="block italic text-sea">en las mejores manos.</span>
              </span>
            </h1>
            <p className="rise mt-7 max-w-xl text-[1.02rem] leading-[1.75] text-ink-700 sm:mt-9 sm:text-[1.1rem]" style={delay(500)}>
              Somos tu gestora de Airbnb y alquiler vacacional en la isla. Anuncios, huéspedes, limpieza, mantenimiento, licencia y precios: nos ocupamos
              de todo. Tú solo recibes los ingresos.
            </p>
            <div className="rise mt-9 flex flex-col gap-3 sm:mt-11 sm:flex-row sm:items-center" style={delay(650)}>
              <a href="#calculadora" className="btn btn-ink">
                Calcula tus ingresos
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("Lead", { content_name: "WhatsApp Hero" })}
                className="btn btn-outline bg-ivory/40 backdrop-blur-sm"
              >
                Habla con nosotros por WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="rise border-t border-ink/10 bg-ivory/75 backdrop-blur-md" style={delay(850)}>
          <dl className="container grid grid-cols-2 lg:grid-cols-4">
            {HERO_FACTS.map((fact, i) => (
              <div
                key={fact.label}
                className={`flex flex-col gap-1.5 py-5 sm:gap-2 sm:py-6 lg:py-8 ${i % 2 === 0 ? "pr-5" : "border-l border-ink/10 pl-5 sm:pl-8"} ${
                  i >= 2 ? "border-t border-ink/10 lg:border-t-0" : ""
                } ${i === 2 ? "lg:border-l lg:pl-8" : ""}`}
              >
                <dt className="label order-2 leading-snug text-ink-500">{fact.label}</dt>
                <dd className="order-1 font-display text-[1.75rem] font-light text-ink sm:text-3xl lg:text-4xl">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── LO QUE CAMBIA PARA TI ────────────────────────────────────────── */}
      <section className="section bg-ivory">
        <div className="container">
          <SectionHeading
            eyebrow="Para el propietario"
            title="Lo que cambia para ti."
            intro="Somos una gestora de alquiler vacacional y Airbnb con equipo en Tenerife. Nos encargamos de tu vivienda de principio a fin, con estándar de hotel boutique."
          />
          <ol className="mt-12 grid border-t border-ink/15 sm:mt-16 lg:grid-cols-3">
            {OUTCOMES.map((point, i) => (
              <li
                key={point.title}
                className={`reveal border-b border-ink/15 py-9 sm:py-11 lg:border-b-0 lg:pr-12 ${i > 0 ? "lg:border-l lg:pl-10" : ""}`}
                style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              >
                <span className="icon-frame" aria-hidden>
                  <point.icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.4} />
                </span>
                <h3 className="mt-7 font-display text-[2.1rem] font-light leading-none tracking-[-0.01em] text-ink sm:text-[2.6rem]">{point.title}</h3>
                <p className="mt-4 max-w-xs text-[0.98rem] leading-[1.75] text-ink-500">{point.text}</p>
              </li>
            ))}
          </ol>

          <div className="reveal mt-16 grid gap-6 sm:mt-20 lg:mt-24 lg:grid-cols-12 lg:gap-16">
            <p className="order-2 max-w-xs self-end font-display text-lg font-light italic leading-snug text-ink-500 lg:order-1 lg:col-span-3">
              Cada llegada, como la primera: preparada y presentada con estándar hotelero.
            </p>
            <div className="relative order-1 aspect-[3/2] overflow-hidden bg-sand-200 lg:order-2 lg:col-span-9">
              <img
                src="/images/terraza-vistas-mar-tenerife.webp"
                alt="Terraza de una vivienda vacacional en Tenerife con sofás y desayuno frente a la costa al atardecer"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── VENTAJAS: tú o nosotros ──────────────────────────────────────── */}
      <section id="ventajas" className="section bg-mist">
        <div className="container">
          <SectionHeading eyebrow="Por qué con nosotros" size="xl" title="Las ventajas de que gestionemos tu vivienda." />
          <div className="mt-12 sm:mt-16 lg:mt-20">
            <Comparison items={BENEFITS} />
          </div>
          <a href="/tarifas" className="reveal text-link mt-10">
            Tarifas y todo lo que incluye
          </a>
        </div>
      </section>

      {/* ── EL ESTÁNDAR ─────────────────────────────────────────────────── */}
      <section className="section overflow-hidden bg-ivory">
        <div className="container grid gap-20 lg:grid-cols-12 lg:gap-16">
          <div className="reveal relative self-center lg:col-span-7">
            <div className="relative aspect-[4/3] w-[88%] overflow-hidden bg-sand-200 lg:w-[85%]">
              <img
                src="/images/salon-vistas-mar-tenerife.webp"
                alt="Salón de vivienda vacacional con pared de piedra volcánica y terraza con vistas al mar y palmeras"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-12 right-0 aspect-[4/5] w-[42%] overflow-hidden border-[6px] border-ivory bg-sand-200 sm:border-[10px] lg:-bottom-20">
              <img
                src="/images/apartamento-bienvenida.webp"
                alt="Dormitorio preparado para huéspedes con toallas, cesta de bienvenida y vistas al mar"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center pt-8 lg:col-span-5 lg:pt-0">
            <SectionHeading
              eyebrow="El estándar"
              size="md"
              title="Presentada como un hotel boutique. Cuidada como tu propia casa."
              intro="Preparamos y fotografiamos tu vivienda para que destaque en Airbnb y Booking, y la devolvemos a ese estado después de cada estancia."
            />
            <div className="reveal mt-10 border-t border-ink/10 pt-8">
              <IconList items={STANDARD} />
            </div>
          </div>
        </div>
      </section>

      {/* ── TENERIFE, DOS TEMPORADAS ────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ivory">
        <div className="grid lg:grid-cols-12">
          <div className="relative min-h-[20rem] lg:col-span-7 lg:min-h-[36rem]">
            <img
              src="/images/terraza-atardecer-tenerife.jpg"
              alt="Terraza de una villa en Tenerife con sofás frente al océano al atardecer"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="flex items-center bg-sand-100 px-5 py-20 sm:px-12 lg:col-span-5 lg:px-16">
            <div className="reveal max-w-md">
              <p className="eyebrow">Tenerife, 365 días</p>
              <p className="display mt-8 text-[2rem] italic sm:text-[2.6rem]">En Tenerife no hay una temporada alta: hay dos.</p>
              <p className="mt-6 text-[1rem] leading-[1.8] text-ink-500">
                El invierno, cuando el norte de Europa busca sol, y el verano, con las familias y el turismo nacional. Entre medias, puentes, eventos y el
                Carnaval. Ajustamos precio y estancia mínima a cada momento para que tu calendario no se quede a medias.
              </p>
              <SeasonsLink />
            </div>
          </div>
        </div>
      </section>

      {/* ── TARIFA ──────────────────────────────────────────────────────── */}
      <section id="tarifas" className="section bg-ivory-50">
        <div className="container">
          <PricingBlock />
        </div>
      </section>

      {/* ── CALCULADORA ─────────────────────────────────────────────────── */}
      <section id="calculadora" className="section border-y border-ink/10 bg-sand-100">
        <div className="container grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Calculadora"
              title="¿Cuánto puede generar tu vivienda en Tenerife?"
              intro="Mueve el precio por noche y la ocupación para ver cuánto te quedaría después de nuestra comisión. Para una cifra ajustada a tu vivienda, pídenos la estimación gratuita: la preparamos con datos de viviendas comparables de tu zona."
            />
          </div>
          <div className="reveal lg:col-span-7">
            <IncomeCalculator />
          </div>
        </div>
      </section>

      {/* ── PROCESO ─────────────────────────────────────────────────────── */}
      <section id="como-funciona" className="section bg-ivory">
        <div className="container">
          <SectionHeading eyebrow="El proceso" size="xl" title="De tu llave a tu primera reserva." />
          <div className="mt-14 lg:mt-24">
            <Timeline steps={PROCESS} />
          </div>
        </div>
      </section>

      {/* ── ZONAS ───────────────────────────────────────────────────────── */}
      <section id="zonas" className="section bg-mist">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Toda la isla"
              title="Gestión de alquiler vacacional en toda Tenerife."
              intro="Del lujo de Costa Adeje al encanto de Puerto de la Cruz: cada zona tiene su huésped, su temporada y sus reglas. Las conocemos."
            />
            <a href="/canarias" className="reveal text-link">
              ¿Otra isla? Gestión en Canarias
            </a>
          </div>
          <div className="mt-14 sm:mt-20">
            <ZoneCards />
          </div>
        </div>
      </section>

      {/* ── NORMATIVA ───────────────────────────────────────────────────── */}
      <section className="bg-ivory pt-20 sm:pt-28">
        <div className="container">
          <div className="reveal grid gap-8 border-y border-ink/15 py-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-4">
              <p className="eyebrow">Normativa</p>
              <h2 className="display mt-6 text-[1.9rem] sm:text-[2.4rem]">La ley canaria, de nuestra cuenta.</h2>
            </div>
            <p className="text-[1rem] leading-[1.8] text-ink-500 lg:col-span-5">
              La <PostLink slug="ley-vivienda-vacacional-canarias">Ley 6/2025 de vivienda vacacional de Canarias</PostLink> ha cambiado las reglas: el uso
              turístico depende del planeamiento de cada ayuntamiento, la declaración responsable caduca y la comunidad tiene más peso. Revisamos tu caso, te
              ayudamos con la licencia VV y cumplimos con el registro de viajeros en cada estancia.
            </p>
            <div className="lg:col-span-3 lg:text-right">
              <a
                href={whatsappUrl("Hola, tengo dudas sobre la licencia de vivienda vacacional de mi vivienda en Tenerife.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("Lead", { content_name: "Licencia" })}
                className="btn btn-outline"
              >
                Consultar mi licencia
              </a>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        faqs={HOME_FAQS}
        className="bg-ivory"
        title="Preguntas sobre la gestión de tu vivienda vacacional."
        intro="Si tienes cualquier otra duda, escríbenos por WhatsApp y te respondemos personalmente."
      />

      <BlogHighlights className="border-t border-ink/10 bg-ivory-50" title="Guías para propietarios de viviendas vacacionales." />

      <FinalCta />
    </Layout>
  );
}
