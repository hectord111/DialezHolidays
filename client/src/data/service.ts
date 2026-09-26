/**
 * Contenido del servicio de gestión (ventajas, qué incluye, proceso y
 * preguntas frecuentes). Lo usan la home, la página de tarifas y las zonas.
 *
 * Única cifra comercial publicada: desde el 15% por reserva confirmada, sin
 * cuotas fijas. No añadir otras cifras (ocupación, ingresos garantizados,
 * número de viviendas, años de experiencia…) sin confirmarlas antes.
 */
import {
  BadgeCheck,
  BarChart3,
  Camera,
  ClipboardCheck,
  Globe2,
  KeyRound,
  LineChart,
  MessagesSquare,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  text: string;
}

/** A benefit set against doing it yourself (the "Ventajas" section). */
export interface Benefit {
  icon: LucideIcon;
  title: string;
  /** What it usually looks like when the owner manages it alone. */
  usual: string;
  /** What we do. */
  ours: string;
}

/** Ventajas de delegar la gestión, frente a gestionarla por tu cuenta. */
export const BENEFITS: Benefit[] = [
  {
    icon: LineChart,
    title: "Un precio que se mueve con la isla",
    usual: "Un precio fijo, o revisado a mano de vez en cuando.",
    ours: "Precios dinámicos revisados cada día según la temporada, los eventos de Tenerife, la antelación y la competencia.",
  },
  {
    icon: Globe2,
    title: "Más visibilidad, más reservas",
    usual: "Un anuncio en una sola plataforma, a menudo en un solo idioma.",
    ours: "Airbnb, Booking y Vrbo a la vez, con el calendario sincronizado, fotografía profesional y anuncios en varios idiomas.",
  },
  {
    icon: MessagesSquare,
    title: "Huéspedes atendidos, tú tranquilo",
    usual: "Mensajes y llamadas a cualquier hora, también en tus vacaciones.",
    ours: "Atendemos a cada huésped antes, durante y después de la estancia, en varios idiomas.",
  },
  {
    icon: Sparkles,
    title: "Tu casa, cuidada como un hotel",
    usual: "Buscar quien limpie y quien arregle, y revisar que todo quede bien.",
    ours: "Limpieza y lavandería profesionales, revisión tras cada salida e incidencias resueltas por nuestro equipo local.",
  },
  {
    icon: ScrollText,
    title: "La normativa, de nuestra cuenta",
    usual: "Estudiar por tu cuenta la Ley 6/2025, la licencia VV y el registro de viajeros.",
    ours: "Te ayudamos con la licencia de vivienda vacacional y cumplimos en cada estancia con el registro de viajeros.",
  },
  {
    icon: BarChart3,
    title: "Todo a la vista",
    usual: "Cuentas repartidas entre plataformas, extractos y hojas de cálculo.",
    ours: "Un informe mensual con reservas, ingresos y gastos. Y bloqueas fechas para usar tu casa cuando quieras.",
  },
];

/** El estándar de presentación y de cada estancia. */
export const STANDARD: { icon: LucideIcon; label: string }[] = [
  { icon: Camera, label: "Preparación y fotografía con estándar hotelero" },
  { icon: Globe2, label: "Anuncios optimizados y sincronizados en todos los canales" },
  { icon: KeyRound, label: "Llegada cuidada: guía de la casa y de la isla" },
  { icon: Sparkles, label: "Control de calidad después de cada limpieza" },
];

/** Todo lo que incluye la gestión integral. */
export const INCLUDED: Feature[] = [
  { icon: ClipboardCheck, title: "Estimación de ingresos", text: "Estudio gratuito del potencial de tu vivienda antes de empezar." },
  { icon: Camera, title: "Fotografía y anuncio", text: "Fotos profesionales y textos optimizados en varios idiomas." },
  { icon: Globe2, title: "Airbnb, Booking y Vrbo", text: "Publicación y calendario sincronizado para evitar dobles reservas." },
  { icon: LineChart, title: "Precios dinámicos", text: "Tarifas revisadas a diario según demanda, temporada y eventos." },
  { icon: MessagesSquare, title: "Atención al huésped", text: "Consultas, reservas y mensajes antes, durante y después de la estancia." },
  { icon: KeyRound, title: "Check-in y check-out", text: "Entrada en persona o autónoma, con guía de la casa y de la isla." },
  { icon: Sparkles, title: "Limpieza y lavandería", text: "Equipo profesional, ropa de cama, toallas y amenities entre estancias." },
  { icon: Wrench, title: "Mantenimiento", text: "Revisiones periódicas y resolución de incidencias con profesionales locales." },
  { icon: ScrollText, title: "Licencia y trámites", text: "Ayuda con la vivienda vacacional (VV) y el registro de viajeros." },
  { icon: BadgeCheck, title: "Reseñas y reputación", text: "Seguimiento de valoraciones y respuesta a cada comentario." },
  { icon: BarChart3, title: "Informe mensual", text: "Ingresos, ocupación, valoraciones y recomendaciones de mejora." },
  { icon: ShieldCheck, title: "Sin cuotas fijas", text: "Solo cobramos un porcentaje de las reservas que se confirman." },
];

