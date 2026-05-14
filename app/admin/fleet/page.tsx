"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Plus, Edit2, Eye, Trash2, ToggleLeft, ToggleRight,
  Users, IndianRupee, Star, Ship, ArrowRight, Search,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { YACHTS } from "@/lib/data";

export default function FleetPage() {
  const [search, setSearch] = useState("");
  const [activeOnly, setActiveOnly] = useState(false);

  const filtered = YACHTS.filter((y) =>
    y.name.toLowerCase().includes(search.toLowerCase()) ||
    y.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase mb-1" style={{ color: "rgba(201,169,110,0.6)", fontFamily: "var(--font-inter)" }}>Fleet</p>
          <h1 className="text-white" style={{ fontFamily: "var(--font-cormorant)", fontSize: "26px", fontWeight: 300 }}>Yacht Management</h1>
          <p className="text-[13px] mt-1" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>
            {YACHTS.length} vessels in your fleet
          </p>
        </div>
        <Link href="/admin/fleet/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-medium"
          style={{ background: "rgba(201,169,110,0.15)", border: "1px solid rgba(201,169,110,0.3)", color: "#c9a96e", fontFamily: "var(--font-inter)" }}>
          <Plus size={14} /> Add Yacht
        </Link>
      </div>

      {/* Search */}
      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.25)" }} />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search yachts..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-[13px] outline-none"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-inter)" }} />
        </div>
        <button onClick={() => setActiveOnly(!activeOnly)}
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[12px]"
          style={{
            background: activeOnly ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.04)",
            border: activeOnly ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(255,255,255,0.08)",
            color: activeOnly ? "#34d399" : "rgba(255,255,255,0.5)",
            fontFamily: "var(--font-inter)",
          }}>
          {activeOnly ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
          Active Only
        </button>
      </div>

      {/* Yacht Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((yacht, i) => (
          <motion.div
            key={yacht.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={`/yachts/${yacht.slug}/${yacht.slug}-1.jpeg`}
                alt={yacht.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080f]/80 via-transparent to-transparent" />
              {yacht.badge && (
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 rounded-lg text-[10px] font-semibold tracking-wide"
                    style={{ background: yacht.badgeColor || "#c9a96e", color: "#08080f", fontFamily: "var(--font-inter)" }}>
                    {yacht.badge}
                  </span>
                </div>
              )}
              {/* Active toggle */}
              <div className="absolute top-3 right-3">
                <button className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px]"
                  style={{ background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.3)", color: "#34d399", fontFamily: "var(--font-inter)" }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current" />
                  Active
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-white font-medium" style={{ fontFamily: "var(--font-cormorant)", fontSize: "18px" }}>{yacht.name}</h3>
                  <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>{yacht.tagline}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Star size={10} fill="#c9a96e" style={{ color: "#c9a96e" }} />
                  <span className="text-[11px]" style={{ color: "#c9a96e", fontFamily: "var(--font-inter)" }}>{yacht.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1.5">
                  <Users size={11} style={{ color: "rgba(255,255,255,0.3)" }} />
                  <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>Up to {yacht.capacity}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <IndianRupee size={11} style={{ color: "#c9a96e" }} />
                  <span className="text-[12px]" style={{ color: "#c9a96e", fontFamily: "var(--font-inter)" }}>
                    From ₹{(yacht.priceFrom / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>

              {/* Pricing pills */}
              <div className="flex flex-wrap gap-1 mb-4">
                {yacht.category.slice(0, 3).map((c) => (
                  <span key={c} className="px-2 py-0.5 rounded-full text-[10px]"
                    style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>
                    {c}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t border-white/[0.05]">
                <Link href={`/yachts/${yacht.slug}`} target="_blank"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12px] transition-all hover:opacity-80"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>
                  <Eye size={11} /> Preview
                </Link>
                <Link href={`/admin/fleet/${yacht.slug}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12px] transition-all hover:opacity-80"
                  style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)", color: "#c9a96e", fontFamily: "var(--font-inter)" }}>
                  <Edit2 size={11} /> Edit
                </Link>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Add New Card */}
        <Link href="/admin/fleet/new">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: filtered.length * 0.05 }}
            className="rounded-2xl flex flex-col items-center justify-center h-full min-h-[320px] cursor-pointer transition-all hover:border-gold/30"
            style={{ background: "rgba(255,255,255,0.01)", border: "2px dashed rgba(255,255,255,0.08)" }}
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
              style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)" }}>
              <Plus size={24} style={{ color: "#c9a96e" }} />
            </div>
            <p className="text-white text-sm font-medium" style={{ fontFamily: "var(--font-inter)" }}>Add New Yacht</p>
            <p className="text-[12px] mt-1" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>Expand your fleet</p>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
