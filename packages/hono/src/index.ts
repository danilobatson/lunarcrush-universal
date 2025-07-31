// Hono Main Entry - Handle Cloudflare Workers Environment
// Follow backend-yoga pattern: get env at top level, pass config to resolvers

import { Hono } from 'hono'
import { buildSchema } from 'graphql'
import { graphqlServer } from 'hono/graphql-server'
import { typeDefs } from './graphql/schema'
import { resolvers } from './graphql/pure-resolvers'

// Cloudflare Workers Environment Interface (matches backend-yoga)
interface Env {
  LUNARCRUSH_API_KEY: { get(): Promise<string> };
  LUNARCRUSH_CACHE?: KVNamespace;
  ENVIRONMENT?: string;
}

// LunarCrush Config Interface
interface LunarCrushConfig {
  apiKey: string;
  baseUrl?: string;
}

const app = new Hono<{ Bindings: Env }>()

// Health check endpoint
app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'lunarcrush-universal-hono'
  })
})

// GraphQL endpoint - Follow backend-yoga pattern
app.use('/graphql', async (c, next) => {
  try {
    console.log('🔧 Setting up GraphQL with environment...')

    // Get API key from environment (like backend-yoga)
    const apiKey = await c.env.LUNARCRUSH_API_KEY.get()

    if (!apiKey) {
      console.error('❌ LUNARCRUSH_API_KEY secret not found')
      return c.json({ error: 'API key not configured' }, 500)
    }

    console.log('✅ LUNARCRUSH_API_KEY retrieved successfully')

    // Create config (like backend-yoga)
    const config: LunarCrushConfig = {
      apiKey,
      baseUrl: 'https://lunarcrush.com/api4/public'
    }

    // Create GraphQL schema
    const schema = buildSchema(typeDefs)

    // Create GraphQL server with config in context
    const graphqlHandler = graphqlServer({
      schema,
      rootValue: resolvers,
      context: {
        config,      // Pass config instead of raw env
        request: c.req,
        env: c.env   // Also pass env for other uses
      }
    })

    return graphqlHandler(c, next)

  } catch (error) {
    console.error('❌ GraphQL setup error:', error)
    return c.json({
      error: 'GraphQL server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// Default export for Cloudflare Workers
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    console.log('🌐 Cloudflare Workers fetch called')

    // Create Hono context with environment
    const app_with_env = new Hono<{ Bindings: Env }>()

    // Copy routes from main app
    app_with_env.route('/', app)

    return app_with_env.fetch(request, env)
  }
}
