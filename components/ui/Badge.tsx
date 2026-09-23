import type { BadgeKind } from "@/lib/catalog";

/*
 * Etiquetas sobre fotos (notas §4): 9.5/700/0.12em, MAYÚSCULAS.
 * Padding 5 × 8, o 4 × 7 si llevan borde, para que todas midan lo mismo.
 */
const variants: Record<BadgeKind, string> = {
  bestseller: "bg-mg-black text-mg-on-dark px-2 py-1.25",
  discount: "bg-mg-red text-mg-on-dark px-2 py-1.25",
  new: "bg-mg-white text-mg-ink border border-mg-border px-1.75 py-1",
  soldout: "bg-mg-white text-mg-ink-3 border border-mg-ink-3 px-1.75 py-1",
};

export function Badge({ kind, children, className = "" }: { kind: BadgeKind; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block whitespace-nowrap text-mg-badge font-bold uppercase leading-card tracking-button ${variants[kind]} ${className}`}
    >
      {children}
    </span>
  );
}
