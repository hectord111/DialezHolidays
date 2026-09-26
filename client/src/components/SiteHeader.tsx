import { useEffect, useState } from "react";
import { ChevronDown, Menu, MessageCircle, Phone, X } from "lucide-react";
import { ZONES, zonePath } from "@/data/zones";
import { PHONE_DISPLAY, PHONE_HREF, whatsappUrl } from "@/lib/contact";
import { trackEvent } from "@/lib/tracking";
import Logo from "./Logo";

type Lang = "es" | "en";

const NAV: Record<Lang, { href: string; label: string }[]> = {
  es: [
    { href: "/#ventajas", label: "Ventajas" },
    { href: "/tarifas", label: "Tarifas" },
    { href: "/canarias", label: "Canarias" },
    { href: "/blog", label: "Blog" },
  ],
  en: [
    { href: "/en#benefits", label: "Benefits" },
    { href: "/en#pricing", label: "Pricing" },
    { href: "/en#areas", label: "Areas" },
    { href: "/en#contact", label: "Contact" },
  ],
};

/**
 * Cabecera fija. Con `overlay` empieza transparente sobre la foto del hero y
 * se vuelve sólida al hacer scroll; sin `overlay` es sólida desde el inicio.
 */
export default function SiteHeader({ overlay = false, lang = "es" }: { overlay?: boolean; lang?: Lang }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const solid = !overlay || scrolled || open;
  const whatsapp = whatsappUrl(
    lang === "en" ? "Hi, I'd like to know more about holiday rental management for my property in Tenerife." : undefined
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = solid ? "text-foreground/75 hover:text-ocean" : "text-white/85 hover:text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "bg-background/92 shadow-[0_1px_0_var(--border)] backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className={`container flex items-center justify-between transition-all duration-500 ${solid ? "h-[72px]" : "h-[88px]"}`}>
        <a href={lang === "en" ? "/en" : "/"} aria-label="Dialez Holidays — inicio">
          <Logo light={!solid} />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label={lang === "en" ? "Main" : "Principal"}>
          {lang === "es" && (
            <div className="group relative">
              <button type="button" className={`flex items-center gap-1 text-sm font-medium transition-colors ${linkClass}`}>
                Zonas <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="card overflow-hidden p-2 shadow-2xl">
                  {ZONES.map(zone => (
                    <a key={zone.slug} href={zonePath(zone.slug)} className="block rounded-xl px-4 py-3 transition-colors hover:bg-sand">
                      <span className="block text-sm font-semibold text-ocean">{zone.name}</span>
                      <span className="block text-xs text-muted-foreground">{zone.municipality}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
          {NAV[lang].map(item => (
            <a key={item.href} href={item.href} className={`text-sm font-medium transition-colors ${linkClass}`}>
              {item.label}
            </a>
          ))}
          <a
            href={lang === "en" ? "/" : "/en"}
            hrefLang={lang === "en" ? "es" : "en"}
            className={`text-xs font-semibold tracking-widest transition-colors ${linkClass}`}
          >
            {lang === "en" ? "ES" : "EN"}
          </a>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={PHONE_HREF}
            onClick={() => trackEvent("Contact", { method: "phone_header" })}
            className={`flex items-center gap-2 text-sm font-semibold transition-colors ${solid ? "text-ocean" : "text-white"}`}
          >
            <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
          </a>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("Lead", { content_name: "WhatsApp Header" })}
            className={`btn !px-5 !py-2.5 text-sm ${solid ? "btn-ocean" : "btn-gold"}`}
          >
            <MessageCircle className="h-4 w-4" /> {lang === "en" ? "Free estimate" : "Estimación gratis"}
          </a>
        </div>

        <button
          type="button"
          className={`rounded-full p-2 lg:hidden ${solid ? "text-ocean" : "text-white"}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="max-h-[calc(100svh-72px)] overflow-y-auto border-t border-border bg-background lg:hidden">
          <nav className="container flex flex-col gap-1 py-6" aria-label="Menú móvil">
            {NAV[lang].map(item => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-display text-2xl text-ocean">
                {item.label}
              </a>
            ))}
            {lang === "es" && (
              <>
                <p className="mt-4 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Zonas</p>
                <div className="grid grid-cols-2 gap-1">
                  {ZONES.map(zone => (
                    <a key={zone.slug} href={zonePath(zone.slug)} className="rounded-xl px-3 py-2.5 text-sm font-medium text-ocean hover:bg-sand">
                      {zone.name}
                    </a>
                  ))}
                </div>
              </>
            )}
            <a href={lang === "en" ? "/" : "/en"} className="mt-2 px-3 py-2 text-sm font-semibold text-muted-foreground">
              {lang === "en" ? "Español" : "English"}
            </a>
            <div className="mt-4 grid gap-3">
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <MessageCircle className="h-5 w-5" /> WhatsApp
              </a>
              <a href={PHONE_HREF} className="btn btn-ghost-dark">
                <Phone className="h-5 w-5" /> {PHONE_DISPLAY}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
