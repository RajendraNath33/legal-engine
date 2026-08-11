import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { judgmentPdfs } from "@/db/schema";
import { desc } from "drizzle-orm";
import { requireAdminFromRequest, requireUserFromRequest } from "@/lib/admin-auth";
import { saveJudgmentFile } from "@/lib/judgment-storage";
import { DOCUMENT_CATEGORIES } from "@/lib/document-categories";

export async function GET(request: NextRequest) {
  const auth = await requireUserFromRequest(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const rows = await db
    .select({
      id: judgmentPdfs.id,
      title: judgmentPdfs.title,
      category: judgmentPdfs.category,
      fileName: judgmentPdfs.fileName,
      fileSize: judgmentPdfs.fileSize,
      createdAt: judgmentPdfs.createdAt,
    })
    .from(judgmentPdfs)
    .orderBy(desc(judgmentPdfs.createdAt));

  return NextResponse.json({ judgments: rows });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminFromRequest(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const title = formData.get("title");
  const categoryRaw = formData.get("category");
  const validCategories = DOCUMENT_CATEGORIES.map((c) => c.value);
  const category =
    typeof categoryRaw === "string" && (validCategories as string[]).includes(categoryRaw)
      ? categoryRaw
      : "judgment";

  if (!(file instanceof File) || typeof title !== "string" || !title.trim()) {
    return NextResponse.json({ error: "file and title are required" }, { status: 400 });
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
  }

  const MAX_SIZE = 25 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File is too large (max 25MB)" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { storagePath } = await saveJudgmentFile(file.name, buffer);

  let extractedText: string | null = null;
  try {
    const { PDFParse } = await import("pdf-parse");
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    await parser.destroy();
    extractedText = result.text?.slice(0, 200000) || null;
  } catch (error) {
    console.error("PDF text extraction failed", error);
  }

  const [inserted] = await db
    .insert(judgmentPdfs)
    .values({
      title: title.trim(),
      category,
      fileName: file.name,
      storagePath,
      fileSize: file.size,
      extractedText,
      uploadedByEmail: auth.email,
    })
    .returning({ id: judgmentPdfs.id });

  return NextResponse.json({ ok: true, id: inserted.id });
}
