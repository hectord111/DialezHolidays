/**
 * BLOG — artículos de una categoría
 * Ruta: /blog/categoria/:category
 */
import { useParams } from "wouter";
import { getCategory } from "@/blog/categories";
import { postsInCategory } from "@/blog/posts";
import BlogCta from "@/components/blog/BlogCta";
import BlogHeader from "@/components/blog/BlogHeader";
import CategoryNav from "@/components/blog/CategoryNav";
import PostCard from "@/components/blog/PostCard";
import Layout from "@/components/Layout";
import NotFound from "../NotFound";

export default function BlogCategory() {
  const params = useParams<{ category: string }>();
  const category = getCategory(params.category ?? "");
  if (!category) return <NotFound />;
  const posts = postsInCategory(category.slug);

  return (
    <Layout>
      <BlogHeader
        breadcrumbs={[{ label: "Inicio", href: "/" }, { label: "Blog", href: "/blog" }, { label: category.name }]}
        eyebrow={category.name}
        title={category.title}
        intro={category.description}
      >
        <CategoryNav active={category.slug} />
      </BlogHeader>

      <div className="container py-16 md:py-24">
        {posts.length > 0 ? (
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => (
              <PostCard key={post.slug} post={post} headingLevel="h2" />
            ))}
          </div>
        ) : (
          <p className="text-ink-500">
            Todavía no hay artículos en esta categoría.{" "}
            <a href="/blog" className="text-sea underline underline-offset-4">
              Ver todos los artículos
            </a>
            .
          </p>
        )}
        <div className="mt-24">
          <BlogCta />
        </div>
      </div>
    </Layout>
  );
}
