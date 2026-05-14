"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Check, ChevronRight, ChevronLeft } from "lucide-react";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { WHATSAPP_NUMBER, PHONE_DISPLAY, EMAIL, ADDRESS, waLink } from "@/lib/data";

const YACHTS_LIST = [
  "Sunset 42", "MV Krishna", "Orca", "Polaris", "Prestige 36",
  "Malini Waver Rider", "Shantam", "Blue Fin", "Fun Liner", "Manta Ray", "Sea Ray",
];
const OCCASIONS = [
  "Sunset Cruise", "Birthday Party", "Bachelor Party", "Couple Date",
  "Corporate Event", "DJ Night", "Proposal", "Fireworks Night", "Other",
];

function buildWaMsg(f: { name: string; phone: string; date: string; time: string; guests: string; occasion: string; yacht: string; notes: string }) {
  return `Hi Party Yacht Goa! 🛥️\n\n*Name:* ${f.name || "–"}\n*Phone:* ${f.phone || "–"}\n*Date:* ${f.date || "–"} at ${f.time || "–"}\n*Guests:* ${f.guests || "–"}\n*Occasion:* ${f.occasion || "–"}\n*Preferred Yacht:* ${f.yacht || "Any available"}\n*Notes:* ${f.notes || "None"}\n\nPlease confirm availability and pricing. Thank you!`;
}

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", date: "", time: "17:00",
    guests: "", occasion: "", yacht: "", notes: "",
  });

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));
  const today = new Date().toISOString().split("T")[0];

  const canNext = () => {
    if (step === 1) return !!form.name && !!form.phone;
    if (step === 2) return !!form.date && !!form.guests;
    return true;
  };

  const handleSubmit = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWaMsg(form))}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div style={{ background: "#020408", minHeight: "100vh" }}>
      <PageHero
        label="Get In Touch"
        title="Plan Your"
        titleGold="Luxury Voyage"
        subtitle="Fill in the form below or reach out directly — we respond within 15 minutes during working hours."
        image="/yachts/sunset-42/sunset-42-9.jpeg"
        height="50vh"
      />

      <section className="py-20">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact info */}
            <div className="flex flex-col gap-8">
              <div>
                <div className="section-label mb-5">Reach Us</div>
                <h2 className="text-white mb-3"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 300 }}>
                  We&apos;re Always<br />
                  <span className="text-gradient-gold italic">On The Water</span>
                </h2>
                <p className="text-white/40 text-sm" style={{ fontFamily: "var(--font-inter)", lineHeight: 1.8 }}>
                  Whether you have a quick question or need a fully customised yacht experience — we&apos;re here. Talk to a real person, not a bot.
                </p>
              </div>

              <div className="flex flex-col gap-5">
                {[
                  { icon: Phone, label: "Call / WhatsApp", value: PHONE_DISPLAY, href: `tel:+${WHATSAPP_NUMBER}` },
                  { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
                  { icon: MapPin, label: "Location", value: ADDRESS, href: "#" },
                  { icon: Clock, label: "Hours", value: "Daily, 8am – 10pm IST", href: "#" },
                ].map((c) => {
                  const Icon = c.icon;
                  return (
                    <a key={c.label} href={c.href}
                      className="flex items-start gap-4 group glass-card p-5 rounded-xl transition-all duration-300 hover:border-gold/30">
                      <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
                        style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)" }}>
                        <Icon size={16} className="text-gold" />
                      </div>
                      <div>
                        <div className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-1" style={{ fontFamily: "var(--font-inter)" }}>{c.label}</div>
                        <div className="text-white/80 text-sm group-hover:text-gold transition-colors" style={{ fontFamily: "var(--font-inter)" }}>{c.value}</div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Quick WhatsApp */}
              <a href={waLink("Hi! I'd like to enquire about a yacht booking in Goa.")} target="_blank" rel="noopener noreferrer"
                className="btn-gold w-full justify-center text-[12px] py-5">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp Now
              </a>
            </div>

            {/* Booking form */}
            <div className="lg:col-span-2">
              {!submitted ? (
                <div className="glass-card p-8 md:p-10">
                  {/* Step indicators */}
                  <div className="flex items-center gap-3 mb-10">
                    {["Your Details", "Trip Details", "Preferences", "Review"].map((s, i) => {
                      const n = i + 1;
                      const active = step === n;
                      const done = step > n;
                      return (
                        <div key={s} className="flex items-center gap-2 flex-1">
                          <div className="flex flex-col items-center gap-1.5">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-400"
                              style={{
                                background: done ? "var(--gold)" : active ? "rgba(201,169,110,0.15)" : "rgba(255,255,255,0.05)",
                                border: done || active ? "1px solid var(--gold)" : "1px solid rgba(255,255,255,0.1)",
                                color: done ? "#020408" : active ? "var(--gold)" : "rgba(255,255,255,0.3)",
                                fontFamily: "var(--font-inter)",
                              }}>
                              {done ? <Check size={14} /> : n}
                            </div>
                            <span className="text-[9px] tracking-[0.1em] uppercase hidden sm:block"
                              style={{ fontFamily: "var(--font-inter)", color: active ? "var(--gold)" : "rgba(255,255,255,0.25)" }}>
                              {s}
                            </span>
                          </div>
                          {i < 3 && <div className="flex-1 h-px mb-4" style={{ background: n < step ? "var(--gold)" : "rgba(255,255,255,0.08)" }} />}
                        </div>
                      );
                    })}
                  </div>

                  <AnimatePresence mode="wait">
                    {/* Step 1 */}
                    {step === 1 && (
                      <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>
                        <StepTitle>Let&apos;s start with you</StepTitle>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
                          <LuxField label="Your Full Name *" type="text" value={form.name} onChange={set("name")} placeholder="e.g. Rahul Sharma" />
                          <LuxField label="Phone / WhatsApp *" type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" />
                          <LuxField label="Email Address" type="email" value={form.notes} onChange={set("notes")} placeholder="rahul@example.com" />
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                      <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>
                        <StepTitle>When & how many?</StepTitle>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
                          <LuxField label="Preferred Date *" type="date" value={form.date} onChange={set("date")} min={today} />
                          <LuxField label="Preferred Time" type="time" value={form.time} onChange={set("time")} />
                          <LuxField label="Number of Guests *" type="number" value={form.guests} onChange={set("guests")} placeholder="e.g. 15" min="1" max="50" />
                        </div>
                        {form.guests && (
                          <div className="mt-4 px-4 py-3 rounded-xl text-sm"
                            style={{ background: "rgba(201,169,110,0.07)", border: "1px solid rgba(201,169,110,0.15)", fontFamily: "var(--font-inter)", color: "rgba(201,169,110,0.8)" }}>
                            {parseInt(form.guests) <= 12 ? "🛥️ Recommended: Manta Ray, Sea Ray, or Blue Fin"
                              : parseInt(form.guests) <= 20 ? "🛥️ Recommended: Prestige 36, Shantam, or Fun Liner"
                                : parseInt(form.guests) <= 30 ? "🛥️ Recommended: Orca, Polaris, or Malini"
                                  : "🛥️ Recommended: Sunset 42 or MV Krishna for this group size"}
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Step 3 */}
                    {step === 3 && (
                      <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>
                        <StepTitle>Tell us about your occasion</StepTitle>
                        <div className="mt-8 flex flex-col gap-7">
                          <div>
                            <label className="field-label">Occasion</label>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {OCCASIONS.map((o) => (
                                <button key={o} onClick={() => set("occasion")(o)}
                                  className="px-4 py-2 rounded-full text-xs tracking-wide transition-all duration-300"
                                  style={{
                                    fontFamily: "var(--font-inter)",
                                    background: form.occasion === o ? "rgba(201,169,110,0.2)" : "rgba(255,255,255,0.04)",
                                    border: form.occasion === o ? "1px solid var(--gold)" : "1px solid rgba(255,255,255,0.08)",
                                    color: form.occasion === o ? "var(--gold)" : "rgba(255,255,255,0.5)",
                                  }}>
                                  {o}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="field-label">Preferred Yacht (optional)</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                              {YACHTS_LIST.map((y) => (
                                <button key={y} onClick={() => set("yacht")(y)}
                                  className="px-3 py-2.5 rounded-xl text-xs text-left transition-all duration-300"
                                  style={{
                                    fontFamily: "var(--font-inter)",
                                    background: form.yacht === y ? "rgba(201,169,110,0.12)" : "rgba(255,255,255,0.03)",
                                    border: form.yacht === y ? "1px solid rgba(201,169,110,0.4)" : "1px solid rgba(255,255,255,0.07)",
                                    color: form.yacht === y ? "var(--gold-light)" : "rgba(255,255,255,0.5)",
                                  }}>
                                  {y}
                                </button>
                              ))}
                            </div>
                          </div>
                          <LuxField label="Any Special Requests?" type="text" value={form.notes} onChange={set("notes")} placeholder="Décor, food, music preferences..." />
                        </div>
                      </motion.div>
                    )}

                    {/* Step 4 — Review */}
                    {step === 4 && (
                      <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>
                        <StepTitle>Looking good — ready to send?</StepTitle>
                        <p className="text-white/30 text-sm mt-2 mb-8" style={{ fontFamily: "var(--font-inter)" }}>
                          We&apos;ll open WhatsApp with your details pre-filled. Hit send and we&apos;ll reply within 15 minutes.
                        </p>
                        <div className="space-y-3 mb-8">
                          {[
                            { label: "Name", value: form.name },
                            { label: "Phone", value: form.phone },
                            { label: "Date & Time", value: form.date ? `${form.date} at ${form.time}` : "–" },
                            { label: "Guests", value: form.guests ? `${form.guests} guests` : "–" },
                            { label: "Occasion", value: form.occasion || "–" },
                            { label: "Yacht", value: form.yacht || "Open to recommendation" },
                            { label: "Notes", value: form.notes || "–" },
                          ].map((r) => (
                            <div key={r.label} className="flex justify-between items-center py-3 border-b border-white/5">
                              <span className="text-white/30 text-xs tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-inter)" }}>{r.label}</span>
                              <span className="text-white/80 text-sm" style={{ fontFamily: "var(--font-inter)" }}>{r.value}</span>
                            </div>
                          ))}
                        </div>
                        <button onClick={handleSubmit} className="btn-gold w-full justify-center text-[12px] py-5">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          Open WhatsApp &amp; Send Enquiry
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation */}
                  {step < 4 && (
                    <div className="flex justify-between items-center mt-10">
                      <button onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}
                        className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/30 hover:text-white/60 disabled:opacity-20 transition-colors"
                        style={{ fontFamily: "var(--font-inter)" }}>
                        <ChevronLeft size={14} /> Back
                      </button>
                      <button onClick={() => canNext() && setStep((s) => Math.min(4, s + 1))}
                        disabled={!canNext()}
                        className="btn-gold text-[11px] py-3 px-8 disabled:opacity-40">
                        Continue <ChevronRight size={13} />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card p-12 text-center flex flex-col items-center gap-6"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(37,211,102,0.15)", border: "2px solid rgba(37,211,102,0.4)" }}>
                    <Check size={28} style={{ color: "#25D366" }} />
                  </div>
                  <h3 className="text-white text-3xl" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}>
                    Enquiry Sent!
                  </h3>
                  <p className="text-white/40 text-sm max-w-sm" style={{ fontFamily: "var(--font-inter)", lineHeight: 1.8 }}>
                    We&apos;ve received your details in WhatsApp. Expect a reply from our team within 15 minutes.
                  </p>
                  <button onClick={() => { setSubmitted(false); setStep(1); setForm({ name: "", phone: "", date: "", time: "17:00", guests: "", occasion: "", yacht: "", notes: "" }); }}
                    className="btn-outline-gold text-[12px] py-3 px-8">
                    Submit Another Enquiry
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function StepTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-white text-3xl" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}>{children}</h3>;
}

function LuxField({ label, type, value, onChange, placeholder, min, max }: {
  label: string; type: string; value: string; onChange: (v: string) => void;
  placeholder?: string; min?: string; max?: string;
}) {
  return (
    <div>
      <label className="block text-white/40 text-[10px] tracking-[0.22em] uppercase mb-2.5" style={{ fontFamily: "var(--font-inter)" }}>
        {label}
      </label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} min={min} max={max}
        className="w-full px-4 py-3.5 rounded-xl text-white text-sm outline-none transition-all duration-300"
        style={{ fontFamily: "var(--font-inter)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", colorScheme: "dark" }}
        onFocus={(e) => { e.target.style.borderColor = "rgba(201,169,110,0.5)"; }}
        onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
      />
    </div>
  );
}
