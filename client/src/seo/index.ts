/**
 * Resolves the SEO of any URL of the site: fixed pages (./pages.ts), the
 * blog index, blog categories and blog posts. Unknown URLs resolve to the
 * 404 page (noindex).
 *
 * Used at build time (scripts/prerender.ts via entry-server.tsx) and by the
 * dev server; it is not part of the browser bundle, so it can load the full
 * metadata of every post.
 */
import { CATEGORIES, getCategory } from "@/blog/categories";
import { sortPosts } from "@/blog/posts";
import type { PostMeta } from "@/blog/types";
import { normalizePath } from "@/routes";
import { STATIC_PAGES, type StaticPageSEO } from "./pages";
import { INDEX_ROBOTS, NOINDEX_ROBOTS, type ResolvedSEO } from "./head";
import { DEFAULT_OG_IMAGE, ORGANIZATION_ID, SITE_NAME, WEBSITE_ID, absoluteUrl, siteGraph } from "./site";

export type { ResolvedSEO } from "./head";
export { renderHeadTags, serializeJsonLd } from "./head";

const BLOG_TITLE = "Blog de alquiler vacacional en Tenerife y Canarias";
const BLOG_DESCRIPTION =
  "Guías para propietarios de viviendas vacacionales en Tenerife y Canarias: normativa y licencias, Airbnb y Booking, precios por temporada, gastos, impuestos y zonas.";
const BLOG_IMAGE = "/images/terraza-vistas-mar-tenerife.webp";

export { normalizePath };

const metaModules = import.meta.glob<PostMeta>(["../content/blog/*.md", "!../content/blog/README.md"], {
  eager: true,
  query: "?meta",
  import: "default",
});

/** Published posts with all their metadata, newest first. */
export const SEO_POSTS: PostMeta[] = sortPosts(Object.values(metaModules).filter(post => post.published));
const postBySlug = new Map(SEO_POSTS.map(post => [post.slug, post]));

interface Crumb {
  name: string;
  path: string;
}

function breadcrumbNode(canonical: string, crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

function webPageNode(opts: {
  canonical: string;
  title: string;
  description: string;
  image: string;
  lang: string;
  type?: string;
  hasBreadcrumb: boolean;
}) {
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${opts.canonical}#webpage`,
    url: opts.canonical,
    name: opts.title,
    description: opts.description,
    inLanguage: opts.lang === "en" ? "en-GB" : "es-ES",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    primaryImageOfPage: { "@type": "ImageObject", url: opts.image },
    ...(opts.hasBreadcrumb ? { breadcrumb: { "@id": `${opts.canonical}#breadcrumb` } } : {}),
  };
}

function graph(nodes: object[]): object {
  return { "@context": "https://schema.org", "@graph": [...siteGraph(), ...nodes] };
}

function staticCrumbs(path: string): Crumb[] {
  const chain: Crumb[] = [];
  let current: string | undefined = path;
  const seen = new Set<string>();
  while (current && current !== "/" && !seen.has(current)) {
    seen.add(current);
    const entry: StaticPageSEO | undefined = STATIC_PAGES[current];
    if (!entry) break;
    chain.unshift({ name: entry.breadcrumb, path: current });
    current = entry.parent ?? "/";
  }
  if (path !== "/") chain.unshift({ name: STATIC_PAGES[path]?.lang === "en" ? "Home" : "Inicio", path: "/" });
  return chain;
}

function resolveStatic(path: string, page: StaticPageSEO): ResolvedSEO {
  const canonical = absoluteUrl(path);
  const image = absoluteUrl(page.ogImage ?? DEFAULT_OG_IMAGE);
  const lang = page.lang ?? "es";
  const crumbs = staticCrumbs(path);
  const hasBreadcrumb = crumbs.length > 1;
  const noindex = Boolean(page.noindex);
  return {
    path,
    title: page.title,
    description: page.description,
    canonical,
    image,
    imageAlt: page.ogImageAlt ?? page.title,
    ogType: "website",
    locale: page.locale ?? "es_ES",
    lang,
    robots: noindex ? NOINDEX_ROBOTS : INDEX_ROBOTS,
    hreflang: (page.hreflang ?? []).map(h => ({ lang: h.lang, href: absoluteUrl(h.path) })),
    preload: page.preload ?? [],
    jsonLd: graph([
      webPageNode({ canonical, title: page.title, description: page.description, image, lang, hasBreadcrumb }),
      ...(hasBreadcrumb ? [breadcrumbNode(canonical, crumbs)] : []),
      ...(page.schema ?? []),
    ]),
    status: path === "/404" ? 404 : 200,
  };
}

function resolveBlogIndex(): ResolvedSEO {
  const path = "/blog";
  const canonical = absoluteUrl(path);
  const image = absoluteUrl(BLOG_IMAGE);
  const title = `${BLOG_TITLE} | Dialez`;
  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: "Blog", path },
  ];
  return {
    path,
    title,
    description: BLOG_DESCRIPTION,
    canonical,
    image,
    imageAlt: "Terraza de una vivienda vacacional frente a la costa de Tenerife",
    ogType: "website",
    locale: "es_ES",
    lang: "es",
    robots: INDEX_ROBOTS,
    hreflang: [],
    preload: [],
    jsonLd: graph([
      webPageNode({ canonical, title, description: BLOG_DESCRIPTION, image, lang: "es", type: "CollectionPage", hasBreadcrumb: true }),
      breadcrumbNode(canonical, crumbs),
      {
        "@type": "Blog",
        "@id": `${canonical}#blog`,
        name: `Blog de ${SITE_NAME}`,
        url: canonical,
        inLanguage: "es-ES",
        publisher: { "@id": ORGANIZATION_ID },
        blogPost: SEO_POSTS.slice(0, 20).map(post => ({ "@id": `${absoluteUrl(`/blog/${post.slug}`)}#article` })),
      },
    ]),
    status: 200,
  };
}

