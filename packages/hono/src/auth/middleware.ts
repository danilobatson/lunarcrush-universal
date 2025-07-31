import { bearerAuth } from 'hono/bearer-auth'
import { some, every } from 'hono/combine'
import type { User } from '../types/generated'

export const enhancedAuth = some(
  // Admin routes - require specific token
  every(
    bearerAuth({
      token: async (token, c) => {
        try {
          const { verify } = await import('hono/jwt')
          const payload = await verify(token, c.env.JWT_SECRET) as User
          if (payload.type === 'admin') {
            c.set('user', payload)
            return true
          }
          return false
        } catch {
          return false
        }
      }
    })
  ),
  // Regular auth - any valid token
  bearerAuth({
    token: async (token, c) => {
      try {
        const { verify } = await import('hono/jwt')
        const payload = await verify(token, c.env.JWT_SECRET) as User
        c.set('user', payload)
        return true
      } catch {
        return false
      }
    }
  })
)
