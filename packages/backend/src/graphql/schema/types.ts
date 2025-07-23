export const typeDefs = `
  scalar Date
  scalar JSON

  enum TimeInterval {
    ONE_DAY
    ONE_WEEK
    ONE_MONTH
    THREE_MONTHS
    SIX_MONTHS
    ONE_YEAR
  }

  enum SortDirection {
    ASC
    DESC
  }

  # ===== CRYPTO NESTED TYPES =====
  
  type BlockchainInfo {
    type: String
    network: String
    address: String
    decimals: Int
  }

  type TopicInfluence {
    topic: String
    count: Int
    percent: Float
    rank: Int
  }

  # ===== COMPLETE CRYPTO DATA TYPE (ALL FIELDS) =====
  type CryptoData {
    # Basic identification
    id: Int
    symbol: String
    name: String
    
    # Price data
    price: Float
    close: Float
    percent_change_24h: Float
    percent_change_7d: Float
    percent_change_1h: Float
    
    # Market data
    market_cap: Float
    market_cap_rank: Int
    volume_24h: Float
    max_supply: Float
    circulating_supply: Float
    
    # Social metrics
    galaxy_score: Float
    galaxy_score_previous: Float
    alt_rank: Int
    alt_rank_previous: Int
    interactions_24h: Float
    social_volume_24h: Float
    social_dominance: Float
    market_dominance: Float
    market_dominance_prev: Float
    sentiment: Float
    
    # Categories and blockchain
    categories: String
    blockchains: [BlockchainInfo]
    topic: String
    
    # Metadata
    logo: String
    last_updated_price: Int
    last_updated_price_by: String
    
    # Social activity
    posts_24h: Int
    contributors_24h: Int
    
    # Additional fields from various endpoints
    volatility: Float
    posts_active: Int
    contributors_active: Int
    contributors_created: Int
    posts_created: Int
    high: Float
    low: Float
    volume: Float
    spam: Int
  }

  # ===== COMPLETE CRYPTO METADATA TYPE =====
  type CryptoMetadata {
    id: Int
    symbol: String
    name: String
    description: String
    website: String
    twitter: String
    discord: String
    telegram: String
    logo: String
    blockchain: String
    header_image: String
    header_text: String
    github_link: String
    coingecko_link: String
    coinmarketcap_link: String
    forum_link: String
    market_categories: [String]
    
    # Additional metadata fields
    api_endpoints: JSON
    tags: [String]
    platform: String
    contract_address: String
    slug: String
  }

  # ===== COMPLETE SOCIAL INFLUENCER TYPE =====
  type SocialInfluencer {
    # Basic creator info
    creator_id: String
    creator_name: String
    creator_display_name: String
    creator_network: String
    creator_avatar: String
    creator_followers: Float
    creator_posts: Int
    creator_rank: Int
    
    # Social metrics
    interactions_24h: Float
    followers: Float
    posts_active: Int
    
    # Topic influence (CRITICAL DATA)
    topic_influence: [TopicInfluence]
  }

  # ===== COMPLETE TOPIC/CATEGORY DATA TYPE =====
  type TopicData {
    # Basic info
    id: Int
    topic: String
    title: String
    category: String
    
    # Rankings
    topic_rank: Int
    topic_rank_1h_previous: Int
    topic_rank_24h_previous: Int
    category_rank: Int
    category_rank_1h_previous: Int
    category_rank_24h_previous: Int
    
    # Social metrics
    interactions_24h: Float
    num_contributors: Int
    num_posts: Int
    social_dominance: Float
    sentiment: Float
    
    # Categories and relationships
    categories: [String]
    related_topics: [String]
    trend: String
    
    # Platform breakdown (CRITICAL DATA)
    types_count: JSON
    types_interactions: JSON
    types_sentiment: JSON
    types_sentiment_detail: JSON
  }

  # ===== COMPLETE SOCIAL POST TYPE =====
  type SocialPost {
    # Post identification
    id: String
    post_type: String
    post_title: String
    post_link: String
    post_image: String
    post_created: Int
    post_sentiment: Float
    
    # Creator info
    creator_id: String
    creator_name: String
    creator_display_name: String
    creator_followers: Float
    creator_avatar: String
    creator_network: String
    
    # Engagement metrics
    interactions_24h: Float
    interactions_total: Float
    
    # Additional post fields
    post_url: String
    post_content: String
    post_description: String
    mentions: [String]
    hashtags: [String]
    media_urls: [String]
  }

  # ===== COMPLETE TIME SERIES TYPE =====
  type TimeSeriesData {
    # Time identification
    time: String
    
    # Price data
    price: Float
    close: Float
    high: Float
    low: Float
    volume: Float
    
    # Market data
    market_cap: Float
    circulating_supply: Float
    
    # Social metrics
    sentiment: Float
    social_dominance: Float
    interactions: Float
    alt_rank: Int
    galaxy_score: Float
    
    # Activity metrics
    contributors_active: Int
    contributors_created: Int
    posts_active: Int
    posts_created: Int
    spam: Int
    
    # Additional time series fields
    market_dominance: Float
    social_volume: Float
    mentions: Int
    engagement_rate: Float
  }

  # ===== COMPLETE STOCK DATA TYPE =====
  type StockData {
    # Basic identification
    id: Int
    symbol: String
    name: String
    
    # Price data
    price: Float
    close: Float
    percent_change_24h: Float
    volume_24h: Float
    
    # Market data
    market_cap: Float
    market_cap_rank: Int
    
    # Social metrics
    interactions_24h: Float
    social_volume_24h: Float
    social_dominance: Float
    market_dominance: Float
    market_dominance_prev: Float
    galaxy_score: Float
    galaxy_score_previous: Float
    alt_rank: Int
    alt_rank_previous: Int
    sentiment: Float
    
    # Categories and metadata
    categories: String
    topic: String
    logo: String
    
    # Additional stock fields
    volume: Float
    posts_24h: Int
    contributors_24h: Int
    sector: String
    industry: String
    exchange: String
  }

  # ===== POST DETAILS TYPE =====
  type PostDetails {
    # All post-specific fields
    id: String
    platform: String
    content: String
    author: String
    author_id: String
    author_followers: Int
    author_avatar: String
    
    # Engagement
    interactions: Int
    likes: Int
    shares: Int
    comments: Int
    views: Int
    
    # Metadata
    created_at: String
    updated_at: String
    url: String
    media_type: String
    media_url: String
    
    # Analysis
    sentiment: Float
    topics: [String]
    mentions: [String]
    hashtags: [String]
  }

  # ===== COMPLETE QUERY TYPE WITH ALL ENDPOINTS =====
  type Query {
    # Health check
    health: String!

    # ===== CRYPTO QUERIES - ALL FIELDS EXPOSED =====
    getCrypto(symbol: String!): CryptoData
    getCryptoList(
      symbols: [String!]
      limit: Int
      realtime: Boolean
      sort: String
      filter: String
    ): [CryptoData!]!
    getCryptoListV2(
      symbols: [String!]
      limit: Int
      sort: String
      filter: String
    ): [CryptoData!]!
    getCryptoPriceHistory(
      symbol: String!
      interval: String
      metrics: String
    ): [TimeSeriesData!]!
    getCryptoMetadata(symbol: String!): CryptoMetadata

    # ===== SOCIAL INFLUENCER QUERIES - ALL FIELDS =====
    getSocialInfluencers(
      limit: Int
      sort: String
    ): [SocialInfluencer!]!
    getSocialInfluencer(
      platform: String!
      id: String!
    ): SocialInfluencer
    getInfluencerPosts(
      platform: String!
      id: String!
      start: String
      end: String
    ): [SocialPost!]!
    getCreatorTimeSeries(
      platform: String!
      id: String!
      interval: String
    ): [TimeSeriesData!]!

    # ===== SOCIAL POST QUERIES - ALL FIELDS =====
    getSocialPosts(
      topic: String!
      start: String
      end: String
    ): [SocialPost!]!

    # ===== TOPIC CATEGORY QUERIES - ALL FIELDS =====
    getTopicCategories(limit: Int): [TopicData!]!
    getTopicCategory(category: String!): TopicData
    getCategoryPosts(
      category: String!
      start: String
      end: String
    ): [SocialPost!]!
    getCategoryTimeSeries(
      category: String!
      interval: String
    ): [TimeSeriesData!]!
    getCategoryCreators(category: String!): [SocialInfluencer!]!
    getCategoryNews(category: String!): [SocialPost!]!
    getCategoryTopics(category: String!): [TopicData!]!

    # ===== TOPIC QUERIES - ALL FIELDS =====
    getTopicCreators(topic: String!): [SocialInfluencer!]!
    getTopic(topic: String!): TopicData
    getTopicTimeSeries(
      topic: String!
      interval: String
    ): [TimeSeriesData!]!

    # ===== POST QUERIES - ALL FIELDS =====
    getPostDetails(
      postType: String!
      postId: String!
    ): PostDetails
    getPostTimeSeries(
      postType: String!
      postId: String!
    ): [TimeSeriesData!]!

    # ===== STOCK QUERIES (v1 & v2 for different subscription levels) =====
    getStocksList: [StockData!]!          # v1 - Basic plan (no sentiment data)
    getStocksListV2: [StockData!]!        # v2 - Premium plan (includes sentiment + social metrics)
  }

  # ===== FUTURE SUBSCRIPTIONS =====
  type Subscription {
    # Real-time updates
    cryptoPriceUpdates(symbol: String): CryptoData
    socialSentimentUpdates(topic: String): SocialPost
    influencerUpdates(creatorId: String): SocialInfluencer
    topicTrendingUpdates: TopicData
  }
`;
