"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Anchor } from "lucide-react";

const WHATSAPP = "https://wa.me/918960070105?text=Hi%2C%20I%27d%20like%20to%20book%20a%20yacht%20in%20Goa!";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ── Particle ocean effect ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let animId: number;

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    type Particle = {
      x: number; y: number; size: number;
      speedX: number; speedY: number;
      opacity: number; opacityDir: number;
    };

    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2 + 0.3,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: Math.random() * -0.4 - 0.1,
      opacity: Math.random() * 0.6 + 0.1,
      opacityDir: Math.random() > 0.5 ? 1 : -1,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.opacityDir * 0.003;
        if (p.opacity >= 0.7 || p.opacity <= 0.05) p.opacityDir *= -1;
        if (p.y < -10) { p.y = h + 5; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 5;
        if (p.x > w + 10) p.x = -5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,169,110,${p.opacity})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollDown = () => {
    document.querySelector("#experiences")?.scrollIntoView({ behavior: "smooth" });
  };

  /* ── Word-by-word animation ── */
  const headline = ["Luxury", "Beyond", "The", "Shore"];

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          src="/video/malini.mp4"
          autoPlay muted loop playsInline
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020408]/60 via-transparent to-[#020408]/40" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#020408] to-transparent" />
      </div>

      {/* Particle canvas */}
      <canvas ref={canvasRef} id="particle-canvas" />

      {/* Luxury horizontal lines */}
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent" style={{ left: "8%" }} />
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent" style={{ right: "8%" }} />

      {/* Content */}
      <div className="relative z-10 container-luxury flex flex-col items-center text-center">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-8 h-px bg-gold/60" />
          <span className="text-gold/80 text-[11px] tracking-[0.4em] uppercase" style={{ fontFamily: "var(--font-inter)" }}>
            Goa&apos;s Premier Yacht Experience
          </span>
          <div className="w-8 h-px bg-gold/60" />
        </motion.div>

        {/* Headline */}
        <h1 className="mb-6 overflow-hidden" aria-label="Luxury Beyond The Shore">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {headline.map((word, i) => (
              <motion.span
                key={word}
                className="block text-gradient-hero"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(3.5rem, 9vw, 9rem)",
                  fontWeight: 300,
                  lineHeight: 1.0,
                  letterSpacing: "-0.01em",
                }}
                initial={{ opacity: 0, y: 80, rotateX: 40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.5 + i * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-white/50 mb-12 max-w-lg"
          style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", letterSpacing: "0.04em", lineHeight: 1.8 }}
        >
          Private yacht charters in the Arabian Sea — sunset cruises, celebrations, DJ nights & bespoke experiences from Goa.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-gold text-[12px] py-4 px-10">
            <Anchor size={14} />
            Book Now
          </a>
          <button
            onClick={() => document.querySelector("#yachts")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-outline-gold text-[12px] py-4 px-10"
          >
            Explore Yachts
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.6 }}
          className="flex items-center gap-8 mt-16 flex-wrap justify-center"
        >
          {[
            { value: "11+", label: "Premium Yachts" },
            { value: "500+", label: "Voyages Chartered" },
            { value: "4.9★", label: "Guest Rating" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span
                className="text-gradient-gold text-2xl"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600 }}
              >
                {stat.value}
              </span>
              <span className="text-white/40 text-[10px] tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-inter)" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-white/30 text-[9px] tracking-[0.4em] uppercase group-hover:text-gold/60 transition-colors" style={{ fontFamily: "var(--font-inter)" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-gold/50 group-hover:text-gold transition-colors" />
        </motion.div>
      </motion.button>
    </section>
  );
}
