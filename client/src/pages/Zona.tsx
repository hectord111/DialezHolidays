/**
 * ZONA — gestión de alquiler vacacional en una zona de Tenerife
 * Rutas: /zonas/<slug> (contenido en data/zones.ts)
 */
import { useLocation } from "wouter";
import { Home as HomeIcon, Scale, Users } from "lucide-react";
import BlogHighlights from "@/components/BlogHighlights";
import FaqSection from "@/components/FaqSection";
import FinalCta from "@/components/FinalCta";
import IconList from "@/components/IconList";
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
    <Layout whatsappText={whatsappText}>
      <PageHero
        image={zone.image}
        imageAlt={zone.imageAlt}
        eyebrow={`${zone.municipality} · Tenerife`}
        title={`Gestión de alquiler vacacional en ${zone.name}`}
        intro={zone.intro[0]}
        breadcrumbs={[{ label: "Inicio", href: "/" }, { label: zone.name }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a
            href={whatsappUrl(whatsappText)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("Lead", { content_name: `WhatsApp zona ${zone.slug}` })}
            className="btn btn-ink"
          >
            Estimación gratuita
          </a>
          <a href="/tarifas" className="btn btn-outline">
            Desde el 15%
          </a>
        </div>
      </PageHero>

      <section className="section bg-ivory">
        <div className="container grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow={`Gestora de Airbnb en ${zone.name}`} size="md" title={`Cómo gestionamos una vivienda vacacional en ${zone.name}.`} />
            <div className="reveal mt-8 space-y-5 text-[1.02rem] leading-[1.8] text-ink-500">
              {zone.intro.slice(1).map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="border-t border-ink/15 lg:col-span-6">
            {[
              { icon: Users, ...zone.guests },
              { icon: HomeIcon, ...zone.properties },
            ].map(block => (
              <div key={block.title} className="reveal flex gap-5 border-b border-ink/15 py-9">
                <span className="icon-frame" aria-hidden>
                  <block.icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.4} />
                </span>
                <div>
                  <h3 className="font-display text-[1.6rem] font-normal leading-tight text-ink">{block.title}</h3>
                  <p className="mt-3 leading-[1.75] text-ink-500">{block.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container">
          <SectionHeading eyebrow="Claves de la zona" size="xl" title={`Lo que marca la diferencia en ${zone.name}.`} />
          <ol className="mt-14 grid gap-px bg-ink/10 sm:mt-16 md:grid-cols-2">
            {zone.keys.map((key, i) => (
              <li key={key.title} className="reveal bg-mist p-7 sm:p-10">
                <p className="label text-sand-600">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-display text-[1.8rem] font-normal leading-tight text-ink">{key.title}</h3>
                <p className="mt-4 leading-[1.75] text-ink-500">{key.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Gestión integral"
              size="md"
              title={`Todo incluido para tu vivienda en ${zone.name}.`}
              intro="El mismo servicio completo en todas nuestras zonas, adaptado al huésped y a la temporada de cada una."
            />
            <div className="reveal mt-10 flex gap-5 border-y border-ink/15 py-8">
              <Scale className="mt-1 h-6 w-6 flex-shrink-0 text-sand-600" strokeWidth={1.3} />
              <div>
                <h3 className="label text-ink">Licencia y normativa en {zone.municipality}</h3>
                <p className="mt-3 text-[0.95rem] leading-[1.75] text-ink-500">{zone.regulation}</p>
              </div>
            </div>
          </div>
          <div className="reveal lg:col-span-7">
            <IconList items={INCLUDED.map(item => ({ icon: item.icon, label: item.title, body: item.text }))} columns={2} />
          </div>
        </div>
      </section>

      <section className="section border-y border-ink/10 bg-ivory-50">
        <div className="container">
          <PricingBlock />
        </div>
      </section>

      <FaqSection faqs={zone.faqs} className="bg-ivory" title={`Preguntas sobre el alquiler vacacional en ${zone.name}.`} />

      <section className="section border-t border-ink/10 bg-mist">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading eyebrow="Otras zonas" size="md" title="También gestionamos viviendas cerca de aquí." />
            <a href="/#zonas" className="reveal text-link">
              Todas las zonas de Tenerife
            </a>
          </div>
          <div className="mt-14">
            <ZoneCards only={zone.nearby} />
          </div>
        </div>
      </section>

      <BlogHighlights zone={zone.slug} className="bg-ivory" />

      <FinalCta title={`Descubre cuánto puede generar tu vivienda en ${zone.name}.`} image={zone.image} />
    </Layout>
  );
}
