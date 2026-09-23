import type { FlavorColor } from "@/data/catalog";
import { flavorBg } from "@/lib/flavor-styles";

/* Punto de color de 10 px con borde negro de 1 px (pestañas y menú lateral, notas §3) */
export function FlavorDot({ color }: { color: FlavorColor }) {
  return <span aria-hidden="true" className={`inline-block h-dot w-dot shrink-0 rounded-pill border border-mg-black ${flavorBg[color]}`} />;
}
