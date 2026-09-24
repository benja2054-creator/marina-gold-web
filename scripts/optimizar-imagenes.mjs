/*
 * Genera las imágenes optimizadas de public/images a partir de los originales aprobados.
 * Uso (desde la raíz del proyecto):  npm run imagenes
 *
 * - Lee la lista de data/imagenes.ts (la misma que usa el sitio).
 * - Busca cada original por su nombre en todas las entregas de referencias/fotos-originales/
 *   (marina-gold-imagenes-aprobadas/, marina-gold-imagenes-aprobadas-parte-2/, …). Las subcarpetas
 *   packaging/ se ignoran (son referencia de diseño). Los originales NO se modifican.
 * - Redimensiona al tamaño "Generar a" del documento de imágenes. Si la proporción no calza exacto
 *   (las 4:5 llegan a 1856 × 2304), recorta lo mínimo, centrado, y lo informa.
 * - Exporta WebP (JPG para la vista previa al compartir) en sRGB, sin metadatos, apuntando a maxKB:
 *   empieza en calidad 80 (la del documento) y baja en pasos de 4 hasta 72 si hace falta.
 *   Si ni así llega al peso, deja la calidad 80 y lo avisa (se prioriza la calidad).
 * - Los originales que aún no existen se listan como pendientes: el sitio muestra su placeholder.
 * - Borra las versiones optimizadas cuyo original ya no está, para no servir fotos viejas.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { IMAGES } from "../data/imagenes.ts";

const ROOT = path.resolve(import.meta.dirname, "..");
const ORIGINALES = path.join(ROOT, "referencias/fotos-originales");
const DESTINO = path.join(ROOT, "public/images");
const CALIDAD_INICIAL = 80;
const CALIDAD_MINIMA = 72;

async function encode(pipeline, format, quality) {
  const out = pipeline.clone();
  return format === "jpg"
    ? out.jpeg({ quality, mozjpeg: true }).toBuffer()
    : out.webp({ quality, effort: 6, smartSubsample: true }).toBuffer();
}

/* Índice nombre → ruta de todos los originales de todas las entregas */
function indexarOriginales(dir, indice = new Map()) {
  for (const entrada of fs.readdirSync(dir, { withFileTypes: true })) {
    const ruta = path.join(dir, entrada.name);
    if (entrada.isDirectory()) {
      if (entrada.name !== "packaging") indexarOriginales(ruta, indice);
    } else if (/\.(jpe?g|png)$/i.test(entrada.name)) {
      if (indice.has(entrada.name)) {
        throw new Error(`Original repetido en dos entregas: ${entrada.name}
  ${indice.get(entrada.name)}
  ${ruta}`);
      }
      indice.set(entrada.name, ruta);
    }
  }
  return indice;
}
const originales = indexarOriginales(ORIGINALES);

const generadas = [];
const pendientes = [];
const avisos = [];

for (const spec of Object.values(IMAGES)) {
  const origen = originales.get(spec.original);
  const salida = path.join(DESTINO, spec.output);

  if (!origen) {
    pendientes.push(`n.º ${spec.n} · ${spec.original}`);
    if (fs.existsSync(salida)) {
      fs.rmSync(salida);
      avisos.push(`${spec.output}: se borró porque su original ya no existe`);
    }
    continue;
  }

  const meta = await sharp(origen).metadata();
  // Recorte que hará fit "cover" para llegar a la proporción exacta
  const escala = Math.max(spec.width / meta.width, spec.height / meta.height);
  const recorteX = Math.round(meta.width - spec.width / escala);
  const recorteY = Math.round(meta.height - spec.height / escala);
  const recorte = recorteX > 1 ? `${recorteX} px de ancho` : recorteY > 1 ? `${recorteY} px de alto` : "no";

  const pipeline = sharp(origen)
    .rotate()
    .resize(spec.width, spec.height, { fit: "cover", position: "centre" })
    .toColourspace("srgb");

  const format = spec.format ?? "webp";
  let quality = CALIDAD_INICIAL;
  let buffer = await encode(pipeline, format, quality);
  while (buffer.length > spec.maxKB * 1024 && quality - 4 >= CALIDAD_MINIMA) {
    quality -= 4;
    buffer = await encode(pipeline, format, quality);
  }
  if (buffer.length > spec.maxKB * 1024) {
    quality = CALIDAD_INICIAL;
    buffer = await encode(pipeline, format, quality);
    avisos.push(`${spec.output}: ${Math.round(buffer.length / 1024)} KB, sobre el objetivo de ${spec.maxKB} KB (se mantuvo calidad ${quality})`);
  }

  fs.mkdirSync(path.dirname(salida), { recursive: true });
  fs.writeFileSync(salida, buffer);
  generadas.push({
    "n.º": spec.n,
    original: `${path.basename(path.dirname(origen))}/${spec.original}`,
    salida: `public/images/${spec.output}`,
    tamaño: `${spec.width}×${spec.height}`,
    KB: Math.round(buffer.length / 1024),
    calidad: quality,
    recorte,
  });
}

console.log("\nGeneradas:");
console.table(generadas);
console.log(`\nPendientes (${pendientes.length}, se muestran como placeholder):`);
for (const p of pendientes) console.log(`  - ${p}`);
if (avisos.length) {
  console.log("\nAvisos:");
  for (const a of avisos) console.log(`  ! ${a}`);
}
