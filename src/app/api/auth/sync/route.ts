import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyIdToken } from "@/lib/firebase-admin";
import { encryptValue } from "@/lib/encryption";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phoneNumber, idToken, driveRefreshToken } = body as {
      firebaseUid?: string;
      email?: string | null;
      phoneNumber?: string | null;
      idToken?: string;
      driveRefreshToken?: string | null;
    };

    if (!idToken) {
      return NextResponse.json({ error: "idToken is required" }, { status: 400 });
    }

    const verifiedToken = await verifyIdToken(idToken);
    const firebaseUid = verifiedToken.uid;

    const existing = await db.select().from(users).where(eq(users.firebaseUid, firebaseUid)).limit(1);

    if (existing.length > 0) {
      await db
        .update(users)
        .set({
          email: email || existing[0].email,
          phoneNumber: phoneNumber || existing[0].phoneNumber,
          driveRefreshToken: existing[0].driveRefreshToken,
        })
        .where(eq(users.firebaseUid, firebaseUid));
    } else {
      await db.insert(users).values({
        firebaseUid,
        email: email || null,
        phoneNumber: phoneNumber || null,
        driveRefreshToken: null,
      });
    }

    return NextResponse.json({ ok: true, firebaseUid, idToken: Boolean(idToken) });
  } catch (error) {
    console.error("Auth sync failed", error);
    return NextResponse.json({ error: "Auth sync failed" }, { status: 500 });
  }
}
