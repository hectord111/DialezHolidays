/**
 * BLOG — artículo
 * Ruta: /blog/:slug  (contenido en client/src/content/blog/<slug>.md)
 */
import { use } from "react";
import { useParams } from "wouter";
import { ChevronDown, Plus } from "lucide-react";
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
    <ol className="space-y-3 text-[0.9rem]">
      {items.map((item, i) => (
        <li key={item.id} className="flex gap-3">
          <span className="label pt-0.5 text-sand-600">{String(i + 1).padStart(2, "0")}</span>
          <a href={`#${item.id}`} className="leading-snug text-ink-500 transition-colors hover:text-ink">
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
        <header className="bg-ivory">
          <div className="container pt-10 sm:pt-14">
            <Breadcrumbs
              items={[
                { label: "Inicio", href: "/" },
                { label: "Blog", href: "/blog" },
                ...(category ? [{ label: category.name, href: `/blog/categoria/${category.slug}` }] : []),
                { label: post.title },
              ]}
            />
            <div className="mt-12 max-w-4xl sm:mt-16">
              {category && (
                <a href={`/blog/categoria/${category.slug}`} className="eyebrow hover:text-ink">
                  {category.name}
                </a>
              )}
              <h1 className="display mt-7 text-[2.3rem] sm:mt-9 sm:text-5xl lg:text-[4rem]">{post.title}</h1>
              <p className="mt-7 max-w-3xl text-[1.05rem] leading-[1.8] text-ink-500 sm:text-[1.15rem]">{post.description}</p>
              <div className="label mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/12 pt-6 text-ink-400">
                <span>
                  Por <span className="text-ink">el equipo de Dialez Holidays</span>
                </span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {updated && (
                  <span>
                    Actualizado: <time dateTime={updated}>{formatDate(updated)}</time>
                  </span>
                )}
                <span>{post.readingMinutes} min de lectura</span>
              </div>
            </div>
          </div>
          <div className="container mt-12 sm:mt-16">
            <figure className="relative aspect-[4/3] max-h-[640px] w-full overflow-hidden bg-sand-200 sm:aspect-[21/9]">
              <img src={post.image} alt={post.imageAlt} fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            </figure>
          </div>
        </header>

        <div className="container mt-14 grid gap-14 sm:mt-20 lg:grid-cols-12 lg:gap-16">
          <aside className="hidden lg:col-span-3 lg:block">
            {hasToc && (
              <nav aria-label="Contenido del artículo" className="sticky top-32">
                <p className="label mb-6 border-b border-ink/12 pb-4 text-ink">En este artículo</p>
                <TableOfContents post={post} />
              </nav>
            )}
          </aside>

          <div className="min-w-0 lg:col-span-6">
            {hasToc && (
              <details className="group mb-12 border-y border-ink/12 py-5 lg:hidden">
                <summary className="label flex items-center justify-between text-ink">
                  Contenido del artículo
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" strokeWidth={1.5} />
                </summary>
                <div className="mt-5">
                  <TableOfContents post={post} />
                </div>
              </details>
            )}

            <div className="article-content" dangerouslySetInnerHTML={{ __html: post.html }} />

            {post.faq.length > 0 && (
              <section className="mt-20" aria-labelledby="preguntas-frecuentes">
                <p className="eyebrow">Resolvemos tus dudas</p>
                <h2 id="preguntas-frecuentes" className="display mb-8 mt-6 text-4xl">
                  Preguntas frecuentes
                </h2>
                <div className="border-t border-ink/15">
                  {post.faq.map(item => (
                    <details key={item.q} className="group border-b border-ink/15">
                      <summary className="flex items-start justify-between gap-5 py-5">
                        <h3 className="font-display text-[1.2rem] font-normal leading-snug text-ink">{item.q}</h3>
                        <Plus className="mt-1 h-4 w-4 flex-shrink-0 text-sand-600 transition-transform group-open:rotate-45" strokeWidth={1.4} />
                      </summary>
                      <p className="pb-6 leading-[1.8] text-ink-500">{item.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-20">
              <BlogCta zone={post.zone} />
            </div>
          </div>

          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-32">
              <BlogCta zone={post.zone} compact />
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section mt-12 border-t border-ink/10 bg-ivory-50" aria-labelledby="relacionados">
          <div className="container">
            <p className="eyebrow">Sigue leyendo</p>
            <h2 id="relacionados" className="display mb-14 mt-6 text-4xl sm:text-5xl">
              Artículos relacionados
            </h2>
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map(item => (
                <PostCard key={item.slug} post={item} />
              ))}
            </div>
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
