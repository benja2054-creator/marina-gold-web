/*
 * Variantes de botón (notas §4). Todas en MAYÚSCULAS, DM Sans 700, tracking 0.12em.
 * Hover [PROPUESTO] solo con puntero fino (hoverOnlyWhenSupported en tailwind.config).
 *
 * Importante: Tailwind resuelve dos clases de la misma propiedad por el orden del CSS, no por
 * el orden en el atributo class. Por eso cada variante NO trae alto, justify ni gap cuando
 * cambian según el uso: se agregan en el componente y nunca hay dos valores en conflicto.
 */
const base = "inline-flex items-center font-sans font-bold uppercase tracking-button transition-colors duration-fast";

const buy = `${base} justify-center bg-mg-red px-4.5 text-mg-button text-mg-on-dark hover:bg-mg-red-hover disabled:cursor-not-allowed disabled:bg-mg-ink-3`;

/** Compra (rojo): AÑADIR AL CARRITO. Alto 52. Deshabilitado: fondo #5C5C5C. */
export const buyButton = `${buy} h-btn-lg`;

/** Compra en la barra fija: alto 48. */
export const buyButtonCompact = `${buy} h-btn-md`;

/** Compra pegado dentro de un campo (UNIRME): toma el alto del campo. */
export const buyButtonFill = `${buy} self-stretch`;

/** Primario negro: PEDIR EN LA WEB. Agregar justify-* y gap-* en el uso. */
export const primaryButton = `${base} h-btn-lg bg-mg-black px-4.5 text-mg-button text-mg-on-dark hover:bg-mg-black-hover`;

/** Secundario con borde: PEDIR POR WHATSAPP, RAPPI, PEDIDOSYA. Agregar justify-* y gap-* en el uso. */
export const secondaryButton = `${base} h-btn-lg border border-mg-border bg-mg-white px-4.5 text-mg-button text-mg-ink hover:bg-mg-black hover:text-mg-on-dark`;

/** Hero: negro con borde blanco 1.5, texto 13/500/0.1em. */
export const heroButton =
  "inline-flex h-btn-md min-w-hero-btn-min items-center justify-center border-hero border-mg-white bg-mg-black px-7 font-sans text-mg-button font-medium uppercase tracking-option text-mg-on-dark transition-colors duration-fast hover:bg-mg-white hover:text-mg-ink";

/** Enlace de texto: VER TODO, CONOCE LA HISTORIA →. Alto 44, subrayado con offset 5. */
export const textLink =
  "inline-flex h-touch items-center gap-2.5 text-mg-button-sm font-bold uppercase tracking-label transition-colors duration-fast hover:text-mg-red";
