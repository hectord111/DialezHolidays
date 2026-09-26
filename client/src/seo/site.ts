/**
 * Datos globales del sitio usados por el SEO (canónicas, Open Graph, JSON-LD).
 *
 * SITE_URL es el dominio de producción. Todas las URLs canónicas, el sitemap
 * y los datos estructurados se construyen a partir de él: si el dominio
 * definitivo es otro (p. ej. dialezholidays.es), basta con cambiarlo aquí,
 * en scripts/seo-audit.ts y en vercel.json.
 */
import { EMAIL, PHONE_E164 } from "@/lib/contact";

export const SITE_URL = "https://dialezholidays.com";
export const SITE_NAME = "Dialez Holidays";
export const DEFAULT_OG_IMAGE = "/images/og-dialez-holidays.jpg";
export const LOGO_URL = `${SITE_URL}/images/logo.png`;

/** Parent brand (the real-estate agency that runs Dialez Holidays). */
export const PARENT_URL = "https://dialezproperties.es/";
export const PARENT_ORGANIZATION_ID = "https://dialezproperties.es/#organization";

export const SOCIAL_PROFILES = ["https://www.instagram.com/dialezproperties", "https://www.facebook.com/dialezproperties"];

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SERVICE_ID = `${SITE_URL}/#servicio`;

/** Absolute URL for a site path ("/tarifas" -> "https://dialezholidays.com/tarifas"). */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  if (path === "/" || path === "") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const TENERIFE_AREAS = [
  "Tenerife",
  "Adeje",
  "Costa Adeje",
  "Arona",
  "Los Cristianos",
  "Playa de las Américas",
  "Puerto de la Cruz",
  "La Orotava",
  "Santa Cruz de Tenerife",
  "San Cristóbal de La Laguna",
  "El Médano",
  "Granadilla de Abona",
  "Los Gigantes",
  "Santiago del Teide",
  "Islas Canarias",
];

/** Site-wide Organization (LocalBusiness) + WebSite graph, included on every page. */
export function siteGraph(): object[] {
  return [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      alternateName: "Dialez Holidays Tenerife",
      url: `${SITE_URL}/`,
      logo: LOGO_URL,
      image: absoluteUrl(DEFAULT_OG_IMAGE),
      description:
        "Gestora de alquiler vacacional y Airbnb en Tenerife: anuncios en Airbnb, Booking y Vrbo, huéspedes, check-in, limpieza, mantenimiento, licencia VV y precios dinámicos. Desde el 15% por reserva, sin cuotas fijas.",
      telephone: PHONE_E164,
      email: EMAIL,
      priceRange: "Desde el 15% por reserva",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rambla de Santa Cruz, 83",
        addressLocality: "Santa Cruz de Tenerife",
        postalCode: "38004",
        addressRegion: "Canarias",
        addressCountry: "ES",
      },
      areaServed: TENERIFE_AREAS.map(name => ({ "@type": "Place", name })),
      knowsLanguage: ["es", "en"],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: PHONE_E164,
          contactType: "customer service",
          areaServed: "ES-CN",
          availableLanguage: ["es", "en"],
        },
      ],
      parentOrganization: { "@type": "RealEstateAgent", "@id": PARENT_ORGANIZATION_ID, name: "Dialez Properties", url: PARENT_URL },
      sameAs: SOCIAL_PROFILES,
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: "es-ES",
      publisher: { "@id": ORGANIZATION_ID },
    },
  ];
}

/** The vacation-rental management service, referenced by the service pages. */
export function serviceNode(opts: { name: string; areas: string[]; description: string; url: string; id?: string }): object {
  return {
    "@type": "Service",
    "@id": opts.id ?? `${absoluteUrl(opts.url)}#servicio`,
    name: opts.name,
    serviceType: "Gestión de alquiler vacacional",
    provider: { "@id": ORGANIZATION_ID },
    areaServed: opts.areas.map(name => ({ "@type": "Place", name })),
    description: opts.description,
    url: absoluteUrl(opts.url),
    offers: {
      "@type": "Offer",
      description: "Desde el 15% de cada reserva confirmada, sin cuotas fijas ni gastos ocultos. Estimación de ingresos gratuita.",
      availability: "https://schema.org/InStock",
      areaServed: { "@type": "Place", name: "Tenerife" },
    },
  };
}
