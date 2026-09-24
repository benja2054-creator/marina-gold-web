import type { ImageAsset } from "@/lib/images";
import { ArrowRightIcon } from "@/components/icons";
import { textLink } from "@/components/ui/buttons";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

interface MarinaSectionProps {
  eyebrow: string;
  title: string;
  titleAccent: string;
  body: string;
  signature: string;
  link: { label: string; href: string };
  image: ImageAsset;
}

/*
 * Hecho por Marina (notas §5 punto 7): fondo gris hueso, foto 4:5 de 343 × 429,
 * antetítulo, título con remate en itálica, párrafo, firma "— Marina" y enlace.
 * Escritorio: foto a la izquierda y texto a la derecha.
 */
export function MarinaSection({ eyebrow, title, titleAccent, body, signature, link, image }: MarinaSectionProps) {
  return (
    <section id="historia" aria-labelledby="historia-titulo" className="bg-mg-bone pb-section-bottom pt-section-top">
      {/* Dos columnas desde 768 (en tablet la foto a todo el ancho mediría 900 px de alto) */}
      <Reveal className="mg-container md:grid md:grid-cols-2 md:items-center md:gap-8 lg:gap-12">
        <Photo
          image={image}
          ratio="box"
          bg="bg-mg-bone"
          sizes="(min-width: 1024px) 576px, (min-width: 768px) 344px, calc(100vw - 32px)"
        />
        <div className="mt-6 md:mt-0">
          <p className="mg-eyebrow">{eyebrow}</p>
          <h2 id="historia-titulo" className="mg-h2 mt-2.5">
            {title} <span className="mg-accent">{titleAccent}</span>
          </h2>
          <p className="mt-4 text-mg-body leading-long text-mg-ink-2">{body}</p>
          <p className="mg-accent mt-3 text-mg-signature">{signature}</p>
          <a href={link.href} className={`${textLink} mt-3`}>
            <span className="underline underline-offset-link">{link.label}</span>
            <ArrowRightIcon className="h-icon-sm w-icon-sm" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
