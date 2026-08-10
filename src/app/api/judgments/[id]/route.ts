import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { judgmentPdfs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireAdminFromRequest, requireUserFromRequest } from "@/lib/admin-auth";
import { deleteJudgmentFile, getJudgmentFilePath } from "@/lib/judgment-storage";
import { promises as fs } from "fs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireUserFromRequest(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { id } = await params;
  const rows = await db
    .select()
    .from(judgmentPdfs)
    .where(eq(judgmentPdfs.id, Number(id)))
    .limit(1);

  const record = rows[0];
  if (!record) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const filePath = getJudgmentFilePath(record.storagePath);
  const fileBuffer = await fs.readFile(filePath);

  return new NextResponse(new Uint8Array(fileBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${encodeURIComponent(record.fileName)}"`,
    },
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminFromRequest(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { id } = await params;
  const rows = await db
    .select()
    .from(judgmentPdfs)
    .where(eq(judgmentPdfs.id, Number(id)))
    .limit(1);

  const record = rows[0];
  if (!record) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await deleteJudgmentFile(record.storagePath);
  await db.delete(judgmentPdfs).where(eq(judgmentPdfs.id, Number(id)));

  return NextResponse.json({ ok: true });
}