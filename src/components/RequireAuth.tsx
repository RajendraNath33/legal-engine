"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();

  useEffect(() => {
    
    if (!loading && !user && pathname !== "/login") {
      
      router.replace("/login");
    }
  }, [loading, pathname, router, user]);

  return (
    <>
   
      {(!loading && !user && pathname !== "/login") ? null : children}
    </>
  );
}
