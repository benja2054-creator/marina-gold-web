"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { BagIcon, MenuIcon, SearchIcon } from "@/components/icons";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu, type MenuBox } from "@/components/layout/MobileMenu";
import type { socialIcons } from "@/components/icons";
import { ui } from "@/data/content";

interface HeaderProps {
  nav: { label: string; href: string }[];
  menu: {
    boxes: MenuBox[];
    groupLabel: string;
    links: { label: string; href: string }[];
    whatsapp: { label: string; href: string };
  };
  socials: readonly { id: keyof typeof socialIcons; label: string; href: string }[];
  /** Solo visual: la maqueta no tiene carrito real */
  cartCount: number;
}

const iconButton = "relative flex h-touch w-touch items-center justify-center";

/*
 * Header (notas §4 y §6): 56 de alto, blanco, línea inferior, fijo arriba al hacer scroll [PROPUESTO].
 * Móvil: hamburguesa · logo centrado · buscar y carrito.
 * Escritorio (≥1024): logo a la izquierda, navegación al centro, buscar y carrito a la derecha.
 * Los íconos se alinean ópticamente con el gutter: la caja de 44 sobresale 11 px, lo mismo
 * que el espacio entre la caja y el ícono de 22.
 */
export function Header({ nav, menu, socials, cartCount }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) menuButtonRef.current?.focus();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-mg-line bg-mg-white">
      <div className="mg-container grid h-header grid-cols-[1fr_auto_1fr] items-center lg:flex lg:justify-between">
        <div className="-ml-2.75 flex lg:hidden">
          <button
            ref={menuButtonRef}
            type="button"
            className={iconButton}
            aria-label={ui.openMenu}
            aria-expanded={open}
            aria-controls="menu-lateral"
            onClick={() => setOpen(true)}
          >
            <MenuIcon className="h-icon-lg w-icon-lg" />
          </button>
        </div>

        <Logo />

        <nav aria-label={ui.mainNav} className="hidden lg:block">
          <ul className="flex gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex h-touch items-center text-mg-button-sm font-bold uppercase tracking-button transition-colors duration-fast hover:text-mg-red"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="-mr-2.75 flex justify-end">
          <button type="button" className={iconButton} aria-label={ui.search}>
            <SearchIcon className="h-icon-header w-icon-header" />
          </button>
          <button type="button" className={iconButton} aria-label={ui.cart(cartCount)}>
            <BagIcon className="h-icon-header w-icon-header" />
            {cartCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute right-1.5 top-1.75 flex h-cart-count w-cart-count items-center justify-center rounded-pill bg-mg-red text-mg-badge font-bold leading-none text-mg-on-dark"
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <MobileMenu
        id="menu-lateral"
        open={open}
        onClose={close}
        boxes={menu.boxes}
        groupLabel={menu.groupLabel}
        links={menu.links}
        whatsapp={menu.whatsapp}
        socials={socials}
      />
    </header>
  );
}
