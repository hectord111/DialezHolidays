import { CATEGORIES, type CategorySlug } from "@/blog/categories";
import { postsInCategory } from "@/blog/posts";

/** Category chips linking to each category page (only categories with articles). */
export default function CategoryNav({ active }: { active?: CategorySlug }) {
  const chip = "inline-block rounded-full border px-4 py-2 text-sm font-medium transition-colors";
  const on = "border-ocean bg-ocean text-white";
  const off = "border-border bg-card text-foreground hover:border-gold-ink hover:text-gold-ink";
  return (
    <nav aria-label="Categorías del blog">
      <ul className="flex flex-wrap gap-2">
        <li>
          <a href="/blog" className={`${chip} ${!active ? on : off}`}>
            Todos
          </a>
        </li>
        {CATEGORIES.filter(c => postsInCategory(c.slug).length > 0).map(category => (
          <li key={category.slug}>
            <a
              href={`/blog/categoria/${category.slug}`}
              aria-current={active === category.slug ? "page" : undefined}
              className={`${chip} ${active === category.slug ? on : off}`}
            >
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
