"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  TrendingUp, TrendingDown, Users, CalendarDays, CreditCard,
  Ship, ArrowRight, Clock, MapPin, Star, AlertCircle, CheckCircle,
  Plus, Eye, ChevronRight,
} from "lucide-react";
import { formatCurrency, formatDate, timeAgo, BOOKING_STATUS_COLORS, LEAD_STATUS_COLORS } from "@/lib/utils";
import StatusBadge from "@/components/admin/StatusBadge";

// ─── Mock Data ────────────────────────────────────────────────
const REVENUE_DATA = [
  { month: "Jun", revenue: 182000, bookings: 14 },
  { month: "Jul", revenue: 245000, bookings: 19 },
  { month: "Aug", revenue: 312000, bookings: 24 },
  { month: "Sep", revenue: 278000, bookings: 21 },
  { month: "Oct", revenue: 195000, bookings: 15 },
  { month: "Nov", revenue: 167000, bookings: 13 },
  { month: "Dec", revenue: 389000, bookings: 30 },
  { month: "Jan", revenue: 421000, bookings: 33 },
  { month: "Feb", revenue: 356000, bookings: 27 },
  { month: "Mar", revenue: 298000, bookings: 23 },
  { month: "Apr", revenue: 445000, bookings: 34 },
  { month: "May", revenue: 512000, bookings: 39 },
];

const OCCASION_DATA = [
  { name: "Sunset Cruise", value: 28, color: "#c9a96e" },
  { name: "Birthday Party", value: 22, color: "#f59e0b" },
  { name: "DJ Night",       value: 18, color: "#6366f1" },
  { name: "Corporate",      value: 12, color: "#22d3ee" },
  { name: "Couple Date",    value: 10, color: "#ec4899" },
  { name: "Proposal",       value: 6,  color: "#a855f7" },
  { name: "Other",          value: 4,  color: "#64748b" },
];

const YACHT_UTILIZATION = [
  { yacht: "Sunset 42", bookings: 38, revenue: 1824000 },
  { yacht: "Orca",      bookings: 31, revenue: 1488000 },
  { yacht: "Polaris",   bookings: 27, revenue: 1296000 },
  { yacht: "Prestige",  bookings: 22, revenue: 1056000 },
  { yacht: "Malini",    bookings: 18, revenue: 864000 },
  { yacht: "MV Krishna",bookings: 12, revenue: 576000 },
];

const RECENT_LEADS = [
  { id: "1", leadCode: "PYG-L-1842", name: "Rahul Sharma", phone: "+91 98765 43210", yachtName: "Sunset 42", occasion: "Birthday", date: new Date(Date.now() - 8 * 60000), status: "NEW" },
  { id: "2", leadCode: "PYG-L-1841", name: "Priya Mehta", phone: "+91 87654 32109", yachtName: "Orca", occasion: "Couple Date", date: new Date(Date.now() - 45 * 60000), status: "CONTACTED" },
  { id: "3", leadCode: "PYG-L-1840", name: "Amit Patel", phone: "+91 76543 21098", yachtName: "Polaris", occasion: "Corporate", date: new Date(Date.now() - 2 * 3600000), status: "FOLLOW_UP" },
  { id: "4", leadCode: "PYG-L-1839", name: "Neha Singh", phone: "+91 65432 10987", yachtName: "Prestige 36", occasion: "Anniversary", date: new Date(Date.now() - 4 * 3600000), status: "QUOTED" },
  { id: "5", leadCode: "PYG-L-1838", name: "Vikram Nair", phone: "+91 54321 09876", yachtName: "Malini", occasion: "Bachelor Party", date: new Date(Date.now() - 6 * 3600000), status: "CONFIRMED" },
];

const UPCOMING_BOOKINGS = [
  { id: "1", code: "PYG-B-2025-0041", name: "Aisha Khan", yacht: "Sunset 42", date: "Today", time: "17:30", occasion: "Birthday", guests: 18, amount: 65000 },
  { id: "2", code: "PYG-B-2025-0042", name: "Rohan Dev", yacht: "Orca", date: "Tomorrow", time: "16:00", occasion: "Sunset Cruise", guests: 12, amount: 45000 },
  { id: "3", code: "PYG-B-2025-0043", name: "Meena Gupta", yacht: "Polaris", date: "15 May", time: "18:00", occasion: "Proposal", guests: 2, amount: 38000 },
  { id: "4", code: "PYG-B-2025-0044", name: "Sanjay Rao", yacht: "MV Krishna", date: "16 May", time: "10:00", occasion: "Corporate", guests: 45, amount: 120000 },
];

