import { gql } from 'graphql-tag';

export const typeDefs = gql`
  scalar Date

  type CoinData {
    id: String!
    symbol: String!
    name: String!
    price: Float!
    close: Float!
    percent_change_24h: Float!
    percent_change_7d: Float!
    market_cap: Float!
    volume_24h: Float!
    galaxy_score: Float
    alt_rank: Int
    sentiment: Float
    social_dominance: Float
    posts_24h: Int
    contributors_24h: Int
    interactions_24h: Int
    # Additional fields from coins/list endpoints
    volatility: Float
    market_cap_rank: Int
    circulating_supply: Float
    max_supply: Float
    categories: [String!]
  }

  type TimeSeriesData {
    time: String!
    price: Float!
    close: Float!
    volume: Float!
    market_cap: Float!
    sentiment: Float
    social_dominance: Float
    interactions: Int
    # Additional time series fields
    open: Float
    high: Float
    low: Float
    posts_created: Int
    contributors_active: Int
  }

  type SocialPost {
    id: String!
    platform: String!
    content: String!
    author: String!
    followers: Int!
    interactions: Int!
    sentiment: Float!
    created_at: String!
    url: String
    # Additional social post fields
    post_type: String
    network: String
    engagement_rate: Float
  }

  type Creator {
    id: String!
    name: String!
    username: String!
    network: String!
    followers: Int!
    posts_24h: Int
    interactions_24h: Int
    sentiment: Float
    creator_rank: Int
    avatar_url: String
    verified: Boolean
  }

  type Topic {
    id: String!
    name: String!
    slug: String!
    posts_24h: Int!
    interactions_24h: Int!
    contributors_24h: Int!
    sentiment: Float!
    topic_rank: Int
    social_dominance: Float
    percent_change_24h: Float
  }

  type Category {
    id: String!
    name: String!
    slug: String!
    description: String
    topics_count: Int
    posts_24h: Int
    interactions_24h: Int
  }

  type GlobalMetrics {
    total_market_cap: Float
    total_volume_24h: Float
    bitcoin_dominance: Float
    ethereum_dominance: Float
    market_cap_change_24h: Float
    volume_change_24h: Float
    total_coins: Int
    active_cryptocurrencies: Int
  }

  enum TimeInterval {
    ONE_DAY
    ONE_WEEK
    ONE_MONTH
    THREE_MONTHS
    SIX_MONTHS
    ONE_YEAR
  }

  enum SortBy {
    ALT_RANK
    GALAXY_SCORE
    PRICE
    MARKET_CAP
    VOLUME_24H
    PERCENT_CHANGE_24H
    SOCIAL_DOMINANCE
    INTERACTIONS
    SENTIMENT
  }

  type Query {
    # Single coin data
    coin(symbol: String!): CoinData
    
    # Multiple coins data with advanced filtering
    coins(
      symbols: [String!]
      limit: Int = 100
      sort: SortBy = ALT_RANK
      filter: String
    ): [CoinData!]!
    
    # Real-time coins list (updated every few seconds)
    coinsRealtime(
      limit: Int = 100
      sort: SortBy = ALT_RANK
      filter: String
    ): [CoinData!]!
    
    # Time series data for a coin
    coinTimeSeries(
      symbol: String!
      interval: TimeInterval = ONE_WEEK
      metrics: [String!] = ["price", "volume", "market_cap"]
      start: String
      end: String
    ): [TimeSeriesData!]!
    
    # Social posts mentioning a topic
    socialPosts(
      topic: String!
      interval: TimeInterval = ONE_DAY
      limit: Int = 20
      start: String
      end: String
    ): [SocialPost!]!
    
    # Top creators/influencers
    creators(
      limit: Int = 50
      sort: SortBy = INTERACTIONS
      network: String
    ): [Creator!]!
    
    # Trending topics
    topics(
      limit: Int = 50
      sort: SortBy = INTERACTIONS
    ): [Topic!]!
    
    # Categories
    categories(
      limit: Int = 20
    ): [Category!]!
    
    # Global market metrics
    globalMetrics: GlobalMetrics
    
    # Health check
    health: String!
  }

  type Subscription {
    # Real-time coin price updates (future implementation)
    coinPriceUpdates(symbols: [String!]!): CoinData!
    
    # Real-time social posts (future implementation)
    socialPostUpdates(topics: [String!]!): SocialPost!
  }
`;
