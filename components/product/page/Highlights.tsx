import { GiftIcon, HandIcon, LeafIcon } from "@/components/icons";

const icons = { hand: HandIcon, leaf: LeafIcon, gift: GiftIcon } as const;

/*
 * Destacados (notas §5, ficha punto 4): tres columnas centradas con líneas arriba y abajo,
 * padding 20 vertical, ícono de línea de 28 (trazo 1.3) y texto 11.5/700 en 2 líneas.
 */
export function Highlights({ items }: { items: { icon: string; lines: string[] }[] }) {
  return (
    <ul className="mx-gutter grid grid-cols-3 border-y border-mg-line py-5 lg:mx-0">
      {items.map((item) => {
        const Icon = icons[item.icon as keyof typeof icons];
        return (
          <li key={item.icon} className="flex flex-col items-center gap-3 text-center">
            <Icon className="h-icon-xl w-icon-xl" strokeWidth={1.3} />
            <span className="text-mg-copyright font-bold uppercase leading-card tracking-button">
              {item.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
