# Marina Gold · Paquete de entrega del diseño

Contenido de este paquete:

- `laminas/01-home-movil-3x.png`: home, 1125 × 16680 px (3x de 375).
- `laminas/02-ficha-caja-surtida-movil-3x.png`: ficha de la caja Surtida, 1125 × 11988 px.
- `laminas/03-guia-de-estilo-2x.png`: guía de estilo, 2400 × 8432 px.
- `tokens.css`: tokens CSS listos para usar.
- `notas-de-diseno.md`: notas para Claude Code.
- Este documento: todo lo anterior junto, más la revisión y cómo compartir el lienzo.

---

## 1. Revisión de las láminas

Las láminas se renderizaron en un navegador, desde los mismos archivos del lienzo y con las mismas fuentes, y se midieron. Correcciones:

**Guía de estilo**
- En el ejemplo de la barra fija, "S/" quedaba sola en una línea: ahora el precio va en una sola línea.
- En la tarjeta de caja, "COULIS DE FRESA" se partía en dos líneas: la tarjeta ahora está a su tamaño real (166 px).
- En la escala de espaciado, las etiquetas no estaban alineadas: ahora sí.
- Al final de la lámina se cortaban 3 px de margen: el alto ahora es exacto.

**Home**
- Se quitaron unos 500 px de negro vacío al final.

**Ficha de caja**
- "¿QUÉ HAY DENTRO?" se partía en dos líneas: el rótulo pasó debajo del título ("EN TU CAJA DE 12 BOMBONES").
- La etiqueta de la foto de la galería se metía debajo del contador "1 / 5": ahora tiene un ancho limitado.
- La barra fija tapaba un título: ahora se muestra sobre las fotos de ocasiones.
- Se ajustó el alto de la lámina.

## 2. Exportación

Las PNG no se descargaron desde el lienzo: se generaron desde los mismos archivos. No se confirmó si el editor del lienzo tiene un botón de exportar a PNG.

## 3. Tokens CSS

