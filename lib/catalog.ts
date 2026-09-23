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
import { catalogLabels, collectionPage, productCard } from "@/data/content";
import { firstAvailable, image, type ImageAsset } from "@/lib/images";
import { applyDiscount, bulkSavings, pricePerUnit } from "@/lib/pricing";
import { joinList } from "@/lib/text";

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
  /** Foto de la tarjeta de la grilla (también miniatura de la barra fija) */
  cardImage: ImageAsset;
  /** Segunda foto del hover; si no existe (exists: false) la tarjeta no cambia de foto */
  hoverImage: ImageAsset;
  /** Galería de la ficha (5 fotos o placeholders) */
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
  return { ...f, image: image(f.image) };
}

function badgeFor(box: BoxData): Badge | null {
  const t = catalogLabels.badges;
  if (!box.available) return { kind: "soldout", label: t.soldout };
  if (box.discountPercent) return { kind: "discount", label: t.discount(box.discountPercent) };
  if (box.badge === "bestseller") return { kind: "bestseller", label: t.bestseller };
  if (box.badge === "new") return { kind: "new", label: t.new };
  return null;
}

/*
 * Párrafo de composición de la DESCRIPCIÓN, a partir de `contents` (una sola fuente de verdad):
 * "**Caja de 12:** 4 de manjar de olla, 4 de maracuyá y 4 de coulis de fresa.\n**Caja de 6:** 2 de cada sabor."
 * La primera línea (caja más grande) enumera los sabores; las siguientes dicen "N de cada sabor"
 * si todos van en igual cantidad. Cajas de un sabor: "12 bombones de manjar de olla".
 */
function compositionText(variants: Variant[], isAssorted: boolean): string {
  const t = catalogLabels.composition;
  return [...variants]
    .sort((a, b) => b.size - a.size)
    .map((variant, i) => {
      const items = variant.contents.filter((c) => c.quantity > 0);
      const allEqual = items.every((c) => c.quantity === items[0].quantity);
      const text = !isAssorted
        ? `${items[0].quantity} ${t.unitsOf} ${items[0].flavor.filling}`
        : i > 0 && allEqual
          ? `${items[0].quantity} ${t.eachFlavor}`
          : joinList(items.map((c) => `${c.quantity} ${t.of} ${c.flavor.filling}`));
      return `**${t.boxOf} ${variant.size}:** ${text}.`;
    })
    .join("\n");
}

function toProduct(box: BoxData, allFlavors: Flavor[]): Product {
  const byId = (id: FlavorId) => allFlavors.find((f) => f.id === id)!;

  const variants: Variant[] = SIZES.map((size) => {
    const base = BASE_PRICES[size];
    const price = applyDiscount(base, box.discountPercent);
    return {
      id: `${box.slug}-${size}`,
      title: `${size} ${productCard.unitsSuffix}`,
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
  const isAssorted = productFlavors.length > 1;

  return {
    slug: box.slug,
    name: box.name,
    title: box.title,
    subtitle: box.subtitle,
    description: [box.intro, compositionText(variants, isAssorted), box.packaging],
    flavors: productFlavors,
    colors: productFlavors.map((f) => f.color),
    isAssorted,
    variants,
    available: box.available,
    restockNote: box.restockNote ?? null,
    badge: badgeFor(box),
    minPrice: small.price,
    minCompareAtPrice: small.compareAtPrice,
    bulkSavings: bulkSavings(small.price, large.price),
    cardImage: image(box.images.card),
    hoverImage: image(box.images.hover),
    images: box.images.gallery.map((slot) => firstAvailable(Array.isArray(slot) ? slot : [slot])),
  };
}

export async function getFlavors(): Promise<Flavor[]> {
  return flavorData.map(toFlavor);
}

export async function getProducts(): Promise<Product[]> {
  const allFlavors = flavorData.map(toFlavor);
  return boxes.map((box) => toProduct(box, allFlavors));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const box = boxes.find((b) => b.slug === slug);
  return box ? toProduct(box, flavorData.map(toFlavor)) : null;
}

export async function getProductSlugs(): Promise<string[]> {
  return boxes.map((b) => b.slug);
}

export async function getCollection(handle: string): Promise<Collection | null> {
  if (handle !== "todas") return null;
  return {
    handle,
    title: collectionPage.title,
    products: await getProducts(),
    filters: [
      { id: "todas", label: catalogLabels.allFilter, color: null },
      ...flavorData.map((f) => ({ id: f.id, label: f.name, color: f.color })),
    ],
  };
}
