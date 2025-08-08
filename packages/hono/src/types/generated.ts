/* eslint-disable */
// ================================================================
// 🚨 AUTO-GENERATED - DO NOT EDIT MANUALLY! 🚨
// ================================================================
// Generated from: schema/schema.graphql
// Command: yarn codegen
//
// To make changes:
// 1. Edit schema/schema.graphql
// 2. Run: yarn codegen
// 3. NEVER edit this file directly!
// ================================================================

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: string; output: string; }
  JSON: { input: any; output: any; }
  UnixTimestamp: { input: string; output: string; }
}

export interface Blockchain {
  __typename?: 'Blockchain';
  address?: Maybe<Scalars['String']['output']>;
  decimals?: Maybe<Scalars['Int']['output']>;
  network?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
}

export interface CategoryCreator {
  __typename?: 'CategoryCreator';
  creator_avatar?: Maybe<Scalars['String']['output']>;
  creator_followers?: Maybe<Scalars['Float']['output']>;
  creator_id?: Maybe<Scalars['String']['output']>;
  creator_name?: Maybe<Scalars['String']['output']>;
  creator_rank?: Maybe<Scalars['Int']['output']>;
  interactions_24h?: Maybe<Scalars['Float']['output']>;
}

export interface CategoryDetails {
  __typename?: 'CategoryDetails';
  interactions_24h?: Maybe<Scalars['Float']['output']>;
  num_contributors?: Maybe<Scalars['Int']['output']>;
  num_posts?: Maybe<Scalars['Int']['output']>;
  related_topics?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title?: Maybe<Scalars['String']['output']>;
  topic?: Maybe<Scalars['String']['output']>;
  trend?: Maybe<Scalars['String']['output']>;
  types_count?: Maybe<Scalars['JSON']['output']>;
  types_interactions?: Maybe<Scalars['JSON']['output']>;
  types_sentiment?: Maybe<Scalars['JSON']['output']>;
  types_sentiment_detail?: Maybe<Scalars['JSON']['output']>;
}

export interface CategoryListItem {
  __typename?: 'CategoryListItem';
  category?: Maybe<Scalars['String']['output']>;
  category_rank?: Maybe<Scalars['Int']['output']>;
  category_rank_1h_previous?: Maybe<Scalars['Int']['output']>;
  category_rank_24h_previous?: Maybe<Scalars['Int']['output']>;
  interactions_24h?: Maybe<Scalars['Float']['output']>;
  num_contributors?: Maybe<Scalars['Float']['output']>;
  num_posts?: Maybe<Scalars['Float']['output']>;
  social_dominance?: Maybe<Scalars['Float']['output']>;
  title?: Maybe<Scalars['String']['output']>;
}

export interface CategoryNews {
  __typename?: 'CategoryNews';
  creator_avatar?: Maybe<Scalars['String']['output']>;
  creator_display_name?: Maybe<Scalars['String']['output']>;
  creator_followers?: Maybe<Scalars['Float']['output']>;
  creator_id?: Maybe<Scalars['String']['output']>;
  creator_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  interactions_24h?: Maybe<Scalars['Float']['output']>;
  interactions_total?: Maybe<Scalars['Float']['output']>;
  post_created?: Maybe<Scalars['Int']['output']>;
  post_image?: Maybe<Scalars['String']['output']>;
  post_link?: Maybe<Scalars['String']['output']>;
  post_sentiment?: Maybe<Scalars['Float']['output']>;
  post_title?: Maybe<Scalars['String']['output']>;
  post_type?: Maybe<Scalars['String']['output']>;
}

export interface CategoryPost {
  __typename?: 'CategoryPost';
  creator_avatar?: Maybe<Scalars['String']['output']>;
  creator_display_name?: Maybe<Scalars['String']['output']>;
  creator_followers?: Maybe<Scalars['Float']['output']>;
  creator_id?: Maybe<Scalars['String']['output']>;
  creator_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  interactions_24h?: Maybe<Scalars['Float']['output']>;
  interactions_total?: Maybe<Scalars['Float']['output']>;
  post_created?: Maybe<Scalars['Int']['output']>;
  post_image?: Maybe<Scalars['String']['output']>;
  post_link?: Maybe<Scalars['String']['output']>;
  post_sentiment?: Maybe<Scalars['Float']['output']>;
  post_title?: Maybe<Scalars['String']['output']>;
  post_type?: Maybe<Scalars['String']['output']>;
}

