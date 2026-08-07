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

  if (loading) {
    return null;
  }

  if (!user && pathname !== "/login") {
    console.error("RequireAuth rendering null because user is unauthenticated", { pathname });
    return null;
  }

  return <>{children}</>;
}
