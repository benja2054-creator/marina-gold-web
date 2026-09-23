/*
 * TEXTOS DEL SITIO
 * ------------------------------------------------------------------
 * Todos los textos son de ejemplo, en la voz de Marina, y deben
 * confirmarse con el cliente. Los marcados con TODO están pendientes
 * de confirmación explícita (ver notas-de-diseno.md §7, punto 12).
 * Los productos, sabores y precios están en data/catalog.ts.
 */

export const brand = {
  name: "Marina Gold",
  city: "Lima, Perú",
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
  copyright: "© 2026 Marina Gold · Lima, Perú. Hecho a mano, comido con ganas.",
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
    image: {
      mobile: {
        src: "/images/hero-mobile.jpg",
        alt: "Caja Surtida de Marina Gold abierta, con bombones de los tres sabores",
        brief: "Caja Surtida abierta (vertical 4:5)",
      },
      desktop: {
        src: "/images/hero-desktop.jpg",
        alt: "Caja Surtida de Marina Gold abierta, con bombones de los tres sabores",
        brief: "Caja Surtida abierta (horizontal 16:9)",
      },
    },
  },
  flavors: {
    eyebrow: "Los bombones",
    titleLines: ["Tres sabores.", "Tres chocolates."],
    titleAccent: "Cero arrepentimientos.",
  },
  boxes: {
    title: "Las cajas",
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
    image: {
      src: "/images/marina-1.jpg",
      alt: "Marina en su cocina, con delantal negro y una bandeja de bombones",
      brief: "Marina en su cocina, delantal negro, bandeja de bombones en mano",
    },
  },
  howToOrder: {
    eyebrow: "Cómo pedir",
    title: "Tu caja, donde más te acomode",
    body: "Hacemos cada tanda por pedido, así que pide con 24 horas de anticipación.",
    web: "Pedir en la web",
    whatsapp: "Pedir por WhatsApp",
    rappi: "Rappi",
    pedidosYa: "PedidosYa",
    // TODO: confirmar la lista de distritos con el cliente.
    districtsLead: "Llegamos a",
    districts:
      "Miraflores, San Isidro, Barranco, Surco, San Borja, La Molina, Jesús María, Magdalena y Lince. ¿Otro distrito? Escríbenos y lo vemos.",
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
  sizeLabel: "Tamaño",
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
        image: { src: "/images/ocasiones/regalo.jpg", alt: "Caja de bombones con lazo y una tarjeta escrita a mano", brief: "Caja con lazo y tarjeta escrita a mano" },
      },
      {
        id: "cumpleanos",
        title: "Cumpleaños",
        text: "Mejor que una torta que nadie termina.",
        image: { src: "/images/ocasiones/cumpleanos.jpg", alt: "Caja de bombones abierta con una vela encendida", brief: "Caja abierta con una vela encendida" },
      },
      {
        id: "aniversario",
        title: "Aniversario",
        text: "Doce formas de decir “te quiero”.",
        image: { src: "/images/ocasiones/aniversario.jpg", alt: "Caja de 12 bombones sobre una mesa para dos", brief: "Caja de 12 bombones en una mesa para dos" },
      },
      {
        id: "antojo",
        title: "Antojo",
        text: "No necesitas una ocasión. Esta es la ocasión.",
        image: { src: "/images/ocasiones/antojo.jpg", alt: "Mano tomando un bombón de una caja abierta", brief: "Mano tomando un bombón de la caja abierta" },
      },
    ],
  },
  faq: {
    title: "Preguntas frecuentes",
    // TODO: confirmar todas las respuestas de la FAQ con el cliente.
    items: [
      {
        q: "¿A qué distritos de Lima llegan?",
        a: "Miraflores, San Isidro, Barranco, Surco, San Borja, La Molina, Jesús María, Magdalena y Lince. ¿Estás en otro distrito? Escríbenos por WhatsApp y lo coordinamos.",
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
  title: "Esta página se la comieron.",
  body: "No encontramos lo que buscabas. Pero las cajas siguen aquí.",
  cta: "Ver las cajas",
  home: "Volver al inicio",
};