```css
/* =========================================================
   MARINA GOLD · Tokens de diseño · v1 (móvil 375 px)
   Fuente: lienzo "Marina Gold — Tienda móvil", página "Diseño aprobado"
   Los valores marcados [PROPUESTO] no están dibujados en el lienzo.
   ========================================================= */
:root {
  /* ---------- Color: marca ---------- */
  --mg-black: #111111;        /* texto principal, títulos, barra de anuncio, footer, pestaña activa, tamaño elegido, botón "Pedir en la web" */
  --mg-white: #FFFFFF;        /* fondo dominante del sitio; texto sobre negro y sobre rojo */
  --mg-red: #C8102E;          /* SOLO: botones de compra (Comprar/Añadir), botón del newsletter, etiqueta de oferta, precio rebajado, antetítulos, contador del carrito, punto del logo del footer */
  --mg-red-hover: #A50D26;    /* [PROPUESTO] hover/pressed de botones rojos */
  --mg-black-hover: #2B2B2B;  /* [PROPUESTO] hover/pressed de botones negros */
  --mg-bone: #F4F4F2;         /* fondo de secciones alternas: "Hecho por Marina", "¿Qué hay dentro?" */

  /* ---------- Color: texto y líneas ---------- */
  --mg-ink: #111111;          /* texto principal (= negro) */
  --mg-ink-2: #444444;        /* párrafos, descripciones, respuestas de FAQ */
  --mg-ink-3: #5C5C5C;        /* datos menores ("6 y 12 bombones"), precio tachado, estado agotado, antetítulo gris de la ficha. Nunca usar un gris más claro sobre blanco */
  --mg-line: rgba(17, 17, 17, 0.12);   /* divisores, filas de desplegables, borde del header, bordes de fichas de la guía */
  --mg-border: #111111;       /* borde de botones secundarios, pestañas, selector de tamaño, cantidad, campo de correo */

  /* ---------- Color: sobre fondo negro (footer, hero) ---------- */
  --mg-on-dark: #FFFFFF;                       /* texto e íconos sobre negro */
  --mg-on-dark-muted: rgba(255, 255, 255, 0.70); /* línea del © */
  --mg-on-dark-soft: rgba(255, 255, 255, 0.80);  /* precio secundario dentro del tamaño elegido */
  --mg-on-dark-border: rgba(255, 255, 255, 0.40); /* borde de botones de redes */
  --mg-on-dark-line: rgba(255, 255, 255, 0.25);   /* divisores del footer */

  /* ---------- Color: sabores (fondo / fondo de foto) ---------- */
  --mg-manjar: #EAD3B5;        /* Manjar de olla: franja de sabor, tarjeta de su caja, punto de pestaña, fila de "¿Qué hay dentro?" */
  --mg-manjar-deep: #DDBF98;   /* Manjar de olla: fondo de fotos de producto sobre su franja */
  --mg-maracuya: #FBE3A0;      /* Maracuyá: mismos usos + fondo de la sección newsletter */
  --mg-maracuya-deep: #F4D27A; /* Maracuyá: fondo de fotos */
  --mg-fresa: #F6CFD4;         /* Coulis de fresa: mismos usos */
  --mg-fresa-deep: #EDB9C0;    /* Coulis de fresa: fondo de fotos */
  /* Caja Surtida: los tres colores en franjas verticales iguales (33.34% / 33.33% / 33.33%) */
  --mg-surtida: linear-gradient(90deg, var(--mg-manjar) 0 33.34%, var(--mg-maracuya) 33.34% 66.67%, var(--mg-fresa) 66.67% 100%);

  /* ---------- Color: estados ---------- */
  --mg-soldout-veil: rgba(255, 255, 255, 0.55);  /* velo sobre la foto de una caja agotada */
  --mg-overlay: rgba(17, 17, 17, 0.50);          /* [PROPUESTO] fondo detrás del menú lateral abierto */
  --mg-focus: #C8102E;                           /* [PROPUESTO] anillo de foco (outline 2px, offset 2px) */

  /* ---------- Color: temporales (se van con las fotos reales) ---------- */
  --mg-placeholder: #E7E7E4;       /* fondo de placeholders de foto sobre blanco */
  --mg-placeholder-dark: #1A1A1A;  /* fondo del placeholder del hero */

  /* ---------- Tipografía: familias (cargar con next/font/google) ---------- */
  --mg-serif: 'Playfair Display', Georgia, serif;  /* títulos, nombres de producto, logo. Pesos 400 itálica, 700, 800. Siempre MAYÚSCULAS salvo la itálica de acento */
  --mg-sans: 'DM Sans', system-ui, sans-serif;     /* textos, precios, botones, etiquetas. Pesos 400, 500, 700 */

  /* ---------- Tipografía: tamaños (px / interlineado) ---------- */
  --mg-text-footer-logo: 84px;   /* logo gigante del footer, 800, interlineado 0.88, 2 líneas "MARINA / GOLD." */
  --mg-text-hero: 33px;          /* "NUEVA COLECCIÓN", 800, interlineado 1, una sola línea */
  --mg-text-h1: 32px;            /* nombre del producto en la ficha, 800, interlineado 1 */
  --mg-text-h2: 30px;            /* títulos de sección, 800, interlineado 1.05 (en el lienzo varían 28–34; normalizar a 30, "LAS CAJAS" puede ir a 34) */
  --mg-text-h3: 26px;            /* nombre del sabor en su franja, 700 */
  --mg-text-accent: 26px;        /* itálica de acento ("Cero arrepentimientos.", "— Marina", "×4"), 400 itálica */
  --mg-text-card-title: 16px;    /* nombre de caja en tarjeta, serif 700, tracking 0.03em */
  --mg-text-logo: 19px;          /* logo del header, serif 700, tracking 0.10em */
  --mg-text-price-lg: 22px;      /* precio en la ficha, sans 700 */
  --mg-text-body: 15px;          /* párrafos, sans 400, interlineado 1.5 (1.6 en textos largos) */
  --mg-text-price: 14px;         /* precio en tarjeta, sans 700 */
  --mg-text-button: 13px;        /* botones grandes, sans 700, tracking 0.12em, MAYÚSCULAS (12–12.5 en botones pequeños) */
  --mg-text-small: 12.5px;       /* datos menores y notas, sans 400 */
  --mg-text-tab: 11.5px;         /* pestañas de filtro, sans 700, tracking 0.12em */
  --mg-text-eyebrow: 11px;       /* antetítulos y rótulos de campo, sans 700, tracking 0.18em (0.14em en rótulos) */
  --mg-text-announce: 10.5px;    /* barra de anuncio, sans 500, tracking 0.14em */
  --mg-text-badge: 9.5px;        /* etiquetas sobre fotos, sans 700, tracking 0.12em */

  --mg-leading-tight: 1;         /* títulos display */
  --mg-leading-heading: 1.05;    /* títulos de sección */
  --mg-leading-body: 1.5;        /* párrafos */
  --mg-leading-long: 1.6;        /* textos largos (Marina, desplegables, FAQ) */

  --mg-tracking-logo: 0.10em;
  --mg-tracking-button: 0.12em;
  --mg-tracking-eyebrow: 0.18em;

  /* ---------- Espaciado (escala base 4) ---------- */
  --mg-space-1: 4px;
  --mg-space-2: 8px;     /* separación entre pestañas, botones apilados, logos de pago */
  --mg-space-3: 12px;
  --mg-space-4: 16px;    /* margen lateral de la página (gutter) */
  --mg-space-5: 20px;
  --mg-space-6: 24px;    /* entre título de sección y contenido */
  --mg-space-7: 28px;    /* padding superior de cada sección */
  --mg-space-8: 32px;    /* entre filas de la grilla de cajas */
  --mg-space-10: 40px;   /* padding inferior de cada sección */

  --mg-gutter: 16px;            /* margen lateral en móvil */
  --mg-section-top: 28px;       /* padding superior de sección */
  --mg-section-bottom: 40px;    /* padding inferior de sección */
  --mg-grid-col-gap: 11px;      /* columnas de la grilla de cajas (2 col en 375) */
  --mg-grid-row-gap: 32px;      /* filas de la grilla de cajas */

  /* ---------- Tamaños de componentes ---------- */
  --mg-touch: 44px;             /* área táctil mínima: íconos del header, pestañas, redes, "Ver todo" */
  --mg-btn-lg: 52px;            /* botón Añadir al carrito, botones de "Cómo pedir", campo de correo */
  --mg-btn-md: 48px;            /* botón del hero, botón de la barra fija */
  --mg-announce-h: 32px;        /* barra de anuncio */
  --mg-header-h: 56px;          /* header */
  --mg-size-option-h: 64px;     /* opción del selector de tamaño */
  --mg-accordion-row: 56px;     /* fila de desplegable (FAQ: mínimo 60) */
  --mg-sticky-bar-h: 76px;      /* barra fija inferior */
  --mg-pay-logo-w: 56px;        /* logo de pago: 56 × 36 */
  --mg-pay-logo-h: 36px;
  --mg-social-icon: 22px;       /* ícono de red dentro de caja de 44 */
  --mg-checkbox: 20px;          /* casilla de consentimiento */
  --mg-dot: 10px;               /* punto de color en pestañas */

  /* ---------- Forma ---------- */
  --mg-radius: 0;               /* todo el sitio: esquinas rectas */
  --mg-radius-pay: 4px;         /* solo logos de medios de pago */
  --mg-radius-pill: 999px;      /* solo contador del carrito y puntos de sabor */
  --mg-border-w: 1px;           /* bordes normales */
  --mg-border-w-selected: 2px;  /* opción de tamaño elegida */
  --mg-border-w-hero: 1.5px;    /* borde blanco del botón del hero */

  /* ---------- Sombras ---------- */
  --mg-shadow-sticky: 0 -8px 24px rgba(17, 17, 17, 0.14);  /* ÚNICA sombra del sitio: barra fija inferior */
  --mg-shadow-drawer: 8px 0 32px rgba(17, 17, 17, 0.18);   /* [PROPUESTO] menú lateral abierto */

  /* ---------- Proporciones de imagen ---------- */
  --mg-ratio-hero: 4 / 5;       /* hero (375 × 469 en móvil) */
  --mg-ratio-box: 4 / 5;        /* fotos de caja, galería de la ficha, ocasiones, foto de Marina */
  --mg-ratio-flavor: 1 / 1;     /* fotos de sabor */

  /* ---------- Movimiento [PROPUESTO] ---------- */
  --mg-ease: cubic-bezier(0.2, 0.8, 0.2, 1);
  --mg-dur-fast: 150ms;         /* hover, cambio de color */
  --mg-dur-base: 250ms;         /* desplegables, barra fija */
  --mg-dur-slow: 300ms;         /* menú lateral */
}
```

