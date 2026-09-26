import Layout from "@/components/Layout";
import { ZONES, zonePath } from "@/data/zones";

const LINKS = [
  { href: "/", label: "Gestión de alquiler vacacional" },
  { href: "/tarifas", label: "Tarifas" },
  { href: "/canarias", label: "Canarias" },
  { href: "/blog", label: "Blog" },
  ...ZONES.slice(0, 3).map(zone => ({ href: zonePath(zone.slug), label: zone.name })),
];

export default function NotFound() {
  return (
    <Layout>
      <section className="container flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="eyebrow eyebrow-center">Error 404</p>
        <h1 className="display mt-8 text-5xl sm:text-7xl">Esta página se ha ido a la playa.</h1>
        <p className="mt-7 max-w-xl text-[1.05rem] leading-[1.8] text-ink-500">La página que buscas no existe o se ha movido. Estas te pueden interesar:</p>
        <ul className="mt-12 flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-4">
          {LINKS.map(link => (
            <li key={link.href}>
              <a href={link.href} className="text-link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
