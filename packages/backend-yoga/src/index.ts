import { createYoga, createSchema } from 'graphql-yoga'
import { typeDefs } from './schema'
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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    console.log('🚀 Worker started with inline resolvers...')
    
    try {
      // Get API key from secret store FIRST (correct access pattern)
      const apiKey = await env.LUNARCRUSH_API_KEY.get()
      console.log('✅ API key retrieved for inline resolvers, length:', apiKey?.length || 0)
      
      if (!apiKey) {
        throw new Error('LUNARCRUSH_API_KEY not found in secret store')
      }

      // Create LunarCrush config once
      const lunarCrushConfig: LunarCrushConfig = {
        apiKey,
        baseUrl: 'https://lunarcrush.com/api4/public'
      }

      // Inline resolvers with pre-configured API access
      const resolvers = {
        Query: {
          health: () => {
            return `Inline resolvers working! API Key: ${apiKey ? 'FOUND' : 'MISSING'}, Length: ${apiKey?.length || 0}`
          },

          getTopicsList: async () => {
            try {
              console.log('🌙 Inline getTopicsList called')
              return await getTopicsList(lunarCrushConfig);
            } catch (error) {
              console.error('❌ Inline getTopicsList error:', error);
              throw new Error(`Failed to fetch topics list: ${error.message}`);
            }
          },

          getTopic: async (_: any, { topic }: { topic: string }) => {
            try {
              console.log('🌙 Inline getTopic called with topic:', topic)
              return await getTopic(lunarCrushConfig, topic);
            } catch (error) {
              console.error('❌ Inline getTopic error:', error);
              throw new Error(`Failed to fetch topic ${topic}: ${error.message}`);
            }
          },

          getCoinsList: async (_: any, args: any) => {
            try {
              console.log('🌙 Inline getCoinsList called with args:', args)
              return await getCoinsList(
                lunarCrushConfig,
                args.sort,
                args.filter, 
                args.limit,
                args.desc,
                args.page
              );
            } catch (error) {
              console.error('❌ Inline getCoinsList error:', error);
              throw new Error(`Failed to fetch coins list: ${error.message}`);
            }
          },

          getCoin: async (_: any, { coin }: { coin: string }) => {
            try {
              console.log('🌙 Inline getCoin called with coin:', coin)
              return await getCoin(lunarCrushConfig, coin);
            } catch (error) {
              console.error('❌ Inline getCoin error:', error);
              throw new Error(`Failed to fetch coin ${coin}: ${error.message}`);
            }
          }
        }
      }

      const yoga = createYoga({
        schema: createSchema({
          typeDefs,
          resolvers
        }),
        context: { env },
        landingPage: false,
        graphiql: {
          title: 'LunarCrush GraphQL API - Inline Resolvers Test',
        },
        cors: {
          origin: '*',
          credentials: true,
        },
      })

      return yoga.fetch(request, env)
    } catch (error) {
      console.error('❌ Inline resolvers worker error:', error)
      return new Response(
        JSON.stringify({ 
          error: 'Inline resolvers failed', 
          message: error.message 
        }), 
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        }
      )
    }
  }
}
