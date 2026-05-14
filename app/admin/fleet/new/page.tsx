"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Plus, Trash2, Save } from "lucide-react";

const OCCASIONS = ["Sunset Cruise", "Birthday Party", "DJ Night", "Corporate", "Couple Date", "Proposal", "Bachelor Party", "Anniversary", "Fireworks"];
const DURATIONS = [
  { key: "1hr", label: "1 Hour" },
  { key: "2hr", label: "2 Hours" },
  { key: "halfday", label: "Half Day (4hr)" },
  { key: "fullday", label: "Full Day (8hr)" },
];

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] mb-1.5 tracking-wide" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
        {label}{required && <span style={{ color: "#c9a96e" }}> *</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "rgba(255,255,255,0.8)",
  fontFamily: "var(--font-inter)",
  fontSize: "13px",
};

export default function NewYachtPage() {
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [length, setLength] = useState("");
  const [badge, setBadge] = useState("");
  const [features, setFeatures] = useState(["", "", ""]);
  const [pricing, setPricing] = useState(DURATIONS.map((d) => ({ ...d, price: "" })));
  const [occasions, setOccasions] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Would submit to /api/yachts POST
    await new Promise((r) => setTimeout(r, 1500));
    setSaving(false);
  };

  return (
    <div className="space-y-6 pb-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/fleet" className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
          <ArrowLeft size={16} style={{ color: "rgba(255,255,255,0.5)" }} />
        </Link>
        <div>
          <h1 className="text-white" style={{ fontFamily: "var(--font-cormorant)", fontSize: "24px", fontWeight: 300 }}>Add New Yacht</h1>
          <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>Fill in all details to add a vessel to your fleet</p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Basic Info */}
        <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <h3 className="text-white text-sm font-medium mb-4" style={{ fontFamily: "var(--font-inter)" }}>Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Yacht Name" required>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sunset 42"
                className="w-full px-3 py-2.5 rounded-xl outline-none" style={inputStyle} />
            </Field>
            <Field label="Tagline">
              <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="e.g. The King of Goa's Waters"
                className="w-full px-3 py-2.5 rounded-xl outline-none" style={inputStyle} />
            </Field>
            <Field label="Guest Capacity" required>
              <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="e.g. 25"
                className="w-full px-3 py-2.5 rounded-xl outline-none" style={inputStyle} />
            </Field>
            <Field label="Length">
              <input type="text" value={length} onChange={(e) => setLength(e.target.value)} placeholder="e.g. 42 ft"
                className="w-full px-3 py-2.5 rounded-xl outline-none" style={inputStyle} />
            </Field>
            <Field label="Badge (optional)">
              <input type="text" value={badge} onChange={(e) => setBadge(e.target.value)} placeholder="e.g. Most Popular"
                className="w-full px-3 py-2.5 rounded-xl outline-none" style={inputStyle} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Description">
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe this yacht..."
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl outline-none resize-none" style={{ ...inputStyle, lineHeight: "1.6" }} />
              </Field>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <h3 className="text-white text-sm font-medium mb-4" style={{ fontFamily: "var(--font-inter)" }}>Pricing</h3>
          <div className="space-y-3">
            {pricing.map((p, i) => (
              <div key={p.key} className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="text-[11px]" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>{p.label}</label>
                </div>
                <div className="flex items-center gap-1.5 w-40">
                  <span className="text-[13px]" style={{ color: "#c9a96e" }}>₹</span>
                  <input type="number" value={p.price}
                    onChange={(e) => setPricing((prev) => prev.map((x, j) => j === i ? { ...x, price: e.target.value } : x))}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg outline-none text-[13px]" style={inputStyle} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-sm font-medium" style={{ fontFamily: "var(--font-inter)" }}>Features</h3>
            <button onClick={() => setFeatures([...features, ""])} className="text-[12px] flex items-center gap-1"
              style={{ color: "#c9a96e", fontFamily: "var(--font-inter)" }}>
              <Plus size={12} /> Add
            </button>
          </div>
          <div className="space-y-2">
            {features.map((f, i) => (
              <div key={i} className="flex gap-2">
                <input type="text" value={f}
                  onChange={(e) => setFeatures(features.map((x, j) => j === i ? e.target.value : x))}
                  placeholder={`Feature ${i + 1}...`}
                  className="flex-1 px-3 py-2 rounded-lg outline-none text-[13px]" style={inputStyle} />
                {features.length > 1 && (
                  <button onClick={() => setFeatures(features.filter((_, j) => j !== i))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500/10 transition-colors">
                    <Trash2 size={12} style={{ color: "#f87171" }} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Occasions */}
        <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <h3 className="text-white text-sm font-medium mb-4" style={{ fontFamily: "var(--font-inter)" }}>Best For (Occasions)</h3>
          <div className="flex flex-wrap gap-2">
            {OCCASIONS.map((occ) => (
              <button key={occ} onClick={() => setOccasions((s) => s.includes(occ) ? s.filter((x) => x !== occ) : [...s, occ])}
                className="px-3 py-1.5 rounded-full text-[12px] transition-all"
                style={{
                  background: occasions.includes(occ) ? "rgba(201,169,110,0.15)" : "rgba(255,255,255,0.04)",
                  border: occasions.includes(occ) ? "1px solid rgba(201,169,110,0.3)" : "1px solid rgba(255,255,255,0.08)",
                  color: occasions.includes(occ) ? "#c9a96e" : "rgba(255,255,255,0.4)",
                  fontFamily: "var(--font-inter)",
                }}>
                {occ}
              </button>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <h3 className="text-white text-sm font-medium mb-4" style={{ fontFamily: "var(--font-inter)" }}>Gallery Images</h3>
          <div className="border-2 border-dashed rounded-xl p-8 text-center"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            <Upload size={28} className="mx-auto mb-3" style={{ color: "rgba(255,255,255,0.25)" }} />
            <p className="text-white text-sm mb-1" style={{ fontFamily: "var(--font-inter)" }}>Drop images here or click to upload</p>
            <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>
              Supports JPG, PNG, WEBP — Max 10MB per image — Cloudinary auto-optimization
            </p>
            <button className="mt-4 px-4 py-2 rounded-xl text-[12px]"
              style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)", color: "#c9a96e", fontFamily: "var(--font-inter)" }}>
              Browse Files
            </button>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex gap-3 pt-2">
        <Link href="/admin/fleet"
          className="px-6 py-2.5 rounded-xl text-[13px]"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>
          Cancel
        </Link>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-8 py-2.5 rounded-xl text-[13px] font-medium transition-all"
          style={{ background: saving ? "rgba(201,169,110,0.1)" : "rgba(201,169,110,0.2)", border: "1px solid rgba(201,169,110,0.3)", color: "#c9a96e", fontFamily: "var(--font-inter)" }}>
          <Save size={14} />
          {saving ? "Saving..." : "Save Yacht"}
        </button>
      </div>
    </div>
  );
}
