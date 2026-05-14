"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search, Filter, Plus, ChevronDown, MoreHorizontal, Eye, Edit2,
  MessageCircle, Phone, Mail, Trash2, UserPlus, Calendar, Tag,
  ArrowUpDown, Download, RefreshCw, SlidersHorizontal, Check,
} from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { timeAgo, LEAD_STATUS_COLORS } from "@/lib/utils";

// ─── Mock Data ────────────────────────────────────────────────
const MOCK_LEADS = [
  { id: "1", leadCode: "PYG-L-1842", name: "Rahul Sharma", email: "rahul.s@gmail.com", phone: "+91 98765 43210", yachtName: "Sunset 42", occasion: "Birthday", date: "2025-06-20", adults: 22, budget: "₹60-80K", source: "website", status: "NEW", priority: "HIGH", assignedTo: null, createdAt: new Date(Date.now() - 8 * 60000) },
  { id: "2", leadCode: "PYG-L-1841", name: "Priya Mehta", email: "priya.m@yahoo.com", phone: "+91 87654 32109", yachtName: "Orca", occasion: "Couple Date", date: "2025-06-14", adults: 2, budget: "₹30-40K", source: "instagram", status: "CONTACTED", priority: "MEDIUM", assignedTo: "Anil", createdAt: new Date(Date.now() - 45 * 60000) },
  { id: "3", leadCode: "PYG-L-1840", name: "Amit Patel", email: "amit.p@outlook.com", phone: "+91 76543 21098", yachtName: "Polaris", occasion: "Corporate", date: "2025-06-25", adults: 30, budget: "₹1.5L+", source: "referral", status: "FOLLOW_UP", priority: "URGENT", assignedTo: "Sneha", createdAt: new Date(Date.now() - 2 * 3600000) },
  { id: "4", leadCode: "PYG-L-1839", name: "Neha Singh", email: "neha.s@gmail.com", phone: "+91 65432 10987", yachtName: "Prestige 36", occasion: "Anniversary", date: "2025-06-18", adults: 8, budget: "₹45-60K", source: "website", status: "QUOTED", priority: "HIGH", assignedTo: "Anil", createdAt: new Date(Date.now() - 4 * 3600000) },
  { id: "5", leadCode: "PYG-L-1838", name: "Vikram Nair", email: "vikram.n@gmail.com", phone: "+91 54321 09876", yachtName: "Malini", occasion: "Bachelor Party", date: "2025-06-12", adults: 15, budget: "₹50-70K", source: "google", status: "CONFIRMED", priority: "HIGH", assignedTo: "Sneha", createdAt: new Date(Date.now() - 6 * 3600000) },
  { id: "6", leadCode: "PYG-L-1837", name: "Kavya Reddy", email: "kavya.r@gmail.com", phone: "+91 43210 98765", yachtName: "Sea Ray", occasion: "Proposal", date: "2025-06-16", adults: 2, budget: "₹25-35K", source: "website", status: "NEW", priority: "MEDIUM", assignedTo: null, createdAt: new Date(Date.now() - 12 * 3600000) },
  { id: "7", leadCode: "PYG-L-1836", name: "Suresh Iyer", email: "suresh.i@gmail.com", phone: "+91 32109 87654", yachtName: "Sunset 42", occasion: "Birthday", date: "2025-05-30", adults: 35, budget: "₹80K-1L", source: "whatsapp", status: "CANCELLED", priority: "LOW", assignedTo: "Anil", createdAt: new Date(Date.now() - 24 * 3600000) },
  { id: "8", leadCode: "PYG-L-1835", name: "Ananya Bhatt", email: "ananya.b@gmail.com", phone: "+91 21098 76543", yachtName: "MV Krishna", occasion: "Corporate", date: "2025-06-28", adults: 50, budget: "₹2L+", source: "referral", status: "FOLLOW_UP", priority: "URGENT", assignedTo: "Sneha", createdAt: new Date(Date.now() - 36 * 3600000) },
];

const STATUS_TABS = [
  { id: "ALL", label: "All", count: 8 },
  { id: "NEW", label: "New", count: 2 },
  { id: "CONTACTED", label: "Contacted", count: 1 },
  { id: "FOLLOW_UP", label: "Follow Up", count: 2 },
  { id: "QUOTED", label: "Quoted", count: 1 },
  { id: "CONFIRMED", label: "Confirmed", count: 1 },
  { id: "CANCELLED", label: "Cancelled", count: 1 },
];

