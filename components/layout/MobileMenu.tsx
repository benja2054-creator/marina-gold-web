"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { FlavorColor } from "@/data/catalog";
import { CloseIcon, WhatsAppIcon, socialIcons } from "@/components/icons";
import { FlavorDot } from "@/components/ui/FlavorDot";
import { Logo } from "@/components/layout/Logo";

export interface MenuBox {
  href: string;
  label: string;
  color: FlavorColor | null;
}

interface MobileMenuProps {
  id: string;
  open: boolean;
  onClose: (returnFocus: boolean) => void;
  boxes: MenuBox[];
  groupLabel: string;
  links: { label: string; href: string }[];
  whatsapp: { label: string; href: string };
  socials: readonly { id: keyof typeof socialIcons; label: string; href: string }[];
}

const rowClass =
  "flex min-h-accordion items-center gap-2 border-b border-mg-line text-mg-footer-link font-bold uppercase tracking-button transition-colors duration-fast hover:text-mg-red";

/*
 * Menú lateral [PROPUESTO] (notas §6): entra desde la izquierda, ancho min(88vw, 360px),
 * velo detrás, se cierra con Esc o tocando fuera, foco atrapado dentro.
 */
export function MobileMenu({ id, open, onClose, boxes, groupLabel, links, whatsapp, socials }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose(true);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const closeAfterNavigation = () => onClose(false);

  return (
    // Cerrado: inert (sin foco ni clics) y fuera de pantalla, para poder animar la salida.
    <div inert={!open} className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}>
      <div
        aria-hidden="true"
        onClick={() => onClose(true)}
        className={`absolute inset-0 bg-mg-overlay transition-opacity duration-slow ease-mg ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div
        id={id}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        className={`absolute inset-y-0 left-0 flex w-drawer flex-col overflow-y-auto bg-mg-white shadow-drawer transition-transform duration-slow ease-mg motion-reduce:transition-none ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-header shrink-0 items-center justify-between border-b border-mg-line px-gutter">
          <Logo onClick={closeAfterNavigation} />
          <button
            ref={closeRef}
            type="button"
            onClick={() => onClose(true)}
            aria-label="Cerrar menú"
            className="-mr-2.75 flex h-touch w-touch items-center justify-center"
          >
            <CloseIcon className="h-icon-lg w-icon-lg" />
          </button>
        </div>

        <nav aria-label="Menú principal" className="flex flex-1 flex-col px-gutter pb-8 pt-6">
          <p className="mg-label text-mg-ink-3">{groupLabel}</p>
          <ul>
            {boxes.map((box) => (
              <li key={box.href}>
                <Link href={box.href} onClick={closeAfterNavigation} className={rowClass}>
                  {box.color && <FlavorDot color={box.color} />}
                  {box.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={closeAfterNavigation} className={rowClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={whatsapp.href}
            className="mt-6 flex h-btn-lg items-center justify-center gap-2.5 border border-mg-border px-4.5 text-mg-button font-bold uppercase tracking-button transition-colors duration-fast hover:bg-mg-black hover:text-mg-on-dark"
          >
            <WhatsAppIcon className="h-icon-md w-icon-md" />
            {whatsapp.label}
          </a>

          <ul className="mt-auto flex gap-2 pt-8">
            {socials.map((social) => {
              const Icon = socialIcons[social.id];
              return (
                <li key={social.id}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-touch w-touch items-center justify-center text-mg-black transition-colors duration-fast hover:text-mg-red"
                  >
                    <Icon className="h-social-icon w-social-icon" />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
