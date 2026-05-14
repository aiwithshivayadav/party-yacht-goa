"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Users, Star, ChevronLeft, ChevronRight, Anchor } from "lucide-react";

const YACHTS = [
  {
    slug: "sunset-42",
    name: "Sunset 42",
    tagline: "The Ultimate Party Vessel",
    capacity: 50,
    priceFrom: 25000,
    category: ["party", "large", "dj"],
    occasion: ["bachelor", "birthday", "corporate", "dj"],
    images: 36,
    features: ["DJ System", "LED Lights", "Bar Setup", "Dance Floor", "Life Jackets"],
    rating: 4.9,
    reviews: 87,
    badge: "Most Popular",
    badgeColor: "#c9a96e",
    length: "42 ft",
  },
  {
    slug: "orca",
    name: "Orca",
    tagline: "Power Meets Elegance",
    capacity: 30,
    priceFrom: 20000,
    category: ["luxury", "large"],
    occasion: ["corporate", "birthday", "couple", "sunset"],
    images: 23,
    features: ["Sun Deck", "Premium Sound", "Bar Counter", "Canopy Shade"],
    rating: 4.8,
    reviews: 63,
    badge: "Top Rated",
    badgeColor: "#3b82f6",
    length: "40 ft",
  },
  {
    slug: "polaris",
    name: "Polaris",
    tagline: "Navigate in Style",
    capacity: 30,
    priceFrom: 18000,
    category: ["luxury", "large"],
    occasion: ["corporate", "birthday", "bachelor"],
    images: 23,
    features: ["Spacious Deck", "Premium Audio", "Seating Lounge", "LED Setup"],
    rating: 4.9,
    reviews: 54,
    badge: "Premium",
    badgeColor: "#a855f7",
    length: "40 ft",
  },
  {
    slug: "prestige-36",
    name: "Prestige 36",
    tagline: "Intimate Luxury at Sea",
    capacity: 20,
    priceFrom: 15000,
    category: ["luxury", "medium"],
    occasion: ["couple", "sunset", "proposal", "birthday"],
    images: 19,
    features: ["Luxury Seating", "Sound System", "Bar Setup", "Photography Friendly"],
    rating: 5.0,
    reviews: 41,
    badge: "Best for Couples",
    badgeColor: "#ec4899",
    length: "36 ft",
  },
  {
    slug: "malini",
    name: "Malini Waver Rider",
    tagline: "Adventure on the Arabian Sea",
    capacity: 25,
    priceFrom: 14000,
    category: ["adventure", "medium"],
    occasion: ["birthday", "bachelor", "corporate"],
    images: 19,
    features: ["Wave Riding", "Open Deck", "Water Sports Ready", "Music System"],
    rating: 4.8,
    reviews: 38,
    badge: "Adventure Pick",
    badgeColor: "#06b6d4",
    length: "38 ft",
  },
  {
    slug: "shantam",
    name: "Shantam",
    tagline: "Serene Seas, Grand Moments",
    capacity: 20,
    priceFrom: 12000,
    category: ["medium", "budget"],
    occasion: ["sunset", "couple", "birthday"],
    images: 12,
    features: ["Comfortable Seating", "Sound System", "Snack Bar"],
    rating: 4.7,
    reviews: 29,
    badge: "Great Value",
    badgeColor: "#10b981",
    length: "35 ft",
  },
  {
    slug: "blue-fin",
    name: "Blue Fin",
    tagline: "Speed, Style & the Sea",
    capacity: 15,
    priceFrom: 10000,
    category: ["medium", "speed"],
    occasion: ["couple", "bachelor", "sunset"],
    images: 11,
    features: ["Speed Boat", "Open Air", "Thrilling Ride", "Photo Ops"],
    rating: 4.8,
    reviews: 22,
    badge: "Speed & Thrill",
    badgeColor: "#f59e0b",
    length: "30 ft",
  },
  {
    slug: "fun-liner",
    name: "Fun Liner",
    tagline: "Pure Fun on the Water",
    capacity: 20,
    priceFrom: 10000,
    category: ["medium", "budget"],
    occasion: ["birthday", "bachelor", "corporate"],
    images: 10,
    features: ["Party Deck", "Music System", "Group Friendly"],
    rating: 4.7,
    reviews: 19,
    badge: "Group Favourite",
    badgeColor: "#8b5cf6",
    length: "32 ft",
  },
  {
    slug: "manta-ray",
    name: "Manta Ray",
    tagline: "Glide Like a Legend",
    capacity: 12,
    priceFrom: 9000,
    category: ["small", "budget"],
    occasion: ["couple", "sunset", "proposal"],
    images: 7,
    features: ["Intimate Setup", "Bluetooth Audio", "Sunset View"],
    rating: 4.9,
    reviews: 14,
    badge: "Intimate",
    badgeColor: "#f43f5e",
    length: "28 ft",
  },
  {
    slug: "mv-krishna",
    name: "MV Krishna",
    tagline: "Majestic on the Mandovi",
    capacity: 40,
    priceFrom: 22000,
    category: ["large", "party"],
    occasion: ["corporate", "birthday", "bachelor"],
    images: 9,
    features: ["Large Capacity", "Stage Area", "Premium Sound", "Bar"],
    rating: 4.8,
    reviews: 31,
    badge: "Corporate Choice",
    badgeColor: "#0ea5e9",
    length: "45 ft",
  },
  {
    slug: "sea-ray",
    name: "Sea Ray",
    tagline: "Luxury in Every Wave",
    capacity: 10,
    priceFrom: 8000,
    category: ["small", "luxury"],
    occasion: ["couple", "sunset", "proposal"],
    images: 4,
    features: ["Ultra Compact", "Luxury Finish", "Private Experience"],
    rating: 5.0,
    reviews: 11,
    badge: "Ultra Private",
    badgeColor: "#d946ef",
    length: "25 ft",
  },
];

