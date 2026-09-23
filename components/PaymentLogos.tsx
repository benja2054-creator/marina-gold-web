import { siVisa } from "simple-icons";

/*
 * Medios de pago del footer: fichas de 56 × 36, radio 4, gap 8 (notas §4).
 * - Visa: wordmark vigente en azul Visa #1434CB (no el logo antiguo de las láminas).
 * - Mastercard: símbolo vigente de dos círculos (rojo, amarillo y naranja en la intersección).
 * - Yape y Plin: fichas PROVISIONALES con su color (decisiones.md punto D).
 *   TODO: reemplazar por los SVG oficiales del kit de marca de Yape y Plin.
 * Los colores de marca van dentro de los SVG porque son parte del logo, no del sistema.
 */

function Chip({ label, dark = false, children }: { label: string; dark?: boolean; children: React.ReactNode }) {
  return (
    <li
      className={`flex h-pay-h w-pay-w items-center justify-center overflow-hidden rounded-pay ${
        dark ? "" : "bg-mg-white"
      }`}
    >
      <span className="sr-only">{label}</span>
      {children}
    </li>
  );
}

function Visa() {
  return (
    // viewBox recortado al alto del wordmark para que ocupe la ficha como en las láminas
    <svg viewBox="-1 6.5 26 11" className="h-full w-full px-1.5 py-2" aria-hidden="true" focusable="false">
      <path d={siVisa.path} fill="#1434CB" />
    </svg>
  );
}

function Mastercard() {
  return (
    <svg viewBox="0 0 38 24" className="h-full w-full py-2" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="11.5" fill="#EB001B" />
      <circle cx="26" cy="12" r="11.5" fill="#F79E1B" />
      <path d="M19 2.87a11.5 11.5 0 0 1 0 18.26 11.5 11.5 0 0 1 0-18.26Z" fill="#FF5F00" />
    </svg>
  );
}

/* TODO: provisional hasta tener el SVG oficial de Yape. */
function YapeProvisional() {
  return (
    <svg viewBox="0 0 56 36" className="h-full w-full" aria-hidden="true" focusable="false">
      <rect width="56" height="36" fill="#742284" />
      <text x="28" y="23" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="700" fontStyle="italic" fill="#FFFFFF">
        yape
      </text>
    </svg>
  );
}

/* TODO: provisional hasta tener el SVG oficial de Plin. */
function PlinProvisional() {
  return (
    <svg viewBox="0 0 56 36" className="h-full w-full" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="plin-provisional" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00D1B2" />
          <stop offset="1" stopColor="#0A7CFF" />
        </linearGradient>
      </defs>
      <circle cx="28" cy="18" r="13" fill="url(#plin-provisional)" />
      <text x="28" y="22" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="700" fill="#FFFFFF">
        plin
      </text>
    </svg>
  );
}

export function PaymentLogos({ label }: { label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      <Chip label="Visa">
        <Visa />
      </Chip>
      <Chip label="Mastercard">
        <Mastercard />
      </Chip>
      <Chip label="Yape" dark>
        <YapeProvisional />
      </Chip>
      <Chip label="Plin">
        <PlinProvisional />
      </Chip>
    </ul>
  );
}
