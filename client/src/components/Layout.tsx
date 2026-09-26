import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/contact";
import { trackEvent } from "@/lib/tracking";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

/** Cabecera + contenido + pie + botón flotante de WhatsApp. */
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
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader overlay={overlay} lang={lang} />
      <main className={`flex-1 ${overlay ? "" : "pt-[72px]"}`}>{children}</main>
      <SiteFooter lang={lang} />
      <a
        href={whatsappUrl(whatsappText)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("Contact", { method: "whatsapp_float" })}
        aria-label={lang === "en" ? "Message us on WhatsApp" : "Escríbenos por WhatsApp"}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_12px_30px_-8px_rgb(0_0_0/0.45)] transition-transform hover:scale-110"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
