import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "St Mary’s House Dental Care",
  description: "Luxury 3D-first dental experience.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
          <link rel="preload" as="image" href="/videos/hero/hero-poster.jpg" />
      </head>
      <body style={{ background: "var(--bg)", color: "var(--ink)" }}>
        {children}
      </body>
    </html>
  );
}
