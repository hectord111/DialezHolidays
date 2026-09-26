/**
 * Auditoría SEO del sitio generado (dist/public).
 *
 * Revisa cada página prerenderizada: título, meta descripción, canónica,
 * robots, H1, Open Graph, JSON-LD, idioma, imágenes y enlaces internos; y
 * además sitemap.xml, robots.txt, duplicados, peso del JavaScript inicial y
 * el calendario de artículos programados del blog.
 *
 * Uso: pnpm run build && pnpm run seo:audit
 * Sale con código 1 si hay errores (los avisos no bloquean).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "dist", "public");
const BLOG_DIR = path.join(ROOT, "client", "src", "content", "blog");
const SITE = "https://holidays.dialezproperties.es";
const CLIENT_ONLY = new Set(["404.html"]);

const errors: string[] = [];
const warnings: string[] = [];
const error = (page: string, msg: string) => errors.push(`${page}: ${msg}`);
const warn = (page: string, msg: string) => warnings.push(`${page}: ${msg}`);

if (!fs.existsSync(path.join(OUT, "index.html"))) {
  console.error("No existe dist/public. Ejecuta antes: pnpm run build");
  process.exit(1);
}

function htmlFiles(dir: string, base = ""): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const rel = path.join(base, entry.name);
    if (entry.isDirectory()) return entry.name === "assets" || entry.name === "images" ? [] : htmlFiles(path.join(dir, entry.name), rel);
    return entry.name.endsWith(".html") ? [rel] : [];
  });
}

function routeOf(file: string): string {
  if (file === "index.html") return "/";
  return `/${file.replace(/\.html$/, "")}`;
}

const decode = (s: string) =>
  s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const attr = (html: string, re: RegExp) => {
  const m = re.exec(html);
  return m ? decode(m[1]) : undefined;
};

const redirects = (() => {
  const config = JSON.parse(fs.readFileSync(path.join(ROOT, "vercel.json"), "utf-8")) as { redirects?: { source: string; has?: unknown }[] };
  return (config.redirects ?? [])
    .filter(r => !r.has)
    .map(r => new RegExp(`^${r.source.replace(/:path\*/g, ".*").replace(/:[a-z]+/gi, "[^/]+")}$`));
})();

const files = htmlFiles(OUT);
const routes = new Set(files.map(routeOf));
const titles = new Map<string, string[]>();
const descriptions = new Map<string, string[]>();
const indexable = new Set<string>();

for (const file of files) {
  const html = fs.readFileSync(path.join(OUT, file), "utf-8");
  const route = routeOf(file);
  const head = html.slice(0, html.indexOf("</head>"));
  // The Meta Pixel <noscript> image is a tracking beacon, not content.
  const body = html.slice(html.indexOf("<body")).replace(/<noscript>[\s\S]*?<\/noscript>/g, "");

  const title = attr(head, /<title>([^<]*)<\/title>/);
  const description = attr(head, /<meta name="description" content="([^"]*)"/);
  const canonical = attr(head, /<link rel="canonical" href="([^"]*)"/);
  const robots = attr(head, /<meta name="robots" content="([^"]*)"/) ?? "";
  const ogImage = attr(head, /<meta property="og:image" content="([^"]*)"/);
  const lang = attr(html, /<html lang="([^"]*)"/);

  if (!title) error(route, "sin <title>");
  if (!description) error(route, "sin meta descripción");
  if (!canonical) error(route, "sin canónica");
  if (!robots) error(route, "sin meta robots");
  if (!lang) error(route, "sin atributo lang en <html>");

  const noindex = robots.includes("noindex");
  if (CLIENT_ONLY.has(file)) {
    if (!noindex) error(route, "página de utilidad sin noindex");
    continue;
  }
  if (!noindex) indexable.add(route);

  // Contenido prerenderizado
  if (!/<div id="root" data-prerendered="[^"]+">/.test(body)) error(route, "el contenido no está prerenderizado");
  const h1s = body.match(/<h1[\s>]/g)?.length ?? 0;
  if (h1s !== 1) error(route, `tiene ${h1s} H1 (debe tener 1)`);

  if (title) {
    if (title.length < 25 || title.length > 70) warn(route, `título de ${title.length} caracteres (ideal 30-65): "${title}"`);
    titles.set(title, [...(titles.get(title) ?? []), route]);
  }
  if (description) {
    if (description.length < 70 || description.length > 175) warn(route, `meta descripción de ${description.length} caracteres (ideal 120-165)`);
    descriptions.set(description, [...(descriptions.get(description) ?? []), route]);
  }
  if (canonical) {
    const expected = route === "/" ? `${SITE}/` : `${SITE}${route}`;
    if (canonical !== expected && !noindex) error(route, `canónica ${canonical} (se esperaba ${expected})`);
  }
  if (!ogImage?.startsWith(SITE)) error(route, "og:image ausente o no absoluta");
  else if (!fs.existsSync(path.join(OUT, ogImage.slice(SITE.length)))) error(route, `og:image no existe: ${ogImage}`);

  // Datos estructurados
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (blocks.length === 0) error(route, "sin datos estructurados JSON-LD");
  for (const block of blocks) {
    try {
      JSON.parse(block[1]);
    } catch {
      error(route, "JSON-LD inválido");
    }
  }
  if (route.startsWith("/blog/") && !route.startsWith("/blog/categoria/") && !html.includes('"@type":"BlogPosting"')) {
    error(route, "artículo sin BlogPosting");
  }

  // Imágenes y enlaces internos
  for (const m of body.matchAll(/<img[^>]+src="(\/[^"]+)"/g)) {
    if (!fs.existsSync(path.join(OUT, decodeURIComponent(m[1])))) error(route, `imagen inexistente ${m[1]}`);
  }
  for (const m of body.matchAll(/<img(?![^>]*\balt=)[^>]*>/g)) warn(route, `imagen sin alt: ${m[0].slice(0, 80)}`);
  for (const m of body.matchAll(/href="(\/[^"#?]*)/g)) {
    const target = m[1].replace(/\/$/, "") || "/";
    if (routes.has(target)) continue;
    if (fs.existsSync(path.join(OUT, target))) continue;
    if (redirects.some(re => re.test(target))) {
      warn(route, `enlace a ${target}, que es una redirección temporal`);
      continue;
    }
    error(route, `enlace interno roto ${target}`);
  }
}

for (const [title, pages] of titles) if (pages.length > 1) error(pages.join(", "), `título duplicado "${title}"`);
for (const [, pages] of descriptions) if (pages.length > 1) error(pages.join(", "), "meta descripción duplicada");

// Sitemap y robots
const sitemap = fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf-8");
const sitemapRoutes = new Set(
  [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => (m[1] === `${SITE}/` ? "/" : m[1].replace(SITE, "")))
);
for (const route of sitemapRoutes) {
  if (!routes.has(route)) error("sitemap.xml", `URL sin página: ${route}`);
  else if (!indexable.has(route)) error("sitemap.xml", `incluye una página noindex: ${route}`);
}
for (const route of indexable) if (!sitemapRoutes.has(route)) error("sitemap.xml", `falta la página indexable ${route}`);
const robotsTxt = fs.readFileSync(path.join(OUT, "robots.txt"), "utf-8");
if (!robotsTxt.includes(`Sitemap: ${SITE}/sitemap.xml`)) error("robots.txt", "no declara el sitemap");
if (/Disallow:\s*\/\s*$/m.test(robotsTxt)) error("robots.txt", "bloquea todo el sitio");

// Peso del JavaScript inicial
const index = fs.readFileSync(path.join(OUT, "index.html"), "utf-8");
const entry = attr(index, /<script type="module" crossorigin src="\/(assets\/[^"]+\.js)"/);
if (entry) {
  const kb = Math.round(fs.statSync(path.join(OUT, entry)).size / 1024);
  if (kb > 350) warn("JS", `el bundle inicial pesa ${kb} KB (objetivo < 350 KB)`);
}

// Calendario del blog
const today = new Date().toISOString().slice(0, 10);
const posts = fs
  .readdirSync(BLOG_DIR)
  .filter(f => f.endsWith(".md") && f !== "README.md")
  .map(f => {
    const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(fs.readFileSync(path.join(BLOG_DIR, f), "utf-8"));
    const data = (fm ? parseYaml(fm[1]) : {}) as { date?: string | Date; category?: string };
    const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? "");
    return { slug: f.replace(/\.md$/, ""), date, category: data.category };
  });
const published = posts.filter(p => p.date <= today);
const scheduled = posts.filter(p => p.date > today).sort((a, b) => a.date.localeCompare(b.date));
const lastPublished = published.map(p => p.date).sort().at(-1);
if (lastPublished) {
  const days = Math.round((Date.parse(today) - Date.parse(lastPublished)) / 86_400_000);
  if (days > 10) warn("blog", `el último artículo publicado es de hace ${days} días (${lastPublished})`);
}
const unpublishedInSitemap = scheduled.filter(p => sitemapRoutes.has(`/blog/${p.slug}`));
for (const p of unpublishedInSitemap) error("sitemap.xml", `incluye un artículo programado: ${p.slug}`);
const missingPublished = published.filter(p => !routes.has(`/blog/${p.slug}`));
for (const p of missingPublished) {
  warn("blog", `${p.slug} (fecha ${p.date}) no está en la web generada: vuelve a desplegar para publicarlo`);
}

// Informe
const byCategory = published.reduce<Record<string, number>>((acc, p) => {
  const key = p.category ?? "?";
  acc[key] = (acc[key] ?? 0) + 1;
  return acc;
}, {});
console.log(`\nAuditoría SEO — ${today}`);
console.log(`Páginas: ${files.length} (${indexable.size} indexables, ${sitemapRoutes.size} en el sitemap)`);
console.log(`Blog: ${published.length} publicados ${JSON.stringify(byCategory)}, ${scheduled.length} programados`);
if (scheduled.length > 0) console.log(`Próximos: ${scheduled.slice(0, 4).map(p => `${p.date} ${p.slug}`).join(" · ")}`);
console.log(`\nErrores (${errors.length}):`);
errors.forEach(e => console.log(`  ✗ ${e}`));
console.log(`\nAvisos (${warnings.length}):`);
warnings.forEach(w => console.log(`  ! ${w}`));
process.exit(errors.length > 0 ? 1 : 0);
