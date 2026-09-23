"use client";

import { useId, useState } from "react";
import { CheckIcon, ClockIcon, MinusIcon, PlusIcon } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { buyButton } from "@/components/ui/buttons";
import { NotifyMe } from "@/components/product/NotifyMe";
import { useProduct } from "@/components/product/page/ProductContext";
import { productPage as t } from "@/data/content";
import { formatPrice, formatSavings } from "@/lib/pricing";

const MAX_QUANTITY = 10; // [PROPUESTO] notas §4, "Cantidad"

/*
 * Información y compra (notas §5, ficha punto 3): etiqueta, nombre, subtítulo, precio con
 * "por bombón", selector de tamaño, cantidad + AÑADIR AL CARRITO en la misma fila y línea de entrega.
 */
export function PurchasePanel() {
  const { product, variant, setSize, addButtonRef, cartNotice, showCartNotice } = useProduct();
  const [quantity, setQuantity] = useState(1);
  const sizeLabelId = useId();
  const soldOut = !product.available;
  const largest = product.variants[product.variants.length - 1];

  return (
    <div className="flex flex-col px-gutter pb-6 pt-5 lg:px-0 lg:pt-0">
      {product.badge && (
        <div className="flex">
          <Badge kind={product.badge.kind}>{product.badge.label}</Badge>
        </div>
      )}
      <h1 className="mt-2.5 font-serif text-mg-h1 font-extrabold uppercase leading-tight tracking-h1">{product.title}</h1>
      <p className="mt-2 text-mg-subtitle text-mg-ink-2">{product.subtitle}</p>

      <p className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className={`text-mg-price-lg font-bold ${variant.compareAtPrice ? "text-mg-red" : ""}`}>
          {formatPrice(variant.price)}
        </span>
        {variant.compareAtPrice && (
          <del className="text-mg-small text-mg-ink-3">
            <span className="sr-only">{t.previousPrice} </span>
            {formatPrice(variant.compareAtPrice)}
          </del>
        )}
        <span className="text-mg-small text-mg-ink-3">
          {formatPrice(variant.pricePerUnit)} {t.perUnit}
        </span>
      </p>

      {/* Selector de tamaño: radios nativos con estilo de tarjeta */}
      <fieldset className="mt-3" aria-labelledby={sizeLabelId}>
        <legend id={sizeLabelId} className="mg-label">
          {t.sizeLabel}
        </legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {product.variants.map((option) => {
            const selected = option.size === variant.size;
            const showSavings = option === largest && product.bulkSavings > 0 && product.variants.length > 1;
            return (
              <label
                key={option.id}
                className={`relative flex h-option flex-col items-center justify-center gap-0.5 text-center transition-colors duration-fast has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-focus has-[:focus-visible]:outline-mg-focus ${
                  soldOut
                    ? "mg-striped cursor-not-allowed border border-mg-ink-3 text-mg-ink-3"
                    : selected
                      ? "cursor-pointer border-2 border-mg-black bg-mg-black text-mg-on-dark"
                      : "cursor-pointer border border-mg-border bg-mg-white hover:border-2"
                }`}
              >
                <input
                  type="radio"
                  name={`size-${product.slug}`}
                  value={option.size}
                  checked={selected}
                  disabled={soldOut}
                  onChange={() => setSize(option.size)}
                  className="sr-only"
                />
                <span className="flex items-center gap-1.5 text-mg-small font-bold uppercase tracking-option">
                  {selected && !soldOut && <CheckIcon className="h-icon-xs w-icon-xs" />}
                  {option.title}
                </span>
                <span
                  className={`text-mg-small ${soldOut ? "" : selected ? "text-mg-on-dark-soft" : "text-mg-ink-3"}`}
                >
                  {formatPrice(option.price)}
                </span>
                {showSavings && !soldOut && (
                  <Badge kind="discount" className="absolute -top-2.25 right-2.5">
                    {t.savingsPrefix} {formatSavings(product.bulkSavings)}
                  </Badge>
                )}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-4 flex gap-2">
        <div role="group" aria-label={t.quantityLabel} className="flex h-btn-lg shrink-0 border border-mg-border">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={soldOut || quantity <= 1}
            aria-label={t.decrease}
            className="flex w-qty-cell items-center justify-center disabled:text-mg-ink-3"
          >
            <MinusIcon className="h-icon-sm w-icon-sm" />
          </button>
          <output aria-live="polite" className="flex w-qty-value items-center justify-center text-mg-body font-bold">
            {quantity}
          </output>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))}
            disabled={soldOut || quantity >= MAX_QUANTITY}
            aria-label={t.increase}
            className="flex w-qty-cell items-center justify-center disabled:text-mg-ink-3"
          >
            <PlusIcon className="h-icon-sm w-icon-sm" />
          </button>
        </div>
        <button
          ref={addButtonRef}
          type="button"
          disabled={soldOut}
          onClick={showCartNotice}
          className={`${buyButton} flex-1`}
        >
          {soldOut ? t.soldOut : t.addToCart}
        </button>
      </div>

      <p role="status" className="text-mg-small text-mg-ink-3 empty:hidden">
        {cartNotice ? <span className="mt-2 block">{t.mockCartNotice}</span> : null}
      </p>

      {soldOut ? (
        <div className="mt-4 flex flex-col gap-3">
          {product.restockNote && <p className="text-mg-note text-mg-ink-2">{product.restockNote}</p>}
          <NotifyMe productName={product.title} />
        </div>
      ) : (
        <p className="mt-3 flex items-center gap-2 text-mg-note text-mg-ink-2">
          <ClockIcon className="h-icon-sm w-icon-sm shrink-0" />
          <span>
            {t.delivery.before}
            <strong className="font-bold text-mg-ink">{t.delivery.strong}</strong>
            {t.delivery.after}
          </span>
        </p>
      )}
    </div>
  );
}
