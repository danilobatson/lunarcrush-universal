// 🌙 LunarCrush Universal SDK - Comprehensive GraphQL Queries
// =============================================================
// Generated to match ALL backend schema fields exactly
// No more limited data returns - 100% backend coverage!

// ===== HEALTH QUERY =====
export const HEALTH_QUERY = `query { health }`;

// ===== TOPIC QUERIES =====
export const GET_TOPIC_QUERY = `
  query GetTopic($topic: String!) {
    getTopic(topic: $topic) {
      topic
      title
      topic_rank
      related_topics
      types_count
      types_interactions
      types_sentiment
      types_sentiment_detail
      interactions_24h
      num_contributors
      num_posts
      categories
      trend
    }
  }
`;

export const GET_TOPICS_LIST_QUERY = `
  query GetTopicsList {
    getTopicsList {
      topic
      title
      topic_rank
      topic_rank_1h_previous
      topic_rank_24h_previous
      num_contributors
      num_posts
      interactions_24h
    }
  }
`;

// ===== COIN QUERIES =====
export const GET_COINS_LIST_QUERY = `
  query GetCoinsList(
    $sort: String
    $filter: String
    $limit: Int
    $desc: String
    $page: Int
  ) {
    getCoinsList(
      sort: $sort
      filter: $filter
      limit: $limit
      desc: $desc
      page: $page
    ) {
      id
      symbol
      name
      price
      price_btc
      volume_24h
      volatility
      circulating_supply
      max_supply
      percent_change_1h
      percent_change_24h
      percent_change_7d
      percent_change_30d
      market_cap
      market_cap_rank
      interactions_24h
      social_volume_24h
      social_dominance
      market_dominance
      market_dominance_prev
      galaxy_score
      galaxy_score_previous
      alt_rank
      alt_rank_previous
      sentiment
      categories
      blockchains {
        type
        network
        address
        decimals
      }
      last_updated_price
      last_updated_price_by
      topic
      logo
    }
  }
`;

export const GET_COIN_QUERY = `
  query GetCoin($coin: String!) {
    getCoin(coin: $coin) {
      id
      name
      symbol
      price
      price_btc
      market_cap
      percent_change_24h
      percent_change_7d
      percent_change_30d
      volume_24h
      max_supply
      circulating_supply
      close
      galaxy_score
      alt_rank
      volatility
      market_cap_rank
    }
  }
`;

// ===== STOCK QUERIES =====
export const GET_STOCKS_LIST_QUERY = `
  query GetStocksList(
    $sort: String
    $limit: Int
    $desc: String
    $page: Int
  ) {
    getStocksList(
      sort: $sort
      limit: $limit
      desc: $desc
      page: $page
    ) {
      id
      symbol
      name
      price
      volume_24h
      percent_change_24h
      market_cap
      market_cap_rank
      interactions_24h
      social_volume_24h
      social_dominance
      market_dominance
      market_dominance_prev
      galaxy_score
      galaxy_score_previous
      alt_rank
      alt_rank_previous
      sentiment
      categories
      topic
      logo
    }
  }
`;

export const GET_STOCK_QUERY = `
  query GetStock($stock: String!) {
    getStock(stock: $stock) {
      id
      name
      symbol
      price
      market_cap
      percent_change_24h
      volume_24h
      close
      market_cap_rank
    }
  }
`;

// ===== CATEGORY QUERIES =====
export const GET_CATEGORIES_LIST_QUERY = `
  query GetCategoriesList {
    getCategoriesList {
      category
      title
      category_rank
      category_rank_1h_previous
      category_rank_24h_previous
      num_contributors
      social_dominance
      num_posts
      interactions_24h
    }
  }
`;

export const GET_CATEGORY_QUERY = `
  query GetCategory($category: String!) {
    getCategory(category: $category) {
      topic
      title
      related_topics
      types_count
      types_interactions
      types_sentiment
      types_sentiment_detail
      interactions_24h
      num_contributors
      num_posts
      trend
    }
  }
`;

// ===== CREATOR QUERIES =====
export const GET_CREATORS_LIST_QUERY = `
  query GetCreatorsList {
    getCreatorsList {
      creator_name
      creator_display_name
      creator_id
      creator_network
      creator_avatar
      creator_followers
      creator_posts
      creator_rank
      interactions_24h
    }
  }
`;

