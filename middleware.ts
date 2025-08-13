import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const response = NextResponse.next()
  
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  response.headers.set('x-nonce', nonce)
  
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ')
  
  response.headers.set('Content-Security-Policy', csp)
  
  const isProtectedRoute = req.nextUrl.pathname.startsWith('/dashboard') || 
                          req.nextUrl.pathname.startsWith('/generate') ||
                          req.nextUrl.pathname.startsWith('/checkout')
  const isAuthRoute = req.nextUrl.pathname.startsWith('/login') || 
                     req.nextUrl.pathname.startsWith('/signup') || 
                     req.nextUrl.pathname.startsWith('/forgot-password') || 
                     req.nextUrl.pathname.startsWith('/reset-password')

  if (isProtectedRoute && !isAuthRoute) {
    const token = req.cookies.get('sb-access-token')
    const refreshToken = req.cookies.get('sb-refresh-token')
    
    if (!token && !refreshToken) {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('next', req.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup', '/forgot-password', '/reset-password', '/generate', '/checkout/:path*']
}
