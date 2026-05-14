"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, Search, ExternalLink, X, CheckCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { timeAgo } from "@/lib/utils";

const MOCK_NOTIFICATIONS = [
  { id: "1", title: "New Inquiry", message: "Rahul Sharma wants to book Sunset 42 on June 15", type: "info", isRead: false, createdAt: new Date(Date.now() - 5 * 60000), link: "/admin/leads" },
  { id: "2", title: "Payment Received", message: "₹45,000 received for booking PYG-B-2025-0023", type: "success", isRead: false, createdAt: new Date(Date.now() - 32 * 60000), link: "/admin/payments" },
  { id: "3", title: "Booking Confirmed", message: "Priya Mehta — Orca — June 12 confirmed", type: "success", isRead: true, createdAt: new Date(Date.now() - 2 * 3600000), link: "/admin/bookings" },
  { id: "4", title: "Follow-up Reminder", message: "Follow up with Amit Patel about DJ yacht booking", type: "warning", isRead: true, createdAt: new Date(Date.now() - 5 * 3600000), link: "/admin/leads" },
];

const PAGE_TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/leads": "Leads",
  "/admin/customers": "Customers",
  "/admin/bookings": "Bookings",
  "/admin/schedule": "Schedule",
  "/admin/fleet": "Fleet Management",
  "/admin/availability": "Availability",
  "/admin/payments": "Payments",
  "/admin/invoices": "Invoices",
  "/admin/reports": "Reports",
  "/admin/team": "Team",
  "/admin/analytics": "Analytics",
  "/admin/gallery": "Gallery",
  "/admin/blog": "Blog",
  "/admin/settings": "Settings",
  "/admin/fleet/new": "Add Yacht",
  "/admin/bookings/new": "New Booking",
};

export default function AdminHeader() {
  const pathname = usePathname();
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState(MOCK_NOTIFICATIONS);
  const unread = notifs.filter((n) => !n.isRead).length;

  const title = Object.entries(PAGE_TITLES).find(([key]) =>
    key === pathname || (key !== "/admin" && pathname.startsWith(key))
  )?.[1] || "Admin";

  const markAllRead = () => setNotifs((n) => n.map((x) => ({ ...x, isRead: true })));

  const notifTypeColor: Record<string, string> = {
    info: "#60a5fa",
    success: "#34d399",
    warning: "#fbbf24",
    error: "#f87171",
  };

  return (
    <header className="h-[60px] flex items-center justify-between px-6 shrink-0"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(8,8,15,0.6)", backdropFilter: "blur(20px)" }}>
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="lg:hidden w-10" /> {/* Spacer for mobile burger */}
        <div>
          <h1 className="text-white font-medium text-base" style={{ fontFamily: "var(--font-cormorant)", fontSize: "20px", fontWeight: 500 }}>
            {title}
          </h1>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* View Site */}
        <Link href="/" target="_blank"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors hover:bg-white/10"
          style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
          <ExternalLink size={12} />
          View Site
        </Link>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen((p) => !p)}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-white/10"
          >
            <Bell size={16} style={{ color: "rgba(255,255,255,0.5)" }} />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                style={{ background: "#c9a96e", color: "#08080f" }}>
                {unread}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <>
                <motion.div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                <motion.div
                  className="absolute right-0 top-12 w-[340px] rounded-2xl overflow-hidden z-40"
                  style={{ background: "#0f1020", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 24px 60px rgba(0,0,0,0.6)" }}
                  initial={{ opacity: 0, y: -10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                    <span className="text-white text-sm font-medium" style={{ fontFamily: "var(--font-inter)" }}>Notifications</span>
                    {unread > 0 && (
                      <button onClick={markAllRead} className="flex items-center gap-1 text-[11px] transition-colors"
                        style={{ color: "#c9a96e", fontFamily: "var(--font-inter)" }}>
                        <CheckCheck size={11} /> Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-[360px] overflow-y-auto">
                    {notifs.map((n) => (
                      <Link key={n.id} href={n.link || "#"} onClick={() => setNotifOpen(false)}
                        className="flex gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors border-b border-white/[0.04] block">
                        <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: n.isRead ? "transparent" : notifTypeColor[n.type] }} />
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-[13px] font-medium" style={{ fontFamily: "var(--font-inter)", opacity: n.isRead ? 0.5 : 1 }}>
                            {n.title}
                          </div>
                          <div className="text-[12px] mt-0.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>
                            {n.message}
                          </div>
                          <div className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-inter)" }}>
                            {timeAgo(n.createdAt)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="px-4 py-2.5 text-center border-t border-white/[0.06]">
                    <Link href="/admin/notifications" onClick={() => setNotifOpen(false)}
                      className="text-[11px] tracking-wide" style={{ color: "rgba(201,169,110,0.7)", fontFamily: "var(--font-inter)" }}>
                      View all notifications →
                    </Link>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
