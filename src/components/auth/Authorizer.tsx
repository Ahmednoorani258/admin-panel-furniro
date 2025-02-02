"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Authorizer({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    const role = user?.publicMetadata?.role as string;

    if (!user || role !== "superadmin" && role !== "admin") {
      router.push("https://market-ready-ecommerce-app.vercel.app/");
    } else {
      router.push("https://admin-panel-furniro.vercel.app/");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) return null;

  return <>{children}</>;
}
