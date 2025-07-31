import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { graphql } from 'graphql'
import { logger } from 'hono/logger'
import { requestId } from 'hono/request-id'
import { secureHeaders } from 'hono/secure-headers'
import { prettyJSON } from 'hono/pretty-json'
import { HTTPException } from 'hono/http-exception'

import { schema } from './graphql/pure-schema'
import { resolvers } from './graphql/pure-resolvers'

type Bindings = {
  JWT_SECRET: string
  LUNARCRUSH_API_KEY: string
  LUNARCRUSH_CACHE: KVNamespace
  DB: D1Database
  ENVIRONMENT?: string
}

type Variables = {
  requestId: string
  user?: any
  userAgent?: string
  clientIP?: string
  startTime?: number
}

console.log('🚀 Creating Hono app with working GraphQL setup...')

const app = new Hono<{
  Bindings: Bindings
  Variables: Variables
}>()

// Essential middleware
app.use(logger())
app.use(requestId())
app.use(secureHeaders())
app.use(prettyJSON())

// CORS configuration
app.use('/*', cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', '*'],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
}))

// Request context
app.use('*', async (c, next) => {
  c.set('startTime', Date.now())
  c.set('userAgent', c.req.header('User-Agent') || 'unknown')
  c.set('clientIP', c.req.header('CF-Connecting-IP') || 'unknown')
  await next()
})

// Health endpoint
app.get('/health', (c) => {
  console.log('🟢 Health endpoint called!')
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'lunarcrush-universal-hono-working',
    version: '2.0.0',
    requestId: c.get('requestId')
  })
})

// GraphQL endpoint (same approach as your working backup)
app.post('/graphql', async (c) => {
  try {
    const body = await c.req.json()
    const { query, variables = {}, operationName } = body

    console.log('🔍 GraphQL request received:', {
      query: query?.substring(0, 100) + '...',
      variables,
      requestId: c.get('requestId')
    })

    // Enhanced context (same as your backup)
    const context = {
      env: c.env,
      user: c.get('user'),
      request: c.req,
      requestId: c.get('requestId'),
      clientIP: c.get('clientIP'),
      userAgent: c.get('userAgent'),
      startTime: c.get('startTime')
    }

    console.log('🏗️ Executing GraphQL query with pure graphql() function...')

    // This is the working approach from your backup!
    const result = await graphql({
      schema,
      source: query,
      rootValue: resolvers,  // ← This is the key difference!
      contextValue: context,
      variableValues: variables,
      operationName
    })

    console.log('✅ GraphQL query executed successfully')

    // Add performance timing
    const responseTime = Date.now() - (c.get('startTime') || Date.now())
    if (result.extensions) {
      result.extensions.timing = { responseTime }
    } else {
      result.extensions = { timing: { responseTime } }
    }

    return c.json(result)
  } catch (error) {
    console.error('❌ GraphQL error:', error)
    if (error instanceof HTTPException) {
      return error.getResponse()
    }
    throw new HTTPException(500, {
      message: 'GraphQL execution failed',
      cause: error
    })
  }
})

// Simple GraphiQL interface
app.get('/graphql', (c) => {
  return c.html(`
<!DOCTYPE html>
<html>
<head>
  <title>GraphiQL - Working LunarCrush API</title>
  <link href="https://unpkg.com/graphiql@3.0.6/graphiql.min.css" rel="stylesheet" />
</head>
<body>
  <div id="graphiql" style="height: 100vh;"></div>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/graphiql@3.0.6/graphiql.min.js"></script>
  <script>
    const fetcher = (graphQLParams) => {
      return fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(graphQLParams),
      }).then(response => response.json());
    };

    const root = ReactDOM.createRoot(document.getElementById('graphiql'));
    root.render(
      React.createElement(GraphiQL, {
        fetcher: fetcher,
        defaultQuery: \`# 🚀 Working LunarCrush Universal API

{
  hello
  health {
    status
    timestamp
    service
    version
    requestId
    features
  }
  getTopicsList {
    topic
    category
    description
  }
  getTopic(topic: "bitcoin") {
    symbol
    name
    price
    sentiment
    socialScore
  }
}\`
      })
    );
  </script>
</body>
</html>`)
})

// Error handler
app.onError((err, c) => {
  console.error('❌ Server error:', err)
  const requestId = c.get('requestId') || 'unknown'

  if (err instanceof HTTPException) {
    return err.getResponse()
  }

  return c.json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
    requestId,
    timestamp: new Date().toISOString()
  }, 500)
})

console.log('✅ Hono app configured with working GraphQL setup')

export default app
