// 🌙 LunarCrush Universal SDK - Comprehensive API Types
// =====================================================
// Comprehensive types matching backend GraphQL schema exactly

export interface LunarCrushResponse<T = any> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
    path?: Array<string | number>;
  }>;
}

// ===== COMPREHENSIVE TOPIC TYPES =====

export interface TopicDetails {
  topic: string;
  title: string;
  topic_rank: number;
  related_topics: string[];
  types_count: any;
  types_interactions: any;
  types_sentiment: any;
  types_sentiment_detail: any;
  interactions_24h: number;
  num_contributors: number;
  num_posts: number;
  categories: string[];
  trend: string;
}

export interface TopicListItem {
  topic: string;
  title: string;
  topic_rank: number;
  topic_rank_1h_previous: number;
  topic_rank_24h_previous: number;
  num_contributors: number;
  num_posts: number;
  interactions_24h: number;
}

export interface TopicTimeSeriesItem {
  time: number;
  contributors_active?: number;
  contributors_created?: number;
  interactions?: number;
  posts_active?: number;
  posts_created?: number;
  sentiment?: number;
  spam?: number;
  alt_rank?: number;
  circulating_supply?: number;
  close?: number;
  galaxy_score?: number;
  high?: number;
  low?: number;
  market_cap?: number;
  market_dominance?: number;
  open?: number;
  social_dominance?: number;
  volume_24h?: number;
}

export interface TopicPost {
  id: string;
  post_type: string;
  post_title: string;
  post_link: string;
  post_image?: string;
  post_created: number;
  post_sentiment: number;
  creator_id: string;
  creator_name: string;
  creator_display_name: string;
  creator_followers: number;
  creator_avatar: string;
  interactions_24h: number;
  interactions_total: number;
}

// ===== COMPREHENSIVE COIN TYPES =====

export interface CoinListItem {
  id: number;
  symbol: string;
  name: string;
  price: number;
  price_btc: number;
  volume_24h: number;
  volatility: number;
  circulating_supply: number;
  max_supply?: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  market_cap: number;
  market_cap_rank: number;
  interactions_24h: number;
  social_volume_24h: number;
  social_dominance: number;
  market_dominance: number;
  market_dominance_prev: number;
  galaxy_score: number;
  galaxy_score_previous: number;
  alt_rank: number;
  alt_rank_previous: number;
  sentiment?: number;
  categories: string;
  blockchains?: BlockchainInfo[];
  last_updated_price: number;
  last_updated_price_by: string;
  topic: string;
  logo: string;
}

export interface BlockchainInfo {
  type?: string;
  network?: string;
  address?: string;
  decimals?: number;
}

export interface CoinDetails {
  id: number;
  name: string;
  symbol: string;
  price: number;
  price_btc: number;
  market_cap: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  volume_24h: number;
  max_supply?: number;
  circulating_supply: number;
  close: number;
  galaxy_score: number;
  alt_rank: number;
  volatility: number;
  market_cap_rank: number;
}

// ===== COMPREHENSIVE STOCK TYPES =====

export interface StockListItem {
  id: number;
  symbol: string;
  name: string;
  price: number;
  volume_24h: number;
  percent_change_24h: number;
  market_cap: number;
  market_cap_rank: number;
  interactions_24h: number;
  social_volume_24h: number;
  social_dominance: number;
  market_dominance: number;
  market_dominance_prev?: number;
  galaxy_score: number;
  galaxy_score_previous: number;
  alt_rank: number;
  alt_rank_previous: number;
  sentiment?: number;
  categories: string;
  topic: string;
  logo: string;
}

export interface StockDetails {
  id: number;
  name: string;
  symbol: string;
  price: number;
  market_cap: number;
  percent_change_24h: number;
  volume_24h: number;
  close: number;
  market_cap_rank: number;
}

// ===== COMPREHENSIVE CATEGORY TYPES =====

export interface CategoryListItem {
  category: string;
  title: string;
  category_rank: number;
  category_rank_1h_previous: number;
  category_rank_24h_previous: number;
  num_contributors: number;
  social_dominance: number;
  num_posts: number;
  interactions_24h: number;
}

export interface CategoryDetails {
  topic: string;
  title: string;
  related_topics: string[];
  types_count: any;
  types_interactions: any;
  types_sentiment: any;
  types_sentiment_detail: any;
  interactions_24h: number;
  num_contributors: number;
  num_posts: number;
  trend: string;
}

// ===== COMPREHENSIVE CREATOR TYPES =====

export interface CreatorListItem {
  creator_name: string;
  creator_display_name: string;
  creator_id: string;
  creator_network: string;
  creator_avatar: string;
  creator_followers: number;
  creator_posts: number;
  creator_rank: number;
  interactions_24h: number;
}

export interface CreatorDetails {
  creator_id: string;
  creator_name: string;
  creator_display_name: string;
  creator_avatar: string;
  creator_followers: number;
  creator_rank: string;
  interactions_24h: number;
  topic_influence: TopicInfluence[];
}

export interface TopicInfluence {
  topic: string;
  count: number;
  percent: number;
  rank: number;
}

// ===== SEARCH & SYSTEM TYPES =====

export interface SearchList {
  id: string;
  name: string;
  search_json: any;
  priority: boolean;
  created: number;
}

export interface SystemChange {
  asset_type: string;
  asset_id: number;
  asset_name: string;
  change: string;
  description: string;
  time: number;
}

// ===== REQUEST PARAMETERS =====

export interface CryptocurrencyListParams {
  sort?: string;
  filter?: string;
  limit?: number;
  desc?: string;
  page?: number;
}

export interface StockListParams {
  sort?: string;
  limit?: number;
  desc?: string;
  page?: number;
}

export interface TimeSeriesParams {
  bucket?: string;
  interval?: string;
  start?: string;
  end?: string;
}

export interface PostsParams {
  start?: string;
  end?: string;
}

export interface SearchParams {
  term?: string;
  searchJson?: string;
}

// ===== COMPREHENSIVE DATA COLLECTIONS =====

export interface ComprehensiveTopicData {
  details: TopicDetails;
  timeSeries: TopicTimeSeriesItem[];
  posts: TopicPost[];
  news: TopicPost[];
}

export interface ComprehensiveCryptoData {
  details: CoinDetails;
  timeSeries: TopicTimeSeriesItem[];
}
