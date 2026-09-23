/*
 * CATÁLOGO LOCAL DE MARINA GOLD
 * ------------------------------------------------------------------
 * Aquí se editan sabores, cajas, precios y estados.
 * Los componentes NO leen este archivo directamente: usan lib/catalog.ts
 * (getProducts, getProductBySlug, getCollection…), que más adelante se
 * reemplaza por Shopify Storefront API o WooCommerce sin tocar la interfaz.
 *
 * Precios en céntimos (4500 = S/ 45.00) para evitar errores de redondeo.
 * El precio por bombón, el "Desde", el ahorro y el precio con oferta se
 * calculan en lib/pricing.ts.
 */

export type FlavorId = "manjar-de-olla" | "maracuya" | "coulis-de-fresa";

/** Nombre del color de sabor en tokens.css (--mg-manjar, --mg-manjar-deep…) */
export type FlavorColor = "manjar" | "maracuya" | "fresa";

export type BoxSize = 6 | 12;

export interface FlavorData {
  id: FlavorId;
  name: string;
  /** Número de la franja en la home ("01", "02", "03") */
  number: string;
  filling: string;
  coating: string;
  description: string;
  color: FlavorColor;
  image: { src: string; alt: string; brief: string };
}

export interface BoxData {
  slug: string;
  /** Nombre corto (tarjeta, pestañas): "Surtida" */
  name: string;
  /** Nombre completo (ficha): "Caja Surtida" */
  title: string;
  subtitle: string;
  /** Párrafos de DESCRIPCIÓN en la ficha. Se admite **negrita**. */
  description: string[];
  /** Sabores que trae la caja, en orden */
  flavors: FlavorId[];
  /** Cuántos bombones de cada sabor trae cada tamaño */
  contents: Record<BoxSize, Partial<Record<FlavorId, number>>>;
  badge?: "bestseller" | "new";
  /** Porcentaje de oferta sobre el precio normal (Shopify: compare_at_price) */
  discountPercent?: number;
  /** false = AGOTADA en ambos tamaños */
  available: boolean;
  /** Texto que reemplaza "6 y 12 bombones" cuando está agotada */
  restockNote?: string;
  /** Descripción de cada una de las 5 fotos, en orden (ver README) */
  imageBriefs: [string, string, string, string, string];
}

// TODO: confirmar precios con el cliente.
export const BASE_PRICES: Record<BoxSize, number> = {
  6: 4500,
  12: 8500,
};

export const SIZES: BoxSize[] = [6, 12];

export const flavors: FlavorData[] = [
  {
    id: "manjar-de-olla",
    name: "Manjar de olla",
    number: "01",
    filling: "manjar de olla",
    coating: "chocolate negro",
    description:
      "El manjar de toda la vida, hecho a fuego lento y sin apuro. El chocolate negro lo equilibra; tú solo encárgate de no compartirlo.",
    color: "manjar",
    image: {
      src: "/images/flavors/manjar-de-olla.jpg",
      alt: "Bombón de manjar de olla en chocolate negro, partido a la mitad",
      brief: "Bombón de manjar partido a la mitad, relleno visible",
    },
  },
  {
    id: "maracuya",
    name: "Maracuyá",
    number: "02",
    filling: "maracuyá",
    coating: "chocolate de leche",
    description:
      "Ácido, cremoso y bien peruano. Lo muerdes y te despierta más que el café de las ocho.",
    color: "maracuya",
    image: {
      src: "/images/flavors/maracuya.jpg",
      alt: "Bombón de maracuyá en chocolate de leche, partido con el relleno amarillo a la vista",
      brief: "Bombón de maracuyá partido, relleno amarillo brillante",
    },
  },
  {
    id: "coulis-de-fresa",
    name: "Coulis de fresa",
    number: "03",
    filling: "coulis de fresa",
    coating: "chocolate blanco",
    description:
      "Fresas reducidas a coulis dentro de chocolate blanco. El más coqueto de la caja, y lo sabe.",
    color: "fresa",
    image: {
      src: "/images/flavors/coulis-de-fresa.jpg",
      alt: "Bombón de chocolate blanco con coulis de fresa escurriendo",
      brief: "Bombón blanco con coulis de fresa escurriendo",
    },
  },
];

/*
 * Fotos de cada caja: /images/products/[slug]-1.jpg a [slug]-5.jpg (4:5), en este orden:
 * 1 caja cerrada · 2 caja abierta vista desde arriba · 3 bombón cortado mostrando el relleno
 * 4 detalle de textura · 5 foto de ambiente o regalo.
 */
