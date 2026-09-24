/*
 * Genera las imágenes optimizadas de public/images a partir de los originales aprobados.
 * Uso (desde la raíz del proyecto):  npm run imagenes
 *
 * - Lee la lista de data/imagenes.ts (la misma que usa el sitio).
 * - Busca cada original por su nombre en todas las entregas de referencias/fotos-originales/
 *   (marina-gold-imagenes-aprobadas/, …-parte-2/, …-parte-3/). Las subcarpetas packaging/ se
 *   ignoran (son referencia de diseño). Los originales NO se modifican.
 * - Redimensiona al tamaño "Generar a" del documento de imágenes. Si la proporción no calza exacto
 *   (las 4:5 llegan a 1856 × 2304), recorta lo mínimo, centrado, y lo informa.
 * - Exporta WebP (JPG para la vista previa al compartir) en sRGB, sin metadatos, apuntando a maxKB:
 *   empieza en la calidad del manifiesto (80 por defecto) y baja en pasos de 4 hasta 72 si hace falta.
 *   Si ni así llega al peso, deja la calidad inicial y lo avisa (se prioriza la calidad).
 * - En la vista previa al compartir (logo: "izquierda") compone el logo MARINA GOLD en dos líneas,
 *   con los trazos de Playfair Display 800 (la serif del sitio) en #111111 (--mg-black), centrado en
 *   la mitad izquierda, que la foto deja vacía.
 * - Si falta algún original lo informa: el sitio no compila sin todas sus imágenes.
 * - Borra las versiones optimizadas cuyo original ya no está, para no servir fotos viejas.
 */
import fs from "node:fs";
import path from "node:path";
import opentype from "opentype.js";
import sharp from "sharp";
import { IMAGES } from "../data/imagenes.ts";

const ROOT = path.resolve(import.meta.dirname, "..");
const ORIGINALES = path.join(ROOT, "referencias/fotos-originales");
const DESTINO = path.join(ROOT, "public/images");
const CALIDAD_INICIAL = 80;
const CALIDAD_MINIMA = 72;

/* Logo de la vista previa al compartir */
const LOGO = {
  lineas: ["MARINA", "GOLD"],
  fuente: path.join(ROOT, "node_modules/@fontsource/playfair-display/files/playfair-display-latin-800-normal.woff"),
  color: "#111111", // --mg-black
  tracking: 0.01, // em, como el logo del footer
  interlineado: 0.88, // como el logo del footer
  // La esquina de la bandeja está cerca de x = 483 px: con 320 px de ancho máximo el logo queda
  // centrado en la mitad izquierda (x = 300) con más de 20 px de aire hasta la bandeja.
  anchoMaximo: 320,
};

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
        throw new Error(`Original repetido en dos entregas: ${entrada.name}\n  ${indice.get(entrada.name)}\n  ${ruta}`);
      }
      indice.set(entrada.name, ruta);
    }
  }
  return indice;
}

/* SVG con el logo en trazos (no depende de fuentes instaladas en el sistema) */
function svgLogo(ancho, alto) {
  const archivo = fs.readFileSync(LOGO.fuente);
  const fuente = opentype.parse(archivo.buffer.slice(archivo.byteOffset, archivo.byteOffset + archivo.byteLength));
  const opciones = { letterSpacing: LOGO.tracking };
  // Tamaño para que la línea más larga mida anchoMaximo
  const masLarga = Math.max(...LOGO.lineas.map((l) => fuente.getAdvanceWidth(l, 100, opciones)));
  const size = (LOGO.anchoMaximo / masLarga) * 100;
  const centroX = ancho / 4; // centro de la mitad izquierda
  const trazos = LOGO.lineas.map((linea, i) => {
    const w = fuente.getAdvanceWidth(linea, size, opciones);
    return fuente.getPath(linea, centroX - w / 2, i * size * LOGO.interlineado, size, opciones);
  });
  // Centrado vertical según la caja real de las letras
  const cajas = trazos.map((t) => t.getBoundingBox());
  const x1 = Math.min(...cajas.map((c) => c.x1));
  const x2 = Math.max(...cajas.map((c) => c.x2));
  const y1 = Math.min(...cajas.map((c) => c.y1));
  const y2 = Math.max(...cajas.map((c) => c.y2));
  const dy = alto / 2 - (y1 + y2) / 2;
  const d = trazos.map((t) => t.toPathData(2)).join(" ");
  return {
    svg: Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${ancho}" height="${alto}">` +
        `<path transform="translate(0 ${dy.toFixed(2)})" d="${d}" fill="${LOGO.color}"/></svg>`,
    ),
    nota: `logo ${Math.round(size)} px · x ${Math.round(x1)}–${Math.round(x2)} · y ${Math.round(y1 + dy)}–${Math.round(y2 + dy)}`,
  };
}

const originales = indexarOriginales(ORIGINALES);
const generadas = [];
const faltan = [];
const avisos = [];

for (const spec of Object.values(IMAGES)) {
  const origen = originales.get(spec.original);
  const salida = path.join(DESTINO, spec.output);

  if (!origen) {
    faltan.push(`n.º ${spec.n} · ${spec.original}`);
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

  let pipeline = sharp(origen)
    .rotate()
    .resize(spec.width, spec.height, { fit: "cover", position: "centre" })
    .toColourspace("srgb");

  let nota = "";
  if (spec.logo === "izquierda") {
    // El logo se compone sobre la imagen ya recortada a su tamaño final
    const base = await pipeline.png().toBuffer();
    const logo = svgLogo(spec.width, spec.height);
    pipeline = sharp(base).composite([{ input: logo.svg, left: 0, top: 0 }]).toColourspace("srgb");
    nota = logo.nota;
  }

  const format = spec.format ?? "webp";
  const calidadInicial = spec.quality ?? CALIDAD_INICIAL;
  let quality = calidadInicial;
  let buffer = await encode(pipeline, format, quality);
  while (buffer.length > spec.maxKB * 1024 && quality - 4 >= CALIDAD_MINIMA) {
    quality -= 4;
    buffer = await encode(pipeline, format, quality);
  }
  if (buffer.length > spec.maxKB * 1024) {
    quality = calidadInicial;
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
    ...(nota ? { nota } : {}),
  });
}

console.log("\nGeneradas:");
console.table(generadas);
if (faltan.length) {
  console.log(`\nFaltan originales (${faltan.length}). El sitio no compila hasta que existan sus versiones optimizadas:`);
  for (const f of faltan) console.log(`  - ${f}`);
} else {
  console.log("\nNo falta ningún original.");
}
if (avisos.length) {
  console.log("\nAvisos:");
  for (const a of avisos) console.log(`  ! ${a}`);
}
