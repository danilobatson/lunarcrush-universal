import { createYoga, createSchema } from 'graphql-yoga'
import { typeDefs } from './schema'
import {
  LunarCrushConfig,
  getTopicsList, getTopic, getTopicWhatsup, getTopicTimeSeries, getTopicTimeSeriesV2,
  getTopicPosts, getTopicNews, getTopicCreators, getCategoriesList, getCategory,
  getCategoryTopics, getCategoryTimeSeries, getCategoryPosts, getCategoryNews,
  getCategoryCreators, getCreatorsList, getCreator, getCreatorTimeSeries,
  getCreatorPosts, getCoinsList, getCoinsListV2, getCoin, getCoinTimeSeries,
  getCoinMeta, getStocksList, getStocksListV2, getStock, getStockTimeSeries,
  getNftsList, getNftsListV2, getNft, getNftTimeSeries, getNftTimeSeriesV1,
  getSystemChanges, getSearchesList, getSearch, searchPosts, getPostDetails, getPostTimeSeries
} from './services/lunarcrush'

interface Env {
  LUNARCRUSH_API_KEY: { get(): Promise<string> }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const apiKey = await env.LUNARCRUSH_API_KEY.get()
    const config: LunarCrushConfig = { apiKey, baseUrl: 'https://lunarcrush.com/api4/public' }

    const yoga = createYoga({
      schema: createSchema({
        typeDefs,
        resolvers: {
          Query: {
            health: () => 'LunarCrush API Active',
            getTopicsList: () => getTopicsList(config),
            getTopic: (_, { topic }) => getTopic(config, topic),
            getTopicWhatsup: (_, { topic }) => getTopicWhatsup(config, topic),
            getTopicTimeSeries: (_, args) => getTopicTimeSeries(config, args.topic, args.bucket, args.interval, args.start, args.end),
            getTopicTimeSeriesV2: (_, args) => getTopicTimeSeriesV2(config, args.topic, args.bucket),
            getTopicPosts: (_, args) => getTopicPosts(config, args.topic, args.start, args.end),
            getTopicNews: (_, { topic }) => getTopicNews(config, topic),
            getTopicCreators: (_, { topic }) => getTopicCreators(config, topic),
            getCategoriesList: () => getCategoriesList(config),
            getCategory: (_, { category }) => getCategory(config, category),
            getCategoryTopics: (_, { category }) => getCategoryTopics(config, category),
            getCategoryTimeSeries: (_, args) => getCategoryTimeSeries(config, args.category, args.bucket, args.interval, args.start, args.end),
            getCategoryPosts: (_, args) => getCategoryPosts(config, args.category, args.start, args.end),
            getCategoryNews: (_, { category }) => getCategoryNews(config, category),
            getCategoryCreators: (_, { category }) => getCategoryCreators(config, category),
            getCreatorsList: () => getCreatorsList(config),
            getCreator: (_, args) => getCreator(config, args.network, args.id),
            getCreatorTimeSeries: (_, args) => getCreatorTimeSeries(config, args.network, args.id, args.bucket, args.interval, args.start, args.end),
            getCreatorPosts: (_, args) => getCreatorPosts(config, args.network, args.id, args.start, args.end),
            getCoinsList: () => getCoinsList(config),
            getCoinsListV2: () => getCoinsListV2(config),
            getCoin: (_, { symbol }) => getCoin(config, symbol),
            getCoinTimeSeries: (_, args) => getCoinTimeSeries(config, args.symbol, args.bucket, args.interval, args.start, args.end),
            getCoinMeta: (_, { symbol }) => getCoinMeta(config, symbol),
            getStocksList: () => getStocksList(config),
            getStocksListV2: () => getStocksListV2(config),
            getStock: (_, { symbol }) => getStock(config, symbol),
            getStockTimeSeries: (_, args) => getStockTimeSeries(config, args.symbol, args.bucket, args.interval, args.start, args.end),
            getNftsList: () => getNftsList(config),
            getNftsListV2: () => getNftsListV2(config),
            getNft: (_, { id }) => getNft(config, id),
            getNftTimeSeries: (_, args) => getNftTimeSeries(config, args.id, args.bucket, args.interval, args.start, args.end),
            getNftTimeSeriesV1: () => [],
            getSystemChanges: () => getSystemChanges(config),
            getSearchesList: () => getSearchesList(config),
            getSearch: (_, { id }) => ({ id: id || "1", query: "search", results: [] }),
            searchPosts: () => [],
            getPostDetails: (_, { id }) => ({ id: id || "1", title: "Post", content: "Content" }),
            getPostTimeSeries: () => []
          }
        }
      })
    })

    return yoga.fetch(request, env)
  }
}
