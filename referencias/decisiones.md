# Decisiones aprobadas durante la construcción

Registro de contradicciones y huecos del diseño, y cómo se resolvieron. Aprobado por el cliente el 2026-09-22 (etapa 0.5).

## Contradicciones resueltas

| # | Tema | Contradicción | Decisión |
|---|---|---|---|
| A | Newsletter en escritorio | Notas §6 piden un "newsletter compacto" en el footer de 4 columnas, pero la sección newsletter ya está justo encima. | No se pone newsletter en el footer. El footer de escritorio queda en 3 columnas (legales, redes, pagos) + logo gigante. |
| B | Caja agotada | "Toda la tarjeta es un enlace a la ficha" vs. "la tarjeta agotada no enlaza a compra". | La tarjeta agotada no es enlace; solo tiene el botón AVÍSAME. La ficha sigue existiendo (menú o URL) con ambos tamaños rayados y el botón de compra gris deshabilitado. |
| C | Ahorro con oferta | "AHORRA S/ 5" asume precios normales; con 10% en Manjar la caja de 12 ahorra S/ 4.50. | El ahorro se calcula siempre con el precio real cobrado. Sin decimales si es exacto ("S/ 5"), con dos si no ("S/ 4.50"). |
| D | Logos de pago | Yape y Plin no tienen SVG oficial disponible. | Visa (wordmark vigente) y Mastercard (símbolo vigente de dos círculos) dibujados en SVG. Yape y Plin: ficha provisional con su color, marcada TODO hasta recibir los SVG oficiales del kit de marca. |

## Diferencias menores (resueltas por prioridad notas > láminas)

- Texto de desplegables: 14.5 px (notas), no 15 px (guía).
- Fondo de foto en tarjetas de caja: color pastel del sabor (como la lámina). El tono "deep" solo se usa en franjas de sabor y en "¿Qué hay dentro?".

## Decisiones de proyecto

- Tailwind CSS 3.4, porque se pidió `tailwind.config` (Tailwind 4 ya no lo usa por defecto).
- La navegación de escritorio (Sabores, Nuestra historia, Cómo pedir) enlaza a secciones de la home.
- Los enlaces de WhatsApp, Rappi y PedidosYa quedan como `#` con TODO.
- Hero en tablet (no definido en las notas): desde 768 px se usa la foto 16:9 con alto `min(56.25vw, 720px)`; en 4:5 ocuparía 940 px de alto.
- "Hecho por Marina" pasa a dos columnas desde 768 px (las notas solo lo piden en escritorio) por la misma razón.
- Tamaños medidos en la lámina donde las notas no dicen nada: subtítulo del newsletter a 14 px y línea de distritos a 13 px. El título del newsletter queda en 30 px (las notas piden normalizar los H2 a 30, aunque en la lámina mida 28).
- Los tramos de la guía de estilo miden 2400 × 1800 px porque la lámina mide 2400 px de ancho.
