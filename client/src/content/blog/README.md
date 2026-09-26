# Blog de Dialez Holidays — cómo publicar artículos

Cada artículo es un archivo Markdown (`.md`) en esta carpeta. El nombre del
archivo es la URL: `ley-vivienda-vacacional-canarias.md` se publica en
`https://dialezholidays.com/blog/ley-vivienda-vacacional-canarias`.

Al desplegar, la web genera automáticamente el HTML de cada artículo, el índice
del blog, las páginas de categoría, el `sitemap.xml`, el feed RSS
(`/blog/rss.xml`) y el `llms.txt`. No hay que tocar código para publicar.

El blog tiene un único tema: **alquiler vacacional en Tenerife y Canarias**
visto desde el propietario (normativa, rentabilidad, gestión, Airbnb/Booking,
impuestos y zonas). El objetivo SEO es que los propietarios encuentren la web
al buscar gestoras de Airbnb o de alquiler vacacional en Tenerife y Canarias.

## Programar artículos

Un artículo con `date` en el futuro **no se publica** hasta que se vuelve a
generar la web ese día o después. Cualquier push a `main` redespliega la web y
publica los programados cuya fecha ya haya llegado. Como respaldo, el workflow
`.github/workflows/publicar-blog.yml` lanza un redespliegue diario en Vercel
(necesita el secreto `VERCEL_DEPLOY_HOOK_URL`; ver el propio archivo).

## Rutina automática (Claude)

La rutina semanal **"Dialez Holidays: artículo semanal del blog"** (claude.ai →
Routines) escribe un artículo nuevo siguiendo esta guía, elige el tema en
`docs/blog-temas.md`, lo valida y lo publica en `main`.

## Plantilla

```markdown
---
title: "Título completo del artículo (es el H1)"
seoTitle: "Título corto para Google (máx. 60 caracteres)"
description: "Meta descripción de 140-160 caracteres con la palabra clave principal y un beneficio claro."
date: 2026-10-01
updated: 2026-11-15            # opcional, si se actualiza el contenido
category: normativa            # ver categorías abajo
zone: costa-adeje              # opcional: el artículo trata de una zona concreta
keywords: [palabra clave principal, secundaria 1, secundaria 2, secundaria 3]
image: /images/salon-vistas-mar-tenerife.webp
imageAlt: "Descripción de lo que se ve en la imagen"
featured: true                 # opcional: lo muestra como artículo principal del blog
faq:
  - q: "¿Pregunta frecuente 1?"
    a: "Respuesta completa en 1-3 frases."
  - q: "¿Pregunta frecuente 2?"
    a: "Respuesta."
---

Párrafo de introducción (sin título: el `title` ya es el H1). Incluye la
palabra clave principal en las primeras 100 palabras.

## Primer apartado (H2)

Texto, listas, **negritas**, [enlaces internos](/tarifas)…

### Subapartado (H3)

| Columna | Columna |
| ------- | ------- |
| Dato    | Dato    |
```

- `zone` decide el bloque de llamada a la acción del final del artículo (enlaza
  a la página de esa zona) y los artículos relacionados.
- `faq` se muestra al final del artículo y se publica como datos estructurados
  `FAQPage`. Nunca pongas una sección de FAQ en el cuerpo.
- Los enlaces a otros artículos (`/blog/slug`) que todavía no estén publicados
  se muestran como texto normal y se activan solos cuando se publica el
  artículo enlazado.

## Categorías

| `category`     | Nombre                 | Temas                                                         |
| -------------- | ---------------------- | ------------------------------------------------------------- |
| `normativa`    | Normativa y licencias  | Ley 6/2025, licencia VV, comunidad, registro de viajeros      |
| `rentabilidad` | Rentabilidad y precios | Ingresos, temporadas, precios, gastos, ocupación              |
| `gestion`      | Gestión y Airbnb       | Airbnb, Booking, Vrbo, reseñas, huéspedes, limpieza, gestoras |
| `fiscalidad`   | Impuestos              | IGIC, IRPF, IRNR, modelos, gastos deducibles                  |
| `zonas`        | Zonas de Tenerife      | Guías de zona para propietarios                               |

