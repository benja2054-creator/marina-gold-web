import type { Metadata } from "next";
import { brand } from "@/data/content";
import { image } from "@/lib/images";

/*
 * Metadatos para compartir (Open Graph y Twitter) y URL absolutas.
 * Todas las páginas usan la misma vista previa (n.º 22, og-compartir.jpg), con su propio título,
 * descripción y URL.
 */

/**
 * URL base del sitio, sin barra final. Orden: NEXT_PUBLIC_SITE_URL (el workflow de GitHub Pages la
 * define), la URL de Vercel si se publica ahí, y por último localhost con un aviso al compilar.
 */
function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  if (process.env.NODE_ENV === "production") {
    console.warn(
      "[seo] NEXT_PUBLIC_SITE_URL no está definida: og:image y las URL para compartir apuntarán a http://localhost:3000. Ver .env.example.",
    );
  }
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

// En GitHub Pages (trailingSlash) las páginas terminan en "/"
const TRAILING_SLASH = process.env.GITHUB_PAGES === "true";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** URL absoluta de una ruta del sitio ("/products/surtida" → https://…/products/surtida/) */
export function absoluteUrl(path: string): string {
  const withSlash = TRAILING_SLASH && !path.endsWith("/") ? `${path}/` : path;
  return new URL(`${BASE_PATH}${withSlash}`, `${SITE_URL}/`).href;
}

/** URL absoluta de un recurso que ya incluye el basePath (p. ej. ImageAsset.src) */
export function absoluteAsset(src: string): string {
  return new URL(src, `${SITE_URL}/`).href;
}

/** Open Graph + Twitter de una página: título, descripción, URL y la vista previa al compartir */
export function shareMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const og = image("og-compartir");
  const ogImage = { url: absoluteAsset(og.src), width: og.width, height: og.height, alt: og.alt, type: "image/jpeg" };
  const url = absoluteUrl(path);
  return {
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "es_PE", siteName: brand.name, title, description, url, images: [ogImage] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}
