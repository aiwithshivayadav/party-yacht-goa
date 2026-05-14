"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// Build a curated gallery from all yachts
const ALL_IMAGES = [
  // Sunset 42 (most images, showcase first)
  ...Array.from({ length: 12 }, (_, i) => ({ src: `/yachts/sunset-42/sunset-42-${i + 1}.jpeg`, yacht: "Sunset 42" })),
  ...Array.from({ length: 8 }, (_, i) => ({ src: `/yachts/orca/orca-${i + 1}.jpeg`, yacht: "Orca" })),
  ...Array.from({ length: 8 }, (_, i) => ({ src: `/yachts/polaris/polaris-${i + 1}.jpeg`, yacht: "Polaris" })),
  ...Array.from({ length: 6 }, (_, i) => ({ src: `/yachts/prestige-36/prestige-36-${i + 1}.jpeg`, yacht: "Prestige 36" })),
  ...Array.from({ length: 6 }, (_, i) => ({ src: `/yachts/malini/malini-${i + 1}.jpeg`, yacht: "Malini" })),
  ...Array.from({ length: 5 }, (_, i) => ({ src: `/yachts/shantam/shantam-${i + 1}.jpeg`, yacht: "Shantam" })),
  ...Array.from({ length: 5 }, (_, i) => ({ src: `/yachts/blue-fin/blue-fin-${i + 1}.jpeg`, yacht: "Blue Fin" })),
  ...Array.from({ length: 4 }, (_, i) => ({ src: `/yachts/fun-liner/fun-liner-${i + 1}.jpeg`, yacht: "Fun Liner" })),
  ...Array.from({ length: 4 }, (_, i) => ({ src: `/yachts/mv-krishna/mv-krishna-${i + 1}.jpeg`, yacht: "MV Krishna" })),
  ...Array.from({ length: 3 }, (_, i) => ({ src: `/yachts/manta-ray/manta-ray-${i + 1}.jpeg`, yacht: "Manta Ray" })),
  ...Array.from({ length: 3 }, (_, i) => ({ src: `/yachts/sea-ray/sea-ray-${i + 1}.jpeg`, yacht: "Sea Ray" })),
];

// Show first 30 initially
const INITIAL_COUNT = 30;

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const images = showAll ? ALL_IMAGES : ALL_IMAGES.slice(0, INITIAL_COUNT);

  const openLightbox = useCallback((idx: number) => setLightboxIdx(idx), []);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  const goPrev = useCallback(() => {
    setLightboxIdx((i) => (i !== null ? (i - 1 + ALL_IMAGES.length) % ALL_IMAGES.length : null));
  }, []);

  const goNext = useCallback(() => {
    setLightboxIdx((i) => (i !== null ? (i + 1) % ALL_IMAGES.length : null));
  }, []);

  return (
    <section id="gallery" className="relative py-32 overflow-hidden" style={{ background: "#020408" }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container-luxury" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="section-label justify-center mb-6">The Gallery</div>
          <h2 className="text-gradient-gold mb-5"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, lineHeight: 1.1 }}>
            Moments That<br /><em>Define Luxury</em>
          </h2>
          <p className="text-white/40 max-w-md mx-auto text-sm" style={{ fontFamily: "var(--font-inter)", lineHeight: 1.8 }}>
            Real moments from our yacht experiences — unscripted, unforgettable.
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="masonry-grid">
          {images.map((img, i) => (
            <motion.div
              key={`${img.src}-${i}`}
              className="masonry-grid-item group relative overflow-hidden rounded-xl cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: Math.min(i * 0.04, 1.2) }}
              onClick={() => openLightbox(i)}
            >
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={img.src}
                  alt={`${img.yacht} experience in Goa`}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#020408]/0 group-hover:bg-[#020408]/50 transition-all duration-400 flex items-center justify-center">
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2"
                  >
                    <ZoomIn size={24} className="text-gold" />
                    <span className="text-gold text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-inter)" }}>
                      {img.yacht}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load more */}
        {!showAll && ALL_IMAGES.length > INITIAL_COUNT && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setShowAll(true)}
              className="btn-outline-gold"
            >
              View All {ALL_IMAGES.length} Photos
            </button>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            className="fixed inset-0 z-[99990] flex items-center justify-center"
            style={{ background: "rgba(2,4,8,0.97)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <X size={18} className="text-white/80" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <ChevronLeft size={20} className="text-white/80" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIdx}
              className="relative max-w-5xl max-h-[85vh] w-full mx-16 md:mx-24"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={ALL_IMAGES[lightboxIdx].src}
                alt={ALL_IMAGES[lightboxIdx].yacht}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
                sizes="90vw"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                <span className="text-white/50 text-xs tracking-[0.2em] uppercase px-4 py-2 rounded-full"
                  style={{ fontFamily: "var(--font-inter)", background: "rgba(2,4,8,0.6)" }}>
                  {ALL_IMAGES[lightboxIdx].yacht} &nbsp;·&nbsp; {lightboxIdx + 1} / {ALL_IMAGES.length}
                </span>
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <ChevronRight size={20} className="text-white/80" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
