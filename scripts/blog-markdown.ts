/**
 * Vite plugin: compiles the blog's Markdown files at build time.
 *
 * Each `client/src/content/blog/<slug>.md` can be imported in three flavours
 * (default export in every case):
 *   - `<file>.md?card`  -> the few fields needed to list the post (title,
 *                          description, date, category, image…)
 *   - `<file>.md?meta`  -> all the metadata (frontmatter, table of contents,
 *                          FAQ, word count, published flag)
 *   - `<file>.md?full`  -> the metadata plus the article body as HTML
 * Listings only ship the cards and each article lives in its own lazily
 * loaded chunk. No Markdown parser reaches the browser.
 */
import fs from "node:fs";
import path from "node:path";
import { Marked, type Renderer, type Tokens } from "marked";
import { parse as parseYaml } from "yaml";
import type { Plugin } from "vite";

export const BLOG_DIR_SEGMENT = "/content/blog/";
// Keep in sync with client/src/blog/categories.ts and client/src/data/zones.ts.
export const CATEGORIES = ["normativa", "rentabilidad", "gestion", "fiscalidad", "zonas"];
export const ZONES = [
  "costa-adeje",
  "los-cristianos-playa-de-las-americas",
  "puerto-de-la-cruz",
  "santa-cruz-de-tenerife",
  "el-medano",
  "los-gigantes",
];
const WORDS_PER_MINUTE = 220;

export interface CompiledPost {
  meta: Record<string, unknown> & { slug: string; date: string; published: boolean };
  html: string;
}

/** Today's date (YYYY-MM-DD). `BLOG_TODAY` overrides it (useful for previews and tests). */
export function blogToday(): string {
  return process.env.BLOG_TODAY || new Date().toISOString().slice(0, 10);
}

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function toIsoDate(value: unknown, field: string, file: string): string {
  const iso = value instanceof Date ? value.toISOString().slice(0, 10) : String(value ?? "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    throw new Error(`[blog] ${file}: "${field}" debe tener el formato AAAA-MM-DD (valor: ${String(value)})`);
  }
  return iso;
}

export function splitFrontmatter(source: string, file: string): { data: Record<string, unknown>; body: string } {
  const match = /^﻿?---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(source);
  if (!match) throw new Error(`[blog] ${file}: falta el bloque de frontmatter (--- ... ---) al principio del archivo`);
  const data = parseYaml(match[1]) as Record<string, unknown>;
  if (!data || typeof data !== "object") throw new Error(`[blog] ${file}: frontmatter vacío o inválido`);
  return { data, body: match[2] };
}

/** Published slugs of the blog directory (to deactivate links to scheduled posts). */
function publishedSlugs(dir: string, today: string): Set<string> {
  const slugs = new Set<string>();
  for (const name of fs.readdirSync(dir)) {
    if (!name.endsWith(".md") || name === "README.md") continue;
    try {
      const { data } = splitFrontmatter(fs.readFileSync(path.join(dir, name), "utf8"), name);
      if (toIsoDate(data.date, "date", name) <= today) slugs.add(name.replace(/\.md$/, ""));
    } catch {
      // Invalid files fail loudly when they are compiled themselves.
    }
  }
  return slugs;
}

