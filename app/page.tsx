import { notFound } from "next/navigation";
import { BoxesSection } from "@/components/product/BoxesSection";
import { getCollection } from "@/lib/catalog";

// Etapa 2: la sección de cajas. El resto de la home llega en la etapa 3.
export default async function Home() {
  const collection = await getCollection("todas");
  if (!collection) notFound();

  return <BoxesSection collection={collection} showViewAll />;
}