const FILTERS = [
  { id: "all", label: "All Yachts" },
  { id: "large", label: "Large (30+ guests)" },
  { id: "medium", label: "Medium (15–30)" },
  { id: "small", label: "Small (up to 15)" },
  { id: "couple", label: "Couples" },
  { id: "bachelor", label: "Bachelor Party" },
  { id: "corporate", label: "Corporate" },
];

const WA = "https://wa.me/918960070105?text=Hi%2C%20I%27d%20like%20to%20book%20the%20";

export default function YachtCollection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const [activeFilter, setActiveFilter] = useState("all");
  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});

  const filtered = YACHTS.filter((y) =>
    activeFilter === "all" ||
    y.category.includes(activeFilter) ||
    y.occasion.includes(activeFilter)
  );

  const getImg = (slug: string) => {
    const idx = imageIndexes[slug] ?? 0;
    return `/yachts/${slug}/${slug}-${idx + 1}.jpeg`;
  };

  const nextImg = (slug: string, total: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setImageIndexes((prev) => ({ ...prev, [slug]: ((prev[slug] ?? 0) + 1) % total }));
  };

  const prevImg = (slug: string, total: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setImageIndexes((prev) => ({ ...prev, [slug]: ((prev[slug] ?? 0) - 1 + total) % total }));
  };

  return (
    <section id="yachts" className="relative py-32 overflow-hidden" style={{ background: "linear-gradient(180deg, #020408 0%, #0a1628 50%, #020408 100%)" }}>
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container-luxury" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="section-label justify-center mb-6">Our Fleet</div>
          <h2 className="text-gradient-gold mb-5"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, lineHeight: 1.1 }}>
            The Yacht Collection
          </h2>
          <p className="text-white/40 max-w-md mx-auto text-sm" style={{ fontFamily: "var(--font-inter)", lineHeight: 1.8 }}>
            11 handpicked vessels for every occasion — from intimate escapes to grand celebrations.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className="relative px-5 py-2 rounded-full text-[11px] tracking-[0.15em] uppercase transition-all duration-300"
              style={{
                fontFamily: "var(--font-inter)",
                background: activeFilter === f.id ? "var(--gold)" : "rgba(255,255,255,0.04)",
                color: activeFilter === f.id ? "#020408" : "rgba(255,255,255,0.5)",
                border: activeFilter === f.id ? "1px solid var(--gold)" : "1px solid rgba(255,255,255,0.08)",
                fontWeight: activeFilter === f.id ? 600 : 400,
              }}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((yacht, i) => (
              <motion.div
                key={yacht.slug}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group relative rounded-2xl overflow-hidden glass-card"
                style={{ minHeight: 520 }}
              >
                {/* Image */}
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={getImg(yacht.slug)}
                    alt={yacht.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-transparent opacity-80" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full font-medium"
                      style={{ fontFamily: "var(--font-inter)", background: `${yacht.badgeColor}22`, color: yacht.badgeColor, border: `1px solid ${yacht.badgeColor}40` }}>
                      {yacht.badge}
                    </span>
                  </div>

                  {/* Image nav */}
                  {yacht.images > 1 && (
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button onClick={(e) => prevImg(yacht.slug, yacht.images, e)}
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(2,4,8,0.7)", border: "1px solid rgba(255,255,255,0.15)" }}>
                        <ChevronLeft size={14} className="text-white" />
                      </button>
                      <button onClick={(e) => nextImg(yacht.slug, yacht.images, e)}
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(2,4,8,0.7)", border: "1px solid rgba(255,255,255,0.15)" }}>
                        <ChevronRight size={14} className="text-white" />
                      </button>
                    </div>
                  )}

                  {/* Image count dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                    {Array.from({ length: Math.min(yacht.images, 5) }).map((_, di) => (
                      <div key={di} className="w-1 h-1 rounded-full transition-all duration-300"
                        style={{ background: di === (imageIndexes[yacht.slug] ?? 0) % 5 ? "var(--gold)" : "rgba(255,255,255,0.3)" }} />
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col gap-4">
                  {/* Name & rating */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white text-xl mb-1"
                        style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}>
                        {yacht.name}
                      </h3>
                      <p className="text-white/40 text-xs tracking-wide" style={{ fontFamily: "var(--font-inter)" }}>
                        {yacht.tagline}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Star size={11} className="text-gold fill-gold" />
                      <span className="text-gold text-sm font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                        {yacht.rating}
                      </span>
                      <span className="text-white/30 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                        ({yacht.reviews})
                      </span>
                    </div>
                  </div>

                  {/* Specs row */}
                  <div className="flex items-center gap-4 py-3 border-y border-white/5">
                    <div className="flex items-center gap-1.5 text-white/50 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                      <Users size={12} className="text-gold/60" />
                      Up to {yacht.capacity} guests
                    </div>
                    <div className="flex items-center gap-1.5 text-white/50 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                      <Anchor size={12} className="text-gold/60" />
                      {yacht.length}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {yacht.features.slice(0, 4).map((f) => (
                      <span key={f} className="text-[10px] tracking-wide px-2.5 py-1 rounded-full"
                        style={{ fontFamily: "var(--font-inter)", background: "rgba(201,169,110,0.07)", color: "rgba(232,213,163,0.7)", border: "1px solid rgba(201,169,110,0.12)" }}>
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between mt-1">
                    <div>
                      <span className="text-white/30 text-[10px] tracking-[0.15em] uppercase block" style={{ fontFamily: "var(--font-inter)" }}>
                        Starting from
                      </span>
                      <span className="text-gradient-gold text-2xl"
                        style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600 }}>
                        ₹{yacht.priceFrom.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <Link
                      href={`/yachts/${yacht.slug}`}
                      className="btn-gold text-[11px] py-3 px-6"
                    >
                      See Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-14"
        >
          <a
            href="https://wa.me/918960070105?text=Hi%2C%20please%20share%20the%20full%20yacht%20list%20with%20pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold inline-flex"
          >
            View Full Pricing & Availability
          </a>
        </motion.div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}
