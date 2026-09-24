/*
 * Barra de anuncio: 32 de alto, negro, texto blanco centrado 10.5/500/0.14em (notas §4). No es fija.
 * El texto nunca se corta: por debajo de 375 px el tracking baja a 0.10em para que quepa en una
 * línea, y si aun así no cabe pasa a dos líneas (la barra crece).
 */
export function AnnouncementBar({ text }: { text: string }) {
  return (
    <div className="flex min-h-announce items-center justify-center bg-mg-black px-2 py-1 text-mg-on-dark">
      <p className="text-center text-mg-announce font-medium uppercase leading-card tracking-label max-[374px]:tracking-option">
        {text}
      </p>
    </div>
  );
}
