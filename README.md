# Dialez Holidays

Web de **gestión de alquiler vacacional en Tenerife** (marca de Dialez
Properties): portada, tarifas, página de Canarias, una página por zona de la
isla, versión en inglés y blog con publicación semanal automática.

Dominio: `https://holidays.dialezproperties.es`, subdominio de la web de
Dialez Properties (definido en `client/src/seo/site.ts`,
`scripts/seo-audit.ts` y `scripts/blog-markdown.ts`; si cambia, basta con
cambiarlo en esos tres sitios).

## Tecnología

Vite + React 19 + Tailwind CSS 4. Todas las páginas se **prerenderizan a HTML
estático** en el build (`scripts/prerender.ts`) con su SEO completo: título,
descripción, canónica, Open Graph, hreflang, datos estructurados (JSON-LD) y
precarga de la foto de portada. El build genera también `sitemap.xml`,
`robots.txt`, `llms.txt` y el RSS del blog. No hay servidor ni base de datos:
los formularios abren WhatsApp con el mensaje preparado.

## Comandos

```bash
pnpm install
pnpm dev          # desarrollo en http://localhost:5173
pnpm check        # TypeScript
pnpm test         # validación de los artículos del blog
pnpm build        # build + prerender en dist/public
pnpm seo:audit    # auditoría SEO del build (sale con error si algo falla)
pnpm preview      # sirve dist/public como Vercel (http://localhost:4173)
```

## Estructura

- `client/src/pages/` — páginas (`Home`, `Tarifas`, `Canarias`, `Zona`, `HomeEN`, blog…).
- `client/src/data/` — contenido: zonas (`zones.ts`) y servicio (`service.ts`).
- `client/src/seo/` — SEO de cada página (`pages.ts`) y del blog (`index.ts`).
- `client/src/content/blog/` — artículos en Markdown. Guía: `client/src/content/blog/README.md`.
- `docs/blog-temas.md` — calendario de temas que sigue la rutina semanal del blog.
- `client/public/images/` — fotos (WebP/JPG).

## Despliegue en Vercel

1. Importar el repositorio en Vercel (framework Vite; `vercel.json` ya define
   el build `pnpm run build` y la salida `dist/public`).
2. Añadir el dominio `holidays.dialezproperties.es` al proyecto de Vercel y,
   en Cloudflare (DNS de dialezproperties.es), crear un registro CNAME
   `holidays` → `cname.vercel-dns.com` (sin proxy, nube gris).
3. Opcional: crear un Deploy Hook y guardarlo como secreto
   `VERCEL_DEPLOY_HOOK_URL` en GitHub para publicar a diario los artículos
   programados (`.github/workflows/publicar-blog.yml`).
4. Dar de alta el dominio en Google Search Console y enviar `sitemap.xml`.
