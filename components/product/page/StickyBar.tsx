"use client";

import { useEffect, useState } from "react";
import { boxBg } from "@/lib/flavor-styles";
import { formatPrice } from "@/lib/pricing";
import { productPage as t } from "@/data/content";
import { buyButtonCompact } from "@/components/ui/buttons";
import { Photo } from "@/components/ui/Photo";
import { useProduct } from "@/components/product/page/ProductContext";

/*
 * Barra fija inferior (notas §4): alto 76, blanco, línea superior y la única sombra del sitio.
 * Miniatura 44 × 55 (la Surtida con sus franjas), nombre y "12 bombones · S/ 85.00", botón AÑADIR de 48.
 * Aparece deslizándose (250 ms) cuando el botón principal sale de pantalla por arriba y se va
 * cuando vuelve a verse. Respeta el área segura inferior. No se muestra desde 1024 (notas §6).
 */
export function StickyBar() {
  const { product, variant, addButtonRef, showCartNotice } = useProduct();
  const [visible, setVisible] = useState(false);
  const soldOut = !product.available;

  useEffect(() => {
    const target = addButtonRef.current;
    if (!target || !("IntersectionObserver" in window)) return;
    // El header es fijo: el botón deja de verse cuando pasa por debajo de él, no del borde de la ventana.
    const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--mg-header-h")) || 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting && entry.boundingClientRect.top < headerHeight);
      },
      { rootMargin: `-${headerHeight}px 0px 0px 0px` },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [addButtonRef]);

  return (
    <div
      data-visible={visible}
      inert={!visible}
      className={`mg-sticky-bar fixed inset-x-0 bottom-0 z-30 border-t border-mg-line bg-mg-white pb-safe-bottom shadow-sticky transition-transform duration-base ease-mg lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex h-sticky max-w-product items-center gap-3 px-3">
        {product.images[0].exists ? (
          <Photo image={product.images[0]} ratio="box" bg={boxBg(product.colors)} sizes="44px" className="w-thumb-w shrink-0" />
        ) : (
          <span aria-hidden="true" className={`h-thumb-h w-thumb-w shrink-0 ${boxBg(product.colors)}`} />
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-serif text-mg-sticky-name font-bold uppercase leading-card">{product.title}</p>
          <p className="text-mg-sticky-meta text-mg-ink-2">
            {variant.title} · <strong className="font-bold text-mg-ink">{formatPrice(variant.price)}</strong>
          </p>
        </div>
        <button
          type="button"
          disabled={soldOut}
          onClick={showCartNotice}
          className={`${buyButtonCompact} shrink-0`}
        >
          {soldOut ? t.soldOut : t.addShort}
        </button>
      </div>
    </div>
  );
}
