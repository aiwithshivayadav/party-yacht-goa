"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Calendar, Users, Anchor, MessageCircle, ChevronRight, ChevronLeft, Check } from "lucide-react";

const STEPS = [
  { id: 1, label: "Pick a Date", icon: Calendar },
  { id: 2, label: "Select Guests", icon: Users },
  { id: 3, label: "Choose Yacht", icon: Anchor },
  { id: 4, label: "Send Enquiry", icon: MessageCircle },
];

const YACHTS_SIMPLE = [
  { slug: "sunset-42", name: "Sunset 42", capacity: "Up to 50", price: "₹25,000+" },
  { slug: "mv-krishna", name: "MV Krishna", capacity: "Up to 40", price: "₹22,000+" },
  { slug: "orca", name: "Orca", capacity: "Up to 30", price: "₹20,000+" },
  { slug: "polaris", name: "Polaris", capacity: "Up to 30", price: "₹18,000+" },
  { slug: "prestige-36", name: "Prestige 36", capacity: "Up to 20", price: "₹15,000+" },
  { slug: "malini", name: "Malini Waver Rider", capacity: "Up to 25", price: "₹14,000+" },
  { slug: "shantam", name: "Shantam", capacity: "Up to 20", price: "₹12,000+" },
  { slug: "blue-fin", name: "Blue Fin", capacity: "Up to 15", price: "₹10,000+" },
  { slug: "fun-liner", name: "Fun Liner", capacity: "Up to 20", price: "₹10,000+" },
  { slug: "manta-ray", name: "Manta Ray", capacity: "Up to 12", price: "₹9,000+" },
  { slug: "sea-ray", name: "Sea Ray", capacity: "Up to 10", price: "₹8,000+" },
];

const OCCASIONS = ["Sunset Cruise", "Birthday Party", "Bachelor Party", "Couple Date", "Corporate Event", "DJ Night", "Proposal", "Fireworks Night", "Other"];

const WA_NUMBER = "918960070105";

function buildWhatsAppMessage(data: {
  date: string; time: string; guests: string; yacht: string; occasion: string; name: string;
}) {
  return `Hi! I'd like to book a yacht experience in Goa.

*Name:* ${data.name || "–"}
*Date:* ${data.date || "–"}
*Time:* ${data.time || "–"}
*Guests:* ${data.guests || "–"}
*Yacht:* ${data.yacht || "Any available"}
*Occasion:* ${data.occasion || "–"}

Please confirm availability and share the booking details. Thank you!`;
}