export interface CategoryTimeSeriesItem {
  __typename?: 'CategoryTimeSeriesItem';
  contributors_active?: Maybe<Scalars['Int']['output']>;
  contributors_created?: Maybe<Scalars['Int']['output']>;
  interactions?: Maybe<Scalars['Float']['output']>;
  posts_active?: Maybe<Scalars['Int']['output']>;
  posts_created?: Maybe<Scalars['Int']['output']>;
  sentiment?: Maybe<Scalars['Float']['output']>;
  spam?: Maybe<Scalars['Int']['output']>;
  time?: Maybe<Scalars['Int']['output']>;
}

export interface CategoryTopic {
  __typename?: 'CategoryTopic';
  interactions_24h?: Maybe<Scalars['Float']['output']>;
  num_contributors?: Maybe<Scalars['Float']['output']>;
  num_posts?: Maybe<Scalars['Float']['output']>;
  social_dominance?: Maybe<Scalars['Float']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  topic?: Maybe<Scalars['Int']['output']>;
  topic_rank?: Maybe<Scalars['Int']['output']>;
  topic_rank_1h_previous?: Maybe<Scalars['Int']['output']>;
  topic_rank_24h_previous?: Maybe<Scalars['Int']['output']>;
}

export interface CoinDetails {
  __typename?: 'CoinDetails';
  alt_rank?: Maybe<Scalars['Int']['output']>;
  circulating_supply?: Maybe<Scalars['Float']['output']>;
  close?: Maybe<Scalars['Float']['output']>;
  galaxy_score?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  market_cap?: Maybe<Scalars['Float']['output']>;
  market_cap_rank?: Maybe<Scalars['Int']['output']>;
  max_supply?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  percent_change_7d?: Maybe<Scalars['Float']['output']>;
  percent_change_24h?: Maybe<Scalars['Float']['output']>;
  percent_change_30d?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  price_btc?: Maybe<Scalars['Float']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  volatility?: Maybe<Scalars['Float']['output']>;
  volume_24h?: Maybe<Scalars['Float']['output']>;
}

export interface CoinListItem {
  __typename?: 'CoinListItem';
  alt_rank?: Maybe<Scalars['Int']['output']>;
  alt_rank_previous?: Maybe<Scalars['Int']['output']>;
  blockchains?: Maybe<Array<Maybe<Blockchain>>>;
  categories?: Maybe<Scalars['String']['output']>;
  circulating_supply?: Maybe<Scalars['Float']['output']>;
  galaxy_score?: Maybe<Scalars['Float']['output']>;
  galaxy_score_previous?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  interactions_24h?: Maybe<Scalars['Float']['output']>;
  last_updated_price?: Maybe<Scalars['Int']['output']>;
  last_updated_price_by?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  market_cap?: Maybe<Scalars['Float']['output']>;
  market_cap_rank?: Maybe<Scalars['Int']['output']>;
  market_dominance?: Maybe<Scalars['Float']['output']>;
  market_dominance_prev?: Maybe<Scalars['Float']['output']>;
  max_supply?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  percent_change_1h?: Maybe<Scalars['Float']['output']>;
  percent_change_7d?: Maybe<Scalars['Float']['output']>;
  percent_change_24h?: Maybe<Scalars['Float']['output']>;
  percent_change_30d?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  price_btc?: Maybe<Scalars['Float']['output']>;
  sentiment?: Maybe<Scalars['Float']['output']>;
  social_dominance?: Maybe<Scalars['Float']['output']>;
  social_volume_24h?: Maybe<Scalars['Float']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  topic?: Maybe<Scalars['String']['output']>;
  volatility?: Maybe<Scalars['Float']['output']>;
  volume_24h?: Maybe<Scalars['Float']['output']>;
}

