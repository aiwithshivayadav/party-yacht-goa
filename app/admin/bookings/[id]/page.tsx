"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, Ship, Users, Clock, MapPin, Calendar, CreditCard,
  MessageCircle, Phone, Mail, FileText, Download, Edit2, CheckCircle,
  XCircle, RefreshCw, Star, Plus, Send, Printer,
} from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils";

const MOCK_BOOKING = {
  id: "1",
  code: "PYG-B-2025-0041",
  name: "Aisha Khan",
  email: "aisha.k@gmail.com",
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  country: "India",
  yacht: "Sunset 42",
  yachtSlug: "sunset-42",
  date: "2025-05-14",
  time: "17:30",
  duration: "2 Hours",
  guests: 18,
  children: 2,
  occasion: "Birthday",
  pickupPoint: "Panaji Jetty, Goa",
  addons: ["decoration", "cake", "photographer"],
  specialRequests: "Please arrange a birthday cake with 'Happy Birthday Aisha' written on it. Also need a floral arch at the entrance.",
  basePrice: 55000,
  addonsPrice: 11000,
  discount: 1000,
  total: 65000,
  paid: 65000,
  balance: 0,
  status: "CONFIRMED",
  paymentStatus: "PAID",
  confirmedAt: new Date(Date.now() - 86400000),
  createdAt: new Date(Date.now() - 2 * 86400000),
  payments: [
    { id: "p1", code: "PYG-P-482741", amount: 32500, method: "RAZORPAY", status: "PAID", paidAt: new Date(Date.now() - 86400000 * 2), notes: "Advance payment" },
    { id: "p2", code: "PYG-P-482889", amount: 32500, method: "UPI", status: "PAID", paidAt: new Date(Date.now() - 86400000), notes: "Full settlement" },
  ],
  activities: [
    { id: "a1", message: "Booking confirmed by Sneha", type: "success", time: new Date(Date.now() - 86400000) },
    { id: "a2", message: "Final payment of ₹32,500 received via UPI", type: "payment", time: new Date(Date.now() - 86400000) },
    { id: "a3", message: "Advance payment of ₹32,500 received via Razorpay", type: "payment", time: new Date(Date.now() - 2 * 86400000) },
    { id: "a4", message: "Booking created from Lead PYG-L-1842", type: "info", time: new Date(Date.now() - 2 * 86400000) },
  ],
};

const ADDON_LABELS: Record<string, string> = {
  decoration: "Decoration", dj: "DJ", cake: "Cake",
  fireworks: "Fireworks", photographer: "Photographer", "food-drinks": "Food & Drinks",
};
const ADDON_PRICES: Record<string, number> = {
  decoration: 3500, dj: 8000, cake: 1500,
  fireworks: 12000, photographer: 6000, "food-drinks": 4000,
};

