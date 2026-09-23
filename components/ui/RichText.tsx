/*
 * Texto con **negrita** y saltos de línea (\n), para las descripciones escritas en data/catalog.ts.
 * Con una tienda real esto vendrá como HTML de Shopify/WooCommerce.
 */
export function RichText({ text }: { text: string }) {
  return (
    <p>
      {text.split("\n").map((line, i) => (
        <span key={i} className="block">
          {line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
            part.startsWith("**") ? (
              <strong key={j} className="font-bold text-mg-ink">
                {part.slice(2, -2)}
              </strong>
            ) : (
              part
            ),
          )}
        </span>
      ))}
    </p>
  );
}
