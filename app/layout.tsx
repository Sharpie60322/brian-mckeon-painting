import type { Metadata } from "next";
import "./globals.css";
import SiteShell from "./components/SiteShell";

const publicSiteUrl = "https://sharpie60322.github.io/brian-mckeon-painting/";
const metadataBase = new URL(publicSiteUrl);
const socialImageUrl = new URL("og-social-v2.jpg", metadataBase).toString();
const iconUrl = new URL("bmp-mark-hd.png", metadataBase).toString();

export const metadata: Metadata = {
  title: "Brian McKeon Painting | Residential & Commercial Painting",
  description: "Professional painting for homes, decks, businesses, fences, furniture, and more. General liability insured.",
  metadataBase,
  alternates: { canonical: publicSiteUrl },
  icons: { icon: iconUrl, apple: iconUrl },
  openGraph: {
    title: "Brian McKeon Painting",
    description: "Craftsmanship in every coat. Residential, commercial, outdoor, and specialty painting.",
    type: "website",
    url: publicSiteUrl,
    siteName: "Brian McKeon Painting",
    locale: "en_US",
    images: [{
      url: socialImageUrl,
      secureUrl: socialImageUrl,
      type: "image/jpeg",
      width: 1200,
      height: 630,
      alt: "Brian McKeon Painting — Craftsmanship in every coat.",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian McKeon Painting",
    description: "Craftsmanship in every coat. Residential, commercial, outdoor, and specialty painting.",
    images: [{ url: socialImageUrl, alt: "Brian McKeon Painting — Craftsmanship in every coat." }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteShell>{children}</SiteShell></body></html>;
}
