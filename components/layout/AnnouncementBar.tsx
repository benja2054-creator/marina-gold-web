/* Barra de anuncio: 32 de alto, negro, texto blanco centrado 10.5/500/0.14em (notas §4). No es fija. */
export function AnnouncementBar({ text }: { text: string }) {
  return (
    <div className="flex h-announce items-center justify-center bg-mg-black px-2 text-mg-on-dark">
      <p className="truncate text-mg-announce font-medium uppercase leading-none tracking-label">{text}</p>
    </div>
  );
}
