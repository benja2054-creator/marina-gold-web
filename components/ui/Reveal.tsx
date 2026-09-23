"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Aparición al hacer scroll [PROPUESTO] (notas §6): fundido y 12 px hacia arriba, 400 ms, una sola vez.
 * Lo que ya está en pantalla al cargar no se anima. Sin JavaScript todo se ve normal.
 * Con prefers-reduced-motion solo cambia la opacidad, sin movimiento (globals.css).
 */
export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"static" | "hidden" | "shown">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    // Se oculta solo después de medir en el cliente
    setState("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal={state} className={`mg-reveal ${className}`}>
      {children}
    </div>
  );
}
