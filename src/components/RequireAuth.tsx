"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();

  useEffect(() => {
    console.error("RequireAuth status", { loading, user, pathname });
    if (!loading && !user && pathname !== "/login") {
      console.error("RequireAuth redirecting to /login", { pathname });
      router.replace("/login");
    }
  }, [loading, pathname, router, user]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          background: "red",
          color: "white",
          padding: "4px",
          fontSize: "10px",
          pointerEvents: "none",
        }}
      >
        AUTH DEBUG: loading={String(loading)} user={user ? user.uid : "null"}
      </div>
      {(!loading && !user && pathname !== "/login") ? null : children}
    </>
  );
}
