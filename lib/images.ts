import fs from "node:fs";
import path from "node:path";

/*
 * Imágenes locales en /public. Si el archivo aún no existe, los componentes
 * muestran un placeholder con la proporción correcta y el nombre esperado.
 * En desarrollo basta con soltar el archivo y recargar la página.
 * Solo se usa en el servidor (lee el disco).
 */

export interface ImageAsset {
  src: string;
  alt: string;
  /** Qué debe mostrar la foto (para generarla) */
  brief: string;
  /** Nombre del archivo esperado, relativo a /public/images */
  filename: string;
  exists: boolean;
}

export function imageAsset(src: string, alt: string, brief: string): ImageAsset {
  const exists = fs.existsSync(path.join(process.cwd(), "public", src));
  return { src, alt, brief, filename: src.replace(/^\/images\//, ""), exists };
}