export interface CoinMeta {
  __typename?: 'CoinMeta';
  blockchain?: Maybe<Array<Maybe<Blockchain>>>;
  coingecko_link?: Maybe<Scalars['String']['output']>;
  coinmarketcap_link?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  github_link?: Maybe<Scalars['String']['output']>;
  header_image?: Maybe<Scalars['String']['output']>;
  header_text?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  market_categories?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  reddit_link?: Maybe<Scalars['String']['output']>;
  short_summary?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  twitter_link?: Maybe<Scalars['String']['output']>;
  updated?: Maybe<Scalars['Float']['output']>;
  videos?: Maybe<Scalars['String']['output']>;
  website_link?: Maybe<Scalars['String']['output']>;
  whitepaper_link?: Maybe<Scalars['String']['output']>;
}

export interface CoinTimeSeriesItem {
  __typename?: 'CoinTimeSeriesItem';
  alt_rank?: Maybe<Scalars['Int']['output']>;
  circulating_supply?: Maybe<Scalars['Float']['output']>;
  close?: Maybe<Scalars['Float']['output']>;
  contributors_active?: Maybe<Scalars['Int']['output']>;
  contributors_created?: Maybe<Scalars['Int']['output']>;
  galaxy_score?: Maybe<Scalars['Float']['output']>;
  high?: Maybe<Scalars['Float']['output']>;
  interactions?: Maybe<Scalars['Float']['output']>;
  low?: Maybe<Scalars['Float']['output']>;
  market_cap?: Maybe<Scalars['Float']['output']>;
  market_dominance?: Maybe<Scalars['Float']['output']>;
  open?: Maybe<Scalars['Float']['output']>;
  posts_active?: Maybe<Scalars['Int']['output']>;
  posts_created?: Maybe<Scalars['Int']['output']>;
  sentiment?: Maybe<Scalars['Float']['output']>;
  social_dominance?: Maybe<Scalars['Float']['output']>;
  spam?: Maybe<Scalars['Int']['output']>;
  time?: Maybe<Scalars['Int']['output']>;
  volume_24h?: Maybe<Scalars['Float']['output']>;
}

export interface CreateTopicInput {
  category: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  topic: Scalars['String']['input'];
}

export interface CreatorDetails {
  __typename?: 'CreatorDetails';
  creator_avatar?: Maybe<Scalars['String']['output']>;
  creator_display_name?: Maybe<Scalars['String']['output']>;
  creator_followers?: Maybe<Scalars['Float']['output']>;
  creator_id?: Maybe<Scalars['String']['output']>;
  creator_name?: Maybe<Scalars['String']['output']>;
  creator_rank?: Maybe<Scalars['String']['output']>;
  interactions_24h?: Maybe<Scalars['Float']['output']>;
  topic_influence?: Maybe<Array<Maybe<TopicInfluence>>>;
}

export interface CreatorListItem {
  __typename?: 'CreatorListItem';
  creator_avatar?: Maybe<Scalars['String']['output']>;
  creator_display_name?: Maybe<Scalars['String']['output']>;
  creator_followers?: Maybe<Scalars['Float']['output']>;
  creator_id?: Maybe<Scalars['String']['output']>;
  creator_name?: Maybe<Scalars['String']['output']>;
  creator_network?: Maybe<Scalars['String']['output']>;
  creator_posts?: Maybe<Scalars['Int']['output']>;
  creator_rank?: Maybe<Scalars['Int']['output']>;
  interactions_24h?: Maybe<Scalars['Float']['output']>;
}