## 4. Notas de diseño para Claude Code (notas-de-diseno.md)

# Marina Gold · Notas de diseño para construir la tienda

> Fuente de verdad: las láminas PNG `01-home-movil-3x.png`, `02-ficha-caja-surtida-movil-3x.png`, `03-guia-de-estilo-2x.png` y el archivo `tokens.css`. **Si este documento o las láminas contradicen el prompt original, manda el diseño.** Al final hay una lista de todo lo que cambió.
>
> Stack: Next.js + Tailwind. Diseño móvil a **375 px**. Todas las medidas en px. Los puntos marcados **[PROPUESTO]** no están dibujados: son la solución recomendada.

---

## 1. Dirección visual e intención

- **Dirección elegida: "blanco + color por sabor".** Fondo blanco dominante, negro para texto y estructura, un rojo de acento usado con disciplina, y un color pastel propio para cada sabor.
- **Referencia de estructura:** sugarpapi.es (home y ficha de producto). Se tomó la diagramación, no su marca, textos, fotos ni colores.
- **Qué debe sentir quien visita:** que llegó a una chocolatería de autor con personalidad. Editorial como revista (títulos serif grandes en mayúsculas), premium pero cercana y con humor en la voz de Marina. Nada de tienda juvenil genérica.
- **Por qué funciona:** las visitas llegan desde TikTok, Kick e Instagram en el celular. El blanco deja que las fotos de bombones hagan el trabajo, y los colores de sabor permiten reconocer cada sabor de un vistazo.
- **Reglas de oro:**
  - Esquinas rectas en todo (radio 0).
  - Sin degradados decorativos. La única "franja" de colores es la de la caja Surtida.
  - Una sola sombra en todo el sitio: la de la barra fija inferior.
  - El rojo nunca se usa como fondo de sección.
  - Todo lo tocable mide al menos 44 px.

## 2. Tipografías

Cargar con `next/font/google`: **Playfair Display** (400 itálica, 700, 800) y **DM Sans** (400, 500, 700). En Tailwind, mapear `font-serif` y `font-sans` a las variables `--mg-serif` y `--mg-sans`.

| Estilo | Fuente | Peso | Tamaño / interlineado | Tracking | Dónde |
|---|---|---|---|---|---|
| Logo footer | Playfair | 800 | 84 / 0.88 | 0.01em | Footer, "MARINA" y "GOLD." en 2 líneas, punto rojo |
| Hero | Playfair | 800 | 33 / 1 | 0 | "NUEVA COLECCIÓN", una sola línea |
| H1 producto | Playfair | 800 | 32 / 1 | 0.01em | Nombre de la caja en la ficha |
| H2 sección | Playfair | 800 | 30 / 1.05 | 0 | Títulos de sección (lienzo 28–34; "LAS CAJAS" a 34) |
| H3 sabor | Playfair | 700 | 26 | 0.02em | Nombre del sabor en su franja |
| Acento | Playfair itálica | 400 | 24–26 | 0 | Frase final de títulos, firma "— Marina", números 01/02/03, "×4" |
| Título de tarjeta | Playfair | 700 | 16 / 1.15 | 0.03em | Nombre de caja en la grilla, ocasiones (18) |
| Logo header | Playfair | 700 | 19 | 0.10em | Header |
| Párrafo | DM Sans | 400 | 15 / 1.5 (1.6 largos) | 0 | Descripciones, Marina, desplegables, FAQ (14–14.5) |
| Precio ficha | DM Sans | 700 | 22 | 0 | Precio principal en la ficha |
| Precio tarjeta | DM Sans | 700 | 14 | 0 | "Desde S/ 45.00" |
| Botón | DM Sans | 700 | 13 (12–12.5 en botones pequeños) | 0.12em | Todos los botones, MAYÚSCULAS |
| Dato | DM Sans | 400 | 12.5 | 0 | "6 y 12 bombones", notas |
| Pestaña | DM Sans | 700 | 11.5 | 0.12em | Filtros |
| Antetítulo | DM Sans | 700 | 11 | 0.18em | Rojo sobre blanco: "LOS BOMBONES", "HECHO POR MARINA", "CÓMO PEDIR" |
| Rótulo | DM Sans | 700 | 11 | 0.14em | "TAMAÑO", "TU CORREO", coberturas ("EN CHOCOLATE NEGRO") |
| Barra de anuncio | DM Sans | 500 | 10.5 | 0.14em | Barra superior |
| Etiqueta | DM Sans | 700 | 9.5 | 0.12em | Etiquetas sobre fotos |

