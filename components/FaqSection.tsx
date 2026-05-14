"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "How much does it cost to rent a yacht in Goa?",
    a: "Yacht rentals in Goa start from ₹8,000 for a 2-hour sunset cruise for small groups. Party yachts for larger groups typically range from ₹15,000 to ₹25,000+ per cruise. Prices depend on the yacht, duration, and group size. WhatsApp us for a custom quote.",
  },
  {
    q: "How many guests can a party yacht accommodate?",
    a: "Our fleet ranges from intimate yachts for 2–10 guests to large party vessels for up to 50 guests. The Sunset 42 is our largest vessel and ideal for big celebrations. Tell us your group size and we'll recommend the perfect yacht.",
  },
  {
    q: "Do you provide a DJ and music system on the yacht?",
    a: "Yes! Our party yachts like Sunset 42 and MV Krishna come with professional DJ systems, full LED lighting rigs, and premium sound systems. Smaller yachts have Bluetooth audio. You can also bring your own playlist.",
  },
  {
    q: "Can we bring our own food and drinks on board?",
    a: "Absolutely. You're welcome to bring your own food and beverages. We also offer a bar setup service on request. Just let us know your requirements during booking and we'll make sure everything is ready.",
  },
  {
    q: "How do I book a yacht in Goa?",
    a: "The easiest way is to WhatsApp us at +91 89600 70105 — tell us your date, group size, and occasion. You can also use the booking form on our website. We confirm availability and send a quote within 15 minutes.",
  },
  {
    q: "Are your yachts safe? What safety equipment is on board?",
    a: "All our yachts are fully licensed, insured, and regularly inspected. Every voyage includes certified life jackets for all guests, a trained crew, first aid kit, and emergency equipment. Your safety is our first priority.",
  },
  {
    q: "What is the best time of year to charter a yacht in Goa?",
    a: "October to May is the ideal season — calm seas, stunning sunsets, and perfect weather. November to February is peak season with the most comfortable conditions. We operate year-round and can advise on the best experiences for your travel dates.",
  },
  {
    q: "Can you arrange decorations for birthdays or proposals?",
    a: "Yes! We specialise in customised setups — rose petals, balloons, banners, candles, fairy lights, and champagne service for birthdays, anniversaries, and proposals. Just tell us your vision and we'll handle every detail.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section id="faq" className="relative py-24 overflow-hidden" style={{ background: "#020408" }} ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container-luxury max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="section-label justify-center mb-4">FAQ</div>
          <h2 className="text-white mb-3"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 300 }}>
            Common Questions
          </h2>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
            Everything you need to know before you set sail.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="rounded-2xl overflow-hidden transition-all"
              style={{
                background: open === i ? "rgba(201,169,110,0.06)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${open === i ? "rgba(201,169,110,0.2)" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-sm font-medium pr-4"
                  style={{
                    fontFamily: "var(--font-inter)",
                    color: open === i ? "#e8d5a3" : "rgba(255,255,255,0.8)",
                    lineHeight: 1.5,
                  }}>
                  {faq.q}
                </span>
                <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: open === i ? "rgba(201,169,110,0.2)" : "rgba(255,255,255,0.06)" }}>
                  {open === i
                    ? <Minus size={12} style={{ color: "#c9a96e" }} />
                    : <Plus size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
                  }
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-inter)", lineHeight: 1.8 }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-10"
        >
          <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>
            Still have questions?
          </p>
          <a
            href="https://wa.me/918960070105?text=Hi%2C%20I%20have%20a%20question%20about%20booking%20a%20yacht%20in%20Goa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium transition-colors hover:text-gold"
            style={{ color: "#c9a96e", fontFamily: "var(--font-inter)" }}
          >
            Ask us on WhatsApp →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
