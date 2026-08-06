import { db } from "@/db";
import { drafts } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const rows = await db.select().from(drafts).orderBy(drafts.createdAt);
  return NextResponse.json({ drafts: rows });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, type, content, inputs, tone } = body;
  if (!title || !type || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const [inserted] = await db.insert(drafts).values({
    title, type, content,
    inputs: inputs || {},
    tone: tone || "formal",
  }).returning();
  return NextResponse.json({ draft: inserted });
}
