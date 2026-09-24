import Image from "next/image";
import type { ImageAsset } from "@/lib/images";

type Ratio = "box" | "flavor" | "free";

const ratioClass: Record<Ratio, string> = {
  box: "aspect-box",
  flavor: "aspect-flavor",
  free: "",
};

interface PhotoProps {
  image: ImageAsset;
  /** Proporción fija: la maquetación no se mueve mientras carga la foto */
  ratio: Ratio;
  /** Color de fondo mientras carga la foto (el del sabor o el de la sección) */
  bg: string;
  sizes: string;
  fetchPriority?: "high" | "low" | "auto";
  /** Imagen decorativa (p. ej. la segunda foto del hover): sin texto alternativo para lectores de pantalla */
  decorative?: boolean;
  /** Solo tamaño y márgenes. La raíz ya es `relative`: para posicionarla, envolverla en un contenedor. */
  className?: string;
  children?: React.ReactNode;
}

/* Foto con proporción fija, servida con next/image desde /public/images (data/imagenes.ts). */
export function Photo({
  image,
  ratio,
  bg,
  sizes,
  fetchPriority,
  decorative = false,
  className = "",
  children,
}: PhotoProps) {
  return (
    <div className={`relative overflow-hidden ${ratioClass[ratio]} ${bg} ${className}`}>
      <Image
        src={image.src}
        alt={decorative ? "" : image.alt}
        fill
        sizes={sizes}
        fetchPriority={fetchPriority}
        loading={fetchPriority === "high" ? "eager" : "lazy"}
        className="object-cover"
      />
      {children}
    </div>
  );
}
