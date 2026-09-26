import type { LucideIcon } from "lucide-react";

export interface IconItem {
  icon: LucideIcon;
  label: string;
  body?: string;
}

/** Icon in a square frame + label (+ optional line), in one or two columns. */
export default function IconList({ items, columns = 1 }: { items: IconItem[]; columns?: 1 | 2 | 3 }) {
  const grid = columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : columns === 2 ? "sm:grid-cols-2" : "";
  return (
    <ul className={`grid gap-x-10 gap-y-6 ${grid}`}>
      {items.map(item => (
        <li key={item.label} className="flex gap-4">
          <span className="icon-frame" aria-hidden>
            <item.icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.4} />
          </span>
          <div className="min-w-0 pt-2.5">
            <p className="text-[0.95rem] font-semibold leading-snug text-ink">{item.label}</p>
            {item.body && <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-500">{item.body}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