## Zonas (`zone`) y páginas de servicio

| `zone`                                 | Página                                          |
| -------------------------------------- | ----------------------------------------------- |
| `costa-adeje`                          | `/zonas/costa-adeje`                            |
| `los-cristianos-playa-de-las-americas` | `/zonas/los-cristianos-playa-de-las-americas`   |
| `puerto-de-la-cruz`                    | `/zonas/puerto-de-la-cruz`                      |
| `santa-cruz-de-tenerife`               | `/zonas/santa-cruz-de-tenerife`                 |
| `el-medano`                            | `/zonas/el-medano`                              |
| `los-gigantes`                         | `/zonas/los-gigantes`                           |

Otras páginas para enlazar: `/` (gestión de alquiler vacacional en Tenerife,
la página principal), `/tarifas`, `/canarias` y `/en` (inglés).

## Imágenes disponibles

Cualquier archivo de `client/public/images/`:

- `apartamento-bienvenida.webp` — dormitorio preparado para huéspedes, cesta de bienvenida y vistas al mar
- `villa-piscina-tenerife.webp` — villa con piscina infinita al anochecer, La Gomera al fondo
- `terraza-vistas-mar-tenerife.webp` — terraza con sofás y desayuno frente a una costa acantilada
- `salon-vistas-mar-tenerife.webp` — salón con pared de piedra volcánica y terraza con vistas al mar
- `terraza-atardecer-tenerife.jpg` — terraza de villa con sofás al atardecer frente al mar
- `dormitorio-apartamento-vacacional.jpg` — estudio luminoso con cama, salón y terraza al mar
- `teide-tenerife.webp` — carretera con el Teide al fondo
- `playa-tenerife-hero.webp` — playa del sur de Tenerife al atardecer (la de la portada; mejor no repetirla)

Evita usar la misma imagen que el artículo más reciente. Para añadir una
nueva, cópiala en esa carpeta (`.webp` o `.jpg`, ~1600 px de ancho).

## Datos de Dialez Holidays (no inventar otros)

- Gestión integral de viviendas vacacionales en Tenerife, con equipo local.
  Marca de Dialez Properties.
- Tarifa: **desde el 15% de cada reserva confirmada**, sin cuotas fijas ni
  gastos ocultos. Estimación de ingresos gratuita.
- Incluye: fotografía profesional, anuncios en Airbnb, Booking y Vrbo en varios
  idiomas, precios dinámicos, reservas y mensajes con huéspedes, check-in y
  check-out, coordinación de limpieza y lavandería, mantenimiento, ayuda con la
  licencia VV y el registro de viajeros, e informe mensual.
- WhatsApp y teléfono: +34 822 263 492.
- No publicar cifras de ocupación, ingresos garantizados, número de viviendas
  gestionadas, años de experiencia ni testimonios.

## Buenas prácticas SEO

- Una palabra clave principal por artículo, en `title`, `seoTitle`,
  `description`, la introducción y al menos un H2. No competir con otro
  artículo por la misma palabra clave.
- 1.300-2.000 palabras, en español de España y tuteando, con H2/H3 claros,
  listas y alguna tabla, y una conclusión.
- 2-4 enlaces internos a páginas de servicio y 1-2 a otros artículos.
- No inventar cifras: rangos orientativos y fuentes oficiales (BOE, BOC,
  Gobierno de Canarias, Cabildo, Agencia Tributaria, ATC, INE, ISTAC). Enlaces
  externos solo a organismos oficiales y con la URL comprobada.
- Mencionar Dialez Holidays como mucho una o dos veces: el bloque de contacto
  del final se añade solo.
- No copiar textos del blog de dialezproperties.es: el contenido duplicado
  entre dominios perjudica a las dos webs.