export interface CreatorPost {
  __typename?: 'CreatorPost';
  creator_avatar?: Maybe<Scalars['String']['output']>;
  creator_display_name?: Maybe<Scalars['String']['output']>;
  creator_followers?: Maybe<Scalars['Float']['output']>;
  creator_id?: Maybe<Scalars['String']['output']>;
  creator_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  interactions_24h?: Maybe<Scalars['Float']['output']>;
  interactions_total?: Maybe<Scalars['Float']['output']>;
  post_created?: Maybe<Scalars['Float']['output']>;
  post_image?: Maybe<Scalars['String']['output']>;
  post_link?: Maybe<Scalars['String']['output']>;
  post_sentiment?: Maybe<Scalars['Float']['output']>;
  post_title?: Maybe<Scalars['String']['output']>;
  post_type?: Maybe<Scalars['String']['output']>;
}

export interface CreatorTimeSeriesItem {
  __typename?: 'CreatorTimeSeriesItem';
  creator_rank?: Maybe<Scalars['Float']['output']>;
  followers?: Maybe<Scalars['Float']['output']>;
  interactions?: Maybe<Scalars['Float']['output']>;
  posts_active?: Maybe<Scalars['Int']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
}

export interface Mutation {
  __typename?: 'Mutation';
  createTopic: Topic;
  updateUserPreferences: UserPreferences;
}


export interface MutationCreateTopicArgs {
  input: CreateTopicInput;
}


export interface MutationUpdateUserPreferencesArgs {
  input: UserPreferencesInput;
}

export interface NftDetails {
  __typename?: 'NftDetails';
  floor_price?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  market_cap?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  percent_change_24h?: Maybe<Scalars['Float']['output']>;
  volume_24h?: Maybe<Scalars['Float']['output']>;
}

export interface NftListItem {
  __typename?: 'NftListItem';
  alt_rank?: Maybe<Scalars['Int']['output']>;
  base_crypto?: Maybe<Scalars['String']['output']>;
  floor_price?: Maybe<Scalars['Float']['output']>;
  galaxy_score?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  interactions_24h?: Maybe<Scalars['Float']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  lunar_id?: Maybe<Scalars['String']['output']>;
  market_cap?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  percent_change_24h?: Maybe<Scalars['Float']['output']>;
  social_contributors?: Maybe<Scalars['Int']['output']>;
  social_dominance?: Maybe<Scalars['Float']['output']>;
  social_volume_24h?: Maybe<Scalars['Float']['output']>;
  volume_24h?: Maybe<Scalars['Float']['output']>;
}

export interface NftTimeSeriesItem {
  __typename?: 'NftTimeSeriesItem';
  alt_rank?: Maybe<Scalars['Int']['output']>;
  contributors_active?: Maybe<Scalars['Int']['output']>;
  contributors_created?: Maybe<Scalars['Int']['output']>;
  interactions?: Maybe<Scalars['Float']['output']>;
  market_cap?: Maybe<Scalars['Float']['output']>;
  posts_active?: Maybe<Scalars['Int']['output']>;
  posts_created?: Maybe<Scalars['Int']['output']>;
  sentiment?: Maybe<Scalars['Float']['output']>;
  social_dominance?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['Int']['output']>;
}

export interface PingResponse {
  __typename?: 'PingResponse';
  status: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
}

export interface PostDetails {
  __typename?: 'PostDetails';
  categories?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  creator_avatar?: Maybe<Scalars['String']['output']>;
  creator_display_name?: Maybe<Scalars['String']['output']>;
  creator_id?: Maybe<Scalars['String']['output']>;
  creator_name?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  extraText?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<PostImage>;
  images?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  metrics?: Maybe<PostMetrics>;
  title?: Maybe<Scalars['String']['output']>;
  topics?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  type?: Maybe<Scalars['String']['output']>;
  video?: Maybe<Scalars['String']['output']>;
}

export interface PostImage {
  __typename?: 'PostImage';
  height?: Maybe<Scalars['Int']['output']>;
  src?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
}

export interface PostMetrics {
  __typename?: 'PostMetrics';
  bookmarks?: Maybe<Scalars['Int']['output']>;
  favorites?: Maybe<Scalars['Int']['output']>;
  replies?: Maybe<Scalars['Int']['output']>;
  retweets?: Maybe<Scalars['Int']['output']>;
  views?: Maybe<Scalars['Int']['output']>;
}

