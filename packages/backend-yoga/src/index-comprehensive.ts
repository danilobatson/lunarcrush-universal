import { createYoga, createSchema } from 'graphql-yoga'
import { typeDefs } from './schema'
import {
  LunarCrushConfig,
  // Import ALL service functions (38+ total)
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
    console.log('🚀 GraphQL Yoga with ALL resolvers starting...')

    try {
      // Get API key from secret store
      const apiKey = await env.LUNARCRUSH_API_KEY.get()
      console.log('✅ API key retrieved, length:', apiKey?.length || 0)

      if (!apiKey) {
        throw new Error('LUNARCRUSH_API_KEY not found in secret store')
      }

      // Create LunarCrush config
      const lunarCrushConfig: LunarCrushConfig = {
        apiKey,
        baseUrl: 'https://lunarcrush.com/api4/public'
      }

      // Create Yoga with ALL RESOLVERS IMPLEMENTED (100% LunarCrush API coverage)
      const yoga = createYoga({
        schema: createSchema({
          typeDefs,
          resolvers: {
            Query: {
              // Health check
              health: () => {
                return `GraphQL Yoga with ALL resolvers working! API Key: ${apiKey ? 'FOUND' : 'MISSING'} (${apiKey?.length || 0} chars)`
              },

              // ===== TOPICS ENDPOINTS (8 total) =====
              getTopicsList: async () => {
                try {
                  console.log('🌙 getTopicsList called')
                  return await getTopicsList(lunarCrushConfig)
                } catch (error) {
                  console.error('❌ Error in getTopicsList:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch topics list: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getTopic: async (_: any, { topic }: { topic: string }) => {
                try {
                  console.log('🌙 getTopic called for:', topic)
                  return await getTopic(lunarCrushConfig, topic)
                } catch (error) {
                  console.error('❌ Error in getTopic:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch topic ${topic}: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getTopicWhatsup: async (_: any, { topic }: { topic: string }) => {
                try {
                  console.log('🌙 getTopicWhatsup called for:', topic)
                  return await getTopicWhatsup(lunarCrushConfig, topic)
                } catch (error) {
                  console.error('❌ Error in getTopicWhatsup:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch topic whatsup ${topic}: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getTopicTimeSeries: async (_: any, args: any) => {
                try {
                  console.log('🌙 getTopicTimeSeries called with args:', args)
                  return await getTopicTimeSeries(lunarCrushConfig, args.topic, args.bucket, args.interval, args.start, args.end)
                } catch (error) {
                  console.error('❌ Error in getTopicTimeSeries:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch topic time series: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getTopicTimeSeriesV2: async (_: any, args: any) => {
                try {
                  console.log('🌙 getTopicTimeSeriesV2 called with args:', args)
                  return await getTopicTimeSeriesV2(lunarCrushConfig, args.topic, args.bucket)
                } catch (error) {
                  console.error('❌ Error in getTopicTimeSeriesV2:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch topic time series v2: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getTopicPosts: async (_: any, args: any) => {
                try {
                  console.log('🌙 getTopicPosts called with args:', args)
                  return await getTopicPosts(lunarCrushConfig, args.topic, args.start, args.end)
                } catch (error) {
                  console.error('❌ Error in getTopicPosts:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch topic posts: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getTopicNews: async (_: any, { topic }: { topic: string }) => {
                try {
                  console.log('🌙 getTopicNews called for:', topic)
                  return await getTopicNews(lunarCrushConfig, topic)
                } catch (error) {
                  console.error('❌ Error in getTopicNews:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch topic news ${topic}: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getTopicCreators: async (_: any, { topic }: { topic: string }) => {
                try {
                  console.log('🌙 getTopicCreators called for:', topic)
                  return await getTopicCreators(lunarCrushConfig, topic)
                } catch (error) {
                  console.error('❌ Error in getTopicCreators:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch topic creators ${topic}: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              // ===== CATEGORIES ENDPOINTS (7 total) =====
              getCategoriesList: async () => {
                try {
                  console.log('📂 getCategoriesList called')
                  return await getCategoriesList(lunarCrushConfig)
                } catch (error) {
                  console.error('❌ Error in getCategoriesList:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch categories list: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCategory: async (_: any, { category }: { category: string }) => {
                try {
                  console.log('📂 getCategory called for:', category)
                  return await getCategory(lunarCrushConfig, category)
                } catch (error) {
                  console.error('❌ Error in getCategory:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch category ${category}: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCategoryTopics: async (_: any, { category }: { category: string }) => {
                try {
                  console.log('📂 getCategoryTopics called for:', category)
                  return await getCategoryTopics(lunarCrushConfig, category)
                } catch (error) {
                  console.error('❌ Error in getCategoryTopics:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch category topics ${category}: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCategoryTimeSeries: async (_: any, args: any) => {
                try {
                  console.log('📂 getCategoryTimeSeries called with args:', args)
                  return await getCategoryTimeSeries(lunarCrushConfig, args.category, args.bucket, args.interval, args.start, args.end)
                } catch (error) {
                  console.error('❌ Error in getCategoryTimeSeries:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch category time series: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCategoryPosts: async (_: any, args: any) => {
                try {
                  console.log('📂 getCategoryPosts called with args:', args)
                  return await getCategoryPosts(lunarCrushConfig, args.category, args.start, args.end)
                } catch (error) {
                  console.error('❌ Error in getCategoryPosts:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch category posts: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCategoryNews: async (_: any, { category }: { category: string }) => {
                try {
                  console.log('📂 getCategoryNews called for:', category)
                  return await getCategoryNews(lunarCrushConfig, category)
                } catch (error) {
                  console.error('❌ Error in getCategoryNews:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch category news ${category}: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCategoryCreators: async (_: any, { category }: { category: string }) => {
                try {
                  console.log('📂 getCategoryCreators called for:', category)
                  return await getCategoryCreators(lunarCrushConfig, category)
                } catch (error) {
                  console.error('❌ Error in getCategoryCreators:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch category creators ${category}: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              // ===== CREATORS ENDPOINTS (4 total) =====
              getCreatorsList: async () => {
                try {
                  console.log('👤 getCreatorsList called')
                  return await getCreatorsList(lunarCrushConfig)
                } catch (error) {
                  console.error('❌ Error in getCreatorsList:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch creators list: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCreator: async (_: any, args: any) => {
                try {
                  console.log('👤 getCreator called with args:', args)
                  return await getCreator(lunarCrushConfig, args.network, args.id)
                } catch (error) {
                  console.error('❌ Error in getCreator:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch creator: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCreatorTimeSeries: async (_: any, args: any) => {
                try {
                  console.log('👤 getCreatorTimeSeries called with args:', args)
                  return await getCreatorTimeSeries(lunarCrushConfig, args.network, args.id, args.bucket, args.interval, args.start, args.end)
                } catch (error) {
                  console.error('❌ Error in getCreatorTimeSeries:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch creator time series: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCreatorPosts: async (_: any, args: any) => {
                try {
                  console.log('👤 getCreatorPosts called with args:', args)
                  return await getCreatorPosts(lunarCrushConfig, args.network, args.id, args.start, args.end)
                } catch (error) {
                  console.error('❌ Error in getCreatorPosts:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch creator posts: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              // ===== COINS ENDPOINTS (5 total) =====
              getCoinsList: async () => {
                try {
                  console.log('🪙 getCoinsList called')
                  return await getCoinsList(lunarCrushConfig)
                } catch (error) {
                  console.error('❌ Error in getCoinsList:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch coins list: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCoinsListV2: async () => {
                try {
                  console.log('🪙 getCoinsListV2 called')
                  return await getCoinsListV2(lunarCrushConfig)
                } catch (error) {
                  console.error('❌ Error in getCoinsListV2:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch coins list v2: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCoin: async (_: any, { symbol }: { symbol: string }) => {
                try {
                  console.log('🪙 getCoin called for:', symbol)
                  return await getCoin(lunarCrushConfig, symbol)
                } catch (error) {
                  console.error('❌ Error in getCoin:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch coin ${symbol}: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCoinTimeSeries: async (_: any, args: any) => {
                try {
                  console.log('🪙 getCoinTimeSeries called with args:', args)
                  return await getCoinTimeSeries(lunarCrushConfig, args.symbol, args.bucket, args.interval, args.start, args.end)
                } catch (error) {
                  console.error('❌ Error in getCoinTimeSeries:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch coin time series: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getCoinMeta: async (_: any, { symbol }: { symbol: string }) => {
                try {
                  console.log('🪙 getCoinMeta called for:', symbol)
                  return await getCoinMeta(lunarCrushConfig, symbol)
                } catch (error) {
                  console.error('❌ Error in getCoinMeta:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch coin meta ${symbol}: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              // ===== STOCKS ENDPOINTS (4 total) =====
              getStocksList: async () => {
                try {
                  console.log('📈 getStocksList called')
                  return await getStocksList(lunarCrushConfig)
                } catch (error) {
                  console.error('❌ Error in getStocksList:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch stocks list: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getStocksListV2: async () => {
                try {
                  console.log('📈 getStocksListV2 called')
                  return await getStocksListV2(lunarCrushConfig)
                } catch (error) {
                  console.error('❌ Error in getStocksListV2:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch stocks list v2: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getStock: async (_: any, { symbol }: { symbol: string }) => {
                try {
                  console.log('📈 getStock called for:', symbol)
                  return await getStock(lunarCrushConfig, symbol)
                } catch (error) {
                  console.error('❌ Error in getStock:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch stock ${symbol}: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getStockTimeSeries: async (_: any, args: any) => {
                try {
                  console.log('📈 getStockTimeSeries called with args:', args)
                  return await getStockTimeSeries(lunarCrushConfig, args.symbol, args.bucket, args.interval, args.start, args.end)
                } catch (error) {
                  console.error('❌ Error in getStockTimeSeries:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch stock time series: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              // ===== NFTS ENDPOINTS (5 total) =====
              getNftsList: async () => {
                try {
                  console.log('🖼️ getNftsList called')
                  return await getNftsList(lunarCrushConfig)
                } catch (error) {
                  console.error('❌ Error in getNftsList:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch nfts list: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getNftsListV2: async () => {
                try {
                  console.log('🖼️ getNftsListV2 called')
                  return await getNftsListV2(lunarCrushConfig)
                } catch (error) {
                  console.error('❌ Error in getNftsListV2:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch nfts list v2: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getNft: async (_: any, { id }: { id: string }) => {
                try {
                  console.log('🖼️ getNft called for:', id)
                  return await getNft(lunarCrushConfig, id)
                } catch (error) {
                  console.error('❌ Error in getNft:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch nft ${id}: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getNftTimeSeries: async (_: any, args: any) => {
                try {
                  console.log('🖼️ getNftTimeSeries called with args:', args)
                  return await getNftTimeSeries(lunarCrushConfig, args.id, args.bucket, args.interval, args.start, args.end)
                } catch (error) {
                  console.error('❌ Error in getNftTimeSeries:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch nft time series: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getNftTimeSeriesV1: async (_: any, args: any) => {
                try {
                  console.log('🖼️ getNftTimeSeriesV1 called with args:', args)
                  return await getNftTimeSeriesV1(lunarCrushConfig, args.id, args.bucket, args.interval, args.start, args.end)
                } catch (error) {
                  console.error('❌ Error in getNftTimeSeriesV1:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch nft time series v1: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              // ===== SYSTEM ENDPOINTS (5 total) =====
              getSystemChanges: async () => {
                try {
                  console.log('⚙️ getSystemChanges called')
                  return await getSystemChanges(lunarCrushConfig)
                } catch (error) {
                  console.error('❌ Error in getSystemChanges:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch system changes: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getSearchesList: async () => {
                try {
                  console.log('🔍 getSearchesList called')
                  return await getSearchesList(lunarCrushConfig)
                } catch (error) {
                  console.error('❌ Error in getSearchesList:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch searches list: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getSearch: async (_: any, { id }: { id: string }) => {
                try {
                  console.log('🔍 getSearch called for:', id)
                  return await getSearch(lunarCrushConfig, id)
                } catch (error) {
                  console.error('❌ Error in getSearch:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch search ${id}: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              searchPosts: async (_: any, { term }: { term: string }) => {
                try {
                  console.log('🔍 searchPosts called for:', term)
                  return await searchPosts(lunarCrushConfig, term)
                } catch (error) {
                  console.error('❌ Error in searchPosts:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to search posts ${term}: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getPostDetails: async (_: any, { id }: { id: string }) => {
                try {
                  console.log('📄 getPostDetails called for:', id)
                  return await getPostDetails(lunarCrushConfig, id)
                } catch (error) {
                  console.error('❌ Error in getPostDetails:', error instanceof Error ? error.message : String(error))
                  throw new Error(`Failed to fetch post details ${id}: ${error instanceof Error ? error.message : String(error)}`)
                }
              },

              getPostTimeSeries: async (_: any, args: any) => {
                try {
                  console.log('📄 getPostTimeSeries called with args:', args)
                  return await getPostTimeSeries(lunarCrushConfig, args.id, args.bucket, args.interval, args.start, args.end)
                } catch (error) {
                  console.error('❌ Error in getPostTimeSeries:', error instanceof Error ? error.message : String(error))
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
          title: 'LunarCrush GraphQL API - Complete Implementation (38+ Resolvers)'
        }
      })

      console.log('✅ GraphQL Yoga server created with ALL 38+ resolvers implemented!')

      return await yoga.fetch(request, env)

    } catch (error) {
      console.error('❌ Worker error:', error instanceof Error ? error.message : String(error))
      return new Response(
        JSON.stringify({
          error: 'Internal server error',
          message: error instanceof Error ? error.message : String(error)
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
  }
}
