import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { YACHTS } from "@/lib/data";
import YachtDetailClient from "./YachtDetailClient";

const BASE = "https://partyyachtgoa.com";

// Generate static paths for all yachts
export async function generateStaticParams() {
  return YACHTS.map((y) => ({ slug: y.slug }));
}

// Per-page SEO metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const yacht = YACHTS.find((y) => y.slug === slug);
  if (!yacht) return {};

  const occasions = yacht.occasion.slice(0, 3).map((o) => o.replace(/-/g, " ")).join(", ");
  const title = `${yacht.name} — Luxury Yacht Charter in Goa | ₹${(yacht.priceFrom / 1000).toFixed(0)}K+`;
  const description = `Charter the ${yacht.name} in Goa for ${occasions} & more. Up to ${yacht.capacity} guests, starting ₹${yacht.priceFrom.toLocaleString("en-IN")}. ${yacht.tagline}. Book now or WhatsApp for availability.`;

  return {
    title,
    description,
    keywords: [
      `${yacht.name} goa`, `${yacht.name} yacht goa`, "yacht charter goa",
      "party yacht goa", "luxury yacht rental goa", ...yacht.occasion.map((o) => `${o} yacht goa`),
    ],
    alternates: { canonical: `/yachts/${slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE}/yachts/${slug}`,
      type: "website",
      images: [{ url: `/yachts/${slug}/${slug}-1.jpeg`, width: 1200, height: 800, alt: `${yacht.name} yacht in Goa` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/yachts/${slug}/${slug}-1.jpeg`],
    },
  };
}

export default async function YachtDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const yacht = YACHTS.find((y) => y.slug === slug);
  if (!yacht) notFound();

  return <YachtDetailClient yacht={yacht} />;
}