function resolveCategory(slug: string): ResolvedSEO | undefined {
  const category = getCategory(slug);
  if (!category) return undefined;
  const path = `/blog/categoria/${slug}`;
  const canonical = absoluteUrl(path);
  const image = absoluteUrl(BLOG_IMAGE);
  const title = `${category.title} | Dialez`;
  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: category.name, path },
  ];
  const posts = SEO_POSTS.filter(post => post.category === category.slug);
  return {
    path,
    title,
    description: category.description,
    canonical,
    image,
    imageAlt: category.name,
    ogType: "website",
    locale: "es_ES",
    lang: "es",
    // An empty category adds no value to the index until it has articles.
    robots: posts.length > 0 ? INDEX_ROBOTS : NOINDEX_ROBOTS,
    hreflang: [],
    preload: [],
    jsonLd: graph([
      webPageNode({ canonical, title, description: category.description, image, lang: "es", type: "CollectionPage", hasBreadcrumb: true }),
      breadcrumbNode(canonical, crumbs),
      {
        "@type": "ItemList",
        itemListElement: posts.map((post, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: absoluteUrl(`/blog/${post.slug}`),
          name: post.title,
        })),
      },
    ]),
    status: 200,
  };
}

/** `<title>` for a post: the short SEO title plus the brand when it fits. */
export function postDocumentTitle(post: PostMeta): string {
  const base = post.seoTitle ?? post.title;
  return base.length <= 44 ? `${base} | Dialez Holidays` : base.length <= 52 ? `${base} | Dialez` : base;
}

function resolvePost(post: PostMeta): ResolvedSEO {
  const path = `/blog/${post.slug}`;
  const canonical = absoluteUrl(path);
  const image = absoluteUrl(post.image);
  const category = getCategory(post.category);
  const title = postDocumentTitle(post);
  const modified = post.updated ?? post.date;
  const crumbs = [
    { name: "Inicio", path: "/" },
    { name: "Blog", path: "/blog" },
    ...(category ? [{ name: category.name, path: `/blog/categoria/${category.slug}` }] : []),
    { name: post.title, path },
  ];
  const article = {
    "@type": "BlogPosting",
    "@id": `${canonical}#article`,
    headline: post.title.length > 110 ? `${post.title.slice(0, 107)}…` : post.title,
    description: post.description,
    image: { "@type": "ImageObject", url: image, caption: post.imageAlt },
    datePublished: `${post.date}T08:00:00+01:00`,
    dateModified: `${modified}T08:00:00+01:00`,
    inLanguage: "es-ES",
    wordCount: post.wordCount,
    articleSection: category?.name,
    keywords: post.keywords.join(", "),
    author: { "@type": "Organization", "@id": ORGANIZATION_ID, name: SITE_NAME, url: absoluteUrl("/") },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: { "@id": `${canonical}#webpage` },
    isPartOf: { "@id": `${absoluteUrl("/blog")}#blog` },
  };
  const faq =
    post.faq.length > 0
      ? [
          {
            "@type": "FAQPage",
            "@id": `${canonical}#faq`,
            mainEntity: post.faq.map(item => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          },
        ]
      : [];
  return {
    path,
    title,
    description: post.description,
    canonical,
    image,
    imageAlt: post.imageAlt,
    ogType: "article",
    locale: "es_ES",
    lang: "es",
    robots: INDEX_ROBOTS,
    hreflang: [],
    preload: [],
    article: {
      publishedTime: `${post.date}T08:00:00+01:00`,
      modifiedTime: `${modified}T08:00:00+01:00`,
      section: category?.name ?? "Blog",
      tags: post.keywords,
    },
    jsonLd: graph([
      webPageNode({ canonical, title, description: post.description, image, lang: "es", hasBreadcrumb: true }),
      breadcrumbNode(canonical, crumbs),
      article,
      ...faq,
    ]),
    status: 200,
  };
}

/** SEO for any URL of the site. */
export function resolveSEO(url: string): ResolvedSEO {
  const path = normalizePath(url);
  const page = STATIC_PAGES[path];
  if (page) return resolveStatic(path, page);
  if (path === "/blog") return resolveBlogIndex();
  const categoryMatch = /^\/blog\/categoria\/([^/]+)$/.exec(path);
  if (categoryMatch) {
    const resolved = resolveCategory(categoryMatch[1]);
    if (resolved) return resolved;
  }
  const postMatch = /^\/blog\/([^/]+)$/.exec(path);
  if (postMatch) {
    const post = postBySlug.get(postMatch[1]);
    if (post) return resolvePost(post);
  }
  return { ...resolveStatic("/404", STATIC_PAGES["/404"]), path };
}

/** Blog URLs that exist (for prerendering and the sitemap). */
export function blogPaths(): string[] {
  return ["/blog", ...CATEGORIES.map(c => `/blog/categoria/${c.slug}`), ...SEO_POSTS.map(p => `/blog/${p.slug}`)];
}
