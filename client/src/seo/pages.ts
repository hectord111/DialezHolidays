/**
 * SEO de las páginas fijas de la web.
 *
 * Es la única fuente de verdad del <title>, la meta descripción, la canónica
 * y los datos estructurados de cada ruta: el prerender (scripts/prerender.ts)
 * los escribe en el HTML estático. Los artículos del blog generan su SEO a
 * partir de su frontmatter (ver ./index.ts), así que no hace falta añadirlos
 * aquí. Las preguntas frecuentes visibles publican su FAQPage desde la propia
 * página (components/FaqSection.tsx).
 */
import { HERO_IMAGES } from "@/data/images";
import { ZONES, zonePath } from "@/data/zones";
import { SERVICE_ID, TENERIFE_AREAS, serviceNode } from "./site";

export interface StaticPageSEO {
  title: string;
  description: string;
  /** Short label for the breadcrumb trail. */
  breadcrumb: string;
  /** Parent route in the breadcrumb trail (defaults to "/"). */
  parent?: string;
  ogImage?: string;
  ogImageAlt?: string;
  /** Open Graph locale, defaults to es_ES. */
  locale?: string;
  /** <html lang>, defaults to "es". */
  lang?: string;
  hreflang?: { lang: string; path: string }[];
  /** Images to preload (hero photo). */
  preload?: { href: string; media?: string; type?: string }[];
  noindex?: boolean;
  /** Page-specific JSON-LD nodes (the organization/website graph is added automatically). */
  schema?: object[];
}

const HOME_HREFLANG = [
  { lang: "es", path: "/" },
  { lang: "en", path: "/en" },
  { lang: "x-default", path: "/" },
];

const HERO_PRELOAD = [
  { href: HERO_IMAGES.desktop, media: "(min-width: 768px)", type: "image/webp" },
  { href: HERO_IMAGES.mobile, media: "(max-width: 767px)", type: "image/webp" },
];

function zonePages(): Record<string, StaticPageSEO> {
  return Object.fromEntries(
    ZONES.map(zone => [
      zonePath(zone.slug),
      {
        title: zone.title,
        description: zone.description,
        breadcrumb: zone.name,
        ogImage: zone.image,
        ogImageAlt: zone.imageAlt,
        schema: [
          serviceNode({
            name: `Gestión de alquiler vacacional en ${zone.name}`,
            areas: [zone.name, zone.municipality, "Tenerife"],
            description: `Gestión integral de viviendas vacacionales en ${zone.name} (${zone.municipality}, Tenerife): anuncios en Airbnb, Booking y Vrbo, reservas, check-in, limpieza, mantenimiento y precios dinámicos.`,
            url: zonePath(zone.slug),
          }),
        ],
      } satisfies StaticPageSEO,
    ])
  );
}

export const STATIC_PAGES: Record<string, StaticPageSEO> = {
  "/": {
    title: "Gestión de alquiler vacacional en Tenerife | Dialez Holidays",
    description:
      "Gestora de Airbnb y alquiler vacacional en Tenerife: anuncios, huéspedes, limpieza, licencia VV y precios dinámicos. Desde el 15% por reserva, sin cuotas fijas.",
    breadcrumb: "Inicio",
    ogImageAlt: HERO_IMAGES.alt,
    hreflang: HOME_HREFLANG,
    preload: HERO_PRELOAD,
    schema: [
      serviceNode({
        id: SERVICE_ID,
        name: "Gestión de alquiler vacacional en Tenerife",
        areas: TENERIFE_AREAS,
        description:
          "Gestión integral de viviendas vacacionales en Tenerife: estimación de ingresos, fotografía profesional, anuncios en Airbnb, Booking y Vrbo, precios dinámicos, reservas, atención a huéspedes, check-in y check-out, limpieza, mantenimiento, licencia VV e informe mensual.",
        url: "/",
      }),
    ],
  },
  "/en": {
    title: "Holiday Rental Management in Tenerife | Dialez Holidays",
    description:
      "Airbnb and holiday rental management in Tenerife: listings, guests, cleaning, VV licence and dynamic pricing. From 15% per booking, with no fixed fees.",
    breadcrumb: "English",
    ogImageAlt: HERO_IMAGES.altEn,
    lang: "en",
    locale: "en_GB",
    hreflang: HOME_HREFLANG,
    preload: HERO_PRELOAD,
    schema: [
      serviceNode({
        name: "Holiday rental management in Tenerife",
        areas: TENERIFE_AREAS,
        description:
          "Full-service holiday rental management in Tenerife: listings on Airbnb, Booking.com and Vrbo, dynamic pricing, guest communication, check-in, cleaning, maintenance, VV licence support and monthly reports.",
        url: "/en",
      }),
    ],
  },
  "/tarifas": {
    title: "Tarifas de gestión de alquiler vacacional en Tenerife | Dialez",
    description:
      "Cuánto cuesta una gestora de alquiler vacacional en Tenerife: desde el 15% por reserva y sin cuotas fijas. Qué incluye, qué no y un ejemplo de ingresos.",
    breadcrumb: "Tarifas",
    ogImage: "/images/apartamento-bienvenida.webp",
    ogImageAlt: "Dormitorio de vivienda vacacional preparado para huéspedes con cesta de bienvenida",
    schema: [
      serviceNode({
        name: "Tarifa de gestión de alquiler vacacional en Tenerife",
        areas: TENERIFE_AREAS,
        description:
          "Gestión integral de viviendas vacacionales en Tenerife por un porcentaje de cada reserva confirmada (desde el 15%), sin cuotas fijas ni gastos ocultos.",
        url: "/tarifas",
      }),
    ],
  },
  "/canarias": {
    title: "Gestión de alquiler vacacional en Canarias | Dialez Holidays",
    description:
      "Gestora de alquiler vacacional y Airbnb en Canarias con base en Tenerife: Ley 6/2025, licencia VV, huéspedes y precios dinámicos. Desde el 15% por reserva.",
    breadcrumb: "Canarias",
    ogImage: "/images/villa-piscina-tenerife.webp",
    ogImageAlt: "Villa con piscina infinita en Tenerife con La Gomera al fondo",
    schema: [
      serviceNode({
        name: "Gestión de alquiler vacacional en Canarias",
        areas: ["Islas Canarias", "Tenerife", "Gran Canaria"],
        description:
          "Gestión integral de viviendas vacacionales en Canarias con equipo en Tenerife: anuncios, reservas, huéspedes, limpieza, mantenimiento, licencia VV y precios dinámicos.",
        url: "/canarias",
      }),
    ],
  },
  ...zonePages(),

  // ── LEGAL / UTILIDAD ─────────────────────────────────────────────────────
  "/politica-privacidad": {
    title: "Política de privacidad | Dialez Holidays",
    description:
      "Política de privacidad y protección de datos de Dialez Holidays: responsable, finalidades, base legal, conservación de los datos y cómo ejercer tus derechos.",
    breadcrumb: "Política de privacidad",
  },
  "/404": {
    title: "Página no encontrada | Dialez Holidays",
    description: "La página que buscas no existe o se ha movido. Vuelve al inicio para conocer nuestra gestión de alquiler vacacional en Tenerife.",
    breadcrumb: "Página no encontrada",
    noindex: true,
  },
};
