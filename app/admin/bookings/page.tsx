"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search, Plus, Download, Eye, MoreHorizontal, Ship,
  Clock, Users, CreditCard, Check, Calendar, List,
  ChevronLeft, ChevronRight, Filter, SlidersHorizontal,
} from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatCurrency, timeAgo } from "@/lib/utils";

const MOCK_BOOKINGS = [
  { id: "1", code: "PYG-B-2025-0041", name: "Aisha Khan", email: "aisha.k@gmail.com", phone: "+91 98765 43210", yacht: "Sunset 42", date: "2025-05-14", time: "17:30", duration: "2hr", guests: 18, occasion: "Birthday", total: 65000, paid: 65000, status: "CONFIRMED", paymentStatus: "PAID", addons: ["decoration", "cake"], createdAt: new Date(Date.now() - 2 * 86400000) },
  { id: "2", code: "PYG-B-2025-0042", name: "Rohan Dev", email: "rohan.d@gmail.com", phone: "+91 87654 32109", yacht: "Orca", date: "2025-05-15", time: "16:00", duration: "2hr", guests: 12, occasion: "Sunset Cruise", total: 45000, paid: 22500, status: "CONFIRMED", paymentStatus: "PARTIAL", addons: [], createdAt: new Date(Date.now() - 3 * 86400000) },
  { id: "3", code: "PYG-B-2025-0043", name: "Meena Gupta", email: "meena.g@gmail.com", phone: "+91 76543 21098", yacht: "Polaris", date: "2025-05-15", time: "18:00", duration: "2hr", guests: 2, occasion: "Proposal", total: 38000, paid: 0, status: "PENDING", paymentStatus: "PENDING", addons: ["decoration", "photographer"], createdAt: new Date(Date.now() - 4 * 86400000) },
  { id: "4", code: "PYG-B-2025-0044", name: "Sanjay Rao", email: "sanjay.r@outlook.com", phone: "+91 65432 10987", yacht: "MV Krishna", date: "2025-05-16", time: "10:00", duration: "fullday", guests: 45, occasion: "Corporate", total: 120000, paid: 60000, status: "CONFIRMED", paymentStatus: "PARTIAL", addons: ["food-drinks", "dj"], createdAt: new Date(Date.now() - 5 * 86400000) },
  { id: "5", code: "PYG-B-2025-0040", name: "Divya Shah", email: "divya.s@gmail.com", phone: "+91 54321 09876", yacht: "Prestige 36", date: "2025-05-10", time: "17:00", duration: "2hr", guests: 10, occasion: "Anniversary", total: 52000, paid: 52000, status: "COMPLETED", paymentStatus: "PAID", addons: ["cake", "photographer"], createdAt: new Date(Date.now() - 8 * 86400000) },
  { id: "6", code: "PYG-B-2025-0039", name: "Karan Malhotra", email: "karan.m@gmail.com", phone: "+91 43210 98765", yacht: "Malini", date: "2025-05-08", time: "21:00", duration: "3hr", guests: 40, occasion: "DJ Night", total: 95000, paid: 95000, status: "COMPLETED", paymentStatus: "PAID", addons: ["dj", "decoration"], createdAt: new Date(Date.now() - 10 * 86400000) },
  { id: "7", code: "PYG-B-2025-0038", name: "Pooja Nair", email: "pooja.n@yahoo.com", phone: "+91 32109 87654", yacht: "Sunset 42", date: "2025-05-12", time: "17:30", duration: "2hr", guests: 6, occasion: "Couple Date", total: 42000, paid: 0, status: "CANCELLED", paymentStatus: "PENDING", addons: [], createdAt: new Date(Date.now() - 12 * 86400000) },
];

const STATUS_TABS = [
  { id: "ALL", label: "All Bookings", count: 7 },
  { id: "PENDING", label: "Pending", count: 1 },
  { id: "CONFIRMED", label: "Confirmed", count: 3 },
  { id: "COMPLETED", label: "Completed", count: 2 },
  { id: "CANCELLED", label: "Cancelled", count: 1 },
];

