/**
 * Builds the SEO <head> tags from a resolved page SEO. They are written into
 * the prerendered HTML at build time (and injected by the dev server).
 */
import { SITE_NAME } from "./site";

export interface ResolvedSEO {
  /** Normalized path ("/tenerife/vender-piso"). */
  path: string;
  title: string;
  description: string;
  canonical: string;
  /** Absolute image URL for Open Graph / Twitter. */
  image: string;
  imageAlt: string;
  ogType: "website" | "article";
  locale: string;
  lang: string;
  robots: string;
  hreflang: { lang: string; href: string }[];
  article?: { publishedTime: string; modifiedTime: string; section: string; tags: string[] };
  /** Images to preload (the hero photo, for a faster LCP). */
  preload: { href: string; media?: string; type?: string }[];
  /** A single JSON-LD document (schema.org @graph). */
  jsonLd: object;
  /** HTTP status the page represents (404 for unknown URLs). */
  status: 200 | 404;
}

export const INDEX_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
export const NOINDEX_ROBOTS = "noindex, follow";

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeText(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** JSON for a <script type="application/ld+json">, safe against `</script>` injection. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
}

/** HTML for every SEO tag of the page. */
export function renderHeadTags(seo: ResolvedSEO): string {
  const meta = (attr: "name" | "property", key: string, content: string) =>
    `<meta ${attr}="${key}" content="${escapeAttr(content)}">`;
  const tags = [
    `<title>${escapeText(seo.title)}</title>`,
    meta("name", "description", seo.description),
    meta("name", "robots", seo.robots),
    `<link rel="canonical" href="${escapeAttr(seo.canonical)}">`,
    ...seo.hreflang.map(h => `<link rel="alternate" hreflang="${h.lang}" href="${escapeAttr(h.href)}">`),
    meta("property", "og:type", seo.ogType),
    meta("property", "og:site_name", SITE_NAME),
    meta("property", "og:locale", seo.locale),
    meta("property", "og:title", seo.title),
    meta("property", "og:description", seo.description),
    meta("property", "og:url", seo.canonical),
    meta("property", "og:image", seo.image),
    meta("property", "og:image:alt", seo.imageAlt),
    ...(seo.article
      ? [
          meta("property", "article:published_time", seo.article.publishedTime),
          meta("property", "article:modified_time", seo.article.modifiedTime),
          meta("property", "article:section", seo.article.section),
          ...seo.article.tags.map(tag => meta("property", "article:tag", tag)),
        ]
      : []),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", seo.title),
    meta("name", "twitter:description", seo.description),
    meta("name", "twitter:image", seo.image),
    ...seo.preload.map(
      p =>
        `<link rel="preload" as="image" href="${escapeAttr(p.href)}"${p.type ? ` type="${escapeAttr(p.type)}"` : ""}${p.media ? ` media="${escapeAttr(p.media)}"` : ""} fetchpriority="high">`
    ),
    `<script type="application/ld+json">${serializeJsonLd(seo.jsonLd)}</script>`,
  ];
  return tags.join("\n    ");
}
