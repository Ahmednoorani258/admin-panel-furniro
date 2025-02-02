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
    // Wait for user data to load before checking role
    if (!isLoaded) return;

    const role = user?.publicMetadata?.role as string;

    if (!user || role !== "superadmin") {
      router.push("/sign-in");
    }
  }, [isLoaded, user, router]);

  // Don't render children until user data is loaded
  if (!isLoaded) return null;

  return <>{children}</>;
}
