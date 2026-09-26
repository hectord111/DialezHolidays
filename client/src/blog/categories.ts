/**
 * Categorías del blog. El `slug` es el valor del campo `category` en el
 * frontmatter de los artículos y la URL de la página de categoría
 * (/blog/categoria/<slug>). Mantener en sincronía con CATEGORIES en
 * scripts/blog-markdown.ts.
 */
export const CATEGORY_SLUGS = ["normativa", "rentabilidad", "gestion", "fiscalidad", "zonas"] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export interface CategoryDef {
  slug: CategorySlug;
  name: string;
  /** H1 and <title> of the category page. */
  title: string;
  description: string;
}

export const CATEGORIES: CategoryDef[] = [
  {
    slug: "normativa",
    name: "Normativa y licencias",
    title: "Normativa de vivienda vacacional en Tenerife y Canarias",
    description:
      "Ley de vivienda vacacional de Canarias, licencias VV, comunidades de propietarios, registro de viajeros y todas las obligaciones legales del alquiler vacacional en Tenerife.",
  },
  {
    slug: "rentabilidad",
    name: "Rentabilidad y precios",
    title: "Rentabilidad del alquiler vacacional en Tenerife",
    description:
      "Cuánto se gana con una vivienda vacacional en Tenerife, cómo fijar precios por temporada, qué gastos tiene y cómo mejorar la ocupación y la rentabilidad.",
  },
  {
    slug: "gestion",
    name: "Gestión y Airbnb",
    title: "Gestión de viviendas vacacionales: Airbnb y Booking",
    description:
      "Guías prácticas para gestionar una vivienda vacacional: Airbnb, Booking y Vrbo, reseñas, check-in, limpieza, atención al huésped y cómo elegir una gestora.",
  },
  {
    slug: "fiscalidad",
    name: "Impuestos",
    title: "Impuestos del alquiler vacacional en Canarias",
    description:
      "Qué impuestos paga una vivienda vacacional en Canarias: IGIC, IRPF, IRNR para no residentes, gastos deducibles y obligaciones de información.",
  },
  {
    slug: "zonas",
    name: "Zonas de Tenerife",
    title: "Mejores zonas de Tenerife para alquiler vacacional",
    description:
      "Costa Adeje, Los Cristianos, Puerto de la Cruz, Santa Cruz, El Médano o Los Gigantes: cómo es la demanda turística en cada zona de Tenerife y qué viviendas funcionan mejor.",
  },
];

export function getCategory(slug: string): CategoryDef | undefined {
  return CATEGORIES.find(c => c.slug === slug);
}