export default function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [note, setNote] = useState("");
  const b = MOCK_BOOKING;

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/bookings" className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            <ArrowLeft size={16} style={{ color: "rgba(255,255,255,0.5)" }} />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-white text-xl font-medium" style={{ fontFamily: "var(--font-cormorant)", fontSize: "22px" }}>{b.code}</h1>
              <StatusBadge status={b.status} type="booking" />
              <StatusBadge status={b.paymentStatus} type="payment" />
            </div>
            <p className="text-[12px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>
              Created {formatDateTime(b.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-[12px]"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>
            <Printer size={13} /> Print
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-[12px]"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>
            <Download size={13} /> Invoice
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px]"
            style={{ background: "rgba(201,169,110,0.15)", border: "1px solid rgba(201,169,110,0.3)", color: "#c9a96e", fontFamily: "var(--font-inter)" }}>
            <Edit2 size={13} /> Edit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Left: Main Info */}
        <div className="xl:col-span-2 space-y-5">
          {/* Customer */}
          <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <h3 className="text-white text-sm font-medium mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-inter)" }}>
              <Users size={14} style={{ color: "#c9a96e" }} /> Customer Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Full Name", value: b.name },
                { label: "Country", value: b.country },
                { label: "Phone", value: b.phone, href: `tel:${b.phone}` },
                { label: "WhatsApp", value: b.whatsapp, href: `https://wa.me/${b.whatsapp?.replace(/\D/g, "")}` },
                { label: "Email", value: b.email, href: `mailto:${b.email}` },
              ].map(({ label, value, href }) => (
                <div key={label}>
                  <p className="text-[11px] mb-1" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>{label}</p>
                  {href ? (
                    <a href={href} target="_blank" className="text-[13px] hover:underline"
                      style={{ color: href.startsWith("https://wa") ? "#25d366" : "#c9a96e", fontFamily: "var(--font-inter)" }}>
                      {value}
                    </a>
                  ) : (
                    <p className="text-[13px] text-white" style={{ fontFamily: "var(--font-inter)" }}>{value}</p>
                  )}
                </div>
              ))}
            </div>
            {/* Quick contact */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-white/[0.05]">
              <a href={`https://wa.me/${b.whatsapp?.replace(/\D/g, "")}?text=Hi ${b.name}! Your booking ${b.code} is confirmed.`} target="_blank"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px]"
                style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.2)", color: "#25d366", fontFamily: "var(--font-inter)" }}>
                <MessageCircle size={12} /> WhatsApp
              </a>
              <a href={`tel:${b.phone}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px]"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>
                <Phone size={12} /> Call
              </a>
              <a href={`mailto:${b.email}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px]"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>
                <Mail size={12} /> Email
              </a>
            </div>
          </div>

          {/* Booking Details */}
          <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <h3 className="text-white text-sm font-medium mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-inter)" }}>
              <Ship size={14} style={{ color: "#c9a96e" }} /> Voyage Details
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              {[
                { label: "Yacht", value: b.yacht, gold: true },
                { label: "Date", value: formatDate(b.date) },
                { label: "Time", value: b.time },
                { label: "Duration", value: b.duration },
                { label: "Adults", value: `${b.guests} guests` },
                { label: "Children", value: b.children > 0 ? `${b.children}` : "None" },
                { label: "Occasion", value: b.occasion },
                { label: "Pickup", value: b.pickupPoint },
              ].map(({ label, value, gold }) => (
                <div key={label}>
                  <p className="text-[11px] mb-1" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>{label}</p>
                  <p className="text-[13px]" style={{ color: gold ? "#c9a96e" : "rgba(255,255,255,0.8)", fontFamily: "var(--font-inter)", fontWeight: gold ? 600 : 400 }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Add-ons */}
            {b.addons.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/[0.05]">
                <p className="text-[11px] mb-2" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>Add-ons</p>
                <div className="flex flex-wrap gap-2">
                  {b.addons.map((a) => (
                    <span key={a} className="px-3 py-1 rounded-full text-[11px]"
                      style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)", color: "#c9a96e", fontFamily: "var(--font-inter)" }}>
                      {ADDON_LABELS[a]} +{formatCurrency(ADDON_PRICES[a] || 0)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Special Requests */}
            {b.specialRequests && (
              <div className="mt-4 pt-4 border-t border-white/[0.05]">
                <p className="text-[11px] mb-2" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>Special Requests</p>
                <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-inter)" }}>{b.specialRequests}</p>
              </div>
            )}
          </div>

          {/* Payments */}
          <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-sm font-medium flex items-center gap-2" style={{ fontFamily: "var(--font-inter)" }}>
                <CreditCard size={14} style={{ color: "#c9a96e" }} /> Payment History
              </h3>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px]"
                style={{ background: "rgba(201,169,110,0.1)", color: "#c9a96e", border: "1px solid rgba(201,169,110,0.2)", fontFamily: "var(--font-inter)" }}>
                <Plus size={11} /> Record Payment
              </button>
            </div>
            <div className="space-y-2">
              {b.payments.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <div>
                    <div className="text-[13px] font-medium text-white" style={{ fontFamily: "var(--font-inter)" }}>{p.code}</div>
                    <div className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>
                      {p.method} · {p.notes} · {formatDateTime(p.paidAt)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-semibold" style={{ color: "#34d399", fontFamily: "var(--font-inter)" }}>+{formatCurrency(p.amount)}</div>
                    <StatusBadge status={p.status} type="payment" size="sm" />
                  </div>
                </div>
              ))}
            </div>
            {/* Summary */}
            <div className="mt-4 pt-4 border-t border-white/[0.05] space-y-1.5">
              {[["Base Price", b.basePrice], ["Add-ons", b.addonsPrice], ["Discount", -b.discount], ["Total", b.total], ["Paid", b.paid], ["Balance", b.balance]].map(([l, v]) => (
                <div key={l as string} className="flex justify-between">
                  <span className="text-[12px]" style={{ color: l === "Total" || l === "Balance" ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)", fontWeight: l === "Total" ? 600 : 400 }}>{l as string}</span>
                  <span className="text-[12px] font-medium" style={{
                    color: l === "Balance" ? (v as number) > 0 ? "#fbbf24" : "#34d399" : l === "Discount" ? "#f87171" : "rgba(255,255,255,0.8)",
                    fontFamily: "var(--font-inter)",
                  }}>
                    {(v as number) < 0 ? `-${formatCurrency(Math.abs(v as number))}` : formatCurrency(v as number)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Actions + Activity */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <h3 className="text-white text-sm font-medium mb-4" style={{ fontFamily: "var(--font-inter)" }}>Quick Actions</h3>
            <div className="space-y-2">
              {[
                { icon: CheckCircle, label: "Confirm Booking", color: "#34d399", bg: "rgba(16,185,129,0.1)" },
                { icon: Send, label: "Send WA Confirmation", color: "#25d366", bg: "rgba(37,211,102,0.1)" },
                { icon: FileText, label: "Generate Invoice", color: "#c9a96e", bg: "rgba(201,169,110,0.1)" },
                { icon: Download, label: "Download PDF", color: "#6366f1", bg: "rgba(99,102,241,0.1)" },
                { icon: RefreshCw, label: "Reschedule", color: "#fbbf24", bg: "rgba(245,158,11,0.1)" },
                { icon: XCircle, label: "Cancel Booking", color: "#f87171", bg: "rgba(239,68,68,0.1)" },
              ].map(({ icon: Icon, label, color, bg }) => (
                <button key={label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all hover:opacity-80"
                  style={{ background: bg, border: `1px solid ${color}22`, color, fontFamily: "var(--font-inter)" }}>
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <h3 className="text-white text-sm font-medium mb-4" style={{ fontFamily: "var(--font-inter)" }}>Activity Log</h3>
            <div className="space-y-3">
              {b.activities.map((a, i) => (
                <div key={a.id} className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                    style={{ background: a.type === "success" ? "#34d399" : a.type === "payment" ? "#c9a96e" : "rgba(255,255,255,0.3)" }} />
                  <div className="flex-1">
                    <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-inter)" }}>{a.message}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-inter)" }}>{formatDateTime(a.time)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add note */}
            <div className="mt-4 pt-4 border-t border-white/[0.05]">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add internal note..."
                rows={2}
                className="w-full px-3 py-2 rounded-xl text-[12px] outline-none resize-none"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-inter)" }}
              />
              <button className="mt-2 w-full py-2 rounded-xl text-[12px] transition-all"
                style={{ background: note ? "rgba(201,169,110,0.15)" : "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: note ? "#c9a96e" : "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>
                Save Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
