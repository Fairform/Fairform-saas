import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Simple middleware for route protection
  // For production, you'd want to implement proper auth checking
  
  const isProtectedRoute = req.nextUrl.pathname.startsWith('/dashboard')
  const isAuthRoute = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/signup')

  // For now, we'll just pass through all requests
  // You can implement proper authentication checks here
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup']
}