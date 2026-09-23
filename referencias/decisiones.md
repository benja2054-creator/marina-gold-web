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
- Ficha en escritorio: miniaturas verticales de 72 px de ancho. Destacados y desplegables van en la columna de compra, que queda pegajosa.
- Ficha agotada (Coulis): tamaños rayados, botón gris "AGOTADA", "Vuelve el viernes" y botón AVÍSAME debajo.
- AÑADIR AL CARRITO no agrega nada (maqueta): muestra "Maqueta: el carrito aún no está conectado." El contador del header es fijo (2), como en las láminas.
- Las ocasiones enlazan a /collections/todas; FAQ del menú lateral enlaza a /products/surtida#preguntas.
- Página 404 con título "Esta página no existe. *Alguien se la comió.*" (texto de ejemplo).
- Los tramos de la guía de estilo miden 2400 × 1800 px porque la lámina mide 2400 px de ancho.

## Integración de las fotos aprobadas (2026-09-23)

- Fuente de verdad: `referencias/fotos-originales/marina-gold-imagenes-aprobadas/LEEME-imagenes.md` y `referencias/imagenes-requeridas.pdf`. Los originales no se modifican ni se sirven.
- Los nombres del zip son los definitivos: el código apunta a ellos a través de `data/imagenes.ts` (manifiesto que usan el sitio y `npm run imagenes`).
- Recorte: las fotos 4:5 llegan a 1856 × 2304 (0,806, no 0,8 exacto). Se recortan 13 px de ancho (0,7 %), centrado, para quedar en 4:5 exacto. No afecta al producto. Las 1:1 no se recortan.
- Formato: WebP calidad 80, sRGB, sin metadatos. Todas quedan bajo 200 KB sin bajar la calidad. En local/Vercel, next/image además genera tamaños por dispositivo; en GitHub Pages se sirven estos WebP directamente.
- Hover de las tarjetas (n.º 19 pendiente): el cambio de foto solo se activa cuando existe la foto `caja-*-abierta`.
- Fichas de Manjar, Maracuyá y Coulis (n.º 20 pendiente): la posición 1 de la galería usa la foto de la tarjeta hasta que llegue `{caja}-galeria-1`; el resto son placeholders.
- La miniatura de la barra fija reutiliza la foto de la tarjeta (n.º 5 a 8), como indica el documento.
- Diferencias con el plan (según el LEEME): cajas cerradas con faja en vez de abiertas o con lazo; la n.º 14 lleva cinta roja; la foto de Cumpleaños (n.º 16) no tiene vela, muestra luces y confeti (su texto alternativo lo describe así). Los textos pequeños impresos en las cajas son de la IA y no sirven como arte final.
- `og-compartir.jpg` (n.º 22) está en el manifiesto pero todavía no se conecta a los metadatos.
