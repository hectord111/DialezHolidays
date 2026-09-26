import { CATEGORIES, type CategorySlug } from "@/blog/categories";
import { postsInCategory } from "@/blog/posts";

/** Category tabs linking to each category page (only categories with articles). */
export default function CategoryNav({ active }: { active?: CategorySlug }) {
  const item = "label inline-block border-b pb-2 transition-colors";
  const on = "border-ink text-ink";
  const off = "border-transparent text-ink-400 hover:text-ink";
  return (
    <nav aria-label="Categorías del blog">
      <ul className="flex flex-wrap gap-x-8 gap-y-4">
        <li>
          <a href="/blog" className={`${item} ${!active ? on : off}`}>
            Todos
          </a>
        </li>
        {CATEGORIES.filter(c => postsInCategory(c.slug).length > 0).map(category => (
          <li key={category.slug}>
            <a
              href={`/blog/categoria/${category.slug}`}
              aria-current={active === category.slug ? "page" : undefined}
              className={`${item} ${active === category.slug ? on : off}`}
            >
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
