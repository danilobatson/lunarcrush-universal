import { gql } from 'graphql-tag';

export const typeDefs = gql`
  scalar Date

  type CoinData {
    id: String!
    symbol: String!
    name: String!
    price: Float!
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
  }

  type TimeSeriesData {
    time: String!
    price: Float!
    volume: Float!
    market_cap: Float!
    sentiment: Float
    social_dominance: Float
    interactions: Int
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
  }

  type GlobalMetrics {
    total_market_cap: Float
    total_volume_24h: Float
    bitcoin_dominance: Float
    ethereum_dominance: Float
    market_cap_change_24h: Float
    volume_change_24h: Float
  }

  enum TimeInterval {
    ONE_DAY
    ONE_WEEK
    ONE_MONTH
    THREE_MONTHS
    SIX_MONTHS
    ONE_YEAR
  }

  type Query {
    # Single coin data
    coin(symbol: String!): CoinData
    
    # Multiple coins data
    coins(symbols: [String!], limit: Int): [CoinData!]!
    
    # Time series data for a coin
    coinTimeSeries(
      symbol: String!
      interval: TimeInterval = ONE_WEEK
      metrics: [String!] = ["price", "volume", "market_cap"]
    ): [TimeSeriesData!]!
    
    # Social posts mentioning a topic
    socialPosts(
      topic: String!
      interval: TimeInterval = ONE_DAY
      limit: Int = 20
    ): [SocialPost!]!
    
    # Global market metrics
    globalMetrics: GlobalMetrics
    
    # Health check
    health: String!
  }

  type Subscription {
    # Real-time coin price updates (future implementation)
    coinPriceUpdates(symbols: [String!]!): CoinData!
  }
`;
