"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Authorizer({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    const role = user?.publicMetadata?.role as string | undefined;
    console.log("User role:", role);
    console.log("Current host:", window.location.host);

    // Check if user is not logged in or doesn't have admin roles
    if (!user || !(role === "superadmin" || role === "admin")) {
      router.replace("https://market-ready-ecommerce-app.vercel.app/");
    } else {
      // Check if current host is not the admin panel
      if (!window.location.host.includes("admin-panel-furniro.vercel.app")) {
        router.replace("https://admin-panel-furniro.vercel.app/");
      }
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) return null;

  return <>{children}</>;
}
