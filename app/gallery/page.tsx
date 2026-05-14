"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";

const YACHTS_META = [
  { slug: "sunset-42", name: "Sunset 42", count: 36 },
  { slug: "orca", name: "Orca", count: 23 },
  { slug: "polaris", name: "Polaris", count: 23 },
  { slug: "prestige-36", name: "Prestige 36", count: 19 },
  { slug: "malini", name: "Malini", count: 19 },
  { slug: "mv-krishna", name: "MV Krishna", count: 9 },
  { slug: "shantam", name: "Shantam", count: 12 },
  { slug: "blue-fin", name: "Blue Fin", count: 11 },
  { slug: "fun-liner", name: "Fun Liner", count: 10 },
  { slug: "manta-ray", name: "Manta Ray", count: 7 },
  { slug: "sea-ray", name: "Sea Ray", count: 4 },
];

function buildGallery() {
  const imgs: { src: string; yacht: string }[] = [];
  for (const y of YACHTS_META) {
    for (let i = 1; i <= y.count; i++) {
      imgs.push({ src: `/yachts/${y.slug}/${y.slug}-${i}.jpeg`, yacht: y.name });
    }
  }
  return imgs;
}

const ALL_IMAGES = buildGallery(); // 173 total

const FILTER_YACHTS = [
  { id: "all", label: "All" },
  ...YACHTS_META.map((y) => ({ id: y.name, label: y.name })),
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "all" ? ALL_IMAGES : ALL_IMAGES.filter((i) => i.yacht === filter);

  const openLb = useCallback((i: number) => setLightbox(i), []);
  const closeLb = useCallback(() => setLightbox(null), []);
  const lbPrev = () => setLightbox((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const lbNext = () => setLightbox((i) => (i !== null ? (i + 1) % filtered.length : null));

  return (
    <div style={{ background: "#020408", minHeight: "100vh" }}>
      <PageHero
        label="The Gallery"
        title="Moments That"
        titleGold="Define Luxury"
        subtitle={`${ALL_IMAGES.length} real moments from our yacht experiences — unscripted, unforgettable.`}
        image="/yachts/orca/orca-2.jpeg"
        height="50vh"
      />

      <section className="py-16">
        <div className="container-luxury">
          {/* Filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-2 mb-12 justify-center"
          >
            {FILTER_YACHTS.map((f) => (
              <button key={f.id} onClick={() => setFilter(f.id)}
                className="px-4 py-2 rounded-full text-[10px] tracking-[0.15em] uppercase transition-all duration-300"
                style={{
                  fontFamily: "var(--font-inter)",
                  background: filter === f.id ? "var(--gold)" : "rgba(255,255,255,0.04)",
                  color: filter === f.id ? "#020408" : "rgba(255,255,255,0.4)",
                  border: filter === f.id ? "1px solid var(--gold)" : "1px solid rgba(255,255,255,0.06)",
                  fontWeight: filter === f.id ? 700 : 400,
                }}>
                {f.label}
              </button>
            ))}
          </motion.div>

          {/* Count */}
          <p className="text-center text-white/20 text-xs tracking-[0.2em] uppercase mb-10" style={{ fontFamily: "var(--font-inter)" }}>
            Showing {filtered.length} photos
          </p>

          {/* Masonry */}
          <AnimatePresence mode="wait">
            <motion.div key={filter} className="masonry-grid"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}>
              {filtered.map((img, i) => (
                <motion.div key={`${img.src}-${i}`}
                  className="masonry-grid-item group relative overflow-hidden rounded-xl cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.02, 0.6) }}
                  onClick={() => openLb(i)}
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <Image src={img.src} alt={img.yacht} width={600} height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width:480px) 100vw, (max-width:768px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-[#020408]/0 group-hover:bg-[#020408]/50 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-1">
                        <ZoomIn size={22} className="text-gold" />
                        <span className="text-gold text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-inter)" }}>
                          {img.yacht}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div className="fixed inset-0 z-[99990] flex items-center justify-center"
            style={{ background: "rgba(2,4,8,0.97)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeLb}>
            <button onClick={closeLb} className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <X size={18} className="text-white/80" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); lbPrev(); }}
              className="absolute left-4 z-10 w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <ChevronLeft size={20} className="text-white/80" />
            </button>
            <motion.div key={lightbox} className="relative max-w-5xl max-h-[85vh] w-full mx-20"
              initial={{ scale: 0.93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }} transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}>
              <Image src={filtered[lightbox].src} alt={filtered[lightbox].yacht}
                width={1200} height={800} className="w-full h-auto max-h-[85vh] object-contain rounded-xl" sizes="90vw" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <span className="text-white/50 text-xs tracking-[0.2em] uppercase px-4 py-2 rounded-full"
                  style={{ fontFamily: "var(--font-inter)", background: "rgba(2,4,8,0.6)" }}>
                  {filtered[lightbox].yacht} · {lightbox + 1} / {filtered.length}
                </span>
              </div>
            </motion.div>
            <button onClick={(e) => { e.stopPropagation(); lbNext(); }}
              className="absolute right-4 z-10 w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <ChevronRight size={20} className="text-white/80" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
