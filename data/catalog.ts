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

import type { ImageKey } from "@/data/imagenes";

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
  /** Foto 1:1 (data/imagenes.ts). Se usa en la home y en "¿Qué hay dentro?" */
  image: ImageKey;
}

export interface BoxData {
  slug: string;
  /** Nombre corto (tarjeta, pestañas): "Surtida" */
  name: string;
  /** Nombre completo (ficha): "Caja Surtida" */
  title: string;
  subtitle: string;
  /**
   * DESCRIPCIÓN de la ficha: primer párrafo (qué es) y último (empaque). Se admite **negrita**.
   * El párrafo del medio ("Caja de 12: …") se genera solo desde `contents`.
   */
  intro: string;
  packaging: string;
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
  /** Fotos (claves de data/imagenes.ts) */
  images: {
    /** Tarjeta de la grilla y miniatura de la barra fija */
    card: ImageKey;
    /** Segunda foto al pasar el mouse por la tarjeta. Si aún no existe, no hay cambio de foto. */
    hover: ImageKey;
    /**
     * 5 fotos de la galería de la ficha. Cada posición puede ser una lista: se usa la primera
     * que exista (p. ej. la foto de la tarjeta mientras falta la de la galería).
     */
    gallery: (ImageKey | ImageKey[])[];
  };
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
    image: "sabor-manjar",
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
    image: "sabor-maracuya",
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
    image: "sabor-fresa",
  },
];


// TODO: confirmar "caja rígida con lazo" con el cliente.
const PACKAGING = "Llega en caja rígida con lazo, lista para regalar. O para esconderla en tu cuarto, no juzgamos.";

export const boxes: BoxData[] = [
  {
    slug: "surtida",
    name: "Surtida",
    title: "Caja Surtida",
    subtitle: "Los tres sabores en una sola caja",
    intro:
      "Para los que no se deciden (o no quieren decidir). La Surtida trae los tres sabores de la casa, hechos a mano en tandas chiquitas.",
    packaging: PACKAGING,
    flavors: ["manjar-de-olla", "maracuya", "coulis-de-fresa"],
    contents: {
      6: { "manjar-de-olla": 2, maracuya: 2, "coulis-de-fresa": 2 },
      12: { "manjar-de-olla": 4, maracuya: 4, "coulis-de-fresa": 4 },
    },
    badge: "bestseller",
    available: true,
    images: {
      card: "caja-surtida",
      hover: "caja-surtida-abierta",
      gallery: ["surtida-galeria-1", "surtida-galeria-2", "surtida-galeria-3", "surtida-galeria-4", "surtida-galeria-5"],
    },
  },
  {
    slug: "manjar-de-olla",
    name: "Manjar de olla",
    title: "Caja Manjar de olla",
    subtitle: "Manjar de olla en chocolate negro",
    intro:
      "El clásico de la casa: manjar de olla hecho a fuego lento, dentro de una cobertura de chocolate negro que lo equilibra.",
    packaging: PACKAGING,
    flavors: ["manjar-de-olla"],
    contents: {
      6: { "manjar-de-olla": 6 },
      12: { "manjar-de-olla": 12 },
    },
    // TODO: confirmar oferta y precios (10% → S/ 40.50 y S/ 76.50) con el cliente.
    discountPercent: 10,
    available: true,
    images: {
      card: "caja-manjar",
      hover: "caja-manjar-abierta",
      // Mientras falte su galería (n.º 20), la primera foto es la de la tarjeta
      gallery: [["manjar-galeria-1", "caja-manjar"], "manjar-galeria-2", "manjar-galeria-3", "manjar-galeria-4", "manjar-galeria-5"],
    },
  },
  {
    slug: "maracuya",
    name: "Maracuyá",
    title: "Caja Maracuyá",
    subtitle: "Maracuyá en chocolate de leche",
    intro: "Ácido, cremoso y bien peruano: maracuyá dentro de una cobertura de chocolate de leche.",
    packaging: PACKAGING,
    flavors: ["maracuya"],
    contents: {
      6: { maracuya: 6 },
      12: { maracuya: 12 },
    },
    badge: "new",
    available: true,
    images: {
      card: "caja-maracuya",
      hover: "caja-maracuya-abierta",
      gallery: [["maracuya-galeria-1", "caja-maracuya"], "maracuya-galeria-2", "maracuya-galeria-3", "maracuya-galeria-4", "maracuya-galeria-5"],
    },
  },
  {
    slug: "coulis-de-fresa",
    name: "Coulis de fresa",
    title: "Caja Coulis de fresa",
    subtitle: "Coulis de fresa en chocolate blanco",
    intro:
      "Fresas reducidas a coulis dentro de una cobertura de chocolate blanco. El más coqueto de la caja, y lo sabe.",
    packaging: PACKAGING,
    flavors: ["coulis-de-fresa"],
    contents: {
      6: { "coulis-de-fresa": 6 },
      12: { "coulis-de-fresa": 12 },
    },
    available: false,
    // TODO: confirmar fecha de reposición ("Vuelve el viernes").
    restockNote: "Vuelve el viernes",
    images: {
      card: "caja-coulis-fresa",
      hover: "caja-coulis-fresa-abierta",
      gallery: [
        ["coulis-fresa-galeria-1", "caja-coulis-fresa"],
        "coulis-fresa-galeria-2",
        "coulis-fresa-galeria-3",
        "coulis-fresa-galeria-4",
        "coulis-fresa-galeria-5",
      ],
    },
  },
];
