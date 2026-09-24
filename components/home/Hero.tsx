import { getImageProps } from "next/image";
import { HERO_ALT } from "@/data/imagenes";
import type { ImageAsset } from "@/lib/images";
import { heroButton } from "@/components/ui/buttons";

interface HeroProps {
  eyebrow: string;
  title: string;
  cta: string;
  ctaHref: string;
  mobile: ImageAsset;
  desktop: ImageAsset;
}

/*
 * Hero (notas §5 punto 3 y §6): 4:5 en móvil (375 × 469); 16:9 con máximo 720 de alto desde 768
 * (la tablet no está definida en las notas: se usa la foto 16:9, ver decisiones.md).
 * Contenido centrado en ambos ejes, gap 14: antetítulo, título en una línea y botón (10 px más abajo).
 * Velo negro al 30% sobre la foto para asegurar el contraste del texto blanco.
 * <picture> con dirección de arte: cada dispositivo descarga solo su foto (sin preload, que
 * descargaría también la de celular en escritorio; fetchPriority alto porque es el LCP).
 * Un solo texto alternativo para las dos fotos (HERO_ALT).
 */
export function Hero({ eyebrow, title, cta, ctaHref, mobile, desktop }: HeroProps) {
  const common = { alt: HERO_ALT, sizes: "100vw", fetchPriority: "high" as const, loading: "eager" as const };
  // Tamaños del manifiesto data/imagenes.ts (1600 × 2000 y 2560 × 1440)
  const size = (i: ImageAsset) => ({ width: i.width, height: i.height, src: i.src });
  const mobileImg = getImageProps({ ...common, ...size(mobile) }).props;
  const desktopImg = getImageProps({ ...common, ...size(desktop) }).props;
  const imgClass = "absolute inset-0 h-full w-full object-cover";

  return (
    <section
      aria-labelledby="hero-titulo"
      className="relative aspect-hero overflow-hidden bg-mg-black text-mg-on-dark md:aspect-auto md:h-hero-wide"
    >
      <picture>
        {/* Sin optimización (GitHub Pages) getImageProps no genera srcSet: se usa el src directo */}
        <source media="(min-width: 768px)" srcSet={desktopImg.srcSet ?? desktopImg.src} sizes="100vw" />
        <img {...mobileImg} alt={HERO_ALT} className={imgClass} />
      </picture>

      <div aria-hidden="true" className="absolute inset-0 bg-mg-hero-veil" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3.5 px-gutter text-center">
        <p className="text-mg-hero-eyebrow font-bold uppercase tracking-hero-eyebrow">{eyebrow}</p>
        <h1 id="hero-titulo" className="whitespace-nowrap font-serif text-mg-hero font-extrabold uppercase leading-tight">
          {title}
        </h1>
        <a href={ctaHref} className={`${heroButton} mt-2.5`}>
          {cta}
        </a>
      </div>
    </section>
  );
}
