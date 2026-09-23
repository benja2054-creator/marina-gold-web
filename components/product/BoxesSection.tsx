import Link from "next/link";
import type { Collection } from "@/lib/catalog";
import { home } from "@/data/content";
import { BoxesBrowser } from "@/components/product/BoxesBrowser";

interface BoxesSectionProps {
  collection: Collection;
  /** h2 en la home, h1 en la página de colección */
  titleAs?: "h1" | "h2";
  showViewAll?: boolean;
}

/*
 * "LAS CAJAS" (notas §5, home punto 5 y 6): título a 34 con "VER TODO" a la derecha,
 * pestañas de filtro y grilla. La colección usa la misma sección (prompt, página 3).
 */
export function BoxesSection({ collection, titleAs: Title = "h2", showViewAll = false }: BoxesSectionProps) {
  return (
    // pt-9: en la lámina el título queda a 44 px del borde de la sección (más que el 28 genérico).
    <section id="cajas" aria-labelledby="cajas-titulo" className="pb-section-bottom pt-9">
      <div className="mg-container">
        <div className="flex items-start justify-between gap-4">
          <Title id="cajas-titulo" className="mg-h2 text-mg-h2-lg">
            {collection.title}
          </Title>
          {showViewAll && (
            <Link
              href={`/collections/${collection.handle}`}
              className="flex h-touch shrink-0 items-center text-mg-button-sm font-bold uppercase tracking-label underline underline-offset-link transition-colors duration-fast hover:text-mg-red"
            >
              {home.boxes.viewAll}
            </Link>
          )}
        </div>
        <div className="mt-2.5">
          <BoxesBrowser
            filters={collection.filters}
            products={collection.products}
            cardTitleAs={Title === "h1" ? "h2" : "h3"}
            tabsLabel={home.boxes.tabsLabel}
          />
        </div>
      </div>
    </section>
  );
}