export default function BookingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    date: "", time: "17:00", guests: "", yacht: "", occasion: "", name: "",
  });

  const update = (key: keyof typeof form) => (val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const canProceed = () => {
    if (step === 1) return !!form.date;
    if (step === 2) return !!form.guests;
    if (step === 3) return true; // yacht optional
    return true;
  };

  const handleSend = () => {
    const msg = buildWhatsAppMessage(form);
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  const guestCount = parseInt(form.guests) || 0;

  return (
    <section id="booking" className="relative py-32 overflow-hidden" style={{ background: "#020408" }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* BG image overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "url('/yachts/sunset-42/sunset-42-3.jpeg')", backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-0 bg-[#020408]/90" />

      <div className="container-luxury relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="section-label justify-center mb-6">Book Your Experience</div>
          <h2 className="text-gradient-gold mb-5"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 300, lineHeight: 1.1 }}>
            Reserve Your<br /><em>Luxury Voyage</em>
          </h2>
          <p className="text-white/40 max-w-md mx-auto text-sm" style={{ fontFamily: "var(--font-inter)", lineHeight: 1.8 }}>
            Fill in the details below and we&apos;ll send your personalised quote via WhatsApp within minutes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-10">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isActive = s.id === step;
              const isDone = s.id < step;
              return (
                <div key={s.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-400"
                      style={{
                        background: isDone ? "var(--gold)" : isActive ? "rgba(201,169,110,0.15)" : "rgba(255,255,255,0.05)",
                        border: isActive ? "1px solid var(--gold)" : isDone ? "1px solid var(--gold)" : "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {isDone
                        ? <Check size={16} className="text-[#020408]" />
                        : <Icon size={16} style={{ color: isActive ? "var(--gold)" : "rgba(255,255,255,0.3)" }} />
                      }
                    </div>
                    <span className="text-[10px] tracking-[0.15em] uppercase hidden sm:block"
                      style={{ fontFamily: "var(--font-inter)", color: isActive ? "var(--gold)" : "rgba(255,255,255,0.3)" }}>
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 h-px mx-3 mb-5"
                      style={{ background: s.id < step ? "var(--gold)" : "rgba(255,255,255,0.08)" }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Form card */}
          <div className="glass-card p-8 md:p-10">
            <AnimatePresence mode="wait">
              {/* Step 1: Date & Time */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
                  <StepTitle>When would you like to set sail?</StepTitle>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
                    <LuxInput label="Select Date" type="date" value={form.date} onChange={update("date")}
                      min={new Date().toISOString().split("T")[0]} />
                    <LuxInput label="Preferred Time" type="time" value={form.time} onChange={update("time")} />
                    <div className="sm:col-span-2">
                      <LuxInput label="Your Name" type="text" value={form.name} onChange={update("name")} placeholder="Enter your name" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Guests */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
                  <StepTitle>How many guests are joining?</StepTitle>
                  <div className="mt-8 flex flex-col gap-6">
                    <div>
                      <LuxInput label="Number of Guests" type="number" value={form.guests} onChange={update("guests")}
                        placeholder="e.g. 12" min="1" max="50" />
                      {guestCount > 0 && (
                        <p className="mt-2 text-gold/70 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                          {guestCount <= 15 ? "We recommend: Sea Ray, Manta Ray, or Blue Fin"
                            : guestCount <= 25 ? "We recommend: Shantam, Malini, or Prestige 36"
                              : guestCount <= 35 ? "We recommend: Orca, Polaris, or Prestige 36"
                                : "We recommend: Sunset 42 or MV Krishna for your group size"}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs tracking-[0.2em] uppercase mb-3" style={{ fontFamily: "var(--font-inter)" }}>
                        Occasion
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {OCCASIONS.map((o) => (
                          <button key={o} onClick={() => update("occasion")(o)}
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
                  </div>
                </motion.div>
              )}

              {/* Step 3: Yacht */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
                  <StepTitle>Choose your vessel <span className="text-white/30 text-2xl">(optional)</span></StepTitle>
                  <p className="text-white/30 text-sm mt-2 mb-8" style={{ fontFamily: "var(--font-inter)" }}>
                    Not sure? Skip this step and we&apos;ll recommend the perfect yacht for you.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1 custom-scroll">
                    {YACHTS_SIMPLE.map((y) => (
                      <button key={y.slug} onClick={() => update("yacht")(y.name)}
                        className="flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-300"
                        style={{
                          background: form.yacht === y.name ? "rgba(201,169,110,0.12)" : "rgba(255,255,255,0.03)",
                          border: form.yacht === y.name ? "1px solid rgba(201,169,110,0.4)" : "1px solid rgba(255,255,255,0.07)",
                        }}>
                        <div>
                          <div className="text-sm font-medium mb-0.5"
                            style={{ fontFamily: "var(--font-inter)", color: form.yacht === y.name ? "var(--gold-light)" : "rgba(255,255,255,0.7)" }}>
                            {y.name}
                          </div>
                          <div className="text-xs" style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.3)" }}>
                            {y.capacity}
                          </div>
                        </div>
                        <div className="text-xs font-medium shrink-0 ml-2"
                          style={{ fontFamily: "var(--font-inter)", color: "rgba(201,169,110,0.7)" }}>
                          {y.price}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Summary */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
                  <StepTitle>Ready to set sail?</StepTitle>
                  <p className="text-white/30 text-sm mt-2 mb-8" style={{ fontFamily: "var(--font-inter)" }}>
                    Review your selection and send us the enquiry via WhatsApp — we&apos;ll respond within minutes.
                  </p>

                  <div className="space-y-3 mb-8">
                    {[
                      { label: "Name", value: form.name || "Not provided" },
                      { label: "Date & Time", value: form.date ? `${form.date} at ${form.time}` : "Not specified" },
                      { label: "Guests", value: form.guests ? `${form.guests} guests` : "Not specified" },
                      { label: "Occasion", value: form.occasion || "Not specified" },
                      { label: "Yacht", value: form.yacht || "Open to recommendation" },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center py-3 border-b border-white/5">
                        <span className="text-white/40 text-xs tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-inter)" }}>
                          {item.label}
                        </span>
                        <span className="text-white/80 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button onClick={handleSend} className="btn-gold w-full justify-center text-[12px] py-5">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Send Enquiry on WhatsApp
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            {step < 4 && (
              <div className="flex justify-between items-center mt-10">
                <button
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  disabled={step === 1}
                  className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/30 hover:text-white/60 disabled:opacity-20 transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <ChevronLeft size={14} /> Back
                </button>
                <button
                  onClick={() => { if (canProceed()) setStep((s) => Math.min(4, s + 1)); }}
                  disabled={!canProceed()}
                  className="btn-gold text-[11px] py-3 px-8 disabled:opacity-40"
                >
                  Continue <ChevronRight size={13} />
                </button>
              </div>
            )}
          </div>

          {/* Direct WhatsApp */}
          <div className="text-center mt-6">
            <p className="text-white/25 text-xs mb-3" style={{ fontFamily: "var(--font-inter)" }}>
              Prefer to chat directly?
            </p>
            <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
              className="text-gold/60 hover:text-gold text-xs tracking-[0.2em] uppercase transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}>
              WhatsApp us now →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StepTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-white text-3xl" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}>
      {children}
    </h3>
  );
}

function LuxInput({
  label, type, value, onChange, placeholder, min, max,
}: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder?: string; min?: string; max?: string;
}) {
  return (
    <div>
      <label className="block text-white/50 text-xs tracking-[0.2em] uppercase mb-3" style={{ fontFamily: "var(--font-inter)" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-full px-4 py-3.5 rounded-xl text-white text-sm outline-none transition-all duration-300 focus:ring-1"
        style={{
          fontFamily: "var(--font-inter)",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          colorScheme: "dark",
        }}
        onFocus={(e) => { e.target.style.borderColor = "rgba(201,169,110,0.5)"; }}
        onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
      />
    </div>
  );
}
