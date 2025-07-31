import { HTTPException } from 'hono/http-exception'
import type { Hono } from 'hono'
import type { AppContext } from '../types/generated'

export const setupErrorHandlers = (app: Hono<AppContext>) => {
  app.onError((err, c) => {
    const requestId = c.get('requestId') || 'unknown'
    const startTime = c.get('startTime') || Date.now()
    const responseTime = Date.now() - startTime

    console.error(`[${requestId}] Error after ${responseTime}ms:`, {
      message: err.message,
      stack: err.stack?.substring(0, 500),
      url: c.req.url,
      method: c.req.method,
      userAgent: c.get('userAgent'),
      clientIP: c.get('clientIP'),
      timestamp: new Date().toISOString()
    })

    if (err instanceof HTTPException) {
      const response = err.getResponse()
      if (response.headers.get('content-type')?.includes('application/json')) {
        return response
      }
      return c.json({
        error: 'HTTP Exception',
        message: err.message,
        status: err.status,
        requestId,
        timestamp: new Date().toISOString(),
        responseTime,
        cause: err.cause
      }, err.status)
    }

    if (err.message?.includes('Rate limit')) {
      return c.json({
        error: 'Rate Limit Exceeded',
        message: 'Too many requests. Please try again later.',
        requestId,
        type: 'RATE_LIMIT_ERROR',
        timestamp: new Date().toISOString(),
        responseTime
      }, 429)
    }

    if (err.message?.includes('auth') || err.message?.includes('token')) {
      return c.json({
        error: 'Authentication Error',
        message: 'Invalid or missing authentication credentials.',
        requestId,
        type: 'AUTH_ERROR',
        timestamp: new Date().toISOString(),
        responseTime
      }, 401)
    }

    if (err.message?.includes('validation') || err.message?.includes('invalid')) {
      return c.json({
        error: 'Validation Error',
        message: 'Request data validation failed.',
        requestId,
        type: 'VALIDATION_ERROR',
        timestamp: new Date().toISOString(),
        responseTime
      }, 400)
    }

    return c.json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred. Please try again.',
      requestId,
      type: 'INTERNAL_ERROR',
      timestamp: new Date().toISOString(),
      responseTime,
      ...(c.env.ENVIRONMENT === 'development' && {
        debug: {
          message: err.message,
          stack: err.stack?.substring(0, 200)
        }
      })
    }, 500)
  })

  app.notFound((c) => {
    const startTime = c.get('startTime') || Date.now()

    return c.json({
      error: 'Not Found',
      message: 'The requested endpoint does not exist',
      path: c.req.path,
      method: c.req.method,
      suggestions: [
        'Check the API documentation at /graphql',
        'Try the demo UI at /ui/demo',
        'View available endpoints in GraphiQL'
      ],
      requestId: c.get('requestId'),
      timestamp: new Date().toISOString(),
      responseTime: Date.now() - startTime
    }, 404)
  })
}
