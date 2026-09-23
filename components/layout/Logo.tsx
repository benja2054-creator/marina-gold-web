import Link from "next/link";

/* Logo del header: Playfair 700 · 19 · 0.10em, MAYÚSCULAS (notas §2) */
export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Marina Gold, ir al inicio"
      className="flex h-touch items-center whitespace-nowrap font-serif text-mg-logo font-bold uppercase leading-none tracking-logo"
    >
      Marina Gold
    </Link>
  );
}
