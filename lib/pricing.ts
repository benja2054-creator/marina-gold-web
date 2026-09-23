/*
 * Cálculos de precio. Todo en céntimos.
 * Reglas (notas §5, "Lógica de precios", y referencias/decisiones.md punto C):
 * - Precio con oferta = precio normal − porcentaje, redondeado al céntimo.
 * - Precio por bombón = precio / unidades, redondeado al céntimo.
 * - "Desde" = precio de la caja más chica.
 * - Ahorro de la caja de 12 = 2 × precio de la de 6 − precio de la de 12,
 *   siempre con los precios que realmente se cobran.
 */

export function applyDiscount(cents: number, percent?: number): number {
  if (!percent) return cents;
  return Math.round((cents * (100 - percent)) / 100);
}

export function pricePerUnit(cents: number, units: number): number {
  return Math.round(cents / units);
}

export function bulkSavings(price6: number, price12: number): number {
  return Math.max(0, price6 * 2 - price12);
}

const NBSP = " ";

/** "S/ 45.00" con espacio no separable (notas §2, Moneda) */
export function formatPrice(cents: number): string {
  return `S/${NBSP}${(cents / 100).toFixed(2)}`;
}

/** "S/ 5" si es un monto exacto, "S/ 4.50" si no (decisiones.md punto C) */
export function formatSavings(cents: number): string {
  const soles = cents / 100;
  return `S/${NBSP}${Number.isInteger(soles) ? soles.toFixed(0) : soles.toFixed(2)}`;
}
