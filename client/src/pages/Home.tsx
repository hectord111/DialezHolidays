/**
 * HOME — Gestión de alquiler vacacional en Tenerife
 * Ruta: /
 * Palabras clave: gestión alquiler vacacional Tenerife, gestora Airbnb Tenerife,
 * empresa gestión alquiler vacacional Canarias.
 */
import { ArrowRight, ChevronDown, MessageCircle, Scale } from "lucide-react";
import { getPostCard } from "@/blog/posts";
import BlogHighlights from "@/components/BlogHighlights";
import FaqSection from "@/components/FaqSection";
import FinalCta from "@/components/FinalCta";
import IncomeCalculator from "@/components/IncomeCalculator";
import Layout from "@/components/Layout";
import PricingBlock from "@/components/PricingBlock";
import SectionHeading from "@/components/SectionHeading";
import ZoneCards from "@/components/ZoneCards";
import { BENEFITS, HOME_FAQS, INCLUDED, PROCESS } from "@/data/service";
import { MANAGEMENT_FEE_PERCENT, whatsappUrl } from "@/lib/contact";
import { trackEvent } from "@/lib/tracking";
import { HERO_IMAGES } from "@/data/images";

/** Link to a blog post only once it is published (plain text before). */
function PostLink({ slug, children }: { slug: string; children: string }) {
  return getPostCard(slug) ? (
    <a href={`/blog/${slug}`} className="font-medium text-gold underline-offset-4 hover:underline">
      {children}
    </a>
  ) : (
    <>{children}</>
  );
}

const HERO_STATS = [
  { value: `${MANAGEMENT_FEE_PERCENT}%`, label: "desde, por reserva confirmada" },
  { value: "0 €", label: "de cuotas fijas mensuales" },
  { value: "3", label: "plataformas: Airbnb, Booking y Vrbo" },
  { value: "Local", label: "equipo en la isla para cada incidencia" },
];

