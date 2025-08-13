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
  
  const isProtectedRoute = req.nextUrl.pathname.startsWith('/dashboard')
  const isAuthRoute = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/signup')

  // For now, we'll just pass through all requests
  // You can implement proper authentication checks here
  
  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup']
}
