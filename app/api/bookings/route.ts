export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateBookingCode, calculateAddonsPrice } from "@/lib/utils";
import { sendBookingConfirmation } from "@/lib/email";

// GET /api/bookings
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    // const bookings = await prisma.booking.findMany({
    //   where: { status: status as any || undefined, date: { gte: from ? new Date(from) : undefined, lte: to ? new Date(to) : undefined } },
    //   include: { yacht: true, payments: true },
    //   orderBy: { date: "asc" }
    // });

    return NextResponse.json({ bookings: [], total: 0 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

// POST /api/bookings — create booking (from admin or booking form)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName, customerEmail, customerPhone, customerWhatsapp, country,
      yachtId, yachtName, date, time, duration, durationHrs,
      adults, children, occasion, addons, pickupPoint, specialRequests,
      basePrice, discount,
    } = body;

    if (!customerName || !customerEmail || !customerPhone || !yachtId || !date) {
      return NextResponse.json({ error: "Missing required booking fields" }, { status: 400 });
    }

    const addonsPrice = calculateAddonsPrice(addons || []);
    const taxAmount = 0; // Add GST if needed
    const totalAmount = (basePrice || 0) + addonsPrice - (discount || 0) + taxAmount;
    const bookingCode = generateBookingCode();

    // In production:
    // const booking = await prisma.booking.create({
    //   data: {
    //     bookingCode, customerName, customerEmail, customerPhone, customerWhatsapp, country,
    //     yachtId, date: new Date(date), time, duration, durationHrs: parseFloat(durationHrs || "2"),
    //     adults: parseInt(adults), children: parseInt(children || "0"),
    //     occasion, addons: addons || [], pickupPoint, specialRequests,
    //     basePrice: parseFloat(basePrice || "0"), addonsPrice, discount: parseFloat(discount || "0"),
    //     taxAmount, totalAmount, balance: totalAmount,
    //     status: "PENDING", paymentStatus: "PENDING",
    //   }
    // });

    // Send confirmation email
    try {
      await sendBookingConfirmation({
        bookingCode,
        customerName,
        customerEmail,
        yachtName: yachtName || "Your Selected Yacht",
        date: new Date(date),
        time,
        duration,
        adults: parseInt(adults),
        children: parseInt(children || "0"),
        occasion,
        totalAmount,
        addons: addons || [],
      });
    } catch (emailError) {
      console.error("Failed to send booking confirmation:", emailError);
    }

    return NextResponse.json({
      success: true,
      bookingCode,
      totalAmount,
      message: "Booking created successfully!",
    });
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
