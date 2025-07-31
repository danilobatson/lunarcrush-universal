import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { buildSchema, graphql } from 'graphql'

// 🔥 NEW: Enhanced Security & DX Middleware
import { logger } from 'hono/logger'
import { requestId } from 'hono/request-id'
import { secureHeaders } from 'hono/secure-headers'
import { prettyJSON } from 'hono/pretty-json'
import { HTTPException } from 'hono/http-exception'

type Bindings = {
  JWT_SECRET: string
  LUNARCRUSH_API_KEY: string
  LUNARCRUSH_CACHE: KVNamespace
  DB: D1Database
  ENVIRONMENT?: string
}

type JWTPayload = {
  sub: string
  type: 'demo' | 'personal'
  apiKey?: string
  iat: number
  exp: number
}

// Include RequestIdVariables for type safety
type Variables = {
  requestId: string
}

const app = new Hono<{
  Bindings: Bindings
  Variables: Variables
}>()

// Cache helpers (keep existing implementation)
const memoryCache = new Map<string, { value: string, expires: number }>()

const cacheGet = async (cache: KVNamespace | undefined, key: string): Promise<string | null> => {
  if (cache) {
    try {
      return await cache.get(key)
    } catch (error) {
      console.warn('KV get failed, using memory cache:', error)
    }
  }

  const item = memoryCache.get(key)
  if (item && item.expires > Date.now()) {
    return item.value
  }
  memoryCache.delete(key)
  return null
}

const cachePut = async (cache: KVNamespace | undefined, key: string, value: string, ttl: number): Promise<void> => {
  if (cache) {
    try {
      await cache.put(key, value, { expirationTtl: ttl })
      return
    } catch (error) {
      console.warn('KV put failed, using memory cache:', error)
    }
  }

  memoryCache.set(key, { value, expires: Date.now() + (ttl * 1000) })
}

// 🔥 NEW: Enhanced Security & DX Middleware Stack
app.use('*', logger()) // Request logging
app.use('*', requestId()) // Request ID for tracing
app.use('*', secureHeaders()) // Security headers
app.use('*', prettyJSON()) // Pretty JSON in development

// CORS (keep existing configuration)
app.use('/*', cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://lunarcrush.cryptoguard-api.workers.dev', '*'],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
}))

// 🔥 GraphQL Schema (keep existing)
const schema = buildSchema(`
  type Query {
    hello: String!
    health: HealthStatus!
    user: User
    getTopic(topic: String!): TopicData!
    getTopicsList: [Topic!]!
  }

  type HealthStatus {
    status: String!
    timestamp: String!
    service: String!
    version: String!
    requestId: String!
  }

  type User {
    id: String!
    type: String!
  }

  type TopicData {
    symbol: String!
    name: String!
    price: Float!
    raw: String!
  }

  type Topic {
    topic: String!
    category: String!
  }

  type Mutation {
    generateDemoToken: TokenResponse!
  }

  type TokenResponse {
    token: String!
    user: User!
    expiresIn: String!
  }
`)

// 🔥 ENHANCED: GraphQL Resolvers with better error handling
const resolvers = {
  hello: () => {
    console.log('✅ hello resolver called')
    return 'Hello from LunarCrush Universal Hono + Enhanced Security! 🚀'
  },

  health: (args: any, context: any) => {
    console.log('✅ health resolver called')
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'lunarcrush-universal-hono',
      version: '1.0.0',
      requestId: context.requestId || 'unknown'
    }
  },

  user: (args: any, context: any) => {
    console.log('✅ user resolver called')
    if (!context.jwtPayload) {
      throw new HTTPException(401, { message: 'Authentication required' })
    }

    return {
      id: context.jwtPayload.sub,
      type: context.jwtPayload.type
    }
  },

  getTopic: async (args: any, context: any) => {
    console.log('✅ getTopic resolver called with:', args)
    const { topic } = args

    try {
      return {
        symbol: topic.toUpperCase(),
        name: topic.charAt(0).toUpperCase() + topic.slice(1),
        price: 50000.0,
        raw: `{"mock": true, "topic": "${topic}", "timestamp": "${new Date().toISOString()}", "requestId": "${context.requestId || 'unknown'}"}`
      }
    } catch (error) {
      console.error('getTopic error:', error)
      throw new HTTPException(500, { message: 'Failed to fetch topic data' })
    }
  },

  getTopicsList: async (args: any, context: any) => {
    console.log('✅ getTopicsList resolver called')
    return [
      { topic: 'bitcoin', category: 'crypto' },
      { topic: 'ethereum', category: 'crypto' },
      { topic: 'solana', category: 'crypto' },
      { topic: 'cardano', category: 'crypto' },
      { topic: 'polygon', category: 'crypto' }
    ]
  },

  generateDemoToken: async (args: any, context: any) => {
    console.log('✅ generateDemoToken resolver called')

    try {
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
        user: {
          id: payload.sub,
          type: payload.type,
        },
        expiresIn: '7 days'
      }
    } catch (error) {
      console.error('generateDemoToken error:', error)
      throw new HTTPException(500, { message: 'Failed to generate demo token' })
    }
  }
}

