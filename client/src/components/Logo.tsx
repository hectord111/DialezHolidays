/** Dialez emblem + letter-spaced "DIALEZ HOLIDAYS" wordmark. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`group inline-flex items-center gap-3 text-ink ${className}`}>
      <img
        src="/images/logo.png"
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 object-contain transition-transform duration-500 group-hover:-translate-y-0.5"
        style={{ filter: "brightness(0) saturate(100%) invert(12%) sepia(15%) saturate(1200%) hue-rotate(145deg)" }}
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-medium tracking-[0.28em] sm:text-[1.15rem]">DIALEZ</span>
        <span className="mt-1.5 text-[0.56rem] font-semibold uppercase tracking-[0.5em] text-sand-600">Holidays</span>
      </span>
    </span>
  );
}
