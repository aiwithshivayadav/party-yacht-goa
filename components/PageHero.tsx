"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  label: string;
  title: string;
  titleGold?: string;
  subtitle?: string;
  image?: string;
  video?: string;
  height?: string;
}

export default function PageHero({
  label,
  title,
  titleGold,
  subtitle,
  image,
  video,
  height = "60vh",
}: Props) {
  return (
    <section
      className="relative flex items-end overflow-hidden"
      style={{ minHeight: height, paddingTop: "80px" }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {video ? (
          <video src={video} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        ) : image ? (
          <Image src={image} alt={title} fill className="object-cover" sizes="100vw" priority />
        ) : (
          <div className="w-full h-full" style={{ background: "linear-gradient(135deg, #020408, #0a1628)" }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-[#020408]/60 to-[#020408]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020408]/50 via-transparent to-transparent" />
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/10 to-transparent" style={{ left: "8%" }} />
        <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/10 to-transparent" style={{ right: "8%" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container-luxury w-full pb-16 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="section-label mb-6">{label}</div>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(3rem, 7vw, 7rem)", fontWeight: 300, lineHeight: 1.05 }}>
            <span className="text-white">{title}</span>
            {titleGold && (
              <>
                <br />
                <span className="text-gradient-gold italic">{titleGold}</span>
              </>
            )}
          </h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-white/40 mt-5 max-w-xl text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-inter)", lineHeight: 1.8 }}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#020408] to-transparent z-10" />
    </section>
  );
}
