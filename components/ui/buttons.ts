/*
 * Variantes de botón (notas §4). Todas en MAYÚSCULAS, DM Sans 700, tracking 0.12em.
 * Hover [PROPUESTO] solo con puntero fino (hoverOnlyWhenSupported en tailwind.config).
 */
const base =
  "inline-flex items-center justify-center font-sans font-bold uppercase tracking-button transition-colors duration-fast";

const buy = `${base} bg-mg-red px-4.5 text-mg-button text-mg-on-dark hover:bg-mg-red-hover disabled:bg-mg-ink-3 disabled:cursor-not-allowed`;

/** Compra (rojo): AÑADIR AL CARRITO, UNIRME. Alto 52. Deshabilitado: fondo #5C5C5C. */
export const buyButton = `${buy} h-btn-lg`;

/** Compra en la barra fija: alto 48. */
export const buyButtonCompact = `${buy} h-btn-md`;

/** Primario negro: PEDIR EN LA WEB. Ícono 20 a la izquierda y flecha 16 a la derecha. */
export const primaryButton = `${base} h-btn-lg gap-4 bg-mg-black px-4.5 text-mg-button text-mg-on-dark hover:bg-mg-black-hover`;

/** Secundario con borde: PEDIR POR WHATSAPP, RAPPI, PEDIDOSYA. */
export const secondaryButton = `${base} h-btn-lg gap-4 border border-mg-border bg-mg-white px-4.5 text-mg-button text-mg-ink hover:bg-mg-black hover:text-mg-on-dark`;

/** Hero: negro con borde blanco 1.5, texto 13/500/0.1em. */
export const heroButton =
  "inline-flex h-btn-md min-w-hero-btn-min items-center justify-center border-hero border-mg-white bg-mg-black px-7 font-sans text-mg-button font-medium uppercase tracking-option text-mg-on-dark transition-colors duration-fast hover:bg-mg-white hover:text-mg-ink";

/** Enlace de texto: VER TODO, CONOCE LA HISTORIA →. Alto 44, subrayado con offset 5. */
export const textLink =
  "inline-flex h-touch items-center gap-2.5 text-mg-button-sm font-bold uppercase tracking-label transition-colors duration-fast hover:text-mg-red";
