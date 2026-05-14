"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const WA = "https://wa.me/918960070105?text=Hi%2C%20I%27d%20like%20to%20plan%20a%20luxury%20yacht%20experience%20in%20Goa!";

export default function WhatsAppCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/yachts/sunset-42/sunset-42-5.jpeg"
          alt="Luxury yacht Goa"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#020408]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020408] via-transparent to-[#020408]" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: "rgba(201,169,110,0.4)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              delay: Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container-luxury text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/60" />
          <span className="text-gold/70 text-[11px] tracking-[0.4em] uppercase" style={{ fontFamily: "var(--font-inter)" }}>
            Start Planning Today
          </span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/60" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-white mb-6"
          style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(3rem, 7vw, 7rem)", fontWeight: 300, lineHeight: 1.05 }}
        >
          Ready To<br />
          <span className="text-gradient-gold italic">Set Sail?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-white/40 max-w-md mx-auto text-sm mb-12"
          style={{ fontFamily: "var(--font-inter)", lineHeight: 1.8 }}
        >
          Tell us your date, your group, and your dream — we&apos;ll handle every last detail and deliver an experience you&apos;ll never forget.
        </motion.p>

        {/* WhatsApp button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-[#020408] text-sm tracking-wide overflow-hidden"
            style={{
              background: "#25D366",
              fontFamily: "var(--font-inter)",
              letterSpacing: "0.05em",
            }}
            whileHover={{ scale: 1.04, boxShadow: "0 20px 60px rgba(37,211,102,0.4)" }}
            whileTap={{ scale: 0.97 }}
            animate={{ boxShadow: ["0 0 0 0 rgba(37,211,102,0.3)", "0 0 0 20px rgba(37,211,102,0)", "0 0 0 0 rgba(37,211,102,0)"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <WhatsAppIconDark />
            Plan My Yacht Experience
          </motion.a>

          <motion.a
            href="tel:+918960070105"
            className="btn-outline-gold px-8 py-5 rounded-full"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Call Us Directly
          </motion.a>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 mt-16"
        >
          {[
            "✓ Instant Confirmation",
            "✓ No Hidden Charges",
            "✓ Flexible Rescheduling",
            "✓ 24/7 Support",
          ].map((t) => (
            <span key={t} className="text-white/30 text-xs tracking-[0.15em]" style={{ fontFamily: "var(--font-inter)" }}>
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function WhatsAppIconDark() {
  return (
    <svg viewBox="0 0 24 24" fill="#020408" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
