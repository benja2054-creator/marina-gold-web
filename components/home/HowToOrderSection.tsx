import Link from "next/link";
import { ArrowRightIcon, BagIcon, PinIcon, ScooterIcon, WhatsAppIcon } from "@/components/icons";
import { primaryButton, secondaryButton } from "@/components/ui/buttons";
import { Reveal } from "@/components/ui/Reveal";

interface HowToOrderProps {
  eyebrow: string;
  title: string;
  body: string;
  web: { label: string; href: string };
  whatsapp: { label: string; href: string };
  rappi: { label: string; href: string };
  pedidosYa: { label: string; href: string };
  districtsLead: string;
  districts: string;
}

/*
 * Cómo pedir (notas §5 punto 8): blanco con línea superior.
 * Botones apilados (gap 10): web (negro), WhatsApp (borde) y Rappi | PedidosYa en 2 columnas.
 * Escritorio: los 4 botones en una fila.
 */
export function HowToOrderSection(props: HowToOrderProps) {
  const { eyebrow, title, body, web, whatsapp, rappi, pedidosYa, districtsLead, districts } = props;
  return (
    <section id="como-pedir" aria-labelledby="como-pedir-titulo" className="border-t border-mg-line pb-section-bottom pt-section-top">
      <Reveal className="mg-container">
        <p className="mg-eyebrow">{eyebrow}</p>
        <h2 id="como-pedir-titulo" className="mg-h2 mt-2">
          {title}
        </h2>
        <p className="mt-2.5 text-mg-body leading-body text-mg-ink-2">{body}</p>

        <div className="mt-6 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          <Link href={web.href} className={`${primaryButton} col-span-2 justify-start gap-4 lg:col-span-1`}>
            <BagIcon className="h-icon-md w-icon-md shrink-0" />
            <span>{web.label}</span>
            <ArrowRightIcon className="ml-auto h-icon-sm w-icon-sm shrink-0" />
          </Link>
          <a href={whatsapp.href} className={`${secondaryButton} col-span-2 justify-start gap-4 lg:col-span-1`}>
            <WhatsAppIcon className="h-icon-md w-icon-md shrink-0" />
            <span>{whatsapp.label}</span>
            <ArrowRightIcon className="ml-auto h-icon-sm w-icon-sm shrink-0" />
          </a>
          <a href={rappi.href} className={`${secondaryButton} justify-center gap-3`}>
            <ScooterIcon className="h-icon-md w-icon-md shrink-0" />
            {rappi.label}
          </a>
          <a href={pedidosYa.href} className={`${secondaryButton} justify-center gap-3`}>
            <ScooterIcon className="h-icon-md w-icon-md shrink-0" />
            {pedidosYa.label}
          </a>
        </div>

        <p className="mt-7 flex items-start gap-2 text-mg-caption leading-body text-mg-ink-2">
          <PinIcon className="h-icon-md w-icon-md shrink-0 text-mg-red" />
          <span>
            <strong className="font-bold text-mg-ink">{districtsLead}</strong> {districts}
          </span>
        </p>
      </Reveal>
    </section>
  );
}
