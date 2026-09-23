"use client";

import { useId, useState } from "react";
import { buyButtonFill } from "@/components/ui/buttons";

interface NewsletterProps {
  title: string;
  body: string;
  label: string;
  placeholder: string;
  submit: string;
  consentBefore: string;
  consentLink: string;
  consentAfter: string;
  privacyHref: string;
  error: string;
  consentError: string;
  success: string;
}

/*
 * Newsletter (notas §4 "Campo de correo" y §5 punto 9): fondo amarillo maracuyá,
 * padding 32 · 16 · 36, título y subtítulo centrados, rótulo "TU CORREO" unido al campo,
 * campo de 52 con "UNIRME" pegado a la derecha y casilla de 20 en una fila de 44.
 * Error y éxito [PROPUESTO]. Solo se envía con la casilla marcada. Maqueta: no envía nada.
 */
export function Newsletter(t: NewsletterProps) {
  const [status, setStatus] = useState<"idle" | "email-error" | "consent-error" | "done">("idle");
  const emailId = useId();
  const consentId = useId();
  const messageId = useId();

  return (
    <section aria-labelledby="newsletter-titulo" className="bg-mg-maracuya pb-9 pt-8">
      <div className="mg-container lg:max-w-faq">
        <div className="text-center">
          <h2 id="newsletter-titulo" className="mg-h2">
            {t.title}
          </h2>
          <p className="mt-4 text-mg-note leading-body text-mg-ink-2">{t.body}</p>
        </div>

        {status === "done" ? (
          <p role="status" className="mt-6 text-center font-serif text-mg-occasion font-bold">
            {t.success}
          </p>
        ) : (
          <form
            noValidate
            className="mt-5"
            onSubmit={(event) => {
              event.preventDefault();
              const form = event.currentTarget;
              const email = form.elements.namedItem("email") as HTMLInputElement;
              const consent = form.elements.namedItem("consent") as HTMLInputElement;
              if (!email.value || !email.validity.valid) setStatus("email-error");
              else if (!consent.checked) setStatus("consent-error");
              else setStatus("done");
            }}
          >
            <label htmlFor={emailId} className="mg-label block">
              {t.label}
            </label>
            <div
              className={`mt-2.5 flex h-btn-lg border bg-mg-white ${
                status === "email-error" ? "border-mg-red" : "border-mg-border"
              }`}
            >
              <input
                id={emailId}
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder={t.placeholder}
                aria-invalid={status === "email-error"}
                aria-describedby={status === "email-error" ? messageId : undefined}
                className="min-w-0 flex-1 bg-transparent px-3.5 text-mg-body placeholder:text-mg-ink-3 focus-visible:outline-offset-0"
              />
              <button type="submit" className={`${buyButtonFill} shrink-0`}>
                {t.submit}
              </button>
            </div>
            {status === "email-error" && (
              <p id={messageId} className="mt-2 text-mg-small text-mg-red">
                {t.error}
              </p>
            )}

            {/* Casilla de 20 dentro de una fila táctil de al menos 44 (la etiqueta también marca la casilla) */}
            <div className="mt-3 flex min-h-touch items-start gap-3">
              <input
                id={consentId}
                name="consent"
                type="checkbox"
                aria-invalid={status === "consent-error"}
                aria-describedby={status === "consent-error" ? `${consentId}-error` : undefined}
                className="m-0 h-checkbox w-checkbox shrink-0 accent-mg-black"
              />
              <label htmlFor={consentId} className="text-mg-accordion leading-note text-mg-ink-2">
                {t.consentBefore}
                <a href={t.privacyHref} className="text-mg-ink underline">
                  {t.consentLink}
                </a>
                {t.consentAfter}
              </label>
            </div>
            {status === "consent-error" && (
              <p id={`${consentId}-error`} className="text-mg-small text-mg-red">
                {t.consentError}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
