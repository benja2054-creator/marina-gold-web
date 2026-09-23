import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Accordion } from "@/components/ui/Accordion";
import { RichText } from "@/components/ui/RichText";
import { Gallery } from "@/components/product/page/Gallery";
import { Highlights } from "@/components/product/page/Highlights";
import { InsideSection } from "@/components/product/page/InsideSection";
import { Occasions } from "@/components/product/page/Occasions";
import { ProductProvider } from "@/components/product/page/ProductContext";
import { PurchasePanel } from "@/components/product/page/PurchasePanel";
import { StickyBar } from "@/components/product/page/StickyBar";
import { brand, productPage } from "@/data/content";
import { getProductBySlug, getProductSlugs } from "@/lib/catalog";
import { imageAsset } from "@/lib/images";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProductSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug((await params).slug);
  if (!product) return {};
  return { title: product.title, description: `${product.subtitle}. ${product.description[0]}` };
}

/*
 * Ficha de caja (lámina 02 y notas §5). Misma plantilla para las 4 cajas.
 * Móvil: galería, compra, destacados, desplegables, ¿Qué hay dentro?, ocasiones, FAQ y barra fija.
 * Tablet: una columna de 600 centrada. Escritorio: galería (58%) + columna de compra pegajosa.
 */
export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug((await params).slug);
  if (!product) notFound();

  const accordions = [
    { title: productPage.descriptionTitle, content: product.description.map((p) => <RichText key={p} text={p} />) },
    ...productPage.accordions.map((a) => ({ title: a.title, content: a.body.map((p) => <p key={p}>{p}</p>) })),
  ];
  const occasions = productPage.occasions.items.map((o) => ({ ...o, image: imageAsset(o.image.src, o.image.alt, o.image.brief) }));
  const faq = productPage.faq.items.map((f) => ({ title: f.q, content: <p>{f.a}</p> }));

  // Datos estructurados para Google (schema.org/Product)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.subtitle,
    brand: { "@type": "Brand", name: brand.name },
    offers: product.variants.map((v) => ({
      "@type": "Offer",
      name: v.title,
      price: (v.price / 100).toFixed(2),
      priceCurrency: "PEN",
      availability: v.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    })),
  };

  return (
    <ProductProvider product={product}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto md:max-w-product lg:mg-container lg:grid lg:grid-cols-[58fr_42fr] lg:items-start lg:gap-12 lg:pt-8">
        <Gallery images={product.images} title={product.title} />
        <div className="lg:sticky lg:top-header">
          <PurchasePanel />
          <Highlights items={productPage.highlights} />
          <div className="px-gutter pt-2 lg:px-0">
            <Accordion items={accordions} defaultOpen={[0]} />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <InsideSection />
      </div>
      <Occasions title={productPage.occasions.title} items={occasions} />

      <section id="preguntas" aria-labelledby="preguntas-titulo" className="border-t border-mg-line pb-section-bottom pt-section-top">
        <div className="mg-container lg:max-w-faq">
          <h2 id="preguntas-titulo" className="mg-h2">
            {productPage.faq.title}
          </h2>
          <div className="mt-2">
            <Accordion items={faq} defaultOpen={[0]} variant="faq" />
          </div>
        </div>
      </section>

      <StickyBar />
    </ProductProvider>
  );
}
