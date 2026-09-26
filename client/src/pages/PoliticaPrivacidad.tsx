/**
 * POLÍTICA DE PRIVACIDAD — RGPD (UE 2016/679) y LOPDGDD 3/2018
 * Ruta: /politica-privacidad
 * Mismo responsable que dialezproperties.es (Dialez Holidays es una marca de
 * Dialez Properties).
 */
import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Layout from "@/components/Layout";
import { EMAIL } from "@/lib/contact";

const OWNER = "Héctor Díaz González";
const ADDRESS = "Calle Creu dels Molers 39, 08004 Barcelona, España";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 text-3xl font-medium text-ocean">{title}</h2>
      <div className="space-y-4 leading-relaxed text-foreground/80">{children}</div>
    </section>
  );
}

function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-6 marker:text-gold-ink">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export default function PoliticaPrivacidad() {
  const mail = (
    <a href={`mailto:${EMAIL}`} className="text-gold-ink underline-offset-2 hover:underline">
      {EMAIL}
    </a>
  );
  return (
    <Layout>
      <section className="bg-sand">
        <div className="container max-w-4xl py-14 md:py-20">
          <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Política de privacidad" }]} />
          <span className="eyebrow mt-10">Información legal</span>
          <h1 className="mt-5 text-5xl font-medium text-ocean md:text-6xl">Política de privacidad</h1>
          <p className="mt-5 text-muted-foreground">Última actualización: 26 de septiembre de 2026</p>
        </div>
      </section>

      <article className="container max-w-4xl space-y-12 py-14 md:py-20">
        <Section title="1. Responsable del tratamiento">
          <p>
            En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y de la Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos
            digitales (LOPDGDD), te informamos de que los datos personales que nos facilites a través de este sitio web (holidays.dialezproperties.es), de WhatsApp,
            del teléfono o del correo electrónico serán tratados por:
          </p>
          <div className="card space-y-1 p-6">
            <p className="font-semibold text-ocean">{OWNER}</p>
            <p>Dialez Holidays, marca de Dialez Properties</p>
            <p>{ADDRESS}</p>
            <p>Correo electrónico: {mail}</p>
          </div>
        </Section>

        <Section title="2. Finalidad del tratamiento">
          <p>Tratamos tus datos para:</p>
          <List
            items={[
              "Atender tus consultas y solicitudes de información sobre la gestión de alquiler vacacional.",
              "Preparar estimaciones de ingresos y propuestas de gestión para tu vivienda.",
              "Mantener la relación contractual y prestar los servicios contratados.",
              "Enviarte comunicaciones comerciales sobre nuestros servicios, solo si nos has dado tu consentimiento.",
              "Cumplir las obligaciones legales, fiscales y contables aplicables.",
            ]}
          />
          <p>
            Los formularios de esta web no guardan datos en ningún servidor: abren WhatsApp con un mensaje que tú decides si envías o no.
          </p>
        </Section>

        <Section title="3. Legitimación">
          <List
            items={[
              <>
                <strong>Consentimiento</strong> (art. 6.1.a RGPD): para responder a tus consultas y enviarte comunicaciones comerciales.
              </>,
              <>
                <strong>Ejecución de un contrato</strong> (art. 6.1.b RGPD): para prestar los servicios contratados.
              </>,
              <>
                <strong>Obligación legal</strong> (art. 6.1.c RGPD): para cumplir obligaciones fiscales, contables y de registro de viajeros.
              </>,
              <>
                <strong>Interés legítimo</strong> (art. 6.1.f RGPD): para mantener la relación comercial y mejorar nuestros servicios.
              </>,
            ]}
          />
        </Section>

        <Section title="4. Plazo de conservación">
          <p>
            Conservamos los datos durante el tiempo necesario para la finalidad para la que se recabaron y, después, bloqueados durante los plazos legalmente
            establecidos (con carácter general, hasta 6 años conforme al Código de Comercio y la normativa fiscal) para atender posibles responsabilidades.
          </p>
        </Section>

        <Section title="5. Destinatarios">
          <p>
            No cedemos tus datos a terceros salvo obligación legal. Pueden acceder a ellos los proveedores que actúan como encargados del tratamiento:
          </p>
          <List
            items={[
              "Proveedores de alojamiento web y almacenamiento en la nube.",
              "Servicios de mensajería (WhatsApp Business) y correo electrónico.",
              "Servicios de analítica y publicidad (Google Ads, Meta Pixel).",
              "Plataformas de reservas (Airbnb, Booking, Vrbo) y proveedores de servicios de la vivienda, cuando sea necesario para prestar el servicio contratado.",
            ]}
          />
          <p>
            Algunos proveedores pueden estar fuera del Espacio Económico Europeo; en esos casos las transferencias se amparan en las Cláusulas Contractuales
            Tipo de la Comisión Europea u otras garantías previstas por la normativa.
          </p>
        </Section>

        <Section title="6. Tus derechos">
          <p>Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, y retirar el consentimiento prestado.</p>
          <p>
            Para ello, escríbenos a {mail} o por correo postal a {ADDRESS}, con el asunto «Protección de datos» y una copia de tu documento de identidad. Si
            consideras que no hemos atendido correctamente tus derechos, puedes reclamar ante la Agencia Española de Protección de Datos (
            <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-gold-ink underline-offset-2 hover:underline">
              www.aepd.es
            </a>
            ).
          </p>
        </Section>

        <Section title="7. Cookies y tecnologías de seguimiento">
          <p>
            Esta web utiliza cookies propias y de terceros (Google Ads y Meta Pixel) para medir la eficacia de nuestras campañas y mostrar publicidad
            personalizada. Puedes bloquearlas o eliminarlas desde la configuración de tu navegador.
          </p>
        </Section>

        <Section title="8. Seguridad y cambios">
          <p>
            Aplicamos las medidas técnicas y organizativas adecuadas para proteger tus datos (art. 32 RGPD). Podemos actualizar esta política para adaptarla a
            cambios legales o de nuestros servicios; publicaremos cualquier cambio en esta página.
          </p>
        </Section>
      </article>
    </Layout>
  );
}
