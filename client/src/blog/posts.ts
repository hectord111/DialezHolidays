/**
 * Artículos del blog. Los listados usan las "fichas" ligeras de todos los
 * artículos; el contenido completo de cada artículo se carga bajo demanda en
 * su propio chunk. Ver scripts/blog-markdown.ts y client/src/content/blog/README.md.
 */
import type { ZoneSlug } from "@/data/zones";
import type { CategorySlug } from "./categories";
import type { PostCard, PostFull } from "./types";

const cardModules = import.meta.glob<PostCard>(["../content/blog/*.md", "!../content/blog/README.md"], {
  eager: true,
  query: "?card",
  import: "default",
});

const fullLoaders = import.meta.glob<PostFull>(["../content/blog/*.md", "!../content/blog/README.md"], {
  query: "?full",
  import: "default",
});

function slugFromPath(file: string): string {
  return file.slice(file.lastIndexOf("/") + 1).replace(/\.md(\?.*)?$/, "");
}

const loaderBySlug = new Map(Object.entries(fullLoaders).map(([file, load]) => [slugFromPath(file), load]));

export function sortPosts<T extends PostCard>(posts: T[]): T[] {
  return posts.sort((a, b) => (a.date === b.date ? a.title.localeCompare(b.title, "es") : a.date < b.date ? 1 : -1));
}

/** Published posts, newest first. Scheduled posts (future `date`) are excluded. */
export const POSTS: PostCard[] = sortPosts(Object.values(cardModules).filter(post => post.published));

const cardBySlug = new Map(POSTS.map(post => [post.slug, post]));

/** Card of a published post. */
export function getPostCard(slug: string): PostCard | undefined {
  return cardBySlug.get(slug);
}

export function postsInCategory(category: CategorySlug): PostCard[] {
  return POSTS.filter(post => post.category === category);
}

// ── Full posts (metadata + HTML) ───────────────────────────────────────────
const fullCache = new Map<string, PostFull>();
const fullPromises = new Map<string, Promise<PostFull>>();

/** Loads (once) the full post. Only published posts can be loaded. */
export function loadPost(slug: string): Promise<PostFull> {
  let promise = fullPromises.get(slug);
  if (!promise) {
    const load = cardBySlug.has(slug) ? loaderBySlug.get(slug) : undefined;
    promise = load
      ? load().then(post => {
          fullCache.set(slug, post);
          return post;
        })
      : Promise.reject(new Error(`Unknown post: ${slug}`));
    fullPromises.set(slug, promise);
  }
  return promise;
}

/** The full post if it has already been loaded (always true after preloading the route). */
export function getLoadedPost(slug: string): PostFull | undefined {
  return fullCache.get(slug);
}

// ── Related content ────────────────────────────────────────────────────────
function score(post: PostCard, ctx: { zone?: ZoneSlug; category?: CategorySlug }): number {
  let s = 0;
  if (ctx.zone && post.zone === ctx.zone) s += 4;
  if (ctx.category && post.category === ctx.category) s += 2;
  // Every post is about vacation rentals in Tenerife: small base score so
  // related blocks are never empty.
  return s + 1;
}

/** Posts most related to a context (zone/category), newest first on ties. */
export function relatedPosts(ctx: { zone?: ZoneSlug; category?: CategorySlug; exclude?: string }, limit = 3): PostCard[] {
  return POSTS.filter(post => post.slug !== ctx.exclude)
    .map((post, index) => ({ post, index, score: score(post, ctx) }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map(item => item.post);
}
