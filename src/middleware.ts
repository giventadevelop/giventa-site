import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getClerkSatelliteMiddlewareOptions } from '@/lib/clerkSatellite';

/** Giventa marketing site + admin backend proxy routes (no MOSC public paths). */
const isPublicRouteClerk = createRouteMatcher([
  '/',
  '/home(.*)',
  '/about-us(.*)',
  '/services(.*)',
  '/contact-us(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/sso-callback(.*)',
  '/api/webhooks(.*)',
  '/api/auth/admin-status',
  '/api/public(.*)',
  '/api/proxy(.*)',
  '/api/diagnostic(.*)',
  '/api/logs(.*)',
  '/api/health(.*)',
]);

export default clerkMiddleware(
  async (auth, req: NextRequest) => {
    const pathname = req.nextUrl.pathname;

    if (!isPublicRouteClerk(req)) {
      await auth.protect();
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-pathname', pathname);

    if (req.nextUrl.searchParams.has('__clerk_synced')) {
      requestHeaders.set('x-clerk-syncing', 'true');
    }

    const response = NextResponse.next({ request: { headers: requestHeaders } });
    response.headers.set('x-pathname', pathname);
    return response;
  },
  getClerkSatelliteMiddlewareOptions()
);

export const config = {
  matcher: [
    '/((?!_next|__clerk|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|mp4|webm|mov|m4v|ogg|mp3|wav|aac|opus|pdf|map)).*)',
    '/(api|trpc)(.*)',
  ],
};
