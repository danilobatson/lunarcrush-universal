// ===================================================================
// LunarCrush Universal - Complete GraphQL Yoga Implementation
// Using Auto-Generated Schema from Single Source of Truth
// ===================================================================

import { createYoga, createSchema } from 'graphql-yoga'
import { typeDefs } from './schema' // Auto-generated from schema/schema.graphql
import {
  LunarCrushConfig,
  // Import ALL service functions (38+ total) - these are the real API calls
  getTopicsList,
  getTopic,
  getTopicWhatsup,
  getTopicTimeSeries,
  getTopicTimeSeriesV2,
  getTopicPosts,
  getTopicNews,
  getTopicCreators,
  getCategoriesList,
  getCategory,
  getCategoryTopics,
  getCategoryTimeSeries,
  getCategoryPosts,
  getCategoryNews,
  getCategoryCreators,
  getCreatorsList,
  getCreator,
  getCreatorTimeSeries,
  getCreatorPosts,
  getCoinsList,
  getCoinsListV2,
  getCoin,
  getCoinTimeSeries,
  getCoinMeta,
  getStocksList,
  getStocksListV2,
  getStock,
  getStockTimeSeries,
  getNftsList,
  getNftsListV2,
  getNft,
  getNftTimeSeries,
  getNftTimeSeriesV1,
  getSystemChanges,
  getSearchesList,
  getSearch,
  searchPosts,
  getPostDetails,
  getPostTimeSeries
} from './services/lunarcrush'

// Cloudflare Workers environment interface
interface Env {
  LUNARCRUSH_API_KEY: {
    get(): Promise<string>
  }
  ENVIRONMENT?: string
  DB?: D1Database
  CACHE?: KVNamespace
}