export function compilePost(file: string, source: string, published: Set<string>, today = blogToday()): CompiledPost {
  const name = path.basename(file);
  const slug = name.replace(/\.md$/, "");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`[blog] ${name}: el nombre del archivo solo puede tener minúsculas, números y guiones`);
  }
  const { data, body } = splitFrontmatter(source, name);

  const required = ["title", "description", "date", "category", "image", "imageAlt"];
  for (const field of required) {
    if (data[field] === undefined || data[field] === null || data[field] === "") {
      throw new Error(`[blog] ${name}: falta el campo obligatorio "${field}"`);
    }
  }
  if (!CATEGORIES.includes(String(data.category))) {
    throw new Error(`[blog] ${name}: categoría "${String(data.category)}" no válida (usa: ${CATEGORIES.join(", ")})`);
  }
  if (data.zone !== undefined && !ZONES.includes(String(data.zone))) {
    throw new Error(`[blog] ${name}: zone "${String(data.zone)}" no válida (usa: ${ZONES.join(", ")})`);
  }
  const date = toIsoDate(data.date, "date", name);
  const updated = data.updated !== undefined ? toIsoDate(data.updated, "updated", name) : undefined;
  const faq = Array.isArray(data.faq)
    ? data.faq.map((item: { q?: unknown; a?: unknown }, i: number) => {
        if (!item?.q || !item?.a) throw new Error(`[blog] ${name}: la pregunta ${i + 1} de "faq" necesita "q" y "a"`);
        return { q: String(item.q), a: String(item.a) };
      })
    : [];

  // ── Markdown -> HTML ─────────────────────────────────────────────────────
  const toc: { id: string; text: string; level: 2 | 3 }[] = [];
  const usedIds = new Set<string>();
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading(this: Renderer, token: Tokens.Heading) {
        const inner = this.parser.parseInline(token.tokens);
        // The post title is the page's only H1: demote stray H1s in the body.
        const level = Math.max(2, Math.min(token.depth, 4));
        let id = slugify(stripTags(inner)) || "seccion";
        while (usedIds.has(id)) id += "-2";
        usedIds.add(id);
        if (level === 2 || level === 3) toc.push({ id, text: stripTags(inner), level });
        return `<h${level} id="${id}">${inner}</h${level}>\n`;
      },
      link(this: Renderer, token: Tokens.Link) {
        const text = this.parser.parseInline(token.tokens);
        const href = token.href;
        const blogLink = /^\/blog\/([a-z0-9-]+)\/?(?:#.*)?$/.exec(href);
        if (blogLink && blogLink[1] !== "categoria" && !published.has(blogLink[1])) {
          // Scheduled (not yet published) article: plain text until it goes live.
          return text;
        }
        const title = token.title ? ` title="${escapeHtml(token.title)}"` : "";
        if (/^https?:\/\//.test(href) && !href.includes("dialezholidays.com")) {
          return `<a href="${escapeHtml(href)}"${title} target="_blank" rel="noopener noreferrer">${text}</a>`;
        }
        return `<a href="${escapeHtml(href)}"${title}>${text}</a>`;
      },
      image(token: Tokens.Image) {
        const title = token.title ? ` title="${escapeHtml(token.title)}"` : "";
        return `<img src="${escapeHtml(token.href)}" alt="${escapeHtml(token.text)}"${title} loading="lazy" decoding="async">`;
      },
    },
  });
  const html = (marked.parse(body, { async: false }) as string)
    // Wide tables scroll horizontally on mobile.
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, "</table></div>");

  const wordCount = stripTags(html).split(/\s+/).filter(Boolean).length;
  const keywords = Array.isArray(data.keywords)
    ? data.keywords.map(String)
    : typeof data.keywords === "string"
      ? data.keywords.split(",").map(s => s.trim()).filter(Boolean)
      : [];

  return {
    meta: {
      slug,
      title: String(data.title),
      ...(data.seoTitle ? { seoTitle: String(data.seoTitle) } : {}),
      description: String(data.description),
      date,
      ...(updated ? { updated } : {}),
      category: String(data.category),
      ...(data.zone ? { zone: String(data.zone) } : {}),
      keywords,
      image: String(data.image),
      imageAlt: String(data.imageAlt),
      ...(data.featured === true ? { featured: true } : {}),
      faq,
      toc,
      wordCount,
      readingMinutes: Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE)),
      published: date <= today,
    },
    html,
  };
}

const CARD_FIELDS = [
  "slug",
  "title",
  "description",
  "date",
  "updated",
  "category",
  "zone",
  "image",
  "imageAlt",
  "readingMinutes",
  "featured",
  "published",
];

function toCard(meta: CompiledPost["meta"]): Record<string, unknown> {
  return Object.fromEntries(CARD_FIELDS.filter(key => meta[key] !== undefined).map(key => [key, meta[key]]));
}

export function blogMarkdownPlugin(): Plugin {
  return {
    name: "dialez-holidays-blog-markdown",
    enforce: "pre",
    load(id) {
      const [file, query] = id.split("?");
      if (!file.endsWith(".md") || !file.includes(BLOG_DIR_SEGMENT)) return null;
      if (query !== "card" && query !== "meta" && query !== "full") return null;
      const dir = path.dirname(file);
      this.addWatchFile(file);
      const today = blogToday();
      const { meta, html } = compilePost(file, fs.readFileSync(file, "utf8"), publishedSlugs(dir, today), today);
      const data = query === "card" ? toCard(meta) : query === "meta" ? meta : { ...meta, html };
      return `export default ${JSON.stringify(data)};`;
    },
  };
}
