import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Newsletter } from "@/components/layout/Newsletter";
import { announcement, brand, desktopNav, drawerMenu, footer, links, newsletter, socials, ui } from "@/data/content";
import { getProducts } from "@/lib/catalog";
import { SITE_URL, shareMetadata } from "@/lib/seo";
import "./globals.css";

/*
 * Tipografías con next/font: se descargan al compilar y se sirven desde el propio sitio.
 * Ambas son variables, así que cubren los pesos de las notas §2:
 * Playfair Display 400 itálica, 700 y 800 · DM Sans 400, 500 y 700.
 */
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--mg-font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--mg-font-dmsans",
  display: "swap",
});

const SITE_TITLE = `${brand.name} · Bombones artesanales en Lima`;
const SITE_DESCRIPTION =
  "Bombones artesanales premium hechos a mano en Lima: manjar de olla, maracuyá y coulis de fresa, en cajas de 6 y 12.";

/*
 * Metadatos base. La URL del sitio sale de NEXT_PUBLIC_SITE_URL (ver lib/seo.ts y .env.example).
 * Open Graph y Twitter (vista previa al compartir, n.º 22) de la home; cada página define los suyos.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s · ${brand.name}`,
  },
  description: SITE_DESCRIPTION,
  ...shareMetadata({ title: SITE_TITLE, description: SITE_DESCRIPTION, path: "/" }),
  // Maqueta: que Google no la indexe hasta el lanzamiento.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#111111",
};

/** Solo visual: número del contador del carrito como en las láminas */
const CART_COUNT_MOCK = 2;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const products = await getProducts();
  const assorted = products.filter((p) => p.isAssorted);
  const single = products.filter((p) => !p.isAssorted);
  const menuBoxes = [
    { href: "/collections/todas", label: drawerMenu.allBoxesLabel, color: null },
    ...[...assorted, ...single].map((p) => ({
      href: `/products/${p.slug}`,
      label: p.name,
      color: p.isAssorted ? null : p.colors[0],
    })),
  ];

  return (
    <html lang="es-PE" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:bg-mg-black focus:p-3 focus:text-mg-on-dark"
        >
          {ui.skipToContent}
        </a>
        <AnnouncementBar text={announcement} />
        <Header
          nav={desktopNav}
          menu={{
            boxes: menuBoxes,
            groupLabel: drawerMenu.boxesGroupLabel,
            links: drawerMenu.links,
            whatsapp: { label: drawerMenu.whatsappLabel, href: links.whatsapp },
          }}
          socials={socials}
          cartCount={CART_COUNT_MOCK}
        />
        <main id="contenido">{children}</main>
        <Newsletter {...newsletter} privacyHref={links.privacy} />
        <Footer
          legal={footer.legal}
          legalLabel={footer.legalLabel}
          socials={socials}
          socialLabel={footer.socialLabel}
          paymentsLabel={footer.paymentsLabel}
          copyright={footer.copyright}
        />
      </body>
    </html>
  );
}
