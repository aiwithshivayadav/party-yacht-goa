"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Shield, Award, Heart, Anchor } from "lucide-react";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { waLink } from "@/lib/data";

const VALUES = [
  { icon: Shield, title: "Safety First", desc: "Every voyage is crewed by certified professionals with full safety equipment, life jackets, and emergency protocols. Your wellbeing is never an afterthought." },
  { icon: Award, title: "Premium Quality", desc: "Our yachts are maintained to the highest standards. Clean, well-equipped, and inspected before every voyage — because you deserve the best." },
  { icon: Heart, title: "Personal Touch", desc: "Every booking is handled personally. We listen to what you want and build your experience around it — no templates, no shortcuts." },
  { icon: Anchor, title: "Local Expertise", desc: "We know Goa's waters intimately. The best sunset spots, the hidden coves, the perfect anchorage points. Years of experience on the Arabian Sea." },
];

const TEAM = [
  { name: "Captain Ravi Naik", role: "Head Captain & Founder", img: "/yachts/sunset-42/sunset-42-8.jpeg", bio: "15+ years navigating Goa's coast. Captain Ravi founded Party Yacht Goa with one vision — to make luxury ocean experiences accessible to everyone who visits Goa." },
  { name: "Priya Desai", role: "Guest Experience Manager", img: "/yachts/prestige-36/prestige-36-2.jpeg", bio: "Priya ensures every booking is flawless — from the first WhatsApp message to the final wave goodbye. Her attention to detail is what our 5-star reviews are made of." },
  { name: "DJ Arjun", role: "Head of Entertainment", img: "/yachts/orca/orca-5.jpeg", bio: "Goa's finest marine DJ, Arjun reads the crowd and the ocean equally well. His sets turn every DJ Yacht Night into a night that never ends." },
];

const MILESTONES = [
  { year: "2014", title: "Founded", desc: "Party Yacht Goa launched with just 2 vessels and a dream to show Goa from the water." },
  { year: "2017", title: "Fleet Expansion", desc: "Grew to 6 yachts. Introduced the Sunset 42, now our most popular vessel." },
  { year: "2020", title: "Digital Transformation", desc: "Built Goa's first premium online yacht booking experience during the quiet season." },
  { year: "2023", title: "11 Yachts, 500+ Voyages", desc: "Reached the milestone of 500+ chartered voyages and a 4.9-star average rating." },
  { year: "2025", title: "Goa's #1 Yacht Brand", desc: "Recognised as Goa's most trusted luxury yacht charter by our growing community of guests." },
];

