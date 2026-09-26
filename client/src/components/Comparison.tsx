import { Check, X } from "lucide-react";
import type { Benefit } from "@/data/service";

/**
 * Each benefit set against managing the property alone. Every item leads
 * with an icon and a title; the two sides are marked ✗ / ✓ so the eye can
 * scan them. The caller sets the section background (cells use bg-inherit).
 */
export default function Comparison({
  items,
  usualLabel = "Si la gestionas tú",
  oursLabel = "Con Dialez Holidays",
  cellClass = "bg-mist",
}: {
  items: Benefit[];
  usualLabel?: string;
  oursLabel?: string;
  cellClass?: string;
}) {
  return (
    <ol className="grid gap-px bg-ink/10 lg:grid-cols-2">
      {items.map((item, i) => (
        <li key={item.title} className={`reveal p-6 sm:p-8 lg:p-10 ${cellClass}`} style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties}>
          <div className="flex min-w-0 items-center gap-4">
            <span className="icon-frame" aria-hidden>
              <item.icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.4} />
            </span>
            <div className="min-w-0">
              <p className="label text-ink-400">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 font-display text-[1.35rem] font-normal leading-tight text-ink sm:text-[1.6rem]">{item.title}</h3>
            </div>
          </div>
          <dl className="mt-7 space-y-5 border-t border-ink/10 pt-6">
            <div className="flex gap-3">
              <X aria-hidden className="mt-0.5 h-4 w-4 flex-shrink-0 text-ink-300" strokeWidth={1.6} />
              <div>
                <dt className="label text-ink-400">{usualLabel}</dt>
                <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-500">{item.usual}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Check aria-hidden className="mt-0.5 h-4 w-4 flex-shrink-0 text-sea" strokeWidth={1.8} />
              <div>
                <dt className="label text-sea">{oursLabel}</dt>
                <dd className="mt-1.5 text-[0.98rem] leading-relaxed text-ink">{item.ours}</dd>
              </div>
            </div>
          </dl>
        </li>
      ))}
    </ol>
  );
}
