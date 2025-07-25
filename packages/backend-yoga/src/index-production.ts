import { createYoga, createSchema } from 'graphql-yoga'
import { typeDefs } from './schema' // Our 707-line schema

// Import the actual LunarCrush functions
import { 
  LunarCrushConfig,
  getTopicsList,
  getTopic,
  getTopicTimeSeries,
  getTopicPosts,
  getTopicNews,
  getTopicCreators
} from './services/lunarcrush'

// Cloudflare Workers environment
interface Env {
  LUNARCRUSH_API_KEY: string
  ENVIRONMENT?: string
  DB?: D1Database
  CACHE?: KVNamespace
}

// Create resolvers that match the actual schema fields
const createRealResolvers = (config: LunarCrushConfig) => ({
  Query: {
    // Match actual schema Query fields - let's start with a few key ones
    
    // Topics List (this should exist in schema)
    getTopicsList: async (_: any, args: any) => {
      try {
        return await getTopicsList(config)
      } catch (error) {
        console.error('getTopicsList error:', error)
        return null
      }
    },

    // Single Topic (this should exist in schema)
    getTopic: async (_: any, { topic }: { topic: string }) => {
      try {
        return await getTopic(config, topic)
      } catch (error) {
        console.error('getTopic error:', error)
        return null
      }
    },

    // Topic Time Series (this should exist in schema)
    getTopicTimeSeries: async (_: any, { topic, interval }: { topic: string; interval?: string }) => {
      try {
        return await getTopicTimeSeries(config, topic, interval)
      } catch (error) {
        console.error('getTopicTimeSeries error:', error)
        return null
      }
    },

    // Topic Posts (this should exist in schema)
    getTopicPosts: async (_: any, { topic, interval }: { topic: string; interval?: string }) => {
      try {
        return await getTopicPosts(config, topic, interval)
      } catch (error) {
        console.error('getTopicPosts error:', error)
        return null
      }
    },

    // Add more resolvers as needed based on schema...
  }
})

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Create LunarCrush config
    const config: LunarCrushConfig = {
      apiKey: env.LUNARCRUSH_API_KEY
    }

    // Create resolvers for actual schema fields
    const resolvers = createRealResolvers(config)

    const yoga = createYoga({
      schema: createSchema({
        typeDefs, // Your existing 707-line GraphQL schema
        resolvers // Resolvers that match actual schema fields
      }),
      context: { env },
      landingPage: false,
      graphiql: {
        title: 'LunarCrush Universal API - Real Schema & Real Data',
      },
      cors: {
        origin: '*',
        credentials: true,
      },
    })

    return yoga.fetch(request, env)
  }
}
