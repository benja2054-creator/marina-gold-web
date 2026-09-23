import { notFound } from "next/navigation";
import { Hero } from "@/components/home/Hero";
import { FlavorsSection } from "@/components/home/FlavorsSection";
import { HowToOrderSection } from "@/components/home/HowToOrderSection";
import { MarinaSection } from "@/components/home/MarinaSection";
import { BoxesSection } from "@/components/product/BoxesSection";
import { home, links } from "@/data/content";
import { getCollection, getFlavors } from "@/lib/catalog";
import { imageAsset } from "@/lib/images";

/*
 * Home: orden exacto de la lámina 01 y las notas §5.
 * La barra de anuncio, el header, el newsletter y el footer vienen del layout.
 */
export default async function Home() {
  const [collection, flavors] = await Promise.all([getCollection("todas"), getFlavors()]);
  if (!collection) notFound();

  const { hero, marina, howToOrder } = home;
  const img = (i: { src: string; alt: string; brief: string }) => imageAsset(i.src, i.alt, i.brief);

  return (
    <>
      <Hero
        eyebrow={hero.eyebrow}
        title={hero.title}
        cta={hero.cta}
        ctaHref="#cajas"
        mobile={img(hero.image.mobile)}
        desktop={img(hero.image.desktop)}
      />
      <FlavorsSection
        eyebrow={home.flavors.eyebrow}
        titleLines={home.flavors.titleLines}
        titleAccent={home.flavors.titleAccent}
        flavors={flavors}
      />
      <BoxesSection collection={collection} showViewAll />
      <MarinaSection
        eyebrow={marina.eyebrow}
        title={marina.title}
        titleAccent={marina.titleAccent}
        body={marina.body}
        signature={marina.signature}
        link={{ label: marina.link, href: links.story }}
        image={img(marina.image)}
      />
      <HowToOrderSection
        eyebrow={howToOrder.eyebrow}
        title={howToOrder.title}
        body={howToOrder.body}
        web={{ label: howToOrder.web, href: "/collections/todas" }}
        whatsapp={{ label: howToOrder.whatsapp, href: links.whatsapp }}
        rappi={{ label: howToOrder.rappi, href: links.rappi }}
        pedidosYa={{ label: howToOrder.pedidosYa, href: links.pedidosYa }}
        districtsLead={howToOrder.districtsLead}
        districts={howToOrder.districts}
      />
    </>
  );
}
