"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Users, Star, ChevronLeft, ChevronRight, Anchor, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { YACHTS, waLink } from "@/lib/data";

const FILTERS = [
  { id: "all", label: "All Yachts" },
  { id: "large", label: "Large (30+ guests)" },
  { id: "medium", label: "Medium (15–30)" },
  { id: "small", label: "Intimate (up to 15)" },
  { id: "couple", label: "Couples" },
  { id: "bachelor", label: "Bachelor Party" },
  { id: "corporate", label: "Corporate" },
  { id: "sunset", label: "Sunset Cruise" },
];

export default function YachtsPageClient() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [imgIdx, setImgIdx] = useState<Record<string, number>>({});

  const filtered = YACHTS.filter((y) =>
    activeFilter === "all" || y.category.includes(activeFilter) || y.occasion.includes(activeFilter)
  );

  const getImg = (slug: string) => {
    const i = imgIdx[slug] ?? 0;
    return `/yachts/${slug}/${slug}-${i + 1}.jpeg`;
  };

  const next = (slug: string, total: number, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setImgIdx((p) => ({ ...p, [slug]: ((p[slug] ?? 0) + 1) % total }));
  };
  const prev = (slug: string, total: number, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setImgIdx((p) => ({ ...p, [slug]: ((p[slug] ?? 0) - 1 + total) % total }));
  };

  return (
    <div style={{ background: "#020408", minHeight: "100vh" }}>
      <PageHero
        label="Our Fleet"
        title="The Yacht"
        titleGold="Collection"
        subtitle="11 handpicked vessels for every occasion — from intimate escapes to grand celebrations on the Arabian Sea."
        image="/yachts/sunset-42/sunset-42-1.jpeg"
        height="55vh"
      />

      <section className="py-20">
        <div className="container-luxury">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-14"
          >
            {FILTERS.map((f) => (
              <button key={f.id} onClick={() => setActiveFilter(f.id)}
                className="px-5 py-2 rounded-full text-[11px] tracking-[0.15em] uppercase transition-all duration-300"
                style={{
                  fontFamily: "var(--font-inter)",
                  background: activeFilter === f.id ? "var(--gold)" : "rgba(255,255,255,0.04)",
                  color: activeFilter === f.id ? "#020408" : "rgba(255,255,255,0.5)",
                  border: activeFilter === f.id ? "1px solid var(--gold)" : "1px solid rgba(255,255,255,0.08)",
                  fontWeight: activeFilter === f.id ? 600 : 400,
                }}>
                {f.label}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div key={activeFilter}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((yacht, i) => (
                <motion.div key={yacht.slug} layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group relative rounded-2xl overflow-hidden glass-card"
                >
                  {/* Image */}
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image src={getImg(yacht.slug)} alt={yacht.name} fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
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
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={(e) => prev(yacht.slug, yacht.images, e)}
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(2,4,8,0.7)", border: "1px solid rgba(255,255,255,0.15)" }}>
                          <ChevronLeft size={14} className="text-white" />
                        </button>
                        <button onClick={(e) => next(yacht.slug, yacht.images, e)}
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(2,4,8,0.7)", border: "1px solid rgba(255,255,255,0.15)" }}>
                          <ChevronRight size={14} className="text-white" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-white text-xl mb-0.5" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}>
                          {yacht.name}
                        </h2>
                        <p className="text-white/40 text-xs" style={{ fontFamily: "var(--font-inter)" }}>{yacht.tagline}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star size={11} className="text-gold fill-gold" />
                        <span className="text-gold text-sm font-medium" style={{ fontFamily: "var(--font-inter)" }}>{yacht.rating}</span>
                        <span className="text-white/30 text-xs" style={{ fontFamily: "var(--font-inter)" }}>({yacht.reviews})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 py-3 border-y border-white/5">
                      <div className="flex items-center gap-1.5 text-white/50 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                        <Users size={12} className="text-gold/60" /> Up to {yacht.capacity} guests
                      </div>
                      <div className="flex items-center gap-1.5 text-white/50 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                        <Anchor size={12} className="text-gold/60" /> {yacht.length}
                      </div>
                    </div>

                    <p className="text-white/30 text-sm leading-relaxed line-clamp-2" style={{ fontFamily: "var(--font-inter)" }}>
                      {yacht.description}
                    </p>

                    <div className="flex items-center justify-between mt-1">
                      <div>
                        <span className="text-white/30 text-[10px] tracking-[0.15em] uppercase block" style={{ fontFamily: "var(--font-inter)" }}>From</span>
                        <span className="text-gradient-gold text-2xl" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600 }}>
                          ₹{yacht.priceFrom.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link href={`/yachts/${yacht.slug}`}
                          className="btn-outline-gold text-[11px] py-2.5 px-5 inline-flex items-center gap-1.5">
                          View <ArrowRight size={12} />
                        </Link>
                        <a href={waLink(`Hi, I'd like to book the ${yacht.name} yacht in Goa!`)}
                          target="_blank" rel="noopener noreferrer"
                          className="btn-gold text-[11px] py-2.5 px-5">
                          Book
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/30 text-lg" style={{ fontFamily: "var(--font-cormorant)" }}>No yachts match this filter.</p>
              <button onClick={() => setActiveFilter("all")} className="btn-outline-gold mt-6">View All Yachts</button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
