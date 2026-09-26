import { Clock } from "lucide-react";
import { getCategory } from "@/blog/categories";
import type { PostCard as PostCardData } from "@/blog/types";
import { formatDate } from "@/lib/format";

export default function PostCard({ post, featured = false, headingLevel = "h3" }: { post: PostCardData; featured?: boolean; headingLevel?: "h2" | "h3" }) {
  const category = getCategory(post.category);
  const Heading = headingLevel;
  return (
    <article
      className={`reveal group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-border bg-card transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgb(16_40_59/0.35)] ${
        featured ? "md:flex-row" : ""
      }`}
    >
      <div className={`relative overflow-hidden bg-muted ${featured ? "aspect-[16/10] md:aspect-auto md:min-h-[380px] md:w-3/5" : "aspect-[16/10]"}`}>
        <img
          src={post.image}
          alt={post.imageAlt}
          loading={featured ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
      </div>
      <div className={`flex flex-1 flex-col p-7 ${featured ? "md:justify-center md:p-12" : ""}`}>
        <div className="mb-4 flex items-center gap-3 text-xs">
          {category && <span className="font-semibold uppercase tracking-[0.18em] text-gold-ink">{category.name}</span>}
          <span className="text-muted-foreground">·</span>
          <time dateTime={post.date} className="text-muted-foreground">
            {formatDate(post.date)}
          </time>
        </div>
        <Heading className={`font-display font-medium leading-tight text-ocean ${featured ? "text-3xl md:text-[2.6rem]" : "text-2xl"}`}>
          <a href={`/blog/${post.slug}`} className="transition-colors after:absolute after:inset-0 hover:text-gold-ink">
            {post.title}
          </a>
        </Heading>
        <p className={`mt-3 leading-relaxed text-muted-foreground ${featured ? "text-base" : "line-clamp-3 text-sm"}`}>{post.description}</p>
        <span className="mt-auto flex items-center gap-1.5 pt-5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" /> {post.readingMinutes} min de lectura
        </span>
      </div>
    </article>
  );
}
