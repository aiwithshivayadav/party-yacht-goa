"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Check, Loader2, MessageCircle, Calendar, Users, User, Phone, Mail, Anchor } from "lucide-react";

const OCCASIONS = ["Sunset Cruise","Birthday Party","Anniversary","Couple Date","Proposal","Bachelor Party","DJ Night","Corporate Event","Family Trip","Fireworks Night"];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  yachtName?: string;
  yachtSlug?: string;
  priceFrom?: number;
}

type Step = "form" | "loading" | "success";

export default function BookingModal({ isOpen, onClose, yachtName = "", yachtSlug = "", priceFrom = 0 }: Props) {
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    date: "", guests: "2", occasion: "", requests: "",
  });
  const [errors, setErrors] = useState<Record<string,string>>({});

  // Reset when opened
  useEffect(() => {
    if (isOpen) { setStep("form"); setErrors({}); }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) { document.body.style.overflow = "hidden"; }
    else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const set = (k: string, v: string) => { setForm((f) => ({ ...f, [k]: v })); setErrors((e) => ({ ...e, [k]: "" })); };

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.name.trim())    e.name    = "Your name is required";
    if (!form.phone.trim())   e.phone   = "Phone number is required";
    if (form.phone && !/^\+?[\d\s\-()]{8,}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (!form.date)           e.date    = "Please select a date";
    if (!form.occasion)       e.occasion = "Please select an occasion";
    if (!form.guests || Number(form.guests) < 1) e.guests = "At least 1 guest required";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setStep("loading");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:   form.name,
          phone:  form.phone,
          email:  form.email,
          yachtName,
          yachtSlug,
          occasion: form.occasion,
          date:     form.date,
          adults:   Number(form.guests),
          budget:   priceFrom ? `₹${(priceFrom/1000).toFixed(0)}K+` : "Flexible",
          source:   "website_booking_form",
          specialRequests: form.requests,
        }),
      });
    } catch { /* save failed silently — still go to WA */ }

    setStep("success");

    // Auto-redirect to WhatsApp after 1.5s
    setTimeout(() => {
      const msg = [
        `Hi! I'd like to book a yacht in Goa 🛥️`,
        ``,
        `*Yacht:* ${yachtName || "Any available yacht"}`,
        `*Date:* ${form.date}`,
        `*Occasion:* ${form.occasion}`,
        `*Guests:* ${form.guests}`,
        `*Name:* ${form.name}`,
        `*Phone:* ${form.phone}`,
        form.requests ? `*Requests:* ${form.requests}` : "",
      ].filter(Boolean).join("\n");

      window.open(`https://wa.me/918960070105?text=${encodeURIComponent(msg)}`, "_blank");
    }, 1500);
  };

  const inp = "w-full px-4 py-3 rounded-xl outline-none text-[13px] transition-all";
  const inpStyle = (key: string): React.CSSProperties => ({
    background: errors[key] ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.04)",
    border: `1px solid ${errors[key] ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.1)"}`,
    color: "rgba(255,255,255,0.85)",
    fontFamily: "var(--font-inter)",
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[9998]"
            style={{ background: "rgba(2,4,8,0.85)", backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl"
              style={{
                background: "linear-gradient(145deg, #0d0e1a 0%, #0a0b16 100%)",
                border: "1px solid rgba(201,169,110,0.2)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,169,110,0.05) inset",
              }}
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button onClick={onClose}
                className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                <X size={15} style={{ color: "rgba(255,255,255,0.5)" }} />
              </button>

              <AnimatePresence mode="wait">
                {/* ── FORM ── */}
                {step === "form" && (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-7">
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                          style={{ background: "rgba(201,169,110,0.15)", border: "1px solid rgba(201,169,110,0.25)" }}>
                          <Anchor size={15} style={{ color: "#c9a96e" }} />
                        </div>
                        <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: "rgba(201,169,110,0.7)", fontFamily: "var(--font-inter)" }}>
                          Booking Request
                        </span>
                      </div>
                      <h2 className="text-white mb-1" style={{ fontFamily: "var(--font-cormorant)", fontSize: "26px", fontWeight: 300 }}>
                        {yachtName ? `Book ${yachtName}` : "Book Your Yacht"}
                      </h2>
                      <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>
                        Fill in your details — we'll confirm via WhatsApp in 15 mins
                      </p>
                      {priceFrom > 0 && (
                        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                          style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)" }}>
                          <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>Starting from</span>
                          <span className="text-[14px] font-semibold" style={{ color: "#c9a96e", fontFamily: "var(--font-cormorant)" }}>
                            ₹{priceFrom.toLocaleString("en-IN")}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Fields */}
                    <div className="space-y-4">
                      {/* Name */}
                      <div>
                        <label className="flex items-center gap-1.5 text-[11px] mb-1.5 tracking-wide" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
                          <User size={10} /> Your Name <span style={{ color: "#c9a96e" }}>*</span>
                        </label>
                        <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)}
                          placeholder="Full name" className={inp} style={inpStyle("name")} />
                        {errors.name && <p className="text-[11px] mt-1" style={{ color: "#f87171", fontFamily: "var(--font-inter)" }}>{errors.name}</p>}
                      </div>

                      {/* Phone + Email row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="flex items-center gap-1.5 text-[11px] mb-1.5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
                            <Phone size={10} /> Phone <span style={{ color: "#c9a96e" }}>*</span>
                          </label>
                          <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)}
                            placeholder="+91 98765 43210" className={inp} style={inpStyle("phone")} />
                          {errors.phone && <p className="text-[11px] mt-1" style={{ color: "#f87171", fontFamily: "var(--font-inter)" }}>{errors.phone}</p>}
                        </div>
                        <div>
                          <label className="flex items-center gap-1.5 text-[11px] mb-1.5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
                            <Mail size={10} /> Email
                          </label>
                          <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
                            placeholder="email@example.com" className={inp} style={inpStyle("email")} />
                        </div>
                      </div>

                      {/* Date + Guests row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="flex items-center gap-1.5 text-[11px] mb-1.5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
                            <Calendar size={10} /> Date <span style={{ color: "#c9a96e" }}>*</span>
                          </label>
                          <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            className={inp} style={{ ...inpStyle("date"), colorScheme: "dark" }} />
                          {errors.date && <p className="text-[11px] mt-1" style={{ color: "#f87171", fontFamily: "var(--font-inter)" }}>{errors.date}</p>}
                        </div>
                        <div>
                          <label className="flex items-center gap-1.5 text-[11px] mb-1.5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
                            <Users size={10} /> Guests <span style={{ color: "#c9a96e" }}>*</span>
                          </label>
                          <input type="number" value={form.guests} onChange={(e) => set("guests", e.target.value)}
                            min="1" max="100" className={inp} style={inpStyle("guests")} />
                          {errors.guests && <p className="text-[11px] mt-1" style={{ color: "#f87171", fontFamily: "var(--font-inter)" }}>{errors.guests}</p>}
                        </div>
                      </div>

                      {/* Occasion */}
                      <div>
                        <label className="text-[11px] mb-2 block tracking-wide" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
                          Occasion <span style={{ color: "#c9a96e" }}>*</span>
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {OCCASIONS.map((o) => {
                            const on = form.occasion === o;
                            return (
                              <button key={o} type="button" onClick={() => set("occasion", o)}
                                className="px-3 py-1.5 rounded-full text-[11px] transition-all"
                                style={{
                                  background: on ? "rgba(201,169,110,0.18)" : "rgba(255,255,255,0.04)",
                                  border: on ? "1px solid rgba(201,169,110,0.45)" : "1px solid rgba(255,255,255,0.08)",
                                  color: on ? "#c9a96e" : "rgba(255,255,255,0.45)",
                                  fontFamily: "var(--font-inter)",
                                }}>
                                {o}
                              </button>
                            );
                          })}
                        </div>
                        {errors.occasion && <p className="text-[11px] mt-1.5" style={{ color: "#f87171", fontFamily: "var(--font-inter)" }}>{errors.occasion}</p>}
                      </div>

                      {/* Requests */}
                      <div>
                        <label className="text-[11px] mb-1.5 block" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
                          Special Requests
                        </label>
                        <textarea value={form.requests} onChange={(e) => set("requests", e.target.value)}
                          placeholder="Decoration, DJ, cake, photographer, or anything else..."
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl outline-none text-[13px] resize-none"
                          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-inter)", lineHeight: "1.6" }} />
                      </div>
                    </div>

                    {/* Submit */}
                    <button onClick={handleSubmit}
                      className="mt-6 w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-semibold text-[13px] tracking-wide transition-all duration-300"
                      style={{
                        background: "linear-gradient(135deg, #c9a96e, #e8d5a3, #c9a96e)",
                        backgroundSize: "200%",
                        color: "#020408",
                        fontFamily: "var(--font-inter)",
                        letterSpacing: "0.08em",
                        boxShadow: "0 8px 32px rgba(201,169,110,0.3)",
                      }}>
                      <MessageCircle size={16} />
                      Confirm & Open WhatsApp
                      <ChevronRight size={15} />
                    </button>

                    <p className="text-center text-[11px] mt-3" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-inter)" }}>
                      Your inquiry is saved · We reply in 15 minutes · No booking fee
                    </p>
                  </motion.div>
                )}

                {/* ── LOADING ── */}
                {step === "loading" && (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-20 px-7">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                      style={{ background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.2)" }}>
                      <Loader2 size={28} className="animate-spin" style={{ color: "#c9a96e" }} />
                    </div>
                    <h3 className="text-white text-xl mb-2" style={{ fontFamily: "var(--font-cormorant)", fontSize: "22px" }}>Saving Your Request…</h3>
                    <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>Opening WhatsApp right after</p>
                  </motion.div>
                )}

                {/* ── SUCCESS ── */}
                {step === "success" && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 px-7 text-center">
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 18, delay: 0.1 }}
                      className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
                      <Check size={36} style={{ color: "#34d399" }} />
                    </motion.div>
                    <h3 className="text-white mb-2" style={{ fontFamily: "var(--font-cormorant)", fontSize: "26px", fontWeight: 300 }}>Inquiry Saved!</h3>
                    <p className="text-[13px] mb-1" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>
                      Opening WhatsApp to connect you with our team…
                    </p>
                    <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-inter)" }}>
                      We'll confirm availability within 15 minutes
                    </p>
                    <div className="mt-6 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#25d366" }} />
                      <span className="text-[12px]" style={{ color: "#25d366", fontFamily: "var(--font-inter)" }}>Connecting to WhatsApp…</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