/**
 * LunarCrush Universal GraphQL API
 *
 * Features:
 * - 100% LunarCrush API v4 coverage (38+ resolvers)
 * - Auto-generated schema from single source of truth
 * - Real-time data (no mocking)
 * - Cloudflare Workers deployment
 * - GraphQL Yoga with inline resolvers
 *
 * Architecture:
 * schema/schema.graphql → generated/schema.ts → resolvers → LunarCrush API
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    console.log('🚀 LunarCrush Universal GraphQL API starting...')
    console.log('📋 Using auto-generated schema from schema/schema.graphql')

    try {
      // Get API key from Cloudflare Workers secret store
      const apiKey = await env.LUNARCRUSH_API_KEY.get()
      console.log('🔑 API key status:', apiKey ? `FOUND (${apiKey.length} chars)` : 'MISSING')

      if (!apiKey) {
        throw new Error('LUNARCRUSH_API_KEY not found in secret store')
      }

      // LunarCrush API configuration
      const lunarCrushConfig: LunarCrushConfig = {
        apiKey,
        baseUrl: 'https://lunarcrush.com/api4/public'
      }

      // Create GraphQL Yoga server with auto-generated schema and ALL resolvers
      const yoga = createYoga({
        schema: createSchema({
          typeDefs, // Auto-generated from schema/schema.graphql
          resolvers: {
            Query: {
              // ===== HEALTH CHECK =====
              health: () => {
                return `🌙 LunarCrush Universal API v1.0 | Schema: Auto-Generated | Resolvers: 38+ | API Key: ${apiKey ? 'ACTIVE' : 'MISSING'}`
              },

              // ===== TOPICS ENDPOINTS (8 resolvers) =====
              getTopicsList: async () => {
                try {
                  console.log('📊 getTopicsList called')
                  return await getTopicsList(lunarCrushConfig)
                } catch (error) {
                  console.error('❌ getTopicsList error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch topics list: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getTopic: async (_: any, { topic }: { topic: string }) => {
                try {
                  console.log('📊 getTopic called for:', topic)
                  return await getTopic(lunarCrushConfig, topic)
                } catch (error) {
                  console.error('❌ getTopic error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch topic "${topic}": ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getTopicWhatsup: async (_: any, { topic }: { topic: string }) => {
                try {
                  console.log('📊 getTopicWhatsup called for:', topic)
                  return await getTopicWhatsup(lunarCrushConfig, topic)
                } catch (error) {
                  console.error('❌ getTopicWhatsup error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch topic whatsup "${topic}": ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getTopicTimeSeries: async (_: any, args: any) => {
                try {
                  console.log('📊 getTopicTimeSeries called:', args)
                  return await getTopicTimeSeries(lunarCrushConfig, args.topic, args.bucket, args.interval, args.start, args.end)
                } catch (error) {
                  console.error('❌ getTopicTimeSeries error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch topic time series: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getTopicTimeSeriesV2: async (_: any, args: any) => {
                try {
                  console.log('📊 getTopicTimeSeriesV2 called:', args)
                  return await getTopicTimeSeriesV2(lunarCrushConfig, args.topic, args.bucket)
                } catch (error) {
                  console.error('❌ getTopicTimeSeriesV2 error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch topic time series v2: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getTopicPosts: async (_: any, args: any) => {
                try {
                  console.log('📊 getTopicPosts called:', args)
                  return await getTopicPosts(lunarCrushConfig, args.topic, args.start, args.end)
                } catch (error) {
                  console.error('❌ getTopicPosts error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch topic posts: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getTopicNews: async (_: any, { topic }: { topic: string }) => {
                try {
                  console.log('📊 getTopicNews called for:', topic)
                  return await getTopicNews(lunarCrushConfig, topic)
                } catch (error) {
                  console.error('❌ getTopicNews error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch topic news "${topic}": ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getTopicCreators: async (_: any, { topic }: { topic: string }) => {
                try {
                  console.log('📊 getTopicCreators called for:', topic)
                  return await getTopicCreators(lunarCrushConfig, topic)
                } catch (error) {
                  console.error('❌ getTopicCreators error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch topic creators "${topic}": ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              // ===== CATEGORIES ENDPOINTS (7 resolvers) =====
              getCategoriesList: async () => {
                try {
                  console.log('📂 getCategoriesList called')
                  return await getCategoriesList(lunarCrushConfig)
                } catch (error) {
                  console.error('❌ getCategoriesList error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch categories list: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCategory: async (_: any, { category }: { category: string }) => {
                try {
                  console.log('📂 getCategory called for:', category)
                  return await getCategory(lunarCrushConfig, category)
                } catch (error) {
                  console.error('❌ getCategory error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch category "${category}": ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCategoryTopics: async (_: any, { category }: { category: string }) => {
                try {
                  console.log('📂 getCategoryTopics called for:', category)
                  return await getCategoryTopics(lunarCrushConfig, category)
                } catch (error) {
                  console.error('❌ getCategoryTopics error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch category topics "${category}": ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCategoryTimeSeries: async (_: any, args: any) => {
                try {
                  console.log('📂 getCategoryTimeSeries called:', args)
                  return await getCategoryTimeSeries(lunarCrushConfig, args.category, args.bucket, args.interval, args.start, args.end)
                } catch (error) {
                  console.error('❌ getCategoryTimeSeries error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch category time series: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCategoryPosts: async (_: any, args: any) => {
                try {
                  console.log('📂 getCategoryPosts called:', args)
                  return await getCategoryPosts(lunarCrushConfig, args.category, args.start, args.end)
                } catch (error) {
                  console.error('❌ getCategoryPosts error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch category posts: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCategoryNews: async (_: any, { category }: { category: string }) => {
                try {
                  console.log('📂 getCategoryNews called for:', category)
                  return await getCategoryNews(lunarCrushConfig, category)
                } catch (error) {
                  console.error('❌ getCategoryNews error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch category news "${category}": ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCategoryCreators: async (_: any, { category }: { category: string }) => {
                try {
                  console.log('📂 getCategoryCreators called for:', category)
                  return await getCategoryCreators(lunarCrushConfig, category)
                } catch (error) {
                  console.error('❌ getCategoryCreators error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch category creators "${category}": ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              // ===== CREATORS ENDPOINTS (4 resolvers) =====
              getCreatorsList: async () => {
                try {
                  console.log('👤 getCreatorsList called')
                  return await getCreatorsList(lunarCrushConfig)
                } catch (error) {
                  console.error('❌ getCreatorsList error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch creators list: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCreator: async (_: any, args: any) => {
                try {
                  console.log('👤 getCreator called:', args)
                  return await getCreator(lunarCrushConfig, args.network, args.id)
                } catch (error) {
                  console.error('❌ getCreator error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch creator: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCreatorTimeSeries: async (_: any, args: any) => {
                try {
                  console.log('👤 getCreatorTimeSeries called:', args)
                  return await getCreatorTimeSeries(lunarCrushConfig, args.network, args.id, args.bucket, args.interval, args.start, args.end)
                } catch (error) {
                  console.error('❌ getCreatorTimeSeries error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch creator time series: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCreatorPosts: async (_: any, args: any) => {
                try {
                  console.log('👤 getCreatorPosts called:', args)
                  return await getCreatorPosts(lunarCrushConfig, args.network, args.id, args.start, args.end)
                } catch (error) {
                  console.error('❌ getCreatorPosts error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch creator posts: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              // ===== COINS ENDPOINTS (5 resolvers) =====
              getCoinsList: async () => {
                try {
                  console.log('🪙 getCoinsList called')
                  return await getCoinsList(lunarCrushConfig)
                } catch (error) {
                  console.error('❌ getCoinsList error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch coins list: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCoinsListV2: async () => {
                try {
                  console.log('🪙 getCoinsListV2 called')
                  return await getCoinsListV2(lunarCrushConfig)
                } catch (error) {
                  console.error('❌ getCoinsListV2 error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch coins list v2: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCoin: async (_: any, { symbol }: { symbol: string }) => {
                try {
                  console.log('🪙 getCoin called for:', symbol)
                  return await getCoin(lunarCrushConfig, symbol)
                } catch (error) {
                  console.error('❌ getCoin error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch coin "${symbol}": ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCoinTimeSeries: async (_: any, args: any) => {
                try {
                  console.log('🪙 getCoinTimeSeries called:', args)
                  return await getCoinTimeSeries(lunarCrushConfig, args.symbol, args.bucket, args.interval, args.start, args.end)
                } catch (error) {
                  console.error('❌ getCoinTimeSeries error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch coin time series: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCoinMeta: async (_: any, { symbol }: { symbol: string }) => {
                try {
                  console.log('🪙 getCoinMeta called for:', symbol)
                  return await getCoinMeta(lunarCrushConfig, symbol)
                } catch (error) {
                  console.error('❌ getCoinMeta error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch coin meta "${symbol}": ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              // ===== STOCKS ENDPOINTS (4 resolvers) =====
              getStocksList: async () => {
                try {
                  console.log('📈 getStocksList called')
                  return await getStocksList(lunarCrushConfig)
                } catch (error) {
                  console.error('❌ getStocksList error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch stocks list: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getStocksListV2: async () => {
                try {
                  console.log('📈 getStocksListV2 called')
                  return await getStocksListV2(lunarCrushConfig)
                } catch (error) {
                  console.error('❌ getStocksListV2 error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch stocks list v2: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getStock: async (_: any, { symbol }: { symbol: string }) => {
                try {
                  console.log('📈 getStock called for:', symbol)
                  return await getStock(lunarCrushConfig, symbol)
                } catch (error) {
                  console.error('❌ getStock error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch stock "${symbol}": ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getStockTimeSeries: async (_: any, args: any) => {
                try {
                  console.log('📈 getStockTimeSeries called:', args)
                  return await getStockTimeSeries(lunarCrushConfig, args.symbol, args.bucket, args.interval, args.start, args.end)
                } catch (error) {
                  console.error('❌ getStockTimeSeries error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch stock time series: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              // ===== NFTS ENDPOINTS (5 resolvers) =====
              getNftsList: async () => {
                try {
                  console.log('🖼️ getNftsList called')
                  return await getNftsList(lunarCrushConfig)
                } catch (error) {
                  console.error('❌ getNftsList error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch nfts list: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getNftsListV2: async () => {
                try {
                  console.log('🖼️ getNftsListV2 called')
                  return await getNftsListV2(lunarCrushConfig)
                } catch (error) {
                  console.error('❌ getNftsListV2 error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch nfts list v2: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getNft: async (_: any, { id }: { id: string }) => {
                try {
                  console.log('🖼️ getNft called for:', id)
                  return await getNft(lunarCrushConfig, id)
                } catch (error) {
                  console.error('❌ getNft error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch nft "${id}": ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getNftTimeSeries: async (_: any, args: any) => {
                try {
                  console.log('🖼️ getNftTimeSeries called:', args)
                  return await getNftTimeSeries(lunarCrushConfig, args.id, args.bucket, args.interval, args.start, args.end)
                } catch (error) {
                  console.error('❌ getNftTimeSeries error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch nft time series: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getNftTimeSeriesV1: async (_: any, args: any) => {
                try {
                  console.log('🖼️ getNftTimeSeriesV1 called:', args)
                  return await getNftTimeSeriesV1(lunarCrushConfig, args.id, args.bucket, args.interval, args.start, args.end)
                } catch (error) {
                  console.error('❌ getNftTimeSeriesV1 error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch nft time series v1: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              // ===== SYSTEM ENDPOINTS (5 resolvers) =====
              getSystemChanges: async () => {
                try {
                  console.log('⚙️ getSystemChanges called')
                  return await getSystemChanges(lunarCrushConfig)
                } catch (error) {
                  console.error('❌ getSystemChanges error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch system changes: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getSearchesList: async () => {
                try {
                  console.log('🔍 getSearchesList called')
                  return await getSearchesList(lunarCrushConfig)
                } catch (error) {
                  console.error('❌ getSearchesList error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch searches list: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getSearch: async (_: any, { id }: { id: string }) => {
                try {
                  console.log('🔍 getSearch called for:', id)
                  return await getSearch(lunarCrushConfig, id)
                } catch (error) {
                  console.error('❌ getSearch error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch search "${id}": ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              searchPosts: async (_: any, { term }: { term: string }) => {
                try {
                  console.log('🔍 searchPosts called for:', term)
                  return await searchPosts(lunarCrushConfig, term)
                } catch (error) {
                  console.error('❌ searchPosts error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to search posts "${term}": ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getPostDetails: async (_: any, { id }: { id: string }) => {
                try {
                  console.log('📄 getPostDetails called for:', id)
                  return await getPostDetails(lunarCrushConfig, id)
                } catch (error) {
                  console.error('❌ getPostDetails error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch post details "${id}": ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getPostTimeSeries: async (_: any, args: any) => {
                try {
                  console.log('📄 getPostTimeSeries called:', args)
                  return await getPostTimeSeries(lunarCrushConfig, args.id, args.bucket, args.interval, args.start, args.end)
                } catch (error) {
                  console.error('❌ getPostTimeSeries error:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch post time series: ${error instanceof Error ? error.message : String(error)}`)
                }
              }
            }
          }
        }),
        cors: {
          origin: '*',
          credentials: true
        },
        graphiql: {
          title: '🌙 LunarCrush Universal API - Complete Implementation'
        }
      })

      console.log('✅ GraphQL Yoga server ready with 38+ auto-generated resolvers!')
      return await yoga.fetch(request, env)

    } catch (error) {
      console.error('❌ Server error:', error instanceof Error ? error.message : String(error))
      return new Response(
        JSON.stringify({
          error: 'GraphQL server error',
          message: error instanceof Error ? error.message : String(error),
          timestamp: new Date().toISOString()
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
  }
}
