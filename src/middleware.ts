import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware(async (auth, req) => {
  const url = new URL(req.url);

  // Allow unauthenticated access to the sign-in page and Clerk API routes
  if (url.pathname.startsWith('/sign-in') || url.pathname.startsWith('/api') || url.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  const session = await auth();
  const role = session?.sessionClaims?.metadata?.role;

  // If user is not authenticated, redirect to sign-in
  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // If user is authenticated but not an admin, prevent access
  if (role !== 'admin' && role !== 'superadmin') {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return NextResponse.next();
});
