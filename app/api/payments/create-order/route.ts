export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { generatePaymentCode } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { amount, bookingId, currency = "INR" } = await req.json();

    if (!amount || !bookingId) {
      return NextResponse.json({ error: "Amount and bookingId are required" }, { status: 400 });
    }

    const paymentCode = generatePaymentCode();

    // In production with Razorpay configured:
    // const { createOrder } = await import("@/lib/razorpay");
    // const order = await createOrder(amount, currency, paymentCode);
    // In production: save order to DB
    // await prisma.payment.create({ data: { paymentCode, bookingId, amount, currency, method: "RAZORPAY", status: "PENDING", razorpayOrderId: order.id } });

    // Mock response for development
    const mockOrderId = `order_${Date.now()}`;

    return NextResponse.json({
      success: true,
      orderId: mockOrderId,
      paymentCode,
      amount: Math.round(amount * 100), // paise
      currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_demo",
    });
  } catch (error) {
    console.error("Payment order error:", error);
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 });
  }
}