- **Moneda:** siempre `S/ 45.00` (S/, espacio, dos decimales). Usar un espacio no separable para que "S/" no quede sola en una línea.
- **Mayúsculas:** los títulos se escriben en mayúsculas en el contenido (o con `uppercase`). La itálica de acento va en minúsculas normales.

## 3. Colores de sabor

| Sabor | Fondo | Fondo de foto ("deep") | Cobertura |
|---|---|---|---|
| Manjar de olla | `#EAD3B5` | `#DDBF98` | chocolate negro |
| Maracuyá | `#FBE3A0` | `#F4D27A` | chocolate de leche |
| Coulis de fresa | `#F6CFD4` | `#EDB9C0` | chocolate blanco |
| Surtida | los tres en franjas verticales iguales | — | las tres |

Aparecen en:

1. **Home, sección de sabores:** cada sabor es una franja a todo el ancho, pegadas sin espacio entre ellas.
2. **Tarjetas de caja:** fondo de la foto con el color de su sabor. La Surtida lleva las tres franjas.
3. **Pestañas de filtro:** punto de 10 px con borde negro de 1 px.
4. **Ficha, "¿Qué hay dentro?":** una fila por sabor con su color.
5. **Barra fija:** miniatura de la Surtida con las tres franjas.
6. **Newsletter:** fondo amarillo maracuyá (`--mg-maracuya`).

Uso por sabor: fondo pastel para el bloque y "deep" solo detrás de las fotos. El texto sobre estos colores va en `#111111` / `#444444`, con contraste suficiente.

## 4. Componentes (medidas y estados)

Hover solo aplica con puntero fino (`@media (hover: hover)`). Todos los estados de hover y foco son **[PROPUESTO]**; en el lienzo solo está el estado normal y los que se indican. Foco visible: `outline: 2px solid var(--mg-red); outline-offset: 2px`.

### Botones

| Variante | Medidas | Normal | Hover [PROPUESTO] | Pressed / deshabilitado |
|---|---|---|---|---|
| Compra (rojo) | alto 52 (48 en barra fija), ancho completo o flex | fondo `--mg-red`, texto blanco 13/700/0.12em | fondo `--mg-red-hover` | Deshabilitado: fondo `#5C5C5C`, texto blanco |
| Primario negro | alto 52, padding lateral 18 | fondo negro, texto blanco, ícono 20 a la izquierda y flecha 16 a la derecha | fondo `--mg-black-hover` | — |
| Secundario (borde) | alto 52, borde 1 negro, fondo blanco | texto negro | fondo negro, texto blanco | — |
| Hero | alto 48, ancho mínimo 150, padding 0 28 | fondo negro, borde **blanco 1.5**, texto blanco 13/**500**/0.1em | fondo blanco, texto negro | — |
| Avísame | alto 44, borde 1 negro, campana 15 | texto negro 12/700 | fondo negro, texto blanco | — |
| Enlace de texto ("VER TODO", "CONOCE LA HISTORIA →") | alto 44, 12/700/0.12–0.14em | subrayado con offset 5 | texto rojo | — |

- **Botón Compra:** usos en "COMPRAR" del menú, "AÑADIR AL CARRITO", "AÑADIR" de la barra fija y "UNIRME".
- **Primario negro:** "PEDIR EN LA WEB".
- **Secundario (borde):** "PEDIR POR WHATSAPP", "RAPPI" y "PEDIDOSYA" (estos dos en 2 columnas con gap 10).

### Etiquetas (sobre fotos)
- **Posición y formato:** esquina superior izquierda, a 8 px de los bordes. Tipografía 9.5/700/0.12em en mayúsculas; padding 5 × 8 (4 × 7 si llevan borde).
- **Variantes:**
  - **MÁS VENDIDA:** fondo negro, texto blanco.
  - **Oferta ("AHORRA 10%", "AHORRA S/ 5"):** fondo rojo, texto blanco. En la ficha, "AHORRA S/ 5" va sobre la opción de 12, sobresaliendo 9 px por arriba.
  - **NOVEDAD:** fondo blanco, borde 1 negro, texto negro.
  - **AGOTADA:** fondo blanco, borde 1 `#5C5C5C`, texto `#5C5C5C`.

### Pestañas de filtro
- **Contenedor:** fila con scroll horizontal y sin barra visible (`overflow-x:auto; scrollbar-width:none`). Padding lateral 16 y gap 8. Que la tercera pestaña quede cortada al borde es intencional: indica que hay más.
- **Pestaña:** alto 44, padding 0 18, borde 1 negro, tipografía 11.5/700/0.12em, con `role="tab"` y `aria-selected`.
- **Estados:**
  - **Normal:** fondo blanco, texto negro, punto de color de 10 px antes del nombre (gap 8). "TODAS" no lleva punto.
  - **Seleccionada:** fondo negro, texto blanco.
  - **Hover [PROPUESTO]:** fondo `--mg-bone`.
- **Comportamiento:** filtra la grilla de cajas en el sitio, sin recargar. "MANJAR DE OLLA" muestra solo la caja Manjar; la Surtida aparece en "TODAS".

