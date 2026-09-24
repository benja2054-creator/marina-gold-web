"use client";

import { useSyncExternalStore } from "react";

// Mismo criterio que hoverOnlyWhenSupported de Tailwind: mouse o trackpad, no pantallas táctiles
const QUERY = "(hover: hover) and (pointer: fine)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/*
 * Capa de la foto del hover de la tarjeta. Solo se monta en dispositivos con hover: en celulares y
 * tablets táctiles el hover no se ve, así que la segunda foto ni se descarga. En el HTML estático
 * (sin JavaScript todavía) tampoco está; aparece al hidratar.
 */
export function HoverLayer({ children }: { children: React.ReactNode }) {
  const canHover = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
  if (!canHover) return null;
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 opacity-0 transition-opacity duration-base ease-mg group-hover:opacity-100 motion-reduce:transition-none"
    >
      {children}
    </div>
  );
}
