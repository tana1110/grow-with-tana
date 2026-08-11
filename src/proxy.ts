import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const SESSION_COOKIE = 'session'

async function hasValidSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(SESSION_COOKIE)?.value
  if (!token || !process.env.AUTH_SECRET) return false
  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.AUTH_SECRET))
    return true
  } catch {
    return false
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const authed = await hasValidSession(request)

  // صفحات التعلّم ولوحة "دوراتي" تتطلب تسجيل الدخول.
  if ((pathname.startsWith('/learn') || pathname.startsWith('/my-courses')) && !authed) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // المسجّلون يتجاوزون صفحات الدخول والتسجيل.
  if ((pathname === '/login' || pathname === '/signup') && authed) {
    return NextResponse.redirect(new URL('/my-courses', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/learn/:path*', '/my-courses', '/login', '/signup'],
}
