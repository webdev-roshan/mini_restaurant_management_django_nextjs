import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/', '/login', '/register'];

export function middleware(req: NextRequest) {
    const token = req.cookies.get('access_token')?.value;
    let pathname = req.nextUrl.pathname;

    pathname = pathname.replace(/\/$/, '') || '/';

    const isPublic = PUBLIC_ROUTES.includes(pathname);

    // if ((pathname === '/login' || pathname === '/register') && token) {
    //     return NextResponse.redirect(new URL('/', req.url));
    // }

    if (!isPublic && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|favicon.ico).*)',
    ],
};
