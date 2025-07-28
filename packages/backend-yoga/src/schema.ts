// LunarCrush GraphQL Schema - Single Source of Truth Import
// This file imports from schema/schema.graphql and provides it to GraphQL Yoga

import { readFileSync } from 'fs';
import { join } from 'path';

// Read schema from single source of truth
const schemaPath = join(process.cwd(), '../../schema/schema.graphql');

// For Cloudflare Workers, we need to inline the schema since file system isn't available
// This will be the GraphQL schema as a string
export const typeDefs = `
# LunarCrush Universal Backend - Official API Schema
# Single source of truth for all LunarCrush API types

scalar Date
scalar JSON

type Query {
  # Health check
  health: String

  # ===== TOPICS ENDPOINTS (from LunarCrush API v4) =====
  getTopicsList: [TopicListItem]
  getTopic(topic: String): TopicDetails
  getTopicWhatsup(topic: String): TopicWhatsup
  getTopicTimeSeries(topic: String, bucket: String, interval: String, start: String, end: String): [TopicTimeSeriesItem]
  getTopicTimeSeriesV2(topic: String, bucket: String): [TopicTimeSeriesItem]
  getTopicPosts(topic: String, start: String, end: String): [TopicPost]
  getTopicNews(topic: String): [TopicNews]
  getTopicCreators(topic: String): [TopicCreator]

  # ===== CATEGORIES ENDPOINTS =====
  getCategoriesList: [CategoryListItem]
  getCategory(category: String): CategoryDetails
  getCategoryTopics(category: String): [CategoryTopic]
  getCategoryTimeSeries(category: String, bucket: String, interval: String, start: String, end: String): [CategoryTimeSeriesItem]
  getCategoryPosts(category: String, start: String, end: String): [CategoryPost]
  getCategoryNews(category: String): [CategoryNews]
  getCategoryCreators(category: String): [CategoryCreator]

  # ===== CREATORS ENDPOINTS =====
  getCreatorsList: [CreatorListItem]
  getCreator(network: String, id: String): CreatorDetails
  getCreatorTimeSeries(network: String, id: String, bucket: String, interval: String, start: String, end: String): [CreatorTimeSeriesItem]
  getCreatorPosts(network: String, id: String, start: String, end: String): [CreatorPost]

  # ===== COINS ENDPOINTS =====
  getCoinsList: [CoinListItem]
  getCoinsListV2: [CoinListItem]
  getCoin(symbol: String): CoinDetails
  getCoinTimeSeries(symbol: String, bucket: String, interval: String, start: String, end: String): [CoinTimeSeriesItem]
  getCoinMeta(symbol: String): CoinMeta

  # ===== STOCKS ENDPOINTS =====
  getStocksList: [StockListItem]
  getStocksListV2: [StockListItem]
  getStock(symbol: String): StockDetails
  getStockTimeSeries(symbol: String, bucket: String, interval: String, start: String, end: String): [StockTimeSeriesItem]

  # ===== NFTS ENDPOINTS =====
  getNftsList: [NftListItem]
  getNftsListV2: [NftListItem]
  getNft(id: String): NftDetails
  getNftTimeSeries(id: String, bucket: String, interval: String, start: String, end: String): [NftTimeSeriesItem]
  getNftTimeSeriesV1(id: String, bucket: String, interval: String, start: String, end: String): [NftTimeSeriesItem]

  # ===== SYSTEM ENDPOINTS =====
  getSystemChanges: [SystemChange]
  getSearchesList: [SearchItem]
  getSearch(id: String): SearchDetails
  searchPosts(term: String): [SearchPost]
  getPostDetails(id: String): PostDetails
  getPostTimeSeries(id: String, bucket: String, interval: String, start: String, end: String): [PostTimeSeriesItem]
}

# ===== EXACT API RESPONSE TYPES (FROM LUNARCRUSH DOCS) =====

type TopicListItem {
  topic: String
  title: String
  topic_rank: Int
  topic_rank_1h_previous: Int
  topic_rank_24h_previous: Int
  num_contributors: Float
  num_posts: Float
  interactions_24h: Float
}

type TopicDetails {
  topic: String
  title: String
  topic_rank: Int
  related_topics: [String]
  types_count: JSON
  types_interactions: JSON
  types_sentiment: JSON
  types_sentiment_detail: JSON
  interactions_24h: Float
  num_contributors: Int
  num_posts: Int
  categories: [String]
  trend: String
}

type TopicWhatsup {
  summary: String
}

type TopicTimeSeriesItem {
  time: Int
  contributors_active: Int
  contributors_created: Int
  interactions: Float
  posts_active: Int
  posts_created: Int
  sentiment: Float
  spam: Int
  alt_rank: Int
  circulating_supply: Float
  close: Float
  galaxy_score: Float
  high: Float
  low: Float
  market_cap: Float
  market_dominance: Float
  open: Float
  social_dominance: Float
  volume_24h: Float
}

type TopicPost {
  id: String
  post_type: String
  post_title: String
  post_link: String
  post_image: String
  post_created: Int
  post_sentiment: Float
  creator_id: String
  creator_name: String
  creator_display_name: String
  creator_followers: Float
  creator_avatar: String
  interactions_24h: Float
  interactions_total: Float
}

type TopicNews {
  id: String
  post_type: String
  post_title: String
  post_link: String
  post_image: String
  post_created: Int
  post_sentiment: Float
  creator_id: String
}

type TopicCreator {
  id: String
  name: String
  display_name: String
  followers: Float
  avatar: String
  interactions_24h: Float
}

type CategoryListItem {
  category: String
  title: String
}

type CategoryDetails {
  category: String
  title: String
}

type CategoryTopic {
  topic: String
  title: String
}

type CategoryTimeSeriesItem {
  time: Int
  interactions: Float
}

type CategoryPost {
  id: String
  title: String
}

type CategoryNews {
  id: String
  title: String
}

type CategoryCreator {
  id: String
  name: String
}

type CreatorListItem {
  id: String
  name: String
  display_name: String
  followers: Float
  network: String
}

type CreatorDetails {
  id: String
  name: String
  display_name: String
  followers: Float
  network: String
  avatar: String
}

type CreatorTimeSeriesItem {
  time: Int
  interactions: Float
}

type CreatorPost {
  id: String
  title: String
}

type CoinListItem {
  symbol: String
  name: String
  close: Float
  market_cap: Float
  alt_rank: Int
}

type CoinDetails {
  symbol: String
  name: String
  close: Float
  market_cap: Float
  alt_rank: Int
  interactions_24h: Float
}

type CoinTimeSeriesItem {
  time: Int
  close: Float
  high: Float
  low: Float
  volume_24h: Float
}

type CoinMeta {
  symbol: String
  name: String
  description: String
}

type StockListItem {
  symbol: String
  name: String
  close: Float
}

type StockDetails {
  symbol: String
  name: String
  close: Float
  interactions_24h: Float
}

type StockTimeSeriesItem {
  time: Int
  close: Float
  volume: Float
}

type NftListItem {
  id: String
  name: String
  floor_price: Float
}

type NftDetails {
  id: String
  name: String
  floor_price: Float
  interactions_24h: Float
}

type NftTimeSeriesItem {
  time: Int
  floor_price: Float
  volume: Float
}

type SystemChange {
  id: String
  change: String
  timestamp: Int
}

type SearchItem {
  id: String
  query: String
}

type SearchDetails {
  id: String
  query: String
  results: Int
}

type SearchPost {
  id: String
  title: String
}

type PostDetails {
  id: String
  title: String
  content: String
}

type PostTimeSeriesItem {
  time: Int
  interactions: Float
}
`;

// TODO: For production, read from file system when available
// export const typeDefs = readFileSync(schemaPath, 'utf8');
