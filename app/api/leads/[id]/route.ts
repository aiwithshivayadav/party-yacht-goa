export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/leads/:id
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // const lead = await prisma.lead.findUnique({ where: { id: params.id }, include: { notes: { include: { author: true } }, activities: true, yacht: true, assignedTo: true } });
    // if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    return NextResponse.json({ lead: null });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch lead" }, { status: 500 });
  }
}

// PATCH /api/leads/:id
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { status, priority, assignedToId, followUpAt, note } = body;

    // In production:
    // const updated = await prisma.lead.update({ where: { id: params.id }, data: { status, priority, assignedToId, followUpAt: followUpAt ? new Date(followUpAt) : undefined } });
    // if (note) await prisma.leadNote.create({ data: { content: note, leadId: params.id, authorId: (session.user as any).id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

// DELETE /api/leads/:id
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // await prisma.lead.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
