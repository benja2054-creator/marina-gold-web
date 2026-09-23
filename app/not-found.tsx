import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { primaryButton, secondaryButton } from "@/components/ui/buttons";
import { notFound as t } from "@/data/content";

export const metadata: Metadata = { title: "Página no encontrada" };

/* 404 con el mismo sistema: antetítulo rojo, título H2 con remate en itálica y botones de la sección 4. */
export default function NotFound() {
  return (
    <section aria-labelledby="error-titulo" className="pb-section-bottom pt-section-top">
      <div className="mg-container max-w-faq">
        <p className="mg-eyebrow">{t.eyebrow}</p>
        <h1 id="error-titulo" className="mg-h2 mt-2">
          {t.title} <span className="mg-accent block">{t.titleAccent}</span>
        </h1>
        <p className="mt-4 text-mg-body leading-body text-mg-ink-2">{t.body}</p>
        <div className="mt-6 flex flex-col gap-2.5 md:flex-row">
          <Link href="/collections/todas" className={`${primaryButton} justify-between md:flex-1`}>
            {t.cta}
            <ArrowRightIcon className="h-icon-sm w-icon-sm" />
          </Link>
          <Link href="/" className={`${secondaryButton} md:flex-1`}>
            {t.home}
          </Link>
        </div>
      </div>
    </section>
  );
}
