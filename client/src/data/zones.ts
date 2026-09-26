/**
 * Zonas de Tenerife con página propia (/zonas/<slug>).
 *
 * Cada zona tiene contenido original (no plantillas con el nombre cambiado)
 * para que Google la considere una página útil para búsquedas locales como
 * "gestión alquiler vacacional Costa Adeje". Los slugs deben coincidir con
 * ZONES en scripts/blog-markdown.ts (campo `zone` de los artículos).
 */
export const ZONE_SLUGS = [
  "costa-adeje",
  "los-cristianos-playa-de-las-americas",
  "puerto-de-la-cruz",
  "santa-cruz-de-tenerife",
  "el-medano",
  "los-gigantes",
] as const;

export type ZoneSlug = (typeof ZONE_SLUGS)[number];

export interface Zone {
  slug: ZoneSlug;
  /** Nombre corto ("Costa Adeje"). */
  name: string;
  /** Municipio o municipios. */
  municipality: string;
  /** Norte o sur de la isla, para agrupar en la home. */
  area: "Sur" | "Norte" | "Área metropolitana" | "Oeste";
  /** Una línea para las tarjetas de la home. */
  tagline: string;
  image: string;
  imageAlt: string;
  /** SEO */
  title: string;
  description: string;
  /** Párrafos de introducción. */
  intro: string[];
  guests: { title: string; text: string };
  properties: { title: string; text: string };
  /** Lo que marca la diferencia al gestionar en esta zona. */
  keys: { title: string; text: string }[];
  /** Nota sobre la normativa municipal. */
  regulation: string;
  faqs: { question: string; answer: string }[];
  nearby: ZoneSlug[];
}

