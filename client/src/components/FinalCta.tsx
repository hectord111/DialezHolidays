import { PHONE_DISPLAY, PHONE_HREF, whatsappUrl } from "@/lib/contact";
import { trackEvent } from "@/lib/tracking";
import EstimateForm from "./EstimateForm";

/** Closing section: photograph + estimate form (sent through WhatsApp). */
export default function FinalCta({
  lang = "es",
  title,
  text,
  id = "contacto",
  image = "/images/villa-piscina-tenerife.webp",
}: {
  lang?: "es" | "en";
  title?: string;
  text?: string;
  id?: string;
  image?: string;
}) {
  const en = lang === "en";
  return (
    <section id={id} className="bg-sand-100" aria-labelledby={`${id}-title`}>
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[22rem] overflow-hidden sm:min-h-[30rem]">
          <img src={image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="px-5 py-20 sm:px-12 lg:px-16 lg:py-28 xl:px-24">
          <div className="reveal max-w-xl">
            <p className="eyebrow">{en ? "Free estimate" : "Estimación gratuita"}</p>
            <h2 id={`${id}-title`} className="display mt-7 text-[2.1rem] sm:mt-9 sm:text-5xl">
              {title ?? (en ? "Let your home earn. Without the noise." : "Deja que tu vivienda rinda. Sin preocupaciones.")}
            </h2>
            <p className="mt-6 text-[1.02rem] leading-[1.8] text-ink-500">
              {text ??
                (en
                  ? "Tell us about your property and we will send you a realistic income estimate and a management proposal, free of charge and with no obligation."
                  : "Cuéntanos cómo es tu vivienda y te enviamos una estimación realista de ingresos y una propuesta de gestión, gratis y sin compromiso.")}
            </p>
          </div>
          <div className="reveal mt-12 max-w-xl border-t border-ink/15 pt-10">
            <EstimateForm lang={lang} />
          </div>
          <div className="reveal mt-10 flex max-w-xl flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={whatsappUrl(en ? "Hi, I'd like a free income estimate for my property in Tenerife." : undefined)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("Lead", { content_name: "CTA final WhatsApp" })}
              className="text-link"
            >
              {en ? "Chat on WhatsApp" : "Hablar por WhatsApp"}
            </a>
            <a href={PHONE_HREF} onClick={() => trackEvent("Contact", { method: "phone_cta" })} className="text-link">
              {en ? "Call" : "Llamar"} · {PHONE_DISPLAY}
            </a>
          </div>
          <p className="label mt-10 text-ink-400">{en ? "No obligation · In person · Clear proposal" : "Sin compromiso · Equipo local · Propuesta clara"}</p>
        </div>
      </div>
    </section>
  );
}
