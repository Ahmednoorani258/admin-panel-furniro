"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Authorizer({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const res = await fetch("/api/check-role");

        if (res.ok) {
          setIsAuthorized(true);
          router.push("/"); // Redirect to the homepage if authorized
        } else {
          setIsAuthorized(false);
          router.push("/sign-in"); // Redirect to sign-in if not authorized
        }
      } catch (error) {
        console.error("Error checking role:", error);
        setIsAuthorized(false);
        router.push("/sign-in"); // Redirect to sign-in on error
      }
    };

    checkAccess();
  }, [router]);

  if (isAuthorized === null) {
    return <p>Loading...</p>;  // Optionally show a loading message while checking access
  }

  return <>{children}</>;
}
