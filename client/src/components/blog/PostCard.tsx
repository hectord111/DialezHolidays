import { getCategory } from "@/blog/categories";
import type { PostCard as PostCardData } from "@/blog/types";
import { formatDate } from "@/lib/format";

/** Editorial post card: photograph, then category, title and summary. */
export default function PostCard({ post, featured = false, headingLevel = "h3" }: { post: PostCardData; featured?: boolean; headingLevel?: "h2" | "h3" }) {
  const category = getCategory(post.category);
  const Heading = headingLevel;
  return (
    <article className={`reveal group relative ${featured ? "grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-16" : ""}`}>
      <div className={`relative overflow-hidden bg-sand-200 ${featured ? "aspect-[4/3] lg:col-span-7 lg:aspect-[16/11]" : "aspect-[4/3]"}`}>
        <img
          src={post.image}
          alt={post.imageAlt}
          loading={featured ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      </div>
      <div className={featured ? "lg:col-span-5" : "mt-6"}>
        <p className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-400">
          {category && <span className="text-sand-600">{category.name}</span>}
          <span aria-hidden className="h-px w-4 bg-ink/25" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <Heading className={`mt-4 font-display font-light leading-[1.12] tracking-[-0.01em] text-ink ${featured ? "text-[2rem] sm:text-5xl" : "text-[1.55rem]"}`}>
          <a href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </a>
        </Heading>
        <p className={`mt-4 leading-[1.75] text-ink-500 ${featured ? "text-[1.02rem]" : "line-clamp-3 text-[0.94rem]"}`}>{post.description}</p>
        <p className="label mt-5 text-ink-400">{post.readingMinutes} min de lectura</p>
      </div>
    </article>
  );
}
