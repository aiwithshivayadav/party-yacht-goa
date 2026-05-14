"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Priya & Arjun Mehta",
    occasion: "Anniversary Sunset Cruise",
    yacht: "Prestige 36",
    rating: 5,
    text: "We celebrated our 5th anniversary on the Prestige 36 and it was beyond anything we imagined. The crew was incredibly attentive, the sunset view was breathtaking, and the whole experience felt like something out of a dream. Absolutely worth every rupee.",
    location: "Mumbai",
    initial: "P",
  },
  {
    name: "Rohit Sharma",
    occasion: "Birthday Party",
    yacht: "Sunset 42",
    rating: 5,
    text: "Threw my 30th birthday party on the Sunset 42 with 35 friends. The DJ setup was insane, the deck was massive, and the whole crew made sure everyone was having the time of their lives. Party Yacht Goa exceeded all expectations — already planning the next one!",
    location: "Delhi",
    initial: "R",
  },
  {
    name: "Jake Thompson",
    occasion: "Bachelor Party",
    yacht: "Orca",
    rating: 5,
    text: "My bachelor party on the Orca was hands down the best experience of my life. The team organised everything — drinks, music, decorations — we just showed up and had the most epic night on the Arabian Sea. Highly recommend for any bachelor party in Goa.",
    location: "London, UK",
    initial: "J",
  },
  {
    name: "Sneha Kulkarni",
    occasion: "Corporate Team Outing",
    yacht: "MV Krishna",
    rating: 5,
    text: "Booked the MV Krishna for our annual team outing of 35 people. The experience was seamless — the booking process was easy, the yacht was spotless, and the crew were professional and friendly. Our team is still talking about it. Will definitely book again.",
    location: "Bangalore",
    initial: "S",
  },
  {
    name: "Aarav & Nisha Patel",
    occasion: "Proposal Setup",
    yacht: "Prestige 36",
    rating: 5,
    text: "Party Yacht Goa arranged the most perfect proposal setup. Rose petals, champagne, the sunset backdrop — she said yes before I even finished the question! The crew was discreet and made the whole moment magical. Cannot thank them enough.",
    location: "Ahmedabad",
    initial: "A",
  },
  {
    name: "Marco Ricci",
    occasion: "Sunset Cruise",
    yacht: "Polaris",
    rating: 5,
    text: "Traveling through Goa and decided to do a sunset cruise on the Polaris. Absolutely world class. The boat, the crew, the views — everything rivaled the best yacht experiences I've had in Greece or Croatia. Incredible value and an unforgettable evening.",
    location: "Rome, Italy",
    initial: "M",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #020408 0%, #0a1628 100%)" }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.05] blur-[100px]"
        style={{ background: "radial-gradient(circle, #c9a96e, transparent)" }} />

      <div className="container-luxury" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="section-label justify-center mb-6">Guest Stories</div>
          <h2 className="text-white mb-5"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, lineHeight: 1.1 }}>
            Words From The<br /><span className="text-gradient-gold italic">Ocean</span>
          </h2>
        </motion.div>

        {/* Main testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6 md:p-10 relative"
            >
              {/* Quote mark */}
              <div className="absolute top-8 right-10 opacity-10">
                <Quote size={80} className="text-gold" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: TESTIMONIALS[active].rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-gold fill-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/80 text-lg mb-8 relative z-10 leading-relaxed"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.7 }}>
                &ldquo;{TESTIMONIALS[active].text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium text-[#020408]"
                  style={{ background: "var(--gold)", fontFamily: "var(--font-cormorant)" }}>
                  {TESTIMONIALS[active].initial}
                </div>
                <div>
                  <div className="text-white font-medium text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                    {TESTIMONIALS[active].name}
                  </div>
                  <div className="text-white/40 text-xs tracking-wide" style={{ fontFamily: "var(--font-inter)" }}>
                    {TESTIMONIALS[active].occasion} &nbsp;·&nbsp; {TESTIMONIALS[active].yacht}
                  </div>
                  <div className="text-gold/60 text-xs mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
                    {TESTIMONIALS[active].location}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Dots & Mini cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Navigation dots */}
          <div className="flex gap-3">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); setIsPaused(true); }}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === active ? 28 : 8,
                  height: 8,
                  background: i === active ? "var(--gold)" : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>

          {/* Mini preview cards */}
          <div className="hidden md:flex gap-4 flex-wrap justify-center">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); setIsPaused(true); }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300"
                style={{
                  background: i === active ? "rgba(201,169,110,0.12)" : "rgba(255,255,255,0.03)",
                  border: i === active ? "1px solid rgba(201,169,110,0.3)" : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium text-[#020408] shrink-0"
                  style={{ background: i === active ? "var(--gold)" : "rgba(201,169,110,0.3)", fontFamily: "var(--font-cormorant)" }}>
                  {t.initial}
                </div>
                <div className="text-left">
                  <div className="text-white/70 text-xs font-medium" style={{ fontFamily: "var(--font-inter)" }}>{t.name.split(" ")[0]}</div>
                  <div className="text-white/30 text-[10px]" style={{ fontFamily: "var(--font-inter)" }}>{t.occasion}</div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Overall rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col items-center gap-2 px-10 py-6 rounded-2xl"
            style={{ background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.15)" }}>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="text-gold fill-gold" />
              ))}
            </div>
            <div className="text-gradient-gold text-4xl"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}>
              4.9 / 5.0
            </div>
            <div className="text-white/40 text-xs tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-inter)" }}>
              Average Rating from 300+ Reviews
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
