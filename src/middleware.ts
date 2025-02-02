// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export function middleware(req: NextRequest) {
  // Get the authentication details from Clerk
  const { userId, sessionClaims } = getAuth(req);

  // Check if the user is authenticated and has the "admin" role.
  if (!userId || sessionClaims?.role !== "superadmin") {
    // Redirect to the homepage if not authorized.
    return NextResponse.redirect("https://market-ready-ecommerce-app.vercel.app/");
  }

  // Allow the request to continue if authorized.
  return NextResponse.next();
}

// Specify the routes this middleware should run on.
export const config = {
  matcher: ["/dashboard/:path*"],
};
