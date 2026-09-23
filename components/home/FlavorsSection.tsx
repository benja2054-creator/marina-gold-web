import type { Flavor } from "@/lib/catalog";
import { flavorBg, flavorDeepBg } from "@/lib/flavor-styles";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

interface FlavorsSectionProps {
  eyebrow: string;
  titleLines: string[];
  titleAccent: string;
  flavors: Flavor[];
}

/*
 * Los tres sabores (notas §5 punto 4 y "Franja de sabor" §4).
 * Móvil: franjas a todo el ancho, pegadas, padding 28 · 16 · 36, foto 1:1 sobre fondo "deep".
 * Tablet: foto a la izquierda (50%) y texto a la derecha. Escritorio: 3 columnas.
 */
export function FlavorsSection({ eyebrow, titleLines, titleAccent, flavors }: FlavorsSectionProps) {
  return (
    <section id="sabores" aria-labelledby="sabores-titulo" className="pt-section-top">
      <div className="mg-container">
        <p className="mg-eyebrow">{eyebrow}</p>
        <h2 id="sabores-titulo" className="mg-h2 mt-2 text-mg-h2-sm">
          {titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="mg-accent block">{titleAccent}</span>
        </h2>
      </div>

      <div className="mt-6 lg:grid lg:grid-cols-3">
        {flavors.map((flavor) => (
          <article
            key={flavor.id}
            aria-labelledby={`sabor-${flavor.id}`}
            className={`${flavorBg[flavor.color]} pb-9 pt-7`}
          >
            <Reveal className="mg-container flex flex-col gap-4 md:grid md:grid-cols-2 md:items-center md:gap-6 lg:flex lg:max-w-none lg:items-stretch">
              <Photo
                image={flavor.image}
                ratio="flavor"
                bg={flavorDeepBg[flavor.color]}
                sizes="(min-width: 1024px) calc(33vw - 96px), (min-width: 768px) 341px, calc(100vw - 32px)"
              />
              <div className="flex flex-col pt-1">
                <div className="flex items-baseline justify-between gap-4 border-b border-mg-black pb-2">
                  <h3
                    id={`sabor-${flavor.id}`}
                    className="font-serif text-mg-h3 font-bold uppercase leading-tight tracking-h3"
                  >
                    {flavor.name}
                  </h3>
                  <span aria-hidden="true" className="mg-accent text-mg-occasion">
                    {flavor.number}
                  </span>
                </div>
                <p className="mg-label mt-2">En {flavor.coating}</p>
                <p className="mt-2 text-mg-body leading-body text-mg-ink-2">{flavor.description}</p>
              </div>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  );
}
