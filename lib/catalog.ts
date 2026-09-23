/*
 * FUNCIONES DE ACCESO AL CATÁLOGO
 * ------------------------------------------------------------------
 * Única puerta entre los componentes y los datos. Hoy leen data/catalog.ts;
 * mañana se reescriben contra Shopify (Storefront API) o WooCommerce
 * devolviendo los mismos tipos, sin tocar los componentes.
 * Son async a propósito, igual que lo serán con una API real.
 */
import {
  BASE_PRICES,
  SIZES,
  boxes,
  flavors as flavorData,
  type BoxData,
  type BoxSize,
  type FlavorColor,
  type FlavorData,
  type FlavorId,
} from "@/data/catalog";
import { imageAsset, type ImageAsset } from "@/lib/images";
import { applyDiscount, bulkSavings, pricePerUnit } from "@/lib/pricing";

export type { BoxSize, FlavorColor, FlavorId };

export interface Flavor extends Omit<FlavorData, "image"> {
  image: ImageAsset;
}

export interface VariantContent {
  flavor: Flavor;
  quantity: number;
}

/** Variante de tamaño, como en Shopify/WooCommerce */
export interface Variant {
  id: string;
  title: string;
  size: BoxSize;
  /** Precio que se cobra, en céntimos */
  price: number;
  /** Precio anterior tachado si hay oferta (Shopify: compareAtPrice) */
  compareAtPrice: number | null;
  pricePerUnit: number;
  available: boolean;
  contents: VariantContent[];
}

export type BadgeKind = "bestseller" | "discount" | "new" | "soldout";

export interface Badge {
  kind: BadgeKind;
  label: string;
}

export interface Product {
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  description: string[];
  flavors: Flavor[];
  colors: FlavorColor[];
  isAssorted: boolean;
  variants: Variant[];
  available: boolean;
  restockNote: string | null;
  badge: Badge | null;
  /** Precio "Desde" (la caja más chica) */
  minPrice: number;
  minCompareAtPrice: number | null;
  /** Ahorro de la caja de 12 frente a dos de 6 */
  bulkSavings: number;
  images: ImageAsset[];
}

export interface CollectionFilter {
  id: "todas" | FlavorId;
  label: string;
  color: FlavorColor | null;
}

export interface Collection {
  handle: string;
  title: string;
  products: Product[];
  filters: CollectionFilter[];
}

function toFlavor(f: FlavorData): Flavor {
  return { ...f, image: imageAsset(f.image.src, f.image.alt, f.image.brief) };
}

function badgeFor(box: BoxData): Badge | null {
  if (!box.available) return { kind: "soldout", label: "Agotada" };
  if (box.discountPercent) return { kind: "discount", label: `Ahorra ${box.discountPercent}%` };
  if (box.badge === "bestseller") return { kind: "bestseller", label: "Más vendida" };
  if (box.badge === "new") return { kind: "new", label: "Novedad" };
  return null;
}

function toProduct(box: BoxData): Product {
  const allFlavors = flavorData.map(toFlavor);
  const byId = (id: FlavorId) => allFlavors.find((f) => f.id === id)!;

  const variants: Variant[] = SIZES.map((size) => {
    const base = BASE_PRICES[size];
    const price = applyDiscount(base, box.discountPercent);
    return {
      id: `${box.slug}-${size}`,
      title: `${size} bombones`,
      size,
      price,
      compareAtPrice: price < base ? base : null,
      pricePerUnit: pricePerUnit(price, size),
      available: box.available,
      contents: box.flavors.map((id) => ({ flavor: byId(id), quantity: box.contents[size][id] ?? 0 })),
    };
  });

  const [small, large] = variants;
  const productFlavors = box.flavors.map(byId);

  return {
    slug: box.slug,
    name: box.name,
    title: box.title,
    subtitle: box.subtitle,
    description: box.description,
    flavors: productFlavors,
    colors: productFlavors.map((f) => f.color),
    isAssorted: productFlavors.length > 1,
    variants,
    available: box.available,
    restockNote: box.restockNote ?? null,
    badge: badgeFor(box),
    minPrice: small.price,
    minCompareAtPrice: small.compareAtPrice,
    bulkSavings: bulkSavings(small.price, large.price),
    images: box.imageBriefs.map((brief, i) =>
      imageAsset(`/images/products/${box.slug}-${i + 1}.jpg`, `${box.title}: ${brief.toLowerCase()}`, brief),
    ),
  };
}

export async function getFlavors(): Promise<Flavor[]> {
  return flavorData.map(toFlavor);
}

export async function getProducts(): Promise<Product[]> {
  return boxes.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const box = boxes.find((b) => b.slug === slug);
  return box ? toProduct(box) : null;
}

export async function getProductSlugs(): Promise<string[]> {
  return boxes.map((b) => b.slug);
}

export async function getCollection(handle: string): Promise<Collection | null> {
  if (handle !== "todas") return null;
  return {
    handle,
    title: "Las cajas",
    products: await getProducts(),
    filters: [
      { id: "todas", label: "Todas", color: null },
      ...flavorData.map((f) => ({ id: f.id, label: f.name, color: f.color })),
    ],
  };
}
