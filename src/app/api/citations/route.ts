import { db } from "@/db";
import { citations } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const rows = await db.select().from(citations).orderBy(citations.createdAt);
  return NextResponse.json({ citations: rows });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { format, inputType, raw, formatted } = body;
  if (!format || !inputType || !formatted) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const [inserted] = await db.insert(citations).values({
    format, inputType,
    raw: raw || "",
    formatted,
  }).returning();
  return NextResponse.json({ citation: inserted });
}
