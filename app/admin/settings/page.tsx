"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Globe, Bell, CreditCard, Mail, MessageCircle, Shield, Palette, ChevronRight } from "lucide-react";

const SECTIONS = [
  { id: "general", icon: Globe, label: "General" },
  { id: "notifications", icon: Bell, label: "Notifications" },
  { id: "payments", icon: CreditCard, label: "Payments" },
  { id: "email", icon: Mail, label: "Email" },
  { id: "whatsapp", icon: MessageCircle, label: "WhatsApp" },
  { id: "security", icon: Shield, label: "Security" },
];

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "rgba(255,255,255,0.8)",
  fontFamily: "var(--font-inter)",
  fontSize: "13px",
};

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[12px] mb-1" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>{label}</label>
      {children}
      {hint && <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-inter)" }}>{hint}</p>}
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!value)}
      className="relative w-10 h-5 rounded-full transition-colors"
      style={{ background: value ? "rgba(201,169,110,0.4)" : "rgba(255,255,255,0.1)", border: value ? "1px solid rgba(201,169,110,0.4)" : "1px solid rgba(255,255,255,0.1)" }}>
      <div className="absolute top-0.5 transition-transform rounded-full w-4 h-4"
        style={{ background: value ? "#c9a96e" : "rgba(255,255,255,0.3)", transform: value ? "translateX(22px)" : "translateX(2px)" }} />
    </button>
  );
}

