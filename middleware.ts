import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from './lib/session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith('/.well-known') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') && !pathname.endsWith('/')
  ) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const session = await getIronSession<SessionData>(request, response, sessionOptions);

  const isAuthPage = pathname === '/login';
  const isProtectedPage = pathname.startsWith('/products') || pathname.startsWith('/cart');

  if (isProtectedPage && !session.token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthPage && session.token) {
    return NextResponse.redirect(new URL('/products', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