// ─── Stat Card ─────────────────────────────────────────────────
function StatCard({ label, value, sub, trend, trendUp, icon: Icon, color, delay = 0 }: {
  label: string; value: string; sub: string; trend: string; trendUp: boolean;
  icon: React.ElementType; color: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative rounded-2xl p-5 overflow-hidden"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="absolute inset-0 opacity-[0.04]" style={{ background: `radial-gradient(circle at 80% 20%, ${color}, transparent 60%)` }} />
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-[11px] tracking-[0.2em] uppercase mb-2" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>
            {label}
          </p>
          <p className="text-3xl font-light mb-1 text-white" style={{ fontFamily: "var(--font-cormorant)", fontSize: "32px" }}>
            {value}
          </p>
          <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>
            {sub}
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
          <Icon size={20} style={{ color }} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1.5">
        {trendUp ? <TrendingUp size={12} style={{ color: "#34d399" }} /> : <TrendingDown size={12} style={{ color: "#f87171" }} />}
        <span className="text-[11px] font-medium" style={{ color: trendUp ? "#34d399" : "#f87171", fontFamily: "var(--font-inter)" }}>
          {trend}
        </span>
        <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-inter)" }}>
          vs last month
        </span>
      </div>
    </motion.div>
  );
}

// ─── Custom Tooltip ────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-4 py-3" style={{ background: "#0f1020", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
      <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="text-sm font-medium" style={{ color: p.color, fontFamily: "var(--font-inter)" }}>
          {p.name === "revenue" ? formatCurrency(p.value) : `${p.value} bookings`}
        </p>
      ))}
    </div>
  );
};

