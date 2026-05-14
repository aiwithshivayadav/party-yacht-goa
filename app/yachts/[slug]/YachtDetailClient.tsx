"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Users, Anchor, ChevronLeft, ChevronRight, Check, ArrowLeft, MessageCircle } from "lucide-react";
import { type Yacht, YACHTS, waLink } from "@/lib/data";
import BookingModal from "@/components/BookingModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function YachtDetailClient({ yacht }: { yacht: Yacht }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);

  const totalImgs = yacht.images;
  const getImgSrc = (i: number) => `/yachts/${yacht.slug}/${yacht.slug}-${i + 1}.jpeg`;
  const prev = () => setImgIdx((x) => (x - 1 + totalImgs) % totalImgs);
  const next = () => setImgIdx((x) => (x + 1) % totalImgs);
  const otherYachts = YACHTS.filter((y) => y.slug !== yacht.slug).slice(0, 3);

  return (
    <>
      <div className="min-h-screen pb-[72px] md:pb-0" style={{ background: "#020408", color: "#fff" }}>
        <Navbar />
        <div className="container-luxury pt-24 pb-4">
          <Link href="/#yachts" className="inline-flex items-center gap-2 text-sm transition-colors hover:text-gold"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
            <ArrowLeft size={14} /> Back to Fleet
          </Link>
        </div>

        <div className="container-luxury pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Images */}
            <div className="lg:sticky lg:top-6">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-white/5">
                <Image src={getImgSrc(imgIdx)} alt={`${yacht.name} yacht Goa`} fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 50vw" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full font-semibold"
                    style={{ fontFamily: "var(--font-inter)", background: `${yacht.badgeColor}22`, color: yacht.badgeColor, border: `1px solid ${yacht.badgeColor}44` }}>
                    {yacht.badge}
                  </span>
                </div>
                {totalImgs > 1 && (<>
                  <button onClick={prev} aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" style={{ background: "rgba(2,4,8,0.75)", border: "1px solid rgba(255,255,255,0.15)" }}><ChevronLeft size={18} className="text-white" /></button>
                  <button onClick={next} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" style={{ background: "rgba(2,4,8,0.75)", border: "1px solid rgba(255,255,255,0.15)" }}><ChevronRight size={18} className="text-white" /></button>
                </>)}
                <div className="absolute bottom-4 right-4 text-[11px] px-2.5 py-1 rounded-lg" style={{ background: "rgba(2,4,8,0.75)", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-inter)" }}>{imgIdx + 1} / {totalImgs}</div>
              </div>
              {totalImgs > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                  {Array.from({ length: Math.min(totalImgs, 8) }).map((_, i) => (
                    <button key={i} onClick={() => setImgIdx(i)} aria-label={`Photo ${i + 1}`}
                      className="relative shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all"
                      style={{ border: i === imgIdx ? "2px solid #c9a96e" : "2px solid transparent", opacity: i === imgIdx ? 1 : 0.5 }}>
                      <Image src={getImgSrc(i)} alt="" fill className="object-cover" sizes="64px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Star size={13} className="fill-current" style={{ color: "#c9a96e" }} />
                  <span className="text-sm font-medium" style={{ color: "#c9a96e", fontFamily: "var(--font-inter)" }}>{yacht.rating}</span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>({yacht.reviews} reviews)</span>
                </div>
                <h1 className="text-white mb-2" style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 400, lineHeight: 1.15 }}>{yacht.name}</h1>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)", lineHeight: 1.5 }}>{yacht.tagline}</p>
              </div>

              <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl" style={{ background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.15)" }}>
                <div>
                  <div className="text-[10px] tracking-[0.15em] uppercase mb-1" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>Starting from</div>
                  <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", fontWeight: 600, color: "#c9a96e" }}>₹{yacht.priceFrom.toLocaleString("en-IN")}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>{yacht.priceUnit}</div>
                </div>
                <div className="flex-1" />
                <div className="flex flex-col items-end gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>
                  <span className="flex items-center gap-1.5"><Users size={12} style={{ color: "#c9a96e" }} /> Up to {yacht.capacity} guests</span>
                  <span className="flex items-center gap-1.5"><Anchor size={12} style={{ color: "#c9a96e" }} /> {yacht.length}</span>
                </div>
              </div>

              <div className="flex gap-3 mb-8">
                <button onClick={() => setBookingOpen(true)} className="btn-gold flex-1 justify-center py-4">Book Now</button>
                <a href={waLink(`Hi! I'd like to book the ${yacht.name} in Goa. Please share availability and pricing.`)}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-sm font-medium transition-colors hover:bg-green-500/20"
                  style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.25)", color: "#25d366", fontFamily: "var(--font-inter)" }}>
                  <MessageCircle size={15} /> WhatsApp
                </a>
              </div>

              <div className="mb-8">
                <h2 className="text-base font-medium mb-3" style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.7)" }}>About this yacht</h2>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-inter)", lineHeight: 1.8 }}>{yacht.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-base font-medium mb-3" style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.7)" }}>Specifications</h2>
                <div className="grid grid-cols-2 gap-2">
                  {yacht.specs.map((s) => (
                    <div key={s.label} className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="text-[10px] tracking-wide uppercase mb-0.5" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-inter)" }}>{s.label}</div>
                      <div className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-inter)" }}>{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-base font-medium mb-3" style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.7)" }}>What&apos;s Included</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {yacht.features.map((f) => (
                    <div key={f} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(201,169,110,0.15)", border: "1px solid rgba(201,169,110,0.25)" }}>
                        <Check size={9} style={{ color: "#c9a96e" }} />
                      </div>
                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-inter)" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-base font-medium mb-3" style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.7)" }}>Perfect For</h2>
                <div className="flex flex-wrap gap-2">
                  {yacht.occasion.map((o) => (
                    <span key={o} className="text-[11px] px-3 py-1.5 rounded-full capitalize"
                      style={{ background: "rgba(201,169,110,0.07)", color: "rgba(232,213,163,0.7)", border: "1px solid rgba(201,169,110,0.12)", fontFamily: "var(--font-inter)" }}>
                      {o.replace(/-/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* More Yachts */}
          <div className="mt-20">
            <h2 className="text-white mb-8 text-center" style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 300 }}>Explore More Yachts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherYachts.map((y) => (
                <Link key={y.slug} href={`/yachts/${y.slug}`}
                  className="group relative rounded-2xl overflow-hidden transition-all hover:scale-[1.02]"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="relative h-44 overflow-hidden">
                    <Image src={`/yachts/${y.slug}/${y.slug}-1.jpeg`} alt={`${y.name} yacht Goa`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020408] to-transparent opacity-70" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white text-lg mb-1" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}>{y.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>Up to {y.capacity} guests</span>
                      <span className="text-sm font-medium" style={{ color: "#c9a96e", fontFamily: "var(--font-cormorant)" }}>₹{y.priceFrom.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>

      <FloatingWhatsApp />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} yachtName={yacht.name} yachtSlug={yacht.slug} priceFrom={yacht.priceFrom} />
    </>
  );
}
