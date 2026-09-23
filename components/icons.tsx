import type { SVGProps } from "react";
import { siInstagram, siKick, siTiktok, siWhatsapp } from "simple-icons";

/*
 * Íconos de línea (trazo 1.5, o 1.3 en los destacados) y de marca.
 * El tamaño se controla con clases (w-icon-sm h-icon-sm…); el color con text-*.
 * Son decorativos por defecto (aria-hidden): el texto accesible va en el botón.
 */
type IconProps = SVGProps<SVGSVGElement> & { strokeWidth?: number };

function Line({ children, strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

function Brand({ path, ...props }: SVGProps<SVGSVGElement> & { path: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d={path} />
    </svg>
  );
}

export const MenuIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M3 6.5h18M3 12h18M3 17.5h18" />
  </Line>
);

export const SearchIcon = (p: IconProps) => (
  <Line {...p}>
    <circle cx="10.5" cy="10.5" r="7" />
    <path d="M15.5 15.5 21 21" />
  </Line>
);

export const BagIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M4.5 8h15l-1.2 13H5.7L4.5 8Z" />
    <path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" />
  </Line>
);

export const CloseIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M5 5l14 14M19 5 5 19" />
  </Line>
);

export const PlusIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M12 4v16M4 12h16" />
  </Line>
);

export const MinusIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M4 12h16" />
  </Line>
);

export const CheckIcon = (p: IconProps) => (
  <Line strokeWidth={2} {...p}>
    <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
  </Line>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M3 12h18M14 5l7 7-7 7" />
  </Line>
);

export const BellIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15L6 16.5Z" />
    <path d="M10 20.5a2 2 0 0 0 4 0" />
  </Line>
);

export const ClockIcon = (p: IconProps) => (
  <Line {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </Line>
);

export const PinIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M12 21.5s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Line>
);

export const ScooterIcon = (p: IconProps) => (
  <Line {...p}>
    <circle cx="5.5" cy="17" r="2.5" />
    <circle cx="18.5" cy="17" r="2.5" />
    <path d="M8 17h6.5l2-7H14M16.5 10l2 4.5M3 13.5h7l1.5 3.5" />
    <path d="M14 5.5h3.5l-1 4.5" />
  </Line>
);

export const HandIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M8 12V5.5a1.5 1.5 0 0 1 3 0V11" />
    <path d="M11 10.5V4a1.5 1.5 0 0 1 3 0v6.5" />
    <path d="M14 10.5V5.5a1.5 1.5 0 0 1 3 0V13" />
    <path d="M8 12V9.5a1.5 1.5 0 0 0-3 0V15a7 7 0 0 0 7 7h.5a6.5 6.5 0 0 0 6.5-6.5V9a1.5 1.5 0 0 0-3 0" />
  </Line>
);

export const LeafIcon = (p: IconProps) => (
  <Line {...p}>
    <path d="M5 19C4 11 9 5 20 4c0 11-6 16-15 15Z" />
    <path d="M5 19 14 10" />
  </Line>
);

export const GiftIcon = (p: IconProps) => (
  <Line {...p}>
    <rect x="3.5" y="8" width="17" height="4" />
    <path d="M5 12v9h14v-9M12 8v13" />
    <path d="M12 8C10.5 4 6.5 4.5 7 6.5S10.5 8 12 8Zm0 0c1.5-4 5.5-3.5 5-1.5S13.5 8 12 8Z" />
  </Line>
);

export const TikTokIcon = (p: SVGProps<SVGSVGElement>) => <Brand path={siTiktok.path} {...p} />;
export const InstagramIcon = (p: SVGProps<SVGSVGElement>) => <Brand path={siInstagram.path} {...p} />;
export const KickIcon = (p: SVGProps<SVGSVGElement>) => <Brand path={siKick.path} {...p} />;
export const WhatsAppIcon = (p: SVGProps<SVGSVGElement>) => <Brand path={siWhatsapp.path} {...p} />;

export const socialIcons = {
  tiktok: TikTokIcon,
  instagram: InstagramIcon,
  kick: KickIcon,
} as const;
