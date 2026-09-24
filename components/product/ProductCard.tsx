import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { boxBg } from "@/lib/flavor-styles";
import { formatPrice } from "@/lib/pricing";
import { productCard as t } from "@/data/content";
import { Badge } from "@/components/ui/Badge";
import { Photo } from "@/components/ui/Photo";
import { NotifyMe } from "@/components/product/NotifyMe";

// Ancho real de la tarjeta: 2 columnas en móvil (166 a 375 px), 344 en tablet, 282 en escritorio (1440)
const SIZES = "(min-width: 1024px) 282px, (min-width: 768px) 344px, calc(50vw - 22px)";

/*
 * Tarjeta de caja (notas §4): foto 4:5 con el color del sabor (la Surtida con sus tres franjas),
 * y debajo, a 10 px: nombre, "6 y 12 bombones" y "Desde S/ 45.00", a 4 px entre sí.
 * Toda la tarjeta enlaza a la ficha, salvo la agotada (decisiones.md punto B).
 * Hover [PROPUESTO]: fundido de 250 ms a la segunda foto (caja abierta, n.º 19), si existe.
 * - Solo con puntero fino (hoverOnlyWhenSupported): en pantallas táctiles no se activa ni queda trabada.
 * - Con prefers-reduced-motion el cambio es instantáneo, sin fundido.
 * - En la agotada también hay hover, y el velo blanco del 55% va encima de ambas fotos.
 */
export function ProductCard({ product, titleAs: Title = "h3" }: { product: Product; titleAs?: "h2" | "h3" }) {
  const bg = boxBg(product.colors);
  const soldOut = !product.available;
  const sizesLine = `${product.variants.map((v) => v.size).join(" y ")} ${t.unitsSuffix}`;
  const hasHover = product.hoverImage.exists;

  const photo = (
    <Photo image={product.cardImage} ratio="box" bg={bg} sizes={SIZES}>
      {hasHover && (
        // Capa del hover: el contenedor se posiciona; Photo ocupa todo su alto.
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 transition-opacity duration-base ease-mg group-hover:opacity-100 motion-reduce:transition-none"
        >
          <Photo image={product.hoverImage} ratio="free" bg={bg} sizes={SIZES} decorative className="h-full" />
        </div>
      )}
      {/* Después de la capa del hover: el velo cubre también la foto abierta */}
      {soldOut && <div aria-hidden="true" className="absolute inset-0 bg-mg-soldout-veil" />}
      {product.badge && (
        <Badge kind={product.badge.kind} className="absolute left-2 top-2">
          {product.badge.label}
        </Badge>
      )}
    </Photo>
  );

  const info = (
    <div className="mt-2.5 flex flex-col gap-1">
      <Title
        className={`font-serif text-mg-card-title font-bold uppercase leading-card tracking-card ${
          soldOut ? "text-mg-ink-3" : ""
        }`}
      >
        {product.name}
      </Title>
      <p className="text-mg-small text-mg-ink-3">{soldOut && product.restockNote ? product.restockNote : sizesLine}</p>
      {!soldOut && (
        <p className="flex flex-wrap items-baseline gap-x-2 text-mg-price font-bold">
          <span className={product.minCompareAtPrice ? "text-mg-red" : ""}>
            {t.from} {formatPrice(product.minPrice)}
          </span>
          {product.minCompareAtPrice && (
            <del className="text-mg-small font-normal text-mg-ink-3">
              <span className="sr-only">{t.previousPrice} </span>
              {formatPrice(product.minCompareAtPrice)}
            </del>
          )}
        </p>
      )}
    </div>
  );

  if (soldOut) {
    return (
      <article>
        {/* No es enlace (decisiones.md B), pero la foto conserva el hover */}
        <div className="group">{photo}</div>
        {info}
        <div className="mt-2">
          <NotifyMe productName={product.name} />
        </div>
      </article>
    );
  }

  return (
    <article>
      <Link href={`/products/${product.slug}`} className="group block">
        {photo}
        {info}
      </Link>
    </article>
  );
}