### Selector de tamaño (ficha)
- **Disposición:** rótulo "TAMAÑO" arriba, a 8 px. Debajo, 2 columnas con gap 8; cada opción mide 64 de alto.
- **Contenido:** línea 1 "6 BOMBONES" (12.5/700/0.1em); línea 2 el precio (12.5/400). Usar `aria-pressed`, o mejor un `radiogroup`.
- **No elegida:** fondo blanco, borde 1 negro, precio en `#5C5C5C`.
- **Elegida:** fondo negro, borde 2 negro, texto blanco, check de 14 antes del nombre y precio en blanco al 80%.
- **Hover [PROPUESTO]:** borde 2 negro.
- **Agotado [PROPUESTO]:** opción con texto `#5C5C5C`, rayada en diagonal y sin poder elegirse.
- **Al cambiar de tamaño se actualizan:**
  - el precio principal;
  - el "por bombón" (S/ 7.50 o S/ 7.08);
  - los "×2" o "×4" de "¿Qué hay dentro?";
  - el texto de la barra fija.

### Cantidad
- **Medidas:** caja con borde 1 negro, alto 52, tres celdas: "−" de 42 · número de 30 (15/700) · "+" de 42. Íconos de 16.
- **Posición:** a la izquierda del botón "AÑADIR AL CARRITO", en la misma fila y con gap 8.
- **Límites:** mínimo 1; el "−" deshabilitado en 1 va con ícono `#5C5C5C`. Máximo [PROPUESTO] 10.

### Tarjeta de caja
- **Tamaño:** 166 de ancho en móvil. Grilla de 2 columnas, gap 11 horizontal y 32 vertical.
- **Foto:** 4:5 con fondo del color del sabor.
- **Debajo de la foto, a 10 px:**
  - nombre (serif 16/700, MAYÚSCULAS);
  - "6 y 12 bombones" (12.5, `#5C5C5C`);
  - "Desde S/ 45.00" (14/700), a 4 px entre sí.
- **Toda la tarjeta es un enlace** a la ficha.
- **Estados:**
  - **Normal:** precio en negro.
  - **Oferta:** precio en rojo más el anterior tachado en `#5C5C5C` 12.5, con gap 8; etiqueta roja "AHORRA 10%".
  - **Agotada:**
    - velo blanco al 55% sobre la foto;
    - etiqueta AGOTADA;
    - nombre en `#5C5C5C`;
    - la línea de tamaños cambia a "Vuelve el viernes" (fecha de reposición);
    - botón "AVÍSAME" de 44 al pie (abre un campo de correo, [PROPUESTO]);
    - la tarjeta no enlaza a compra.
  - **Hover [PROPUESTO]:** la foto cambia a una segunda foto (caja abierta) con fundido de 250 ms.

### Desplegable (acordeón)
- **Fila:** botón a todo el ancho de 56 de alto, texto 12.5/700/0.12em en MAYÚSCULAS, ícono "+" o "−" de 16 a la derecha y línea inferior `--mg-line`. Usar `aria-expanded`.
- **Contenido abierto:** padding inferior 20, texto 14.5/1.6 `#444444`.
- **Ficha:** solo "DESCRIPCIÓN" empieza abierto. Se pueden abrir varios a la vez [PROPUESTO].
- **Variante FAQ:**
  - la pregunta va en texto normal (14.5/700, sin mayúsculas), con alto mínimo 60 y padding 12 vertical;
  - la primera empieza abierta;
  - respuesta en 14/1.6.

### Barra fija inferior (ficha)
- **Medidas:** alto 76, fondo blanco, línea superior `--mg-line`, sombra `--mg-shadow-sticky`, padding 0 12, gap 12.
- **Contenido, de izquierda a derecha:**
  - miniatura de 44 × 55 (4:5; en la Surtida, sus tres franjas);
  - nombre (serif 15/700) y debajo "12 bombones · **S/ 85.00**" (12);
  - botón rojo "AÑADIR", alto 48, padding 0 18.
- **Comportamiento:**
  - aparece con deslizamiento hacia arriba de 250 ms cuando el botón principal "AÑADIR AL CARRITO" sale de pantalla (usar IntersectionObserver);
  - desaparece cuando ese botón vuelve a verse;
  - respetar `env(safe-area-inset-bottom)`.
- En el lienzo se muestra flotando sobre la sección de ocasiones solo como ejemplo.

### Campo de correo (newsletter)
- **Rótulo:** "TU CORREO" visible arriba (11/700/0.14em), unido al campo con `<label for>`.
- **Caja:** alto 52, borde 1 negro, fondo blanco; `input type="email"` de 15 px, padding 0 14.
- **Botón:** "UNIRME" pegado a la derecha, rojo, padding 0 18.
- **Casilla de consentimiento:** de 20 px dentro de una fila táctil de 44, con el texto "Acepto recibir correos de Marina Gold y la política de privacidad." (enlace subrayado).
- **Estados:**
  - **Error [PROPUESTO]:** borde rojo y mensaje 12.5 en rojo debajo ("Revisa tu correo").
  - **Éxito [PROPUESTO]:** se reemplaza el formulario por "¡Listo! Te avisamos antes que a nadie."
- Solo se puede enviar con la casilla marcada.

### Franja de sabor (home)
- **Tamaño y padding:** a todo el ancho (375), padding 28 · 16 · 36, fondo del color del sabor. Tres franjas seguidas, sin espacio entre ellas.
- **Contenido, con gap 16:**
  - foto 1:1 de 343 con fondo "deep";
  - fila con el nombre H3 a la izquierda y el número en itálica 18 ("01") a la derecha, con línea inferior negra de 1 px y padding inferior 8;
  - la cobertura "EN CHOCOLATE NEGRO" (11/700/0.14em);
  - la descripción (15/1.5, `#444444`).

