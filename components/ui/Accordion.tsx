"use client";

import { useId, useState } from "react";
import { MinusIcon, PlusIcon } from "@/components/icons";

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Índices abiertos al cargar (DESCRIPCIÓN en la ficha, la primera pregunta en la FAQ) */
  defaultOpen?: number[];
  /** "faq": pregunta en texto normal 14.5/700, fila mínima de 60, respuesta 14/1.6 */
  variant?: "default" | "faq";
}

/*
 * Desplegable (notas §4): fila de 56 a todo el ancho, 12.5/700/0.12em en MAYÚSCULAS,
 * "+"/"−" de 16 a la derecha, línea inferior. Contenido con padding inferior 20, 14.5/1.6.
 * Se pueden abrir varios a la vez [PROPUESTO]. La altura se anima en 250 ms.
 */
export function Accordion({ items, defaultOpen = [], variant = "default" }: AccordionProps) {
  const [open, setOpen] = useState<number[]>(defaultOpen);
  const baseId = useId();
  const faq = variant === "faq";

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        const buttonId = `${baseId}-b${i}`;
        const panelId = `${baseId}-p${i}`;
        return (
          <div key={item.title} className="border-b border-mg-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen((prev) => (isOpen ? prev.filter((x) => x !== i) : [...prev, i]))}
                className={`flex w-full items-center justify-between gap-4 text-left transition-colors duration-fast hover:text-mg-red ${
                  faq
                    ? "min-h-faq-row py-3 text-mg-accordion font-bold leading-note"
                    : "min-h-accordion text-mg-small font-bold uppercase tracking-button"
                }`}
              >
                <span>{item.title}</span>
                {isOpen ? (
                  <MinusIcon className="h-icon-sm w-icon-sm shrink-0" />
                ) : (
                  <PlusIcon className="h-icon-sm w-icon-sm shrink-0" />
                )}
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows] duration-base ease-mg ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <div
                  className={`flex flex-col gap-3 pb-5 text-mg-ink-2 leading-long ${faq ? "text-mg-faq" : "text-mg-accordion"}`}
                >
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
