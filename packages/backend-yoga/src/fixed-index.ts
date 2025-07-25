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

// Cloudflare Workers environment with secret store
interface Env {
  LUNARCRUSH_API_KEY: {
    get(): Promise<string>
  }
  ENVIRONMENT?: string
  DB?: D1Database
  CACHE?: KVNamespace
}

// Debug resolvers with proper secret store access
const createDebugResolvers = () => ({
  Query: {
    health: async (_: any, __: any, { env }: { env: Env }) => {
      try {
        const apiKey = await env.LUNARCRUSH_API_KEY.get()
        console.log('Retrieved API key from secret store, length:', apiKey?.length || 0)
        return `API Key from secret store: ${apiKey ? 'FOUND' : 'MISSING'}, Length: ${apiKey?.length || 0}`
      } catch (error) {
        console.error('Error getting API key from secret store:', error)
        return `Error accessing secret store: ${error.message}`
      }
    },

    getTopicsList: async (_: any, args: any, { env }: { env: Env }) => {
      console.log('getTopicsList called')
      
      try {
        const apiKey = await env.LUNARCRUSH_API_KEY.get()
        console.log('API key retrieved, length:', apiKey?.length)
        
        const config: LunarCrushConfig = {
          apiKey,
          baseUrl: 'https://lunarcrush.com/api4' // Fixed base URL
        }
        
        const result = await getTopicsList(config)
        console.log('getTopicsList result type:', typeof result)
        console.log('getTopicsList result sample:', JSON.stringify(result)?.substring(0, 200))
        return result
      } catch (error) {
        console.error('getTopicsList error:', error)
        return null
      }
    },

    getTopic: async (_: any, { topic }: { topic: string }, { env }: { env: Env }) => {
      console.log('getTopic called with topic:', topic)
      
      try {
        const apiKey = await env.LUNARCRUSH_API_KEY.get()
        const config: LunarCrushConfig = {
          apiKey,
          baseUrl: 'https://lunarcrush.com/api4'
        }
        
        const result = await getTopic(config, topic)
        console.log('getTopic result:', JSON.stringify(result)?.substring(0, 200))
        return result
      } catch (error) {
        console.error('getTopic error:', error)
        return null
      }
    },

    getCoinsList: async (_: any, args: any, { env }: { env: Env }) => {
      console.log('getCoinsList called')
      
      try {
        const apiKey = await env.LUNARCRUSH_API_KEY.get()
        const config: LunarCrushConfig = {
          apiKey,
          baseUrl: 'https://lunarcrush.com/api4'
        }
        
        const result = await getCoinsList(config)
        console.log('getCoinsList result:', JSON.stringify(result)?.substring(0, 200))
        return result
      } catch (error) {
        console.error('getCoinsList error:', error)
        return null
      }
    },

    getCoin: async (_: any, { coin }: { coin: string }, { env }: { env: Env }) => {
      console.log('getCoin called with coin:', coin)
      
      try {
        const apiKey = await env.LUNARCRUSH_API_KEY.get()
        const config: LunarCrushConfig = {
          apiKey,
          baseUrl: 'https://lunarcrush.com/api4'
        }
        
        const result = await getCoin(config, coin)
        console.log('getCoin result:', JSON.stringify(result)?.substring(0, 200))
        return result
      } catch (error) {
        console.error('getCoin error:', error)
        return null
      }
    }
  }
})

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    console.log('Worker started, checking secret store access...')
    
    const resolvers = createDebugResolvers()

    const yoga = createYoga({
      schema: createSchema({
        typeDefs,
        resolvers
      }),
      context: { env },
      landingPage: false,
      graphiql: {
        title: 'LunarCrush API - Secret Store Fixed',
      },
      cors: {
        origin: '*',
        credentials: true,
      },
    })

    return yoga.fetch(request, env)
  }
}
