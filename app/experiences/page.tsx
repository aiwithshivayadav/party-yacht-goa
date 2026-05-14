"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, IndianRupee, Check, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { EXPERIENCES, waLink } from "@/lib/data";

const ICONS: Record<string, string> = {
  sunset: "🌅", cake: "🎂", users: "🥂", heart: "💍",
  briefcase: "🏢", music: "🎧", diamond: "💎", sparkles: "🎆",
};

export default function ExperiencesPage() {
  return (
    <div style={{ background: "#020408", minHeight: "100vh" }}>
      <PageHero
        label="What We Offer"
        title="Experiences That"
        titleGold="Live Forever"
        subtitle="Every occasion deserves the ocean. Choose your story and we will make it extraordinary."
        image="/yachts/sunset-42/sunset-42-4.jpeg"
        height="55vh"
      />

      <section className="py-20">
        <div className="container-luxury flex flex-col gap-32">
          {EXPERIENCES.map((exp, i) => (
            <ExperienceBlock key={exp.slug} exp={exp} index={i} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ExperienceBlock({ exp, index }: { exp: typeof EXPERIENCES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`relative rounded-2xl overflow-hidden ${!isEven ? "lg:order-2" : ""}`}
        style={{ height: "420px" }}
      >
        <Image src={exp.image} alt={exp.title} fill className="object-cover" sizes="50vw" />
        <div className={`absolute inset-0 bg-gradient-to-${isEven ? "r" : "l"} from-[#020408]/30 via-transparent to-transparent`} />
        {/* Accent glow */}
        <div className="absolute top-6 left-6">
          <span className="text-3xl">{ICONS[exp.icon]}</span>
        </div>
        <div className="absolute bottom-6 left-6">
          <span className="text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full"
            style={{ fontFamily: "var(--font-inter)", background: `${exp.accent}22`, color: exp.accent, border: `1px solid ${exp.accent}40` }}>
            {exp.tag}
          </span>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        className={!isEven ? "lg:order-1" : ""}
      >
        <div className="section-label mb-5" style={{ color: exp.accent }}>{exp.subtitle}</div>
        <h2 className="text-white mb-5"
          style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, lineHeight: 1.15 }}>
          {exp.title}
        </h2>
        <p className="text-white/50 leading-relaxed mb-8"
          style={{ fontFamily: "var(--font-inter)", lineHeight: 1.9, fontSize: "0.95rem" }}>
          {exp.longDescription}
        </p>

        {/* What's included */}
        <div className="mb-8">
          <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-4" style={{ fontFamily: "var(--font-inter)" }}>
            What&apos;s Included
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {exp.includes.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Check size={12} style={{ color: exp.accent }} className="shrink-0" />
                <span className="text-white/50 text-sm" style={{ fontFamily: "var(--font-inter)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-6 mb-8 flex-wrap">
          <div className="flex items-center gap-2 text-sm" style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.4)" }}>
            <Clock size={13} style={{ color: exp.accent }} />
            {exp.duration}
          </div>
          <div className="flex items-center gap-1 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
            <IndianRupee size={13} style={{ color: exp.accent }} />
            <span style={{ color: exp.accent }}>From {exp.priceFrom}</span>
          </div>
        </div>

        {/* Recommended yachts */}
        <div className="mb-8">
          <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-3" style={{ fontFamily: "var(--font-inter)" }}>
            Recommended Yachts
          </p>
          <div className="flex gap-2 flex-wrap">
            {exp.bestYachts.map((slug) => (
              <Link key={slug} href={`/yachts/${slug}`}
                className="text-[11px] tracking-wide px-3 py-1.5 rounded-full transition-all duration-300 hover:border-gold/40 capitalize"
                style={{ fontFamily: "var(--font-inter)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
                {slug.replace(/-/g, " ")} <ArrowRight size={9} className="inline" />
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <a href={waLink(`Hi! I'm interested in booking a ${exp.title} experience in Goa. Please share details.`)}
          target="_blank" rel="noopener noreferrer"
          className="btn-gold inline-flex text-[12px] py-4 px-8"
          style={{ borderRadius: "2px" }}>
          Enquire About {exp.title}
        </a>
      </motion.div>
    </div>
  );
}
