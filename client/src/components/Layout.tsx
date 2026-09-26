import { useEffect, useState, type ReactNode } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { PHONE_HREF, whatsappUrl } from "@/lib/contact";
import { trackEvent } from "@/lib/tracking";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

/**
 * Phone-only call to action pinned to the bottom of the screen once the
 * visitor has scrolled past the first screen. It replaces the floating
 * WhatsApp bubble on phones (see index.css).
 */
function MobileBar({ lang }: { lang: "es" | "en" }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      data-mobile-cta
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-ivory/92 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl transition-transform duration-500 lg:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-xl items-center gap-2">
        <a
          href={whatsappUrl(
            lang === "en"
              ? "Hi, I'd like a free income estimate for my property in Tenerife."
              : "Hola, me gustaría una estimación de ingresos gratuita para mi vivienda en Tenerife."
          )}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("Lead", { content_name: "Barra móvil" })}
          className="btn btn-ink !min-h-12 flex-1 !px-4 !tracking-[0.14em]"
        >
          <MessageCircle className="h-4 w-4" /> {lang === "en" ? "Free estimate" : "Estimación gratuita"}
        </a>
        <a
          href={PHONE_HREF}
          aria-label={lang === "en" ? "Call us" : "Llámanos"}
          onClick={() => trackEvent("Contact", { method: "phone_mobile_bar" })}
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-ink/30 text-ink"
        >
          <Phone className="h-5 w-5" strokeWidth={1.6} />
        </a>
      </div>
    </div>
  );
}

/** Header + content + footer + WhatsApp (floating bubble on desktop, bottom bar on phones). */
export default function Layout({
  children,
  overlay = false,
  lang = "es",
  whatsappText,
}: {
  children: ReactNode;
  /** The page starts with a full-bleed photo: transparent header on top. */
  overlay?: boolean;
  lang?: "es" | "en";
  whatsappText?: string;
}) {
  const whatsapp = whatsappUrl(whatsappText);
  return (
    <div className="flex min-h-screen flex-col bg-ivory text-ink">
      <SiteHeader overlay={overlay} lang={lang} />
      <main className={`flex-1 ${overlay ? "" : "pt-[var(--header-height)]"}`}>{children}</main>
      <SiteFooter lang={lang} />
      <a
        data-whatsapp-floating
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("Contact", { method: "whatsapp_float" })}
        aria-label={lang === "en" ? "Message us on WhatsApp" : "Escríbenos por WhatsApp"}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_14px_30px_-10px_rgb(22_40_44/0.45)] transition-transform hover:scale-105"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <MobileBar lang={lang} />
    </div>
  );
}
