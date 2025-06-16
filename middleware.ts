import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'my_very_secure_key');

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const pathname = request.nextUrl.pathname;

  const protectedPaths = ['/dashboard', '/profile', '/admin'];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (!isProtected) return NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const role = payload.role;

    console.log('JWT Payload:', payload); // ✅ Debug

    // 👇 Chặn nếu không phải admin khi vào /admin hoặc /dashboard
    if (
      (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) &&
      role !== 'admin'
    ) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error('JWT verify error:', err);
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/admin/:path*'],
};
