import { socialIcons } from "@/components/icons";
import { PaymentLogos } from "@/components/PaymentLogos";

interface FooterProps {
  legal: { label: string; href: string }[];
  legalLabel: string;
  socials: readonly { id: keyof typeof socialIcons; label: string; href: string }[];
  socialLabel: string;
  paymentsLabel: string;
  copyright: string;
}

/*
 * Footer (notas §4): negro, padding 32 · 16 · 32, gap 32.
 * Móvil: legales · redes · logo gigante · pagos · ©.
 * Escritorio (§6 + decisiones.md A): legales · redes · pagos en 3 columnas, logo gigante a todo el ancho y ©.
 */
export function Footer({ legal, legalLabel, socials, socialLabel, paymentsLabel, copyright }: FooterProps) {
  return (
    <footer className="bg-mg-black text-mg-on-dark">
      <div className="mg-container flex flex-col gap-8 py-8 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:py-12">
        <nav aria-label={legalLabel} className="lg:order-1">
          <ul className="grid grid-cols-2 gap-x-4">
            {legal.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="flex min-h-touch items-center text-mg-footer-link transition-colors duration-fast hover:underline hover:underline-offset-4"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul aria-label={socialLabel} className="flex gap-2 lg:order-2 lg:justify-center">
          {socials.map((social) => {
            const Icon = socialIcons[social.id];
            return (
              <li key={social.id}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-touch w-touch items-center justify-center border border-mg-on-dark-border transition-colors duration-fast hover:bg-mg-white hover:text-mg-black"
                >
                  <Icon className="h-social-icon w-social-icon" />
                </a>
              </li>
            );
          })}
        </ul>

        <p
          aria-hidden="true"
          className="border-t border-mg-on-dark-line pt-7 font-serif text-mg-footer-logo font-extrabold uppercase leading-logo tracking-h1 lg:order-4 lg:col-span-3"
        >
          Marina
          <br className="lg:hidden" /> Gold<span className="text-mg-red">.</span>
        </p>

        <div className="border-t border-mg-on-dark-line pt-5 lg:order-3 lg:border-0 lg:pt-0">
          <PaymentLogos label={paymentsLabel} />
        </div>

        <p className="text-mg-copyright text-mg-on-dark-muted lg:order-5 lg:col-span-3">{copyright}</p>
      </div>
    </footer>
  );
}
