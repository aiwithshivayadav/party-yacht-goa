"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download, CreditCard, TrendingUp, Clock, CheckCircle, AlertCircle, Search } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils";

const REVENUE_TREND = [
  { day: "May 8", amount: 95000 },
  { day: "May 9", amount: 42000 },
  { day: "May 10", amount: 52000 },
  { day: "May 11", amount: 0 },
  { day: "May 12", amount: 75000 },
  { day: "May 13", amount: 120000 },
  { day: "May 14", amount: 65000 },
];

const PAYMENTS = [
  { id: "1", code: "PYG-P-482889", booking: "PYG-B-2025-0041", customer: "Aisha Khan", yacht: "Sunset 42", amount: 32500, method: "UPI", status: "PAID", paidAt: new Date(Date.now() - 86400000), type: "Final" },
  { id: "2", code: "PYG-P-482741", booking: "PYG-B-2025-0041", customer: "Aisha Khan", yacht: "Sunset 42", amount: 32500, method: "RAZORPAY", status: "PAID", paidAt: new Date(Date.now() - 2 * 86400000), type: "Advance" },
  { id: "3", code: "PYG-P-482600", booking: "PYG-B-2025-0044", customer: "Sanjay Rao", yacht: "MV Krishna", amount: 60000, method: "BANK_TRANSFER", status: "PAID", paidAt: new Date(Date.now() - 3 * 86400000), type: "Advance" },
  { id: "4", code: "PYG-P-482401", booking: "PYG-B-2025-0040", customer: "Divya Shah", yacht: "Prestige 36", amount: 52000, method: "RAZORPAY", status: "PAID", paidAt: new Date(Date.now() - 8 * 86400000), type: "Full" },
  { id: "5", code: "PYG-P-482200", booking: "PYG-B-2025-0039", customer: "Karan Malhotra", yacht: "Malini", amount: 95000, method: "CASH", status: "PAID", paidAt: new Date(Date.now() - 10 * 86400000), type: "Full" },
  { id: "6", code: "PYG-P-482100", booking: "PYG-B-2025-0042", customer: "Rohan Dev", yacht: "Orca", amount: 22500, method: "RAZORPAY", status: "PARTIAL", paidAt: new Date(Date.now() - 3 * 86400000), type: "Advance" },
  { id: "7", code: "PYG-P-482050", booking: "PYG-B-2025-0043", customer: "Meena Gupta", yacht: "Polaris", amount: 38000, method: "PENDING", status: "PENDING", paidAt: new Date(), type: "Full" },
];

const METHOD_COLORS: Record<string, string> = {
  RAZORPAY: "#6366f1", UPI: "#22d3ee", BANK_TRANSFER: "#a855f7",
  CASH: "#34d399", PARTIAL: "#fbbf24", PENDING: "#64748b",
};

export default function PaymentsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const stats = {
    total: PAYMENTS.filter((p) => p.status === "PAID").reduce((s, p) => s + p.amount, 0),
    pending: PAYMENTS.filter((p) => p.status === "PENDING").reduce((s, p) => s + p.amount, 0),
    thisWeek: PAYMENTS.filter((p) => p.status === "PAID" && Date.now() - new Date(p.paidAt).getTime() < 7 * 86400000).reduce((s, p) => s + p.amount, 0),
    count: PAYMENTS.filter((p) => p.status === "PAID").length,
  };

  const filtered = PAYMENTS.filter((p) => {
    if (filter !== "ALL" && p.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return p.customer.toLowerCase().includes(q) || p.code.toLowerCase().includes(q) || p.booking.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase mb-1" style={{ color: "rgba(201,169,110,0.6)", fontFamily: "var(--font-inter)" }}>Finance</p>
          <h1 className="text-white" style={{ fontFamily: "var(--font-cormorant)", fontSize: "26px", fontWeight: 300 }}>Payments</h1>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-[12px]"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>
          <Download size={13} /> Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Collected", value: formatCurrency(stats.total), icon: CheckCircle, color: "#34d399" },
          { label: "Pending", value: formatCurrency(stats.pending), icon: Clock, color: "#fbbf24" },
          { label: "This Week", value: formatCurrency(stats.thisWeek), icon: TrendingUp, color: "#c9a96e" },
          { label: "Transactions", value: `${stats.count}`, icon: CreditCard, color: "#6366f1" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>{s.label}</span>
              <s.icon size={14} style={{ color: s.color }} />
            </div>
            <div className="text-xl font-light text-white" style={{ fontFamily: "var(--font-cormorant)", fontSize: "22px" }}>{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="mb-4">
          <h3 className="text-white text-sm font-medium" style={{ fontFamily: "var(--font-inter)" }}>Revenue — Last 7 Days</h3>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={REVENUE_TREND}>
            <defs>
              <linearGradient id="payGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c9a96e" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#c9a96e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "var(--font-inter)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
            <Tooltip
              contentStyle={{ background: "#0f1020", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", fontFamily: "var(--font-inter)", fontSize: "12px" }}
              formatter={(v: any) => [formatCurrency(v), "Revenue"]}
            />
            <Area type="monotone" dataKey="amount" stroke="#c9a96e" strokeWidth={2} fill="url(#payGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {["ALL", "PAID", "PARTIAL", "PENDING"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-lg text-[12px] transition-all"
              style={{
                background: filter === f ? "rgba(201,169,110,0.12)" : "rgba(255,255,255,0.04)",
                border: filter === f ? "1px solid rgba(201,169,110,0.25)" : "1px solid rgba(255,255,255,0.06)",
                color: filter === f ? "#c9a96e" : "rgba(255,255,255,0.4)",
                fontFamily: "var(--font-inter)",
              }}>
              {f}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.25)" }} />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search payments..."
            className="w-full pl-9 pr-3 py-2 rounded-xl text-[13px] outline-none"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-inter)" }} />
        </div>
      </div>

      {/* Payments Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                {["Payment ID", "Booking", "Customer / Yacht", "Method", "Type", "Date", "Amount", "Status"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-inter)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <td className="px-5 py-3.5">
                    <span className="text-[13px] font-semibold" style={{ color: "#c9a96e", fontFamily: "var(--font-inter)" }}>{p.code}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>{p.booking}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="text-[13px] text-white" style={{ fontFamily: "var(--font-inter)" }}>{p.customer}</div>
                    <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>{p.yacht}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2 py-1 rounded-lg text-[11px]"
                      style={{ background: `${METHOD_COLORS[p.method] || "#64748b"}15`, color: METHOD_COLORS[p.method] || "#94a3b8", fontFamily: "var(--font-inter)" }}>
                      {p.method === "BANK_TRANSFER" ? "Bank" : p.method}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>{p.type}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>
                      {p.status === "PENDING" ? "—" : formatDate(p.paidAt)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-[14px] font-semibold" style={{
                      color: p.status === "PAID" ? "#34d399" : p.status === "PENDING" ? "#fbbf24" : "rgba(255,255,255,0.6)",
                      fontFamily: "var(--font-inter)",
                    }}>
                      {formatCurrency(p.amount)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={p.status} type="payment" />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.05]">
          <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>
            {filtered.length} transactions · Total: {formatCurrency(filtered.filter((p) => p.status === "PAID").reduce((s, p) => s + p.amount, 0))}
          </span>
        </div>
      </div>
    </div>
  );
}