export default function AboutPage() {
  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-10%" });
  const milestonesRef = useRef<HTMLDivElement>(null);
  const milestonesInView = useInView(milestonesRef, { once: true, margin: "-10%" });

  return (
    <div style={{ background: "#020408", minHeight: "100vh" }}>
      <PageHero
        label="Our Story"
        title="Born on the"
        titleGold="Arabian Sea"
        subtitle="We started Party Yacht Goa with one belief — that the ocean should be experienced, not just seen. A decade later, we're still chasing that horizon."
        image="/yachts/polaris/polaris-10.jpeg"
        height="60vh"
      />

      {/* Mission */}
      <section className="py-24">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <div className="section-label mb-6">Who We Are</div>
              <h2 className="text-white mb-6"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, lineHeight: 1.2 }}>
                Goa&apos;s Most Trusted<br />
                <span className="text-gradient-gold italic">Luxury Yacht Charter</span>
              </h2>
              <div className="space-y-5 text-white/50 text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)", lineHeight: 1.9 }}>
                <p>Party Yacht Goa was born in 2014 from a simple observation: Goa has one of the world&apos;s most beautiful coastlines — and almost nobody was experiencing it from the water in style.</p>
                <p>We started with two vessels and a lot of passion. Today, we operate a fleet of 11 premium yachts, have hosted over 500 chartered voyages, and carry a 4.9-star rating earned from thousands of guests who trusted us with their most important celebrations.</p>
                <p>From intimate sunset cruises for two, to DJ yacht parties for 50, to meticulously planned marriage proposals on the Arabian Sea — every experience we create is personal, professional, and unforgettable.</p>
              </div>
              <div className="flex gap-4 mt-10">
                <a href={waLink("Hi! I'd like to learn more about Party Yacht Goa and book an experience.")}
                  target="_blank" rel="noopener noreferrer" className="btn-gold text-[12px] py-4 px-8">
                  Book an Experience
                </a>
                <Link href="/yachts" className="btn-outline-gold text-[12px] py-4 px-8">
                  View Fleet
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                "/yachts/sunset-42/sunset-42-7.jpeg",
                "/yachts/orca/orca-4.jpeg",
                "/yachts/polaris/polaris-3.jpeg",
                "/yachts/prestige-36/prestige-36-3.jpeg",
              ].map((src, i) => (
                <div key={i} className={`relative overflow-hidden rounded-2xl ${i === 0 ? "row-span-2" : ""}`}
                  style={{ height: i === 0 ? "380px" : "180px" }}>
                  <Image src={src} alt="Party Yacht Goa" fill className="object-cover" sizes="25vw" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16" style={{ background: "rgba(10,22,40,0.5)" }}>
        <div className="container-luxury">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {[
              { val: "11+", label: "Premium Yachts" },
              { val: "500+", label: "Voyages Chartered" },
              { val: "4.9★", label: "Average Rating" },
              { val: "10+", label: "Years on the Sea" },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-2 py-12 text-center"
                style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="text-gradient-gold text-5xl" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}>{s.val}</div>
                <div className="text-white/40 text-[11px] tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-inter)" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24" ref={valuesRef}>
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="section-label justify-center mb-5">What Drives Us</div>
            <h2 className="text-white" style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300 }}>
              Our <span className="text-gradient-gold italic">Values</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="glass-card p-7 flex flex-col gap-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)" }}>
                    <Icon size={22} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="text-white text-xl mb-2" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}>{v.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)", lineHeight: 1.8 }}>{v.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24" ref={milestonesRef} style={{ background: "rgba(10,22,40,0.3)" }}>
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={milestonesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="section-label justify-center mb-5">Our Journey</div>
            <h2 className="text-white" style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300 }}>
              A Decade on the <span className="text-gradient-gold italic">Arabian Sea</span>
            </h2>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent" />
            <div className="flex flex-col gap-10">
              {MILESTONES.map((m, i) => (
                <motion.div key={m.year}
                  initial={{ opacity: 0, x: -30 }}
                  animate={milestonesInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex gap-8 items-start pl-4">
                  <div className="relative z-10 shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1"
                    style={{ background: "rgba(201,169,110,0.15)", border: "1.5px solid var(--gold)" }}>
                    <div className="w-2 h-2 rounded-full bg-gold" />
                  </div>
                  <div className="glass-card p-6 flex-1">
                    <span className="text-gold text-sm font-medium tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>{m.year}</span>
                    <h3 className="text-white text-xl mt-1 mb-2" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}>{m.title}</h3>
                    <p className="text-white/40 text-sm" style={{ fontFamily: "var(--font-inter)", lineHeight: 1.7 }}>{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <div className="section-label justify-center mb-5">The People Behind It</div>
            <h2 className="text-white" style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300 }}>
              Our <span className="text-gradient-gold italic">Team</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member, i) => (
              <motion.div key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card overflow-hidden rounded-2xl">
                <div className="relative h-56 overflow-hidden">
                  <Image src={member.img} alt={member.name} fill className="object-cover" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020408]/80 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-white text-xl mb-0.5" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}>{member.name}</h3>
                  <p className="text-gold/70 text-xs tracking-[0.15em] uppercase mb-4" style={{ fontFamily: "var(--font-inter)" }}>{member.role}</p>
                  <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)", lineHeight: 1.8 }}>{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
