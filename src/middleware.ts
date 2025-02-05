import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware(async (auth, req) => {
  const url = new URL(req.url);

  // Allow public routes to be accessible without redirection
  const publicPaths = ['/sign-in', '/unauthorized', '/api', '/_next'];
  if (publicPaths.some((path) => url.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  const session = await auth();

  // If user is NOT authenticated, redirect to sign-in
  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // Extract user role
  const role = session?.sessionClaims?.metadata?.role;

  // If authenticated but NOT an admin or superadmin, redirect to unauthorized
  if (!role) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // ✅ If user has a role but is NOT an admin or superadmin, redirect to unauthorized
  if (role !== "admin" && role !== "superadmin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  } 
  // User is authenticated and authorized, allow access
  return NextResponse.next();
});