export interface PostTimeSeriesItem {
  __typename?: 'PostTimeSeriesItem';
  interactions?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['String']['output']>;
}

export interface Query {
  __typename?: 'Query';
  getCategoriesList?: Maybe<Array<Maybe<CategoryListItem>>>;
  getCategory?: Maybe<CategoryDetails>;
  getCategoryCreators?: Maybe<Array<Maybe<CategoryCreator>>>;
  getCategoryNews?: Maybe<Array<Maybe<CategoryNews>>>;
  getCategoryPosts?: Maybe<Array<Maybe<CategoryPost>>>;
  getCategoryTimeSeries?: Maybe<Array<Maybe<CategoryTimeSeriesItem>>>;
  getCategoryTopics?: Maybe<Array<Maybe<CategoryTopic>>>;
  getCoin?: Maybe<CoinDetails>;
  getCoinMeta?: Maybe<CoinMeta>;
  getCoinTimeSeries?: Maybe<Array<Maybe<CoinTimeSeriesItem>>>;
  getCoinsList?: Maybe<Array<Maybe<CoinListItem>>>;
  getCoinsListV2?: Maybe<Array<Maybe<CoinListItem>>>;
  getCreator?: Maybe<CreatorDetails>;
  getCreatorPosts?: Maybe<Array<Maybe<CreatorPost>>>;
  getCreatorTimeSeries?: Maybe<Array<Maybe<CreatorTimeSeriesItem>>>;
  getCreatorsList?: Maybe<Array<Maybe<CreatorListItem>>>;
  getNft?: Maybe<NftDetails>;
  getNftTimeSeries?: Maybe<Array<Maybe<NftTimeSeriesItem>>>;
  getNftTimeSeriesV2?: Maybe<Array<Maybe<NftTimeSeriesItem>>>;
  getNftsList?: Maybe<Array<Maybe<NftListItem>>>;
  getNftsListV2?: Maybe<Array<Maybe<NftListItem>>>;
  getPostDetails?: Maybe<PostDetails>;
  getPostTimeSeries?: Maybe<Array<Maybe<PostTimeSeriesItem>>>;
  getStock?: Maybe<StockDetails>;
  getStockTimeSeries?: Maybe<Array<Maybe<StockTimeSeriesItem>>>;
  getStocksList?: Maybe<Array<Maybe<StockListItem>>>;
  getStocksListV2?: Maybe<Array<Maybe<StockListItem>>>;
  getSystemChanges?: Maybe<Array<Maybe<SystemChange>>>;
  getTopic?: Maybe<TopicDetails>;
  getTopicCreators?: Maybe<Array<Maybe<TopicCreator>>>;
  getTopicNews?: Maybe<Array<Maybe<TopicNews>>>;
  getTopicPosts?: Maybe<Array<Maybe<TopicPost>>>;
  getTopicTimeSeries?: Maybe<Array<Maybe<TopicTimeSeriesItem>>>;
  getTopicTimeSeriesV2?: Maybe<Array<Maybe<TopicTimeSeriesItem>>>;
  getTopicWhatsup?: Maybe<TopicWhatsup>;
  getTopicsList?: Maybe<Array<Maybe<TopicListItem>>>;
  health?: Maybe<Scalars['String']['output']>;
  hello?: Maybe<Scalars['String']['output']>;
  ping?: Maybe<PingResponse>;
  systemHealth?: Maybe<SystemHealthResponse>;
}


export interface QueryGetCategoryArgs {
  category: Scalars['String']['input'];
}


export interface QueryGetCategoryCreatorsArgs {
  category: Scalars['String']['input'];
}


export interface QueryGetCategoryNewsArgs {
  category: Scalars['String']['input'];
}


export interface QueryGetCategoryPostsArgs {
  category: Scalars['String']['input'];
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
}


export interface QueryGetCategoryTimeSeriesArgs {
  bucket?: InputMaybe<Scalars['String']['input']>;
  category: Scalars['String']['input'];
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
}


export interface QueryGetCategoryTopicsArgs {
  category: Scalars['String']['input'];
}


