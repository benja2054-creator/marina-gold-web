import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Todas las imágenes viven en /public/images: no se permiten dominios externos.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
