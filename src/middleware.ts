import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyTokenWithBackend } from './lib/auth';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Define public paths that do not require authentication
  const publicPaths = ['/login', '/register',''];
  const isPublicPath = publicPaths.includes(pathname);
  const isApiAuthRoute = pathname.startsWith('/api/auth');

  // If it's a public path or an API auth route, let it pass
  if (isPublicPath || isApiAuthRoute) {
    return NextResponse.next();
  }

  // For all other paths, we require a token
  const token = req.cookies.get('authToken')?.value;

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Verify the token with the backend
    const responseData = await verifyTokenWithBackend(token);

    // --- DEBUGGING: Log the received user object ---
    // console.log('User object received in middleware:', JSON.stringify(responseData, null, 2));

    // Extract the nested user object
    const user = responseData?.user;

    // Defensive check: ensure user and user.role exist
    if (!user || typeof user.role !== 'string') {
      // console.error('Middleware error: User object is invalid or missing a role.');
      throw new Error('Invalid user data from backend');
    }

    // --- Role-based access control (case-insensitive) ---
    const userRole = user.role.toUpperCase();

    if (pathname.startsWith('/profile/admin') && userRole !== 'ADMIN') {
      // If a non-admin tries to access an admin route, redirect them
      return NextResponse.redirect(new URL('/profile/user', req.url));
    }

    if (pathname.startsWith('/profile/user') && userRole !== 'USER') {
      // If a non-user tries to access a user route, redirect them
      return NextResponse.redirect(new URL('/profile/admin', req.url));
    }

    // If token is valid and role is correct, allow the request to proceed
    return NextResponse.next();

  } catch (err) {
    // This block catches errors from verifyTokenWithBackend or the "Invalid token" error
    console.error('Middleware Auth Error:', err);
    
    // Redirect to login page and clear the invalid token from the cookie
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.delete('authToken');
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public images (svg, png, jpg, jpeg, gif, webp)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};