### Header y barra de anuncio
- **Barra de anuncio:** 32 de alto, fondo negro, texto blanco centrado.
- **Header:**
  - 56 de alto, fondo blanco, línea inferior `--mg-line`;
  - hamburguesa a la izquierda (caja de 44, ícono de 22);
  - logo centrado;
  - a la derecha, buscar y carrito (cajas de 44, íconos de 21, trazo de 1.5).
- **Contador del carrito:** círculo rojo de 16 con número blanco 9.5/700, arriba a la derecha del ícono.
- **[PROPUESTO]** El header queda fijo arriba al hacer scroll; la barra de anuncio no.

### Footer
- **Contenedor:** fondo negro, padding 32 · 16 · 32, gap 32.
- **Contenido, de arriba abajo:**
  - **Enlaces legales** en 2 columnas, filas de 44 y texto 13: Libro de Reclamaciones · Política de privacidad · Envíos y cambios · Términos y condiciones.
  - **Redes:** TikTok, Instagram y Kick. Cada uno es una caja de 44 × 44 con borde blanco al 40%, ícono blanco de 22 y `aria-label` "Marina Gold en TikTok"; gap 8.
  - **Logo gigante:** con línea superior blanca al 25% y padding 28.
  - **Medios de pago:** con línea superior y padding 20. Son Visa, Mastercard, Yape y Plin, cada uno en ficha de 56 × 36 con radio 4 y gap 8. Visa, Mastercard y Plin van sobre blanco; Yape sobre su morado.
  - **Línea final:** "© 2026 Marina Gold · Lima, Perú. Hecho a mano, comido con ganas." (11.5, blanco al 70%).
- **Logos de pago:** los de Visa y Mastercard de las láminas son **versiones antiguas**. Usar los oficiales vigentes de cada marca o los del kit de la pasarela de pago.

### Placeholders de foto
Las fotos se generarán aparte. Mientras tanto, cada foto debe ser un bloque con la proporción correcta (`aspect-ratio`) y `next/image` con `sizes` adecuados. Proporciones:
- **4:5:** hero, cajas, galería, ocasiones y Marina.
- **1:1:** sabores.

El rayado diagonal y la etiqueta de las láminas son solo para el diseño; no hay que replicarlos.

## 5. Orden exacto de secciones

### Home
1. **Barra de anuncio:** "DELIVERY EN LIMA · PEDIDOS CON 24 H DE ANTICIPACIÓN".
2. **Header.**
3. **Hero 4:5** (375 × 469), con la foto de fondo. Contenido centrado en ambos ejes, con gap 14:
   - antetítulo "EDICIÓN PRIMAVERA" (13/700/0.08em, blanco);
   - título "NUEVA COLECCIÓN";
   - botón hero "COMPRAR", a 10 px más, que lleva a la grilla de cajas.

   Si la foto real es clara, añadir un velo negro al 25–35% para mantener el contraste.
4. **Los tres sabores** (blanco, padding superior 28):
   - antetítulo rojo "LOS BOMBONES";
   - título en tres líneas: "TRES SABORES." / "TRES CHOCOLATES." / "*Cero arrepentimientos.*" (29–30 px; cada frase en su línea);
   - a 24 px, tres franjas de sabor seguidas: Manjar 01, Maracuyá 02, Coulis de fresa 03.
5. **Las cajas** (blanco): título "LAS CAJAS" con el enlace "VER TODO" a la derecha, y debajo las pestañas TODAS · MANJAR DE OLLA · MARACUYÁ · COULIS DE FRESA.
6. **Grilla 2 × 2:**
   - Surtida: MÁS VENDIDA, "Desde S/ 45.00";
   - Manjar de olla: "AHORRA 10%", "Desde S/ 40.50" con tachado "S/ 45.00";
   - Maracuyá: NOVEDAD, "Desde S/ 45.00";
   - Coulis de fresa: AGOTADA, "Vuelve el viernes", botón "AVÍSAME".
7. **Hecho por Marina** (fondo `--mg-bone`):
   - foto 4:5 de 343 × 429;
   - antetítulo rojo "HECHO POR MARINA";
   - título "NO NACÍ CHOCOLATERA. *Me volví una por antojo.*";
   - párrafo;
   - firma "— Marina" (itálica 24);
   - enlace "CONOCE LA HISTORIA →".
8. **Cómo pedir** (blanco, línea superior):
   - antetítulo "CÓMO PEDIR";
   - título "TU CAJA, DONDE MÁS TE ACOMODE";
   - texto sobre las 24 h;
   - botones: Pedir en la web, Pedir por WhatsApp, y Rappi | PedidosYa en dos columnas;
   - línea con pin rojo: "**Llegamos a** Miraflores, San Isidro, Barranco, Surco, San Borja, La Molina, Jesús María, Magdalena y Lince. ¿Otro distrito? Escríbenos y lo vemos."
9. **Newsletter** (fondo amarillo maracuyá, padding 32 · 16 · 36, texto centrado arriba):
   - título "SÉ DE LOS PRIMEROS EN PROBAR LA PRÓXIMA EDICIÓN";
   - subtítulo;
   - campo de correo;
   - casilla.
10. **Footer.**

### Ficha de caja (ejemplo: Surtida, tamaño 12 elegido)
1. **Barra de anuncio y header**, iguales a la home.
2. **Galería:**
   - carrusel de fotos 4:5 a todo el ancho (5 fotos), con deslizamiento y `scroll-snap`;
   - contador "1 / 5" arriba a la derecha (fondo negro, texto blanco 11/700, alto 24, a 10 px de los bordes);
   - indicador abajo: 5 segmentos de 3 px de alto en grilla con gap 4, a 16 px de los bordes; el activo va en negro y el resto en negro al 20%.
