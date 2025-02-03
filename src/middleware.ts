// middleware.ts or src/middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: ['/api/check-role', '/dashboard/:path*', '/admin/:path*'], // Specify the routes you want to apply middleware to
};
