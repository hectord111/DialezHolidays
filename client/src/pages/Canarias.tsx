/**
 * CANARIAS — gestión de alquiler vacacional en Canarias
 * Ruta: /canarias
 * Palabras clave: gestión alquiler vacacional Canarias, gestora Airbnb
 * Canarias, empresa gestión vivienda vacacional Canarias.
 */
import { ArrowRight, Landmark, Plane, Sun, Waves } from "lucide-react";
import { getPostCard } from "@/blog/posts";
import BlogHighlights from "@/components/BlogHighlights";
import FaqSection from "@/components/FaqSection";
import FinalCta from "@/components/FinalCta";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ZoneCards from "@/components/ZoneCards";
import { MANAGEMENT_FEE_PERCENT } from "@/lib/contact";

const WHY = [
  {
    icon: Sun,
    title: "Un destino de invierno",
    text: "Mientras la mayoría de destinos de playa de Europa cierran la temporada en octubre, Canarias vive su mejor momento con los viajeros del norte de Europa que buscan sol.",
  },
  {
    icon: Plane,
    title: "Muy bien conectada",
    text: "Vuelos directos con la península y con muchas ciudades europeas, y conexiones entre islas por mar y aire.",
  },
  {
    icon: Waves,
    title: "Un huésped muy variado",
    text: "Familias, parejas, deportistas, nómadas digitales y estancias largas de invierno: cada isla y cada zona tiene su público.",
  },
  {
    icon: Landmark,
    title: "Una normativa propia",
    text: "La vivienda vacacional en Canarias se rige por una ley autonómica específica, con competencias de Cabildos y ayuntamientos. Conocerla evita sanciones.",
  },
];

const RULES = [
  {
    title: "Ley 6/2025 de ordenación sostenible del uso turístico de viviendas",
    text: "Convierte el uso turístico en un uso condicionado: solo se admiten nuevas viviendas vacacionales donde el planeamiento municipal lo permita, con límites por municipio.",
  },
  {
    title: "Declaración responsable ante el Cabildo",
    text: "La actividad se inicia con una declaración responsable ante el Cabildo de cada isla y la inscripción en el Registro General Turístico de Canarias, que da el número VV que debe figurar en los anuncios.",
  },
  {
    title: "Vigencia limitada",
    text: "La declaración responsable tiene una vigencia máxima (cinco años en islas como Tenerife o Gran Canaria), así que hay que planificar su renovación.",
  },
  {
    title: "Comunidad de propietarios",
    text: "En edificios, las altas nuevas requieren el acuerdo expreso de la comunidad por mayoría de tres quintos y la ley canaria impide la actividad si los estatutos la prohíben.",
  },
  {
    title: "Registro de viajeros e impuestos",
    text: "Cada estancia se comunica al Ministerio del Interior y la actividad tributa por IGIC y por IRPF o IRNR según tu residencia fiscal.",
  },
];

const CANARIAS_FAQS = [
  {
    question: "¿En qué islas gestionáis viviendas vacacionales?",
    answer:
      "Nuestro equipo está en Tenerife, donde gestionamos viviendas en toda la isla. También gestionamos viviendas en Gran Canaria y estudiamos cada caso en el resto de islas: escríbenos con la ubicación y te respondemos.",
  },
  {
    question: "¿La normativa de vivienda vacacional es igual en todas las islas?",
    answer:
      "La ley autonómica es común para todo el archipiélago, pero cada Cabildo tramita las declaraciones responsables de su isla y cada ayuntamiento decide en su planeamiento dónde se admite el uso turístico, así que la respuesta concreta depende de la ubicación de tu vivienda.",
  },
  {
    question: "¿Cuánto cuesta la gestión de una vivienda vacacional en Canarias?",
    answer: `Desde el ${MANAGEMENT_FEE_PERCENT}% de cada reserva confirmada, sin cuotas fijas ni gastos ocultos. Te preparamos una estimación de ingresos gratuita antes de empezar.`,
  },
  {
    question: "¿Qué impuestos paga el alquiler vacacional en Canarias?",
    answer:
      "En Canarias no se aplica el IVA sino el IGIC, y los ingresos tributan en el IRPF si resides en España o en el IRNR si no. Cada caso depende de tu situación, así que conviene revisarlo con un asesor fiscal antes de la primera reserva.",
  },
];

export default function Canarias() {
  const lawPost = getPostCard("ley-vivienda-vacacional-canarias");
  return (
    <Layout overlay>
      <PageHero
        image="/images/villa-piscina-tenerife.webp"
        imageAlt="Villa moderna con piscina infinita al anochecer en Tenerife, con la isla de La Gomera en el horizonte"
        eyebrow="Islas Canarias"
        title="Gestión de alquiler vacacional en Canarias"
        intro="Somos una gestora de alquiler vacacional y Airbnb con base en Tenerife. Conocemos el mercado, a los huéspedes y la normativa canaria, y nos ocupamos de tu vivienda de principio a fin."
        breadcrumbs={[{ label: "Inicio", href: "/" }, { label: "Canarias" }]}
      >
        <a href="/#calculadora" className="btn btn-gold">
          Calcula tus ingresos <ArrowRight className="h-4 w-4" />
        </a>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Por qué Canarias"
            title="Un mercado vacacional que no se detiene en invierno"
            intro="Canarias es uno de los pocos destinos de sol y playa de Europa con demanda durante todo el año. Para un propietario, eso significa más meses de ingresos, siempre que la vivienda esté bien presentada, bien gestionada y en regla."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map(item => (
              <div key={item.title} className="reveal card p-8">
                <item.icon className="h-8 w-8 text-gold-ink" strokeWidth={1.3} />
                <h3 className="mt-6 text-2xl font-medium text-ocean">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-sand">
        <div className="container grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Normativa"
              title="Las reglas de la vivienda vacacional en Canarias"
              intro={
                <>
                  Un resumen de lo que debes tener en cuenta hoy. Revisamos contigo la situación concreta de tu vivienda antes de publicar ningún anuncio.
                  {lawPost && (
                    <>
                      {" "}
                      Lo explicamos a fondo en nuestra guía sobre la{" "}
                      <a href={`/blog/${lawPost.slug}`} className="font-medium text-gold-ink underline-offset-2 hover:underline">
                        ley de vivienda vacacional de Canarias
                      </a>
                      .
                    </>
                  )}
                </>
              }
            />
          </div>
          <ol className="grid gap-5">
            {RULES.map((rule, i) => (
              <li key={rule.title} className="reveal card flex gap-6 p-7">
                <span className="font-display text-3xl text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-sans text-lg font-semibold text-ocean" style={{ fontFamily: "var(--font-sans)" }}>
                    {rule.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{rule.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Tenerife"
              title="Nuestra base: gestión de viviendas vacacionales en toda Tenerife"
              intro="Tenerife es la isla donde está nuestro equipo y donde conocemos cada zona al detalle."
            />
            <a href="/" className="reveal inline-flex items-center gap-2 text-sm font-semibold text-gold-ink hover:underline">
              Gestión de alquiler vacacional en Tenerife <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-14">
            <ZoneCards />
          </div>
        </div>
      </section>

      <FaqSection faqs={CANARIAS_FAQS} title="Preguntas sobre el alquiler vacacional en Canarias" />

      <BlogHighlights />

      <FinalCta />
    </Layout>
  );
}
