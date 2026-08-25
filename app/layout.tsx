import type { Metadata } from "next";
import "./globals.css";
import SiteShell from "./components/SiteShell";

const siteOrigin = process.env.SITE_ORIGIN ?? "http://localhost:3000";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const metadataBase = new URL(`${siteOrigin.replace(/\/$/, "")}${basePath}/`);
const absoluteAsset = (path: string) => new URL(`${basePath}${path}`, siteOrigin).toString();

export const metadata: Metadata = {
  title: "Brian McKeon Painting | Residential & Commercial Painting",
  description: "Professional painting for homes, decks, businesses, fences, furniture, and more. General liability insured.",
  metadataBase,
  icons: { icon: absoluteAsset("/bmp-mark.jpeg"), apple: absoluteAsset("/bmp-mark.jpeg") },
  openGraph: {
    title: "Brian McKeon Painting",
    description: "Craftsmanship in every coat. Residential, commercial, outdoor, and specialty painting.",
    type: "website",
    url: metadataBase,
    images: [{ url: absoluteAsset("/og.png"), width: 1536, height: 872, alt: "Brian McKeon Painting — Craftsmanship in every coat." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian McKeon Painting",
    description: "Craftsmanship in every coat. Residential, commercial, outdoor, and specialty painting.",
    images: [absoluteAsset("/og.png")],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteShell>{children}</SiteShell></body></html>;
}
