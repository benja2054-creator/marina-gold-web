import Link from "next/link";
import type { ImageAsset } from "@/lib/images";
import { Photo } from "@/components/ui/Photo";

interface Occasion {
  id: string;
  title: string;
  text: string;
  image: ImageAsset;
}

/*
 * ¿Para qué ocasión? (notas §5, ficha punto 7): carrusel horizontal con padding lateral 16 y gap 10,
 * tarjetas de 220 con foto 220 × 275, título serif 18/700 y línea de 13.
 * Cada tarjeta enlaza a la colección [PROPUESTO]. Escritorio: 4 columnas sin carrusel.
 */
export function Occasions({ title, items }: { title: string; items: Occasion[] }) {
  return (
    <section aria-labelledby="ocasiones-titulo" className="pb-section-bottom pt-section-top">
      <div className="mg-container">
        <h2 id="ocasiones-titulo" className="mg-h2">
          {title}
        </h2>
      </div>
      <ul className="scrollbar-none mg-container mt-3 flex snap-x snap-mandatory gap-2.5 overflow-x-auto scroll-px-gutter lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible">
        {items.map((item) => (
          <li key={item.id} className="w-occasion shrink-0 snap-start lg:w-auto">
            <Link href="/collections/todas" className="group block">
              <Photo image={item.image} ratio="box" bg="bg-mg-placeholder" sizes="(min-width: 1024px) 282px, 220px" />
              <h3 className="mt-3 font-serif text-mg-occasion font-bold uppercase leading-card tracking-card transition-colors duration-fast group-hover:text-mg-red">
                {item.title}
              </h3>
              <p className="mt-2 text-mg-footer-link leading-body text-mg-ink-2">{item.text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