export const GET_CREATOR_QUERY = `
  query GetCreator($network: String!, $id: String!) {
    getCreator(network: $network, id: $id) {
      creator_id
      creator_name
      creator_display_name
      creator_avatar
      creator_followers
      creator_rank
      interactions_24h
      topic_influence {
        topic
        count
        percent
        rank
      }
    }
  }
`;

// ===== TIME SERIES QUERIES =====
export const GET_TOPIC_TIME_SERIES_QUERY = `
  query GetTopicTimeSeries(
    $topic: String!
    $bucket: String
    $interval: String
    $start: String
    $end: String
  ) {
    getTopicTimeSeries(
      topic: $topic
      bucket: $bucket
      interval: $interval
      start: $start
      end: $end
    ) {
      time
      contributors_active
      contributors_created
      interactions
      posts_active
      posts_created
      sentiment
      spam
      alt_rank
      circulating_supply
      close
      galaxy_score
      high
      low
      market_cap
      market_dominance
      open
      social_dominance
      volume_24h
    }
  }
`;

export const GET_COIN_TIME_SERIES_QUERY = `
  query GetCoinTimeSeries(
    $coin: String!
    $bucket: String
    $interval: String
    $start: String
    $end: String
  ) {
    getCoinTimeSeries(
      coin: $coin
      bucket: $bucket
      interval: $interval
      start: $start
      end: $end
    ) {
      time
      contributors_active
      contributors_created
      interactions
      posts_active
      posts_created
      sentiment
      spam
      alt_rank
      circulating_supply
      close
      galaxy_score
      high
      low
      market_cap
      market_dominance
      open
      social_dominance
      volume_24h
    }
  }
`;

// ===== POSTS QUERIES =====
export const GET_TOPIC_POSTS_QUERY = `
  query GetTopicPosts(
    $topic: String!
    $start: String
    $end: String
  ) {
    getTopicPosts(topic: $topic, start: $start, end: $end) {
      id
      post_type
      post_title
      post_link
      post_image
      post_created
      post_sentiment
      creator_id
      creator_name
      creator_display_name
      creator_followers
      creator_avatar
      interactions_24h
      interactions_total
    }
  }
`;

export const GET_TOPIC_NEWS_QUERY = `
  query GetTopicNews($topic: String!) {
    getTopicNews(topic: $topic) {
      id
      post_type
      post_title
      post_link
      post_image
      post_created
      post_sentiment
      creator_id
      creator_name
      creator_display_name
      creator_followers
      creator_avatar
      interactions_24h
      interactions_total
    }
  }
`;

// ===== SEARCH QUERIES =====
export const GET_SEARCHES_LIST_QUERY = `
  query GetSearchesList {
    getSearchesList {
      id
      name
      search_json
      priority
      created
    }
  }
`;

export const SEARCH_POSTS_QUERY = `
  query SearchPosts($term: String, $searchJson: String) {
    searchPosts(term: $term, searchJson: $searchJson)
  }
`;

// ===== SYSTEM QUERIES =====
export const GET_SYSTEM_CHANGES_QUERY = `
  query GetSystemChanges {
    getSystemChanges {
      asset_type
      asset_id
      asset_name
      change
      description
      time
    }
  }
`;

// ===== COMPREHENSIVE QUERY COLLECTION =====
export const COMPREHENSIVE_QUERIES = {
  // Health
  HEALTH_QUERY,

  // Topics
  GET_TOPIC_QUERY,
  GET_TOPICS_LIST_QUERY,
  GET_TOPIC_TIME_SERIES_QUERY,
  GET_TOPIC_POSTS_QUERY,
  GET_TOPIC_NEWS_QUERY,

  // Coins
  GET_COINS_LIST_QUERY,
  GET_COIN_QUERY,
  GET_COIN_TIME_SERIES_QUERY,

  // Stocks
  GET_STOCKS_LIST_QUERY,
  GET_STOCK_QUERY,

  // Categories
  GET_CATEGORIES_LIST_QUERY,
  GET_CATEGORY_QUERY,

  // Creators
  GET_CREATORS_LIST_QUERY,
  GET_CREATOR_QUERY,

  // Search & System
  GET_SEARCHES_LIST_QUERY,
  SEARCH_POSTS_QUERY,
  GET_SYSTEM_CHANGES_QUERY,
};

// Export individual queries for convenience
export default COMPREHENSIVE_QUERIES;
