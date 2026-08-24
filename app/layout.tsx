import type { Metadata } from "next";
import "./globals.css";

const metadataBase = new URL(process.env.SITE_ORIGIN ?? "http://localhost:3000");

export const metadata: Metadata = {
  title: "Brian McKeon Painting | Residential & Commercial Painting",
  description: "Professional painting for homes, decks, businesses, fences, furniture, and more. General liability insured.",
  metadataBase,
  icons: { icon: "/bmp-mark.jpeg", apple: "/bmp-mark.jpeg" },
  openGraph: {
    title: "Brian McKeon Painting",
    description: "Craftsmanship in every coat. Residential, commercial, outdoor, and specialty painting.",
    type: "website",
    images: [{ url: "/og.png", width: 1536, height: 872, alt: "Brian McKeon Painting — Craftsmanship in every coat." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian McKeon Painting",
    description: "Craftsmanship in every coat. Residential, commercial, outdoor, and specialty painting.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