const PRIORITY_COLORS: Record<string, string> = {
  LOW: "rgba(100,116,139,0.6)",
  MEDIUM: "#fbbf24",
  HIGH: "#f97316",
  URGENT: "#ef4444",
};

export default function LeadsPage() {
  const router = useRouter();
  const [tab, setTab] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [actionMenu, setActionMenu] = useState<string | null>(null);
  const [sortField, setSortField] = useState("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    let d = MOCK_LEADS;
    if (tab !== "ALL") d = d.filter((l) => l.status === tab);
    if (search) {
      const q = search.toLowerCase();
      d = d.filter((l) =>
        l.name.toLowerCase().includes(q) ||
        l.leadCode.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.yachtName.toLowerCase().includes(q)
      );
    }
    return d;
  }, [tab, search]);

  const toggleSelect = (id: string) =>
    setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  const toggleAll = () =>
    setSelected(selected.length === filtered.length ? [] : filtered.map((l) => l.id));

  return (
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase mb-1" style={{ color: "rgba(201,169,110,0.6)", fontFamily: "var(--font-inter)" }}>CRM</p>
          <h1 className="text-white" style={{ fontFamily: "var(--font-cormorant)", fontSize: "26px", fontWeight: 300 }}>Leads Management</h1>
          <p className="text-[13px] mt-1" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>
            Track, manage and convert your inquiries into bookings
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-[12px]"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>
            <Download size={13} /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-medium"
            style={{ background: "rgba(201,169,110,0.15)", border: "1px solid rgba(201,169,110,0.3)", color: "#c9a96e", fontFamily: "var(--font-inter)" }}>
            <Plus size={14} /> Add Lead
          </button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
        {STATUS_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] whitespace-nowrap transition-all"
            style={{
              background: tab === t.id ? "rgba(201,169,110,0.12)" : "rgba(255,255,255,0.03)",
              border: tab === t.id ? "1px solid rgba(201,169,110,0.25)" : "1px solid rgba(255,255,255,0.06)",
              color: tab === t.id ? "#c9a96e" : "rgba(255,255,255,0.4)",
              fontFamily: "var(--font-inter)",
              fontWeight: tab === t.id ? 600 : 400,
            }}
          >
            {t.label}
            <span className="px-1.5 py-0.5 rounded-full text-[10px]"
              style={{ background: tab === t.id ? "rgba(201,169,110,0.2)" : "rgba(255,255,255,0.06)", color: tab === t.id ? "#c9a96e" : "rgba(255,255,255,0.3)" }}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex gap-3 items-center">
        <div className="flex-1 relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.25)" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, code, phone, yacht..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-[13px] outline-none transition-all"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.8)",
              fontFamily: "var(--font-inter)",
            }}
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[12px]"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>
          <SlidersHorizontal size={13} /> Filter
        </button>
      </div>

      {/* Bulk Actions */}
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.2)" }}
          >
            <span className="text-[13px] font-medium" style={{ color: "#c9a96e", fontFamily: "var(--font-inter)" }}>
              {selected.length} selected
            </span>
            <div className="flex-1" />
            {["Assign", "Change Status", "Export", "Delete"].map((a) => (
              <button key={a} className="px-3 py-1.5 rounded-lg text-[12px]"
                style={{ background: a === "Delete" ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.08)", color: a === "Delete" ? "#f87171" : "rgba(255,255,255,0.6)", fontFamily: "var(--font-inter)" }}>
                {a}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <th className="w-10 px-4 py-3">
                  <div
                    onClick={toggleAll}
                    className="w-4 h-4 rounded flex items-center justify-center cursor-pointer"
                    style={{ background: selected.length === filtered.length ? "#c9a96e" : "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
                  >
                    {selected.length === filtered.length && <Check size={10} style={{ color: "#08080f" }} />}
                  </div>
                </th>
                {["Lead / Customer", "Contact", "Yacht & Occasion", "Date", "Assigned", "Priority", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] tracking-[0.2em] uppercase font-medium whitespace-nowrap"
                    style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-inter)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead, i) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="group cursor-pointer"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                  onClick={() => router.push(`/admin/leads/${lead.id}`)}
                >
                  <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                    <div
                      onClick={() => toggleSelect(lead.id)}
                      className="w-4 h-4 rounded flex items-center justify-center cursor-pointer transition-all"
                      style={{ background: selected.includes(lead.id) ? "#c9a96e" : "rgba(255,255,255,0.06)", border: `1px solid ${selected.includes(lead.id) ? "#c9a96e" : "rgba(255,255,255,0.12)"}` }}
                    >
                      {selected.includes(lead.id) && <Check size={10} style={{ color: "#08080f" }} />}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-medium text-[13px] text-white" style={{ fontFamily: "var(--font-inter)" }}>{lead.name}</div>
                    <div className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>{lead.leadCode}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="text-[12px] text-white" style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.6)" }}>{lead.phone}</div>
                    <div className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-inter)" }}>{lead.email}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="text-[13px] text-white" style={{ fontFamily: "var(--font-inter)" }}>{lead.yachtName}</div>
                    <div className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>{lead.occasion}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="text-[12px]" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>{lead.date}</div>
                    <div className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-inter)" }}>{lead.adults} guests</div>
                  </td>
                  <td className="px-4 py-3.5">
                    {lead.assignedTo ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                          style={{ background: "rgba(201,169,110,0.2)", color: "#c9a96e" }}>
                          {lead.assignedTo[0]}
                        </div>
                        <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>{lead.assignedTo}</span>
                      </div>
                    ) : (
                      <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-inter)" }}>Unassigned</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: PRIORITY_COLORS[lead.priority] }} />
                      <span className="text-[11px]" style={{ color: PRIORITY_COLORS[lead.priority], fontFamily: "var(--font-inter)" }}>{lead.priority}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={lead.status} type="lead" />
                    <div className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-inter)" }}>{timeAgo(lead.createdAt)}</div>
                  </td>
                  <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`} target="_blank"
                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                        title="WhatsApp">
                        <MessageCircle size={13} style={{ color: "#25d366" }} />
                      </a>
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors" title="Call">
                        <Phone size={13} style={{ color: "rgba(255,255,255,0.4)" }} />
                      </button>
                      <Link href={`/admin/leads/${lead.id}`}
                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors" title="View">
                        <Eye size={13} style={{ color: "#c9a96e" }} />
                      </Link>
                      <div className="relative">
                        <button
                          onClick={() => setActionMenu(actionMenu === lead.id ? null : lead.id)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
                          <MoreHorizontal size={13} style={{ color: "rgba(255,255,255,0.4)" }} />
                        </button>
                        <AnimatePresence>
                          {actionMenu === lead.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -5 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -5 }}
                              className="absolute right-0 top-8 z-50 w-40 rounded-xl overflow-hidden"
                              style={{ background: "#0f1020", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 40px rgba(0,0,0,0.6)" }}
                            >
                              {[
                                { icon: Edit2, label: "Edit Lead", color: "rgba(255,255,255,0.6)" },
                                { icon: UserPlus, label: "Assign", color: "rgba(255,255,255,0.6)" },
                                { icon: Calendar, label: "Set Follow-up", color: "rgba(255,255,255,0.6)" },
                                { icon: Tag, label: "Convert to Booking", color: "#c9a96e" },
                                { icon: Trash2, label: "Delete", color: "#f87171" },
                              ].map((a) => (
                                <button key={a.label}
                                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[12px] hover:bg-white/[0.05] transition-colors text-left"
                                  style={{ color: a.color, fontFamily: "var(--font-inter)" }}
                                  onClick={() => setActionMenu(null)}>
                                  <a.icon size={12} />
                                  {a.label}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-white text-sm" style={{ fontFamily: "var(--font-inter)" }}>No leads found</p>
            <p className="text-[12px] mt-1" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>
              Try adjusting your search or filters
            </p>
          </div>
        )}
        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.05]">
          <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>
            Showing {filtered.length} of {MOCK_LEADS.length} leads
          </span>
          <div className="flex gap-1">
            {[1, 2, 3].map((p) => (
              <button key={p} className="w-7 h-7 rounded-lg text-[12px] flex items-center justify-center"
                style={{
                  background: p === 1 ? "rgba(201,169,110,0.15)" : "rgba(255,255,255,0.04)",
                  color: p === 1 ? "#c9a96e" : "rgba(255,255,255,0.4)",
                  fontFamily: "var(--font-inter)",
                }}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
