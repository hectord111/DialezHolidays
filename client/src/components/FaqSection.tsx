import { Plus } from "lucide-react";
import { serializeJsonLd } from "@/seo/head";
import SectionHeading from "./SectionHeading";

export interface FaqEntry {
  question: string;
  answer: string;
}

/**
 * Preguntas frecuentes con <details> (funcionan sin JavaScript) y sus datos
 * estructurados FAQPage, que quedan en el HTML prerenderizado.
 */
export default function FaqSection({
  faqs,
  title = "Preguntas frecuentes",
  eyebrow = "Resolvemos tus dudas",
  intro,
  id = "preguntas-frecuentes",
}: {
  faqs: FaqEntry[];
  title?: string;
  eyebrow?: string;
  intro?: string;
  id?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  return (
    <section className="section" aria-labelledby={id}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow={eyebrow} title={title} intro={intro} id={id} />
        </div>
        <div className="reveal divide-y divide-border border-y border-border">
          {faqs.map(faq => (
            <details key={faq.question} className="group py-2">
              <summary className="flex items-start justify-between gap-6 py-5">
                <h3 className="font-sans text-lg font-semibold leading-snug text-ocean md:text-xl" style={{ fontFamily: "var(--font-sans)" }}>
                  {faq.question}
                </h3>
                <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border text-gold-ink transition-transform duration-300 group-open:rotate-45">
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="pb-6 pr-12 leading-relaxed text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
