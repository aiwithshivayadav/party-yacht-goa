"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sunset, Cake, Users, Heart, Briefcase, Music, Diamond, Sparkles } from "lucide-react";

const EXPERIENCES = [
  {
    icon: Sunset,
    title: "Sunset Cruise",
    desc: "Drift into the golden hour on the Arabian Sea. Champagne, music, and a sky that paints itself for you.",
    tag: "Most Popular",
    color: "from-amber-900/40 to-orange-900/20",
    accent: "#f59e0b",
  },
  {
    icon: Cake,
    title: "Birthday Party",
    desc: "Celebrate in style with a private yacht, décor, cake cutting and unforgettable ocean memories.",
    tag: "Celebrated 200+",
    color: "from-pink-900/40 to-rose-900/20",
    accent: "#ec4899",
  },
  {
    icon: Users,
    title: "Bachelor Party",
    desc: "The ultimate pre-wedding celebration — DJ, drinks, Goa vibes and the open sea.",
    tag: "Wildly Popular",
    color: "from-purple-900/40 to-violet-900/20",
    accent: "#a855f7",
  },
  {
    icon: Heart,
    title: "Couple Yacht Date",
    desc: "A private deck, ocean breeze, candlelight dinner and just the two of you. Romance redefined.",
    tag: "Most Romantic",
    color: "from-red-900/40 to-rose-900/20",
    accent: "#ef4444",
  },
  {
    icon: Briefcase,
    title: "Corporate Events",
    desc: "Impress clients and reward your team with a premium floating corporate experience.",
    tag: "Premium",
    color: "from-blue-900/40 to-indigo-900/20",
    accent: "#3b82f6",
  },
  {
    icon: Music,
    title: "DJ Yacht Party",
    desc: "Turn up the volume on the ocean. Live DJ, lights, cocktails and non-stop energy.",
    tag: "High Energy",
    color: "from-cyan-900/40 to-teal-900/20",
    accent: "#06b6d4",
  },
  {
    icon: Diamond,
    title: "Proposal Setup",
    desc: "Say 'yes' against a backdrop of the setting sun and infinite ocean. We handle every detail.",
    tag: "Magical",
    color: "from-emerald-900/40 to-green-900/20",
    accent: "#10b981",
  },
  {
    icon: Sparkles,
    title: "Fireworks Night",
    desc: "Sky-lighting fireworks above the sea — New Year's, anniversaries, or just because you can.",
    tag: "Spectacular",
    color: "from-yellow-900/40 to-amber-900/20",
    accent: "#eab308",
  },
];

const WHATSAPP_BASE = "https://wa.me/918960070105?text=Hi%2C%20I%27m%20interested%20in%20";

export default function Experiences() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="experiences" className="relative py-32 overflow-hidden" style={{ background: "#020408" }}>
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#020408] to-transparent" />
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.04] blur-[120px]"
        style={{ background: "radial-gradient(circle, #c9a96e, transparent)" }} />

      <div className="container-luxury" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="section-label justify-center mb-6">
            Curated For You
          </div>
          <h2 className="text-gradient-gold mb-6"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, lineHeight: 1.1 }}>
            Experiences That<br /><em>Live Forever</em>
          </h2>
          <p className="text-white/40 max-w-md mx-auto text-sm" style={{ fontFamily: "var(--font-inter)", lineHeight: 1.8 }}>
            Every occasion deserves the ocean. Choose your story — we make it extraordinary.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EXPERIENCES.map((exp, i) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-2xl glass-card p-7 flex flex-col gap-5 cursor-pointer"
                style={{ minHeight: 260 }}
                onClick={() => window.open(`${WHATSAPP_BASE}${encodeURIComponent(exp.title)}`, "_blank")}
              >
                {/* Bg gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                {/* Glow border on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: `inset 0 0 0 1px ${exp.accent}30` }} />

                {/* Tag */}
                <div className="absolute top-5 right-5">
                  <span className="text-[9px] tracking-[0.2em] uppercase px-2 py-1 rounded-full"
                    style={{ fontFamily: "var(--font-inter)", background: `${exp.accent}20`, color: exp.accent }}>
                    {exp.tag}
                  </span>
                </div>

                {/* Icon */}
                <div className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${exp.accent}15`, border: `1px solid ${exp.accent}25` }}>
                  <Icon size={22} style={{ color: exp.accent }} />
                </div>

                {/* Text */}
                <div className="relative z-10 flex flex-col gap-2 flex-1">
                  <h3 className="text-white text-xl group-hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}>
                    {exp.title}
                  </h3>
                  <p className="text-white/40 text-sm group-hover:text-white/60 transition-colors leading-relaxed"
                    style={{ fontFamily: "var(--font-inter)" }}>
                    {exp.desc}
                  </p>
                </div>

                {/* Arrow */}
                <div className="relative z-10 flex items-center gap-2 mt-auto">
                  <span className="text-[11px] tracking-[0.2em] uppercase transition-colors duration-300"
                    style={{ fontFamily: "var(--font-inter)", color: exp.accent, opacity: 0 }}
                    data-hover-show>
                  </span>
                  <motion.span
                    className="text-xs tracking-[0.15em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ fontFamily: "var(--font-inter)", color: exp.accent }}
                  >
                    Enquire Now →
                  </motion.span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom marquee */}
        <div className="mt-20 overflow-hidden opacity-20">
          <div className="marquee-track whitespace-nowrap">
            {Array(4).fill(null).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-8 mx-8 text-gold text-sm tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>
                Sunset Cruise &nbsp;✦&nbsp; Birthday Party &nbsp;✦&nbsp; Bachelor Night &nbsp;✦&nbsp; Couple Date &nbsp;✦&nbsp; DJ Party &nbsp;✦&nbsp; Corporate Event &nbsp;✦&nbsp; Proposal &nbsp;✦&nbsp; Fireworks &nbsp;✦&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
