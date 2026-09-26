/** Visible breadcrumb trail (mirrors the BreadcrumbList structured data). */
export default function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Migas de pan" className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-ink-400">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="h-px w-4 bg-ink/25" />}
            {item.href ? (
              <a href={item.href} className="transition-colors hover:text-ink">
                {item.label}
              </a>
            ) : (
              <span aria-current="page" className="line-clamp-1 text-ink/80">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
