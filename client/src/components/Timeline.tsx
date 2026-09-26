import type { LucideIcon } from "lucide-react";

/** Numbered steps on a hairline, each with its icon frame. */
export default function Timeline({ steps }: { steps: { step: string; icon: LucideIcon; title: string; text: string }[] }) {
  return (
    <ol className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
      {steps.map((step, i) => (
        <li key={step.step} className="reveal lg:pr-10" style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}>
          <div className="flex items-center">
            <span className="icon-frame bg-inherit" aria-hidden>
              <step.icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.4} />
            </span>
            {i < steps.length - 1 && <span aria-hidden className="ml-0 hidden h-px flex-1 bg-sand-400/60 lg:-mr-10 lg:block" />}
          </div>
          <p className="label mt-6 text-sand-600">{step.step}</p>
          <h3 className="mt-3 font-display text-[1.6rem] font-normal leading-tight text-ink">{step.title}</h3>
          <p className="mt-3 text-[0.95rem] leading-[1.75] text-ink-500">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
