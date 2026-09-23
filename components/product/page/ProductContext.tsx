"use client";

import { createContext, useContext, useRef, useState, type RefObject } from "react";
import type { BoxSize, Product, Variant } from "@/lib/catalog";

/*
 * Estado compartido de la ficha: el tamaño elegido actualiza el precio, el "por bombón",
 * los ×2/×4 de "¿Qué hay dentro?" y la barra fija (notas §4, "Selector de tamaño").
 */
interface ProductState {
  product: Product;
  variant: Variant;
  setSize: (size: BoxSize) => void;
  /** Botón principal "AÑADIR AL CARRITO": la barra fija aparece cuando sale de pantalla */
  addButtonRef: RefObject<HTMLButtonElement | null>;
  cartNotice: boolean;
  showCartNotice: () => void;
}

const ProductContext = createContext<ProductState | null>(null);

// Las láminas muestran elegida la caja de 12 (notas §7, punto 11)
const DEFAULT_SIZE: BoxSize = 12;

export function ProductProvider({ product, children }: { product: Product; children: React.ReactNode }) {
  const [size, setSize] = useState<BoxSize>(DEFAULT_SIZE);
  const [cartNotice, setCartNotice] = useState(false);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const variant = product.variants.find((v) => v.size === size) ?? product.variants[0];

  return (
    <ProductContext.Provider
      value={{ product, variant, setSize, addButtonRef, cartNotice, showCartNotice: () => setCartNotice(true) }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProduct debe usarse dentro de ProductProvider");
  return ctx;
}
