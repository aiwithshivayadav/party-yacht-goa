import { Resend } from "resend";
import { formatCurrency, formatDate } from "@/lib/utils";

// Lazy-initialize Resend to avoid module-level errors when API key is absent
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

const FROM = process.env.EMAIL_FROM || "bookings@partyyachtgoa.com";
const ADMIN = process.env.EMAIL_ADMIN || "admin@partyyachtgoa.com";

// ─── Booking Confirmation Email ──────────────────────────────
export async function sendBookingConfirmation(booking: {
  bookingCode: string;
  customerName: string;
  customerEmail: string;
  yachtName: string;
  date: Date;
  time: string;
  duration: string;
  adults: number;
  children: number;
  occasion?: string;
  totalAmount: number;
  addons: string[];
}) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation — Party Yacht Goa</title>
</head>
<body style="margin:0;padding:0;background:#08080f;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <!-- Header -->
    <div style="text-align:center;margin-bottom:40px;">
      <div style="font-size:28px;font-weight:300;color:#c9a96e;letter-spacing:4px;text-transform:uppercase;">PARTY YACHT GOA</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:3px;margin-top:6px;text-transform:uppercase;">Luxury Yacht Charter</div>
    </div>

    <!-- Main Card -->
    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(201,169,110,0.3);border-radius:16px;padding:40px;margin-bottom:24px;">
      <div style="font-size:13px;color:#c9a96e;letter-spacing:3px;text-transform:uppercase;margin-bottom:16px;">Booking Confirmed ✓</div>
      <h1 style="color:#ffffff;font-size:28px;font-weight:300;margin:0 0 8px;">Your voyage is set,<br/><em style="font-style:italic;">${booking.customerName}</em></h1>
      <p style="color:rgba(255,255,255,0.5);font-size:14px;line-height:1.7;margin:0 0 32px;">We&apos;re excited to welcome you aboard. Here are your booking details:</p>

      <!-- Booking Code -->
      <div style="background:rgba(201,169,110,0.08);border:1px solid rgba(201,169,110,0.2);border-radius:10px;padding:16px 20px;margin-bottom:32px;text-align:center;">
        <div style="font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:3px;text-transform:uppercase;margin-bottom:4px;">Booking Reference</div>
        <div style="font-size:22px;font-weight:600;color:#c9a96e;letter-spacing:2px;">${booking.bookingCode}</div>
      </div>

      <!-- Details Grid -->
      <table style="width:100%;border-collapse:collapse;">
        ${[
          ["Yacht", booking.yachtName],
          ["Date", formatDate(booking.date)],
          ["Time", booking.time],
          ["Duration", booking.duration],
          ["Guests", `${booking.adults} Adults${booking.children ? `, ${booking.children} Children` : ""}`],
          booking.occasion ? ["Occasion", booking.occasion] : null,
          booking.addons?.length ? ["Add-ons", booking.addons.join(", ")] : null,
          ["Total Amount", formatCurrency(booking.totalAmount)],
        ]
          .filter(Boolean)
          .map((row) => { const [label, value] = row as [string, string]; return `<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);color:rgba(255,255,255,0.4);font-size:13px;width:40%;">${label}</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);color:#ffffff;font-size:13px;font-weight:500;">${value}</td></tr>`; }).join("")}
      </table>
    </div>

    <!-- What Next -->
    <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:28px;margin-bottom:24px;">
      <div style="font-size:12px;color:rgba(255,255,255,0.4);letter-spacing:3px;text-transform:uppercase;margin-bottom:16px;">What Happens Next</div>
      ${[
        ["1", "Our team will call you within 2 hours to confirm details."],
        ["2", "You'll receive a payment link on WhatsApp."],
        ["3", "Once paid, you'll get a full itinerary & boarding pass."],
      ].map(([n, text]) => `
        <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:12px;">
          <div style="width:24px;height:24px;background:rgba(201,169,110,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#c9a96e;font-size:12px;font-weight:600;text-align:center;line-height:24px;">${n}</div>
          <div style="color:rgba(255,255,255,0.6);font-size:13px;line-height:1.6;padding-top:3px;">${text}</div>
        </div>
      `).join("")}
    </div>

    <!-- Contact -->
    <div style="text-align:center;padding:20px 0;">
      <p style="color:rgba(255,255,255,0.4);font-size:13px;margin:0 0 8px;">Questions? Reach us on WhatsApp</p>
      <a href="https://wa.me/918960070105" style="color:#c9a96e;font-size:16px;font-weight:600;text-decoration:none;">+91 89600 70105</a>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding-top:32px;border-top:1px solid rgba(255,255,255,0.05);">
      <div style="color:rgba(255,255,255,0.2);font-size:11px;letter-spacing:1px;">© 2025 Party Yacht Goa. All rights reserved.</div>
      <div style="color:rgba(255,255,255,0.15);font-size:11px;margin-top:4px;">Panaji, Goa, India — partyyachtgoa.com</div>
    </div>
  </div>
