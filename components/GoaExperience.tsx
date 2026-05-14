"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll } from "framer-motion";
import Image from "next/image";

const STATS = [
  { value: 500, suffix: "+", label: "Voyages Chartered" },
  { value: 4.9, suffix: "★", label: "Average Guest Rating" },
  { value: 11, suffix: "", label: "Premium Yachts" },
  { value: 10, suffix: "+", label: "Years of Excellence" },
];

function CountUp({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const isDecimal = !Number.isInteger(target);
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span>{Number.isInteger(target) ? count : count.toFixed(1)}{suffix}</span>
  );
}

const STORIES = [
  {
    image: "/yachts/sunset-42/sunset-42-1.jpeg",
    title: "The Arabian Sea at Sunset",
    subtitle: "Where the sky bleeds gold and time stops",
    desc: "Watch the sun melt into the Arabian Sea from the deck of your private yacht. There is no filter for this. No Instagram preset that captures what your eyes see. Just the ocean, the sky, and an emotion that stays with you forever.",
    align: "right" as const,
  },
  {
    image: "/yachts/polaris/polaris-1.jpeg",
    title: "Goa From the Ocean",
    subtitle: "A perspective that changes everything",
    desc: "The coast of Goa looks different from the water — lush, dramatic, and impossibly beautiful. Away from the crowds, away from the noise. Just you, the breeze, and the world reduced to its most essential form.",
    align: "left" as const,
  },
  {
    image: "/yachts/orca/orca-1.jpeg",
    title: "Nights That Never End",
    subtitle: "DJ, stars, and an infinite horizon",
    desc: "When the sun goes down, the ocean comes alive. A private DJ set, cocktails glowing under LED lights, and a horizon that stretches to infinity. This is what Goa nightlife looks like when you own the ocean for a night.",
    align: "right" as const,
  },
];

export default function GoaExperience() {
  const ref = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const statsInView = useInView(statsRef, { once: true, margin: "-10%" });

  // scrollYProgress reserved for future parallax use
  useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} className="relative overflow-hidden py-24" style={{ background: "#020408" }}>
      {/* Header */}
      <div className="container-luxury text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="section-label justify-center mb-6">The Goa Experience</div>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, lineHeight: 1.1 }}
            className="text-white mb-6">
            Feel It Before<br /><span className="text-gradient-gold italic">You Even Board</span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto text-sm" style={{ fontFamily: "var(--font-inter)", lineHeight: 1.8 }}>
            Goa from the ocean is a different world. This is where luxury travel stops being about destinations — and starts being about moments.
          </p>
        </motion.div>
      </div>

      {/* Story sections */}
      <div className="flex flex-col gap-0">
        {STORIES.map((story, i) => (
          <StoryBlock key={i} story={story} />
        ))}
      </div>

      {/* Stats */}
      <div ref={statsRef} className="container-luxury mt-28">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center gap-2 py-12 px-6 text-center"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="text-gradient-gold text-5xl"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}>
                <CountUp target={stat.value} suffix={stat.suffix} inView={statsInView} />
              </div>
              <div className="text-white/40 text-[11px] tracking-[0.25em] uppercase"
                style={{ fontFamily: "var(--font-inter)" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryBlock({ story }: { story: typeof STORIES[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isLeft = story.align === "left";

  return (
    <div ref={ref} className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Full-width image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={story.image}
          alt={story.title}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className={`absolute inset-0 ${isLeft
          ? "bg-gradient-to-r from-[#020408] via-[#020408]/70 to-transparent"
          : "bg-gradient-to-l from-[#020408] via-[#020408]/70 to-transparent"
          }`} />
        <div className="absolute inset-0 bg-[#020408]/30" />
      </div>

      {/* Content */}
      <div className="container-luxury relative z-10 w-full py-24">
        <div className={`max-w-lg w-full ${isLeft ? "lg:ml-0" : "lg:ml-auto"}`}>
          <motion.div
            initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="section-label mb-5">{story.subtitle}</div>
            <h3 className="text-white mb-5"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, lineHeight: 1.2 }}>
              {story.title}
            </h3>
            <p className="text-white/50 leading-relaxed text-sm" style={{ fontFamily: "var(--font-inter)", lineHeight: 1.9 }}>
              {story.desc}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