export interface QueryGetCoinArgs {
  coin: Scalars['String']['input'];
}


export interface QueryGetCoinMetaArgs {
  coin: Scalars['String']['input'];
}


export interface QueryGetCoinTimeSeriesArgs {
  bucket?: InputMaybe<Scalars['String']['input']>;
  coin: Scalars['String']['input'];
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
}


export interface QueryGetCoinsListArgs {
  desc?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}


export interface QueryGetCoinsListV2Args {
  desc?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}


export interface QueryGetCreatorArgs {
  id: Scalars['String']['input'];
  network: Scalars['String']['input'];
}


export interface QueryGetCreatorPostsArgs {
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  id: Scalars['String']['input'];
  network: Scalars['String']['input'];
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
}


export interface QueryGetCreatorTimeSeriesArgs {
  bucket?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  id: Scalars['String']['input'];
  interval?: InputMaybe<Scalars['String']['input']>;
  network: Scalars['String']['input'];
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
}


export interface QueryGetNftArgs {
  id: Scalars['String']['input'];
}


export interface QueryGetNftTimeSeriesArgs {
  bucket?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  id: Scalars['String']['input'];
  interval?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
}


export interface QueryGetNftTimeSeriesV2Args {
  bucket?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  nft: Scalars['String']['input'];
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
}


export interface QueryGetNftsListArgs {
  desc?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}


export interface QueryGetNftsListV2Args {
  desc?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}


export interface QueryGetPostDetailsArgs {
  post_id: Scalars['String']['input'];
  post_type: Scalars['String']['input'];
}


export interface QueryGetPostTimeSeriesArgs {
  post_id: Scalars['String']['input'];
  post_type: Scalars['String']['input'];
}


export interface QueryGetStockArgs {
  stock: Scalars['String']['input'];
}


export interface QueryGetStockTimeSeriesArgs {
  bucket?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  stock: Scalars['String']['input'];
}


export interface QueryGetStocksListV2Args {
  desc?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}


export interface QueryGetSystemChangesArgs {
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
}


export interface QueryGetTopicArgs {
  topic: Scalars['String']['input'];
}


export interface QueryGetTopicCreatorsArgs {
  topic: Scalars['String']['input'];
}


export interface QueryGetTopicNewsArgs {
  topic: Scalars['String']['input'];
}


export interface QueryGetTopicPostsArgs {
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  topic: Scalars['String']['input'];
}


export interface QueryGetTopicTimeSeriesArgs {
  bucket?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  topic: Scalars['String']['input'];
}


export interface QueryGetTopicTimeSeriesV2Args {
  bucket?: InputMaybe<Scalars['String']['input']>;
  topic: Scalars['String']['input'];
}


export interface QueryGetTopicWhatsupArgs {
  topic: Scalars['String']['input'];
}

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export interface StockDetails {
  __typename?: 'StockDetails';
  close?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  market_cap?: Maybe<Scalars['Float']['output']>;
  market_cap_rank?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  percent_change_24h?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  volume_24h?: Maybe<Scalars['Float']['output']>;
}

export interface StockListItem {
  __typename?: 'StockListItem';
  alt_rank?: Maybe<Scalars['Int']['output']>;
  alt_rank_previous?: Maybe<Scalars['Int']['output']>;
  categories?: Maybe<Scalars['String']['output']>;
  galaxy_score?: Maybe<Scalars['Float']['output']>;
  galaxy_score_previous?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  interactions_24h?: Maybe<Scalars['Float']['output']>;
  last_updated_price?: Maybe<Scalars['Int']['output']>;
  last_updated_price_by?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  market_cap?: Maybe<Scalars['String']['output']>;
  market_cap_rank?: Maybe<Scalars['Int']['output']>;
  market_dominance?: Maybe<Scalars['Float']['output']>;
  market_dominance_prev?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  percent_change_24h?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  sentiment?: Maybe<Scalars['Float']['output']>;
  social_dominance?: Maybe<Scalars['Float']['output']>;
  social_volume_24h?: Maybe<Scalars['Float']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  topic?: Maybe<Scalars['String']['output']>;
  volume_24h?: Maybe<Scalars['Float']['output']>;
}

