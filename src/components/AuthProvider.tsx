"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authStatus, setAuthStatus] = useState("pending");
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      console.error("AuthProvider missing auth instance");
      setAuthStatus("auth-missing");
      setAuthError("Firebase auth object failed to initialize");
      setLoading(false);
      return;
    }

    setAuthStatus("auth-present");
    console.error("AuthProvider starting auth listener");
    const unsubscribe = onAuthStateChanged(
      auth,
      (nextUser) => {
        console.error("AuthProvider onAuthStateChanged", { nextUser });
        setUser(nextUser);
        setLoading(false);
      },
      (error) => {
        console.error("AuthProvider auth listener error", error);
        setAuthStatus("listener-error");
        setAuthError(error?.message ?? String(error));
        setLoading(false);
      }
    );

    return () => {
      console.log("AuthProvider unsubscribing auth listener");
      unsubscribe();
    };
  }, []);

  const signOut = async () => {
    if (!auth) {
      console.error("AuthProvider signOut called without auth");
      return;
    }

    console.error("AuthProvider signOut called");
    await firebaseSignOut(auth);
    router.replace("/login");
  };

  const value = useMemo(() => ({ user, loading, signOut }), [user, loading, signOut]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9998,
          background: "purple",
          color: "white",
          padding: "4px",
          fontSize: "10px",
          pointerEvents: "none",
        }}
      >
        AUTH PROVIDER DEBUG: status={authStatus} error={authError ?? "none"}
      </div>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