export default function Home() {
  return (
    <Layout overlay>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ocean-deep text-white">
        <picture>
          <source media="(max-width: 767px)" srcSet={HERO_IMAGES.mobile} type="image/webp" />
          <img
            src={HERO_IMAGES.desktop}
            alt={HERO_IMAGES.alt}
            fetchPriority="high"
            decoding="async"
            width={2400}
            height={1358}
            className="animate-slow-zoom absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/85 via-ocean-deep/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/90 via-transparent to-ocean-deep/40" />
        <div className="absolute inset-0 bg-ocean-deep/25 md:hidden" />

        <div className="container relative pb-12 pt-32 md:pb-14">
          <div className="max-w-3xl">
            <h1>
              <span className="eyebrow eyebrow-light animate-fade-up">Gestión de alquiler vacacional en Tenerife</span>
              <span className="animate-fade-up delay-1 mt-6 block font-display text-[2.9rem] font-medium leading-[1.02] sm:text-6xl lg:text-[4.6rem] xl:text-[5rem]">
                Rentabiliza tu vivienda en Tenerife.{" "}
                <em className="font-normal text-gold">Nosotros nos ocupamos de todo.</em>
              </span>
            </h1>
            <p className="animate-fade-up delay-2 mt-7 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
              Somos tu gestora de Airbnb y alquiler vacacional en la isla: anuncios en Airbnb, Booking y Vrbo, huéspedes, limpieza, mantenimiento, licencia y
              precios dinámicos. Tú solo recibes los ingresos.
            </p>
            <div className="animate-fade-up delay-3 mt-9 flex flex-wrap gap-4">
              <a href="#calculadora" className="btn btn-gold">
                Calcula tus ingresos <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("Lead", { content_name: "WhatsApp Hero" })}
                className="btn btn-ghost-light"
              >
                <MessageCircle className="h-5 w-5" /> Hablar por WhatsApp
              </a>
            </div>
          </div>

          <dl className="animate-fade-up delay-4 mt-12 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-4">
            {HERO_STATS.map(stat => (
              <div key={stat.label} className="glass rounded-2xl px-5 py-4">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-3xl font-medium md:text-4xl">{stat.value}</span>
                  <span className="mt-1 block text-xs leading-snug text-white/70">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <a href="#ventajas" aria-label="Ver las ventajas" className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-white/60 hover:text-white md:block">
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </a>
      </section>

      {/* ── VENTAJAS ─────────────────────────────────────────────────────── */}
      <section id="ventajas" className="section scroll-mt-16">
        <div className="container grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Por qué con nosotros"
              title="Las ventajas de que gestionemos tu vivienda vacacional"
              intro="Una vivienda vacacional bien gestionada no es la que tiene más reservas, sino la que consigue más ingresos con menos preocupaciones para su dueño. Para eso existimos."
            />
            <div className="reveal relative mt-12 hidden lg:block">
              <img
                src="/images/apartamento-bienvenida.webp"
                alt="Dormitorio de una vivienda vacacional en Tenerife preparado para huéspedes, con toallas, cesta de bienvenida y vistas al mar"
                loading="lazy"
                decoding="async"
                width={1168}
                height={880}
                className="aspect-[4/3] w-full rounded-[2rem] object-cover"
              />
              <div className="absolute -bottom-8 -right-6 max-w-[15rem] rounded-2xl bg-ocean p-5 text-white shadow-2xl">
                <p className="font-display text-2xl leading-tight">Cada llegada, como la primera.</p>
                <p className="mt-2 text-xs text-white/65">Limpieza profesional, ropa de cama y detalles de bienvenida en cada estancia.</p>
              </div>
            </div>
          </div>

          <ol className="grid gap-x-10 gap-y-14 sm:grid-cols-2">
            {BENEFITS.map((benefit, i) => (
              <li key={benefit.title} className="reveal">
                <div className="flex items-center gap-4">
                  <span className="font-display text-lg text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span className="h-px flex-1 bg-border" />
                  <benefit.icon className="h-6 w-6 text-ocean" strokeWidth={1.4} />
                </div>
                <h3 className="mt-6 text-[1.9rem] font-medium leading-tight text-ocean">{benefit.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{benefit.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── TENERIFE TODO EL AÑO ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ocean-deep text-white">
        <img
          src="/images/terraza-atardecer-tenerife.jpg"
          alt="Terraza de una villa en Tenerife con sofás frente al océano al atardecer"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep via-ocean-deep/70 to-transparent" />
        <div className="container relative py-28 md:py-40">
          <div className="reveal max-w-2xl">
            <span className="eyebrow eyebrow-light">Tenerife, 365 días</span>
            <p className="mt-6 font-display text-4xl font-medium leading-[1.1] md:text-[3.4rem]">
              En Tenerife no hay una temporada alta: hay dos. Una buena gestión aprovecha las dos.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              El invierno, cuando el norte de Europa busca sol, y el verano, con las familias y el turismo nacional. Entre medias, puentes, eventos y el
              Carnaval. Ajustamos precio y estancia mínima a cada momento para que tu calendario no se quede a medias.
            </p>
          </div>
        </div>
      </section>

      {/* ── QUÉ INCLUYE ──────────────────────────────────────────────────── */}
      <section id="servicio" className="section scroll-mt-16 bg-sand">
        <div className="container">
          <SectionHeading
            center
            eyebrow="Gestión integral"
            title="Tu gestora de Airbnb, Booking y Vrbo en Tenerife"
            intro="Todo lo que necesita una vivienda vacacional para funcionar sola, de la primera foto al informe de cada mes."
          />
          <ul className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {INCLUDED.map(item => (
              <li key={item.title} className="reveal bg-background p-7 transition-colors duration-300 hover:bg-card">
                <item.icon className="h-7 w-7 text-gold-ink" strokeWidth={1.4} />
                <h3 className="mt-5 font-sans text-base font-semibold text-ocean" style={{ fontFamily: "var(--font-sans)" }}>
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── TARIFAS ─────────────────────────────────────────────────────── */}
      <section id="tarifas" className="section scroll-mt-16">
        <div className="container">
          <SectionHeading
            center
            eyebrow="Lo que cobramos"
            title="Una tarifa clara: solo cobramos si tú cobras"
            intro="Sin cuotas mensuales, sin costes de alta ocultos y sin letra pequeña. Un porcentaje de cada reserva confirmada que incluye la gestión completa de tu vivienda."
          />
          <div className="mt-16">
            <PricingBlock />
          </div>
        </div>
      </section>

      {/* ── CALCULADORA ─────────────────────────────────────────────────── */}
      <section id="calculadora" className="relative scroll-mt-16 overflow-hidden bg-ocean text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-0 h-[36rem] w-[36rem] rounded-full"
          style={{ background: "radial-gradient(circle, oklch(0.72 0.09 195 / 0.25), transparent 65%)" }}
        />
        <div className="container relative grid items-center gap-14 py-24 md:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            light
            eyebrow="Calculadora"
            title="¿Cuánto puede generar tu vivienda en Tenerife?"
            intro={
              <>
                Mueve el precio por noche y la ocupación para ver cuánto te quedaría después de nuestra comisión. Para una cifra ajustada a tu vivienda,
                pídenos la estimación gratuita: la preparamos con datos de viviendas comparables de tu zona.
              </>
            }
          />
          <div className="reveal">
            <IncomeCalculator />
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ───────────────────────────────────────────────── */}
      <section id="como-funciona" className="section scroll-mt-16">
        <div className="container">
          <SectionHeading eyebrow="Cómo funciona" title="De tu llave a tu primera reserva, en cuatro pasos" />
          <ol className="relative mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <span aria-hidden className="absolute left-0 right-0 top-[1.9rem] hidden h-px bg-gradient-to-r from-gold via-gold/40 to-transparent lg:block" />
            {PROCESS.map(step => (
              <li key={step.step} className="reveal relative">
                <span className="relative flex h-[3.8rem] w-[3.8rem] items-center justify-center rounded-full border border-gold bg-background font-display text-2xl text-gold-ink">
                  {step.step}
                </span>
                <h3 className="mt-7 text-3xl font-medium text-ocean">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── ZONAS ───────────────────────────────────────────────────────── */}
      <section id="zonas" className="section scroll-mt-16 bg-sand">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Toda la isla"
              title="Gestión de alquiler vacacional en toda Tenerife"
              intro="Del lujo de Costa Adeje al encanto de Puerto de la Cruz: cada zona tiene su huésped, su temporada y sus reglas. Las conocemos."
            />
            <a href="/canarias" className="reveal inline-flex items-center gap-2 text-sm font-semibold text-gold-ink hover:underline">
              ¿Otra isla? Gestión en Canarias <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-14">
            <ZoneCards />
          </div>
        </div>
      </section>

      {/* ── NORMATIVA ───────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="reveal grid items-center gap-10 rounded-[2rem] border border-border bg-card p-8 sm:p-12 lg:grid-cols-[auto_1fr_auto] lg:gap-14">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-sand">
              <Scale className="h-9 w-9 text-gold-ink" strokeWidth={1.3} />
            </span>
            <div>
              <h2 className="text-3xl font-medium leading-tight text-ocean md:text-4xl">La normativa canaria, de nuestra cuenta</h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
                La <PostLink slug="ley-vivienda-vacacional-canarias">Ley 6/2025 de vivienda vacacional de Canarias</PostLink> ha cambiado las reglas: el uso
                turístico depende del planeamiento de cada ayuntamiento, la declaración responsable caduca y las comunidades de propietarios tienen más peso.
                Revisamos la situación de tu vivienda, te ayudamos con la licencia VV y cumplimos cada estancia con el registro de viajeros.
              </p>
            </div>
            <a
              href={whatsappUrl("Hola, tengo dudas sobre la licencia de vivienda vacacional de mi vivienda en Tenerife.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("Lead", { content_name: "Licencia" })}
              className="btn btn-ghost-dark"
            >
              Consultar mi licencia
            </a>
          </div>
        </div>
      </section>

      <FaqSection
        faqs={HOME_FAQS}
        title="Preguntas frecuentes sobre la gestión de tu vivienda vacacional"
        intro="Si tienes cualquier otra duda, escríbenos por WhatsApp y te respondemos personalmente."
      />

      <BlogHighlights title="Guías para propietarios de viviendas vacacionales" />

      <FinalCta />
    </Layout>
  );
}
