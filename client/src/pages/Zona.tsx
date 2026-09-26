/**
 * ZONA — gestión de alquiler vacacional en una zona de Tenerife
 * Rutas: /zonas/<slug> (contenido en data/zones.ts)
 */
import { useLocation } from "wouter";
import { ArrowRight, Compass, Home as HomeIcon, Scale, Users } from "lucide-react";
import BlogHighlights from "@/components/BlogHighlights";
import FaqSection from "@/components/FaqSection";
import FinalCta from "@/components/FinalCta";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import PricingBlock from "@/components/PricingBlock";
import SectionHeading from "@/components/SectionHeading";
import ZoneCards from "@/components/ZoneCards";
import { INCLUDED } from "@/data/service";
import { getZone } from "@/data/zones";
import { whatsappUrl } from "@/lib/contact";
import { trackEvent } from "@/lib/tracking";
import NotFound from "./NotFound";

export default function Zona() {
  const [location] = useLocation();
  const zone = getZone(location.split("/").filter(Boolean)[1] ?? "");
  if (!zone) return <NotFound />;
  const whatsappText = `Hola, tengo una vivienda en ${zone.name} y me interesa vuestra gestión de alquiler vacacional.`;

  return (
    <Layout overlay whatsappText={whatsappText}>
      <PageHero
        image={zone.image}
        imageAlt={zone.imageAlt}
        eyebrow={`${zone.municipality} · Tenerife`}
        title={`Gestión de alquiler vacacional en ${zone.name}`}
        intro={zone.intro[0]}
        breadcrumbs={[{ label: "Inicio", href: "/" }, { label: zone.name }]}
      >
        <div className="flex flex-wrap gap-4">
          <a
            href={whatsappUrl(whatsappText)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("Lead", { content_name: `WhatsApp zona ${zone.slug}` })}
            className="btn btn-gold"
          >
            Estimación gratuita <ArrowRight className="h-4 w-4" />
          </a>
          <a href="/tarifas" className="btn btn-ghost-light">
            Desde el 15% por reserva
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <div className="reveal">
            <span className="eyebrow">Gestora de Airbnb en {zone.name}</span>
            <h2 className="mt-5 text-4xl font-medium leading-[1.1] text-ocean md:text-5xl">Cómo gestionamos una vivienda vacacional en {zone.name}</h2>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-muted-foreground">
              {zone.intro.slice(1).map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="grid gap-5">
            {[
              { icon: Users, ...zone.guests },
              { icon: HomeIcon, ...zone.properties },
            ].map(block => (
              <div key={block.title} className="reveal card p-8">
                <block.icon className="h-7 w-7 text-gold-ink" strokeWidth={1.3} />
                <h3 className="mt-5 text-2xl font-medium text-ocean">{block.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{block.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ocean text-white">
        <div className="container">
          <SectionHeading light eyebrow="Claves de la zona" title={`Lo que marca la diferencia en ${zone.name}`} />
          <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-white/10 md:grid-cols-2">
            {zone.keys.map((key, i) => (
              <div key={key.title} className="reveal bg-ocean p-8 md:p-10">
                <span className="font-display text-xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-3xl font-medium">{key.title}</h3>
                <p className="mt-3 leading-relaxed text-white/70">{key.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Gestión integral"
            title={`Todo incluido para tu vivienda en ${zone.name}`}
            intro="El mismo servicio completo en todas nuestras zonas, adaptado al huésped y a la temporada de cada una."
          />
          <ul className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED.map(item => (
              <li key={item.title} className="reveal flex gap-4">
                <item.icon className="mt-1 h-6 w-6 flex-shrink-0 text-gold-ink" strokeWidth={1.4} />
                <div>
                  <h3 className="font-sans text-base font-semibold text-ocean" style={{ fontFamily: "var(--font-sans)" }}>
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="reveal mt-16 flex gap-5 rounded-[1.5rem] border border-border bg-sand p-7 md:p-9">
            <Scale className="mt-1 h-7 w-7 flex-shrink-0 text-gold-ink" strokeWidth={1.3} />
            <div>
              <h3 className="font-sans text-lg font-semibold text-ocean" style={{ fontFamily: "var(--font-sans)" }}>
                Licencia y normativa en {zone.municipality}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{zone.regulation}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-sand">
        <div className="container">
          <SectionHeading center eyebrow="Lo que cobramos" title={`Tarifa de gestión en ${zone.name}`} />
          <div className="mt-14">
            <PricingBlock />
          </div>
        </div>
      </section>

      <FaqSection faqs={zone.faqs} title={`Preguntas sobre el alquiler vacacional en ${zone.name}`} />

      <section className="section bg-sand">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading eyebrow="Otras zonas" title="También gestionamos viviendas cerca de aquí" />
            <a href="/#zonas" className="reveal inline-flex items-center gap-2 text-sm font-semibold text-gold-ink hover:underline">
              <Compass className="h-4 w-4" /> Todas las zonas de Tenerife
            </a>
          </div>
          <div className="mt-14">
            <ZoneCards only={zone.nearby} />
          </div>
        </div>
      </section>

      <BlogHighlights zone={zone.slug} />

      <FinalCta title={`Descubre cuánto puede generar tu vivienda en ${zone.name}`} />
    </Layout>
  );
}
