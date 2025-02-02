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

    // Redirect regular users to the main site
    if (!user || (role && role !== "superadmin" && role !== "admin")) {
      router.replace("https://market-ready-ecommerce-app.vercel.app/");
      return; // Ensure no further execution
    }

    // Redirect admins to the admin panel only if they are not already there
    if (typeof window !== "undefined" && !window.location.href.includes("admin-panel-furniro")) {
      router.replace("https://admin-panel-furniro.vercel.app/");
    }
  }, [isLoaded, user, router]);

  // Don't render children until user data is fully loaded
  if (!isLoaded) return null;

  return <>{children}</>;
}