// Calendar view data
const CALENDAR_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function BookingsPage() {
  const [tab, setTab] = useState("ALL");
  const [view, setView] = useState<"list" | "calendar">("list");
  const [search, setSearch] = useState("");
  const [actionMenu, setActionMenu] = useState<string | null>(null);
  const [currentMonth] = useState(new Date(2025, 4, 1)); // May 2025

  const filtered = useMemo(() => {
    let d = MOCK_BOOKINGS;
    if (tab !== "ALL") d = d.filter((b) => b.status === tab);
    if (search) {
      const q = search.toLowerCase();
      d = d.filter((b) => b.name.toLowerCase().includes(q) || b.code.toLowerCase().includes(q) || b.yacht.toLowerCase().includes(q));
    }
    return d;
  }, [tab, search]);

  // Simple calendar generation for May 2025
  const daysInMonth = 31;
  const firstDay = new Date(2025, 4, 1).getDay();
  const calendarCells = Array.from({ length: firstDay + daysInMonth }, (_, i) => i < firstDay ? null : i - firstDay + 1);

  const bookingsByDay: Record<number, typeof MOCK_BOOKINGS> = {};
  MOCK_BOOKINGS.forEach((b) => {
    const day = new Date(b.date).getDate();
    if (!bookingsByDay[day]) bookingsByDay[day] = [];
    bookingsByDay[day].push(b);
  });

  return (
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase mb-1" style={{ color: "rgba(201,169,110,0.6)", fontFamily: "var(--font-inter)" }}>Operations</p>
          <h1 className="text-white" style={{ fontFamily: "var(--font-cormorant)", fontSize: "26px", fontWeight: 300 }}>Bookings</h1>
          <p className="text-[13px] mt-1" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>
            Manage all voyages, confirmations, and schedules
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-[12px]"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>
            <Download size={13} /> Export
          </button>
          <Link href="/admin/bookings/new"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-medium"
            style={{ background: "rgba(201,169,110,0.15)", border: "1px solid rgba(201,169,110,0.3)", color: "#c9a96e", fontFamily: "var(--font-inter)" }}>
            <Plus size={14} /> New Booking
          </Link>
        </div>
      </div>

      {/* View Toggle + Status Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-1 overflow-x-auto scrollbar-none">
          {STATUS_TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] whitespace-nowrap transition-all"
              style={{
                background: tab === t.id ? "rgba(201,169,110,0.12)" : "rgba(255,255,255,0.03)",
                border: tab === t.id ? "1px solid rgba(201,169,110,0.25)" : "1px solid rgba(255,255,255,0.06)",
                color: tab === t.id ? "#c9a96e" : "rgba(255,255,255,0.4)",
                fontFamily: "var(--font-inter)",
              }}>
              {t.label}
              <span className="px-1.5 py-0.5 rounded-full text-[10px]"
                style={{ background: tab === t.id ? "rgba(201,169,110,0.2)" : "rgba(255,255,255,0.06)", color: tab === t.id ? "#c9a96e" : "rgba(255,255,255,0.3)" }}>
                {t.count}
              </span>
            </button>
          ))}
        </div>
        <div className="flex gap-1 p-1 rounded-lg shrink-0" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={() => setView("list")} className="p-1.5 rounded-md transition-all" style={{ background: view === "list" ? "rgba(201,169,110,0.15)" : "transparent" }}>
            <List size={14} style={{ color: view === "list" ? "#c9a96e" : "rgba(255,255,255,0.35)" }} />
          </button>
          <button onClick={() => setView("calendar")} className="p-1.5 rounded-md transition-all" style={{ background: view === "calendar" ? "rgba(201,169,110,0.15)" : "transparent" }}>
            <Calendar size={14} style={{ color: view === "calendar" ? "#c9a96e" : "rgba(255,255,255,0.35)" }} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-lg">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.25)" }} />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search bookings..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-[13px] outline-none"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-inter)" }} />
      </div>

      {/* CALENDAR VIEW */}
      {view === "calendar" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
            <div className="text-white font-medium" style={{ fontFamily: "var(--font-cormorant)", fontSize: "20px" }}>May 2025</div>
            <div className="flex gap-1">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
                <ChevronLeft size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
                <ChevronRight size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 border-b border-white/[0.04]">
            {CALENDAR_DAYS.map((d) => (
              <div key={d} className="py-2 text-center text-[11px] tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-inter)" }}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {calendarCells.map((day, i) => {
              const dayBookings = day ? bookingsByDay[day] || [] : [];
              const isToday = day === 14;
              return (
                <div key={i} className="min-h-[90px] p-2 border-b border-r border-white/[0.03] relative"
                  style={{ background: isToday ? "rgba(201,169,110,0.04)" : "transparent" }}>
                  {day && (
                    <>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] mb-1 ${isToday ? "font-bold" : ""}`}
                        style={{
                          background: isToday ? "#c9a96e" : "transparent",
                          color: isToday ? "#08080f" : "rgba(255,255,255,0.4)",
                          fontFamily: "var(--font-inter)",
                        }}>
                        {day}
                      </div>
                      {dayBookings.slice(0, 2).map((b) => (
                        <div key={b.id} className="text-[10px] px-1.5 py-0.5 rounded mb-0.5 truncate"
                          style={{
                            background: b.status === "CONFIRMED" ? "rgba(16,185,129,0.15)" : b.status === "PENDING" ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.05)",
                            color: b.status === "CONFIRMED" ? "#34d399" : b.status === "PENDING" ? "#fbbf24" : "rgba(255,255,255,0.4)",
                            fontFamily: "var(--font-inter)",
                          }}>
                          {b.time} {b.yacht}
                        </div>
                      ))}
                      {dayBookings.length > 2 && (
                        <div className="text-[10px] px-1" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>
                          +{dayBookings.length - 2} more
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* LIST VIEW */}
      {view === "list" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  {["Booking", "Guest", "Yacht & Details", "Date / Time", "Amount", "Payment", "Status", ""].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-[10px] tracking-[0.2em] uppercase font-medium"
                      style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-inter)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((b, i) => (
                  <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                    className="group" style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                    <td className="px-5 py-4">
                      <div className="text-[13px] font-semibold" style={{ color: "#c9a96e", fontFamily: "var(--font-inter)" }}>{b.code}</div>
                      <div className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-inter)" }}>{b.occasion}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-[13px] font-medium text-white" style={{ fontFamily: "var(--font-inter)" }}>{b.name}</div>
                      <div className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>{b.phone}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Ship size={11} style={{ color: "#c9a96e" }} />
                        <span className="text-[13px] text-white" style={{ fontFamily: "var(--font-inter)" }}>{b.yacht}</span>
                      </div>
                      <div className="text-[11px] mt-0.5 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>
                        <Users size={10} />{b.guests} guests · {b.duration}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-[13px] text-white" style={{ fontFamily: "var(--font-inter)" }}>{new Date(b.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</div>
                      <div className="text-[11px] mt-0.5 flex items-center gap-1" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>
                        <Clock size={10} />{b.time}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-[13px] font-semibold" style={{ color: "#ffffff", fontFamily: "var(--font-inter)" }}>{formatCurrency(b.total)}</div>
                      {b.paid < b.total && (
                        <div className="text-[11px] mt-0.5" style={{ color: "#fbbf24", fontFamily: "var(--font-inter)" }}>
                          Bal: {formatCurrency(b.total - b.paid)}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={b.paymentStatus} type="payment" />
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={b.status} type="booking" />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/bookings/${b.id}`}
                          className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
                          <Eye size={13} style={{ color: "#c9a96e" }} />
                        </Link>
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                          onClick={() => setActionMenu(actionMenu === b.id ? null : b.id)}>
                          <MoreHorizontal size={13} style={{ color: "rgba(255,255,255,0.4)" }} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.05]">
            <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>
              {filtered.length} bookings · Total: {formatCurrency(filtered.reduce((s, b) => s + b.total, 0))}
            </span>
            <div className="flex gap-1">
              {[1, 2].map((p) => (
                <button key={p} className="w-7 h-7 rounded-lg text-[12px] flex items-center justify-center"
                  style={{ background: p === 1 ? "rgba(201,169,110,0.15)" : "rgba(255,255,255,0.04)", color: p === 1 ? "#c9a96e" : "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
