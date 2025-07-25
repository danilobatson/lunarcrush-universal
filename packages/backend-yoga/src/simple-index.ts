import { createYoga, createSchema } from 'graphql-yoga'
import { typeDefs } from './schema' // Our 707-line schema

// Cloudflare Workers environment
interface Env {
  LUNARCRUSH_API_KEY: string
  ENVIRONMENT?: string
  DB?: D1Database
  CACHE?: KVNamespace
}

// Simple resolvers to test the schema works
const resolvers = {
  Query: {
    // Add a few basic resolvers that match your schema
    hello: () => 'Hello from LunarCrush with Real Schema! 🚀',
    
    health: () => ({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '2.0.0',
      apiConnected: true
    }),

    // Test resolvers for a few actual schema fields
    getCoin: () => ({
      name: 'Bitcoin',
      symbol: 'BTC', 
      price: 67000,
      galaxy_score: 75.5
    }),

    getCoins: () => ([
      { name: 'Bitcoin', symbol: 'BTC', price: 67000 },
      { name: 'Ethereum', symbol: 'ETH', price: 3500 }
    ]),

    testLunarCrush: () => ({
      success: true,
      message: 'Schema loaded successfully with 707 lines',
      data: 'Real GraphQL schema working'
    })
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const yoga = createYoga({
      schema: createSchema({
        typeDefs, // Your existing 707-line GraphQL schema
        resolvers // Simple test resolvers
      }),
      context: { env },
      landingPage: false,
      graphiql: {
        title: 'LunarCrush Universal API - Real Schema Test',
      },
      cors: {
        origin: '*',
        credentials: true,
      },
    })

    return yoga.fetch(request, env)
  }
}
