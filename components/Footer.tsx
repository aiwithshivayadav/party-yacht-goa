"use client";

import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

const QUICK_LINKS = [
  { label: "Experiences", href: "#experiences" },
  { label: "Yacht Fleet", href: "#yachts" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Book Now", href: "#booking" },
];

const EXPERIENCES_LINKS = [
  "Sunset Cruise",
  "Birthday Party",
  "Bachelor Party",
  "Couple Date",
  "Corporate Events",
  "DJ Yacht Party",
  "Proposal Setup",
  "Fireworks Night",
];

const SOCIALS = [
  { icon: Instagram, href: "https://instagram.com/partyyachtgoa", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com/partyyachtgoa", label: "Facebook" },
  { icon: Youtube, href: "https://youtube.com/@partyyachtgoa", label: "YouTube" },
];

const WA = "https://wa.me/918960070105";

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: "#020408" }}>
      {/* Top gold line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Pre-footer ambient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full opacity-[0.04] blur-[100px]"
        style={{ background: "radial-gradient(circle, #c9a96e, transparent)" }} />

      <div className="container-luxury relative z-10">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-20">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center">
                <span className="text-gradient-gold font-heading text-base" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600 }}>
                  PYG
                </span>
              </div>
              <div>
                <div className="text-white text-sm tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}>
                  Party Yacht Goa
                </div>
                <div className="text-gold/50 text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-inter)" }}>
                  Luxury Yacht Experiences
                </div>
              </div>
            </div>

            <p className="text-white/30 text-sm leading-relaxed mb-8" style={{ fontFamily: "var(--font-inter)", lineHeight: 1.8 }}>
              Goa&apos;s most trusted luxury yacht charter. From intimate sunset escapes to grand celebrations — your ocean story starts here.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:border-gold/60"
                    style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
                  >
                    <Icon size={15} className="text-white/40 hover:text-gold transition-colors duration-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white/60 text-[10px] tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "var(--font-inter)" }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-white/40 hover:text-gold text-sm transition-colors duration-300 flex items-center gap-2 group"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <span className="w-4 h-px bg-white/20 group-hover:bg-gold group-hover:w-6 transition-all duration-300" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Experiences */}
          <div>
            <h4 className="text-white/60 text-[10px] tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "var(--font-inter)" }}>
              Experiences
            </h4>
            <ul className="space-y-3">
              {EXPERIENCES_LINKS.map((exp) => (
                <li key={exp}>
                  <a
                    href={`${WA}?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(exp)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-gold text-sm transition-colors duration-300 flex items-center gap-2 group"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <span className="w-4 h-px bg-white/20 group-hover:bg-gold group-hover:w-6 transition-all duration-300" />
                    {exp}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/60 text-[10px] tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "var(--font-inter)" }}>
              Contact
            </h4>
            <ul className="space-y-5">
              <li>
                <a href={`tel:+918960070105`}
                  className="flex items-start gap-3 text-white/40 hover:text-gold transition-colors duration-300 group">
                  <Phone size={14} className="mt-0.5 text-gold/50 group-hover:text-gold transition-colors shrink-0" />
                  <div>
                    <div className="text-xs tracking-[0.1em] mb-0.5" style={{ fontFamily: "var(--font-inter)" }}>+91 89600 70105</div>
                    <div className="text-[10px] text-white/20" style={{ fontFamily: "var(--font-inter)" }}>Call or WhatsApp</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:hello@partyyachtgoa.com"
                  className="flex items-start gap-3 text-white/40 hover:text-gold transition-colors duration-300 group">
                  <Mail size={14} className="mt-0.5 text-gold/50 group-hover:text-gold transition-colors shrink-0" />
                  <div className="text-xs tracking-[0.05em]" style={{ fontFamily: "var(--font-inter)" }}>
                    hello@partyyachtgoa.com
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/40">
                  <MapPin size={14} className="mt-0.5 text-gold/50 shrink-0" />
                  <div>
                    <div className="text-xs tracking-[0.05em] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                      Panaji Marina, Goa — 403001<br />India
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            {/* WA button */}
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center gap-2 px-5 py-3 rounded-xl text-sm transition-all duration-300 hover:border-[#25D366]/60 w-fit"
              style={{
                fontFamily: "var(--font-inter)",
                background: "rgba(37,211,102,0.08)",
                border: "1px solid rgba(37,211,102,0.2)",
                color: "#25D366",
                fontWeight: 500,
                letterSpacing: "0.03em",
              }}
            >
              <svg viewBox="0 0 24 24" fill="#25D366" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs tracking-wide" style={{ fontFamily: "var(--font-inter)" }}>
            © {new Date().getFullYear()} Party Yacht Goa. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "partyyachtgoa.com"].map((t) => (
              <span key={t} className="text-white/20 text-xs tracking-wide hover:text-white/40 transition-colors cursor-pointer"
                style={{ fontFamily: "var(--font-inter)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
