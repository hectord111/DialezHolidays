import { Plus } from "lucide-react";
import { serializeJsonLd } from "@/seo/head";
import SectionHeading from "./SectionHeading";

export interface FaqEntry {
  question: string;
  answer: string;
}

/**
 * Frequently asked questions with <details> (they work without JavaScript)
 * and their FAQPage structured data, which stays in the prerendered HTML.
 */
export default function FaqSection({
  faqs,
  title = "Preguntas frecuentes",
  eyebrow = "Resolvemos tus dudas",
  intro,
  id = "preguntas-frecuentes",
  className = "",
}: {
  faqs: FaqEntry[];
  title?: string;
  eyebrow?: string;
  intro?: string;
  id?: string;
  className?: string;
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
    <section className={`section ${className}`} aria-labelledby={id}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
      <div className="container grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
          <SectionHeading eyebrow={eyebrow} title={title} intro={intro} id={id} size="md" />
        </div>
        <div className="reveal border-t border-ink/15 lg:col-span-7">
          {faqs.map(faq => (
            <details key={faq.question} className="group border-b border-ink/15">
              <summary className="flex items-start justify-between gap-6 py-6">
                <h3 className="font-display text-[1.25rem] font-normal leading-snug text-ink sm:text-[1.4rem]">{faq.question}</h3>
                <Plus className="mt-1.5 h-4 w-4 flex-shrink-0 text-sand-600 transition-transform duration-300 group-open:rotate-45" strokeWidth={1.4} />
              </summary>
              <p className="max-w-2xl pb-7 pr-10 text-[0.98rem] leading-[1.8] text-ink-500">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
