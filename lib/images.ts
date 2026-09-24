import fs from "node:fs";
import path from "node:path";
import { IMAGES, type ImageKey } from "@/data/imagenes";

/*
 * Imágenes del sitio: se resuelven desde el manifiesto data/imagenes.ts.
 * Todas las fotos del documento están aprobadas, así que no hay placeholders: si falta la versión
 * optimizada de alguna, la compilación falla con un mensaje claro (correr `npm run imagenes`).
 * Solo se usa en el servidor (lee el disco).
 */

export type { ImageKey };

export interface ImageAsset {
  /** Ruta pública, con el basePath de GitHub Pages si corresponde */
  src: string;
  alt: string;
  width: number;
  height: number;
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function image(key: ImageKey): ImageAsset {
  const spec = IMAGES[key];
  const src = `/images/${spec.output}`;
  if (!fs.existsSync(path.join(process.cwd(), "public", src))) {
    throw new Error(
      `Falta public${src} (n.º ${spec.n}, original ${spec.original}). Corre "npm run imagenes" para generarla.`,
    );
  }
  return { src: `${BASE_PATH}${src}`, alt: spec.alt, width: spec.width, height: spec.height };
}
