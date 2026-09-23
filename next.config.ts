import type { NextConfig } from "next";

/*
 * GitHub Pages (ambiente de pruebas): el workflow .github/workflows/pages.yml compila con
 * GITHUB_PAGES=true y PAGES_BASE_PATH (vacío en marinagoldpe.github.io, que publica en la raíz
 * del dominio; sería /nombre-del-repo en un repositorio común). En ese caso se exporta HTML estático
 * (carpeta out/), bajo esa subruta y sin optimización de imágenes (Pages no
 * tiene servidor). En local y en Vercel no cambia nada.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? (process.env.PAGES_BASE_PATH ?? "") : "";

const nextConfig: NextConfig = {
  // Sin el botón flotante de Next.js en desarrollo, para comparar limpio con las láminas.
  devIndicators: false,
  ...(isPages ? { output: "export" as const, basePath, trailingSlash: true } : {}),
  // next/image no antepone basePath al src: lib/images.ts lo agrega con esta variable.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Todas las imágenes viven en /public/images: no se permiten dominios externos.
  images: {
    unoptimized: isPages,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
