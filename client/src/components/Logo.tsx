/** Emblema de Dialez + logotipo tipográfico "Dialez Holidays". */
export default function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <img
        src="/images/logo.png"
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 object-contain transition-[filter] duration-300"
        style={{ filter: light ? "brightness(0) invert(1)" : "brightness(0) saturate(100%)" }}
      />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.45rem] font-semibold tracking-wide ${light ? "text-white" : "text-ocean"}`}>Dialez</span>
        <span className={`mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.42em] ${light ? "text-gold" : "text-gold-ink"}`}>Holidays</span>
      </span>
    </span>
  );
}
