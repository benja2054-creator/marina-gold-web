import fs from "node:fs";
import path from "node:path";
import { IMAGES, type ImageKey } from "@/data/imagenes";

/*
 * Imágenes del sitio: se resuelven desde el manifiesto data/imagenes.ts.
 * Si la versión optimizada aún no está en /public/images (foto pendiente), los componentes
 * muestran un placeholder con la proporción correcta y el nombre del original que falta.
 * Solo se usa en el servidor (lee el disco).
 */

export type { ImageKey };

export interface ImageAsset {
  /** Ruta pública, con el basePath de GitHub Pages si corresponde */
  src: string;
  alt: string;
  /** Nombre del archivo original esperado (se muestra en el placeholder) */
  filename: string;
  width: number;
  height: number;
  exists: boolean;
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function image(key: ImageKey): ImageAsset {
  const spec = IMAGES[key];
  const src = `/images/${spec.output}`;
  return {
    src: `${BASE_PATH}${src}`,
    alt: spec.alt,
    filename: spec.original,
    width: spec.width,
    height: spec.height,
    exists: fs.existsSync(path.join(process.cwd(), "public", src)),
  };
}

/** La primera imagen disponible de la lista; si no hay ninguna, el placeholder de la primera */
export function firstAvailable(keys: ImageKey[]): ImageAsset {
  const assets = keys.map(image);
  return assets.find((a) => a.exists) ?? assets[0];
}
