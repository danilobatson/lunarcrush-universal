import { timing } from 'hono/timing'
import { contextStorage } from 'hono/context-storage'
import { cache } from 'hono/cache'
import { bodyLimit } from 'hono/body-limit'
import { timeout } from 'hono/timeout'
import { etag } from 'hono/etag'
import { logger } from 'hono/logger'
import { requestId } from 'hono/request-id'
import { secureHeaders } from 'hono/secure-headers'
import { prettyJSON } from 'hono/pretty-json'
import { cors } from 'hono/cors'
import { HTTPException } from 'hono/http-exception'
import type { Hono } from 'hono'
import type { AppContext } from '../types/generated'

export const setupCoreMiddleware = (app: Hono<AppContext>) => {
  // Performance monitoring
  app.use(timing())
  app.use(contextStorage())

  // Request context enhancement
  app.use('*', async (c, next) => {
    c.set('startTime', Date.now())
    c.set('userAgent', c.req.header('User-Agent') || 'unknown')
    c.set('clientIP', c.req.header('CF-Connecting-IP') || c.req.header('X-Forwarded-For') || 'unknown')
    await next()
  })

  // Cache middleware
  app.use('/api/cached/*', cache({
    cacheName: 'lunarcrush-api-cache',
    cacheControl: 'max-age=300',
    vary: ['Accept-Encoding', 'Authorization'],
    keyGenerator: (c) => `${c.req.method}-${c.req.url}-${c.req.header('Authorization')?.slice(0, 20) || 'anon'}`
  }))

  // Body limit
  app.use(bodyLimit({
    maxSize: 50 * 1024 * 1024,
    onError: (c) => {
      const size = c.req.header('content-length')
      console.warn(`[${c.get('requestId')}] Request body too large: ${size} bytes`)
      throw new HTTPException(413, {
        message: 'Payload Too Large - Request body exceeds 50MB limit',
        cause: { size, limit: '50MB' }
      })
    }
  }))

  // Timeout
  app.use(timeout(30000, (c) => {
    const elapsed = Date.now() - (c.get('startTime') || Date.now())
    console.warn(`[${c.get('requestId')}] Request timeout after ${elapsed}ms: ${c.req.method} ${c.req.path}`)
    throw new HTTPException(408, {
      message: 'Request Timeout - Request took longer than 30 seconds',
      cause: { elapsed, path: c.req.path, method: c.req.method }
    })
  }))

  // Standard middleware
  app.use(etag())
  app.use(logger())
  app.use(requestId())
  app.use(secureHeaders())
  app.use(prettyJSON())

  // CORS
  app.use('/*', cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'https://lunarcrush.cryptoguard-api.workers.dev', '*'],
    allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-User-Preferences'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  }))
}
