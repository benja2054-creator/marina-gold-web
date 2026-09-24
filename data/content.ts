/*
 * TEXTOS DEL SITIO
 * ------------------------------------------------------------------
 * Todos los textos son de ejemplo, en la voz de Marina, y deben
 * confirmarse con el cliente. Los marcados con TODO están pendientes
 * de confirmación explícita (ver notas-de-diseno.md §7, punto 12).
 * Los productos, sabores y precios están en data/catalog.ts.
 */
import { joinList } from "@/lib/text";

export const brand = {
  name: "Marina Gold",
  city: "Lima, Perú",
};

/** Textos de interfaz y accesibilidad (etiquetas de botones, menús y metadatos de página) */
export const ui = {
  skipToContent: "Saltar al contenido",
  logoHome: `${brand.name}, ir al inicio`,
  openMenu: "Abrir menú",
  closeMenu: "Cerrar menú",
  menu: "Menú",
  mainNav: "Principal",
  drawerNav: "Menú principal",
  search: "Buscar",
  cart: (count: number) => `Carrito, ${count} ${count === 1 ? "producto" : "productos"}`,
  notifyMeFor: (productName: string) => `Avísame cuando vuelva ${productName}`,
  quantity: "cantidad:",
  collectionTitle: "Todas las cajas",
  notFoundTitle: "Página no encontrada",
};

// TODO: reemplazar los "#" por los enlaces reales.
export const links = {
  whatsapp: "#",
  rappi: "#",
  pedidosYa: "#",
  privacy: "#",
  // Página "Nuestra historia" aún no existe.
  story: "#",
};

export const announcement = "Delivery en Lima · Pedidos con 24 h de anticipación";

// TODO: confirmar la lista de distritos con el cliente.
// Una sola lista: la usan "Cómo pedir" (home) y la primera pregunta de la FAQ (ficha).
export const districts = [
  "Miraflores",
  "San Isidro",
  "Barranco",
  "Surco",
  "San Borja",
  "La Molina",
  "Jesús María",
  "Magdalena",
  "Lince",
];

/** Etiquetas que arma el catálogo (lib/catalog.ts) */
export const catalogLabels = {
  allFilter: "Todas",
  badges: {
    soldout: "Agotada",
    bestseller: "Más vendida",
    new: "Novedad",
    discount: (percent: number) => `Ahorra ${percent}%`,
  },
  /** Párrafo de composición de la DESCRIPCIÓN, generado desde data/catalog.ts → contents */
  composition: {
    boxOf: "Caja de",
    of: "de",
    unitsOf: "bombones de",
    eachFlavor: "de cada sabor",
  },
};

/** Navegación de escritorio (notas §6). Anclas a secciones de la home (decisiones.md). */
export const desktopNav = [
  { label: "Cajas", href: "/collections/todas" },
  { label: "Sabores", href: "/#sabores" },
  { label: "Nuestra historia", href: "/#historia" },
  { label: "Cómo pedir", href: "/#como-pedir" },
];

/** Menú lateral (notas §6). El grupo "Las cajas" se arma con el catálogo. */
export const drawerMenu = {
  boxesGroupLabel: "Las cajas",
  allBoxesLabel: "Todas",
  links: [
    { label: "Nuestra historia", href: "/#historia" },
    { label: "Cómo pedir", href: "/#como-pedir" },
    { label: "Preguntas frecuentes", href: "/products/surtida#preguntas" },
  ],
  whatsappLabel: "Escríbenos por WhatsApp",
};

export const socials = [
  // TODO: reemplazar por los perfiles reales de Marina Gold.
  { id: "tiktok", label: "Marina Gold en TikTok", href: "#" },
  { id: "instagram", label: "Marina Gold en Instagram", href: "#" },
  { id: "kick", label: "Marina Gold en Kick", href: "#" },
] as const;

