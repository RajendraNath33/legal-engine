import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { OAuth2Client } from "google-auth-library";
import { verifyIdToken } from "@/lib/firebase-admin";

const oauthClient = new OAuth2Client({
  clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idToken = searchParams.get("idToken");

    if (!idToken) {
      return NextResponse.json({ error: "idToken is required" }, { status: 401 });
    }

    const decoded = await verifyIdToken(idToken);
    const firebaseUid = decoded.uid;

    const authUrl = oauthClient.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: ["https://www.googleapis.com/auth/drive.file"],
      state: firebaseUid,
    });

    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error("Google auth authorize failed", error);
    return NextResponse.json({ error: "Google auth authorize failed" }, { status: 500 });
  }
}
