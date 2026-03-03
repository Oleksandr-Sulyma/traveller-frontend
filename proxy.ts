import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { checkServerSession } from './lib/api/serverApi';

interface SessionResponse {
  headers: {
    'set-cookie'?: string | string[];
    [key: string]: any;
  };
}

const privateRoutes = ['/profile', '/stories/create', '/edit'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute =
    privateRoutes.some(route => pathname.startsWith(route)) ||
    (pathname.startsWith('/stories/') && pathname.endsWith('/edit'));

  if (!accessToken) {
    if (refreshToken) {
      const res = await checkServerSession();
      const headers = res.headers as Record<string, string | string[] | undefined>;
      const setCookie = headers['set-cookie'];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed['Max-Age']),
          };
          if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
          if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
        }
        if (isPublicRoute) {
          return NextResponse.redirect(new URL('/', request.url), {
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
        if (isPrivateRoute) {
          return NextResponse.next({
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
      }
    }
    if (isPublicRoute) {
      return NextResponse.next();
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isPrivateRoute) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/stories/create',
    '/stories/:id/edit',
    '/edit',
    '/sign-in',
    '/sign-up',
  ],
};
