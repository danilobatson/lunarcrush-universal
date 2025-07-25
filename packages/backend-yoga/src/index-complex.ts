import { createYoga, createSchema } from 'graphql-yoga'
import { typeDefs } from './schema' // Our 707-line schema

// Import the correct exports from LunarCrush service
import { createLunarCrushClient, LunarCrushConfig } from './services/lunarcrush'
import { createResolvers } from './resolvers/index'

// Cloudflare Workers environment
interface Env {
  LUNARCRUSH_API_KEY: string
  ENVIRONMENT?: string
  DB?: D1Database
  CACHE?: KVNamespace
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Create LunarCrush config
    const lunarCrushConfig: LunarCrushConfig = {
      apiKey: env.LUNARCRUSH_API_KEY
    }

    // Create resolvers using the factory function
    const resolvers = createResolvers(lunarCrushConfig)

    const yoga = createYoga({
      schema: createSchema({
        typeDefs, // Your existing 707-line GraphQL schema
        resolvers // Resolvers created from your existing factory
      }),
      context: { env },
      landingPage: false,
      graphiql: {
        title: 'LunarCrush Universal API - Real Schema & Data',
      },
      cors: {
        origin: '*',
        credentials: true,
      },
    })

    return yoga.fetch(request, env)
  }
}
