import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sin el botón flotante de Next.js en desarrollo, para comparar limpio con las láminas.
  devIndicators: false,
  // Todas las imágenes viven en /public/images: no se permiten dominios externos.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