export default function SettingsPage() {
  const [active, setActive] = useState("general");
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "Party Yacht Goa",
    siteUrl: "https://partyyachtgoa.com",
    phone: "+91 89600 70105",
    whatsapp: "918960070105",
    email: "admin@partyyachtgoa.com",
    timezone: "Asia/Kolkata",
    currency: "INR",
    razorpayKey: "rzp_test_xxxxxxxxxx",
    razorpaySecret: "",
    resendKey: "",
    emailFrom: "bookings@partyyachtgoa.com",
    emailAdmin: "admin@partyyachtgoa.com",
    notifNewLead: true,
    notifNewBooking: true,
    notifPayment: true,
    notifWhatsapp: true,
    autoConfirmEmail: true,
    autoWhatsapp: true,
  });

  const save = async () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const s = settings;
  const set = (k: string, v: any) => setSettings((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="space-y-5 pb-8 max-w-5xl">
      <div>
        <p className="text-[11px] tracking-[0.2em] uppercase mb-1" style={{ color: "rgba(201,169,110,0.6)", fontFamily: "var(--font-inter)" }}>System</p>
        <h1 className="text-white" style={{ fontFamily: "var(--font-cormorant)", fontSize: "26px", fontWeight: 300 }}>Settings</h1>
      </div>

      <div className="flex gap-5">
        {/* Sidebar nav */}
        <div className="w-48 shrink-0 space-y-1">
          {SECTIONS.map((sec) => (
            <button key={sec.id} onClick={() => setActive(sec.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
              style={{
                background: active === sec.id ? "rgba(201,169,110,0.1)" : "transparent",
                border: active === sec.id ? "1px solid rgba(201,169,110,0.2)" : "1px solid transparent",
                color: active === sec.id ? "#c9a96e" : "rgba(255,255,255,0.45)",
                fontFamily: "var(--font-inter)",
                fontSize: "13px",
              }}>
              <sec.icon size={14} />
              {sec.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          {active === "general" && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <h3 className="text-white font-medium mb-5" style={{ fontFamily: "var(--font-inter)" }}>General Settings</h3>
              <div className="grid grid-cols-2 gap-5">
                <Field label="Business Name">
                  <input value={s.siteName} onChange={(e) => set("siteName", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl outline-none" style={inputStyle} />
                </Field>
                <Field label="Website URL">
                  <input value={s.siteUrl} onChange={(e) => set("siteUrl", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl outline-none" style={inputStyle} />
                </Field>
                <Field label="WhatsApp Number" hint="International format without +">
                  <input value={s.whatsapp} onChange={(e) => set("whatsapp", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl outline-none" style={inputStyle} />
                </Field>
                <Field label="Admin Email">
                  <input value={s.emailAdmin} onChange={(e) => set("emailAdmin", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl outline-none" style={inputStyle} />
                </Field>
                <Field label="Timezone">
                  <select value={s.timezone} onChange={(e) => set("timezone", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl outline-none" style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </Field>
                <Field label="Currency">
                  <select value={s.currency} onChange={(e) => set("currency", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl outline-none" style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="INR">INR — Indian Rupee</option>
                    <option value="USD">USD — US Dollar</option>
                    <option value="EUR">EUR — Euro</option>
                  </select>
                </Field>
              </div>
            </motion.div>
          )}

          {active === "payments" && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <h3 className="text-white font-medium mb-5" style={{ fontFamily: "var(--font-inter)" }}>Razorpay Integration</h3>
              <div className="space-y-4">
                <Field label="Razorpay Key ID" hint="Get from Razorpay Dashboard → Settings → API Keys">
                  <input value={s.razorpayKey} onChange={(e) => set("razorpayKey", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl outline-none" style={inputStyle} />
                </Field>
                <Field label="Razorpay Key Secret" hint="Never share this key. Stored encrypted.">
                  <input type="password" value={s.razorpaySecret} onChange={(e) => set("razorpaySecret", e.target.value)}
                    placeholder="••••••••••••••••"
                    className="w-full px-3 py-2.5 rounded-xl outline-none" style={inputStyle} />
                </Field>
                <div className="p-4 rounded-xl" style={{ background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.15)" }}>
                  <p className="text-[12px] leading-relaxed" style={{ color: "rgba(201,169,110,0.8)", fontFamily: "var(--font-inter)" }}>
                    💡 Razorpay accepts INR payments. Use test keys (rzp_test_*) for development and live keys (rzp_live_*) for production.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {active === "email" && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <h3 className="text-white font-medium mb-5" style={{ fontFamily: "var(--font-inter)" }}>Resend Email</h3>
              <div className="space-y-4">
                <Field label="Resend API Key" hint="Get from resend.com → API Keys">
                  <input type="password" value={s.resendKey} onChange={(e) => set("resendKey", e.target.value)}
                    placeholder="re_••••••••••••••••"
                    className="w-full px-3 py-2.5 rounded-xl outline-none" style={inputStyle} />
                </Field>
                <Field label="From Email" hint="Must be verified in Resend dashboard">
                  <input value={s.emailFrom} onChange={(e) => set("emailFrom", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl outline-none" style={inputStyle} />
                </Field>
                <div className="space-y-3">
                  {[
                    { key: "autoConfirmEmail", label: "Send booking confirmation email automatically" },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center justify-between py-2">
                      <span className="text-[13px]" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-inter)" }}>{label}</span>
                      <Toggle value={(s as any)[key]} onChange={(v) => set(key, v)} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {active === "notifications" && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <h3 className="text-white font-medium mb-5" style={{ fontFamily: "var(--font-inter)" }}>Notification Preferences</h3>
              <div className="space-y-2">
                {[
                  { key: "notifNewLead", label: "Notify on new inquiry / lead" },
                  { key: "notifNewBooking", label: "Notify on new booking" },
                  { key: "notifPayment", label: "Notify on payment received" },
                  { key: "notifWhatsapp", label: "Auto-send WhatsApp on booking" },
                  { key: "autoWhatsapp", label: "Auto-send WhatsApp confirmation to customer" },
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-white/[0.04]">
                    <span className="text-[13px]" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-inter)" }}>{label}</span>
                    <Toggle value={(s as any)[key]} onChange={(v) => set(key, v)} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {(active === "whatsapp" || active === "security") && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl p-12 text-center"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="text-4xl mb-3">🚧</div>
              <p className="text-white text-sm" style={{ fontFamily: "var(--font-inter)" }}>Coming Soon</p>
              <p className="text-[12px] mt-1" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>
                {active === "whatsapp" ? "WhatsApp Business API integration" : "Two-factor auth, IP whitelist, audit logs"}
              </p>
            </motion.div>
          )}

          {/* Save */}
          <button onClick={save}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-medium transition-all"
            style={{
              background: saved ? "rgba(16,185,129,0.15)" : "rgba(201,169,110,0.15)",
              border: saved ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(201,169,110,0.3)",
              color: saved ? "#34d399" : "#c9a96e",
              fontFamily: "var(--font-inter)",
            }}>
            <Save size={14} />
            {saved ? "Saved!" : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
