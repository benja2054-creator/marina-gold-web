import type { FlavorColor } from "@/data/catalog";

/*
 * Clases de color por sabor. Escritas completas para que Tailwind las detecte.
 * Pastel: franjas, tarjetas, puntos, filas. "Deep": solo detrás de fotos (notas §3).
 */
export const flavorBg: Record<FlavorColor, string> = {
  manjar: "bg-mg-manjar",
  maracuya: "bg-mg-maracuya",
  fresa: "bg-mg-fresa",
};

export const flavorDeepBg: Record<FlavorColor, string> = {
  manjar: "bg-mg-manjar-deep",
  maracuya: "bg-mg-maracuya-deep",
  fresa: "bg-mg-fresa-deep",
};

/** Fondo de una caja: su color, o las tres franjas si es la Surtida */
export function boxBg(colors: FlavorColor[]): string {
  return colors.length > 1 ? "bg-surtida" : flavorBg[colors[0]];
}
