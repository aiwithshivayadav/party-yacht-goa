"use client";

import { LEAD_STATUS_COLORS, BOOKING_STATUS_COLORS, PAYMENT_STATUS_COLORS, ROLE_COLORS } from "@/lib/utils";

type BadgeType = "lead" | "booking" | "payment" | "role";

interface Props {
  status: string;
  type?: BadgeType;
  size?: "sm" | "md";
}

export default function StatusBadge({ status, type = "lead", size = "sm" }: Props) {
  const colorMap = {
    lead: LEAD_STATUS_COLORS,
    booking: BOOKING_STATUS_COLORS,
    payment: PAYMENT_STATUS_COLORS,
    role: ROLE_COLORS,
  };

  const colors = colorMap[type][status] || {
    bg: "rgba(100,116,139,0.15)",
    text: "#94a3b8",
    border: "rgba(100,116,139,0.3)",
  };

  const label = status.replace(/_/g, " ");
  const fontSize = size === "sm" ? "10px" : "11px";
  const padding = size === "sm" ? "3px 8px" : "4px 10px";

  return (
    <span
      style={{
        background: colors.bg,
        color: colors.text,
        border: `1px solid ${(colors as any).border || "transparent"}`,
        fontSize,
        padding,
        borderRadius: "6px",
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        display: "inline-block",
        whiteSpace: "nowrap",
        fontFamily: "var(--font-inter)",
      }}
    >
      {label}
    </span>
  );
}
