import { NextRequest } from 'next/server'

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5

export async function rateLimit(request: NextRequest): Promise<RateLimitResult> {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'anonymous'
  const now = Date.now()
  
  const userLimit = rateLimitMap.get(ip)
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    })
    
    return {
      success: true,
      limit: RATE_LIMIT_MAX_REQUESTS,
      remaining: RATE_LIMIT_MAX_REQUESTS - 1,
      reset: now + RATE_LIMIT_WINDOW
    }
  }
  
  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      success: false,
      limit: RATE_LIMIT_MAX_REQUESTS,
      remaining: 0,
      reset: userLimit.resetTime
    }
  }
  
  userLimit.count++
  
  return {
    success: true,
    limit: RATE_LIMIT_MAX_REQUESTS,
    remaining: RATE_LIMIT_MAX_REQUESTS - userLimit.count,
    reset: userLimit.resetTime
  }
}