export const boxes: BoxData[] = [
  {
    slug: "surtida",
    name: "Surtida",
    title: "Caja Surtida",
    subtitle: "Los tres sabores en una sola caja",
    description: [
      "Para los que no se deciden (o no quieren decidir). La Surtida trae los tres sabores de la casa, hechos a mano en tandas chiquitas.",
      "**Caja de 12:** 4 de manjar de olla, 4 de maracuyá y 4 de coulis de fresa.\n**Caja de 6:** 2 de cada sabor.",
      // TODO: confirmar "caja rígida con lazo" con el cliente.
      "Llega en caja rígida con lazo, lista para regalar. O para esconderla en tu cuarto, no juzgamos.",
    ],
    flavors: ["manjar-de-olla", "maracuya", "coulis-de-fresa"],
    contents: {
      6: { "manjar-de-olla": 2, maracuya: 2, "coulis-de-fresa": 2 },
      12: { "manjar-de-olla": 4, maracuya: 4, "coulis-de-fresa": 4 },
    },
    badge: "bestseller",
    available: true,
    imageBriefs: [
      "Caja Surtida cerrada, lazo rojo",
      "Caja Surtida abierta, vista cenital",
      "Bombones de los tres sabores cortados, rellenos visibles",
      "Detalle de textura de las tres coberturas",
      "Caja Surtida lista para regalar, ambiente",
    ],
  },
  {
    slug: "manjar-de-olla",
    name: "Manjar de olla",
    title: "Caja Manjar de olla",
    subtitle: "Manjar de olla en chocolate negro",
    description: [
      "El clásico de la casa: manjar de olla hecho a fuego lento, dentro de una cobertura de chocolate negro que lo equilibra.",
      "**Caja de 12:** 12 bombones de manjar de olla.\n**Caja de 6:** 6 bombones de manjar de olla.",
      // TODO: confirmar "caja rígida con lazo" con el cliente.
      "Llega en caja rígida con lazo, lista para regalar. O para esconderla en tu cuarto, no juzgamos.",
    ],
    flavors: ["manjar-de-olla"],
    contents: {
      6: { "manjar-de-olla": 6 },
      12: { "manjar-de-olla": 12 },
    },
    // TODO: confirmar oferta y precios (10% → S/ 40.50 y S/ 76.50) con el cliente.
    discountPercent: 10,
    available: true,
    imageBriefs: [
      "Caja Manjar cerrada",
      "Caja Manjar abierta, bombones negros, vista cenital",
      "Bombón de manjar cortado, relleno visible",
      "Detalle de textura del chocolate negro",
      "Caja Manjar en ambiente o de regalo",
    ],
  },
  {
    slug: "maracuya",
    name: "Maracuyá",
    title: "Caja Maracuyá",
    subtitle: "Maracuyá en chocolate de leche",
    description: [
      "Ácido, cremoso y bien peruano: maracuyá dentro de una cobertura de chocolate de leche.",
      "**Caja de 12:** 12 bombones de maracuyá.\n**Caja de 6:** 6 bombones de maracuyá.",
      // TODO: confirmar "caja rígida con lazo" con el cliente.
      "Llega en caja rígida con lazo, lista para regalar. O para esconderla en tu cuarto, no juzgamos.",
    ],
    flavors: ["maracuya"],
    contents: {
      6: { maracuya: 6 },
      12: { maracuya: 12 },
    },
    badge: "new",
    available: true,
    imageBriefs: [
      "Caja Maracuyá cerrada",
      "Caja Maracuyá abierta, bombones de leche, vista cenital",
      "Bombón de maracuyá cortado, relleno amarillo",
      "Detalle de textura del chocolate de leche",
      "Caja Maracuyá en ambiente o de regalo",
    ],
  },
  {
    slug: "coulis-de-fresa",
    name: "Coulis de fresa",
    title: "Caja Coulis de fresa",
    subtitle: "Coulis de fresa en chocolate blanco",
    description: [
      "Fresas reducidas a coulis dentro de una cobertura de chocolate blanco. El más coqueto de la caja, y lo sabe.",
      "**Caja de 12:** 12 bombones de coulis de fresa.\n**Caja de 6:** 6 bombones de coulis de fresa.",
      // TODO: confirmar "caja rígida con lazo" con el cliente.
      "Llega en caja rígida con lazo, lista para regalar. O para esconderla en tu cuarto, no juzgamos.",
    ],
    flavors: ["coulis-de-fresa"],
    contents: {
      6: { "coulis-de-fresa": 6 },
      12: { "coulis-de-fresa": 12 },
    },
    available: false,
    // TODO: confirmar fecha de reposición ("Vuelve el viernes").
    restockNote: "Vuelve el viernes",
    imageBriefs: [
      "Caja Coulis cerrada",
      "Caja Coulis abierta, bombones blancos, vista cenital",
      "Bombón de coulis de fresa cortado, relleno visible",
      "Detalle de textura del chocolate blanco",
      "Caja Coulis en ambiente o de regalo",
    ],
  },
];