export const footer = {
  // TODO: crear las páginas legales y enlazarlas.
  legal: [
    { label: "Libro de Reclamaciones", href: "#" },
    { label: "Política de privacidad", href: "#" },
    { label: "Envíos y cambios", href: "#" },
    { label: "Términos y condiciones", href: "#" },
  ],
  copyright: `© 2026 ${brand.name} · ${brand.city}. Hecho a mano, comido con ganas.`,
  paymentsLabel: "Medios de pago",
  socialLabel: "Redes sociales",
  legalLabel: "Información legal",
};

export const home = {
  hero: {
    // TODO: confirmar "Edición Primavera" con el cliente.
    eyebrow: "Edición Primavera",
    title: "Nueva colección",
    cta: "Comprar",
    // Claves de data/imagenes.ts
    image: { mobile: "home-hero", desktop: "home-hero-desktop" } as const,
  },
  flavors: {
    eyebrow: "Los bombones",
    titleLines: ["Tres sabores.", "Tres chocolates."],
    titleAccent: "Cero arrepentimientos.",
  },
  // El título "Las cajas" es el de la colección: collectionPage.title
  boxes: {
    viewAll: "Ver todo",
    tabsLabel: "Filtrar cajas por sabor",
  },
  marina: {
    eyebrow: "Hecho por Marina",
    title: "No nací chocolatera.",
    titleAccent: "Me volví una por antojo.",
    body: "Todo empezó en mi cocina, probando rellenos a las dos de la mañana para mis amigas. Quería un bombón que supiera a Lima: al manjar de la casa, al maracuyá del mercado. Cada caja la armamos a mano, en tandas chiquitas, para que te llegue como si te la hubiera llevado yo.",
    signature: "— Marina",
    link: "Conoce la historia",
    image: "marina" as const,
  },
  howToOrder: {
    eyebrow: "Cómo pedir",
    title: "Tu caja, donde más te acomode",
    body: "Hacemos cada tanda por pedido, así que pide con 24 horas de anticipación.",
    web: "Pedir en la web",
    whatsapp: "Pedir por WhatsApp",
    rappi: "Rappi",
    pedidosYa: "PedidosYa",
    districtsLead: "Llegamos a",
    districts: `${joinList(districts)}. ¿Otro distrito? Escríbenos y lo vemos.`,
  },
};

export const newsletter = {
  title: "Sé de los primeros en probar la próxima edición",
  body: "Sabores nuevos, cajas limitadas y uno que otro chisme de cocina. Nada de spam, palabra.",
  label: "Tu correo",
  placeholder: "nombre@correo.com",
  submit: "Unirme",
  consentBefore: "Acepto recibir correos de Marina Gold y la ",
  consentLink: "política de privacidad",
  consentAfter: ".",
  error: "Revisa tu correo",
  consentError: "Marca la casilla para continuar",
  success: "¡Listo! Te avisamos antes que a nadie.",
};

