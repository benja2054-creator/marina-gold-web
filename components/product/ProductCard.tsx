import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { boxBg } from "@/lib/flavor-styles";
import { formatPrice } from "@/lib/pricing";
import { productCard as t } from "@/data/content";
import { Badge } from "@/components/ui/Badge";
import { Photo } from "@/components/ui/Photo";
import { NotifyMe } from "@/components/product/NotifyMe";

const SIZES = "(min-width: 1024px) 282px, (min-width: 768px) 352px, 50vw";

/*
 * Tarjeta de caja (notas §4): foto 4:5 con el color del sabor (la Surtida con sus tres franjas),
 * y debajo, a 10 px: nombre, "6 y 12 bombones" y "Desde S/ 45.00", a 4 px entre sí.
 * Toda la tarjeta enlaza a la ficha, salvo la agotada (decisiones.md punto B).
 * Hover [PROPUESTO]: fundido de 250 ms a la segunda foto (caja abierta).
 */
export function ProductCard({ product, titleAs: Title = "h3" }: { product: Product; titleAs?: "h2" | "h3" }) {
  const bg = boxBg(product.colors);
  const soldOut = !product.available;
  const sizesLine = `${product.variants.map((v) => v.size).join(" y ")} ${t.unitsSuffix}`;

  const photo = (
    <Photo image={product.images[0]} ratio="box" bg={bg} sizes={SIZES}>
      {!soldOut && (
        // Capa del hover: el contenedor se posiciona; Photo ocupa todo su alto.
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 transition-opacity duration-base group-hover:opacity-100"
        >
          <Photo image={product.images[1]} ratio="free" bg={bg} sizes={SIZES} decorative className="h-full" />
        </div>
      )}
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
        {photo}
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
