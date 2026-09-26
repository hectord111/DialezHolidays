/**
 * BLOG — artículo
 * Ruta: /blog/:slug  (contenido en client/src/content/blog/<slug>.md)
 */
import { use } from "react";
import { useParams } from "wouter";
import { CalendarDays, ChevronDown, Clock, ListOrdered, Plus } from "lucide-react";
import { getCategory } from "@/blog/categories";
import { getLoadedPost, getPostCard, loadPost, relatedPosts } from "@/blog/posts";
import type { PostFull } from "@/blog/types";
import BlogCta from "@/components/blog/BlogCta";
import PostCard from "@/components/blog/PostCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import Layout from "@/components/Layout";
import { formatDate } from "@/lib/format";
import NotFound from "../NotFound";

function TableOfContents({ post }: { post: PostFull }) {
  const items = post.toc.filter(item => item.level === 2);
  return (
    <ol className="space-y-2.5 text-sm">
      {items.map(item => (
        <li key={item.id}>
          <a href={`#${item.id}`} className="block leading-snug text-muted-foreground transition-colors hover:text-gold-ink">
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

function Article({ post }: { post: PostFull }) {
  const category = getCategory(post.category);
  const related = relatedPosts({ zone: post.zone, category: post.category, exclude: post.slug }, 3);
  const updated = post.updated && post.updated !== post.date ? post.updated : undefined;
  const hasToc = post.toc.filter(item => item.level === 2).length >= 3;

  return (
    <Layout>
      <article>
        <header className="bg-sand">
          <div className="container pb-14 pt-10 md:pb-20 md:pt-14">
            <Breadcrumbs
              items={[
                { label: "Inicio", href: "/" },
                { label: "Blog", href: "/blog" },
                ...(category ? [{ label: category.name, href: `/blog/categoria/${category.slug}` }] : []),
                { label: post.title },
              ]}
            />
            <div className="mt-10 max-w-4xl">
              {category && (
                <a href={`/blog/categoria/${category.slug}`} className="eyebrow hover:opacity-80">
                  {category.name}
                </a>
              )}
              <h1 className="mt-5 text-4xl font-medium leading-[1.08] text-ocean md:text-5xl lg:text-6xl">{post.title}</h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">{post.description}</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span>
                  Por <strong className="font-semibold text-foreground">el equipo de Dialez Holidays</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </span>
                {updated && (
                  <span>
                    Actualizado: <time dateTime={updated}>{formatDate(updated)}</time>
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" /> {post.readingMinutes} min de lectura
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="container">
          <figure className="relative -mt-2 aspect-[16/9] max-h-[600px] w-full overflow-hidden rounded-[2rem] bg-muted shadow-[0_40px_80px_-40px_rgb(16_40_59/0.4)] md:-mt-6">
            <img src={post.image} alt={post.imageAlt} fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          </figure>
        </div>

        <div className="container mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 max-w-3xl">
            {hasToc && (
              <details className="group mb-10 rounded-[1.25rem] border border-border bg-card p-5 lg:hidden">
                <summary className="flex items-center justify-between font-semibold text-ocean">
                  <span className="flex items-center gap-2">
                    <ListOrdered className="h-4 w-4 text-gold-ink" /> Contenido del artículo
                  </span>
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-4">
                  <TableOfContents post={post} />
                </div>
              </details>
            )}

            <div className="article-content" dangerouslySetInnerHTML={{ __html: post.html }} />

            {post.faq.length > 0 && (
              <section className="mt-16" aria-labelledby="preguntas-frecuentes">
                <h2 id="preguntas-frecuentes" className="mb-6 text-4xl font-medium text-ocean">
                  Preguntas frecuentes
                </h2>
                <div className="divide-y divide-border border-y border-border">
                  {post.faq.map(item => (
                    <details key={item.q} className="group py-1">
                      <summary className="flex items-start justify-between gap-4 py-5">
                        <h3 className="text-base font-semibold text-ocean md:text-lg" style={{ fontFamily: "var(--font-sans)" }}>
                          {item.q}
                        </h3>
                        <Plus className="mt-1 h-4 w-4 flex-shrink-0 text-gold-ink transition-transform group-open:rotate-45" />
                      </summary>
                      <p className="pb-5 leading-relaxed text-muted-foreground">{item.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-16">
              <BlogCta zone={post.zone} />
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              {hasToc && (
                <nav aria-label="Contenido del artículo" className="rounded-[1.5rem] border border-border bg-card p-7">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">En este artículo</p>
                  <TableOfContents post={post} />
                </nav>
              )}
              <BlogCta zone={post.zone} compact />
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="container mt-24 pb-24" aria-labelledby="relacionados">
          <h2 id="relacionados" className="mb-10 text-4xl font-medium text-ocean">
            Artículos relacionados
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map(item => (
              <PostCard key={item.slug} post={item} />
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
}

function LoadingPost({ slug }: { slug: string }) {
  return <Article post={use(loadPost(slug))} />;
}

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";
  if (!getPostCard(slug)) return <NotFound />;
  const post = getLoadedPost(slug);
  return post ? <Article post={post} /> : <LoadingPost slug={slug} />;
}
