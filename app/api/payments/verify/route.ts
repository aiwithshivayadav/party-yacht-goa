export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { sendPaymentReceipt } from "@/lib/email";
import { generateInvoiceCode } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingId, paymentCode, amount, customerEmail, customerName } = await req.json();

    // In production: verify signature
    // const { verifySignature } = await import("@/lib/razorpay");
    // const isValid = verifySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);
    // if (!isValid) return NextResponse.json({ error: "Invalid signature" }, { status: 400 });

    // In production: update DB
    // await prisma.payment.update({ where: { paymentCode }, data: { razorpayOrderId, razorpayPaymentId, razorpaySignature, status: "PAID", paidAt: new Date() } });
    // const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    // if (booking && booking.paidAmount + amount >= booking.totalAmount) await prisma.booking.update({ where: { id: bookingId }, data: { paidAmount: { increment: amount }, paymentStatus: "PAID" } });
    // else await prisma.booking.update({ where: { id: bookingId }, data: { paidAmount: { increment: amount }, paymentStatus: "PARTIAL" } });

    // Send receipt
    try {
      await sendPaymentReceipt({
        customerName: customerName || "Guest",
        customerEmail,
        bookingCode: bookingId,
        paymentCode,
        amount,
        method: "Razorpay",
        date: new Date(),
      });
    } catch (emailError) {
      console.error("Receipt email failed:", emailError);
    }

    return NextResponse.json({ success: true, invoiceCode: generateInvoiceCode() });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
  }
}
