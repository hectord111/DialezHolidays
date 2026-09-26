/**
 * Route table of the site.
 *
 * Every page is its own JS chunk, loaded on demand. Before hydrating a
 * prerendered page (main.tsx) or server-rendering it (entry-server.tsx) the
 * route's chunk — and, for blog posts, the article body — is preloaded, so
 * the first render is synchronous and matches the static HTML.
 *
 * Adding a page: create it in ./pages, add a route here and its SEO in
 * ./seo/pages.ts. The prerender picks it up automatically.
 */
import { use, type ComponentType } from "react";
import { ZONE_SLUGS } from "@/data/zones";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PageComponent = ComponentType<any>;
type PageModule = { default: PageComponent };

const pageModules = import.meta.glob<PageModule>("./pages/**/*.tsx");

export interface AppRoute {
  path: string;
  /** Page file under ./pages, without extension. */
  page: string;
  /** Data to load before rendering (besides the page chunk). */
  preload?: (params: Record<string, string>) => Promise<unknown>;
  /** Prerender to static HTML at build time (default true). */
  prerender?: boolean;
}

export const ROUTES: AppRoute[] = [
  { path: "/", page: "Home" },
  { path: "/en", page: "HomeEN" },
  { path: "/tarifas", page: "Tarifas" },
  { path: "/canarias", page: "Canarias" },
  // One page per zone (the component reads the zone from the URL).
  ...ZONE_SLUGS.map(slug => ({ path: `/zonas/${slug}`, page: "Zona" })),
  // Blog
  { path: "/blog", page: "blog/BlogIndex" },
  { path: "/blog/categoria/:category", page: "blog/BlogCategory", prerender: false },
  { path: "/blog/:slug", page: "blog/BlogPost", preload: params => import("@/blog/posts").then(m => m.loadPost(params.slug)).catch(() => undefined), prerender: false },
  // Legal
  { path: "/politica-privacidad", page: "PoliticaPrivacidad" },
  { path: "/404", page: "NotFound" },
];

export const NOT_FOUND_PAGE = "NotFound";

// ── Lazy page components ───────────────────────────────────────────────────
interface LazyPage {
  Component: PageComponent;
  load: () => Promise<PageComponent>;
}

const lazyPages = new Map<string, LazyPage>();

/** A component for the page that renders synchronously once its chunk is loaded. */
export function lazyPage(page: string): LazyPage {
  let entry = lazyPages.get(page);
  if (entry) return entry;
  const loader = pageModules[`./pages/${page}.tsx`];
  if (!loader) throw new Error(`Page not found: ./pages/${page}.tsx`);
  let loaded: PageComponent | undefined;
  let promise: Promise<PageComponent> | undefined;
  const load = () =>
    (promise ??= loader().then(mod => {
      loaded = mod.default;
      return loaded;
    }));
  function Component(props: object) {
    const Page = loaded ?? use(load());
    return <Page {...props} />;
  }
  Component.displayName = `Lazy(${page})`;
  entry = { Component, load };
  lazyPages.set(page, entry);
  return entry;
}

// ── Matching ───────────────────────────────────────────────────────────────
/** "/tarifas/?x=1" -> "/tarifas". */
export function normalizePath(url: string): string {
  const path = url.split("?")[0].split("#")[0];
  const trimmed = path.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export function matchRoute(pathname: string): { route: AppRoute; params: Record<string, string> } | undefined {
  const segments = pathname.split("/").filter(Boolean);
  for (const route of ROUTES) {
    const pattern = route.path.split("/").filter(Boolean);
    if (pattern.length !== segments.length) continue;
    const params: Record<string, string> = {};
    const ok = pattern.every((part, i) => {
      if (part.startsWith(":")) {
        params[part.slice(1)] = decodeURIComponent(segments[i]);
        return true;
      }
      return part === segments[i];
    });
    if (ok) return { route, params };
  }
  return undefined;
}

/** Loads everything the page at `pathname` needs to render synchronously. */
export async function preloadPath(pathname: string): Promise<void> {
  const match = matchRoute(pathname);
  const page = match?.route.page ?? NOT_FOUND_PAGE;
  await Promise.all([lazyPage(page).load(), match?.route.preload?.(match.params)]);
}
