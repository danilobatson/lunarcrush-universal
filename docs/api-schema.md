# LunarCrush Universal API Schema

> 🚨 **AUTO-GENERATED** - Do not edit manually!
>
> **Single Source of Truth:** `schema/schema.graphql`
>
> Generated from: `schema/schema.graphql`
> Command: `yarn codegen`
>
> All code generation, type definitions, and schema references
> should use `schema/schema.graphql` as the canonical source.

## GraphQL Schema

type Blockchain {
  address: String
  decimals: Int
  network: String
  type: String
}

type CategoryCreator {
  creator_avatar: String
  creator_followers: Float
  creator_id: String
  creator_name: String
  creator_rank: Int
  interactions_24h: Float
}

type CategoryDetails {
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
  types_sentiment_detail: JSON
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
  topic: Int
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
  blockchains: [Blockchain]
  categories: String
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
  blockchain: [Blockchain]
  coingecko_link: String
  coinmarketcap_link: String
  description: String
  github_link: String
  header_image: String
  header_text: String
  id: Int
  market_categories: String
  name: String
  reddit_link: String
  short_summary: String
  symbol: String
  twitter_link: String
  updated: Float
  videos: String
  website_link: String
  whitepaper_link: String
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
  creator_rank: String
  interactions_24h: Float
  topic_influence: [TopicInfluence]
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
  post_created: Float
  post_image: String
  post_link: String
  post_sentiment: Float
  post_title: String
  post_type: String
}

type CreatorTimeSeriesItem {
  creator_rank: Float
  followers: Float
  interactions: Float
  posts_active: Int
  time: Float
}

scalar Date

scalar JSON

type NftDetails {
  floor_price: Float
  id: Int
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
  id: Int
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

type PingResponse {
  status: String!
  timestamp: String!
}

type PostDetails {
  categories: [String]
  creator_avatar: String
  creator_display_name: String
  creator_id: String
  creator_name: String
  description: String
  extraText: String
  id: String
  image: PostImage
  images: [String]
  metrics: PostMetrics
  title: String
  topics: [String]
  type: String
  video: String
}

type PostImage {
  height: Int
  src: String
  width: Int
}

type PostMetrics {
  bookmarks: Int
  favorites: Int
  replies: Int
  retweets: Int
  views: Int
}

type PostTimeSeriesItem {
  interactions: Float
  time: String
}

type Query {
  getCategoriesList: [CategoryListItem]
  getCategory(category: String!): CategoryDetails
  getCategoryCreators(category: String!): [CategoryCreator]
  getCategoryNews(category: String!): [CategoryNews]
  getCategoryPosts(category: String!, end: UnixTimestamp, start: UnixTimestamp): [CategoryPost]
  getCategoryTimeSeries(bucket: String, category: String!, end: UnixTimestamp, interval: String, start: UnixTimestamp): [CategoryTimeSeriesItem]
  getCategoryTopics(category: String!): [CategoryTopic]
  getCoin(coin: String!): CoinDetails
  getCoinMeta(coin: String!): CoinMeta
  getCoinTimeSeries(bucket: String, coin: String!, end: UnixTimestamp, interval: String, start: UnixTimestamp): [CoinTimeSeriesItem]
  getCoinsList(desc: String, filter: String, limit: Int, page: Int, sort: String): [CoinListItem]
  getCoinsListV2(desc: String, filter: String, limit: Int, page: Int, sort: String): [CoinListItem]
  getCreator(id: String!, network: String!): CreatorDetails
  getCreatorPosts(end: UnixTimestamp, id: String!, network: String!, start: UnixTimestamp): [CreatorPost]
  getCreatorTimeSeries(bucket: String, end: UnixTimestamp, id: String!, interval: String, network: String!, start: UnixTimestamp): [CreatorTimeSeriesItem]
  getCreatorsList: [CreatorListItem]
  getNft(id: String!): NftDetails
  getNftTimeSeries(bucket: String, end: UnixTimestamp, id: String!, interval: String, start: UnixTimestamp): [NftTimeSeriesItem]
  getNftTimeSeriesV2(bucket: String, end: UnixTimestamp, interval: String, nft: String!, start: UnixTimestamp): [NftTimeSeriesItem]
  getNftsList(desc: String, limit: Int, page: Int, sort: String): [NftListItem]
  getNftsListV2(desc: String, limit: Int, page: Int, sort: String): [NftListItem]
  getPostDetails(post_id: String!, post_type: String!): PostDetails
  getPostTimeSeries(post_id: String!, post_type: String!): [PostTimeSeriesItem]
  getStock(stock: String!): StockDetails
  getStockTimeSeries(bucket: String, end: UnixTimestamp, interval: String, start: UnixTimestamp, stock: String!): [StockTimeSeriesItem]
  getStocksList: [StockListItem]
  getStocksListV2(desc: String, limit: Int, page: Int, sort: String): [StockListItem]
  getSystemChanges(end: UnixTimestamp, start: UnixTimestamp): [SystemChange]
  getTopic(topic: String!): TopicDetails
  getTopicCreators(topic: String!): [TopicCreator]
  getTopicNews(topic: String!): [TopicNews]
  getTopicPosts(end: UnixTimestamp, start: UnixTimestamp, topic: String!): [TopicPost]
  getTopicTimeSeries(bucket: String, end: UnixTimestamp, interval: String, start: UnixTimestamp, topic: String!): [TopicTimeSeriesItem]
  getTopicTimeSeriesV2(bucket: String, topic: String!): [TopicTimeSeriesItem]
  getTopicWhatsup(topic: String!): TopicWhatsup
  getTopicsList: [TopicListItem]
  health: String
  hello: String
  ping: PingResponse
  systemHealth: SystemHealthResponse
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
  categories: String
  galaxy_score: Float
  galaxy_score_previous: Float
  id: Int
  interactions_24h: Float
  last_updated_price: Int
  last_updated_price_by: String
  logo: String
  market_cap: String
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

type SystemHealthResponse {
  status: String!
  timestamp: String!
  uptime: Int!
  version: String!
}

enum TimeInterval {
  FOUR_HOURS
  ONE_DAY
  ONE_HOUR
  ONE_MONTH
  ONE_WEEK
}

type Topic {
  category: String!
  createdAt: String!
  description: String
  topic: String!
}

type TopicCreator {
  creator_avatar: String
  creator_followers: Float
  creator_id: String
  creator_name: String
  creator_rank: Float
  interactions_24h: Float
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

type TopicInfluence {
  count: Int
  percent: Float
  rank: Int
  topic: String
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
  post_created: Float
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

scalar UnixTimestamp

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
}