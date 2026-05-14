"use client";

import { motion } from "framer-motion";
import { Star, Shield, Users, Award } from "lucide-react";

const TRUST_ITEMS = [
  { icon: Star, value: "4.9★", label: "Guest Rating", sub: "247 reviews" },
  { icon: Users, value: "1,200+", label: "Parties Hosted", sub: "Since 2015" },
  { icon: Shield, value: "100%", label: "Safety Record", sub: "Licensed & insured" },
  { icon: Award, value: "11", label: "Premium Yachts", sub: "₹8K–₹25K+" },
];

export default function TrustBar() {
  return (
    <div
      className="relative z-10 border-y"
      style={{ background: "rgba(201,169,110,0.04)", borderColor: "rgba(201,169,110,0.12)" }}
    >
      <div className="container-luxury py-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x"
          style={{ "--tw-divide-opacity": 1 } as React.CSSProperties}>
          {TRUST_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex items-center gap-3 lg:justify-center lg:px-6"
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)" }}>
                  <Icon size={16} style={{ color: "#c9a96e" }} />
                </div>
                <div>
                  <div className="text-base font-semibold leading-none mb-0.5"
                    style={{ fontFamily: "var(--font-cormorant)", color: "#e8d5a3", fontSize: "18px" }}>
                    {item.value}
                  </div>
                  <div className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-inter)" }}>
                    {item.label}
                  </div>
                  <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>
                    {item.sub}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
