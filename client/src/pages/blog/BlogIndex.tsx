/**
 * BLOG — índice de artículos
 * Ruta: /blog
 */
import { POSTS } from "@/blog/posts";
import BlogCta from "@/components/blog/BlogCta";
import BlogHeader from "@/components/blog/BlogHeader";
import CategoryNav from "@/components/blog/CategoryNav";
import PostCard from "@/components/blog/PostCard";
import Layout from "@/components/Layout";

export default function BlogIndex() {
  const featured = POSTS.find(post => post.featured) ?? POSTS[0];
  const rest = POSTS.filter(post => post !== featured);
  return (
    <Layout whatsappText="Hola, vengo del blog de Dialez Holidays y me gustaría hacer una consulta sobre mi vivienda vacacional.">
      <BlogHeader
        breadcrumbs={[{ label: "Inicio", href: "/" }, { label: "Blog" }]}
        eyebrow="Blog Dialez Holidays"
        title="Guías de alquiler vacacional en Tenerife y Canarias"
        intro={
          <>
            Normativa, licencias, precios por temporada, Airbnb y Booking, gastos e impuestos: todo lo que necesitas para rentabilizar tu vivienda vacacional, escrito
            por el equipo que la gestiona cada día. Si prefieres delegarlo, conoce nuestra{" "}
            <a href="/" className="font-medium text-gold-ink underline-offset-2 hover:underline">
              gestión de alquiler vacacional en Tenerife
            </a>
            .
          </>
        }
      >
        <CategoryNav />
      </BlogHeader>

      <div className="container py-14 md:py-20">
        {featured ? (
          <>
            <h2 className="sr-only">Último artículo</h2>
            <PostCard post={featured} featured headingLevel="h2" />
            {rest.length > 0 && (
              <>
                <h2 className="mb-10 mt-20 text-4xl font-medium text-ocean">Más artículos</h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map(post => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <p className="text-muted-foreground">Muy pronto publicaremos nuestros primeros artículos.</p>
        )}

        <div className="mt-24">
          <BlogCta />
        </div>
      </div>
    </Layout>
  );
}
