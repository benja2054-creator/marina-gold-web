import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BoxesSection } from "@/components/product/BoxesSection";
import { collectionPage } from "@/data/content";
import { getCollection } from "@/lib/catalog";

type Props = { params: Promise<{ handle: string }> };

// Por ahora solo existe /collections/todas; cualquier otra colección da 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ handle: "todas" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const collection = await getCollection((await params).handle);
  if (!collection) return {};
  return { title: "Todas las cajas", description: collectionPage.description };
}

/*
 * Colección (no dibujada): encabezado "LAS CAJAS", pestañas de filtro y grilla de la home,
 * con el mismo header, newsletter y footer (vienen del layout).
 */
export default async function CollectionPage({ params }: Props) {
  const collection = await getCollection((await params).handle);
  if (!collection) notFound();

  return <BoxesSection collection={collection} titleAs="h1" />;
}
