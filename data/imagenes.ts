/*
 * MANIFIESTO DE IMÁGENES — única fuente de verdad
 * ------------------------------------------------------------------
 * Lo leen el sitio (lib/images.ts) y el script scripts/optimizar-imagenes.mjs.
 *
 * - n:        número en el documento "Marina Gold · Imágenes requeridas para la tienda" (v1).
 * - original: nombre definitivo del archivo aprobado. El script lo busca en cualquiera de las
 *             entregas de referencias/fotos-originales/ (no se modifica ni se sirve).
 * - output:   versión optimizada que genera el script, dentro de public/images/.
 * - width/height: tamaño "Generar a" del documento.
 * - maxKB:    peso objetivo (200 KB; 350 KB el hero).
 * - alt:      texto alternativo en español.
 *
 * Para cambiar o agregar una foto: descomprimir la entrega en referencias/fotos-originales/ y correr
 * `npm run imagenes`. Si falta la versión optimizada de alguna imagen, la compilación falla con un
 * mensaje que indica cuál (ya no hay placeholders: las 22 fotos del documento están aprobadas).
 *
 * Solo sintaxis que Node puede ejecutar sin compilar (el script lo importa directamente).
 */

export interface ImageSpec {
  n: number;
  original: string;
  output: string;
  width: number;
  height: number;
  maxKB: number;
  format?: "webp" | "jpg";
  /** Calidad inicial (por defecto 80, la del documento; 85 la vista previa al compartir) */
  quality?: number;
  /** El script compone el logo MARINA GOLD en la mitad izquierda (vista previa al compartir) */
  logo?: "izquierda";
  alt: string;
}

// Tamaños "Generar a" del documento de imágenes
const SABOR = { width: 1200, height: 1200, maxKB: 200 };
const TARJETA = { width: 1000, height: 1250, maxKB: 200 };
const GALERIA = { width: 1600, height: 2000, maxKB: 200 };
const OCASION = { width: 800, height: 1000, maxKB: 200 };

/* Galería de 5 fotos de una caja, con la misma lógica que la de la Surtida (n.º 10 a 14) */
function galeria<P extends string>(prefix: P, carpeta: string, nombreCaja: string, bombones: string, relleno: string, n: number) {
  const descripciones = [
    `${nombreCaja} abierta vista desde arriba: bandeja con 6 ${bombones} en pirotines y la faja al lado`,
    `${nombreCaja} cerrada, vista en tres cuartos`,
    `Tres ${bombones} partidos, con las mitades lado a lado mostrando el relleno de ${relleno}`,
    `Mano de Marina sosteniendo un bombón de ${relleno} mordido, para mostrar su tamaño`,
    `${nombreCaja} lista para regalo, con cinta roja`,
  ];
  return Object.fromEntries(
    descripciones.map((alt, i) => [
      `${prefix}-galeria-${i + 1}`,
      { n, original: `${prefix}-galeria-${i + 1}.jpg`, output: `${carpeta}/${prefix}-galeria-${i + 1}.webp`, ...GALERIA, alt },
    ]),
  ) as Record<`${P}-galeria-${1 | 2 | 3 | 4 | 5}`, ImageSpec>;
}

