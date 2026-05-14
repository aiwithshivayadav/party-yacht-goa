"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard, Users, CalendarDays, Ship, CreditCard,
  FileText, BarChart3, Settings, LogOut, ChevronDown,
  Bell, UserCircle, Anchor, TrendingUp, Image, FileEdit,
  Shield, Activity, ChevronRight, Menu, X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  href?: string;
  icon: React.ElementType;
  badge?: number;
  children?: { label: string; href: string; badge?: number }[];
}

const NAV: { section: string; items: NavItem[] }[] = [
  {
    section: "",
    items: [
      { label: "Overview", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    section: "CRM",
    items: [
      { label: "Leads", href: "/admin/leads", icon: Users, badge: 0 },
      { label: "Customers", href: "/admin/customers", icon: UserCircle },
    ],
  },
  {
    section: "Operations",
    items: [
      { label: "Bookings", href: "/admin/bookings", icon: CalendarDays, badge: 0 },
      { label: "Schedule", href: "/admin/schedule", icon: Activity },
    ],
  },
  {
    section: "Fleet",
    items: [
      { label: "All Yachts", href: "/admin/fleet", icon: Ship },
      { label: "Availability", href: "/admin/availability", icon: Anchor },
    ],
  },
  {
    section: "Finance",
    items: [
      { label: "Payments", href: "/admin/payments", icon: CreditCard },
      { label: "Invoices", href: "/admin/invoices", icon: FileText },
      { label: "Reports", href: "/admin/reports", icon: TrendingUp },
    ],
  },
  {
    section: "Team",
    items: [
      { label: "Staff", href: "/admin/team", icon: Shield },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    ],
  },
  {
    section: "Content",
    items: [
      { label: "Gallery", href: "/admin/gallery", icon: Image },
      { label: "Blog", href: "/admin/blog", icon: FileEdit },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(201,169,110,0.15)", border: "1px solid rgba(201,169,110,0.3)" }}>
            <Anchor size={18} style={{ color: "#c9a96e" }} />
          </div>
          <div>
            <div className="text-white font-semibold text-sm tracking-wide" style={{ fontFamily: "var(--font-cormorant)", fontSize: "16px" }}>
              Party Yacht Goa
            </div>
            <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(201,169,110,0.6)", fontFamily: "var(--font-inter)" }}>
              Admin Console
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-none">
        {NAV.map((group) => (
          <div key={group.section} className="mb-2">
            {group.section && (
              <div className="px-3 py-2 text-[9px] tracking-[0.3em] uppercase font-medium"
                style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-inter)" }}>
                {group.section}
              </div>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = item.href ? isActive(item.href) : false;
              return (
                <Link
                  key={item.label}
                  href={item.href || "#"}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative"
                  style={{
                    background: active ? "rgba(201,169,110,0.1)" : "transparent",
                    border: active ? "1px solid rgba(201,169,110,0.2)" : "1px solid transparent",
                  }}
                >
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
                      style={{ background: "#c9a96e" }} />
                  )}
                  <Icon
                    size={16}
                    style={{ color: active ? "#c9a96e" : "rgba(255,255,255,0.4)", transition: "color 0.2s" }}
                    className="group-hover:text-white shrink-0"
                  />
                  <span
                    className="text-sm flex-1"
                    style={{
                      color: active ? "#c9a96e" : "rgba(255,255,255,0.55)",
                      fontFamily: "var(--font-inter)",
                      fontWeight: active ? 500 : 400,
                    }}
                  >
                    {item.label}
                  </span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: "rgba(201,169,110,0.2)", color: "#c9a96e", minWidth: "20px", textAlign: "center" }}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User + Signout */}
      <div className="px-4 py-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
            style={{ background: "rgba(201,169,110,0.2)", color: "#c9a96e" }}>
            {session?.user?.name?.[0]?.toUpperCase() || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm font-medium truncate" style={{ fontFamily: "var(--font-inter)" }}>
              {session?.user?.name || "Admin"}
            </div>
            <div className="text-[10px] truncate" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>
              {session?.user?.email || ""}
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
            title="Sign Out"
          >
            <LogOut size={14} style={{ color: "rgba(255,255,255,0.3)" }} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[240px] shrink-0 h-screen sticky top-0"
        style={{ background: "#0a0b14", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
        <SidebarContent />
      </aside>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: "rgba(10,11,20,0.9)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}
      >
        <Menu size={18} className="text-white" />
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed left-0 top-0 bottom-0 z-50 w-[260px] flex flex-col"
              style={{ background: "#0a0b14", borderRight: "1px solid rgba(255,255,255,0.08)" }}
              initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <button onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.08)" }}>
                <X size={16} className="text-white" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
