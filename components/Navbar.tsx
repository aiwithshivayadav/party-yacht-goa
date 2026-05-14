"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { WHATSAPP_BASE } from "@/lib/data";

const WHATSAPP = `${WHATSAPP_BASE}?text=Hi%2C%20I%27d%20like%20to%20book%20a%20yacht%20in%20Goa!`;

const NAV_LINKS = [
  { label: "Experiences", href: "/experiences" },
  {
    label: "Yachts",
    href: "/yachts",
    children: [
      { label: "All Yachts", href: "/yachts" },
      { label: "Sunset 42", href: "/yachts/sunset-42" },
      { label: "Orca", href: "/yachts/orca" },
      { label: "Polaris", href: "/yachts/polaris" },
      { label: "Prestige 36", href: "/yachts/prestige-36" },
      { label: "MV Krishna", href: "/yachts/mv-krishna" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Book Now", href: "/book" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setDropdown(null); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[9000] transition-all duration-500"
        animate={{
          backgroundColor: scrolled || !isHome ? "rgba(2,4,8,0.92)" : "transparent",
          backdropFilter: scrolled || !isHome ? "blur(24px)" : "blur(0px)",
          borderBottom: scrolled || !isHome ? "1px solid rgba(201,169,110,0.1)" : "1px solid transparent",
        }}
      >
        <div className="container-luxury flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 flex items-center justify-center rounded-full border border-gold/40 group-hover:border-gold/80 transition-colors duration-300">
              <span className="text-sm font-heading text-gradient-gold" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600, letterSpacing: "0.05em" }}>PYG</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-white text-sm font-medium tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-inter)" }}>
                Party Yacht
              </div>
              <div className="text-gold/70 text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-inter)" }}>
                Goa
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.label} className="relative"
                onMouseEnter={() => link.children && setDropdown(link.label)}
                onMouseLeave={() => setDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 relative group ${isActive(link.href) ? "text-gold" : "text-white/70 hover:text-gold"}`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {link.label}
                  {link.children && <ChevronDown size={10} className="opacity-50 group-hover:opacity-100 transition-transform duration-300" style={{ transform: dropdown === link.label ? "rotate(180deg)" : "rotate(0)" }} />}
                  <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && dropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-4 w-48 py-2 rounded-xl overflow-hidden"
                      style={{ background: "rgba(2,4,8,0.97)", border: "1px solid rgba(201,169,110,0.12)", backdropFilter: "blur(20px)" }}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-xs tracking-wide text-white/60 hover:text-gold hover:bg-gold/5 transition-colors duration-200"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="hidden md:flex btn-gold text-[11px] py-3 px-6">
              <Phone size={13} /> Book Now
            </a>
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-gold/20 hover:border-gold/50 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={16} className="text-gold" /> : <Menu size={16} className="text-white/80" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[8999] flex flex-col items-center justify-center overflow-y-auto"
            style={{ background: "rgba(2,4,8,0.98)", backdropFilter: "blur(30px)" }}
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 48px) 48px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 48px) 48px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 48px) 48px)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="absolute w-80 h-80 rounded-full opacity-10 blur-[100px]"
              style={{ background: "radial-gradient(circle, #c9a96e, transparent)" }} />

            <ul className="relative z-10 flex flex-col items-center gap-6 py-16">
              {NAV_LINKS.map((link, i) => (
                <motion.li key={link.label} className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    className={`block text-4xl transition-colors duration-300 ${isActive(link.href) ? "text-gradient-gold" : "text-white/80 hover:text-gold"}`}
                    style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, letterSpacing: "0.05em" }}
                  >
                    {link.label}
                  </Link>
                  {/* Mobile sub-links */}
                  {link.children && (
                    <div className="flex flex-wrap justify-center gap-3 mt-3">
                      {link.children.slice(1).map((c) => (
                        <Link key={c.href} href={c.href}
                          className="text-[11px] tracking-[0.15em] uppercase text-white/30 hover:text-gold transition-colors"
                          style={{ fontFamily: "var(--font-inter)" }}>
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
              >
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-gold mt-4">
                  <Phone size={13} /> Book Now
                </a>
              </motion.li>
            </ul>
            <motion.p
              className="absolute bottom-10 text-white/20 text-xs tracking-[0.4em] uppercase"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            >
              partyyachtgoa.com
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
