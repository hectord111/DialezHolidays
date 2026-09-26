import { ChevronRight } from "lucide-react";

/** Visible breadcrumb trail (mirrors the BreadcrumbList structured data). */
export default function Breadcrumbs({ items, light = false }: { items: { label: string; href?: string }[]; light?: boolean }) {
  return (
    <nav aria-label="Migas de pan" className={`text-sm ${light ? "text-white/70" : "text-muted-foreground"}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-60" />}
            {item.href ? (
              <a href={item.href} className={`transition-colors ${light ? "hover:text-white" : "hover:text-gold-ink"}`}>
                {item.label}
              </a>
            ) : (
              <span aria-current="page" className={`line-clamp-1 ${light ? "text-white" : "text-foreground/80"}`}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
