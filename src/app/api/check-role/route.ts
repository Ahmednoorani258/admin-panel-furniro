// app/api/check-role/route.ts
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function GET() {
  // Retrieve session data using auth()
  const { userId } = await auth();

  if (!userId) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  try {
    // Await the clerkClient to get the actual client instance
    const clerk = await clerkClient();
    // Now you can access clerk.users
    const user = await clerk.users.getUser(userId);
    const role = user.publicMetadata?.role;

    if (role !== 'admin' && role !== 'superadmin') {
      return new Response(JSON.stringify({ message: 'Forbidden: Admins only' }), { status: 403 });
    }

    return new Response(JSON.stringify({ message: 'Access granted' }), { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}


// // pages/api/check-role.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { auth, clerkClient } from '@clerk/nextjs/server';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   // Retrieve session data using auth()
//   const { userId } = await auth();

//   if (!userId) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     // Call and await clerkClient to get the actual client instance
//     const clerk = await clerkClient();
//     // Now use clerk.users to get the user data
//     const user = await clerk.users.getUser(userId);
//     const role = user.publicMetadata?.role
//     // Check for admin role; adjust property path if your role is stored elsewhere
//     if (role !== 'admin'&& role !== 'superadmin') {
//       return res.status(403).json({ message: 'Forbidden: Admins only' });
//     }

//     return res.status(200).json({ message: 'Access granted' });
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// }