export const ZONES: Zone[] = [
  {
    slug: "costa-adeje",
    name: "Costa Adeje",
    municipality: "Adeje",
    area: "Sur",
    tagline: "Playa del Duque, Fañabé y La Caleta: el lujo del sur",
    image: "/images/villa-piscina-tenerife.webp",
    imageAlt: "Villa moderna con piscina infinita al anochecer en el sur de Tenerife, con La Gomera en el horizonte",
    title: "Gestión de alquiler vacacional en Costa Adeje | Dialez Holidays",
    description:
      "Gestión de alquiler vacacional y Airbnb en Costa Adeje: Playa del Duque, Fañabé, Torviscas y La Caleta. Precios dinámicos, huéspedes y limpieza. Desde el 15%.",
    intro: [
      "Costa Adeje es el escaparate del turismo de calidad en Tenerife. Entre Playa del Duque, Fañabé, Torviscas y La Caleta se concentran hoteles de cinco estrellas, restaurantes de autor, campos de golf y un paseo marítimo que se recorre a pie de punta a punta. Para una vivienda vacacional, eso se traduce en un huésped que compara con el hotel de al lado y está dispuesto a pagar más si la experiencia está a la altura.",
      "Gestionar aquí no consiste solo en tener el calendario lleno: consiste en defender el precio medio por noche con fotografía impecable, respuesta rápida, una limpieza de nivel hotelero y detalles que justifiquen la tarifa frente a la oferta hotelera de la zona.",
    ],
    guests: {
      title: "Quién se aloja en Costa Adeje",
      text: "Familias que buscan piscina y playa a poca distancia, parejas que vienen a desconectar y viajeros de alto poder adquisitivo del Reino Unido, el centro y el norte de Europa y la península. En invierno llegan estancias más largas; en verano y en vacaciones escolares, familias con fechas muy concretas que reservan con antelación.",
    },
    properties: {
      title: "Qué viviendas funcionan mejor",
      text: "Apartamentos en complejos con piscina y vistas al mar, dúplex con terraza y villas con piscina privada en las zonas altas. Las viviendas con aire acondicionado, buena conexión wifi y espacio exterior amueblado son las que mejor sostienen tarifas altas durante todo el año.",
    },
    keys: [
      {
        title: "Precio alineado con los hoteles",
        text: "Revisamos a diario la tarifa frente a la oferta hotelera y los eventos del sur para no dejar dinero sobre la mesa en las semanas de máxima demanda.",
      },
      {
        title: "Estándar de hotel boutique",
        text: "Ropa de cama de calidad, amenities cuidados y una llegada sin esperas: en Costa Adeje las reseñas se ganan o se pierden en los detalles.",
      },
      {
        title: "Complejos con normas propias",
        text: "Muchas viviendas están en complejos con recepción, normas de uso de piscinas y aparcamiento. Coordinamos llaves, accesos y comunicación con la comunidad.",
      },
      {
        title: "Huésped internacional",
        text: "Anuncios y mensajes en varios idiomas, y guías de llegada claras para quien aterriza de noche en el aeropuerto Tenerife Sur.",
      },
    ],
    regulation:
      "La vivienda vacacional se rige por la Ley 6/2025 de Canarias y por el planeamiento del Ayuntamiento de Adeje. Parte de Costa Adeje es suelo turístico, donde pueden aplicarse reglas propias (por ejemplo, la unidad de explotación de algunos complejos). Antes de dar de alta una vivienda, revisamos contigo su situación urbanística y la de la comunidad.",
    faqs: [
      {
        question: "¿Gestionáis apartamentos dentro de complejos turísticos de Costa Adeje?",
        answer:
          "Sí. Coordinamos llaves, accesos y normas del complejo, y revisamos antes si el complejo tiene una unidad de explotación u otras condiciones que afecten a la comercialización de tu apartamento.",
      },
      {
        question: "¿Cuándo es temporada alta en Costa Adeje?",
        answer:
          "La demanda se mantiene durante todo el año, con picos en invierno (cuando el norte de Europa busca sol), Navidad, Semana Santa y el verano. Ajustamos precio y estancia mínima semana a semana según esa demanda.",
      },
      {
        question: "¿Cuánto cobráis por gestionar una vivienda en Costa Adeje?",
        answer:
          "Desde el 15% de cada reserva confirmada, sin cuotas fijas. Te preparamos una estimación de ingresos gratuita para tu vivienda concreta antes de empezar.",
      },
    ],
    nearby: ["los-cristianos-playa-de-las-americas", "los-gigantes", "el-medano"],
  },
  {
    slug: "los-cristianos-playa-de-las-americas",
    name: "Los Cristianos y Playa de las Américas",
    municipality: "Arona y Adeje",
    area: "Sur",
    tagline: "El corazón turístico del sur, con demanda todo el año",
    image: "/images/terraza-atardecer-tenerife.jpg",
    imageAlt: "Terraza de una vivienda vacacional con sofás al atardecer frente al océano en el sur de Tenerife",
    title: "Gestión de alquiler vacacional en Los Cristianos y Las Américas",
    description:
      "Gestora de Airbnb y alquiler vacacional en Los Cristianos y Playa de las Américas (Arona): reservas, check-in, limpieza y precios dinámicos. Desde el 15%.",
    intro: [
      "Los Cristianos y Playa de las Américas forman la zona turística más consolidada de Tenerife. Los Cristianos conserva su aire de pueblo marinero, con su puerto, sus playas tranquilas y una larga tradición de visitantes que vuelven cada invierno. Playa de las Américas, a continuación, suma ocio, restauración, surf y vida nocturna.",
      "Es un mercado con muchísima oferta, así que la diferencia la marcan el anuncio, el precio y las reseñas. Una vivienda bien presentada y bien gestionada aquí puede mantener una ocupación muy estable; una descuidada se pierde entre cientos de opciones parecidas.",
    ],
    guests: {
      title: "Quién se aloja en Los Cristianos y Las Américas",
      text: "Parejas y familias de toda Europa, grupos de amigos en Las Américas y un público muy fiel de estancias largas en invierno, sobre todo del Reino Unido y del norte de Europa. El puerto de Los Cristianos, con ferris a La Gomera, atrae además a viajeros que combinan varias islas.",
    },
    properties: {
      title: "Qué viviendas funcionan mejor",
      text: "Estudios y apartamentos de uno o dos dormitorios cerca del paseo marítimo y de la playa, con terraza o balcón. Para las estancias largas de invierno se valoran mucho una cocina bien equipada, una buena conexión a internet y el ascensor.",
    },
    keys: [
      {
        title: "Estrategia para estancias largas",
        text: "Combinamos reservas de una semana con estancias de uno o varios meses en invierno, con descuentos por duración que no hunden tu rentabilidad.",
      },
      {
        title: "Destacar en un mercado saturado",
        text: "Fotografía profesional, títulos y descripciones optimizados en varios idiomas y una política de reseñas activa para subir posiciones en Airbnb y Booking.",
      },
      {
        title: "Rotación rápida",
        text: "Con muchas entradas y salidas, la coordinación de limpieza y lavandería es clave. Lo organizamos para que la vivienda esté impecable en cada llegada.",
      },
      {
        title: "Cerca del aeropuerto del sur",
        text: "Muchos huéspedes llegan directamente desde Tenerife Sur. Enviamos instrucciones claras de llegada y ofrecemos entrada flexible.",
      },
    ],
    regulation:
      "Los Cristianos pertenece al municipio de Arona y Playa de las Américas se reparte entre Arona y Adeje, así que conviene confirmar qué planeamiento se aplica a tu vivienda. En los complejos situados en suelo turístico pueden existir condiciones específicas. Lo revisamos contigo antes de publicar ningún anuncio.",
    faqs: [
      {
        question: "¿Merece la pena el alquiler vacacional en Los Cristianos con tanta oferta?",
        answer:
          "Sí, si la vivienda se diferencia: buenas fotos, precio ajustado cada semana y valoraciones altas. La demanda es muy estable durante el año, sobre todo en invierno, y la gestión profesional ayuda a aprovecharla.",
      },
      {
        question: "¿Aceptáis estancias de un mes o más en invierno?",
        answer:
          "Sí. En Los Cristianos las estancias largas de invierno son habituales y las combinamos con reservas cortas para maximizar tus ingresos, siempre dentro del marco legal de la vivienda vacacional.",
      },
      {
        question: "¿Mi apartamento en Playa de las Américas está en Arona o en Adeje?",
        answer:
          "Depende de la calle: Playa de las Américas se reparte entre los dos municipios. Lo comprobamos con la referencia catastral porque determina qué ayuntamiento y qué planeamiento se aplican.",
      },
    ],
    nearby: ["costa-adeje", "el-medano", "los-gigantes"],
  },
  {
    slug: "puerto-de-la-cruz",
    name: "Puerto de la Cruz",
    municipality: "Puerto de la Cruz",
    area: "Norte",
    tagline: "El destino clásico del norte, verde y con carácter",
    image: "/images/salon-vistas-mar-tenerife.webp",
    imageAlt: "Salón luminoso con pared de piedra volcánica y terraza con vistas al mar y palmeras en Tenerife",
    title: "Gestión de alquiler vacacional en Puerto de la Cruz | Dialez",
    description:
      "Gestión de viviendas vacacionales y Airbnb en Puerto de la Cruz y el norte de Tenerife: huéspedes, limpieza, licencia VV y precios. Desde el 15% por reserva.",
    intro: [
      "Puerto de la Cruz fue uno de los primeros destinos turísticos de Canarias y conserva un encanto que el sur no tiene: casco histórico, calles peatonales, el Lago Martiánez, Playa Jardín, el Jardín Botánico y el Loro Parque, con el valle de La Orotava y el Teide como telón de fondo.",
      "Su clima es más suave y verde que el del sur, y atrae a un viajero que busca autenticidad, naturaleza y cultura. Para una vivienda vacacional, eso significa huéspedes fieles, estancias de varios días y reseñas muy centradas en la ubicación y el carácter del alojamiento.",
    ],
    guests: {
      title: "Quién se aloja en Puerto de la Cruz",
      text: "Visitantes de Alemania, Países Bajos, Escandinavia y la península, senderistas que usan el norte como base para recorrer la isla, familias que vienen al Loro Parque y viajeros que prefieren un ambiente más local que el de las grandes zonas turísticas.",
    },
    properties: {
      title: "Qué viviendas funcionan mejor",
      text: "Apartamentos con vistas al mar o al Teide, pisos en el casco con personalidad y casas canarias rehabilitadas en el entorno del valle. Se valoran la terraza, la luz, el aparcamiento y una buena calefacción o bomba de calor para las noches de invierno.",
    },
    keys: [
      {
        title: "Vender el carácter",
        text: "Anuncios que cuentan la historia de la vivienda y del barrio, con fotos que aprovechan la luz del norte y las vistas.",
      },
      {
        title: "Guía local de verdad",
        text: "Rutas, miradores, restaurantes y excursiones al Teide: una buena guía de bienvenida se nota en las reseñas.",
      },
      {
        title: "Precios por temporada y eventos",
        text: "Ajustamos precios a las temporadas de los mercados del norte de Europa, a las fiestas locales y a los puentes peninsulares.",
      },
      {
        title: "Mantenimiento en clima húmedo",
        text: "El norte exige revisar humedades, ventilación y textiles con más frecuencia. Lo incluimos en nuestras revisiones periódicas.",
      },
    ],
    regulation:
      "La vivienda vacacional en Puerto de la Cruz depende de la Ley 6/2025 de Canarias y del planeamiento municipal, que decide dónde se permite el uso turístico. Antes de dar de alta tu vivienda revisamos contigo la compatibilidad urbanística y la situación de la comunidad de propietarios.",
    faqs: [
      {
        question: "¿Hay demanda de alquiler vacacional en el norte de Tenerife?",
        answer:
          "Sí. Puerto de la Cruz tiene una clientela internacional fiel y estancias de varios días, sobre todo en otoño, invierno y primavera. El reto es posicionar bien la vivienda frente a la oferta hotelera clásica.",
      },
      {
        question: "¿Gestionáis viviendas en La Orotava o Los Realejos?",
        answer:
          "Sí, trabajamos en todo el norte de Tenerife. Escríbenos con la dirección y te decimos cómo lo organizamos en tu caso.",
      },
      {
        question: "¿Qué cobráis por gestionar una vivienda en Puerto de la Cruz?",
        answer: "Desde el 15% de cada reserva confirmada, sin cuotas fijas ni gastos ocultos: solo cobramos cuando tu vivienda genera ingresos.",
      },
    ],
    nearby: ["santa-cruz-de-tenerife", "los-gigantes", "costa-adeje"],
  },
  {
    slug: "santa-cruz-de-tenerife",
    name: "Santa Cruz y La Laguna",
    municipality: "Santa Cruz de Tenerife y San Cristóbal de La Laguna",
    area: "Área metropolitana",
    tagline: "Capital, Carnaval, Anaga y la ciudad Patrimonio de la Humanidad",
    image: "/images/teide-tenerife.webp",
    imageAlt: "Carretera de Tenerife con el Teide al fondo bajo el cielo azul",
    title: "Gestión de alquiler vacacional en Santa Cruz de Tenerife | Dialez",
    description:
      "Gestión de alquiler vacacional y Airbnb en Santa Cruz de Tenerife y La Laguna: reservas, huéspedes, limpieza y licencia VV. Desde el 15% por reserva.",
    intro: [
      "Santa Cruz de Tenerife y San Cristóbal de La Laguna forman el área metropolitana de la isla y un mercado vacacional distinto al del sur: más urbano, más estable y menos dependiente de la playa. Santa Cruz ofrece el Auditorio, museos, comercio, la playa de Las Teresitas y uno de los carnavales más famosos del mundo; La Laguna, su casco histórico declarado Patrimonio de la Humanidad y la puerta de entrada al Parque Rural de Anaga.",
      "Aquí la vivienda vacacional compite menos con los grandes complejos turísticos y más con los hoteles urbanos, así que la ubicación, la comodidad y una buena relación calidad-precio pesan más que las vistas al mar.",
    ],
    guests: {
      title: "Quién se aloja en Santa Cruz y La Laguna",
      text: "Viajeros de escapada urbana, visitantes de congresos, eventos y trabajo, familias peninsulares que visitan a familiares, senderistas que exploran Anaga y, en febrero o marzo, miles de personas que vienen al Carnaval de Santa Cruz.",
    },
    properties: {
      title: "Qué viviendas funcionan mejor",
      text: "Pisos céntricos y bien comunicados con el tranvía, apartamentos con zona de trabajo y buena conexión a internet, y casas con encanto en el casco de La Laguna. El aparcamiento o su cercanía son un plus.",
    },
    keys: [
      {
        title: "Calendario de eventos",
        text: "El Carnaval, los congresos y los grandes eventos del Auditorio y del recinto ferial disparan la demanda. Los tenemos marcados para ajustar precios y estancias mínimas.",
      },
      {
        title: "Huésped de trabajo",
        text: "Facturas, entrada autónoma, escritorio y wifi rápido: detalles que convierten a un viajero de negocios en un cliente que repite.",
      },
      {
        title: "Aeropuerto Tenerife Norte",
        text: "Muchos huéspedes llegan por Los Rodeos, en La Laguna. Adaptamos las instrucciones de llegada y los horarios de entrada.",
      },
      {
        title: "Convivencia en edificios residenciales",
        text: "En pisos urbanos es clave cuidar la relación con los vecinos: normas de la casa claras, control de ruidos y respuesta rápida ante cualquier incidencia.",
      },
    ],
    regulation:
      "En Santa Cruz y La Laguna la mayoría de viviendas están en edificios residenciales, así que además de la Ley 6/2025 y del planeamiento municipal hay que revisar la comunidad de propietarios. El Ayuntamiento de Santa Cruz ya ha habilitado el trámite de uso turístico consolidado para las viviendas vacacionales que operaban antes de la ley. Lo revisamos contigo antes de empezar.",
    faqs: [
      {
        question: "¿Es rentable el alquiler vacacional en Santa Cruz de Tenerife?",
        answer:
          "Puede serlo, con un modelo distinto al del sur: menos estacional, con viajeros de trabajo y de escapada urbana y picos muy marcados en Carnaval y en grandes eventos. Te preparamos una estimación realista para tu vivienda.",
      },
      {
        question: "¿Necesito permiso de la comunidad para alquilar mi piso a turistas en Santa Cruz?",
        answer:
          "Para las altas nuevas en edificios, la ley estatal exige un acuerdo expreso de la comunidad por mayoría de tres quintos, y la ley canaria impide la actividad si los estatutos la prohíben. Lo revisamos antes de dar ningún paso.",
      },
      {
        question: "¿También gestionáis viviendas en La Laguna?",
        answer: "Sí, en el casco histórico, en la zona universitaria y en el resto del municipio, además de en Santa Cruz y en la costa de Anaga.",
      },
    ],
    nearby: ["puerto-de-la-cruz", "el-medano", "costa-adeje"],
  },
  {
    slug: "el-medano",
    name: "El Médano",
    municipality: "Granadilla de Abona",
    area: "Sur",
    tagline: "Viento, surf y playas salvajes junto al aeropuerto sur",
    image: "/images/terraza-vistas-mar-tenerife.webp",
    imageAlt: "Terraza con sofás y desayuno frente a la costa de Tenerife al atardecer",
    title: "Gestión de alquiler vacacional en El Médano | Dialez Holidays",
    description:
      "Gestión de alquiler vacacional y Airbnb en El Médano (Granadilla de Abona): huéspedes de kitesurf y windsurf, estancias largas y limpieza. Desde el 15%.",
    intro: [
      "El Médano tiene una personalidad propia dentro del sur de Tenerife. Es un pueblo costero de ambiente relajado, conocido internacionalmente por el windsurf y el kitesurf, con la Montaña Roja y la playa de La Tejita a un paseo y el aeropuerto Tenerife Sur a pocos minutos.",
      "Su huésped es más joven y activo que el de las grandes zonas turísticas, y muchas veces se queda más tiempo. Para el propietario, eso significa ocupación estable, estancias largas y un anuncio que tiene que hablar el idioma del deporte y del teletrabajo.",
    ],
    guests: {
      title: "Quién se aloja en El Médano",
      text: "Kitesurfistas y windsurfistas de toda Europa, surfistas, nómadas digitales que teletrabajan varias semanas, parejas jóvenes y viajeros que aprovechan la cercanía del aeropuerto para escapadas cortas.",
    },
    properties: {
      title: "Qué viviendas funcionan mejor",
      text: "Apartamentos cerca de la playa con espacio para guardar el material deportivo, ducha exterior o zona para aclarar equipos, buena conexión a internet y un rincón de trabajo. Las terrazas protegidas del viento son muy valoradas.",
    },
    keys: [
      {
        title: "Anuncio para deportistas",
        text: "Destacamos lo que busca este huésped: cercanía a los spots, almacenaje del equipo, lavadora y secado rápido.",
      },
      {
        title: "Estancias medias y largas",
        text: "Precios por semana y por mes para teletrabajadores y temporadas de viento, sin renunciar a las reservas cortas mejor pagadas.",
      },
      {
        title: "Vivienda preparada para el viento y la arena",
        text: "Revisamos con más frecuencia cierres, toldos y textiles, y reforzamos la limpieza en cada salida.",
      },
      {
        title: "Llegadas desde Tenerife Sur",
        text: "El aeropuerto está muy cerca, así que la entrada autónoma y flexible marca la diferencia con vuelos a cualquier hora.",
      },
    ],
    regulation:
      "El Médano pertenece al municipio de Granadilla de Abona. La vivienda vacacional se rige por la Ley 6/2025 de Canarias y por el planeamiento municipal, que determina dónde se admite el uso turístico. Revisamos contigo la compatibilidad de tu vivienda antes de darla de alta.",
    faqs: [
      {
        question: "¿El viento de El Médano afecta al alquiler vacacional?",
        answer:
          "Para muchos huéspedes es precisamente el motivo del viaje. Lo tenemos en cuenta en el anuncio, en el equipamiento y en el mantenimiento, para que el viento juegue a tu favor.",
      },
      {
        question: "¿Se alquila bien una vivienda en El Médano por meses?",
        answer:
          "Sí, hay demanda de estancias largas por parte de deportistas y teletrabajadores. Combinamos esas estancias con reservas cortas según la temporada para optimizar tus ingresos.",
      },
      {
        question: "¿Cuánto cuesta vuestra gestión en El Médano?",
        answer: "Desde el 15% de cada reserva confirmada, sin cuotas fijas. La estimación de ingresos para tu vivienda es gratuita y sin compromiso.",
      },
    ],
    nearby: ["los-cristianos-playa-de-las-americas", "costa-adeje", "santa-cruz-de-tenerife"],
  },
  {
    slug: "los-gigantes",
    name: "Los Gigantes y Puerto de Santiago",
    municipality: "Santiago del Teide",
    area: "Oeste",
    tagline: "Acantilados, cetáceos y las mejores puestas de sol",
    image: "/images/apartamento-bienvenida.webp",
    imageAlt: "Dormitorio de vivienda vacacional preparado para huéspedes con cesta de bienvenida y vistas al mar",
    title: "Gestión de alquiler vacacional en Los Gigantes | Dialez Holidays",
    description:
      "Gestión de alquiler vacacional y Airbnb en Los Gigantes y Puerto de Santiago (Santiago del Teide): huéspedes, limpieza y precios dinámicos. Desde el 15%.",
    intro: [
      "Los Gigantes y Puerto de Santiago, en la costa oeste de Tenerife, ofrecen algo difícil de encontrar en otras zonas: los acantilados que dan nombre al pueblo, un puerto deportivo desde el que salen las excursiones para ver ballenas y delfines, playas de arena negra y algunas de las puestas de sol más bonitas de la isla, con La Gomera enfrente.",
      "Es un destino más tranquilo que el de las grandes zonas turísticas del sur, con un huésped que busca naturaleza, descanso y vistas. Aquí la terraza y lo que se ve desde ella forman parte del producto, y el anuncio tiene que transmitirlo.",
    ],
    guests: {
      title: "Quién se aloja en Los Gigantes",
      text: "Parejas y viajeros sénior de Reino Unido y del norte de Europa, amantes del mar y del senderismo, familias que buscan un ambiente tranquilo y visitantes que repiten estancia larga en invierno.",
    },
    properties: {
      title: "Qué viviendas funcionan mejor",
      text: "Apartamentos con terraza y vistas a los acantilados o a La Gomera, viviendas en complejos con piscina y casas en las zonas altas con vistas abiertas. Las vistas al atardecer son el mejor argumento de venta.",
    },
    keys: [
      {
        title: "Fotos al atardecer",
        text: "Hacemos que las fotografías capten la luz de la tarde y las vistas, que son lo que más reservas genera en esta zona.",
      },
      {
        title: "Experiencias locales",
        text: "Recomendamos excursiones de avistamiento responsables, rutas y restaurantes del puerto en la guía de bienvenida.",
      },
      {
        title: "Temporada de invierno larga",
        text: "Muchos huéspedes se quedan semanas o meses en invierno. Diseñamos precios por duración que mantienen alta la ocupación.",
      },
      {
        title: "Accesos y cuestas",
        text: "Informamos con claridad de pendientes, escaleras y aparcamiento: la transparencia evita malas reseñas.",
      },
    ],
    regulation:
      "Los Gigantes y Puerto de Santiago pertenecen al municipio de Santiago del Teide. La vivienda vacacional se rige por la Ley 6/2025 de Canarias y por el planeamiento municipal. Revisamos contigo la situación de tu vivienda y de tu comunidad antes de publicar el anuncio.",
    faqs: [
      {
        question: "¿Es buena zona Los Gigantes para una vivienda vacacional?",
        answer:
          "Sí, para un huésped que busca tranquilidad, naturaleza y vistas. Tiene una demanda internacional fiel, con estancias largas en invierno, y funciona especialmente bien con viviendas con terraza y vistas al mar.",
      },
      {
        question: "¿Gestionáis viviendas en Playa de la Arena y Puerto de Santiago?",
        answer: "Sí, en todo el municipio de Santiago del Teide y en la costa oeste de la isla.",
      },
      {
        question: "¿Cuánto puedo ganar con mi apartamento en Los Gigantes?",
        answer:
          "Depende de las vistas, el tamaño, el estado de la vivienda y la temporada. Te preparamos una estimación gratuita con datos de viviendas comparables antes de que decidas nada.",
      },
    ],
    nearby: ["costa-adeje", "los-cristianos-playa-de-las-americas", "puerto-de-la-cruz"],
  },
];

export function getZone(slug: string): Zone | undefined {
  return ZONES.find(zone => zone.slug === slug);
}

export function zonePath(slug: ZoneSlug): string {
  return `/zonas/${slug}`;
}