export interface StockTimeSeriesItem {
  __typename?: 'StockTimeSeriesItem';
  alt_rank?: Maybe<Scalars['Int']['output']>;
  close?: Maybe<Scalars['Float']['output']>;
  contributors_active?: Maybe<Scalars['Int']['output']>;
  contributors_created?: Maybe<Scalars['Int']['output']>;
  galaxy_score?: Maybe<Scalars['Float']['output']>;
  high?: Maybe<Scalars['Float']['output']>;
  interactions?: Maybe<Scalars['Float']['output']>;
  low?: Maybe<Scalars['Float']['output']>;
  market_cap?: Maybe<Scalars['Float']['output']>;
  market_dominance?: Maybe<Scalars['Float']['output']>;
  open?: Maybe<Scalars['Float']['output']>;
  posts_active?: Maybe<Scalars['Int']['output']>;
  posts_created?: Maybe<Scalars['Int']['output']>;
  sentiment?: Maybe<Scalars['Float']['output']>;
  social_dominance?: Maybe<Scalars['Float']['output']>;
  spam?: Maybe<Scalars['Int']['output']>;
  time?: Maybe<Scalars['Int']['output']>;
}

export interface SystemChange {
  __typename?: 'SystemChange';
  asset_id?: Maybe<Scalars['String']['output']>;
  asset_name?: Maybe<Scalars['String']['output']>;
  asset_type?: Maybe<Scalars['String']['output']>;
  change?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['Int']['output']>;
}

export interface SystemHealthResponse {
  __typename?: 'SystemHealthResponse';
  status: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
  uptime: Scalars['Int']['output'];
  version: Scalars['String']['output'];
}

export enum TimeInterval {
  FourHours = 'FOUR_HOURS',
  OneDay = 'ONE_DAY',
  OneHour = 'ONE_HOUR',
  OneMonth = 'ONE_MONTH',
  OneWeek = 'ONE_WEEK'
}

export interface Topic {
  __typename?: 'Topic';
  category: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  topic: Scalars['String']['output'];
}

export interface TopicCreator {
  __typename?: 'TopicCreator';
  creator_avatar?: Maybe<Scalars['String']['output']>;
  creator_followers?: Maybe<Scalars['Float']['output']>;
  creator_id?: Maybe<Scalars['String']['output']>;
  creator_name?: Maybe<Scalars['String']['output']>;
  creator_rank?: Maybe<Scalars['Float']['output']>;
  interactions_24h?: Maybe<Scalars['Float']['output']>;
}

export interface TopicDetails {
  __typename?: 'TopicDetails';
  categories?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  interactions_24h?: Maybe<Scalars['Float']['output']>;
  num_contributors?: Maybe<Scalars['Int']['output']>;
  num_posts?: Maybe<Scalars['Int']['output']>;
  related_topics?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title?: Maybe<Scalars['String']['output']>;
  topic?: Maybe<Scalars['String']['output']>;
  topic_rank?: Maybe<Scalars['Int']['output']>;
  trend?: Maybe<Scalars['String']['output']>;
  types_count?: Maybe<Scalars['JSON']['output']>;
  types_interactions?: Maybe<Scalars['JSON']['output']>;
  types_sentiment?: Maybe<Scalars['JSON']['output']>;
  types_sentiment_detail?: Maybe<Scalars['JSON']['output']>;
}

export interface TopicInfluence {
  __typename?: 'TopicInfluence';
  count?: Maybe<Scalars['Int']['output']>;
  percent?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  topic?: Maybe<Scalars['String']['output']>;
}

export interface TopicListItem {
  __typename?: 'TopicListItem';
  interactions_24h?: Maybe<Scalars['Float']['output']>;
  num_contributors?: Maybe<Scalars['Float']['output']>;
  num_posts?: Maybe<Scalars['Float']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  topic?: Maybe<Scalars['String']['output']>;
  topic_rank?: Maybe<Scalars['Int']['output']>;
  topic_rank_1h_previous?: Maybe<Scalars['Int']['output']>;
  topic_rank_24h_previous?: Maybe<Scalars['Int']['output']>;
}

