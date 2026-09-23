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
lib/catalog.ts       Funciones de acceso (getProducts, getProductBySlug, getCollection)
lib/pricing.ts       Cálculos de precio (por bombón, "Desde", ahorro, oferta)
lib/images.ts        Detecta si cada foto existe en /public; si no, se muestra el placeholder
styles/tokens.css    Tokens de diseño (copia exacta de referencias/diseno/tokens.css)
styles/tokens-extendidos.css  Medidas de las notas que no están en tokens.css y ajustes tablet/escritorio
public/images/       Fotografías (ver lista abajo)
referencias/diseno/  Paquete de diseño aprobado
scripts/             Utilidades (p. ej. cortar las láminas)
```

## Dónde se edita cada cosa

| Qué | Dónde |
| --- | --- |
| Textos de secciones, FAQ, anuncios, menú, footer, enlaces de redes y WhatsApp | `data/content.ts` |
| Cajas, composición por tamaño (6 y 12), estados (MÁS VENDIDA, NOVEDAD, AGOTADA, % de oferta), descripción | `data/catalog.ts` → `boxes` |
| Sabores (nombre, relleno, cobertura, color, descripción) | `data/catalog.ts` → `flavors` |
| Precios | `data/catalog.ts` → `BASE_PRICES` (en céntimos). El precio por bombón, el "Desde", el ahorro y el precio con oferta se calculan solos en `lib/pricing.ts` |
| Colores, fuentes, tamaños, espaciados, radios, sombras | `styles/tokens.css`. Las variables `--mg-*` se mapean en `tailwind.config.ts` (p. ej. `bg-mg-red`, `text-mg-ink-2`) |
| Imágenes | Suelta los archivos en `public/images/` con el nombre exacto que muestra cada placeholder |

Los textos marcados con `TODO` en el código son de ejemplo y aún no están confirmados.

## Imágenes

Cada imagen se muestra como placeholder con su proporción fija y el nombre de archivo esperado. Al copiar la foto con ese nombre, aparece sin mover la maquetación.

- `public/images/hero-mobile.jpg` (4:5) y `public/images/hero-desktop.jpg` (16:9)
- `public/images/products/[slug]-1.jpg` a `[slug]-5.jpg` (4:5): caja cerrada, caja abierta desde arriba, bombón cortado con el relleno, detalle de textura, ambiente o regalo
- `public/images/flavors/manjar-de-olla.jpg`, `maracuya.jpg`, `coulis-de-fresa.jpg` (1:1)
- `public/images/ocasiones/regalo.jpg`, `cumpleanos.jpg`, `aniversario.jpg`, `antojo.jpg` (4:5)
- `public/images/marina-1.jpg` (4:5)

## Paquete de diseño (`referencias/diseno`)

Diseño aprobado en Claude Design. Se guarda en el repositorio junto al código.

- `notas-de-diseno.md` — dirección visual, tipografías, colores de sabor, componentes con medidas y estados, orden de secciones, tablet/escritorio/menú lateral/animaciones y cambios respecto al pedido original. **Manda en todo lo visual.**
- `tokens.css` — colores, fuentes, tamaños, espaciados, radios y sombras. **Manda junto con las notas.**
- `laminas/` — láminas de referencia: `01-home-movil-3x.png`, `02-ficha-caja-surtida-movil-3x.png`, `03-guia-de-estilo-2x.png`.
- `cortes/` — tramos de ~1125 × 1800 px de las láminas (generados con `scripts/`), para revisarlas por partes.
- `LEEME-entrega-completa.md` — todo en un solo documento más la revisión de las láminas. Solo de consulta.

Orden de prioridad si algo no coincide: notas y tokens → láminas → prompt del proyecto → sugarpapi.es (solo comportamiento).

## Conectar una tienda real (futuro)

Los componentes solo leen datos a través de `lib/catalog.ts`. Para migrar, se reemplazan esas funciones por llamadas a la Storefront API de Shopify o a la REST API de WooCommerce, sin tocar los componentes. Cada caja ya está modelada como producto con variantes de tamaño (6 y 12), igual que en ambas plataformas.

Las claves van en `.env.local` (ver `.env.example`). Nunca se guardan claves reales en el repositorio.

## Pendiente: subir a GitHub y publicar como ambiente de pruebas

> No hacer hasta que se apruebe.

1. Crear un repositorio **privado** vacío en GitHub (sin README ni .gitignore).
2. Conectar y subir:
   ```bash
   git remote add origin https://github.com/<usuario>/marina-gold-web.git
   git branch -M main
   git push -u origin main
   ```
3. Publicar el ambiente de pruebas (por ejemplo en Vercel): importar el repositorio, framework Next.js, sin variables de entorno por ahora.
4. Proteger el ambiente de pruebas (contraseña o acceso restringido) y evitar que Google lo indexe hasta el lanzamiento.
5. Cuando exista la tienda real, cargar las claves como variables de entorno en la plataforma de hosting, nunca en el código.
