import { enhancedAuth } from '../auth/middleware'
import type { Hono } from 'hono'
import type { AppContext } from '../types/generated'

export const setupAdminRoutes = (app: Hono<AppContext>) => {
  app.use('/api/admin/*', enhancedAuth)

  app.get('/api/admin/stats', (c) => {
    const user = c.get('user')
    return c.json({
      message: 'Admin stats',
      admin: user,
      stats: {
        totalRequests: Math.floor(Math.random() * 10000),
        activeUsers: Math.floor(Math.random() * 100),
        cacheHits: Math.floor(Math.random() * 5000)
      },
      requestId: c.get('requestId')
    })
  })
}