export interface TopicNews {
  __typename?: 'TopicNews';
  creator_avatar?: Maybe<Scalars['String']['output']>;
  creator_display_name?: Maybe<Scalars['String']['output']>;
  creator_followers?: Maybe<Scalars['Float']['output']>;
  creator_id?: Maybe<Scalars['String']['output']>;
  creator_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  interactions_24h?: Maybe<Scalars['Float']['output']>;
  interactions_total?: Maybe<Scalars['Float']['output']>;
  post_created?: Maybe<Scalars['Float']['output']>;
  post_image?: Maybe<Scalars['String']['output']>;
  post_link?: Maybe<Scalars['String']['output']>;
  post_sentiment?: Maybe<Scalars['Float']['output']>;
  post_title?: Maybe<Scalars['String']['output']>;
  post_type?: Maybe<Scalars['String']['output']>;
}

export interface TopicPost {
  __typename?: 'TopicPost';
  creator_avatar?: Maybe<Scalars['String']['output']>;
  creator_display_name?: Maybe<Scalars['String']['output']>;
  creator_followers?: Maybe<Scalars['Float']['output']>;
  creator_id?: Maybe<Scalars['String']['output']>;
  creator_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  interactions_24h?: Maybe<Scalars['Float']['output']>;
  interactions_total?: Maybe<Scalars['Float']['output']>;
  post_created?: Maybe<Scalars['Int']['output']>;
  post_image?: Maybe<Scalars['String']['output']>;
  post_link?: Maybe<Scalars['String']['output']>;
  post_sentiment?: Maybe<Scalars['Float']['output']>;
  post_title?: Maybe<Scalars['String']['output']>;
  post_type?: Maybe<Scalars['String']['output']>;
}

export interface TopicTimeSeriesItem {
  __typename?: 'TopicTimeSeriesItem';
  alt_rank?: Maybe<Scalars['Int']['output']>;
  circulating_supply?: Maybe<Scalars['Float']['output']>;
  close?: Maybe<Scalars['Float']['output']>;
  contributors_active?: Maybe<Scalars['Int']['output']>;
  contributors_created?: Maybe<Scalars['Int']['output']>;
  galaxy_score?: Maybe<Scalars['Float']['output']>;
  high?: Maybe<Scalars['Float']['output']>;
  interactions?: Maybe<Scalars['Float']['output']>;
  low?: Maybe<Scalars['Float']['output']>;
  market_cap?: Maybe<Scalars['Float']['output']>;
  market_dominance?: Maybe<Scalars['Float']['output']>;
  open?: Maybe<Scalars['Float']['output']>;
  posts_active?: Maybe<Scalars['Int']['output']>;
  posts_created?: Maybe<Scalars['Int']['output']>;
  sentiment?: Maybe<Scalars['Float']['output']>;
  social_dominance?: Maybe<Scalars['Float']['output']>;
  spam?: Maybe<Scalars['Int']['output']>;
  time?: Maybe<Scalars['Int']['output']>;
  volume_24h?: Maybe<Scalars['Float']['output']>;
}

export interface TopicWhatsup {
  __typename?: 'TopicWhatsup';
  summary?: Maybe<Scalars['String']['output']>;
}

export interface UserPreferences {
  __typename?: 'UserPreferences';
  currency?: Maybe<Scalars['String']['output']>;
  favoriteTopics?: Maybe<Array<Scalars['String']['output']>>;
  notifications?: Maybe<Scalars['Boolean']['output']>;
  theme?: Maybe<Scalars['String']['output']>;
}

export interface UserPreferencesInput {
  currency?: InputMaybe<Scalars['String']['input']>;
  favoriteTopics?: InputMaybe<Array<Scalars['String']['input']>>;
  notifications?: InputMaybe<Scalars['Boolean']['input']>;
  theme?: InputMaybe<Scalars['String']['input']>;
}
