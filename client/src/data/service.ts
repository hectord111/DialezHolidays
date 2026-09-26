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

/** Ventajas de delegar la gestión (sección "Por qué con nosotros"). */
export const BENEFITS: Feature[] = [
  {
    icon: LineChart,
    title: "Más ingresos por noche",
    text: "Ajustamos el precio cada día según la temporada, los eventos de la isla, la antelación y la competencia. Ni noches vacías por un precio alto ni reservas regaladas en plena temporada.",
  },
  {
    icon: Globe2,
    title: "Más visibilidad, más ocupación",
    text: "Tu vivienda aparece en Airbnb, Booking y Vrbo a la vez, con el calendario sincronizado, fotografía profesional y anuncios cuidados en varios idiomas.",
  },
  {
    icon: MessagesSquare,
    title: "Cero llamadas a deshoras",
    text: "Respondemos a cada huésped antes, durante y después de su estancia, en varios idiomas. Tú no tienes que estar pendiente del móvil.",
  },
  {
    icon: Sparkles,
    title: "Tu casa, cuidada como un hotel",
    text: "Limpieza profesional y lavandería entre estancias, revisión tras cada salida y mantenimiento preventivo. Tu vivienda se conserva mejor y las reseñas lo notan.",
  },
  {
    icon: ShieldCheck,
    title: "Tranquilidad legal",
    text: "Te ayudamos con la licencia de vivienda vacacional (VV), el registro de viajeros y la normativa canaria, que ha cambiado con la Ley 6/2025.",
  },
  {
    icon: BarChart3,
    title: "Transparencia total",
    text: "Informe mensual con reservas, ingresos y gastos. Tú decides cuándo bloquear fechas para disfrutar de tu casa y siempre sabes qué está pasando.",
  },
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

export const PROCESS = [
  {
    step: "01",
    title: "Estimación gratuita",
    text: "Nos cuentas cómo es tu vivienda y dónde está. Analizamos su potencial y la situación de la licencia y te enviamos una estimación de ingresos, sin compromiso.",
  },
  {
    step: "02",
    title: "Preparación y alta",
    text: "Revisamos equipamiento y seguridad, hacemos la sesión de fotos, creamos los anuncios en Airbnb, Booking y Vrbo y configuramos los precios.",
  },
  {
    step: "03",
    title: "Gestión diaria",
    text: "Nos ocupamos de reservas, huéspedes, entradas y salidas, limpieza, lavandería y mantenimiento. Tú no tienes que hacer nada.",
  },
  {
    step: "04",
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
