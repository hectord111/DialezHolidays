import { MessageCircle, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF, whatsappUrl } from "@/lib/contact";
import { trackEvent } from "@/lib/tracking";
import EstimateForm from "./EstimateForm";

/** Cierre de página: foto de la villa + formulario de estimación por WhatsApp. */
export default function FinalCta({
  lang = "es",
  title,
  text,
  id = "contacto",
}: {
  lang?: "es" | "en";
  title?: string;
  text?: string;
  id?: string;
}) {
  const en = lang === "en";
  return (
    <section id={id} className="relative overflow-hidden bg-ocean-deep text-white" aria-labelledby={`${id}-title`}>
      <img src="/images/villa-piscina-tenerife.webp" alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep via-ocean-deep/85 to-ocean-deep/40" />
      <div className="container relative grid items-center gap-12 py-24 md:py-32 lg:grid-cols-2 lg:gap-20">
        <div className="reveal">
          <span className="eyebrow eyebrow-light">{en ? "Free estimate" : "Estimación gratuita"}</span>
          <h2 id={`${id}-title`} className="mt-5 text-4xl font-medium leading-[1.05] md:text-6xl">
            {title ?? (en ? "Find out what your property could earn" : "Descubre cuánto puede generar tu vivienda")}
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">
            {text ??
              (en
                ? "Tell us about your property and we will send you a realistic income estimate and a management proposal, free of charge and with no obligation."
                : "Cuéntanos cómo es tu vivienda y te enviamos una estimación realista de ingresos y una propuesta de gestión, gratis y sin compromiso.")}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={whatsappUrl(en ? "Hi, I'd like a free income estimate for my property in Tenerife." : undefined)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("Lead", { content_name: "CTA final WhatsApp" })}
              className="btn btn-whatsapp"
            >
              <MessageCircle className="h-5 w-5" /> WhatsApp
            </a>
            <a href={PHONE_HREF} onClick={() => trackEvent("Contact", { method: "phone_cta" })} className="btn btn-ghost-light">
              <Phone className="h-5 w-5" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
        <div className="reveal rounded-[2rem] bg-background p-6 text-foreground shadow-2xl sm:p-10">
          <p className="font-display text-3xl font-medium text-ocean">{en ? "Your property in 30 seconds" : "Tu vivienda en 30 segundos"}</p>
          <p className="mb-7 mt-2 text-sm text-muted-foreground">
            {en ? "Answer three questions and send them to us on WhatsApp." : "Responde tres preguntas y envíanoslas por WhatsApp."}
          </p>
          <EstimateForm lang={lang} />
        </div>
      </div>
    </section>
  );
}
