# MARINA GOLD — Maqueta de tienda online

Maqueta visual estática de la tienda online de **MARINA GOLD**, bombones artesanales premium hechos en Lima, Perú.
Sirve para aprobar el diseño y la experiencia de usuario (sobre todo en celular) antes de conectar una tienda real.

**No incluye** carrito funcional, pagos, login ni búsqueda real. Los botones de compra, el carrito y la búsqueda son solo visuales.

## Stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- Tailwind CSS, con las variables de `tokens.css` mapeadas en `tailwind.config.ts`
- Tipografías Playfair Display y DM Sans con `next/font/google` (se descargan al compilar y se sirven desde el propio sitio)
- Todas las imágenes dentro de `/public/images`

## Requisitos

- Node.js 20 LTS o superior
- Git

## Instalar y ejecutar en local

```bash
npm install
npm run dev
```

Abre <http://localhost:3000>. Para ver la versión móvil, usa las herramientas de desarrollador del navegador a 375 px de ancho.

Otros comandos:

```bash
npm run build     # compilación de producción
npm run start     # sirve la compilación de producción
npm run lint      # revisión de código
```

## Estructura

```
app/                 Páginas (App Router)
  page.tsx             Home (/)
  products/[slug]/     Ficha de caja (/products/surtida, ...)
  collections/todas/   Colección (/collections/todas)
  not-found.tsx        Página 404
components/          Componentes de interfaz (layout/, ui/, íconos y logos de pago)
data/catalog.ts      Catálogo: sabores, cajas, tamaños, precios base y estados
data/content.ts      Textos del sitio (anuncio, menú, home, ficha, FAQ, footer…)
data/imagenes.ts     Manifiesto de imágenes: n.º del documento, original, versión web, tamaño, peso y texto alternativo
lib/catalog.ts       Funciones de acceso (getProducts, getProductBySlug, getCollection)
lib/pricing.ts       Cálculos de precio (por bombón, "Desde", ahorro, oferta)
lib/images.ts        Resuelve cada imagen del manifiesto; si la versión web no existe, se muestra el placeholder
styles/tokens.css    Tokens de diseño (copia exacta de referencias/diseno/tokens.css)
styles/tokens-extendidos.css  Medidas de las notas que no están en tokens.css y ajustes tablet/escritorio
public/images/       Versiones web optimizadas (las genera `npm run imagenes`; ver "Imágenes")
referencias/diseno/  Paquete de diseño aprobado
referencias/fotos-originales/  Fotos aprobadas en alta resolución (intactas, no se sirven en la web)
scripts/             Utilidades: cortar las láminas y optimizar las imágenes
```

## Dónde se edita cada cosa

| Qué | Dónde |
| --- | --- |
| Textos de secciones, FAQ, anuncios, menú, footer, enlaces de redes y WhatsApp | `data/content.ts` |
| Cajas, composición por tamaño (6 y 12), estados (MÁS VENDIDA, NOVEDAD, AGOTADA, % de oferta), descripción | `data/catalog.ts` → `boxes` |
| Sabores (nombre, relleno, cobertura, color, descripción) | `data/catalog.ts` → `flavors` |
| Precios | `data/catalog.ts` → `BASE_PRICES` (en céntimos). El precio por bombón, el "Desde", el ahorro y el precio con oferta se calculan solos en `lib/pricing.ts` |
| Colores, fuentes, tamaños, espaciados, radios, sombras | `styles/tokens.css`. Las variables `--mg-*` se mapean en `tailwind.config.ts` (p. ej. `bg-mg-red`, `text-mg-ink-2`) |
| Imágenes | Copiar el original aprobado en `referencias/fotos-originales/marina-gold-imagenes-aprobadas/` y correr `npm run imagenes` (ver "Imágenes"). Textos alternativos en `data/imagenes.ts` |

Los textos marcados con `TODO` en el código son de ejemplo y aún no están confirmados.

## Imágenes