// 🔥 ENHANCED: Health Endpoints with request ID
app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'lunarcrush-universal-hono',
    version: '1.0.0',
    environment: c.env.ENVIRONMENT,
    requestId: c.get('requestId'),
    security: {
      secureHeaders: 'enabled',
      cors: 'enabled',
      rateLimit: 'enabled'
    },
    bindings: {
      jwt_secret: !!c.env.JWT_SECRET,
      api_key: !!c.env.LUNARCRUSH_API_KEY,
      cache: !!c.env.LUNARCRUSH_CACHE,
      cache_fallback: !c.env.LUNARCRUSH_CACHE ? 'memory' : 'kv',
      database: !!c.env.DB
    }
  })
})

app.get('/ping', (c) => c.text('pong'))

// 🎫 REST Auth Endpoints (keep existing)
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
      token,
      user: { id: payload.sub, type: payload.type },
      expiresIn: '7 days',
      requestId: c.get('requestId')
    })
  } catch (error) {
    console.error('Token generation error:', error)
    throw new HTTPException(500, { message: 'Token generation failed' })
  }
})

// 🚦 Rate Limiting Middleware (keep existing implementation)
const simpleRateLimit = async (c: any, next: any) => {
  try {
    const authHeader = c.req.header('Authorization')
    let userId = 'anonymous'

    if (authHeader?.startsWith('Bearer ')) {
      try {
        const token = authHeader.slice(7)
        const { verify } = await import('hono/jwt')
        const payload = await verify(token, c.env.JWT_SECRET)
        userId = payload.sub || 'anonymous'
        c.set('jwtPayload', payload)
      } catch {
        userId = 'anonymous'
      }
    }

    const minute = Math.floor(Date.now() / 60000)
    const key = `rate_${userId}_${minute}`

    const current = await cacheGet(c.env.LUNARCRUSH_CACHE, key)
    const count = current ? parseInt(current) : 0

    if (count >= 5) {
      throw new HTTPException(429, {
        message: 'Rate limit exceeded',
        res: c.json({
          error: 'Rate limit exceeded',
          message: 'Demo users limited to 5 requests per minute',
          count,
          limit: 5,
          resetInSeconds: Math.round(60 - (Date.now() % 60000) / 1000),
          requestId: c.get('requestId')
        }, 429)
      })
    }

    await cachePut(c.env.LUNARCRUSH_CACHE, key, (count + 1).toString(), 60)

    await next()
  } catch (error) {
    if (error instanceof HTTPException) {
      throw error
    }
    console.error('Rate limiting error:', error)
    await next()
  }
}

// 🎯 FIXED: GraphQL Endpoint with proper context
app.post('/graphql', async (c) => {
  try {
    const body = await c.req.json()
    const { query, variables = {}, operationName } = body

    console.log('🔍 GraphQL request:', { query, variables, operationName, requestId: c.get('requestId') })

    // 🔥 FIXED: Build proper context
    const authHeader = c.req.header('Authorization')
    let jwtPayload = null

    if (authHeader?.startsWith('Bearer ')) {
      try {
        const token = authHeader.slice(7)
        const { verify } = await import('hono/jwt')
        jwtPayload = await verify(token, c.env.JWT_SECRET)
      } catch {
        // Continue without auth
      }
    }

    const context = {
      env: c.env,
      jwtPayload,
      request: c.req,
      requestId: c.get('requestId')
    }

    console.log('🔍 GraphQL context:', {
      hasEnv: !!context.env,
      hasJWT: !!context.jwtPayload,
      requestId: context.requestId
    })

    // Execute GraphQL
    const result = await graphql({
      schema,
      source: query,
      rootValue: resolvers,
      contextValue: context,
      variableValues: variables,
      operationName
    })

    console.log('🔍 GraphQL result:', result)

    return c.json(result)
  } catch (error) {
    console.error('❌ GraphQL error:', error)
    if (error instanceof HTTPException) {
      return error.getResponse()
    }
    throw new HTTPException(500, { message: 'GraphQL execution failed' })
  }
})