export const PROCESS: { step: string; icon: LucideIcon; title: string; text: string }[] = [
  {
    step: "01",
    icon: ClipboardCheck,
    title: "Estimación gratuita",
    text: "Nos cuentas cómo es tu vivienda y dónde está. Analizamos su potencial y la situación de la licencia y te enviamos una estimación de ingresos, sin compromiso.",
  },
  {
    step: "02",
    icon: Camera,
    title: "Preparación y alta",
    text: "Revisamos equipamiento y seguridad, hacemos la sesión de fotos, creamos los anuncios en Airbnb, Booking y Vrbo y configuramos los precios.",
  },
  {
    step: "03",
    icon: KeyRound,
    title: "Gestión diaria",
    text: "Nos ocupamos de reservas, huéspedes, entradas y salidas, limpieza, lavandería y mantenimiento. Tú no tienes que hacer nada.",
  },
  {
    step: "04",
    icon: BarChart3,
    title: "Tú cobras",
    text: "Recibes tus ingresos y un informe mensual claro. Cuando quieras usar tu casa, bloqueamos las fechas en el calendario.",
  },
];

export const HOME_FAQS = [
  {
    question: "¿Cuánto cobra una gestora de alquiler vacacional en Tenerife?",
    answer:
      "Lo habitual es un porcentaje de cada reserva. En Dialez Holidays la gestión integral cuesta desde el 15% de cada reserva confirmada, sin cuotas fijas ni gastos ocultos: si tu vivienda no genera ingresos, no nos pagas nada.",
  },
  {
    question: "¿Qué incluye vuestra gestión de Airbnb y alquiler vacacional?",
    answer:
      "Estimación de ingresos, fotografía profesional, anuncios en Airbnb, Booking y Vrbo, precios dinámicos, atención a los huéspedes, check-in y check-out, limpieza y lavandería, mantenimiento, ayuda con la licencia y el registro de viajeros e informe mensual.",
  },
  {
    question: "¿Necesito licencia para alquilar mi vivienda a turistas en Tenerife?",
    answer:
      "Sí. En Canarias la vivienda vacacional requiere una declaración responsable ante el Cabildo y el número de inscripción (VV) en el Registro General Turístico. Desde la Ley 6/2025, además, el uso turístico debe estar permitido por el planeamiento de tu ayuntamiento. Te ayudamos a revisarlo antes de empezar.",
  },
  {
    question: "¿Puedo seguir usando mi casa cuando quiera?",
    answer: "Sí. Tú decides qué fechas reservas para ti o para tu familia: nos avisas con antelación y las bloqueamos en todos los calendarios.",
  },
  {
    question: "¿Qué pasa si un huésped causa daños o hay una avería?",
    answer:
      "Nuestro equipo local lo resuelve con profesionales de confianza y te informamos de todo. Si hay daños, gestionamos la reclamación a través de la plataforma o de la fianza correspondiente.",
  },
  {
    question: "¿En qué zonas de Tenerife trabajáis?",
    answer:
      "En toda la isla: Costa Adeje, Los Cristianos, Playa de las Américas, El Médano, Los Gigantes, Puerto de la Cruz, La Orotava, Santa Cruz de Tenerife y La Laguna, entre otras. También gestionamos viviendas en otras islas de Canarias: consúltanos.",
  },
  {
    question: "¿Cuánto tarda mi vivienda en empezar a recibir reservas?",
    answer:
      "Si la licencia está en regla, lo que más tiempo lleva es preparar la vivienda y la sesión de fotos. En cuanto los anuncios están publicados, empiezan a llegar reservas; en la estimación te indicamos un calendario realista para tu caso.",
  },
  {
    question: "¿Puedo contratar la gestión si no vivo en Tenerife?",
    answer:
      "Sí. La gestión está pensada para que no tengas que estar en la isla: nuestro equipo local se ocupa de todo en persona, te mantenemos informado por WhatsApp o correo y recibes un informe cada mes. Atendemos en español e inglés.",
  },
];
