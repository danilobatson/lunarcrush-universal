// Generated TypeScript types for LunarCrush Universal API
// This file is auto-generated from GraphQL schema
// Generated: 2025-07-25T05:29:09.285Z

export enum TimeInterval {
  ONE_DAY = 'ONE_DAY',
  ONE_WEEK = 'ONE_WEEK',
  ONE_MONTH = 'ONE_MONTH',
  THREE_MONTHS = 'THREE_MONTHS',
  SIX_MONTHS = 'SIX_MONTHS',
  ONE_YEAR = 'ONE_YEAR',
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface ApiConfig {
  topic?: string | null;
  id?: string | null;
  name?: string | null;
  symbol?: string | null;
  interval?: string | null;
  start?: number | null;
  end?: number | null;
  bucket?: string | null;
  metrics?: string[] | null;
  generated?: number | null;
  sort?: string | null;
  desc?: boolean | null;
  limit?: number | null;
  page?: number | null;
  total_rows?: number | null;
  category?: string | null;
  remote_api?: string | null;
}

export interface TopicListItem {
  topic?: string | null;
  title?: string | null;
  topic_rank?: number | null;
  topic_rank_1h_previous?: number | null;
  topic_rank_24h_previous?: number | null;
  num_contributors?: number | null;
  num_posts?: number | null;
  interactions_24h?: number | null;
}

export interface TopicDetails {
  topic?: string | null;
  title?: string | null;
  topic_rank?: number | null;
  related_topics?: string[] | null;
  interactions_24h?: number | null;
  num_contributors?: number | null;
  num_posts?: number | null;
  categories?: string[] | null;
  trend?: string | null;
}

export interface TopicTimeSeriesItem {
  time?: number | null;
  contributors_active?: number | null;
  contributors_created?: number | null;
  interactions?: number | null;
  posts_active?: number | null;
  posts_created?: number | null;
  sentiment?: number | null;
  spam?: number | null;
  alt_rank?: number | null;
  circulating_supply?: number | null;
  close?: number | null;
  galaxy_score?: number | null;
  high?: number | null;
  low?: number | null;
  market_cap?: number | null;
  market_dominance?: number | null;
  open?: number | null;
  social_dominance?: number | null;
  volume_24h?: number | null;
}

export interface TopicPost {
  id?: string | null;
  post_type?: string | null;
  post_title?: string | null;
  post_link?: string | null;
  post_image?: string | null;
  post_created?: number | null;
  post_sentiment?: number | null;
  creator_id?: string | null;
  creator_name?: string | null;
  creator_display_name?: string | null;
  creator_followers?: number | null;
  creator_avatar?: string | null;
  interactions_24h?: number | null;
  interactions_total?: number | null;
}

export interface TopicNews {
  id?: string | null;
  post_type?: string | null;
  post_title?: string | null;
  post_link?: string | null;
  post_image?: string | null;
  post_created?: number | null;
  post_sentiment?: number | null;
  creator_id?: string | null;
  creator_name?: string | null;
  creator_display_name?: string | null;
  creator_followers?: number | null;
  creator_avatar?: string | null;
  interactions_24h?: number | null;
  interactions_total?: number | null;
}

export interface TopicCreator {
  creator_id?: string | null;
  creator_name?: string | null;
  creator_avatar?: string | null;
  creator_followers?: number | null;
  creator_rank?: number | null;
  interactions_24h?: number | null;
}

export interface TopicWhatsup {
  config?: JSON | null;
  summary?: string | null;
}

export interface CategoryListItem {
  category?: string | null;
  title?: string | null;
  category_rank?: number | null;
  category_rank_1h_previous?: number | null;
  category_rank_24h_previous?: number | null;
  num_contributors?: number | null;
  social_dominance?: number | null;
  num_posts?: number | null;
  interactions_24h?: number | null;
}

export interface CategoryDetails {
  topic?: string | null;
  title?: string | null;
  related_topics?: string[] | null;
  interactions_24h?: number | null;
  num_contributors?: number | null;
  num_posts?: number | null;
  trend?: string | null;
}

export interface CategoryTopic {
  topic?: string | null;
  title?: string | null;
  topic_rank?: number | null;
  topic_rank_1h_previous?: number | null;
  topic_rank_24h_previous?: number | null;
  num_contributors?: number | null;
  social_dominance?: number | null;
  num_posts?: number | null;
  interactions_24h?: number | null;
}

export interface CategoryTimeSeriesItem {
  time?: number | null;
  contributors_active?: number | null;
  contributors_created?: number | null;
  interactions?: number | null;
  posts_active?: number | null;
  posts_created?: number | null;
  sentiment?: number | null;
  spam?: number | null;
}

export interface CategoryPost {
  id?: string | null;
  post_type?: string | null;
  post_title?: string | null;
  post_link?: string | null;
  post_image?: string | null;
  post_created?: number | null;
  post_sentiment?: number | null;
  creator_id?: string | null;
  creator_name?: string | null;
  creator_display_name?: string | null;
  creator_followers?: number | null;
  creator_avatar?: string | null;
  interactions_24h?: number | null;
  interactions_total?: number | null;
}

export interface CategoryNews {
  id?: string | null;
  post_type?: string | null;
  post_title?: string | null;
  post_link?: string | null;
  post_image?: string | null;
  post_created?: number | null;
  post_sentiment?: number | null;
  creator_id?: string | null;
  creator_name?: string | null;
  creator_display_name?: string | null;
  creator_followers?: number | null;
  creator_avatar?: string | null;
  interactions_24h?: number | null;
  interactions_total?: number | null;
}

export interface CategoryCreator {
  creator_id?: string | null;
  creator_name?: string | null;
  creator_avatar?: string | null;
  creator_followers?: number | null;
  creator_rank?: number | null;
  interactions_24h?: number | null;
}

export interface CreatorListItem {
  creator_name?: string | null;
  creator_display_name?: string | null;
  creator_id?: string | null;
  creator_network?: string | null;
  creator_avatar?: string | null;
  creator_followers?: number | null;
  creator_posts?: number | null;
  creator_rank?: number | null;
  interactions_24h?: number | null;
}

export interface CreatorDetails {
  creator_id?: string | null;
  creator_name?: string | null;
  creator_display_name?: string | null;
  creator_avatar?: string | null;
  creator_followers?: number | null;
  creator_rank?: string | null;
  interactions_24h?: number | null;
  topic_influence?: TopicInfluence[] | null;
}

export interface TopicInfluence {
  topic?: string | null;
  count?: number | null;
  percent?: number | null;
  rank?: number | null;
}

export interface CreatorTimeSeriesItem {
  time?: number | null;
  followers?: number | null;
  interactions?: number | null;
  posts_active?: number | null;
  creator_rank?: number | null;
}

export interface CreatorPost {
  id?: string | null;
  post_type?: string | null;
  post_title?: string | null;
  post_created?: number | null;
  post_sentiment?: number | null;
  post_link?: string | null;
  post_image?: string | null;
  creator_id?: string | null;
  creator_name?: string | null;
  creator_display_name?: string | null;
  creator_followers?: number | null;
  creator_avatar?: string | null;
  interactions_24h?: number | null;
  interactions_total?: number | null;
}

export interface PostDetails {
  id?: string | null;
  title?: string | null;
  description?: string | null;
  extraText?: string | null;
  metrics?: JSON | null;
  image?: JSON | null;
  video?: JSON | null;
  images?: JSON | null;
  creator_id?: string | null;
  creator_name?: string | null;
  creator_display_name?: string | null;
  creator_avatar?: string | null;
  topics?: string[] | null;
  categories?: string[] | null;
}

export interface PostTimeSeriesItem {
  time?: string | null;
  interactions?: number | null;
}

export interface CoinListItem {
  id?: number | null;
  symbol?: string | null;
  name?: string | null;
  price?: number | null;
  price_btc?: number | null;
  volume_24h?: number | null;
  volatility?: number | null;
  circulating_supply?: number | null;
  max_supply?: number | null;
  percent_change_1h?: number | null;
  percent_change_24h?: number | null;
  percent_change_7d?: number | null;
  market_cap?: number | null;
  market_cap_rank?: number | null;
  interactions_24h?: number | null;
  social_volume_24h?: number | null;
  social_dominance?: number | null;
  market_dominance?: number | null;
  market_dominance_prev?: number | null;
  galaxy_score?: number | null;
  galaxy_score_previous?: number | null;
  alt_rank?: number | null;
  alt_rank_previous?: number | null;
  sentiment?: number | null;
  categories?: string | null;
  blockchains?: BlockchainInfo[] | null;
  percent_change_30d?: number | null;
  last_updated_price?: number | null;
  last_updated_price_by?: string | null;
  topic?: string | null;
  logo?: string | null;
}

export interface BlockchainInfo {
  network?: string | null;
  address?: string | null;
  decimals?: number | null;
}

export interface CoinDetails {
  id?: number | null;
  name?: string | null;
  symbol?: string | null;
  price?: number | null;
  price_btc?: number | null;
  market_cap?: number | null;
  percent_change_24h?: number | null;
  percent_change_7d?: number | null;
  percent_change_30d?: number | null;
  volume_24h?: number | null;
  max_supply?: number | null;
  circulating_supply?: number | null;
  close?: number | null;
  galaxy_score?: number | null;
  alt_rank?: number | null;
  volatility?: number | null;
  market_cap_rank?: number | null;
}

export interface CoinTimeSeriesItem {
  time?: number | null;
  contributors_active?: number | null;
  contributors_created?: number | null;
  interactions?: number | null;
  posts_active?: number | null;
  posts_created?: number | null;
  sentiment?: number | null;
  spam?: number | null;
  alt_rank?: number | null;
  circulating_supply?: number | null;
  close?: number | null;
  galaxy_score?: number | null;
  high?: number | null;
  low?: number | null;
  market_cap?: number | null;
  market_dominance?: number | null;
  open?: number | null;
  social_dominance?: number | null;
  volume_24h?: number | null;
}

export interface CoinMetadata {
  id?: number | null;
  name?: string | null;
  symbol?: string | null;
  market_categories?: string | null;
  updated?: number | null;
  blockchain?: BlockchainInfo[] | null;
  short_summary?: string | null;
  description?: string | null;
  github_link?: string | null;
  website_link?: string | null;
  whitepaper_link?: string | null;
  twitter_link?: string | null;
  reddit_link?: string | null;
  header_image?: string | null;
  header_text?: string | null;
  videos?: string | null;
  coingecko_link?: string | null;
  coinmarketcap_link?: string | null;
}

export interface StockListItem {
  id?: number | null;
  symbol?: string | null;
  name?: string | null;
  price?: number | null;
  volume_24h?: number | null;
  percent_change_24h?: number | null;
  market_cap?: number | null;
  market_cap_rank?: number | null;
  interactions_24h?: number | null;
  social_volume_24h?: number | null;
  social_dominance?: number | null;
  market_dominance?: number | null;
  market_dominance_prev?: number | null;
  galaxy_score?: number | null;
  galaxy_score_previous?: number | null;
  alt_rank?: number | null;
  alt_rank_previous?: number | null;
  sentiment?: number | null;
  categories?: string | null;
  topic?: string | null;
  logo?: string | null;
}

export interface StockDetails {
  id?: number | null;
  name?: string | null;
  symbol?: string | null;
  price?: number | null;
  market_cap?: number | null;
  percent_change_24h?: number | null;
  volume_24h?: number | null;
  close?: number | null;
  market_cap_rank?: number | null;
}

export interface StockTimeSeriesItem {
  time?: number | null;
  contributors_active?: number | null;
  contributors_created?: number | null;
  interactions?: number | null;
  posts_active?: number | null;
  posts_created?: number | null;
  sentiment?: number | null;
  spam?: number | null;
  alt_rank?: number | null;
  galaxy_score?: number | null;
  social_dominance?: number | null;
}

export interface NftListItem {
  id?: number | null;
  lunar_id?: string | null;
  base_crypto?: string | null;
  name?: string | null;
  floor_price?: number | null;
  volume_24h?: number | null;
  percent_change_24h?: number | null;
  market_cap?: number | null;
  interactions_24h?: number | null;
  social_volume_24h?: number | null;
  social_contributors?: number | null;
  social_dominance?: number | null;
  galaxy_score?: number | null;
  alt_rank?: number | null;
  logo?: string | null;
}

export interface NftDetails {
  id?: number | null;
  name?: string | null;
  floor_price?: number | null;
  market_cap?: number | null;
  percent_change_24h?: number | null;
  volume_24h?: number | null;
}

export interface NftTimeSeriesItem {
  time?: number | null;
  market_cap?: number | null;
  alt_rank?: number | null;
  contributors_active?: number | null;
  contributors_created?: number | null;
  posts_active?: number | null;
  posts_created?: number | null;
  interactions?: number | null;
  social_dominance?: number | null;
  sentiment?: number | null;
}

export interface SystemChange {
  asset_type?: string | null;
  asset_id?: number | null;
  asset_name?: string | null;
  change?: string | null;
  description?: string | null;
  time?: number | null;
}

export interface SearchList {
  id?: string | null;
  name?: string | null;
  search_json?: JSON | null;
  priority?: boolean | null;
  created?: number | null;
}

