import { HTTPException } from 'hono/http-exception'

// Pure GraphQL resolvers (same format as your working backup)
export const resolvers = {
  hello: () => {
    console.log('🟢 Hello resolver called!')
    return 'Hello from Enhanced LunarCrush Universal Hono! 🚀'
  },

  health: (args: any, context: any) => {
    console.log('🟢 Health resolver called!')
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'lunarcrush-universal-hono-enhanced',
      version: '2.0.0',
      requestId: context.requestId || 'unknown',
      uptime: process.uptime ? process.uptime() : 0,
      features: [
        'GraphQL', 'REST', 'Streaming', 'SSE', 'Cookies', 'JWT',
        'Rate Limiting', 'Caching', 'Validation', 'JSX', 'Testing'
      ]
    }
  },

  user: (args: any, context: any) => {
    console.log('🟢 User resolver called!')
    if (!context.user) {
      throw new HTTPException(401, { message: 'Authentication required' })
    }
    return {
      id: context.user.sub,
      type: context.user.type,
      lastSeen: new Date().toISOString()
    }
  },

getTopic: async (args: any, context: any) => {
    console.log('🌙 getTopic resolver called with:', args.topic)
    const { topic } = args

    try {
      // Get API key from Cloudflare Workers secret binding
      const apiKey = await context.env.LUNARCRUSH_API_KEY.get()
      if (!apiKey) {
        throw new Error('LUNARCRUSH_API_KEY not configured')
      }

      // Import LunarCrush service
      const { getTopic: getLunarCrushTopic } = await import('../services/lunarcrush')

      // Get real data from LunarCrush API - return raw data just like backend-yoga
      const rawData = await getLunarCrushTopic({ apiKey }, topic)

      console.log('✅ Real LunarCrush data retrieved for:', topic)

      // Return raw data - let GraphQL schema handle field resolution
      return rawData

    } catch (error) {
      console.error('❌ getTopic error:', error)
      throw error // Let GraphQL handle error responses
    }
  },

  getTopicsList: () => {
    console.log('🟢 getTopicsList resolver called!')
    return [
      { topic: 'bitcoin', category: 'crypto', description: 'Digital gold', createdAt: new Date().toISOString() },
      { topic: 'ethereum', category: 'crypto', description: 'Smart contracts platform', createdAt: new Date().toISOString() },
      { topic: 'solana', category: 'crypto', description: 'High-performance blockchain', createdAt: new Date().toISOString() }
    ]
  },

  getUserPreferences: (args: any, context: any) => {
    console.log('🟢 getUserPreferences resolver called!')
    if (!context.user) {
      throw new HTTPException(401, { message: 'Authentication required' })
    }
    // Return mock preferences (in real app, fetch from DB)
    return {
      theme: 'dark',
      currency: 'USD',
      notifications: true,
      favoriteTopics: ['bitcoin', 'ethereum']
    }
  },

  generateDemoToken: async (args: any, context: any) => {
    console.log('🟢 generateDemoToken resolver called!')
    const { sign } = await import('hono/jwt')
    const payload = {
      sub: `demo_${Date.now()}`,
      type: 'demo' as const,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60),
    }
    const token = await sign(payload, context.env.JWT_SECRET)
    return {
      token,
      user: { id: payload.sub, type: payload.type, lastSeen: new Date().toISOString() },
      expiresIn: '7 days'
    }
  },

  updateUserPreferences: async (args: any, context: any) => {
    console.log('🟢 updateUserPreferences resolver called!')
    if (!context.user) {
      throw new HTTPException(401, { message: 'Authentication required' })
    }
    // In real app, save to database
    return args.input
  },

  createTopic: async (args: any, context: any) => {
    console.log('🟢 createTopic resolver called!')
    if (!context.user) {
      throw new HTTPException(401, { message: 'Authentication required' })
    }
    return {
      ...args.input,
      createdAt: new Date().toISOString()
    }
  }
}

console.log('✅ Pure GraphQL resolvers loaded')