export const IMAGES = {
  /* ---------- Home ---------- */
  "home-hero": {
    n: 1,
    original: "home-hero.jpg",
    output: "home/home-hero.webp",
    width: 1600,
    height: 2000,
    maxKB: 350,
    alt: "Marina, con delantal negro, apoyada en un mesón de mármol negro junto a la caja Surtida abierta",
  },
  "home-hero-desktop": {
    n: 21,
    original: "home-hero-desktop.jpg",
    output: "home/home-hero-desktop.webp",
    width: 2560,
    height: 1440,
    maxKB: 350,
    alt: "Marina probando un bombón junto a la caja Surtida abierta, sobre un mesón de mármol negro",
  },
  "sabor-manjar": {
    n: 2,
    original: "sabor-manjar.jpg",
    output: "sabores/sabor-manjar.webp",
    ...SABOR,
    alt: "Bombón de manjar de olla en chocolate negro partido en dos, con el manjar escurriendo entre las mitades",
  },
  "sabor-maracuya": {
    n: 3,
    original: "sabor-maracuya.jpg",
    output: "sabores/sabor-maracuya.webp",
    ...SABOR,
    alt: "Bombón de maracuyá en chocolate de leche con puntos dorados, partido en dos y con el relleno amarillo escurriendo",
  },
  "sabor-fresa": {
    n: 4,
    original: "sabor-fresa.jpg",
    output: "sabores/sabor-fresa.webp",
    ...SABOR,
    alt: "Bombón de chocolate blanco partido en dos, con el coulis de fresa rojo escurriendo",
  },
  "caja-surtida": {
    n: 5,
    original: "caja-surtida.jpg",
    output: "cajas/caja-surtida.webp",
    ...TARJETA,
    alt: "Caja Surtida de Marina Gold cerrada, con la faja en los colores de los tres sabores",
  },
  "caja-manjar": {
    n: 6,
    original: "caja-manjar.jpg",
    output: "cajas/caja-manjar.webp",
    ...TARJETA,
    alt: "Caja Manjar de olla de Marina Gold cerrada, con su faja naranja",
  },
  "caja-maracuya": {
    n: 7,
    original: "caja-maracuya.jpg",
    output: "cajas/caja-maracuya.webp",
    ...TARJETA,
    alt: "Caja Maracuyá de Marina Gold cerrada, con su faja amarilla",
  },
  "caja-coulis-fresa": {
    n: 8,
    original: "caja-coulis-fresa.jpg",
    output: "cajas/caja-coulis-fresa.webp",
    ...TARJETA,
    alt: "Caja Coulis de fresa de Marina Gold cerrada, con su faja rosada",
  },
  marina: {
    n: 9,
    original: "marina.jpg",
    output: "home/marina.webp",
    width: 1200,
    height: 1500,
    maxKB: 200,
    alt: "Marina, con delantal negro, prueba un bombón mientras sostiene la bandeja de la caja Surtida con sus 12 bombones",
  },

  /* ---------- Fotos de hover de las tarjetas (n.º 19) ---------- */
  "caja-surtida-abierta": { n: 19, original: "caja-surtida-abierta.jpg", output: "cajas/caja-surtida-abierta.webp", ...TARJETA, alt: "Caja Surtida abierta, con la bandeja de 12 bombones junto a su faja" },
  "caja-manjar-abierta": { n: 19, original: "caja-manjar-abierta.jpg", output: "cajas/caja-manjar-abierta.webp", ...TARJETA, alt: "Caja Manjar de olla abierta, con seis bombones de chocolate negro junto a su faja" },
  "caja-maracuya-abierta": { n: 19, original: "caja-maracuya-abierta.jpg", output: "cajas/caja-maracuya-abierta.webp", ...TARJETA, alt: "Caja Maracuyá abierta, con seis bombones de chocolate de leche junto a su faja" },
  "caja-coulis-fresa-abierta": { n: 19, original: "caja-coulis-fresa-abierta.jpg", output: "cajas/caja-coulis-fresa-abierta.webp", ...TARJETA, alt: "Caja Coulis de fresa abierta, con seis bombones de chocolate blanco junto a su faja" },

  /* ---------- Galería de la ficha Surtida (n.º 10 a 14) ---------- */
  "surtida-galeria-1": {
    n: 10,
    original: "surtida-galeria-1.jpg",
    output: "galeria-surtida/surtida-galeria-1.webp",
    ...GALERIA,
    alt: "Caja Surtida vista desde arriba: la faja y la bandeja negra abierta con los 12 bombones, cuatro de cada sabor",
  },
  "surtida-galeria-2": {
    n: 11,
    original: "surtida-galeria-2.jpg",
    output: "galeria-surtida/surtida-galeria-2.webp",
    ...GALERIA,
    alt: "Caja Surtida cerrada, vista en tres cuartos",
  },
  "surtida-galeria-3": {
    n: 12,
    original: "surtida-galeria-3.jpg",
    output: "galeria-surtida/surtida-galeria-3.webp",
    ...GALERIA,
    alt: "Los tres bombones partidos, cada uno sobre su color: manjar de olla, maracuyá y coulis de fresa",
  },
  "surtida-galeria-4": {
    n: 13,
    original: "surtida-galeria-4.jpg",
    output: "galeria-surtida/surtida-galeria-4.webp",
    ...GALERIA,
    alt: "Mano de Marina sosteniendo entre los dedos un bombón de manjar de olla, para mostrar su tamaño",
  },
  "surtida-galeria-5": {
    n: 14,
    original: "surtida-galeria-5.jpg",
    output: "galeria-surtida/surtida-galeria-5.webp",
    ...GALERIA,
    alt: "Caja Surtida lista para regalo, con cinta roja",
  },

  /* ---------- Galerías de las otras cajas (n.º 20) ---------- */
  ...galeria("manjar", "galeria-manjar", "Caja Manjar de olla", "bombones de chocolate negro", "manjar de olla", 20),
  ...galeria("maracuya", "galeria-maracuya", "Caja Maracuyá", "bombones de chocolate de leche", "maracuyá", 20),
  ...galeria("coulis-fresa", "galeria-coulis-fresa", "Caja Coulis de fresa", "bombones de chocolate blanco", "coulis de fresa", 20),

  /* ---------- Ocasiones (n.º 15 a 18) ---------- */
  "ocasion-regalo": {
    n: 15,
    original: "ocasion-regalo.jpg",
    output: "ocasiones/ocasion-regalo.webp",
    ...OCASION,
    alt: "Caja Surtida con cinta roja y una tarjeta escrita a mano sobre una mesa de madera",
  },
  "ocasion-cumpleanos": {
    n: 16,
    original: "ocasion-cumpleanos.jpg",
    output: "ocasiones/ocasion-cumpleanos.webp",
    ...OCASION,
    alt: "Caja de bombones abierta junto a la caja Surtida, con luces cálidas y confeti de celebración",
  },
  "ocasion-aniversario": {
    n: 17,
    original: "ocasion-aniversario.jpg",
    output: "ocasiones/ocasion-aniversario.webp",
    ...OCASION,
    alt: "Dos manos compartiendo un bombón de coulis de fresa junto a velas y copas de vino",
  },
  "ocasion-antojo": {
    n: 18,
    original: "ocasion-antojo.jpg",
    output: "ocasiones/ocasion-antojo.webp",
    ...OCASION,
    alt: "Caja Manjar de olla abierta sobre una mesa de noche, a la luz de una lámpara, con dos pirotines vacíos y un bombón mordido",
  },

  /* ---------- Vista previa al compartir (n.º 22): og:image y twitter:image ---------- */
  "og-compartir": {
    n: 22,
    original: "og-compartir.jpg",
    output: "og/og-compartir.jpg",
    width: 1200,
    height: 630,
    maxKB: 300,
    // JPG: varias redes no leen WebP en og:image
    format: "jpg",
    quality: 85,
    logo: "izquierda",
    alt: "Logo de Marina Gold junto a la caja Surtida abierta, con sus 12 bombones de manjar de olla, maracuyá y coulis de fresa",
  },
} satisfies Record<string, ImageSpec>;

export type ImageKey = keyof typeof IMAGES;

/*
 * El hero es un solo <img> con dos fotos (<picture>): su texto alternativo tiene que valer para
 * la de celular (n.º 1) y la de escritorio (n.º 21), así que describe lo que tienen en común.
 */
export const HERO_ALT = "Marina, con delantal negro, junto a la caja Surtida abierta sobre un mesón de mármol negro";