3. **Información y compra** (padding 20 · 16 · 24, gap 16):
   - etiqueta MÁS VENDIDA;
   - "CAJA SURTIDA";
   - "Los tres sabores en una sola caja" (13.5, `#444444`);
   - precio "S/ 85.00" (22/700) y a su lado "S/ 7.08 por bombón" (12.5, `#5C5C5C`);
   - selector de tamaño;
   - cantidad y "AÑADIR AL CARRITO";
   - reloj de 16 con "Pide hoy y recíbela en Lima **desde mañana**."
4. **Destacados:**
   - tres columnas centradas, con líneas arriba y abajo y padding 20 vertical;
   - ícono de línea de 28 (trazo 1.3) y texto 11.5/700 en 2 líneas: HECHO A MANO / EN LIMA · SABORES / PERUANOS · IDEAL PARA / REGALAR.
5. **Desplegables:**
   - DESCRIPCIÓN, abierto, con 3 párrafos (qué es; qué trae la caja de 12 y la de 6; empaque);
   - DELIVERY EN LIMA, CONSERVACIÓN, e INGREDIENTES Y ALÉRGENOS, cerrados y **sin texto aún** (pendiente del cliente).
6. **¿Qué hay dentro?** (fondo `--mg-bone`, padding 28 · 16 · 36):
   - título, y debajo el rótulo "EN TU CAJA DE 12 BOMBONES";
   - 3 filas con gap 8, una por sabor, cada una con fondo del sabor y padding 10 · 14 · 10 · 10;
   - cada fila lleva foto de 96 × 96 sobre fondo "deep", el nombre (serif 17/700), "Relleno de …" y "Cobertura de …" (12.5/1.45), y a la derecha la cantidad en itálica 26 ("×4" en la de 12, "×2" en la de 6).
7. **¿Para qué ocasión?:**
   - carrusel horizontal con padding lateral 16 y gap 10;
   - tarjetas de 220 de ancho con foto 220 × 275, título serif 18/700 y línea 13:
     - REGALO: "Con lazo y una tarjeta con tu dedicatoria."
     - CUMPLEAÑOS: "Mejor que una torta que nadie termina."
     - ANIVERSARIO: "Doce formas de decir “te quiero”."
     - ANTOJO: "No necesitas una ocasión. Esta es la ocasión."
   - cada tarjeta enlaza a la colección [PROPUESTO].
8. **Preguntas frecuentes**, con la primera abierta:
   - ¿A qué distritos de Lima llegan?
   - ¿Con cuánta anticipación tengo que pedir?
   - ¿Puedo mandarla de regalo a otra dirección?
   - ¿Puedo incluir una dedicatoria?
   - ¿Puedo elegir el día y la hora de entrega?
9. **Barra fija inferior**, que aparece al hacer scroll.
10. **Newsletter y footer**, iguales a la home.

**Lógica de precios** (ejemplo, confirmar con el cliente):
- Caja de 6: S/ 45.00 (S/ 7.50 por bombón).
- Caja de 12: S/ 85.00 (S/ 7.08 por bombón); "AHORRA S/ 5" frente a dos cajas de 6.
- "Desde" muestra el precio de la caja de 6.
- Oferta 10% en Manjar: S/ 40.50 (6) y S/ 76.50 (12).
- Composición de la Surtida: 2 de cada sabor en la de 6, 4 de cada uno en la de 12. Las cajas de un solo sabor traen 6 o 12 del mismo.

## 6. Lo que NO está diseñado y cómo resolverlo

### Tablet 768 px [PROPUESTO]
- Contenedor centrado con `max-width: 720px` y gutter 24.
- Grilla de cajas en 2 columnas con gap 16 / 40.
- Franjas de sabor con la foto a la izquierda (50%) y el texto a la derecha.
- Ficha en una columna con `max-width: 600px` centrada.
- La barra fija inferior se mantiene.

### Escritorio 1440 px [PROPUESTO]
- **Contenedor:** `max-width: 1200px`, gutter 48. Escalar los títulos: hero 72, H1 48, H2 44, H3 32; el cuerpo queda en 16.
- **Header:** logo a la izquierda, navegación en línea al centro (Cajas · Sabores · Nuestra historia · Cómo pedir), buscar y carrito a la derecha. La hamburguesa desaparece desde 1024.
- **Hero:** foto 16:9 (máximo 720 de alto), con el contenido centrado igual que en móvil.
- **Sabores:** las 3 franjas pasan a 3 columnas lado a lado, cada una con su color.
- **Grilla de cajas:** 4 columnas con gap 24.
- **Hecho por Marina:** foto a la izquierda y texto a la derecha, en 2 columnas.
- **Cómo pedir:** 4 botones en una fila.
- **Ficha:**
  - 2 columnas: galería a la izquierda (58%, con miniaturas verticales en lugar del indicador de segmentos) e información a la derecha, pegajosa (`position: sticky; top: header`);
  - debajo, a todo el ancho, "¿Qué hay dentro?" en 3 columnas, ocasiones en 4 columnas sin carrusel, y FAQ en una columna de `max-width` 760;
  - **no mostrar la barra fija inferior** desde 1024 (la columna de compra ya es visible).
- **Footer:** 4 columnas (legales, redes, pagos, newsletter compacto), con el logo gigante a todo el ancho abajo.
- **Hover:** se activan los hover definidos en la sección 4.

