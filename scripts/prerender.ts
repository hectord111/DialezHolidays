/**
 * Prerenders the whole site to static HTML after `vite build`.
 *
 * For every route (landings, blog index, categories and published posts) it
 * server-renders the React app (client/src/entry-server.tsx) and writes
 * dist/public/<route>.html with:
 *   - the page content inside #root (crawlers and AI bots read it without JS),
 *   - the SEO <head>: title, description, canonical, Open Graph, hreflang, JSON-LD,
 *   - <link rel="modulepreload"> for the page's own JS chunks.
 * It also generates sitemap.xml, robots.txt, the blog RSS feed and 404.html.
 * Vercel's `cleanUrls` serves `/vender-piso` from `vender-piso.html`.
 *
 * Usage: tsx scripts/prerender.ts   (runs after `vite build`)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

type EntryServer = typeof import("../client/src/entry-server");

interface ManifestChunk {
  file: string;
  src?: string;
  isEntry?: boolean;
  imports?: string[];
  dynamicImports?: string[];
  css?: string[];
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "dist", "public");
const TEMPLATE_PATH = path.join(OUT_DIR, "index.html");
const MANIFEST_PATH = path.join(OUT_DIR, ".vite", "manifest.json");

if (!fs.existsSync(TEMPLATE_PATH)) {
  console.error(`[prerender] ${TEMPLATE_PATH} not found. Run "vite build" first.`);
  process.exit(1);
}

// Server-render with React's production build, like the browser bundle.
process.env.NODE_ENV = "production";

const template = fs.readFileSync(TEMPLATE_PATH, "utf-8");
const manifest: Record<string, ManifestChunk> = fs.existsSync(MANIFEST_PATH)
  ? JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"))
  : {};

const vite = await createServer({
  configFile: path.join(ROOT, "vite.config.ts"),
  mode: "production",
  logLevel: "warn",
  appType: "custom",
  server: { middlewareMode: true, hmr: false, watch: null },
});

let failed = false;
try {
  const entry = (await vite.ssrLoadModule("/src/entry-server.tsx")) as EntryServer;
  await prerender(entry);
} catch (error) {
  failed = true;
  console.error("[prerender] failed:", error);
} finally {
  await vite.close();
}
if (failed) process.exit(1);

// ─────────────────────────────────────────────────────────────────────────────

async function prerender(entry: EntryServer) {
  const staticRoutes = entry.ROUTES.filter(r => r.prerender !== false && !r.path.includes(":") && r.path !== "/404").map(r => r.path);
  const paths = [...new Set([...staticRoutes, ...entry.blogPaths()])];
  const pageOf = (p: string) => entry.ROUTES.find(r => r.path === p)?.page;

  const written: string[] = [];
  for (const routePath of paths) {
    const result = await entry.render(routePath);
    assertFullyRendered(routePath, result.html);
    const page = pageOf(routePath) ?? (routePath.startsWith("/blog/categoria/") ? "blog/BlogCategory" : routePath.startsWith("/blog/") ? "blog/BlogPost" : undefined);
    const extraChunks = routePath.startsWith("/blog/") && page === "blog/BlogPost" ? [`src/content/blog/${routePath.slice(6)}.md?full`] : [];
    const html = buildDocument(result, routePath, page, extraChunks);
    writeFile(outputPathFor(routePath), html);
    written.push(routePath);
  }

  // Client-only pages: SEO head (noindex) + empty root.
  for (const route of entry.ROUTES.filter(r => r.prerender === false && !r.path.includes(":"))) {
    const { head, lang } = entry.renderHead(route.path);
    writeFile(outputPathFor(route.path), injectHead(template, head, lang));
  }

  // 404 page (Vercel serves dist/public/404.html with a 404 status).
  const notFound = await entry.render("/404");
  writeFile(path.join(OUT_DIR, "404.html"), buildDocument(notFound, "*404", "NotFound", []));

  const indexable = written.filter(p => entry.resolveSEO(p).robots.startsWith("index"));
  writeFile(path.join(OUT_DIR, "sitemap.xml"), sitemap(entry, indexable));
  writeFile(path.join(OUT_DIR, "robots.txt"), robots(entry.SITE_URL));
  writeFile(path.join(OUT_DIR, "blog", "rss.xml"), rss(entry));
  writeFile(path.join(OUT_DIR, "llms.txt"), llmsTxt(entry, indexable));

  checkInternalLinks(written);
  if (fs.existsSync(MANIFEST_PATH)) fs.rmSync(path.dirname(MANIFEST_PATH), { recursive: true, force: true });

  console.log(`[prerender] ${written.length} páginas + 404, sitemap.xml (${indexable.length} URLs), robots.txt, llms.txt y blog/rss.xml`);
  console.log(`[prerender] Blog: ${entry.POSTS.length} artículos publicados`);
}

/** Fails the build if a Suspense boundary fell back to client rendering. */
function assertFullyRendered(routePath: string, html: string) {
  if (html.includes("<!--$!-->") || html.includes("<!--$?-->")) {
    throw new Error(`${routePath}: some content suspended during prerender (missing preload?)`);
  }
  if (html.trim().length < 200) throw new Error(`${routePath}: rendered almost no content`);
}

