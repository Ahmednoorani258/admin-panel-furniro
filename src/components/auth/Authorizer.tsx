"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Authorizer({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return; // Wait until user data is loaded

    const role = user?.publicMetadata?.role as string | undefined;

    // ✅ Redirect users who are NOT "superadmin" or "admin"
    if (!user || !(role === "superadmin" || role === "admin")) {
      router.replace("https://market-ready-ecommerce-app.vercel.app/");
      return;
    }
  }, [isLoaded, user, router]);

  // Don't render children until user data is fully loaded
  if (!isLoaded) return null;

  return <>{children}</>;
}
