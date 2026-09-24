"use client";

import { useRef, useState } from "react";
import type { ImageAsset } from "@/lib/images";
import { productPage as t } from "@/data/content";
import { Photo } from "@/components/ui/Photo";

/*
 * Galería de la ficha (notas §5, ficha punto 2).
 * Móvil/tablet: carrusel 4:5 a todo el ancho con scroll-snap, contador "1 / 5" arriba a la derecha
 * (a 10 px de los bordes) e indicador de 5 segmentos de 3 px abajo (a 16 px de los bordes).
 * Escritorio: miniaturas verticales a la izquierda en lugar de los segmentos (notas §6).
 * Sin carrusel automático.
 */
export function Gallery({ images, title }: { images: ImageAsset[]; title: string }) {
  const [active, setActive] = useState(0);
  const scrollerRef = useRef<HTMLUListElement>(null);

  const goTo = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: index * el.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div className="lg:grid lg:grid-cols-[auto_1fr] lg:gap-3">
      <ul aria-label={`${t.galleryLabel} ${title}`} className="hidden flex-col gap-2 lg:flex">
        {images.map((image, i) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${i + 1} ${t.photoOf} ${images.length}: ${image.alt}`}
              aria-current={i === active}
              className={`block w-gallery-thumb border transition-colors duration-fast ${
                i === active ? "border-mg-black" : "border-transparent hover:border-mg-line"
              }`}
            >
              <Photo image={image} ratio="box" bg="bg-mg-bone" sizes="72px" />
            </button>
          </li>
        ))}
      </ul>

      <div className="relative">
        <ul
          ref={scrollerRef}
          tabIndex={0}
          aria-label={`${t.galleryLabel} ${title}`}
          onScroll={(event) => {
            const el = event.currentTarget;
            setActive(Math.round(el.scrollLeft / el.clientWidth));
          }}
          className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto"
        >
          {images.map((image, i) => (
            <li key={image.src} aria-label={`${i + 1} ${t.photoOf} ${images.length}`} className="w-full shrink-0 snap-start">
              <Photo
                image={image}
                ratio="box"
                bg="bg-mg-bone"
                sizes="(min-width: 1024px) 528px, (min-width: 768px) 600px, 100vw"
                fetchPriority={i === 0 ? "high" : undefined}
              />
            </li>
          ))}
        </ul>

        <span
          aria-hidden="true"
          className="absolute right-2.5 top-2.5 flex h-counter items-center bg-mg-black px-2 text-mg-eyebrow font-bold text-mg-on-dark"
        >
          {active + 1} / {images.length}
        </span>

        <div aria-hidden="true" className="absolute inset-x-4 bottom-4 flex gap-1 lg:hidden">
          {images.map((image, i) => (
            <span
              key={image.src}
              className={`h-0.75 flex-1 transition-colors duration-fast ${i === active ? "bg-mg-black" : "bg-mg-segment-off"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
