import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { compilePost, slugify } from "./blog-markdown";

const BLOG_DIR = path.resolve(import.meta.dirname, "../client/src/content/blog");

const post = (frontmatter: string, body: string) => `---\n${frontmatter}\n---\n${body}`;
const VALID = `title: "Título"
description: "Descripción"
date: 2026-09-25
category: normativa
zone: costa-adeje
keywords: [uno, dos]
image: /images/x.webp
imageAlt: "Alt"
faq:
  - q: "¿Pregunta?"
    a: "Respuesta."`;

describe("compilePost", () => {
  it("parses frontmatter, headings, tables and FAQ", () => {
    const { meta, html } = compilePost(
      "/x/content/blog/mi-articulo.md",
      post(VALID, "Intro.\n\n# Título en el cuerpo\n\n## Qué es la licencia\n\n### Requisitos\n\n| a | b |\n| - | - |\n| 1 | 2 |\n"),
      new Set(),
      "2026-09-25"
    );
    expect(meta.slug).toBe("mi-articulo");
    expect(meta.date).toBe("2026-09-25");
    expect(meta.published).toBe(true);
    expect(meta.faq).toEqual([{ q: "¿Pregunta?", a: "Respuesta." }]);
    expect(meta.toc).toEqual([
      { id: "titulo-en-el-cuerpo", text: "Título en el cuerpo", level: 2 },
      { id: "que-es-la-licencia", text: "Qué es la licencia", level: 2 },
      { id: "requisitos", text: "Requisitos", level: 3 },
    ]);
    expect(html).not.toContain("<h1");
    expect(html).toContain('<h2 id="que-es-la-licencia">');
    expect(html).toContain('<div class="table-wrap"><table>');
  });

  it("marks future posts as unpublished", () => {
    const { meta } = compilePost("/x/content/blog/futuro.md", post(VALID.replace("2026-09-25", "2026-12-01"), "Hola"), new Set(), "2026-09-25");
    expect(meta.published).toBe(false);
  });

  it("only links to published posts", () => {
    const { html } = compilePost(
      "/x/content/blog/a.md",
      post(VALID, "[publicado](/blog/b) y [programado](/blog/c) y [servicio](/tarifas) y [fuera](https://www.boe.es/x)"),
      new Set(["b"]),
      "2026-09-25"
    );
    expect(html).toContain('<a href="/blog/b">publicado</a>');
    expect(html).not.toContain("/blog/c");
    expect(html).toContain("programado");
    expect(html).toContain('<a href="/tarifas">servicio</a>');
    expect(html).toContain('target="_blank" rel="noopener noreferrer"');
  });

  it("rejects invalid categories and dates", () => {
    expect(() => compilePost("/x/content/blog/a.md", post(VALID.replace("category: normativa", "category: otra"), "x"), new Set())).toThrow(/categoría/);
    expect(() => compilePost("/x/content/blog/a.md", post(VALID.replace("date: 2026-09-25", "date: 25/09/2026"), "x"), new Set())).toThrow(/AAAA-MM-DD/);
  });

  it("rejects unknown zones", () => {
    expect(() => compilePost("/x/content/blog/a.md", post(VALID.replace("zone: costa-adeje", "zone: marte"), "x"), new Set())).toThrow(/zone/);
  });

  it("slugifies Spanish text", () => {
    expect(slugify("¿Cuánto cuesta la licencia en Tenerife?")).toBe("cuanto-cuesta-la-licencia-en-tenerife");
  });
});

describe("blog content", () => {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".md") && f !== "README.md");
  const all = new Set(files.map(f => f.replace(/\.md$/, "")));

  it.each(files)("%s is a valid post", file => {
    const { meta, html } = compilePost(path.join(BLOG_DIR, file), fs.readFileSync(path.join(BLOG_DIR, file), "utf8"), all, "2099-01-01");
    expect(meta.description.length).toBeGreaterThanOrEqual(110);
    expect(meta.description.length).toBeLessThanOrEqual(170);
    expect(String(meta.seoTitle ?? meta.title).length).toBeLessThanOrEqual(65);
    expect(meta.faq.length).toBeGreaterThanOrEqual(3);
    expect(meta.wordCount).toBeGreaterThanOrEqual(900);
    expect(fs.existsSync(path.resolve(BLOG_DIR, "../../../public", String(meta.image).replace(/^\//, "")))).toBe(true);
    // Links to other posts must point to posts that exist.
    for (const match of html.matchAll(/href="\/blog\/([a-z0-9-]+)"/g)) {
      if (match[1] !== "categoria") expect(all.has(match[1]), `link to /blog/${match[1]}`).toBe(true);
    }
  });
});
