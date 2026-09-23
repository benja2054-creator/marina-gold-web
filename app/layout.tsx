import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marina Gold · Bombones artesanales en Lima",
  description: "Bombones artesanales premium hechos a mano en Lima, Perú.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PE">
      <body>{children}</body>
    </html>
  );
}
