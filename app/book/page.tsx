"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar, Clock, Users, Ship, Sparkles, Check, ChevronRight,
  ArrowLeft, IndianRupee, MessageCircle, Phone, Star, MapPin,
} from "lucide-react";
import { YACHTS, waLink } from "@/lib/data";
import { formatCurrency, ADDON_PRICES, ADDON_LABELS, calculateAddonsPrice } from "@/lib/utils";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const OCCASIONS = [
  { id: "sunset-cruise", label: "Sunset Cruise", emoji: "🌅" },
  { id: "birthday", label: "Birthday Party", emoji: "🎂" },
  { id: "couple-date", label: "Couple Date", emoji: "💑" },
  { id: "anniversary", label: "Anniversary", emoji: "💍" },
  { id: "bachelor-party", label: "Bachelor Party", emoji: "🥂" },
  { id: "corporate", label: "Corporate Event", emoji: "🏢" },
  { id: "proposal", label: "Proposal", emoji: "💎" },
  { id: "dj-night", label: "DJ Night", emoji: "🎧" },
  { id: "fireworks", label: "Fireworks", emoji: "🎆" },
  { id: "custom", label: "Custom", emoji: "✨" },
];

const DURATIONS = [
  { id: "1hr", label: "1 Hour", hours: 1 },
  { id: "2hr", label: "2 Hours", hours: 2 },
  { id: "3hr", label: "3 Hours", hours: 3 },
  { id: "halfday", label: "Half Day (4hrs)", hours: 4 },
  { id: "fullday", label: "Full Day (8hrs)", hours: 8 },
];

const TIMES = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "17:30", "18:00", "19:00", "20:00", "21:00"];

const ADDONS = [
  { id: "decoration", emoji: "🎀", label: "Floral Decoration", desc: "Luxury floral setup", price: 3500 },
  { id: "dj", emoji: "🎧", label: "DJ on Board", desc: "Professional marine DJ", price: 8000 },
  { id: "cake", emoji: "🎂", label: "Custom Cake", desc: "Personalized cake", price: 1500 },
  { id: "fireworks", emoji: "🎆", label: "Fireworks", desc: "Sea fireworks display", price: 12000 },
  { id: "photographer", emoji: "📸", label: "Photographer", desc: "Professional shoot", price: 6000 },
  { id: "food-drinks", emoji: "🍾", label: "Food & Drinks", desc: "Curated F&B package", price: 4000 },
];

const STEPS = ["Occasion & Date", "Select Yacht", "Guest Details", "Add-ons", "Review & Book"];

