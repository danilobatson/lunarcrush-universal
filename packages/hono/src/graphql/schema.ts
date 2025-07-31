/* eslint-disable */
// ================================================================
// 🚨 AUTO-GENERATED SCHEMA - DO NOT EDIT! 🚨
// ================================================================
// Generated from: schema/schema.graphql
// Command: yarn codegen
// Compatible with: Cloudflare Workers Runtime
// Use: import { typeDefs } from './schema'
// ================================================================

// GraphQL Schema as inline string (Workers-compatible)
export const typeDefs = /* GraphQL */ `type CategoryCreator {
  creator_avatar: String
  creator_followers: Float
  creator_id: String
  creator_name: String
  creator_rank: Int
  interactions_24h: Float
}

type CategoryDetails {
  category: String
  interactions_24h: Float
  num_contributors: Int
  num_posts: Int
  related_topics: [String]
  title: String
  topic: String
  trend: String
  types_count: JSON
  types_interactions: JSON
  types_sentiment: JSON
}

type CategoryListItem {
  category: String
  category_rank: Int
  category_rank_1h_previous: Int
  category_rank_24h_previous: Int
  interactions_24h: Float
  num_contributors: Float
  num_posts: Float
  social_dominance: Float
  title: String
}

type CategoryNews {
  creator_avatar: String
  creator_display_name: String
  creator_followers: Float
  creator_id: String
  creator_name: String
  id: String
  interactions_24h: Float
  interactions_total: Float
  post_created: Int
  post_image: String
  post_link: String
  post_sentiment: Float
  post_title: String
  post_type: String
}

type CategoryPost {
  creator_avatar: String
  creator_display_name: String
  creator_followers: Float
  creator_id: String
  creator_name: String
  id: String
  interactions_24h: Float
  interactions_total: Float
  post_created: Int
  post_image: String
  post_link: String
  post_sentiment: Float
  post_title: String
  post_type: String
}

type CategoryTimeSeriesItem {
  contributors_active: Int
  contributors_created: Int
  interactions: Float
  posts_active: Int
  posts_created: Int
  sentiment: Float
  spam: Int
  time: Int
}

type CategoryTopic {
  interactions_24h: Float
  num_contributors: Float
  num_posts: Float
  social_dominance: Float
  title: String
  topic: String
  topic_rank: Int
  topic_rank_1h_previous: Int
  topic_rank_24h_previous: Int
}

type CoinDetails {
  alt_rank: Int
  circulating_supply: Float
  close: Float
  galaxy_score: Float
  id: Int
  market_cap: Float
  market_cap_rank: Int
  max_supply: Float
  name: String
  percent_change_7d: Float
  percent_change_24h: Float
  percent_change_30d: Float
  price: Float
  price_btc: Float
  symbol: String
  volatility: Float
  volume_24h: Float
}

type CoinListItem {
  alt_rank: Int
  alt_rank_previous: Int
  blockchains: [JSON]
  categories: [String]
  circulating_supply: Float
  galaxy_score: Float
  galaxy_score_previous: Float
  id: Int
  interactions_24h: Float
  last_updated_price: Int
  last_updated_price_by: String
  logo: String
  market_cap: Float
  market_cap_rank: Int
  market_dominance: Float
  market_dominance_prev: Float
  max_supply: Float
  name: String
  percent_change_1h: Float
  percent_change_7d: Float
  percent_change_24h: Float
  percent_change_30d: Float
  price: Float
  price_btc: Float
  sentiment: Float
  social_dominance: Float
  social_volume_24h: Float
  symbol: String
  topic: String
  volatility: Float
  volume_24h: Float
}

type CoinMeta {
  blockchain: String
  coingecko_link: String
  coinmarketcap_link: String
  description: String
  forum_link: String
  github_link: String
  header_image: String
  header_text: String
  id: Int
  market_categories: [String]
  name: String
  overview_promotion: String
  sections_order: [String]
  short_summary: String
  symbol: String
  telegram_link: String
  twitter_link: String
  updated: Int
  videos: [JSON]
  website_link: String
  whitepaper_link: String
  wikipedia_link: String
}

type CoinTimeSeriesItem {
  alt_rank: Int
  circulating_supply: Float
  close: Float
  contributors_active: Int
  contributors_created: Int
  galaxy_score: Float
  high: Float
  interactions: Float
  low: Float
  market_cap: Float
  market_dominance: Float
  open: Float
  posts_active: Int
  posts_created: Int
  sentiment: Float
  social_dominance: Float
  spam: Int
  time: Int
  volume_24h: Float
}

input CreateTopicInput {
  category: String!
  description: String
  topic: String!
}

type CreatorDetails {
  creator_avatar: String
  creator_display_name: String
  creator_followers: Float
  creator_id: String
  creator_name: String
  creator_rank: Int
  interactions_24h: Float
  topic_influence: JSON
}

type CreatorListItem {
  creator_avatar: String
  creator_display_name: String
  creator_followers: Float
  creator_id: String
  creator_name: String
  creator_network: String
  creator_posts: Int
  creator_rank: Int
  interactions_24h: Float
}

type CreatorPost {
  creator_avatar: String
  creator_display_name: String
  creator_followers: Float
  creator_id: String
  creator_name: String
  id: String
  interactions_24h: Float
  interactions_total: Float
  post_created: Int
  post_image: String
  post_link: String
  post_sentiment: Float
  post_title: String
  post_type: String
}

type CreatorTimeSeriesItem {
  creator_rank: Int
  followers: Float
  interactions: Float
  posts_active: Int
  time: Int
}

scalar Date

type HealthStatus {
  features: [String!]!
  requestId: String!
  service: String!
  status: String!
  timestamp: String!
  uptime: Float!
  version: String!
}

scalar JSON

type Mutation {
  createTopic(input: CreateTopicInput!): Topic!
  generateDemoToken: TokenResponse!
  updateUserPreferences(input: UserPreferencesInput!): UserPreferences!
}

type NftDetails {
  floor_price: Float
  id: String
  market_cap: Float
  name: String
  percent_change_24h: Float
  volume_24h: Float
}

type NftListItem {
  alt_rank: Int
  base_crypto: String
  floor_price: Float
  galaxy_score: Float
  id: String
  interactions_24h: Float
  logo: String
  lunar_id: String
  market_cap: Float
  name: String
  percent_change_24h: Float
  social_contributors: Int
  social_dominance: Float
  social_volume_24h: Float
  volume_24h: Float
}

type NftTimeSeriesItem {
  alt_rank: Int
  contributors_active: Int
  contributors_created: Int
  interactions: Float
  market_cap: Float
  posts_active: Int
  posts_created: Int
  sentiment: Float
  social_dominance: Float
  time: Int
}

type PostDetails {
  content: String
  id: String
  post_title: String
}

type PostTimeSeriesItem {
  interactions: Float
  time: Int
}

type Query {
  getCategoriesList: [CategoryListItem]
  getCategory(category: String): CategoryDetails
  getCategoryCreators(category: String): [CategoryCreator]
  getCategoryNews(category: String): [CategoryNews]
  getCategoryPosts(category: String, end: String, start: String): [CategoryPost]
  getCategoryTimeSeries(bucket: String, category: String, end: String, interval: String, start: String): [CategoryTimeSeriesItem]
  getCategoryTopics(category: String): [CategoryTopic]
  getCoin(symbol: String): CoinDetails
  getCoinMeta(symbol: String): CoinMeta
  getCoinTimeSeries(bucket: String, end: String, interval: String, start: String, symbol: String): [CoinTimeSeriesItem]
  getCoinsList: [CoinListItem]
  getCoinsListV2: [CoinListItem]
  getCreator(id: String, network: String): CreatorDetails
  getCreatorPosts(end: String, id: String, network: String, start: String): [CreatorPost]
  getCreatorTimeSeries(bucket: String, end: String, id: String, interval: String, network: String, start: String): [CreatorTimeSeriesItem]
  getCreatorsList: [CreatorListItem]
  getNft(id: String): NftDetails
  getNftTimeSeries(bucket: String, end: String, id: String, interval: String, start: String): [NftTimeSeriesItem]
  getNftsList: [NftListItem]
  getNftsListV2: [NftListItem]
  getPostDetails(id: String): PostDetails
  getPostTimeSeries(bucket: String, end: String, id: String, interval: String, start: String): [PostTimeSeriesItem]
  getSearch(id: String): SearchResult
  getSearchesList: [SearchItem]
  getStock(symbol: String): StockDetails
  getStockTimeSeries(bucket: String, end: String, interval: String, start: String, symbol: String): [StockTimeSeriesItem]
  getStocksList: [StockListItem]
  getStocksListV2: [StockListItem]
  getSystemChanges: [SystemChange]
  getTopic(topic: String): TopicDetails
  getTopicCreators(topic: String): [TopicCreator]
  getTopicNews(topic: String): [TopicNews]
  getTopicPosts(end: String, start: String, topic: String): [TopicPost]
  getTopicTimeSeries(bucket: String, end: String, interval: String, start: String, topic: String): [TopicTimeSeriesItem]
  getTopicTimeSeriesV2(bucket: String, topic: String): [TopicTimeSeriesItem]
  getTopicWhatsup(topic: String): TopicWhatsup
  getTopicsList: [TopicListItem]
  health: String
  hello: String
  searchPosts(term: String): [SearchPost]
}

type SearchItem {
  id: String
  query: String
}

type SearchPost {
  id: String
  post_created: Int
  post_link: String
  post_type: String
  text: String
  text_highlight: String
}

type SearchResult {
  id: String
  query: String
  results: [String]
}

enum SortDirection {
  ASC
  DESC
}

type StockDetails {
  close: Float
  id: Int
  market_cap: Float
  market_cap_rank: Int
  name: String
  percent_change_24h: Float
  price: Float
  symbol: String
  volume_24h: Float
}

type StockListItem {
  alt_rank: Int
  alt_rank_previous: Int
  categories: [String]
  galaxy_score: Float
  galaxy_score_previous: Float
  id: Int
  interactions_24h: Float
  logo: String
  market_cap: Float
  market_cap_rank: Int
  market_dominance: Float
  market_dominance_prev: Float
  name: String
  percent_change_24h: Float
  price: Float
  sentiment: Float
  social_dominance: Float
  social_volume_24h: Float
  symbol: String
  topic: String
  volume_24h: Float
}

type StockTimeSeriesItem {
  alt_rank: Int
  close: Float
  contributors_active: Int
  contributors_created: Int
  galaxy_score: Float
  high: Float
  interactions: Float
  low: Float
  market_cap: Float
  market_dominance: Float
  open: Float
  posts_active: Int
  posts_created: Int
  sentiment: Float
  social_dominance: Float
  spam: Int
  time: Int
}

type SystemChange {
  asset_id: String
  asset_name: String
  asset_type: String
  change: String
  description: String
  time: Int
}

enum TimeInterval {
  FOUR_HOURS
  ONE_DAY
  ONE_HOUR
  ONE_MONTH
  ONE_WEEK
}

type TokenResponse {
  expiresIn: String!
  token: String!
  user: User!
}

type Topic {
  category: String!
  createdAt: String!
  description: String
  topic: String!
}

type TopicCreator {
  creator_avatar: String
  creator_display_name: String
  creator_followers: Float
  creator_id: String
  creator_name: String
  followers: Float
  id: String
  interactions_24h: Float
  name: String
}

type TopicDetails {
  categories: [String]
  interactions_24h: Float
  num_contributors: Int
  num_posts: Int
  related_topics: [String]
  title: String
  topic: String
  topic_rank: Int
  trend: String
  types_count: JSON
  types_interactions: JSON
  types_sentiment: JSON
  types_sentiment_detail: JSON
}

type TopicListItem {
  interactions_24h: Float
  num_contributors: Float
  num_posts: Float
  title: String
  topic: String
  topic_rank: Int
  topic_rank_1h_previous: Int
  topic_rank_24h_previous: Int
}

type TopicNews {
  creator_avatar: String
  creator_display_name: String
  creator_followers: Float
  creator_id: String
  creator_name: String
  id: String
  interactions_24h: Float
  interactions_total: Float
  post_created: Int
  post_image: String
  post_link: String
  post_sentiment: Float
  post_title: String
  post_type: String
}

type TopicPost {
  creator_avatar: String
  creator_display_name: String
  creator_followers: Float
  creator_id: String
  creator_name: String
  id: String
  interactions_24h: Float
  interactions_total: Float
  post_created: Int
  post_image: String
  post_link: String
  post_sentiment: Float
  post_title: String
  post_type: String
}

type TopicTimeSeriesItem {
  alt_rank: Int
  circulating_supply: Float
  close: Float
  contributors_active: Int
  contributors_created: Int
  galaxy_score: Float
  high: Float
  interactions: Float
  low: Float
  market_cap: Float
  market_dominance: Float
  open: Float
  posts_active: Int
  posts_created: Int
  sentiment: Float
  social_dominance: Float
  spam: Int
  time: Int
  volume_24h: Float
}

type TopicWhatsup {
  summary: String
}

type User {
  id: String!
  lastSeen: String!
  type: String!
}

type UserPreferences {
  currency: String
  favoriteTopics: [String!]
  notifications: Boolean
  theme: String
}

input UserPreferencesInput {
  currency: String
  favoriteTopics: [String!]
  notifications: Boolean
  theme: String
}`;

export default typeDefs;
