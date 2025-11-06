
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value;
  const { pathname } = req.nextUrl;

  const publicPaths = ['/login', '/register', '/api/auth/login'];

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const userRole = payload.role as string;

    if (pathname.startsWith('/profile/admin') && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/profile/user', req.url));
    }

    if (pathname.startsWith('/profile/user') && userRole !== 'USER') {
        return NextResponse.redirect(new URL('/profile/admin', req.url));
      }

    return NextResponse.next();
  } catch (err) {
    console.error('JWT Verification Error:', err);
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.delete('authToken');
    return response;
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
