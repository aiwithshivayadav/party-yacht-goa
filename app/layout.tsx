import type { Metadata, Viewport } from "next";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import MobileCtaBar from "@/components/MobileCtaBar";

const BASE_URL = "https://partyyachtgoa.com";

export const metadata: Metadata = {
  // ── Core SEO (keyword-optimised based on competitor analysis) ──
  title: {
    default: "Party Yacht Charters in Goa | Book Luxury Yachts Online",
    template: "%s | Party Yacht Goa",
  },
  description:
    "Charter premium yachts in Goa for parties, birthdays & events. 11 luxury vessels, professional crew, starting ₹8,000. Sunset cruises, DJ nights, bachelor parties. Book instantly or WhatsApp us!",
  keywords: [
    "party yacht goa", "yacht charter goa", "luxury yacht rental goa",
    "yacht party goa prices", "birthday party yacht goa", "private yacht charter goa",
    "corporate yacht event goa", "best yacht charter goa", "boat party rental goa",
    "sunset cruise goa yacht", "bachelor party yacht goa", "DJ yacht party goa",
    "proposal yacht goa", "couple yacht date goa", "yacht booking goa",
  ],
  authors: [{ name: "Party Yacht Goa", url: BASE_URL }],
  creator: "Party Yacht Goa",
  publisher: "Party Yacht Goa",
  category: "Travel & Tourism",
  classification: "Yacht Charter Services",
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: "/" },

  // ── Open Graph ──
  openGraph: {
    title: "Party Yacht Charters in Goa | Luxury Private Yacht Experiences",
    description:
      "Goa's most-loved yacht charter. 11 luxury yachts for sunset cruises, parties, proposals & corporate events on the Arabian Sea. Starting ₹8,000.",
    url: BASE_URL,
    siteName: "Party Yacht Goa",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Party Yacht Goa — Luxury Yacht Charters in Goa",
      },
    ],
  },

  // ── Twitter / X ──
  twitter: {
    card: "summary_large_image",
    title: "Party Yacht Charters in Goa | Book Luxury Yachts Online",
    description: "11 luxury yachts for every occasion — sunset cruises, DJ nights, birthdays & more on the Arabian Sea.",
    images: ["/og/og-image.jpg"],
    creator: "@partyyachtgoa",
  },

  // ── Robots ──
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },

  // ── Icons ──
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32" },
      { url: "/favicon.png", sizes: "192x192" },
    ],
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },

  // ── Verification (fill in after Google Search Console setup) ──
  // verification: { google: "YOUR_CODE_HERE" },

  // ── Other ──
  applicationName: "Party Yacht Goa",
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: true, date: false, address: true, email: true, url: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#020408" },
    { media: "(prefers-color-scheme: light)", color: "#020408" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for faster load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Fonts — inter + cormorant */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD structured data */}
        <JsonLd />
      </head>
      <body suppressHydrationWarning>
        {children}
        <MobileCtaBar />
      </body>
    </html>
  );
}