function outputPathFor(routePath: string): string {
  if (routePath === "/") return TEMPLATE_PATH;
  return path.join(OUT_DIR, `${routePath.replace(/^\//, "")}.html`);
}

function writeFile(file: string, content: string) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf-8");
}

function injectHead(html: string, head: string, lang: string): string {
  return html
    .replace(/<html lang="[^"]*">/, `<html lang="${lang}">`)
    .replace(/<title>[^<]*<\/title>\s*/, "")
    .replace("<!--app-head-->", head);
}

function buildDocument(
  result: { html: string; head: string; lang: string },
  marker: string,
  page: string | undefined,
  extraChunks: string[]
): string {
  const preloads = modulePreloads(page, extraChunks);
  return injectHead(template, `${result.head}${preloads ? `\n    ${preloads}` : ""}`, result.lang).replace(
    '<div id="root"></div>',
    `<div id="root" data-prerendered="${marker}">${result.html}</div>`
  );
}

/** <link rel="modulepreload"> for a page chunk and its imports (the entry chunk is already in the template). */
function modulePreloads(page: string | undefined, extraChunks: string[]): string {
  const keys = [...(page ? [`src/pages/${page}.tsx`] : []), ...extraChunks];
  const files = new Set<string>();
  const css = new Set<string>();
  const visit = (key: string) => {
    const chunk = manifest[key];
    if (!chunk || chunk.isEntry) return;
    if (files.has(chunk.file)) return;
    files.add(chunk.file);
    chunk.css?.forEach(c => css.add(c));
    chunk.imports?.forEach(visit);
  };
  keys.forEach(visit);
  return [
    ...[...css].map(file => `<link rel="stylesheet" href="/${file}">`),
    ...[...files].map(file => `<link rel="modulepreload" crossorigin href="/${file}">`),
  ].join("\n    ");
}

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function sitemap(entry: EntryServer, paths: string[]): string {
  const postByPath = new Map(entry.POSTS.map(post => [`/blog/${post.slug}`, post]));
  const newestPost = entry.POSTS[0];
  const urls = paths.map(p => {
    const seo = entry.resolveSEO(p);
    const post = postByPath.get(p);
    const lastmod = post ? post.updated ?? post.date : p.startsWith("/blog") && newestPost ? newestPost.updated ?? newestPost.date : undefined;
    const alternates = seo.hreflang
      .map(h => `\n    <xhtml:link rel="alternate" hreflang="${h.lang}" href="${escapeXml(h.href)}"/>`)
      .join("");
    const image = `\n    <image:image><image:loc>${escapeXml(seo.image)}</image:loc></image:image>`;
    return `  <url>\n    <loc>${escapeXml(seo.canonical)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}${alternates}${image}\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join("\n")}
</urlset>
`;
}

function robots(siteUrl: string): string {
  return `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`;
}

function rss(entry: EntryServer): string {
  const items = entry.POSTS.slice(0, 50)
    .map(post => {
      const url = entry.absoluteUrl(`/blog/${post.slug}`);
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.date}T08:00:00+01:00`).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <description>${escapeXml(post.description)}</description>
    </item>`;
    })
    .join("\n");
  const blogUrl = entry.absoluteUrl("/blog");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog de Dialez Holidays</title>
    <link>${blogUrl}</link>
    <atom:link href="${entry.absoluteUrl("/blog/rss.xml")}" rel="self" type="application/rss+xml"/>
    <description>Guías para propietarios de viviendas vacacionales en Tenerife y Canarias: normativa, precios, Airbnb y Booking, gastos e impuestos.</description>
    <language>es-es</language>
${items}
  </channel>
</rss>
`;
}

/** llms.txt: a plain-text map of the site for AI assistants and AI search engines. */
function llmsTxt(entry: EntryServer, paths: string[]): string {
  const line = (p: string) => {
    const seo = entry.resolveSEO(p);
    return `- [${seo.title}](${seo.canonical}): ${seo.description}`;
  };
  const pages = paths.filter(p => !p.startsWith("/blog"));
  const posts = entry.POSTS.map(post => `/blog/${post.slug}`);
  return `# Dialez Holidays

> Gestora de alquiler vacacional y Airbnb en Tenerife (Islas Canarias), marca de Dialez Properties. Gestión integral de viviendas vacacionales: estimación de ingresos, fotografía profesional, anuncios en Airbnb, Booking y Vrbo, precios dinámicos, atención a huéspedes, check-in y check-out, limpieza y lavandería, mantenimiento, ayuda con la licencia de vivienda vacacional (VV) y el registro de viajeros, e informe mensual. Tarifa: desde el 15% de cada reserva confirmada, sin cuotas fijas ni gastos ocultos. Zonas: toda Tenerife (Costa Adeje, Los Cristianos, Playa de las Américas, El Médano, Los Gigantes, Puerto de la Cruz, Santa Cruz de Tenerife, La Laguna) y otras islas de Canarias bajo consulta.

Contacto: WhatsApp y teléfono +34 822 263 492 · contacto@dialezproperties.es

## Servicio y zonas

${pages.map(line).join("\n")}

## Blog

${posts.map(line).join("\n")}
`;
}

/** Paths redirected by vercel.json (e.g. legal pages pending creation). */
function redirectedPaths(): RegExp[] {
  const config = JSON.parse(fs.readFileSync(path.join(ROOT, "vercel.json"), "utf-8")) as {
    redirects?: { source: string; has?: unknown }[];
  };
  return (config.redirects ?? [])
    .filter(r => !r.has)
    .map(r => new RegExp(`^${r.source.replace(/:path\*/g, ".*").replace(/:[a-z]+/gi, "[^/]+")}$`));
}

/** Warns about internal links that point to pages that don't exist. */
function checkInternalLinks(pages: string[]) {
  const known = new Set(pages);
  const redirects = redirectedPaths();
  const broken = new Map<string, Set<string>>();
  for (const page of pages) {
    const html = fs.readFileSync(outputPathFor(page), "utf-8");
    const body = html.slice(html.indexOf('<div id="root"'));
    for (const match of body.matchAll(/href="(\/[^"#?]*)/g)) {
      const target = match[1].replace(/\/$/, "") || "/";
      if (known.has(target)) continue;
      if (fs.existsSync(path.join(OUT_DIR, target))) continue; // images, rss, …
      if (redirects.some(re => re.test(target))) continue;
      if (!broken.has(target)) broken.set(target, new Set());
      broken.get(target)!.add(page);
    }
  }
  for (const [target, sources] of broken) {
    console.warn(`[prerender] ⚠ enlace interno roto ${target} (en ${[...sources].join(", ")})`);
  }
}