export default function AdminDashboard() {
  const [period, setPeriod] = useState<"7d" | "30d" | "12m">("12m");

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] tracking-[0.25em] uppercase mb-1" style={{ color: "rgba(201,169,110,0.7)", fontFamily: "var(--font-inter)" }}>
            Welcome back
          </p>
          <h1 className="text-white" style={{ fontFamily: "var(--font-cormorant)", fontSize: "28px", fontWeight: 300 }}>
            Your Empire at a Glance
          </h1>
        </div>
        <Link href="/admin/bookings/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{ background: "rgba(201,169,110,0.15)", border: "1px solid rgba(201,169,110,0.3)", color: "#c9a96e", fontFamily: "var(--font-inter)" }}>
          <Plus size={15} />
          New Booking
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value="₹38.4L" sub="This financial year" trend="+18.2%" trendUp icon={CreditCard} color="#c9a96e" delay={0} />
        <StatCard label="Total Bookings" value="287" sub="Completed voyages" trend="+12.4%" trendUp icon={CalendarDays} color="#6366f1" delay={0.05} />
        <StatCard label="Active Leads" value="23" sub="Awaiting response" trend="+5 today" trendUp icon={Users} color="#22d3ee" delay={0.1} />
        <StatCard label="Fleet Active" value="11" sub="All yachts operational" trend="100%" trendUp icon={Ship} color="#34d399" delay={0.15} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="xl:col-span-2 rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white text-base font-medium" style={{ fontFamily: "var(--font-inter)" }}>Revenue Overview</h3>
              <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>Monthly revenue & bookings</p>
            </div>
            <div className="flex gap-1 p-1 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
              {(["7d", "30d", "12m"] as const).map((p) => (
                <button key={p} onClick={() => setPeriod(p)}
                  className="px-3 py-1 rounded-md text-[11px] transition-all"
                  style={{
                    background: period === p ? "rgba(201,169,110,0.2)" : "transparent",
                    color: period === p ? "#c9a96e" : "rgba(255,255,255,0.35)",
                    fontFamily: "var(--font-inter)",
                    fontWeight: period === p ? 600 : 400,
                  }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={REVENUE_DATA} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c9a96e" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#c9a96e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="bookingsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "var(--font-inter)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10, fontFamily: "var(--font-inter)" }} axisLine={false} tickLine={false}
                tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" name="revenue" stroke="#c9a96e" strokeWidth={2} fill="url(#revenueGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Occasion Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
          className="rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="mb-4">
            <h3 className="text-white text-base font-medium" style={{ fontFamily: "var(--font-inter)" }}>By Occasion</h3>
            <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>Booking breakdown</p>
          </div>
          <div className="flex justify-center mb-4">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={OCCASION_DATA} cx="50%" cy="50%" innerRadius={55} outerRadius={80}
                  paddingAngle={3} dataKey="value" stroke="none">
                  {OCCASION_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#0f1020", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#fff", fontFamily: "var(--font-inter)", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5">
            {OCCASION_DATA.slice(0, 5).map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                  <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>{d.name}</span>
                </div>
                <span className="text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-inter)" }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Yacht Utilization + Today's Schedule */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Yacht Utilization */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-white text-base font-medium" style={{ fontFamily: "var(--font-inter)" }}>Yacht Performance</h3>
              <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>Bookings per yacht</p>
            </div>
          </div>
          <div className="space-y-3">
            {YACHT_UTILIZATION.map((y, i) => {
              const pct = Math.round((y.bookings / 38) * 100);
              return (
                <div key={y.yacht} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-white" style={{ fontFamily: "var(--font-inter)" }}>{y.yacht}</span>
                    <span className="text-[12px] font-medium" style={{ color: "#c9a96e", fontFamily: "var(--font-inter)" }}>
                      {y.bookings} trips · {formatCurrency(y.revenue / 100000 * 100000)}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, #c9a96e, #e8d5a3)` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Upcoming Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
          className="rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white text-base font-medium" style={{ fontFamily: "var(--font-inter)" }}>Upcoming Voyages</h3>
              <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>Next scheduled trips</p>
            </div>
            <Link href="/admin/bookings" className="text-[11px] flex items-center gap-1" style={{ color: "#c9a96e", fontFamily: "var(--font-inter)" }}>
              View all <ChevronRight size={11} />
            </Link>
          </div>
          <div className="space-y-2">
            {UPCOMING_BOOKINGS.map((b, i) => (
              <div key={b.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <div className="w-10 h-10 rounded-xl flex flex-col items-center justify-center shrink-0"
                  style={{ background: i === 0 ? "rgba(201,169,110,0.15)" : "rgba(255,255,255,0.04)", border: `1px solid ${i === 0 ? "rgba(201,169,110,0.3)" : "rgba(255,255,255,0.06)"}` }}>
                  <span className="text-[10px] font-bold leading-tight" style={{ color: i === 0 ? "#c9a96e" : "rgba(255,255,255,0.5)" }}>{b.date.split(" ")[0]}</span>
                  <span className="text-[8px] leading-tight" style={{ color: i === 0 ? "#c9a96e" : "rgba(255,255,255,0.3)" }}>{b.date.split(" ")[1] || ""}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-[13px] font-medium truncate" style={{ fontFamily: "var(--font-inter)" }}>{b.name}</div>
                  <div className="text-[11px] flex items-center gap-2" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>
                    <Ship size={10} />
                    <span>{b.yacht}</span>
                    <span>·</span>
                    <Clock size={10} />
                    <span>{b.time}</span>
                    <span>·</span>
                    <Users size={10} />
                    <span>{b.guests}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[13px] font-medium" style={{ color: "#c9a96e", fontFamily: "var(--font-inter)" }}>
                    ₹{(b.amount / 1000).toFixed(0)}K
                  </div>
                  <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-inter)" }}>{b.occasion}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Leads */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
        className="rounded-2xl overflow-hidden"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
          <div>
            <h3 className="text-white text-base font-medium" style={{ fontFamily: "var(--font-inter)" }}>Recent Leads</h3>
            <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>Latest inquiries from guests</p>
          </div>
          <Link href="/admin/leads" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px]"
            style={{ background: "rgba(201,169,110,0.1)", color: "#c9a96e", border: "1px solid rgba(201,169,110,0.2)", fontFamily: "var(--font-inter)" }}>
            Manage Leads <ArrowRight size={11} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                {["Lead", "Contact", "Yacht", "Occasion", "Time", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] tracking-[0.2em] uppercase font-medium"
                    style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-inter)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_LEADS.map((lead, i) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 + i * 0.05 }}
                  className="group"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                >
                  <td className="px-5 py-3.5">
                    <div className="text-[13px] font-medium text-white" style={{ fontFamily: "var(--font-inter)" }}>{lead.leadCode}</div>
                    <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>{lead.name}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="text-[12px] text-white" style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.6)" }}>{lead.phone}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="text-[12px] text-white" style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.7)" }}>{lead.yachtName}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="text-[12px]" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>{lead.occasion}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>{timeAgo(lead.date)}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={lead.status} type="lead" />
                  </td>
                  <td className="px-5 py-3.5">
                    <Link href={`/admin/leads/${lead.id}`}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] flex items-center gap-1"
                      style={{ color: "#c9a96e", fontFamily: "var(--font-inter)" }}>
                      <Eye size={11} /> View
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
