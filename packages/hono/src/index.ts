// Hono Main Entry - Import Working Components from Backend-Yoga
// Use the proven working resolvers and schema

import { Hono } from 'hono'
import { graphqlServer } from 'hono/graphql-server'
import { createSchema } from 'graphql-yoga'

// Import the working schema and resolvers from backend-yoga
import { typeDefs } from '../../backend-yoga/src/schema'

// Import LunarCrush service from backend-yoga
import { LunarCrushConfig } from '../../backend-yoga/src/services/lunarcrush'
import * as lunarcrushService from '../../backend-yoga/src/services/lunarcrush'

// Cloudflare Workers Environment Interface
interface Env {
  LUNARCRUSH_API_KEY: { get(): Promise<string> };
  LUNARCRUSH_CACHE?: KVNamespace;
  ENVIRONMENT?: string;
}

const app = new Hono<{ Bindings: Env }>()

// Health check endpoint
app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'lunarcrush-universal-hono',
    backend: 'using-backend-yoga-components'
  })
})

// GraphQL endpoint - Use backend-yoga components
app.use('/graphql', async (c, next) => {
  try {
    console.log('🧘 Setting up GraphQL with backend-yoga components...')
    
    // Get API key from environment (same as backend-yoga)
    const apiKey = await c.env.LUNARCRUSH_API_KEY.get()
    
    if (!apiKey) {
      console.error('❌ LUNARCRUSH_API_KEY secret not found')
      return c.json({ error: 'API key not configured' }, 500)
    }
    
    console.log('✅ LUNARCRUSH_API_KEY retrieved successfully')
    
    // Create config (same as backend-yoga)
    const config: LunarCrushConfig = {
      apiKey,
      baseUrl: 'https://lunarcrush.com/api4/public'
    }
    
    // Create working resolvers (same pattern as backend-yoga)
    const resolvers = {
      Query: {
        // Health checks
        health: () => 'LunarCrush API Active - Using Backend-Yoga Components',
        healthSimple: () => 'Active',
        
        // Import working resolvers from backend-yoga pattern
        getTopicsList: () => lunarcrushService.getTopicsList(config),
        getTopic: (_: any, { topic }: any) => lunarcrushService.getTopic(config, topic),
        getTopicWhatsup: (_: any, { topic }: any) => lunarcrushService.getTopicWhatsup(config, topic),
        getTopicTimeSeries: (_: any, args: any) => 
          lunarcrushService.getTopicTimeSeries(config, args.topic, args.bucket, args.interval, args.start, args.end),
        getTopicTimeSeriesV2: (_: any, args: any) => 
          lunarcrushService.getTopicTimeSeriesV2(config, args.topic, args.bucket),
        getTopicPosts: (_: any, args: any) => 
          lunarcrushService.getTopicPosts(config, args.topic, args.start, args.end),
        getTopicNews: (_: any, { topic }: any) => lunarcrushService.getTopicNews(config, topic),
        getTopicCreators: (_: any, { topic }: any) => lunarcrushService.getTopicCreators(config, topic),
        
        // Add more resolvers as needed - all using working backend-yoga services
        getCategoriesList: () => lunarcrushService.getCategoriesList(config),
        getCategory: (_: any, { category }: any) => lunarcrushService.getCategory(config, category),
        
        getCoinsList: () => lunarcrushService.getCoinsList(config),
        getCoin: (_: any, { symbol }: any) => lunarcrushService.getCoin(config, symbol),
        
        getStocksList: () => lunarcrushService.getStocksList(config),
        getStock: (_: any, { symbol }: any) => lunarcrushService.getStock(config, symbol),
        
        getNftsList: () => lunarcrushService.getNftsList(config),
        getNft: (_: any, { id }: any) => lunarcrushService.getNft(config, id)
      }
    }
    
    // Create GraphQL schema using working backend-yoga components
    const schema = createSchema({
      typeDefs,
      resolvers
    })
    
    // Create GraphQL server
    const graphqlHandler = graphqlServer({
      schema,
      context: {
        config,
        request: c.req,
        env: c.env
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
    console.log('🌐 Cloudflare Workers fetch called - using backend-yoga components')
    
    // Create Hono context with environment
    const app_with_env = new Hono<{ Bindings: Env }>()
    
    // Copy routes from main app
    app_with_env.route('/', app)
    
    return app_with_env.fetch(request, env)
  }
}
