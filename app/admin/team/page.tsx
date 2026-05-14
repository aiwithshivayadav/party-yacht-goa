"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Shield, Mail, Phone, Edit2, Trash2, MoreHorizontal, Check } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { formatDate, ROLE_COLORS } from "@/lib/utils";

const TEAM = [
  { id: "1", name: "Ravi Naik", email: "ravi@partyyachtgoa.com", phone: "+91 98765 00001", role: "SUPER_ADMIN", isActive: true, lastLogin: new Date(Date.now() - 3600000), joined: new Date("2020-01-01"), leadsHandled: 0, bookingsManaged: 287 },
  { id: "2", name: "Sneha Desai", email: "sneha@partyyachtgoa.com", phone: "+91 87654 00002", role: "SALES", isActive: true, lastLogin: new Date(Date.now() - 7200000), joined: new Date("2022-03-15"), leadsHandled: 142, bookingsManaged: 98 },
  { id: "3", name: "Anil Sharma", email: "anil@partyyachtgoa.com", phone: "+91 76543 00003", role: "SALES", isActive: true, lastLogin: new Date(Date.now() - 86400000), joined: new Date("2022-07-01"), leadsHandled: 89, bookingsManaged: 76 },
  { id: "4", name: "Priya Nair", email: "priya@partyyachtgoa.com", phone: "+91 65432 00004", role: "OPERATIONS", isActive: true, lastLogin: new Date(Date.now() - 2 * 86400000), joined: new Date("2023-01-10"), leadsHandled: 0, bookingsManaged: 150 },
  { id: "5", name: "Rahul Menon", email: "rahul@partyyachtgoa.com", phone: "+91 54321 00005", role: "ACCOUNTANT", isActive: false, lastLogin: new Date(Date.now() - 7 * 86400000), joined: new Date("2021-06-01"), leadsHandled: 0, bookingsManaged: 0 },
];

const PERMISSIONS: Record<string, string[]> = {
  SUPER_ADMIN: ["All Leads", "All Bookings", "Fleet Mgmt", "Team Mgmt", "Payments", "Settings", "Reports", "Blog"],
  ADMIN:       ["All Leads", "All Bookings", "Fleet Mgmt", "Team Mgmt", "Payments", "Reports"],
  SALES:       ["All Leads", "Own Bookings", "View Fleet", "View Reports"],
  OPERATIONS:  ["View Leads", "All Bookings", "View Fleet", "View Reports"],
  ACCOUNTANT:  ["View Bookings", "Payments", "Invoices", "Reports"],
  CUSTOMER:    ["Own Bookings"],
};

export default function TeamPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase mb-1" style={{ color: "rgba(201,169,110,0.6)", fontFamily: "var(--font-inter)" }}>Team</p>
          <h1 className="text-white" style={{ fontFamily: "var(--font-cormorant)", fontSize: "26px", fontWeight: 300 }}>Staff Management</h1>
          <p className="text-[13px] mt-1" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>
            {TEAM.filter((m) => m.isActive).length} active members
          </p>
        </div>
        <button onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-medium"
          style={{ background: "rgba(201,169,110,0.15)", border: "1px solid rgba(201,169,110,0.3)", color: "#c9a96e", fontFamily: "var(--font-inter)" }}>
          <Plus size={14} /> Add Member
        </button>
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {TEAM.map((member, i) => {
          const roleColor = ROLE_COLORS[member.role] || { bg: "rgba(100,116,139,0.15)", text: "#94a3b8" };
          return (
            <motion.div key={member.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="rounded-2xl p-5 relative"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", opacity: member.isActive ? 1 : 0.5 }}>
              {/* Status dot */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: member.isActive ? "#34d399" : "#64748b" }} />
                <span className="text-[10px]" style={{ color: member.isActive ? "#34d399" : "#64748b", fontFamily: "var(--font-inter)" }}>
                  {member.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Avatar */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-semibold"
                  style={{ background: roleColor.bg, color: roleColor.text }}>
                  {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-white font-medium" style={{ fontFamily: "var(--font-inter)", fontSize: "14px" }}>{member.name}</h3>
                  <StatusBadge status={member.role} type="role" size="sm" />
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-[12px]" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
                  <Mail size={11} />{member.email}
                </div>
                <div className="flex items-center gap-2 text-[12px]" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
                  <Phone size={11} />{member.phone}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4 py-3 border-y border-white/[0.05]">
                <div className="text-center">
                  <div className="text-lg font-light" style={{ color: "#c9a96e", fontFamily: "var(--font-cormorant)" }}>{member.leadsHandled}</div>
                  <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>Leads</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-light" style={{ color: "#c9a96e", fontFamily: "var(--font-cormorant)" }}>{member.bookingsManaged}</div>
                  <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>Bookings</div>
                </div>
              </div>

              {/* Joined + Last login */}
              <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-inter)" }}>
                Joined {formatDate(member.joined)} · Last active: {new Date(member.lastLogin).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-3 pt-3 border-t border-white/[0.05]">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12px] hover:bg-white/10 transition-colors"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>
                  <Edit2 size={11} /> Edit
                </button>
                <button className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[12px] hover:bg-red-500/10 transition-colors"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#f87171", fontFamily: "var(--font-inter)" }}>
                  <Trash2 size={11} />
                </button>
              </div>
            </motion.div>
          );
        })}

        {/* Add New */}
        <motion.button
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: TEAM.length * 0.06 }}
          onClick={() => setShowAddModal(true)}
          className="rounded-2xl flex flex-col items-center justify-center min-h-[260px] border-2 border-dashed transition-all hover:border-gold/30"
          style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.01)" }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
            style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)" }}>
            <Plus size={20} style={{ color: "#c9a96e" }} />
          </div>
          <p className="text-white text-sm" style={{ fontFamily: "var(--font-inter)" }}>Add Team Member</p>
          <p className="text-[12px] mt-1" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>Invite a new staff member</p>
        </motion.button>
      </div>

      {/* Permissions Matrix */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="px-5 py-4 border-b border-white/[0.05]">
          <h3 className="text-white font-medium" style={{ fontFamily: "var(--font-inter)", fontSize: "14px" }}>Role Permissions</h3>
          <p className="text-[12px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>What each role can access</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <th className="text-left px-5 py-3 text-[11px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>Permission</th>
                {Object.keys(PERMISSIONS).map((r) => (
                  <th key={r} className="px-4 py-3 text-[10px] tracking-widest"
                    style={{ color: ROLE_COLORS[r]?.text || "#94a3b8", fontFamily: "var(--font-inter)", textTransform: "uppercase" }}>
                    {r.replace(/_/g, " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {["All Leads", "All Bookings", "Fleet Mgmt", "Team Mgmt", "Payments", "Settings", "Reports", "Blog"].map((perm) => (
                <tr key={perm} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <td className="px-5 py-3 text-[13px]" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-inter)" }}>{perm}</td>
                  {Object.entries(PERMISSIONS).map(([role, perms]) => (
                    <td key={role} className="px-4 py-3 text-center">
                      {perms.includes(perm)
                        ? <Check size={14} className="mx-auto" style={{ color: "#34d399" }} />
                        : <span style={{ color: "rgba(255,255,255,0.1)", fontSize: "14px" }}>—</span>
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