export default function BookPage() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadCode, setLeadCode] = useState("");

  const [form, setForm] = useState({
    occasion: "", date: "", time: "", duration: "2hr",
    adults: 10, children: 0,
    yachtSlug: "",
    name: "", email: "", phone: "", whatsapp: "", country: "India", pickupPoint: "", specialRequests: "",
    addons: [] as string[],
  });

  const set = (k: string, v: any) => setForm((p) => ({ ...p, [k]: v }));

  const selectedYacht = YACHTS.find((y) => y.slug === form.yachtSlug);
  const addonsTotal = calculateAddonsPrice(form.addons);
  const basePrice = selectedYacht?.priceFrom || 0;
  const total = basePrice + addonsTotal;

  const canNext = () => {
    if (step === 0) return form.occasion && form.date && form.time && form.duration;
    if (step === 1) return !!form.yachtSlug;
    if (step === 2) return form.name && form.email && form.phone;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, email: form.email, phone: form.phone,
          whatsapp: form.whatsapp || form.phone, country: form.country,
          yachtName: selectedYacht?.name, date: form.date, time: form.time,
          duration: form.duration, adults: form.adults, children: form.children,
          occasion: form.occasion, addons: form.addons,
          pickupPoint: form.pickupPoint, message: form.specialRequests,
          source: "booking-form",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setLeadCode(data.leadCode);
        setSubmitted(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "#020408" }}>
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-20 px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
              style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
              <Check size={32} style={{ color: "#34d399" }} />
            </div>
            <div className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: "#34d399", fontFamily: "var(--font-inter)" }}>
              Enquiry Received
            </div>
            <h2 className="text-white text-3xl mb-3" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}>
              Thank you, {form.name.split(" ")[0]}!
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-2" style={{ fontFamily: "var(--font-inter)" }}>
              Your inquiry <strong style={{ color: "#c9a96e" }}>{leadCode}</strong> has been received.
              Our team will contact you on WhatsApp within 2 hours.
            </p>
            <p className="text-white/30 text-xs mb-8" style={{ fontFamily: "var(--font-inter)" }}>
              A confirmation has been sent to {form.email}
            </p>
            <div className="flex gap-3 justify-center">
              <a href={waLink(`Hi! I just submitted an inquiry ${leadCode} for ${selectedYacht?.name || "a yacht"} on ${form.date}. I'd like to confirm the details.`)}
                target="_blank"
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm"
                style={{ background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.3)", color: "#25d366", fontFamily: "var(--font-inter)" }}>
                <MessageCircle size={15} /> Chat on WhatsApp
              </a>
              <Link href="/" className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#020408" }}>
      <Navbar />
      {/* Hero */}
      <div className="relative py-16 text-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.06) 0%, transparent 70%)" }} />
        <div className="relative">
          <div className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: "rgba(201,169,110,0.7)", fontFamily: "var(--font-inter)" }}>Book Your Voyage</div>
          <h1 className="text-white" style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 300 }}>
            Reserve Your <span className="text-gradient-gold italic">Luxury Experience</span>
          </h1>
          <p className="text-white/40 mt-3 text-sm max-w-md mx-auto" style={{ fontFamily: "var(--font-inter)" }}>
            Complete the form below — our concierge will confirm within 2 hours.
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-0 px-4 mb-8">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold transition-all"
                style={{
                  background: i < step ? "#34d399" : i === step ? "#c9a96e" : "rgba(255,255,255,0.06)",
                  color: i <= step ? "#08080f" : "rgba(255,255,255,0.3)",
                  border: i === step ? "1px solid #c9a96e" : "none",
                }}>
                {i < step ? <Check size={12} /> : i + 1}
              </div>
              <span className="hidden sm:block text-[10px] whitespace-nowrap"
                style={{ color: i === step ? "#c9a96e" : "rgba(255,255,255,0.25)", fontFamily: "var(--font-inter)" }}>
                {s}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="w-8 sm:w-16 h-px mx-1 mb-4" style={{ background: i < step ? "rgba(52,211,153,0.4)" : "rgba(255,255,255,0.07)" }} />
            )}
          </div>
        ))}
      </div>

      <div className="container-luxury pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* STEP 0: Occasion & Date */}
              {step === 0 && (
                <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="glass-card p-7 space-y-6">
                  <div>
                    <h2 className="text-white text-xl mb-1" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontSize: "22px" }}>What&apos;s the occasion?</h2>
                    <p className="text-white/35 text-xs" style={{ fontFamily: "var(--font-inter)" }}>Tell us what we&apos;re celebrating</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {OCCASIONS.map((occ) => (
                      <button key={occ.id} onClick={() => set("occasion", occ.id)}
                        className="flex items-center gap-2 px-3 py-3 rounded-xl text-left transition-all"
                        style={{
                          background: form.occasion === occ.id ? "rgba(201,169,110,0.12)" : "rgba(255,255,255,0.03)",
                          border: form.occasion === occ.id ? "1px solid rgba(201,169,110,0.3)" : "1px solid rgba(255,255,255,0.06)",
                        }}>
                        <span>{occ.emoji}</span>
                        <span className="text-[12px]" style={{ color: form.occasion === occ.id ? "#c9a96e" : "rgba(255,255,255,0.6)", fontFamily: "var(--font-inter)" }}>{occ.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] mb-1.5 tracking-wide" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>Date *</label>
                      <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 rounded-xl outline-none text-[13px]"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-inter)", colorScheme: "dark" }} />
                    </div>
                    <div>
                      <label className="block text-[11px] mb-1.5 tracking-wide" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>Preferred Time *</label>
                      <select value={form.time} onChange={(e) => set("time", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl outline-none text-[13px] cursor-pointer"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-inter)" }}>
                        <option value="">Select time</option>
                        {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] mb-2 tracking-wide" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>Duration *</label>
                    <div className="flex flex-wrap gap-2">
                      {DURATIONS.map((d) => (
                        <button key={d.id} onClick={() => set("duration", d.id)}
                          className="px-4 py-2 rounded-xl text-[12px] transition-all"
                          style={{
                            background: form.duration === d.id ? "rgba(201,169,110,0.15)" : "rgba(255,255,255,0.04)",
                            border: form.duration === d.id ? "1px solid rgba(201,169,110,0.35)" : "1px solid rgba(255,255,255,0.08)",
                            color: form.duration === d.id ? "#c9a96e" : "rgba(255,255,255,0.5)",
                            fontFamily: "var(--font-inter)",
                          }}>
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[["adults", "Number of Adults", 1, 60], ["children", "Children (2-12 yrs)", 0, 20]].map(([key, label, min, max]) => (
                      <div key={key as string}>
                        <label className="block text-[11px] mb-1.5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>{label as string}</label>
                        <input type="number" min={min as number} max={max as number} value={(form as any)[key as string]}
                          onChange={(e) => set(key as string, parseInt(e.target.value) || 0)}
                          className="w-full px-4 py-3 rounded-xl outline-none text-[13px]"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-inter)" }} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 1: Yacht Selection */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="glass-card p-7 space-y-5">
                  <div>
                    <h2 className="text-white text-xl mb-1" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontSize: "22px" }}>Choose your vessel</h2>
                    <p className="text-white/35 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                      Yachts that fit {form.adults} guests are highlighted
                    </p>
                  </div>
                  <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1 scrollbar-none">
                    {YACHTS.map((yacht) => {
                      const fits = yacht.capacity >= form.adults;
                      const isSelected = form.yachtSlug === yacht.slug;
                      return (
                        <button key={yacht.slug} onClick={() => set("yachtSlug", yacht.slug)}
                          className="w-full flex gap-4 p-4 rounded-2xl text-left transition-all"
                          style={{
                            background: isSelected ? "rgba(201,169,110,0.08)" : fits ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)",
                            border: isSelected ? "1px solid rgba(201,169,110,0.35)" : fits ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(255,255,255,0.04)",
                            opacity: fits ? 1 : 0.45,
                          }}>
                          <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0">
                            <Image src={`/yachts/${yacht.slug}/${yacht.slug}-1.jpeg`} alt={yacht.name} fill className="object-cover" sizes="80px" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-white font-medium text-[14px]" style={{ fontFamily: "var(--font-cormorant)", fontSize: "16px" }}>{yacht.name}</span>
                              {yacht.badge && <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold" style={{ background: "#c9a96e20", color: "#c9a96e", border: "1px solid #c9a96e30" }}>{yacht.badge}</span>}
                              {!fits && <span className="text-[9px]" style={{ color: "#f87171" }}>Exceeds capacity</span>}
                            </div>
                            <div className="text-[11px] mb-1.5" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>{yacht.tagline}</div>
                            <div className="flex items-center gap-3 text-[11px]">
                              <span className="flex items-center gap-1" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
                                <Users size={10} /> Up to {yacht.capacity}
                              </span>
                              <span style={{ color: "#c9a96e", fontFamily: "var(--font-inter)" }}>
                                From ₹{(yacht.priceFrom / 1000).toFixed(0)}K
                              </span>
                              <span className="flex items-center gap-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                                <Star size={9} fill="currentColor" />{yacht.rating}
                              </span>
                            </div>
                          </div>
                          {isSelected && <Check size={16} className="shrink-0 mt-1" style={{ color: "#c9a96e" }} />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Guest Details */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="glass-card p-7 space-y-5">
                  <div>
                    <h2 className="text-white text-xl mb-1" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontSize: "22px" }}>Your details</h2>
                    <p className="text-white/35 text-xs" style={{ fontFamily: "var(--font-inter)" }}>We&apos;ll use these to confirm your booking</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: "name", label: "Full Name *", type: "text", placeholder: "Your full name" },
                      { key: "email", label: "Email Address *", type: "email", placeholder: "your@email.com" },
                      { key: "phone", label: "Mobile Number *", type: "tel", placeholder: "+91 98765 43210" },
                      { key: "whatsapp", label: "WhatsApp (if different)", type: "tel", placeholder: "Same as mobile" },
                      { key: "country", label: "Country", type: "text", placeholder: "India" },
                      { key: "pickupPoint", label: "Pickup Point", type: "text", placeholder: "e.g. Panaji Jetty" },
                    ].map(({ key, label, type, placeholder }) => (
                      <div key={key} className={key === "name" || key === "email" ? "" : ""}>
                        <label className="block text-[11px] mb-1.5 tracking-wide" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>{label}</label>
                        <input type={type} value={(form as any)[key]} onChange={(e) => set(key, e.target.value)}
                          placeholder={placeholder}
                          className="w-full px-4 py-3 rounded-xl outline-none text-[13px]"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-inter)" }} />
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] mb-1.5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>Special Requests</label>
                      <textarea value={form.specialRequests} onChange={(e) => set("specialRequests", e.target.value)}
                        rows={3} placeholder="Anything you&apos;d like us to arrange..."
                        className="w-full px-4 py-3 rounded-xl outline-none text-[13px] resize-none"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-inter)", lineHeight: 1.7 }} />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Add-ons */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="glass-card p-7 space-y-5">
                  <div>
                    <h2 className="text-white text-xl mb-1" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontSize: "22px" }}>Enhance your experience</h2>
                    <p className="text-white/35 text-xs" style={{ fontFamily: "var(--font-inter)" }}>Optional add-ons to make it unforgettable</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ADDONS.map((addon) => {
                      const selected = form.addons.includes(addon.id);
                      return (
                        <button key={addon.id}
                          onClick={() => set("addons", selected ? form.addons.filter((a) => a !== addon.id) : [...form.addons, addon.id])}
                          className="flex items-center gap-4 p-4 rounded-2xl text-left transition-all"
                          style={{
                            background: selected ? "rgba(201,169,110,0.1)" : "rgba(255,255,255,0.03)",
                            border: selected ? "1px solid rgba(201,169,110,0.3)" : "1px solid rgba(255,255,255,0.07)",
                          }}>
                          <span className="text-2xl shrink-0">{addon.emoji}</span>
                          <div className="flex-1">
                            <div className="text-white text-[13px] font-medium" style={{ fontFamily: "var(--font-inter)" }}>{addon.label}</div>
                            <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>{addon.desc}</div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-[13px] font-semibold" style={{ color: "#c9a96e", fontFamily: "var(--font-inter)" }}>+₹{(addon.price / 1000).toFixed(1)}K</div>
                            <div className="w-5 h-5 rounded-full flex items-center justify-center mt-1 ml-auto"
                              style={{ background: selected ? "#c9a96e" : "rgba(255,255,255,0.08)", border: `1px solid ${selected ? "#c9a96e" : "rgba(255,255,255,0.15)"}` }}>
                              {selected && <Check size={11} style={{ color: "#08080f" }} />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {form.addons.length === 0 && (
                    <p className="text-center text-[12px] py-2" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-inter)" }}>
                      You can skip add-ons and discuss with our team later
                    </p>
                  )}
                </motion.div>
              )}

              {/* STEP 4: Review */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="glass-card p-7 space-y-5">
                  <div>
                    <h2 className="text-white text-xl mb-1" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontSize: "22px" }}>Review your booking</h2>
                    <p className="text-white/35 text-xs" style={{ fontFamily: "var(--font-inter)" }}>Confirm all details before we create your inquiry</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      ["Occasion", OCCASIONS.find((o) => o.id === form.occasion)?.label || form.occasion],
                      ["Date", form.date],
                      ["Time", form.time],
                      ["Duration", DURATIONS.find((d) => d.id === form.duration)?.label],
                      ["Guests", `${form.adults} adults${form.children > 0 ? `, ${form.children} children` : ""}`],
                      ["Yacht", selectedYacht?.name],
                      ["Name", form.name],
                      ["Email", form.email],
                      ["Phone", form.phone],
                      form.pickupPoint ? ["Pickup", form.pickupPoint] : null,
                      form.addons.length > 0 ? ["Add-ons", form.addons.map((a) => ADDON_LABELS[a]).join(", ")] : null,
                    ].filter(Boolean).map(([label, value]: any) => (
                      <div key={label} className="flex items-start justify-between py-2 border-b border-white/[0.05]">
                        <span className="text-[12px] text-white/40" style={{ fontFamily: "var(--font-inter)" }}>{label}</span>
                        <span className="text-[13px] text-white text-right max-w-[60%]" style={{ fontFamily: "var(--font-inter)" }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl" style={{ background: "rgba(201,169,110,0.07)", border: "1px solid rgba(201,169,110,0.15)" }}>
                    <p className="text-[12px] leading-relaxed" style={{ color: "rgba(201,169,110,0.8)", fontFamily: "var(--font-inter)" }}>
                      💡 This submits an <strong>inquiry</strong>, not a confirmed booking. Our concierge team will contact you within 2 hours to confirm availability and arrange payment.
                    </p>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full py-4 rounded-xl text-[14px] font-semibold flex items-center justify-center gap-2 transition-all btn-gold"
                    style={{ opacity: submitting ? 0.7 : 1 }}
                  >
                    <Sparkles size={16} />
                    {submitting ? "Submitting..." : "Submit Booking Inquiry"}
                  </button>

                  <div className="flex gap-3 justify-center">
                    <a href={waLink(`Hi! I'd like to book ${selectedYacht?.name || "a yacht"} for ${form.date} — ${form.occasion}. ${form.adults} guests.`)}
                      target="_blank"
                      className="flex items-center gap-2 text-[12px]" style={{ color: "#25d366", fontFamily: "var(--font-inter)" }}>
                      <MessageCircle size={12} /> WhatsApp instead
                    </a>
                    <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                    <a href="tel:+918960070105" className="flex items-center gap-2 text-[12px]" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>
                      <Phone size={12} /> Call Us
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex gap-3 mt-4">
              {step > 0 && (
                <button onClick={() => setStep(step - 1)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-[13px]"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>
                  <ArrowLeft size={14} /> Back
                </button>
              )}
              {step < 4 && (
                <button
                  onClick={() => canNext() && setStep(step + 1)}
                  disabled={!canNext()}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-semibold transition-all"
                  style={{
                    background: canNext() ? "rgba(201,169,110,0.18)" : "rgba(255,255,255,0.04)",
                    border: canNext() ? "1px solid rgba(201,169,110,0.35)" : "1px solid rgba(255,255,255,0.06)",
                    color: canNext() ? "#c9a96e" : "rgba(255,255,255,0.25)",
                    fontFamily: "var(--font-inter)",
                    cursor: canNext() ? "pointer" : "not-allowed",
                  }}>
                  Continue <ChevronRight size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:sticky lg:top-24 space-y-4 h-fit">
            {/* Booking Summary */}
            <div className="glass-card p-5">
              <h3 className="text-white text-sm font-medium mb-4" style={{ fontFamily: "var(--font-inter)" }}>Booking Summary</h3>
              {selectedYacht && (
                <div className="mb-4">
                  <div className="relative h-28 rounded-xl overflow-hidden mb-3">
                    <Image src={`/yachts/${selectedYacht.slug}/${selectedYacht.slug}-1.jpeg`} alt={selectedYacht.name} fill className="object-cover" sizes="240px" />
                  </div>
                  <div className="text-white font-medium" style={{ fontFamily: "var(--font-cormorant)", fontSize: "17px" }}>{selectedYacht.name}</div>
                  <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>{selectedYacht.tagline}</div>
                </div>
              )}
              <div className="space-y-2 text-[12px]">
                {form.occasion && <div className="flex justify-between"><span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>Occasion</span><span className="text-white" style={{ fontFamily: "var(--font-inter)" }}>{OCCASIONS.find((o) => o.id === form.occasion)?.label}</span></div>}
                {form.date && <div className="flex justify-between"><span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>Date</span><span className="text-white" style={{ fontFamily: "var(--font-inter)" }}>{form.date}</span></div>}
                {form.time && <div className="flex justify-between"><span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>Time</span><span className="text-white" style={{ fontFamily: "var(--font-inter)" }}>{form.time}</span></div>}
                {form.adults > 0 && <div className="flex justify-between"><span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>Guests</span><span className="text-white" style={{ fontFamily: "var(--font-inter)" }}>{form.adults} adults</span></div>}
              </div>

              {selectedYacht && (
                <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-1.5">
                  <div className="flex justify-between text-[12px]">
                    <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>Base Price</span>
                    <span style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-inter)" }}>From ₹{(basePrice / 1000).toFixed(0)}K</span>
                  </div>
                  {addonsTotal > 0 && (
                    <div className="flex justify-between text-[12px]">
                      <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>Add-ons</span>
                      <span style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-inter)" }}>+₹{(addonsTotal / 1000).toFixed(1)}K</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[13px] font-semibold pt-1.5 border-t border-white/[0.05]">
                    <span style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-inter)" }}>Estimated</span>
                    <span style={{ color: "#c9a96e", fontFamily: "var(--font-inter)" }}>{formatCurrency(total)}</span>
                  </div>
                  <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-inter)" }}>Final price confirmed by our team</p>
                </div>
              )}
            </div>

            {/* Trust */}
            <div className="glass-card p-4">
              <div className="space-y-2.5">
                {[
                  { icon: "✓", text: "No payment now — inquiry only" },
                  { icon: "⚡", text: "Response within 2 hours" },
                  { icon: "🔒", text: "100% secure & private" },
                  { icon: "💬", text: "WhatsApp confirmation" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5">
                    <span className="text-sm">{icon}</span>
                    <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-inter)" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
