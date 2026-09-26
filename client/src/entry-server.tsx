/**
 * Server-side rendering entry, used only at build time by scripts/prerender.ts
 * to turn every route into static HTML (content + SEO tags).
 */
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";
import { ROUTES, normalizePath, preloadPath } from "./routes";
import { SEO_POSTS as POSTS, blogPaths, renderHeadTags, resolveSEO } from "./seo";
import { STATIC_PAGES } from "./seo/pages";
import { SITE_URL, absoluteUrl } from "./seo/site";

export { POSTS, ROUTES, STATIC_PAGES, SITE_URL, absoluteUrl, blogPaths, normalizePath, resolveSEO };

export interface RenderResult {
  /** Markup for #root. */
  html: string;
  /** SEO tags for <head>. */
  head: string;
  lang: string;
  status: 200 | 404;
}

export async function render(url: string): Promise<RenderResult> {
  const path = normalizePath(url);
  await preloadPath(path);

  const html = renderToString(
    <Router ssrPath={path}>
      <App />
    </Router>
  );

  const seo = resolveSEO(path);
  return { html, head: renderHeadTags(seo), lang: seo.lang, status: seo.status };
}

/** SEO tags only (client-only pages). */
export function renderHead(url: string): { head: string; lang: string } {
  const seo = resolveSEO(url);
  return { head: renderHeadTags(seo), lang: seo.lang };
}
