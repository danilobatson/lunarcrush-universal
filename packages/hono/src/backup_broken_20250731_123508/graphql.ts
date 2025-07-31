import { graphql } from 'graphql'
// Cloudflare Workers Environment Interface
interface Env {
  LUNARCRUSH_API_KEY: { get(): Promise<string> };
  LUNARCRUSH_CACHE?: KVNamespace;
  ENVIRONMENT?: string;
}


import { buildSchema } from 'graphql'
import { HTTPException } from 'hono/http-exception'
import { typeDefs } from "../graphql/schema"../graphql/resolvers'
import type { Hono } from 'hono'
import type { AppContext } from "../graphql/schema"/graphql', async (c) => {
    try {
      const body = await c.req.json()
      const { query, variables = {}, operationName } = body

      console.log('🔍 GraphQL request:', {
        query: query?.substring(0, 100) + '...',
        variables,
        operationName,
        requestId: c.get('requestId')
      })

      const context = {
        env: c.env,
        user: c.get('user'),
        request: c.req,
        requestId: c.get('requestId'),
        clientIP: c.get('clientIP'),
        userAgent: c.get('userAgent'),
        startTime: c.get('startTime')
      }

      const result = await graphql({
        schema: buildSchema(typeDefs),
        source: query,
        rootValue: resolvers,
        contextValue: context,
        variableValues: variables,
        operationName
      })

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

  app.get('/graphql', (c) => {
    const requestId = c.get('requestId')
    const userAgent = c.get('userAgent')

    return c.html(`
<!DOCTYPE html>
<html>
<head>
  <title>GraphiQL - Enhanced LunarCrush Universal API</title>
  <link href="https://unpkg.com/graphiql@3.0.6/graphiql.min.css" rel="stylesheet" />
  <style>
    body { margin: 0; font-family: system-ui; }
    #graphiql { height: 100vh; }
    .title { background: #1a1a1a; color: #fff; padding: 10px; font-size: 18px; display: flex; justify-content: space-between; align-items: center; }
    .request-info { background: #2a2a2a; color: #ccc; padding: 5px 10px; font-size: 12px; }
    .features { background: #4ade80; color: #000; padding: 2px 8px; border-radius: 4px; font-size: 11px; margin-left: 10px; }
  </style>
</head>
<body>
  <div class="title">
    <span>🚀 Enhanced LunarCrush Universal API - GraphiQL</span>
    <span class="features">WORKERS COMPATIBLE • GENERATED TYPES</span>
  </div>
  <div class="request-info">
    Request ID: ${requestId} | User Agent: ${userAgent?.substring(0, 50)}... | Generated from schema/schema.graphql
  </div>
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
        },
        body: JSON.stringify(graphQLParams),
      }).then(response => response.json());
    };

    const root = ReactDOM.createRoot(document.getElementById('graphiql'));
    root.render(
      React.createElement(GraphiQL, {
        fetcher: fetcher,
        defaultQuery: \`# 🚀 Enhanced LunarCrush Universal API
# Request ID: ${requestId}
# Using Generated Types from schema/schema.graphql

{
  hello
  health
  getTopicsList {
    topic
    title
    topic_rank
    interactions_24h
  }
}

# Generate demo token:
# mutation {
#   generateDemoToken {
#     token
#     user { id type }
#     expiresIn
#   }
# }\`
      })
    );
  </script>
</body>
</html>`)
  })
}
