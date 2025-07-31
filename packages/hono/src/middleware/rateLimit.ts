import { HTTPException } from 'hono/http-exception'
import { cacheGet, cachePut } from '../utils/cache'
import type { User } from '../types/generated'

export const enhancedRateLimit = async (c: any, next: any) => {
  try {
    const authHeader = c.req.header('Authorization')
    let userId = 'anonymous'
    let rateLimit = 5 // Default for anonymous

    if (authHeader?.startsWith('Bearer ')) {
      try {
        const token = authHeader.slice(7)
        const { verify } = await import('hono/jwt')
        const payload = await verify(token, c.env.JWT_SECRET) as User
        userId = payload.sub
        c.set('user', payload)

        // Different limits by user type
        rateLimit = payload.type === 'admin' ? 100 : payload.type === 'personal' ? 20 : 10
      } catch {
        userId = 'anonymous'
      }
    }

    const minute = Math.floor(Date.now() / 60000)
    const key = `rate_${userId}_${minute}`

    const current = await cacheGet(c.env.LUNARCRUSH_CACHE, key)
    const count = current ? parseInt(current) : 0

    if (count >= rateLimit) {
      throw new HTTPException(429, {
        message: 'Rate limit exceeded',
        cause: {
          count,
          limit: rateLimit,
          userType: c.get('user')?.type || 'anonymous',
          resetInSeconds: Math.round(60 - (Date.now() % 60000) / 1000)
        }
      })
    }

    await cachePut(c.env.LUNARCRUSH_CACHE, key, (count + 1).toString(), 60)

    // Add rate limit headers
    c.header('X-RateLimit-Limit', rateLimit.toString())
    c.header('X-RateLimit-Remaining', (rateLimit - count - 1).toString())
    c.header('X-RateLimit-Reset', (Math.floor(Date.now() / 1000) + 60).toString())

    await next()
  } catch (error) {
    if (error instanceof HTTPException) {
      throw error
    }
    console.error('Rate limiting error:', error)
    await next()
  }
}