// 🎨 GraphiQL Interface (enhanced with request info)
app.get('/graphql', (c) => {
  const requestId = c.get('requestId')
  const graphiqlHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>GraphiQL - LunarCrush Universal API (Enhanced)</title>
  <link href="https://unpkg.com/graphiql@3.0.6/graphiql.min.css" rel="stylesheet" />
  <style>
    body { margin: 0; font-family: system-ui; }
    #graphiql { height: 100vh; }
    .title { background: #1a1a1a; color: #fff; padding: 10px; font-size: 18px; }
    .request-info { background: #2a2a2a; color: #ccc; padding: 5px 10px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="title">🚀 LunarCrush Universal API - GraphiQL (Enhanced)</div>
  <div class="request-info">Request ID: ${requestId} | Security: Enabled | Pretty JSON: Enabled</div>
  <div id="graphiql"></div>

  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/graphiql@3.0.6/graphiql.min.js"></script>

  <script>
    const fetcher = (graphQLParams) => {
      return fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add Authorization header if you have a token
          // 'Authorization': 'Bearer YOUR_TOKEN_HERE'
        },
        body: JSON.stringify(graphQLParams),
      }).then(response => response.json());
    };

    const root = ReactDOM.createRoot(document.getElementById('graphiql'));
    root.render(
      React.createElement(GraphiQL, {
        fetcher: fetcher,
        defaultQuery: \`# Welcome to LunarCrush Universal API! (Enhanced Security)
# Request ID: ${requestId}

{
  hello
  health {
    status
    timestamp
    service
    version
    requestId
  }
}

# Get crypto topics:
# {
#   getTopicsList {
#     topic
#     category
#   }
# }

# Get specific topic:
# {
#   getTopic(topic: "bitcoin") {
#     symbol
#     name
#     price
#     raw
#   }
# }\`
      })
    );
  </script>
</body>
</html>`

  return c.html(graphiqlHtml)
})

// 🚀 API Routes (enhanced with error handling)
app.use('/api/*', simpleRateLimit)

app.get('/api/test', (c) => {
  const payload = c.get('jwtPayload')
  return c.json({
    message: 'API working with enhanced security!',
    user: payload || 'anonymous',
    timestamp: new Date().toISOString(),
    requestId: c.get('requestId'),
    security: {
      headers: 'secure',
      logging: 'enabled',
      rateLimit: 'active'
    }
  })
})

app.get('/api/test-cache', async (c) => {
  const testKey = `test_${Date.now()}`
  const testValue = 'cache_test_value'

  try {
    await cachePut(c.env.LUNARCRUSH_CACHE, testKey, testValue, 60)
    const retrieved = await cacheGet(c.env.LUNARCRUSH_CACHE, testKey)

    return c.json({
      message: 'Cache test with enhanced logging',
      success: retrieved === testValue,
      stored: testValue,
      retrieved,
      cacheType: c.env.LUNARCRUSH_CACHE ? 'KV' : 'Memory',
      requestId: c.get('requestId')
    })
  } catch (error) {
    console.error('Cache test error:', error)
    throw new HTTPException(500, { message: 'Cache test failed' })
  }
})

app.get('/api/topic/:topic', async (c) => {
  const topic = c.req.param('topic')

  try {
    const response = await fetch(`https://lunarcrush.com/api4/public/topic/${topic}/v1`, {
      headers: {
        'Authorization': `Bearer ${c.env.LUNARCRUSH_API_KEY}`
      }
    })

    if (!response.ok) {
      throw new HTTPException(response.status, {
        message: `LunarCrush API error: ${response.statusText}`
      })
    }

    const data = await response.json()
    return c.json({
      ...data,
      requestId: c.get('requestId')
    })
  } catch (error) {
    console.error('Topic fetch error:', error)
    if (error instanceof HTTPException) {
      throw error
    }
    throw new HTTPException(500, { message: 'Failed to fetch topic data' })
  }
})

// 🔥 ENHANCED: Error Handler
app.onError((err, c) => {
  console.error('🚨 Application Error:', {
    error: err.message,
    requestId: c.get('requestId'),
    path: c.req.path,
    method: c.req.method,
    timestamp: new Date().toISOString()
  })

  if (err instanceof HTTPException) {
    return err.getResponse()
  }

  return c.json({
    error: 'Internal Server Error',
    message: 'Something went wrong on our end',
    requestId: c.get('requestId'),
    timestamp: new Date().toISOString()
  }, 500)
})

export default app
