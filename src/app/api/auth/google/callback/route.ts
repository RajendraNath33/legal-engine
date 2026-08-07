import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { OAuth2Client } from "google-auth-library";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { encryptValue } from "@/lib/encryption";

const oauthClient = new OAuth2Client({
  clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) {
      return NextResponse.redirect(new URL("/dashboard?drive=error", request.url));
    }

    const { tokens } = await oauthClient.getToken(code);
    const refreshToken = tokens.refresh_token;

    if (!refreshToken) {
      return NextResponse.redirect(new URL("/dashboard?drive=error", request.url));
    }

    await db.update(users).set({ driveRefreshToken: encryptValue(refreshToken) }).where(eq(users.firebaseUid, state));

    return NextResponse.redirect(new URL("/dashboard?drive=connected", request.url));
  } catch (error) {
    console.error("Google auth callback failed", error);
    return NextResponse.redirect(new URL("/dashboard?drive=error", request.url));
  }
}
