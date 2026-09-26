import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { ZONES, zonePath } from "@/data/zones";
import { PHONE_DISPLAY, PHONE_HREF, whatsappUrl } from "@/lib/contact";
import { trackEvent } from "@/lib/tracking";
import Logo from "./Logo";

type Lang = "es" | "en";

const NAV: Record<Lang, { href: string; label: string }[]> = {
  es: [
    { href: "/#ventajas", label: "Ventajas" },
    { href: "/tarifas", label: "Tarifas" },
    { href: "/#zonas", label: "Zonas" },
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

const COPY = {
  es: { cta: "Estimación gratuita", menu: "Menú", close: "Cerrar", other: "EN", otherLabel: "English", zones: "Zonas de Tenerife" },
  en: { cta: "Free estimate", menu: "Menu", close: "Close", other: "ES", otherLabel: "Español", zones: "Areas" },
};

/**
 * Fixed header: transparent over the light hero, then an ivory glass bar
 * with a hairline once the page scrolls. On phones a full-screen menu.
 */
export default function SiteHeader({ overlay = false, lang = "es" }: { overlay?: boolean; lang?: Lang }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const t = COPY[lang];
  const solid = !overlay || scrolled || open;
  const whatsapp = whatsappUrl(
    lang === "en" ? "Hi, I'd like a free income estimate for my property in Tenerife." : "Hola, me gustaría una estimación de ingresos gratuita para mi vivienda en Tenerife."
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid ? "border-ink/10 bg-ivory/88 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <div className="container flex h-[var(--header-height)] items-center justify-between gap-6">
          <a href={lang === "en" ? "/en" : "/"} aria-label="Dialez Holidays">
            <Logo />
          </a>

          <nav className="hidden xl:block" aria-label={lang === "en" ? "Main" : "Principal"}>
            <ul className="flex items-center gap-7">
              {NAV[lang].map(item => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="whitespace-nowrap border-b border-transparent pb-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-ink/75 transition-colors hover:border-sand-400 hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            <a
              href={PHONE_HREF}
              onClick={() => trackEvent("Contact", { method: "phone_header" })}
              className="hidden items-center gap-2 text-[0.72rem] font-semibold tracking-[0.12em] text-ink/80 hover:text-ink lg:flex"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.6} /> {PHONE_DISPLAY}
            </a>
            <a
              href={lang === "en" ? "/" : "/en"}
              hrefLang={lang === "en" ? "es" : "en"}
              aria-label={t.otherLabel}
              className="hidden text-[0.68rem] font-semibold tracking-[0.22em] text-ink/60 hover:text-ink sm:block"
            >
              {t.other}
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("Lead", { content_name: "WhatsApp Header" })}
              className="btn btn-outline hidden !min-h-11 !px-5 md:inline-flex"
            >
              {t.cta}
            </a>
            <button
              type="button"
              onClick={() => setOpen(v => !v)}
              aria-expanded={open}
              aria-controls="menu-movil"
              className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-ink/85 hover:text-ink xl:hidden"
            >
              {open ? t.close : t.menu}
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-movil"
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label={lang === "en" ? "Menu" : "Menú"}
        className="fixed inset-x-0 bottom-0 top-[var(--header-height)] z-40 overflow-y-auto bg-ivory xl:hidden"
      >
        <div className="container flex min-h-full flex-col pb-10 pt-6">
          <ul className="border-t border-ink/10">
            {NAV[lang].map(item => (
              <li key={item.href} className="border-b border-ink/10">
                <a href={item.href} onClick={() => setOpen(false)} className="display block py-4 text-3xl">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          {lang === "es" && (
            <>
              <p className="label mt-8 text-sand-600">{t.zones}</p>
              <ul className="mt-3 grid grid-cols-2 gap-x-4">
                {ZONES.map(zone => (
                  <li key={zone.slug}>
                    <a href={zonePath(zone.slug)} onClick={() => setOpen(false)} className="block py-2 text-[0.95rem] text-ink-500 hover:text-ink">
                      {zone.name}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="mt-auto grid gap-3 pt-10">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
              {t.cta}
            </a>
            <a href={PHONE_HREF} className="btn btn-outline">
              <Phone className="h-4 w-4" strokeWidth={1.6} /> {PHONE_DISPLAY}
            </a>
            <a href={lang === "en" ? "/" : "/en"} className="label mt-3 self-start text-ink/60">
              {t.otherLabel}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
