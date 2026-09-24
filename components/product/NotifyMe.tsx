"use client";

import { useId, useState } from "react";
import { BellIcon } from "@/components/icons";
import { productCard as t, ui } from "@/data/content";

/*
 * Botón "AVÍSAME" de las cajas agotadas (notas §4): alto 44, borde negro, campana de 15.
 * Al tocarlo abre un campo de correo [PROPUESTO]. Maqueta: no envía nada.
 */
export function NotifyMe({ productName }: { productName: string }) {
  const [state, setState] = useState<"idle" | "open" | "error" | "done">("idle");
  const inputId = useId();
  const errorId = useId();

  if (state === "done") {
    return (
      <p role="status" className="text-mg-small text-mg-ink-2">
        {t.notifySuccess}
      </p>
    );
  }

  if (state === "idle") {
    return (
      <button
        type="button"
        onClick={() => setState("open")}
        aria-label={ui.notifyMeFor(productName)}
        className="flex h-touch w-full items-center justify-center gap-2 border border-mg-border bg-mg-white text-mg-button-sm font-bold uppercase tracking-button transition-colors duration-fast hover:bg-mg-black hover:text-mg-on-dark"
      >
        <BellIcon className="h-icon-bell w-icon-bell" />
        {t.notifyMe}
      </button>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const input = event.currentTarget.elements.namedItem("email") as HTMLInputElement;
        if (input.validity.valid && input.value) {
          setState("done");
        } else {
          // Con error, el foco vuelve al campo y el mensaje se anuncia (role="alert")
          setState("error");
          input.focus();
        }
      }}
      className="flex flex-col gap-1"
    >
      <label htmlFor={inputId} className="sr-only">
        {t.notifyLabel}
      </label>
      <input
        id={inputId}
        name="email"
        type="email"
        autoComplete="email"
        autoFocus
        required
        placeholder={t.notifyPlaceholder}
        aria-invalid={state === "error"}
        aria-describedby={state === "error" ? errorId : undefined}
        className={`h-touch w-full min-w-0 border bg-mg-white px-2.5 text-mg-small placeholder:text-mg-ink-3 ${
          state === "error" ? "border-mg-red" : "border-mg-border"
        }`}
      />
      {state === "error" && (
        <p id={errorId} role="alert" className="text-mg-small text-mg-red">
          {t.notifyError}
        </p>
      )}
      <button
        type="submit"
        className="flex h-touch w-full items-center justify-center bg-mg-black text-mg-button-sm font-bold uppercase tracking-button text-mg-on-dark transition-colors duration-fast hover:bg-mg-black-hover"
      >
        {t.notifySubmit}
      </button>
    </form>
  );
}
