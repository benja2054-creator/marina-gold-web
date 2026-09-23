import Image from "next/image";
import type { ImageAsset } from "@/lib/images";

type Ratio = "box" | "flavor" | "hero" | "hero-desktop" | "free";

const ratioClass: Record<Ratio, string> = {
  box: "aspect-box",
  flavor: "aspect-flavor",
  hero: "aspect-hero",
  "hero-desktop": "aspect-hero-desktop",
  free: "",
};

interface PhotoProps {
  image: ImageAsset;
  /** Proporción fija: la maquetación no se mueve al cambiar la foto */
  ratio: Ratio;
  /** Clase de fondo mientras no hay foto (y detrás de fotos con transparencia) */
  bg: string;
  sizes: string;
  /** Placeholder sobre fondo oscuro (hero) */
  dark?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  /** Nombre del archivo arriba (galería, donde abajo van los segmentos) */
  labelTop?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/*
 * Foto con proporción fija. Si el archivo aún no está en /public/images, muestra un bloque
 * del color indicado en las notas con el nombre del archivo esperado en texto pequeño.
 */
export function Photo({
  image,
  ratio,
  bg,
  sizes,
  dark = false,
  fetchPriority,
  labelTop = false,
  className = "",
  children,
}: PhotoProps) {
  return (
    <div className={`relative overflow-hidden ${ratioClass[ratio]} ${bg} ${className}`}>
      {image.exists ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          fetchPriority={fetchPriority}
          loading={fetchPriority === "high" ? "eager" : "lazy"}
          className="object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={image.alt}
          className={`absolute inset-0 flex p-2 ${labelTop ? "items-start" : "items-end"}`}
        >
          <span
            aria-hidden="true"
            className={`break-all text-mg-badge font-medium leading-card ${dark ? "text-mg-on-dark-muted" : "text-mg-ink-3"}`}
          >
            {image.filename}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}
