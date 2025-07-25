import { createYoga, createSchema } from 'graphql-yoga'
import { typeDefs } from './schema'

// Import LunarCrush functions
import { 
  LunarCrushConfig,
  getTopicsList,
  getTopic,
  getCoinsList,
  getCoin
} from './services/lunarcrush'

interface Env {
  LUNARCRUSH_API_KEY: string
  ENVIRONMENT?: string
  DB?: D1Database
  CACHE?: KVNamespace
}

// Debug resolvers with extensive logging
const createDebugResolvers = (config: LunarCrushConfig) => ({
  Query: {
    health: () => {
      console.log('Health check called')
      return `API Key configured: ${config.apiKey ? 'YES' : 'NO'}, Length: ${config.apiKey?.length || 0}`
    },

    getTopicsList: async (_: any, args: any) => {
      console.log('getTopicsList called with config:', config)
      console.log('getTopicsList args:', args)
      
      try {
        const result = await getTopicsList(config)
        console.log('getTopicsList result type:', typeof result)
        console.log('getTopicsList result sample:', JSON.stringify(result)?.substring(0, 200))
        return result
      } catch (error) {
        console.error('getTopicsList error:', error)
        return { error: `getTopicsList failed: ${error.message}` }
      }
    },

    getTopic: async (_: any, { topic }: { topic: string }) => {
      console.log('getTopic called with topic:', topic)
      console.log('getTopic config:', config)
      
      try {
        const result = await getTopic(config, topic)
        console.log('getTopic result:', JSON.stringify(result)?.substring(0, 200))
        return result
      } catch (error) {
        console.error('getTopic error:', error)
        return { error: `getTopic failed: ${error.message}` }
      }
    },

    getCoinsList: async (_: any, args: any) => {
      console.log('getCoinsList called with args:', args)
      
      try {
        const result = await getCoinsList(config)
        console.log('getCoinsList result type:', typeof result)
        console.log('getCoinsList sample:', JSON.stringify(result)?.substring(0, 200))
        return result
      } catch (error) {
        console.error('getCoinsList error:', error)
        return { error: `getCoinsList failed: ${error.message}` }
      }
    },

    getCoin: async (_: any, { symbol }: { symbol: string }) => {
      console.log('getCoin called with symbol:', symbol)
      
      try {
        const result = await getCoin(config, symbol)
        console.log('getCoin result:', JSON.stringify(result)?.substring(0, 200))
        return result
      } catch (error) {
        console.error('getCoin error:', error)
        return { error: `getCoin failed: ${error.message}` }
      }
    }
  }
})

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    console.log('Worker started, API key length:', env.LUNARCRUSH_API_KEY?.length)
    
    const config: LunarCrushConfig = {
      apiKey: env.LUNARCRUSH_API_KEY
    }

    const resolvers = createDebugResolvers(config)

    const yoga = createYoga({
      schema: createSchema({
        typeDefs,
        resolvers
      }),
      context: { env },
      landingPage: false,
      graphiql: {
        title: 'LunarCrush Debug API',
      },
      cors: {
        origin: '*',
        credentials: true,
      },
    })

    return yoga.fetch(request, env)
  }
}
