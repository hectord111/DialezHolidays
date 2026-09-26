import { relatedPosts } from "@/blog/posts";
import PostCard from "@/components/blog/PostCard";
import type { ZoneSlug } from "@/data/zones";
import SectionHeading from "./SectionHeading";

/**
 * "Guides for owners" block of the service pages: links to the most related
 * posts, which strengthens the internal linking with the blog.
 */
export default function BlogHighlights({ zone, title = "Guías para propietarios", className = "" }: { zone?: ZoneSlug; title?: string; className?: string }) {
  const posts = relatedPosts({ zone }, 3);
  if (posts.length === 0) return null;
  return (
    <section className={`section ${className}`} aria-labelledby="blog-highlights">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow="Blog" title={title} id="blog-highlights" size="md" />
          <a href="/blog" className="reveal text-link">
            Todos los artículos
          </a>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
