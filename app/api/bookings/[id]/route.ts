export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // const booking = await prisma.booking.findUnique({
    //   where: { id: params.id },
    //   include: { yacht: true, payments: true, invoices: true, activities: true, customer: true }
    // });
    return NextResponse.json({ booking: null });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch booking" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { status, paymentStatus, internalNotes, cancelReason, date, time } = body;

    // const booking = await prisma.booking.update({
    //   where: { id: params.id },
    //   data: {
    //     ...(status && { status, ...(status === "CONFIRMED" && { confirmedAt: new Date() }), ...(status === "CANCELLED" && { cancelledAt: new Date(), cancelReason }) }),
    //     ...(paymentStatus && { paymentStatus }),
    //     ...(internalNotes !== undefined && { internalNotes }),
    //     ...(date && { date: new Date(date) }),
    //     ...(time && { time }),
    //   }
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // await prisma.booking.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 });
  }
}
