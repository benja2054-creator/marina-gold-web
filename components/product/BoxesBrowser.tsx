"use client";

import { useId, useRef, useState } from "react";
import type { CollectionFilter, Product } from "@/lib/catalog";
import { FlavorDot } from "@/components/ui/FlavorDot";
import { ProductCard } from "@/components/product/ProductCard";

interface BoxesBrowserProps {
  filters: CollectionFilter[];
  products: Product[];
  /** Nivel del nombre de cada caja según el título de la página */
  cardTitleAs?: "h2" | "h3";
  tabsLabel: string;
}

function matches(product: Product, filter: CollectionFilter["id"]) {
  if (filter === "todas") return true;
  // Una pestaña de sabor muestra solo la caja de ese sabor; la Surtida aparece en "TODAS" (notas §4).
  return !product.isAssorted && product.flavors[0].id === filter;
}

/*
 * Pestañas de filtro + grilla de cajas (notas §4 y §5).
 * Pestañas: alto 44, padding 0 18, gap 8, scroll horizontal sin barra; la tercera queda
 * cortada al borde a propósito. Filtran en el sitio, sin recargar.
 * Grilla: 2 columnas (gap 11 / 32), 4 columnas desde 1024 (gap 24).
 */
export function BoxesBrowser({ filters, products, cardTitleAs, tabsLabel }: BoxesBrowserProps) {
  const [active, setActive] = useState<CollectionFilter["id"]>("todas");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const visible = products.filter((p) => matches(p, active));

  const select = (index: number) => {
    const next = (index + filters.length) % filters.length;
    setActive(filters[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      <div
        role="tablist"
        aria-label={tabsLabel}
        className="scrollbar-none -mx-gutter flex gap-2 overflow-x-auto px-gutter"
        onKeyDown={(event) => {
          const current = filters.findIndex((f) => f.id === active);
          if (event.key === "ArrowRight") select(current + 1);
          else if (event.key === "ArrowLeft") select(current - 1);
          else if (event.key === "Home") select(0);
          else if (event.key === "End") select(filters.length - 1);
          else return;
          event.preventDefault();
        }}
      >
        {filters.map((filter, i) => {
          const selected = filter.id === active;
          return (
            <button
              key={filter.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`${baseId}-tab-${filter.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(filter.id)}
              className={`flex h-touch shrink-0 items-center gap-2 whitespace-nowrap border border-mg-border px-4.5 text-mg-tab font-bold uppercase tracking-button transition-colors duration-fast ${
                selected ? "bg-mg-black text-mg-on-dark" : "bg-mg-white text-mg-ink hover:bg-mg-bone"
              }`}
            >
              {filter.color && <FlavorDot color={filter.color} />}
              {filter.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="mt-7 grid grid-cols-2 gap-x-grid-col gap-y-grid-row lg:grid-cols-4"
      >
        {visible.map((product) => (
          <ProductCard key={product.slug} product={product} titleAs={cardTitleAs} />
        ))}
      </div>
    </>
  );
}
