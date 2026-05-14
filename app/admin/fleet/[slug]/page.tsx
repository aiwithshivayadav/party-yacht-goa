"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, Plus, Trash2, Upload, Eye } from "lucide-react";
import { YACHTS } from "@/lib/data";

const OCCASIONS = ["Sunset Cruise","Birthday Party","DJ Night","Corporate","Couple Date","Proposal","Bachelor Party","Anniversary","Fireworks","Family Trip"];
const DURATIONS = [
  { key: "2hr",     label: "2 Hours" },
  { key: "3hr",     label: "3 Hours" },
  { key: "halfday", label: "Half Day (4hr)" },
  { key: "fullday", label: "Full Day (8hr)" },
];

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "rgba(255,255,255,0.8)",
  fontFamily: "var(--font-inter)",
  fontSize: "13px",
};

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

export default function EditYachtPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const yacht = YACHTS.find((y) => y.slug === slug);

  const [name, setName]           = useState(yacht?.name || "");
  const [tagline, setTagline]     = useState(yacht?.tagline || "");
  const [capacity, setCapacity]   = useState(String(yacht?.capacity || ""));
  const [length, setLength]       = useState(yacht?.length || "");
  const [badge, setBadge]         = useState(yacht?.badge || "");
  const [description, setDescription] = useState(yacht?.description || "");
  const [features, setFeatures]   = useState<string[]>(yacht?.features?.slice() || ["Air Conditioning", "Sound System", "Life Jackets"]);
  const [occasions, setOccasions] = useState<string[]>(yacht?.category?.slice() || []);
  const [pricing, setPricing]     = useState(
    DURATIONS.map((d) => ({
      ...d,
      price: String(
        d.key === "2hr"     ? (yacht?.priceFrom || 0) :
        d.key === "3hr"     ? Math.round((yacht?.priceFrom || 0) * 1.4) :
        d.key === "halfday" ? Math.round((yacht?.priceFrom || 0) * 2.2) :
                              Math.round((yacht?.priceFrom || 0) * 3.5)
      ),
    }))
  );
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!yacht) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="text-5xl">⚓</div>
        <p className="text-white text-lg" style={{ fontFamily: "var(--font-cormorant)" }}>Yacht not found</p>
        <Link href="/admin/fleet" className="text-[13px]" style={{ color: "#c9a96e", fontFamily: "var(--font-inter)" }}>
          ← Back to Fleet
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/fleet"
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            <ArrowLeft size={16} style={{ color: "rgba(255,255,255,0.5)" }} />
          </Link>
          <div>
            <h1 className="text-white" style={{ fontFamily: "var(--font-cormorant)", fontSize: "24px", fontWeight: 300 }}>
              Edit — {yacht.name}
            </h1>
            <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>
              Update vessel details, pricing, and gallery
            </p>
          </div>
        </div>
        <Link href={`/yachts/${slug}`} target="_blank"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-[12px]"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>
          <Eye size={13} /> Live Preview
        </Link>
      </div>

      {/* Current Cover Image */}
      <div className="rounded-2xl overflow-hidden relative h-52"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
        <Image
          src={`/yachts/${slug}/${slug}-1.jpeg`}
          alt={yacht.name}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="text-white text-sm font-medium" style={{ fontFamily: "var(--font-inter)" }}>Cover Photo</span>
          <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>
            Current cover image — upload new below
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Basic Info */}
        <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <h3 className="text-white text-sm font-medium mb-4" style={{ fontFamily: "var(--font-inter)" }}>Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Yacht Name" required>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl outline-none" style={inputStyle} />
            </Field>
            <Field label="Tagline">
              <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl outline-none" style={inputStyle} />
            </Field>
            <Field label="Guest Capacity" required>
              <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl outline-none" style={inputStyle} />
            </Field>
            <Field label="Length">
              <input type="text" value={length} onChange={(e) => setLength(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl outline-none" style={inputStyle} />
            </Field>
            <Field label="Badge (optional)">
              <input type="text" value={badge} onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Most Popular"
                className="w-full px-3 py-2.5 rounded-xl outline-none" style={inputStyle} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Description">
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe this yacht..."
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl outline-none resize-none"
                  style={{ ...inputStyle, lineHeight: "1.6" }} />
              </Field>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <h3 className="text-white text-sm font-medium mb-4" style={{ fontFamily: "var(--font-inter)" }}>Pricing (₹)</h3>
          <div className="space-y-3">
            {pricing.map((p, i) => (
              <div key={p.key} className="flex items-center gap-3">
                <label className="flex-1 text-[12px]" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>{p.label}</label>
                <div className="flex items-center gap-1.5 w-36">
                  <span className="text-[13px]" style={{ color: "#c9a96e" }}>₹</span>
                  <input type="number" value={p.price}
                    onChange={(e) => setPricing((prev) => prev.map((x, j) => j === i ? { ...x, price: e.target.value } : x))}
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
            <button onClick={() => setFeatures([...features, ""])}
              className="text-[12px] flex items-center gap-1"
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
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500/10">
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
            {OCCASIONS.map((occ) => {
              const on = occasions.includes(occ);
              return (
                <button key={occ}
                  onClick={() => setOccasions((s) => s.includes(occ) ? s.filter((x) => x !== occ) : [...s, occ])}
                  className="px-3 py-1.5 rounded-full text-[12px] transition-all"
                  style={{
                    background: on ? "rgba(201,169,110,0.15)" : "rgba(255,255,255,0.04)",
                    border: on ? "1px solid rgba(201,169,110,0.3)" : "1px solid rgba(255,255,255,0.08)",
                    color: on ? "#c9a96e" : "rgba(255,255,255,0.4)",
                    fontFamily: "var(--font-inter)",
                  }}>
                  {occ}
                </button>
              );
            })}
          </div>
        </div>

        {/* Image Upload */}
        <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <h3 className="text-white text-sm font-medium mb-4" style={{ fontFamily: "var(--font-inter)" }}>Gallery Images</h3>
          <div className="border-2 border-dashed rounded-xl p-8 text-center"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            <Upload size={28} className="mx-auto mb-3" style={{ color: "rgba(255,255,255,0.25)" }} />
            <p className="text-white text-sm mb-1" style={{ fontFamily: "var(--font-inter)" }}>Drop new images here or click to upload</p>
            <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>
              JPG, PNG, WEBP — Max 10MB — Auto-optimized via Cloudinary
            </p>
            <button className="mt-4 px-4 py-2 rounded-xl text-[12px]"
              style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)", color: "#c9a96e", fontFamily: "var(--font-inter)" }}>
              Browse Files
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Link href="/admin/fleet"
          className="px-6 py-2.5 rounded-xl text-[13px]"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>
          Cancel
        </Link>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-8 py-2.5 rounded-xl text-[13px] font-medium transition-all"
          style={{
            background: saved ? "rgba(16,185,129,0.15)" : "rgba(201,169,110,0.2)",
            border: saved ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(201,169,110,0.3)",
            color: saved ? "#34d399" : "#c9a96e",
            fontFamily: "var(--font-inter)",
          }}>
          <Save size={14} />
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
