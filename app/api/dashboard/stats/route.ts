export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // In production: compute real stats from DB
    // const [totalRevenue, totalBookings, activeLeads, ...] = await Promise.all([...]);

    // Mock stats for demo
    const stats = {
      revenue: {
        total: 3840000,
        thisMonth: 512000,
        lastMonth: 445000,
        growth: 15.05,
      },
      bookings: {
        total: 287,
        thisMonth: 39,
        pending: 4,
        confirmed: 31,
        completed: 245,
        cancelled: 12,
      },
      leads: {
        total: 1842,
        active: 23,
        newToday: 5,
        conversionRate: 15.6,
      },
      fleet: {
        total: 11,
        active: 11,
        utilization: 73,
      },
      recentRevenue: [
        { month: "Jun", revenue: 182000 },
        { month: "Jul", revenue: 245000 },
        { month: "Aug", revenue: 312000 },
        { month: "Sep", revenue: 278000 },
        { month: "Oct", revenue: 195000 },
        { month: "Nov", revenue: 167000 },
        { month: "Dec", revenue: 389000 },
        { month: "Jan", revenue: 421000 },
        { month: "Feb", revenue: 356000 },
        { month: "Mar", revenue: 298000 },
        { month: "Apr", revenue: 445000 },
        { month: "May", revenue: 512000 },
      ],
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
