import { ArrowRight } from "lucide-react";
import { relatedPosts } from "@/blog/posts";
import PostCard from "@/components/blog/PostCard";
import type { ZoneSlug } from "@/data/zones";
import SectionHeading from "./SectionHeading";

/**
 * Bloque "Guías para propietarios" de las páginas de servicio: enlaza con los
 * artículos más relacionados, reforzando el enlazado interno con el blog.
 */
export default function BlogHighlights({ zone, title = "Guías para propietarios" }: { zone?: ZoneSlug; title?: string }) {
  const posts = relatedPosts({ zone }, 3);
  if (posts.length === 0) return null;
  return (
    <section className="section bg-sand" aria-labelledby="blog-highlights">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Blog" title={title} id="blog-highlights" />
          <a href="/blog" className="reveal inline-flex items-center gap-2 text-sm font-semibold text-gold-ink hover:underline">
            Ver todos los artículos <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
