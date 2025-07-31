import { HTTPException } from 'hono/http-exception'
import type { Hono } from 'hono'
import type { AppContext } from '../types/generated'

export const setupAuthRoutes = (app: Hono<AppContext>) => {
  app.post('/auth/demo-token', async (c) => {
    try {
      const { sign } = await import('hono/jwt')
      const payload = {
        sub: `demo_${Date.now()}`,
        type: 'demo' as const,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60),
      }
      const token = await sign(payload, c.env.JWT_SECRET)

      return c.json({
        success: true,
        token,
        user: {
          id: payload.sub,
          type: payload.type,
          lastSeen: new Date().toISOString()
        },
        expiresIn: '7 days',
        requestId: c.get('requestId')
      })
    } catch (error) {
      console.error('Demo token generation error:', error)
      throw new HTTPException(500, {
        message: 'Failed to generate demo token',
        cause: error
      })
    }
  })
}
