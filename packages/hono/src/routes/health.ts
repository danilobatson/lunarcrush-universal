import type { Hono } from 'hono'
import type { AppContext } from '../types/generated'

export const setupHealthRoutes = (app: Hono<AppContext>) => {
  app.get('/health', (c) => {
    const startTime = c.get('startTime') || Date.now()
    return c.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'lunarcrush-universal-hono-enhanced',
      version: '2.0.0',
      environment: c.env.ENVIRONMENT || 'development',
      requestId: c.get('requestId'),
      client: {
        ip: c.get('clientIP'),
        userAgent: c.get('userAgent')
      },
      performance: {
        responseTime: Date.now() - startTime
      },
      features: {
        security: ['secureHeaders', 'cors', 'rateLimit', 'jwt'],
        middleware: ['compression', 'caching', 'timeout', 'etag'],
        apis: ['graphql', 'rest', 'streaming', 'sse'],
        validation: ['zod', 'multiTarget'],
        cookies: ['signed', 'secure'],
        rendering: ['jsx', 'html']
      },
      bindings: {
        jwt_secret: !!c.env.JWT_SECRET,
        api_key: !!c.env.LUNARCRUSH_API_KEY,
        cache: !!c.env.LUNARCRUSH_CACHE,
        database: !!c.env.DB
      }
    })
  })
}