</body>
</html>
  `;

  try {
    const resend = getResend(); if (!resend) { console.warn("Resend not configured"); return; } await resend.emails.send({
      from: `Party Yacht Goa <${FROM}>`,
      to: booking.customerEmail,
      subject: `✓ Booking Confirmed — ${booking.bookingCode} | Party Yacht Goa`,
      html,
    });
  } catch (error) {
    console.error("Email send error (booking confirmation):", error);
  }
}

// ─── Lead Notification to Admin ──────────────────────────────
export async function sendLeadNotificationToAdmin(lead: {
  leadCode: string;
  name: string;
  email: string;
  phone: string;
  yachtName?: string;
  date?: Date | null;
  occasion?: string;
  message?: string;
}) {
  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0f1020;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:32px 20px;">
  <div style="background:#c9a96e;color:#08080f;padding:16px 24px;border-radius:10px;margin-bottom:24px;">
    <div style="font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">🚨 New Inquiry — ${lead.leadCode}</div>
  </div>
  <table style="width:100%;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:10px;border-collapse:collapse;padding:24px;">
    <tr><td style="padding:12px 20px;color:rgba(255,255,255,0.5);font-size:13px;border-bottom:1px solid rgba(255,255,255,0.05);width:35%;">Name</td><td style="padding:12px 20px;color:#fff;font-size:13px;font-weight:600;border-bottom:1px solid rgba(255,255,255,0.05);">${lead.name}</td></tr>
    <tr><td style="padding:12px 20px;color:rgba(255,255,255,0.5);font-size:13px;border-bottom:1px solid rgba(255,255,255,0.05);">Phone</td><td style="padding:12px 20px;color:#fff;font-size:13px;font-weight:600;border-bottom:1px solid rgba(255,255,255,0.05);">${lead.phone}</td></tr>
    <tr><td style="padding:12px 20px;color:rgba(255,255,255,0.5);font-size:13px;border-bottom:1px solid rgba(255,255,255,0.05);">Email</td><td style="padding:12px 20px;color:#fff;font-size:13px;border-bottom:1px solid rgba(255,255,255,0.05);">${lead.email}</td></tr>
    ${lead.yachtName ? `<tr><td style="padding:12px 20px;color:rgba(255,255,255,0.5);font-size:13px;border-bottom:1px solid rgba(255,255,255,0.05);">Yacht</td><td style="padding:12px 20px;color:#c9a96e;font-size:13px;font-weight:600;border-bottom:1px solid rgba(255,255,255,0.05);">${lead.yachtName}</td></tr>` : ""}
    ${lead.date ? `<tr><td style="padding:12px 20px;color:rgba(255,255,255,0.5);font-size:13px;border-bottom:1px solid rgba(255,255,255,0.05);">Preferred Date</td><td style="padding:12px 20px;color:#fff;font-size:13px;border-bottom:1px solid rgba(255,255,255,0.05);">${formatDate(lead.date)}</td></tr>` : ""}
    ${lead.occasion ? `<tr><td style="padding:12px 20px;color:rgba(255,255,255,0.5);font-size:13px;border-bottom:1px solid rgba(255,255,255,0.05);">Occasion</td><td style="padding:12px 20px;color:#fff;font-size:13px;border-bottom:1px solid rgba(255,255,255,0.05);">${lead.occasion}</td></tr>` : ""}
    ${lead.message ? `<tr><td colspan="2" style="padding:12px 20px;color:rgba(255,255,255,0.5);font-size:13px;"><div style="margin-bottom:6px;">Message</div><div style="color:#fff;line-height:1.6;">${lead.message}</div></td></tr>` : ""}
  </table>
  <div style="text-align:center;margin-top:24px;">
    <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/leads" style="background:#c9a96e;color:#08080f;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:700;font-size:13px;letter-spacing:1px;text-transform:uppercase;">View in Dashboard →</a>
  </div>
</div>
</body>
</html>
  `;

  try {
    const resend = getResend(); if (!resend) { console.warn("Resend not configured"); return; } await resend.emails.send({
      from: `Party Yacht Goa CRM <${FROM}>`,
      to: ADMIN,
      subject: `🚨 New Inquiry ${lead.leadCode} — ${lead.name} (${lead.yachtName || "No yacht"})`,
      html,
    });
  } catch (error) {
    console.error("Email send error (lead notification):", error);
  }
}

// ─── Payment Receipt ─────────────────────────────────────────
export async function sendPaymentReceipt(data: {
  customerName: string;
  customerEmail: string;
  bookingCode: string;
  paymentCode: string;
  amount: number;
  method: string;
  date: Date;
}) {
  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#08080f;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 20px;">
  <div style="text-align:center;margin-bottom:32px;">
    <div style="font-size:24px;color:#c9a96e;letter-spacing:4px;">PARTY YACHT GOA</div>
    <div style="font-size:11px;color:rgba(255,255,255,0.3);letter-spacing:3px;margin-top:4px;">PAYMENT RECEIPT</div>
  </div>
  <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:28px;text-align:center;margin-bottom:28px;">
    <div style="font-size:40px;margin-bottom:8px;">✓</div>
    <div style="color:#34d399;font-size:14px;letter-spacing:2px;text-transform:uppercase;">Payment Received</div>
    <div style="color:#ffffff;font-size:36px;font-weight:300;margin-top:8px;">${formatCurrency(data.amount)}</div>
  </div>
  <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:24px;">
    ${[
      ["Payment ID", data.paymentCode],
      ["Booking Ref", data.bookingCode],
      ["Date", formatDateTime(data.date)],
      ["Method", data.method],
      ["Amount", formatCurrency(data.amount)],
    ].map(([l, v]) => `<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:rgba(255,255,255,0.4);font-size:13px;">${l}</span><span style="color:#fff;font-size:13px;font-weight:500;">${v}</span></div>`).join("")}
  </div>
  <p style="text-align:center;color:rgba(255,255,255,0.3);font-size:12px;margin-top:24px;">Thank you, ${data.customerName}. See you on the water! ⛵</p>
</div>
</body>
</html>
  `;

  try {
    const resend = getResend(); if (!resend) { console.warn("Resend not configured"); return; } await resend.emails.send({
      from: `Party Yacht Goa <${FROM}>`,
      to: data.customerEmail,
      subject: `Payment Receipt ${data.paymentCode} — ${formatCurrency(data.amount)} received`,
      html,
    });
  } catch (error) {
    console.error("Email send error (payment receipt):", error);
  }
}

function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  }).format(new Date(date));
}