export const productPage = {
  galleryLabel: "Fotos de",
  thumbsLabel: "Miniaturas de las fotos de",
  photoOf: "de",
  quantityLabel: "Cantidad",
  decrease: "Quitar uno",
  increase: "Agregar uno",
  // Maqueta: el carrito todavía no está conectado a una tienda.
  mockCartNotice: "Maqueta: el carrito aún no está conectado.",
  savingsPrefix: "Ahorra",
  previousPrice: "Precio anterior:",
  sizeLabel: "Tamaño",
  descriptionTitle: "Descripción",
  addToCart: "Añadir al carrito",
  addShort: "Añadir",
  soldOut: "Agotada",
  notifyMe: "Avísame",
  perUnit: "por bombón",
  // TODO: confirmar "desde mañana" con el cliente.
  delivery: { before: "Pide hoy y recíbela en Lima ", strong: "desde mañana", after: "." },
  highlights: [
    { icon: "hand", lines: ["Hecho a mano", "en Lima"] },
    { icon: "leaf", lines: ["Sabores", "peruanos"] },
    { icon: "gift", lines: ["Ideal para", "regalar"] },
  ],
  accordions: [
    {
      title: "Delivery en Lima",
      // TODO: texto pendiente del cliente (ejemplo breve).
      body: [
        "Entregamos en los distritos de Lima que figuran en “Cómo pedir”, de lunes a sábado. Pide con 24 horas de anticipación.",
      ],
    },
    {
      title: "Conservación",
      // TODO: texto pendiente del cliente (ejemplo breve).
      body: [
        "Guárdalos en un lugar fresco y seco, lejos del sol. Si hace calor, al refrigerador, y sácalos 15 minutos antes de comerlos.",
      ],
    },
    {
      title: "Ingredientes y alérgenos",
      // TODO: texto pendiente del cliente (ejemplo breve).
      body: [
        "Chocolate (negro, de leche o blanco), leche, azúcar, crema de leche y fruta. Contiene lácteos y puede contener trazas de frutos secos y soya.",
      ],
    },
  ],
  inside: {
    title: "¿Qué hay dentro?",
    labelBefore: "En tu caja de",
    labelAfter: "bombones",
    filling: "Relleno de",
    coating: "Cobertura de",
  },
  occasions: {
    title: "¿Para qué ocasión?",
    items: [
      {
        id: "regalo",
        title: "Regalo",
        // TODO: confirmar "tarjeta con dedicatoria" con el cliente.
        text: "Con lazo y una tarjeta con tu dedicatoria.",
        image: "ocasion-regalo" as const,
      },
      {
        id: "cumpleanos",
        title: "Cumpleaños",
        text: "Mejor que una torta que nadie termina.",
        image: "ocasion-cumpleanos" as const,
      },
      {
        id: "aniversario",
        title: "Aniversario",
        text: "Doce formas de decir “te quiero”.",
        image: "ocasion-aniversario" as const,
      },
      {
        id: "antojo",
        title: "Antojo",
        text: "No necesitas una ocasión. Esta es la ocasión.",
        image: "ocasion-antojo" as const,
      },
    ],
  },
  faq: {
    title: "Preguntas frecuentes",
    // TODO: confirmar todas las respuestas de la FAQ con el cliente.
    items: [
      {
        q: "¿A qué distritos de Lima llegan?",
        a: `${joinList(districts)}. ¿Estás en otro distrito? Escríbenos por WhatsApp y lo coordinamos.`,
      },
      {
        q: "¿Con cuánta anticipación tengo que pedir?",
        a: "Con 24 horas. Hacemos cada tanda por pedido para que te lleguen frescos.",
      },
      {
        q: "¿Puedo mandarla de regalo a otra dirección?",
        a: "Claro. Al pedir, pon la dirección de la persona que la recibe y nosotros nos encargamos.",
      },
      {
        q: "¿Puedo incluir una dedicatoria?",
        a: "Sí. Escríbela al hacer tu pedido y la enviamos en una tarjeta dentro de la caja.",
      },
      {
        q: "¿Puedo elegir el día y la hora de entrega?",
        a: "Puedes elegir el día. La hora la coordinamos contigo por WhatsApp dentro de un rango de entrega.",
      },
    ],
  },
};

export const productCard = {
  from: "Desde",
  unitsSuffix: "bombones",
  previousPrice: "Precio anterior:",
  notifyMe: "Avísame",
  notifyLabel: "Tu correo para avisarte",
  notifyPlaceholder: "nombre@correo.com",
  notifySubmit: "Avisarme",
  notifyError: "Revisa tu correo",
  notifySuccess: "Listo. Te avisamos apenas vuelva.",
};

export const collectionPage = {
  title: "Las cajas",
  description: "Cajas de 6 y 12 bombones artesanales en tres sabores peruanos.",
};

export const notFound = {
  eyebrow: "Error 404",
  title: "Esta página no existe.",
  titleAccent: "Alguien se la comió.",
  body: "No encontramos lo que buscabas. Pero las cajas siguen aquí.",
  cta: "Ver las cajas",
  home: "Volver al inicio",
};
