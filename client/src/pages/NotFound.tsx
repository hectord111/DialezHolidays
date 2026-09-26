import Layout from "@/components/Layout";
import { ZONES, zonePath } from "@/data/zones";

const LINKS = [
  { href: "/", label: "Gestión de alquiler vacacional en Tenerife" },
  { href: "/tarifas", label: "Tarifas" },
  { href: "/canarias", label: "Gestión en Canarias" },
  { href: "/blog", label: "Blog" },
  ...ZONES.slice(0, 3).map(zone => ({ href: zonePath(zone.slug), label: zone.name })),
];

export default function NotFound() {
  return (
    <Layout>
      <section className="container flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <span className="eyebrow">Error 404</span>
        <h1 className="mt-6 text-5xl font-medium text-ocean md:text-7xl">Esta página se ha ido a la playa</h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">La página que buscas no existe o se ha movido. Estas te pueden interesar:</p>
        <ul className="mt-10 flex max-w-2xl flex-wrap justify-center gap-3">
          {LINKS.map(link => (
            <li key={link.href}>
              <a href={link.href} className="inline-block rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-ocean hover:border-gold-ink">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
