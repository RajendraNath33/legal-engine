"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup, signInWithPhoneNumber, ConfirmationResult, RecaptchaVerifier } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useAuth } from "@/components/AuthProvider";
import { ShieldCheck, Phone, LogIn } from "lucide-react";
import Image from "next/image";
import { API_BASE_URL } from "@/lib/config";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { GoogleAuthProvider as GoogleAuthProviderCred, signInWithCredential } from "firebase/auth";

const SHOW_PHONE_LOGIN = false;

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(null);
  const [status, setStatus] = useState("Sign in to continue");
  const [busy, setBusy] = useState(false);
  const recaptchaContainerId = "legal-mitra-recaptcha-container";
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const normalizedPhoneNumber = phoneNumber.replace(/\D/g, "");
  const isPhoneValid = normalizedPhoneNumber.length === 10;

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [loading, router, user]);

  useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        const verifier = recaptchaVerifierRef.current;
        verifier.clear();
        recaptchaVerifierRef.current = null;
      }
      if (typeof window !== "undefined") {
        delete (window as Window & typeof globalThis & { recaptchaVerifier?: RecaptchaVerifier }).recaptchaVerifier;
      }
    };
  }, []);

  useEffect(() => {
    if (!auth || recaptchaVerifierRef.current || typeof window === "undefined") {
      return;
    }

    const container = document.getElementById(recaptchaContainerId);
    if (!container) {
      return;
    }

    try {
      const verifier = new RecaptchaVerifier(auth, recaptchaContainerId, { size: "invisible" });
      recaptchaVerifierRef.current = verifier;
      (window as Window & typeof globalThis & { recaptchaVerifier?: RecaptchaVerifier }).recaptchaVerifier = verifier;
    } catch (error) {
      console.error("Failed to initialize phone reCAPTCHA", error);
      setStatus("Phone verification setup failed. Please refresh the page and try again.");
    }
  }, [recaptchaContainerId]);

  const ensureRecaptcha = () => {
    if (recaptchaVerifierRef.current) {
      return recaptchaVerifierRef.current;
    }

    if (!auth || typeof window === "undefined") {
      return null;
    }

    const container = document.getElementById(recaptchaContainerId);
    if (!container) {
      return null;
    }

    try {
      const verifier = new RecaptchaVerifier(auth, recaptchaContainerId, { size: "invisible" });
      recaptchaVerifierRef.current = verifier;
      (window as Window & typeof globalThis & { recaptchaVerifier?: RecaptchaVerifier }).recaptchaVerifier = verifier;
      return verifier;
    } catch (error) {
      console.error("Failed to initialize phone reCAPTCHA", error);
      setStatus("Phone verification setup failed. Please refresh the page and try again.");
      return null;
    }
  };

  const handleGoogleSignIn = async () => {
    if (!auth) {
      setStatus("Firebase is not available in this environment");
      return;
    }

    setBusy(true);
    setStatus("Connecting to Google...");
    try {
      const result = await FirebaseAuthentication.signInWithGoogle();
      const idToken = result.credential?.idToken;
      if (!idToken) {
        throw new Error("No ID token received from native Google sign-in");
      }
      const credential = GoogleAuthProviderCred.credential(idToken);
      const jsResult = await signInWithCredential(auth, credential);
      const user = jsResult.user;
      const token = await user.getIdToken();
      await fetch(`${API_BASE_URL}/api/auth/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firebaseUid: user.uid, email: user.email, phoneNumber: user.phoneNumber, idToken: token }),
      });
      router.replace("/dashboard");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Google sign-in failed");
    } finally {
      setBusy(false);
    }
  };

  const handleSendOtp = async () => {
    if (!isPhoneValid) {
      setStatus("Enter a valid 10-digit Indian mobile number");
      return;
    }

    if (!auth) {
      setStatus("Firebase is not available in this environment");
      return;
    }

    setBusy(true);
    setStatus("Sending OTP...");
    try {
      const verifier = ensureRecaptcha();
      if (!verifier) {
        setStatus("Phone verification setup failed. Please refresh the page and try again.");
        return;
      }

      const e164PhoneNumber = `+91${normalizedPhoneNumber}`;
      const result = await signInWithPhoneNumber(auth, e164PhoneNumber, verifier);
      setConfirmation(result);
      setStatus("OTP sent. Enter the code below.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not send OTP");
    } finally {
      setBusy(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!confirmation || !otp) {
      setStatus("Enter the OTP first");
      return;
    }

    setBusy(true);
    setStatus("Verifying OTP...");
    try {
      const result = await confirmation.confirm(otp);
      const token = await result.user.getIdToken();
      await fetch(`${API_BASE_URL}/api/auth/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firebaseUid: result.user.uid, email: result.user.email, phoneNumber: result.user.phoneNumber, idToken: token }),
      });
      router.replace("/dashboard");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "OTP verification failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-slate-200">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-amber-900/10">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex w-full justify-center">
            <Image src="/Inner-logo.jpeg" alt="Legal Mitra" width={220} height={220} className="h-auto w-48 rounded-2xl" />
          </div>
        </div>

        <p className="mb-4 text-sm text-slate-400">{status}</p>

        <button
          onClick={handleGoogleSignIn}
          disabled={busy}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
        >
          <LogIn className="h-4 w-4" />
          Sign in with Google
        </button>

        {SHOW_PHONE_LOGIN && (
          <>
            <div className="my-4 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-500">
              <div className="h-px flex-1 bg-slate-800" />
              <span>or</span>
              <div className="h-px flex-1 bg-slate-800" />
            </div>

            <label className="mb-2 block text-sm text-slate-300">Phone number</label>
            <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2">
              <Phone className="h-4 w-4 text-slate-500" />
              <span className="shrink-0 text-sm font-medium text-slate-300">+91</span>
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="9876543210"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={10}
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
            <p className="mt-2 text-xs text-slate-500">Enter your 10-digit mobile number. We will format it as +91XXXXXXXXXX for Firebase.</p>

            <button
              onClick={handleSendOtp}
              disabled={busy || !isPhoneValid}
              className="mt-3 w-full rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
            >
              Send OTP
            </button>

            {confirmation && (
              <>
                <label className="mt-4 mb-2 block text-sm text-slate-300">OTP code</label>
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm outline-none"
                />
                <button
                  onClick={handleVerifyOtp}
                  disabled={busy}
                  className="mt-3 w-full rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-sm font-semibold text-amber-200"
                >
                  Verify OTP
                </button>
              </>
            )}

            <div className="mt-4 flex justify-center">
              <div id={recaptchaContainerId} aria-label="reCAPTCHA verification container" className="min-h-[1px] w-full" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
