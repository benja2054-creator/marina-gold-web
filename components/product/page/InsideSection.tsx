"use client";

import { flavorBg, flavorDeepBg } from "@/lib/flavor-styles";
import { productPage, ui } from "@/data/content";
import { Photo } from "@/components/ui/Photo";
import { useProduct } from "@/components/product/page/ProductContext";

const t = productPage.inside;

/*
 * ¿Qué hay dentro? (notas §5, ficha punto 6): fondo gris hueso, padding 28 · 16 · 36.
 * Una fila por sabor (gap 8) con su color, foto 96 × 96 sobre "deep", nombre, relleno, cobertura
 * y la cantidad en itálica ("×4" en la de 12, "×2" en la de 6). Cajas de un sabor: una sola fila.
 * Escritorio: 3 columnas.
 */
export function InsideSection() {
  const { variant } = useProduct();
  const rows = variant.contents.filter((c) => c.quantity > 0);

  return (
    <section aria-labelledby="dentro-titulo" className="bg-mg-bone pb-9 pt-7">
      <div className="mg-container">
        <h2 id="dentro-titulo" className="mg-h2">
          {t.title}
        </h2>
        <p className="mg-label mt-1 text-mg-ink-3" aria-live="polite">
          {t.labelBefore} {variant.size} {t.labelAfter}
        </p>
        <ul className="mt-3.5 grid gap-2 lg:grid-cols-3 lg:gap-4">
          {rows.map(({ flavor, quantity }) => (
            <li key={flavor.id} className={`flex items-center gap-3.5 py-2.5 pl-2.5 pr-3.5 ${flavorBg[flavor.color]}`}>
              <Photo
                image={flavor.image}
                ratio="flavor"
                bg={flavorDeepBg[flavor.color]}
                sizes="96px"
                className="w-inside-photo shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-mg-inside-name font-bold uppercase leading-card">{flavor.name}</h3>
                <p className="mt-1 text-mg-small leading-note text-mg-ink-2">
                  {t.filling} {flavor.filling}
                  <br />
                  {t.coating} {flavor.coating}
                </p>
              </div>
              <p className="mg-accent shrink-0 text-mg-accent leading-none">
                <span aria-hidden="true">×</span>
                <span className="sr-only">{ui.quantity} </span>
                {quantity}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
