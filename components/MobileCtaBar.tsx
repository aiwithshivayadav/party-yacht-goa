"use client";

import { Phone, MessageCircle } from "lucide-react";

const WA = "https://wa.me/918960070105?text=Hi%2C%20I%27d%20like%20to%20book%20a%20yacht%20in%20Goa!";
const CALL = "tel:+918960070105";

export default function MobileCtaBar() {
  return (
    <div className="mobile-cta-bar">
      <a
        href={CALL}
        className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl text-sm font-medium transition-colors"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.8)",
          fontFamily: "var(--font-inter)",
        }}
      >
        <Phone size={15} />
        Call
      </a>
      <a
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 flex-[2] py-3 rounded-xl text-sm font-semibold transition-all"
        style={{
          background: "linear-gradient(135deg, #c9a96e, #e8d5a3, #c9a96e)",
          color: "#020408",
          fontFamily: "var(--font-inter)",
          letterSpacing: "0.05em",
        }}
      >
        <MessageCircle size={15} />
        Book on WhatsApp
      </a>
    </div>
  );
}