Las fotos aprobadas llegan en JPG de alta resolución y **no se tocan**: se guardan en
`referencias/fotos-originales/marina-gold-imagenes-aprobadas/` (junto con `LEEME-imagenes.md` y la carpeta
`packaging/`, que es solo referencia del diseño de la caja y no va en la web). El sitio usa versiones
optimizadas que genera un script a partir de esos originales.

**Flujo para agregar o cambiar una foto**

1. Copiar el original, con su nombre definitivo (el del documento de imágenes), en la carpeta de originales.
2. Correr:
   ```bash
   npm run imagenes
   ```
   El script (`scripts/optimizar-imagenes.mjs`, con sharp) lee `data/imagenes.ts` y, por cada foto:
   - la lleva al tamaño "Generar a" del documento, recortando lo mínimo y centrado si la proporción no calza exacto;
   - la exporta en WebP (sRGB, sin metadatos), empezando en calidad 80 y bajando como máximo a 72 para quedar bajo 200 KB (350 KB el hero);
   - muestra una tabla con el peso final, la calidad y el recorte, y la lista de fotos pendientes.
3. Revisar en `npm run dev`, hacer commit y `git push` (GitHub Pages se actualiza solo).

Mientras falte un original, el sitio muestra un placeholder con la proporción correcta y el nombre del archivo esperado.
Nombres, destino, tamaño, peso y texto alternativo de cada imagen: `data/imagenes.ts`.

**Estructura de `public/images`**

```
public/images/
  sabores/              sabor-manjar.webp, sabor-maracuya.webp, sabor-fresa.webp      1200 × 1200
  cajas/                caja-surtida.webp, caja-manjar.webp, caja-maracuya.webp,       1000 × 1250
                        caja-coulis-fresa.webp  (+ caja-*-abierta.webp para el hover)
  galeria-surtida/      surtida-galeria-1..5.webp                                     1600 × 2000
  galeria-manjar/       manjar-galeria-1..5.webp          (pendientes)                1600 × 2000
  galeria-maracuya/     maracuya-galeria-1..5.webp        (pendientes)                1600 × 2000
  galeria-coulis-fresa/ coulis-fresa-galeria-1..5.webp    (pendientes)                1600 × 2000
  ocasiones/            ocasion-regalo/-cumpleanos/-aniversario/-antojo.webp           800 × 1000
  hero/                 home-hero.webp (4:5), home-hero-desktop.webp (16:9)  (pendientes)
  marina/               marina.webp                                  (pendiente)      1200 × 1500
  og/                   og-compartir.jpg  (pendiente; vista previa al compartir)      1200 × 630
```

**Dónde se usa cada foto**

| N.º | Original | Dónde va |
| --- | --- | --- |
| 1 · 21 | home-hero.jpg · home-hero-desktop.jpg | Hero de la home (4:5 en móvil, 16:9 desde 768 px) — pendientes |
| 2 · 3 · 4 | sabor-manjar/maracuya/fresa.jpg | Franjas de sabores de la home y "¿Qué hay dentro?" de la ficha |
| 5 a 8 | caja-surtida/manjar/maracuya/coulis-fresa.jpg | Tarjetas de la grilla (home y colección) y miniatura de la barra fija |
| 9 | marina.jpg | "Hecho por Marina" — pendiente |
| 10 a 14 | surtida-galeria-1..5.jpg | Galería de la ficha Surtida (la n.º 13, posición 4, pendiente) |
| 15 a 18 | ocasion-*.jpg | "¿Para qué ocasión?" en la ficha (la n.º 18, Antojo, pendiente) |
| 19 | caja-*-abierta.jpg | Segunda foto al pasar el mouse por la tarjeta — pendientes. El cambio de foto se activa solo cuando existen |
| 20 | {manjar, maracuya, coulis-fresa}-galeria-1..5.jpg | Galerías de las otras fichas — pendientes. Mientras falte la 1, se usa la foto de la tarjeta |
| 22 | og-compartir.jpg | Vista previa al compartir — pendiente, aún no conectada |

## Textos pendientes de confirmar (TODO)

Buscar `TODO` en `data/` y `components/`:

- `data/content.ts`: "Edición Primavera", lista de distritos, "desde mañana", "tarjeta con dedicatoria", respuestas de la FAQ, textos de ejemplo de DELIVERY EN LIMA, CONSERVACIÓN e INGREDIENTES Y ALÉRGENOS, enlaces de WhatsApp, Rappi, PedidosYa, privacidad, "Nuestra historia", redes y páginas legales.
- `data/catalog.ts`: precios, oferta del 10% (S/ 40.50 y S/ 76.50), "caja rígida con lazo" y "Vuelve el viernes".
- `components/PaymentLogos.tsx`: logos oficiales de Yape y Plin.

## Paquete de diseño (`referencias/diseno`)

Diseño aprobado en Claude Design. Se guarda en el repositorio junto al código.

- `notas-de-diseno.md` — dirección visual, tipografías, colores de sabor, componentes con medidas y estados, orden de secciones, tablet/escritorio/menú lateral/animaciones y cambios respecto al pedido original. **Manda en todo lo visual.**
- `tokens.css` — colores, fuentes, tamaños, espaciados, radios y sombras. **Manda junto con las notas.**
- `laminas/` — láminas de referencia: `01-home-movil-3x.png`, `02-ficha-caja-surtida-movil-3x.png`, `03-guia-de-estilo-2x.png`.
- `cortes/` — tramos de ~1125 × 1800 px de las láminas, para revisarlas por partes. Se regeneran con `powershell -ExecutionPolicy Bypass -File scripts/cortar-laminas.ps1`.
- `LEEME-entrega-completa.md` — todo en un solo documento más la revisión de las láminas. Solo de consulta.

Orden de prioridad si algo no coincide: notas y tokens → láminas → prompt del proyecto → sugarpapi.es (solo comportamiento).

Las contradicciones resueltas y las decisiones tomadas durante la construcción están en `referencias/decisiones.md`.

## Conectar una tienda real (futuro)

Los componentes solo leen datos a través de `lib/catalog.ts`. Para migrar, se reemplazan esas funciones por llamadas a la Storefront API de Shopify o a la REST API de WooCommerce, sin tocar los componentes. Cada caja ya está modelada como producto con variantes de tamaño (6 y 12), igual que en ambas plataformas.

Las claves van en `.env.local` (ver `.env.example`). Nunca se guardan claves reales en el repositorio.

## GitHub y ambiente de pruebas

- Repositorio (**público**): <https://github.com/marinagoldpe/marinagoldpe.github.io>, rama `main`, en la organización gratuita `marinagoldpe` (administrada desde la cuenta personal benja2054-creator).
- Ambiente de pruebas en **GitHub Pages**: <https://marinagoldpe.github.io/>
- Versión local: <http://localhost:3000> con `npm run dev`.

Cada cambio se hace en local, se guarda con un commit y se sube con `git push`. El workflow `.github/workflows/pages.yml` vuelve a publicar la página sola en 1–2 minutos (estado en la pestaña **Actions** del repositorio).

Cómo funciona la versión de GitHub Pages: el workflow compila con `GITHUB_PAGES=true`. Eso activa en `next.config.ts` la exportación estática (`out/`) y las imágenes sin optimizar. Como el repositorio se llama `marinagoldpe.github.io`, el sitio vive en la raíz del dominio (sin subruta), porque Pages no tiene servidor. En local no cambia nada. El sitio está marcado para que Google no lo indexe, pero cualquiera con el enlace puede verlo.

Alternativa futura: Vercel, que permite repositorio privado e imágenes optimizadas.

1. ~~Crear el repositorio en GitHub.~~ Hecho.
2. ~~Conectar y subir la rama `main`.~~ Hecho.
3. ~~Publicar el ambiente de pruebas.~~ Hecho, en GitHub Pages.
4. (Opcional) Pasar a Vercel: importar el repositorio, framework Next.js, sin variables de entorno por ahora.
5. Proteger el ambiente de pruebas con acceso restringido si hace falta (la indexación en Google ya está bloqueada).
6. Cuando exista la tienda real, cargar las claves como variables de entorno en la plataforma de hosting, nunca en el código.
