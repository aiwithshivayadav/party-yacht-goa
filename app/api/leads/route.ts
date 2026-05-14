import { NextRequest, NextResponse } from "next/server";

// In-memory store for leads (resets on server restart)
// In production, replace with a database call
const leads: unknown[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const lead = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: "NEW",
      ...body,
    };
    leads.push(lead);
    console.log("[Lead captured]", lead);
    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ leads, total: leads.length });
}