### Menú lateral abierto [PROPUESTO]
- **Panel:** entra desde la izquierda. Ancho `min(88vw, 360px)`, fondo blanco, sombra `--mg-shadow-drawer`, fondo detrás con `--mg-overlay`; se cierra al tocar fuera o con Esc.
- **Parte superior:** logo, con botón cerrar (X) de 44 a la derecha.
- **Ítems:**
  - filas de 56 con línea inferior, texto 13/700/0.12em en MAYÚSCULAS;
  - grupo "LAS CAJAS": Todas, Surtida y los tres sabores, cada sabor con su punto de color;
  - después: Nuestra historia, Cómo pedir, Preguntas frecuentes, y Escríbenos por WhatsApp (botón con borde de 52).
- **Pie del panel:** íconos de redes en negro.
- **Accesibilidad:** foco atrapado dentro del panel; `aria-expanded` en la hamburguesa.

### Animaciones [PROPUESTO]
- Hover y cambios de color: 150 ms.
- Desplegables: altura con 250 ms.
- Barra fija: `translateY` con 250 ms.
- Menú lateral: 300 ms con `--mg-ease`.
- Aparición de secciones al hacer scroll: fundido y 12 px hacia arriba, 400 ms, una sola vez.
- Sin parallax ni carruseles automáticos.
- Con `prefers-reduced-motion`, quitar todo movimiento y dejar solo cambios de opacidad instantáneos.

### Otras páginas sin diseño (usar el mismo sistema)
Búsqueda, carrito o drawer del carrito, checkout, fichas de las otras 3 cajas (misma plantilla, sin la franja Surtida), "Nuestra historia", Libro de Reclamaciones, páginas legales, 404, y estados vacíos o de error. Para estas páginas:
- tipografía y colores según las secciones 2–3;
- títulos H2;
- botones de la sección 4.

## 7. Cambios respecto al prompt original

Si el prompt y el diseño no coinciden, **manda el diseño**:

1. **Dirección visual:**
   - se pidieron dos direcciones (A crema y B negro); se descartaron ambas;
   - la aprobada es **blanco + color por sabor**, inspirada en el uso del color de Sugar Papi.
2. **Paleta:**
   - **se eliminó el crema `#F4EDE1`**; el fondo dominante es blanco `#FFFFFF`;
   - se agregaron gris hueso `#F4F4F2`, tinta `#444444` y `#5C5C5C`, y los 6 colores de sabor;
   - negro `#111111` y rojo `#C8102E` se mantienen.
3. **Tipografía sans:** se eligió **DM Sans**; el prompt no la definía. Playfair Display, como se pidió.
4. **Hero:**
   - es 4:5 (375 × 469) y no "pantalla completa";
   - se quitó el párrafo;
   - el antetítulo es "EDICIÓN PRIMAVERA";
   - el título va en una línea y todo centrado, como en la referencia;
   - **el botón COMPRAR es negro con borde blanco, no rojo.**
5. **Sabores:**
   - título "TRES SABORES. TRES CHOCOLATES. *Cero arrepentimientos.*";
   - cada sabor es una franja de color a todo el ancho con número 01–03.
6. **Cajas:**
   - se agregó el título "LAS CAJAS" y el enlace "VER TODO";
   - las pestañas llevan un punto de color y hacen scroll horizontal;
   - la caja agotada es Coulis de fresa, con "Vuelve el viernes";
   - la oferta es Manjar de olla, a S/ 40.50.
7. **Cómo pedir:**
   - se agregaron el antetítulo, el título "TU CAJA, DONDE MÁS TE ACOMODE" y la línea de 24 h;
   - Rappi y PedidosYa van en 2 columnas;
   - la lista de distritos es **inventada**; confirmarla.
8. **Newsletter:** fondo amarillo maracuyá, rótulo "TU CORREO" y botón "UNIRME".
9. **Footer:**
   - las redes son **solo íconos** (sin texto);
   - los medios de pago son logos;
   - el logo gigante va en 2 líneas con punto rojo;
   - se agregó la frase del ©.
10. **Header:** se agregó un contador rojo en el carrito.
11. **Ficha:**
    - se agregaron la barra de anuncio, el subtítulo, el precio por bombón, la etiqueta "AHORRA S/ 5", la línea de entrega "desde mañana" y el rótulo "EN TU CAJA DE 12 BOMBONES";
    - se muestra elegida la **caja de 12** (S/ 85.00);
    - cantidad y botón van en la misma fila;
    - la FAQ tiene 5 preguntas.
12. **Textos:** todos los textos de ejemplo están en la voz de Marina y deben **confirmarse con el cliente**, en especial:
    - "Edición Primavera";
    - "Vuelve el viernes";
    - S/ 40.50;
    - la lista de distritos;
    - "desde mañana";
    - caja rígida con lazo;
    - tarjeta con dedicatoria;
    - las respuestas de la FAQ.
13. **Logos de Visa y Mastercard:** los de las láminas son versiones antiguas; reemplazarlos.
14. **Orden de secciones:** es el mismo del prompt en ambas pantallas.


---

## 5. Cómo compartir el lienzo

- En el lienzo, pulsa **Compartir**, elige quién puede abrirlo y copia el enlace.
  - Planes Pro o Max: "Solo tú" o "Cualquiera con el enlace".
  - Planes Team o Enterprise: además, "Solo personas con acceso" o "Toda tu organización", con permiso de solo lectura, comentarios o edición.
- **No se puede abrir sin iniciar sesión.** Quien reciba el enlace necesita su propia cuenta de Claude, no la tuya. Solo los artefactos publicados desde un chat normal se pueden ver sin cuenta, y este lienzo no es uno de ellos.
- Para quien no tenga cuenta, usa las PNG de la carpeta `laminas`.

Fuente: https://support.claude.com/en/articles/9547008-publish-and-share-artifacts
