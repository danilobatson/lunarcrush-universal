/* eslint-disable */
// ================================================================
// 🚨 AUTO-GENERATED SDK OPERATIONS - DO NOT EDIT! 🚨
// ================================================================
// Generated from: packages/sdk/operations.graphql (resolver-based)
// Command: yarn codegen
//
// Contains ONLY operations implemented in resolvers.ts
// No manual queries - all generated from actual implementations
// ================================================================

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: string; output: string; }
  JSON: { input: Record<string, any>; output: Record<string, any>; }
  UnixTimestamp: { input: string; output: string; }
};

export type Blockchain = {
  __typename?: 'Blockchain';
  address?: Maybe<Scalars['String']['output']>;
  decimals?: Maybe<Scalars['Int']['output']>;
  network?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CategoryCreator = {
  __typename?: 'CategoryCreator';
  creator_avatar?: Maybe<Scalars['String']['output']>;
  creator_followers?: Maybe<Scalars['Float']['output']>;
  creator_id?: Maybe<Scalars['String']['output']>;
  creator_name?: Maybe<Scalars['String']['output']>;
  creator_rank?: Maybe<Scalars['Int']['output']>;
  interactions_24h?: Maybe<Scalars['Float']['output']>;
};

export type CategoryDetails = {
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
};

export type CategoryListItem = {
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
};

export type CategoryNews = {
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
};

export type CategoryPost = {
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
};

export type CategoryTimeSeriesItem = {
  __typename?: 'CategoryTimeSeriesItem';
  contributors_active?: Maybe<Scalars['Int']['output']>;
  contributors_created?: Maybe<Scalars['Int']['output']>;
  interactions?: Maybe<Scalars['Float']['output']>;
  posts_active?: Maybe<Scalars['Int']['output']>;
  posts_created?: Maybe<Scalars['Int']['output']>;
  sentiment?: Maybe<Scalars['Float']['output']>;
  spam?: Maybe<Scalars['Int']['output']>;
  time?: Maybe<Scalars['Int']['output']>;
};

export type CategoryTopic = {
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
};

export type CoinDetails = {
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
};

export type CoinListItem = {
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
};

export type CoinMeta = {
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
};

export type CoinTimeSeriesItem = {
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
};

export type CreateTopicInput = {
  category: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  topic: Scalars['String']['input'];
};

export type CreatorDetails = {
  __typename?: 'CreatorDetails';
  creator_avatar?: Maybe<Scalars['String']['output']>;
  creator_display_name?: Maybe<Scalars['String']['output']>;
  creator_followers?: Maybe<Scalars['Float']['output']>;
  creator_id?: Maybe<Scalars['String']['output']>;
  creator_name?: Maybe<Scalars['String']['output']>;
  creator_rank?: Maybe<Scalars['String']['output']>;
  interactions_24h?: Maybe<Scalars['Float']['output']>;
  topic_influence?: Maybe<Array<Maybe<TopicInfluence>>>;
};

export type CreatorListItem = {
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
};

export type CreatorPost = {
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
};

export type CreatorTimeSeriesItem = {
  __typename?: 'CreatorTimeSeriesItem';
  creator_rank?: Maybe<Scalars['Float']['output']>;
  followers?: Maybe<Scalars['Float']['output']>;
  interactions?: Maybe<Scalars['Float']['output']>;
  posts_active?: Maybe<Scalars['Int']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
};

export type NftDetails = {
  __typename?: 'NftDetails';
  floor_price?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  market_cap?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  percent_change_24h?: Maybe<Scalars['Float']['output']>;
  volume_24h?: Maybe<Scalars['Float']['output']>;
};

export type NftListItem = {
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
};

export type NftTimeSeriesItem = {
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
};

export type PingResponse = {
  __typename?: 'PingResponse';
  status: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
};

export type PostDetails = {
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
};

export type PostImage = {
  __typename?: 'PostImage';
  height?: Maybe<Scalars['Int']['output']>;
  src?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type PostMetrics = {
  __typename?: 'PostMetrics';
  bookmarks?: Maybe<Scalars['Int']['output']>;
  favorites?: Maybe<Scalars['Int']['output']>;
  replies?: Maybe<Scalars['Int']['output']>;
  retweets?: Maybe<Scalars['Int']['output']>;
  views?: Maybe<Scalars['Int']['output']>;
};

export type PostTimeSeriesItem = {
  __typename?: 'PostTimeSeriesItem';
  interactions?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['String']['output']>;
};

export type Query = {
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
};


export type QueryGetCategoryArgs = {
  category: Scalars['String']['input'];
};


export type QueryGetCategoryCreatorsArgs = {
  category: Scalars['String']['input'];
};


export type QueryGetCategoryNewsArgs = {
  category: Scalars['String']['input'];
};


export type QueryGetCategoryPostsArgs = {
  category: Scalars['String']['input'];
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
};


export type QueryGetCategoryTimeSeriesArgs = {
  bucket?: InputMaybe<Scalars['String']['input']>;
  category: Scalars['String']['input'];
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
};


export type QueryGetCategoryTopicsArgs = {
  category: Scalars['String']['input'];
};


export type QueryGetCoinArgs = {
  coin: Scalars['String']['input'];
};


export type QueryGetCoinMetaArgs = {
  coin: Scalars['String']['input'];
};


export type QueryGetCoinTimeSeriesArgs = {
  bucket?: InputMaybe<Scalars['String']['input']>;
  coin: Scalars['String']['input'];
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
};


export type QueryGetCoinsListArgs = {
  desc?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetCoinsListV2Args = {
  desc?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetCreatorArgs = {
  id: Scalars['String']['input'];
  network: Scalars['String']['input'];
};


export type QueryGetCreatorPostsArgs = {
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  id: Scalars['String']['input'];
  network: Scalars['String']['input'];
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
};


export type QueryGetCreatorTimeSeriesArgs = {
  bucket?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  id: Scalars['String']['input'];
  interval?: InputMaybe<Scalars['String']['input']>;
  network: Scalars['String']['input'];
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
};


export type QueryGetNftArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetNftTimeSeriesArgs = {
  bucket?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  id: Scalars['String']['input'];
  interval?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
};


export type QueryGetNftTimeSeriesV2Args = {
  bucket?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  nft: Scalars['String']['input'];
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
};


export type QueryGetNftsListArgs = {
  desc?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetNftsListV2Args = {
  desc?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetPostDetailsArgs = {
  post_id: Scalars['String']['input'];
  post_type: Scalars['String']['input'];
};


export type QueryGetPostTimeSeriesArgs = {
  post_id: Scalars['String']['input'];
  post_type: Scalars['String']['input'];
};


export type QueryGetStockArgs = {
  stock: Scalars['String']['input'];
};


export type QueryGetStockTimeSeriesArgs = {
  bucket?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  stock: Scalars['String']['input'];
};


export type QueryGetStocksListV2Args = {
  desc?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetSystemChangesArgs = {
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
};


export type QueryGetTopicArgs = {
  topic: Scalars['String']['input'];
};


export type QueryGetTopicCreatorsArgs = {
  topic: Scalars['String']['input'];
};


export type QueryGetTopicNewsArgs = {
  topic: Scalars['String']['input'];
};


export type QueryGetTopicPostsArgs = {
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  topic: Scalars['String']['input'];
};


export type QueryGetTopicTimeSeriesArgs = {
  bucket?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  topic: Scalars['String']['input'];
};


export type QueryGetTopicTimeSeriesV2Args = {
  bucket?: InputMaybe<Scalars['String']['input']>;
  topic: Scalars['String']['input'];
};


export type QueryGetTopicWhatsupArgs = {
  topic: Scalars['String']['input'];
};

export type SortDirection =
  | 'ASC'
  | 'DESC';

export type StockDetails = {
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
};

export type StockListItem = {
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
};

export type StockTimeSeriesItem = {
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
};

export type SystemChange = {
  __typename?: 'SystemChange';
  asset_id?: Maybe<Scalars['String']['output']>;
  asset_name?: Maybe<Scalars['String']['output']>;
  asset_type?: Maybe<Scalars['String']['output']>;
  change?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['Int']['output']>;
};

export type SystemHealthResponse = {
  __typename?: 'SystemHealthResponse';
  status: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
  uptime: Scalars['Int']['output'];
  version: Scalars['String']['output'];
};

export type TimeInterval =
  | 'FOUR_HOURS'
  | 'ONE_DAY'
  | 'ONE_HOUR'
  | 'ONE_MONTH'
  | 'ONE_WEEK';

export type Topic = {
  __typename?: 'Topic';
  category: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  topic: Scalars['String']['output'];
};

export type TopicCreator = {
  __typename?: 'TopicCreator';
  creator_avatar?: Maybe<Scalars['String']['output']>;
  creator_followers?: Maybe<Scalars['Float']['output']>;
  creator_id?: Maybe<Scalars['String']['output']>;
  creator_name?: Maybe<Scalars['String']['output']>;
  creator_rank?: Maybe<Scalars['Float']['output']>;
  interactions_24h?: Maybe<Scalars['Float']['output']>;
};

export type TopicDetails = {
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
};

export type TopicInfluence = {
  __typename?: 'TopicInfluence';
  count?: Maybe<Scalars['Int']['output']>;
  percent?: Maybe<Scalars['Float']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  topic?: Maybe<Scalars['String']['output']>;
};

export type TopicListItem = {
  __typename?: 'TopicListItem';
  interactions_24h?: Maybe<Scalars['Float']['output']>;
  num_contributors?: Maybe<Scalars['Float']['output']>;
  num_posts?: Maybe<Scalars['Float']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  topic?: Maybe<Scalars['String']['output']>;
  topic_rank?: Maybe<Scalars['Int']['output']>;
  topic_rank_1h_previous?: Maybe<Scalars['Int']['output']>;
  topic_rank_24h_previous?: Maybe<Scalars['Int']['output']>;
};

export type TopicNews = {
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
};

export type TopicPost = {
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
};

export type TopicTimeSeriesItem = {
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
};

export type TopicWhatsup = {
  __typename?: 'TopicWhatsup';
  summary?: Maybe<Scalars['String']['output']>;
};

export type UserPreferences = {
  __typename?: 'UserPreferences';
  currency?: Maybe<Scalars['String']['output']>;
  favoriteTopics?: Maybe<Array<Scalars['String']['output']>>;
  notifications?: Maybe<Scalars['Boolean']['output']>;
  theme?: Maybe<Scalars['String']['output']>;
};

export type UserPreferencesInput = {
  currency?: InputMaybe<Scalars['String']['input']>;
  favoriteTopics?: InputMaybe<Array<Scalars['String']['input']>>;
  notifications?: InputMaybe<Scalars['Boolean']['input']>;
  theme?: InputMaybe<Scalars['String']['input']>;
};

export type SystemHealthQueryVariables = Exact<{ [key: string]: never; }>;


export type SystemHealthQuery = { __typename?: 'Query', systemHealth?: { __typename?: 'SystemHealthResponse', status: string, uptime: number, version: string, timestamp: string } | null };

export type PingQueryVariables = Exact<{ [key: string]: never; }>;


export type PingQuery = { __typename?: 'Query', ping?: { __typename?: 'PingResponse', status: string, timestamp: string } | null };

export type HealthQueryVariables = Exact<{ [key: string]: never; }>;


export type HealthQuery = { __typename?: 'Query', health?: string | null };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello?: string | null };

export type GetTopicsListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTopicsListQuery = { __typename?: 'Query', getTopicsList?: Array<{ __typename?: 'TopicListItem', topic?: string | null, title?: string | null, topic_rank?: number | null, topic_rank_1h_previous?: number | null, topic_rank_24h_previous?: number | null, num_contributors?: number | null, num_posts?: number | null, interactions_24h?: number | null } | null> | null };

export type GetTopicQueryVariables = Exact<{
  topic: Scalars['String']['input'];
}>;


export type GetTopicQuery = { __typename?: 'Query', getTopic?: { __typename?: 'TopicDetails', topic?: string | null, title?: string | null, topic_rank?: number | null, related_topics?: Array<string | null> | null, types_count?: Record<string, any> | null, types_interactions?: Record<string, any> | null, types_sentiment?: Record<string, any> | null, types_sentiment_detail?: Record<string, any> | null, interactions_24h?: number | null, num_contributors?: number | null, num_posts?: number | null, categories?: Array<string | null> | null, trend?: string | null } | null };

export type GetTopicWhatsupQueryVariables = Exact<{
  topic: Scalars['String']['input'];
}>;


export type GetTopicWhatsupQuery = { __typename?: 'Query', getTopicWhatsup?: { __typename?: 'TopicWhatsup', summary?: string | null } | null };

export type GetTopicTimeSeriesQueryVariables = Exact<{
  topic: Scalars['String']['input'];
  bucket?: InputMaybe<Scalars['String']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
}>;


export type GetTopicTimeSeriesQuery = { __typename?: 'Query', getTopicTimeSeries?: Array<{ __typename?: 'TopicTimeSeriesItem', time?: number | null, contributors_active?: number | null, contributors_created?: number | null, interactions?: number | null, posts_active?: number | null, posts_created?: number | null, sentiment?: number | null, spam?: number | null, alt_rank?: number | null, circulating_supply?: number | null, close?: number | null, galaxy_score?: number | null, high?: number | null, low?: number | null, market_cap?: number | null, market_dominance?: number | null, open?: number | null, social_dominance?: number | null, volume_24h?: number | null } | null> | null };

export type GetTopicTimeSeriesV2QueryVariables = Exact<{
  topic: Scalars['String']['input'];
  bucket?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTopicTimeSeriesV2Query = { __typename?: 'Query', getTopicTimeSeriesV2?: Array<{ __typename?: 'TopicTimeSeriesItem', time?: number | null, contributors_active?: number | null, contributors_created?: number | null, interactions?: number | null, posts_active?: number | null, posts_created?: number | null, sentiment?: number | null, spam?: number | null, alt_rank?: number | null, circulating_supply?: number | null, close?: number | null, galaxy_score?: number | null, high?: number | null, low?: number | null, market_cap?: number | null, market_dominance?: number | null, open?: number | null, social_dominance?: number | null, volume_24h?: number | null } | null> | null };

export type GetTopicPostsQueryVariables = Exact<{
  topic: Scalars['String']['input'];
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
}>;


export type GetTopicPostsQuery = { __typename?: 'Query', getTopicPosts?: Array<{ __typename?: 'TopicPost', id?: string | null, post_type?: string | null, post_title?: string | null, post_link?: string | null, post_image?: string | null, post_created?: number | null, post_sentiment?: number | null, creator_id?: string | null, creator_name?: string | null, creator_display_name?: string | null, creator_followers?: number | null, creator_avatar?: string | null, interactions_24h?: number | null, interactions_total?: number | null } | null> | null };

export type GetTopicNewsQueryVariables = Exact<{
  topic: Scalars['String']['input'];
}>;


export type GetTopicNewsQuery = { __typename?: 'Query', getTopicNews?: Array<{ __typename?: 'TopicNews', id?: string | null, post_type?: string | null, post_title?: string | null, post_link?: string | null, post_image?: string | null, post_created?: number | null, post_sentiment?: number | null, creator_id?: string | null, creator_name?: string | null, creator_display_name?: string | null, creator_followers?: number | null, creator_avatar?: string | null, interactions_24h?: number | null, interactions_total?: number | null } | null> | null };

export type GetTopicCreatorsQueryVariables = Exact<{
  topic: Scalars['String']['input'];
}>;


export type GetTopicCreatorsQuery = { __typename?: 'Query', getTopicCreators?: Array<{ __typename?: 'TopicCreator', creator_id?: string | null, creator_name?: string | null, creator_avatar?: string | null, creator_followers?: number | null, creator_rank?: number | null, interactions_24h?: number | null } | null> | null };

export type GetCategoriesListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesListQuery = { __typename?: 'Query', getCategoriesList?: Array<{ __typename?: 'CategoryListItem', category?: string | null, title?: string | null, category_rank?: number | null, category_rank_1h_previous?: number | null, category_rank_24h_previous?: number | null, interactions_24h?: number | null, num_contributors?: number | null, num_posts?: number | null, social_dominance?: number | null } | null> | null };

export type GetCategoryQueryVariables = Exact<{
  category: Scalars['String']['input'];
}>;


export type GetCategoryQuery = { __typename?: 'Query', getCategory?: { __typename?: 'CategoryDetails', topic?: string | null, title?: string | null, related_topics?: Array<string | null> | null, types_count?: Record<string, any> | null, types_interactions?: Record<string, any> | null, types_sentiment?: Record<string, any> | null, types_sentiment_detail?: Record<string, any> | null, interactions_24h?: number | null, num_contributors?: number | null, num_posts?: number | null, trend?: string | null } | null };

export type GetCategoryTopicsQueryVariables = Exact<{
  category: Scalars['String']['input'];
}>;


export type GetCategoryTopicsQuery = { __typename?: 'Query', getCategoryTopics?: Array<{ __typename?: 'CategoryTopic', topic?: number | null, title?: string | null, topic_rank?: number | null, topic_rank_1h_previous?: number | null, topic_rank_24h_previous?: number | null, num_contributors?: number | null, social_dominance?: number | null, num_posts?: number | null, interactions_24h?: number | null } | null> | null };

export type GetCategoryTimeSeriesQueryVariables = Exact<{
  category: Scalars['String']['input'];
  bucket?: InputMaybe<Scalars['String']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
}>;


export type GetCategoryTimeSeriesQuery = { __typename?: 'Query', getCategoryTimeSeries?: Array<{ __typename?: 'CategoryTimeSeriesItem', time?: number | null, contributors_active?: number | null, contributors_created?: number | null, interactions?: number | null, posts_active?: number | null, posts_created?: number | null, sentiment?: number | null, spam?: number | null } | null> | null };

export type GetCategoryPostsQueryVariables = Exact<{
  category: Scalars['String']['input'];
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
}>;


export type GetCategoryPostsQuery = { __typename?: 'Query', getCategoryPosts?: Array<{ __typename?: 'CategoryPost', id?: string | null, post_type?: string | null, post_title?: string | null, post_link?: string | null, post_image?: string | null, post_created?: number | null, post_sentiment?: number | null, creator_id?: string | null, creator_name?: string | null, creator_display_name?: string | null, creator_followers?: number | null, creator_avatar?: string | null, interactions_24h?: number | null, interactions_total?: number | null } | null> | null };

export type GetCategoryNewsQueryVariables = Exact<{
  category: Scalars['String']['input'];
}>;


export type GetCategoryNewsQuery = { __typename?: 'Query', getCategoryNews?: Array<{ __typename?: 'CategoryNews', id?: string | null, post_title?: string | null, post_type?: string | null, post_link?: string | null, post_image?: string | null, post_created?: number | null, post_sentiment?: number | null, creator_id?: string | null, creator_name?: string | null, creator_display_name?: string | null, creator_followers?: number | null, creator_avatar?: string | null, interactions_24h?: number | null, interactions_total?: number | null } | null> | null };

export type GetCategoryCreatorsQueryVariables = Exact<{
  category: Scalars['String']['input'];
}>;


export type GetCategoryCreatorsQuery = { __typename?: 'Query', getCategoryCreators?: Array<{ __typename?: 'CategoryCreator', creator_id?: string | null, creator_name?: string | null, creator_avatar?: string | null, creator_followers?: number | null, creator_rank?: number | null, interactions_24h?: number | null } | null> | null };

export type GetCreatorsListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCreatorsListQuery = { __typename?: 'Query', getCreatorsList?: Array<{ __typename?: 'CreatorListItem', creator_display_name?: string | null, creator_id?: string | null, creator_network?: string | null, creator_avatar?: string | null, creator_followers?: number | null, creator_name?: string | null, creator_posts?: number | null, creator_rank?: number | null, interactions_24h?: number | null } | null> | null };

export type GetCreatorQueryVariables = Exact<{
  network: Scalars['String']['input'];
  id: Scalars['String']['input'];
}>;


export type GetCreatorQuery = { __typename?: 'Query', getCreator?: { __typename?: 'CreatorDetails', creator_id?: string | null, creator_name?: string | null, creator_display_name?: string | null, creator_avatar?: string | null, creator_followers?: number | null, creator_rank?: string | null, interactions_24h?: number | null, topic_influence?: Array<{ __typename?: 'TopicInfluence', topic?: string | null, count?: number | null, percent?: number | null, rank?: number | null } | null> | null } | null };

export type GetCreatorTimeSeriesQueryVariables = Exact<{
  network: Scalars['String']['input'];
  id: Scalars['String']['input'];
  bucket?: InputMaybe<Scalars['String']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
}>;


export type GetCreatorTimeSeriesQuery = { __typename?: 'Query', getCreatorTimeSeries?: Array<{ __typename?: 'CreatorTimeSeriesItem', time?: number | null, followers?: number | null, interactions?: number | null, posts_active?: number | null, creator_rank?: number | null } | null> | null };

export type GetCreatorPostsQueryVariables = Exact<{
  network: Scalars['String']['input'];
  id: Scalars['String']['input'];
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
}>;


export type GetCreatorPostsQuery = { __typename?: 'Query', getCreatorPosts?: Array<{ __typename?: 'CreatorPost', id?: string | null, post_type?: string | null, post_title?: string | null, post_created?: number | null, post_sentiment?: number | null, post_link?: string | null, post_image?: string | null, creator_id?: string | null, creator_name?: string | null, creator_display_name?: string | null, creator_followers?: number | null, creator_avatar?: string | null, interactions_24h?: number | null, interactions_total?: number | null } | null> | null };

export type GetCoinsListQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  desc?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCoinsListQuery = { __typename?: 'Query', getCoinsList?: Array<{ __typename?: 'CoinListItem', id?: number | null, symbol?: string | null, name?: string | null, price?: number | null, price_btc?: number | null, volume_24h?: number | null, volatility?: number | null, circulating_supply?: number | null, max_supply?: number | null, percent_change_1h?: number | null, percent_change_24h?: number | null, percent_change_7d?: number | null, percent_change_30d?: number | null, market_cap?: number | null, market_cap_rank?: number | null, interactions_24h?: number | null, social_volume_24h?: number | null, social_dominance?: number | null, market_dominance?: number | null, market_dominance_prev?: number | null, galaxy_score?: number | null, galaxy_score_previous?: number | null, alt_rank?: number | null, alt_rank_previous?: number | null, sentiment?: number | null, categories?: string | null, last_updated_price?: number | null, last_updated_price_by?: string | null, topic?: string | null, logo?: string | null, blockchains?: Array<{ __typename?: 'Blockchain', type?: string | null, network?: string | null, address?: string | null, decimals?: number | null } | null> | null } | null> | null };

export type GetCoinsListV2QueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  desc?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCoinsListV2Query = { __typename?: 'Query', getCoinsListV2?: Array<{ __typename?: 'CoinListItem', id?: number | null, symbol?: string | null, name?: string | null, price?: number | null, price_btc?: number | null, volume_24h?: number | null, volatility?: number | null, circulating_supply?: number | null, max_supply?: number | null, percent_change_1h?: number | null, percent_change_24h?: number | null, percent_change_7d?: number | null, percent_change_30d?: number | null, market_cap?: number | null, market_cap_rank?: number | null, interactions_24h?: number | null, social_volume_24h?: number | null, social_dominance?: number | null, market_dominance?: number | null, market_dominance_prev?: number | null, galaxy_score?: number | null, galaxy_score_previous?: number | null, alt_rank?: number | null, alt_rank_previous?: number | null, sentiment?: number | null, categories?: string | null, last_updated_price?: number | null, last_updated_price_by?: string | null, topic?: string | null, logo?: string | null, blockchains?: Array<{ __typename?: 'Blockchain', type?: string | null, network?: string | null, address?: string | null, decimals?: number | null } | null> | null } | null> | null };

export type GetCoinQueryVariables = Exact<{
  coin: Scalars['String']['input'];
}>;


export type GetCoinQuery = { __typename?: 'Query', getCoin?: { __typename?: 'CoinDetails', id?: number | null, name?: string | null, symbol?: string | null, price?: number | null, price_btc?: number | null, market_cap?: number | null, percent_change_24h?: number | null, percent_change_7d?: number | null, percent_change_30d?: number | null, volume_24h?: number | null, max_supply?: number | null, circulating_supply?: number | null, close?: number | null, galaxy_score?: number | null, alt_rank?: number | null, volatility?: number | null, market_cap_rank?: number | null } | null };

export type GetCoinMetaQueryVariables = Exact<{
  coin: Scalars['String']['input'];
}>;


export type GetCoinMetaQuery = { __typename?: 'Query', getCoinMeta?: { __typename?: 'CoinMeta', id?: number | null, name?: string | null, symbol?: string | null, market_categories?: string | null, updated?: number | null, short_summary?: string | null, description?: string | null, github_link?: string | null, website_link?: string | null, whitepaper_link?: string | null, twitter_link?: string | null, reddit_link?: string | null, header_image?: string | null, header_text?: string | null, videos?: string | null, coingecko_link?: string | null, coinmarketcap_link?: string | null, blockchain?: Array<{ __typename?: 'Blockchain', type?: string | null, network?: string | null, address?: string | null, decimals?: number | null } | null> | null } | null };

export type GetCoinTimeSeriesQueryVariables = Exact<{
  coin: Scalars['String']['input'];
  bucket?: InputMaybe<Scalars['String']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
}>;


export type GetCoinTimeSeriesQuery = { __typename?: 'Query', getCoinTimeSeries?: Array<{ __typename?: 'CoinTimeSeriesItem', time?: number | null, contributors_active?: number | null, contributors_created?: number | null, interactions?: number | null, posts_active?: number | null, posts_created?: number | null, sentiment?: number | null, spam?: number | null, alt_rank?: number | null, circulating_supply?: number | null, close?: number | null, galaxy_score?: number | null, high?: number | null, low?: number | null, market_cap?: number | null, market_dominance?: number | null, open?: number | null, social_dominance?: number | null, volume_24h?: number | null } | null> | null };

export type GetStocksListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStocksListQuery = { __typename?: 'Query', getStocksList?: Array<{ __typename?: 'StockListItem', id?: number | null, symbol?: string | null, name?: string | null, price?: number | null, volume_24h?: number | null, percent_change_24h?: number | null, market_cap?: string | null, market_cap_rank?: number | null, interactions_24h?: number | null, social_volume_24h?: number | null, social_dominance?: number | null, market_dominance?: number | null, market_dominance_prev?: number | null, galaxy_score?: number | null, galaxy_score_previous?: number | null, alt_rank?: number | null, alt_rank_previous?: number | null, sentiment?: number | null, categories?: string | null, last_updated_price?: number | null, last_updated_price_by?: string | null, topic?: string | null, logo?: string | null } | null> | null };

export type GetStocksListV2QueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  desc?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetStocksListV2Query = { __typename?: 'Query', getStocksListV2?: Array<{ __typename?: 'StockListItem', id?: number | null, symbol?: string | null, name?: string | null, price?: number | null, volume_24h?: number | null, percent_change_24h?: number | null, market_cap?: string | null, market_cap_rank?: number | null, interactions_24h?: number | null, social_volume_24h?: number | null, social_dominance?: number | null, market_dominance?: number | null, market_dominance_prev?: number | null, galaxy_score?: number | null, galaxy_score_previous?: number | null, alt_rank?: number | null, alt_rank_previous?: number | null, sentiment?: number | null, categories?: string | null, last_updated_price?: number | null, last_updated_price_by?: string | null, topic?: string | null, logo?: string | null } | null> | null };

export type GetStockQueryVariables = Exact<{
  stock: Scalars['String']['input'];
}>;


export type GetStockQuery = { __typename?: 'Query', getStock?: { __typename?: 'StockDetails', id?: number | null, name?: string | null, symbol?: string | null, price?: number | null, market_cap?: number | null, percent_change_24h?: number | null, volume_24h?: number | null, close?: number | null, market_cap_rank?: number | null } | null };

export type GetStockTimeSeriesQueryVariables = Exact<{
  stock: Scalars['String']['input'];
  bucket?: InputMaybe<Scalars['String']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
}>;


export type GetStockTimeSeriesQuery = { __typename?: 'Query', getStockTimeSeries?: Array<{ __typename?: 'StockTimeSeriesItem', time?: number | null, close?: number | null, alt_rank?: number | null, contributors_active?: number | null, contributors_created?: number | null, galaxy_score?: number | null, high?: number | null, interactions?: number | null, low?: number | null, market_cap?: number | null, market_dominance?: number | null, open?: number | null, posts_active?: number | null, posts_created?: number | null, sentiment?: number | null, social_dominance?: number | null, spam?: number | null } | null> | null };

export type GetNftsListQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  desc?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetNftsListQuery = { __typename?: 'Query', getNftsList?: Array<{ __typename?: 'NftListItem', id?: number | null, name?: string | null, logo?: string | null, floor_price?: number | null, alt_rank?: number | null, base_crypto?: string | null, galaxy_score?: number | null, interactions_24h?: number | null, lunar_id?: string | null, market_cap?: number | null, percent_change_24h?: number | null, social_contributors?: number | null, social_dominance?: number | null, social_volume_24h?: number | null, volume_24h?: number | null } | null> | null };

export type GetNftsListV2QueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  desc?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetNftsListV2Query = { __typename?: 'Query', getNftsListV2?: Array<{ __typename?: 'NftListItem', id?: number | null, name?: string | null, logo?: string | null, floor_price?: number | null, alt_rank?: number | null, base_crypto?: string | null, galaxy_score?: number | null, interactions_24h?: number | null, lunar_id?: string | null, market_cap?: number | null, percent_change_24h?: number | null, social_contributors?: number | null, social_dominance?: number | null, social_volume_24h?: number | null, volume_24h?: number | null } | null> | null };

export type GetNftQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetNftQuery = { __typename?: 'Query', getNft?: { __typename?: 'NftDetails', id?: number | null, name?: string | null, floor_price?: number | null, market_cap?: number | null, percent_change_24h?: number | null, volume_24h?: number | null } | null };

export type GetNftTimeSeriesQueryVariables = Exact<{
  id: Scalars['String']['input'];
  bucket?: InputMaybe<Scalars['String']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
}>;


export type GetNftTimeSeriesQuery = { __typename?: 'Query', getNftTimeSeries?: Array<{ __typename?: 'NftTimeSeriesItem', time?: number | null, alt_rank?: number | null, contributors_active?: number | null, contributors_created?: number | null, interactions?: number | null, market_cap?: number | null, posts_active?: number | null, posts_created?: number | null, sentiment?: number | null, social_dominance?: number | null } | null> | null };

export type GetNftTimeSeriesV2QueryVariables = Exact<{
  nft: Scalars['String']['input'];
  bucket?: InputMaybe<Scalars['String']['input']>;
  interval?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
}>;


export type GetNftTimeSeriesV2Query = { __typename?: 'Query', getNftTimeSeriesV2?: Array<{ __typename?: 'NftTimeSeriesItem', time?: number | null, alt_rank?: number | null, contributors_active?: number | null, contributors_created?: number | null, interactions?: number | null, market_cap?: number | null, posts_active?: number | null, posts_created?: number | null, sentiment?: number | null, social_dominance?: number | null } | null> | null };

export type GetSystemChangesQueryVariables = Exact<{
  start?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  end?: InputMaybe<Scalars['UnixTimestamp']['input']>;
}>;


export type GetSystemChangesQuery = { __typename?: 'Query', getSystemChanges?: Array<{ __typename?: 'SystemChange', asset_id?: string | null, asset_name?: string | null, asset_type?: string | null, change?: string | null, description?: string | null, time?: number | null } | null> | null };

export type GetPostDetailsQueryVariables = Exact<{
  post_type: Scalars['String']['input'];
  post_id: Scalars['String']['input'];
}>;


export type GetPostDetailsQuery = { __typename?: 'Query', getPostDetails?: { __typename?: 'PostDetails', type?: string | null, id?: string | null, title?: string | null, description?: string | null, extraText?: string | null, video?: string | null, images?: Array<string | null> | null, creator_id?: string | null, creator_name?: string | null, creator_display_name?: string | null, creator_avatar?: string | null, topics?: Array<string | null> | null, categories?: Array<string | null> | null, metrics?: { __typename?: 'PostMetrics', bookmarks?: number | null, favorites?: number | null, retweets?: number | null, replies?: number | null, views?: number | null } | null, image?: { __typename?: 'PostImage', src?: string | null, width?: number | null, height?: number | null } | null } | null };

export type GetPostTimeSeriesQueryVariables = Exact<{
  post_type: Scalars['String']['input'];
  post_id: Scalars['String']['input'];
}>;


export type GetPostTimeSeriesQuery = { __typename?: 'Query', getPostTimeSeries?: Array<{ __typename?: 'PostTimeSeriesItem', time?: string | null, interactions?: number | null } | null> | null };


export const SystemHealthDocument = `
    query SystemHealth {
  systemHealth {
    status
    uptime
    version
    timestamp
  }
}
    `;
export const PingDocument = `
    query Ping {
  ping {
    status
    timestamp
  }
}
    `;
export const HealthDocument = `
    query Health {
  health
}
    `;
export const HelloDocument = `
    query Hello {
  hello
}
    `;
export const GetTopicsListDocument = `
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
export const GetTopicDocument = `
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
export const GetTopicWhatsupDocument = `
    query GetTopicWhatsup($topic: String!) {
  getTopicWhatsup(topic: $topic) {
    summary
  }
}
    `;
export const GetTopicTimeSeriesDocument = `
    query GetTopicTimeSeries($topic: String!, $bucket: String, $interval: String, $start: UnixTimestamp, $end: UnixTimestamp) {
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
export const GetTopicTimeSeriesV2Document = `
    query GetTopicTimeSeriesV2($topic: String!, $bucket: String) {
  getTopicTimeSeriesV2(topic: $topic, bucket: $bucket) {
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
export const GetTopicPostsDocument = `
    query GetTopicPosts($topic: String!, $start: UnixTimestamp, $end: UnixTimestamp) {
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
export const GetTopicNewsDocument = `
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
export const GetTopicCreatorsDocument = `
    query GetTopicCreators($topic: String!) {
  getTopicCreators(topic: $topic) {
    creator_id
    creator_name
    creator_avatar
    creator_followers
    creator_rank
    interactions_24h
  }
}
    `;
export const GetCategoriesListDocument = `
    query GetCategoriesList {
  getCategoriesList {
    category
    title
    category_rank
    category_rank_1h_previous
    category_rank_24h_previous
    interactions_24h
    num_contributors
    num_posts
    social_dominance
  }
}
    `;
export const GetCategoryDocument = `
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
export const GetCategoryTopicsDocument = `
    query GetCategoryTopics($category: String!) {
  getCategoryTopics(category: $category) {
    topic
    title
    topic_rank
    topic_rank_1h_previous
    topic_rank_24h_previous
    num_contributors
    social_dominance
    num_posts
    interactions_24h
  }
}
    `;
export const GetCategoryTimeSeriesDocument = `
    query GetCategoryTimeSeries($category: String!, $bucket: String, $interval: String, $start: UnixTimestamp, $end: UnixTimestamp) {
  getCategoryTimeSeries(
    category: $category
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
  }
}
    `;
export const GetCategoryPostsDocument = `
    query GetCategoryPosts($category: String!, $start: UnixTimestamp, $end: UnixTimestamp) {
  getCategoryPosts(category: $category, start: $start, end: $end) {
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
export const GetCategoryNewsDocument = `
    query GetCategoryNews($category: String!) {
  getCategoryNews(category: $category) {
    id
    post_title
    post_type
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
export const GetCategoryCreatorsDocument = `
    query GetCategoryCreators($category: String!) {
  getCategoryCreators(category: $category) {
    creator_id
    creator_name
    creator_avatar
    creator_followers
    creator_rank
    interactions_24h
  }
}
    `;
export const GetCreatorsListDocument = `
    query GetCreatorsList {
  getCreatorsList {
    creator_display_name
    creator_id
    creator_network
    creator_avatar
    creator_followers
    creator_name
    creator_posts
    creator_rank
    interactions_24h
  }
}
    `;
export const GetCreatorDocument = `
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
export const GetCreatorTimeSeriesDocument = `
    query GetCreatorTimeSeries($network: String!, $id: String!, $bucket: String, $interval: String, $start: UnixTimestamp, $end: UnixTimestamp) {
  getCreatorTimeSeries(
    network: $network
    id: $id
    bucket: $bucket
    interval: $interval
    start: $start
    end: $end
  ) {
    time
    followers
    interactions
    posts_active
    creator_rank
  }
}
    `;
export const GetCreatorPostsDocument = `
    query GetCreatorPosts($network: String!, $id: String!, $start: UnixTimestamp, $end: UnixTimestamp) {
  getCreatorPosts(network: $network, id: $id, start: $start, end: $end) {
    id
    post_type
    post_title
    post_created
    post_sentiment
    post_link
    post_image
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
export const GetCoinsListDocument = `
    query GetCoinsList($sort: String, $filter: String, $limit: Int, $desc: String, $page: Int) {
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
export const GetCoinsListV2Document = `
    query GetCoinsListV2($sort: String, $filter: String, $limit: Int, $desc: String, $page: Int) {
  getCoinsListV2(
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
export const GetCoinDocument = `
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
export const GetCoinMetaDocument = `
    query GetCoinMeta($coin: String!) {
  getCoinMeta(coin: $coin) {
    id
    name
    symbol
    market_categories
    updated
    blockchain {
      type
      network
      address
      decimals
    }
    short_summary
    description
    github_link
    website_link
    whitepaper_link
    twitter_link
    reddit_link
    header_image
    header_text
    videos
    coingecko_link
    coinmarketcap_link
  }
}
    `;
export const GetCoinTimeSeriesDocument = `
    query GetCoinTimeSeries($coin: String!, $bucket: String, $interval: String, $start: UnixTimestamp, $end: UnixTimestamp) {
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
export const GetStocksListDocument = `
    query GetStocksList {
  getStocksList {
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
    last_updated_price
    last_updated_price_by
    topic
    logo
  }
}
    `;
export const GetStocksListV2Document = `
    query GetStocksListV2($sort: String, $limit: Int, $desc: String, $page: Int) {
  getStocksListV2(sort: $sort, limit: $limit, desc: $desc, page: $page) {
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
    last_updated_price
    last_updated_price_by
    topic
    logo
  }
}
    `;
export const GetStockDocument = `
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
export const GetStockTimeSeriesDocument = `
    query GetStockTimeSeries($stock: String!, $bucket: String, $interval: String, $start: UnixTimestamp, $end: UnixTimestamp) {
  getStockTimeSeries(
    stock: $stock
    bucket: $bucket
    interval: $interval
    start: $start
    end: $end
  ) {
    time
    close
    alt_rank
    contributors_active
    contributors_created
    galaxy_score
    high
    interactions
    low
    market_cap
    market_dominance
    open
    posts_active
    posts_created
    sentiment
    social_dominance
    spam
  }
}
    `;
export const GetNftsListDocument = `
    query GetNftsList($sort: String, $limit: Int, $desc: String, $page: Int) {
  getNftsList(sort: $sort, limit: $limit, desc: $desc, page: $page) {
    id
    name
    logo
    floor_price
    alt_rank
    base_crypto
    galaxy_score
    interactions_24h
    lunar_id
    market_cap
    percent_change_24h
    social_contributors
    social_dominance
    social_volume_24h
    volume_24h
  }
}
    `;
export const GetNftsListV2Document = `
    query GetNftsListV2($sort: String, $limit: Int, $desc: String, $page: Int) {
  getNftsListV2(sort: $sort, limit: $limit, desc: $desc, page: $page) {
    id
    name
    logo
    floor_price
    alt_rank
    base_crypto
    galaxy_score
    interactions_24h
    lunar_id
    market_cap
    percent_change_24h
    social_contributors
    social_dominance
    social_volume_24h
    volume_24h
  }
}
    `;
export const GetNftDocument = `
    query GetNft($id: String!) {
  getNft(id: $id) {
    id
    name
    floor_price
    market_cap
    percent_change_24h
    volume_24h
  }
}
    `;
export const GetNftTimeSeriesDocument = `
    query GetNftTimeSeries($id: String!, $bucket: String, $interval: String, $start: UnixTimestamp, $end: UnixTimestamp) {
  getNftTimeSeries(
    id: $id
    bucket: $bucket
    interval: $interval
    start: $start
    end: $end
  ) {
    time
    alt_rank
    contributors_active
    contributors_created
    interactions
    market_cap
    posts_active
    posts_created
    sentiment
    social_dominance
  }
}
    `;
export const GetNftTimeSeriesV2Document = `
    query GetNftTimeSeriesV2($nft: String!, $bucket: String, $interval: String, $start: UnixTimestamp, $end: UnixTimestamp) {
  getNftTimeSeriesV2(
    nft: $nft
    bucket: $bucket
    interval: $interval
    start: $start
    end: $end
  ) {
    time
    alt_rank
    contributors_active
    contributors_created
    interactions
    market_cap
    posts_active
    posts_created
    sentiment
    social_dominance
  }
}
    `;
export const GetSystemChangesDocument = `
    query GetSystemChanges($start: UnixTimestamp, $end: UnixTimestamp) {
  getSystemChanges(start: $start, end: $end) {
    asset_id
    asset_name
    asset_type
    change
    description
    time
  }
}
    `;
export const GetPostDetailsDocument = `
    query GetPostDetails($post_type: String!, $post_id: String!) {
  getPostDetails(post_type: $post_type, post_id: $post_id) {
    type
    id
    title
    description
    extraText
    metrics {
      bookmarks
      favorites
      retweets
      replies
      views
    }
    image {
      src
      width
      height
    }
    video
    images
    creator_id
    creator_name
    creator_display_name
    creator_avatar
    topics
    categories
  }
}
    `;
export const GetPostTimeSeriesDocument = `
    query GetPostTimeSeries($post_type: String!, $post_id: String!) {
  getPostTimeSeries(post_type: $post_type, post_id: $post_id) {
    time
    interactions
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    SystemHealth(variables?: SystemHealthQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SystemHealthQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SystemHealthQuery>(SystemHealthDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SystemHealth', 'query');
    },
    Ping(variables?: PingQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PingQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PingQuery>(PingDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Ping', 'query');
    },
    Health(variables?: HealthQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<HealthQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HealthQuery>(HealthDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Health', 'query');
    },
    Hello(variables?: HelloQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<HelloQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HelloQuery>(HelloDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Hello', 'query');
    },
    GetTopicsList(variables?: GetTopicsListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTopicsListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTopicsListQuery>(GetTopicsListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTopicsList', 'query');
    },
    GetTopic(variables: GetTopicQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTopicQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTopicQuery>(GetTopicDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTopic', 'query');
    },
    GetTopicWhatsup(variables: GetTopicWhatsupQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTopicWhatsupQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTopicWhatsupQuery>(GetTopicWhatsupDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTopicWhatsup', 'query');
    },
    GetTopicTimeSeries(variables: GetTopicTimeSeriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTopicTimeSeriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTopicTimeSeriesQuery>(GetTopicTimeSeriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTopicTimeSeries', 'query');
    },
    GetTopicTimeSeriesV2(variables: GetTopicTimeSeriesV2QueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTopicTimeSeriesV2Query> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTopicTimeSeriesV2Query>(GetTopicTimeSeriesV2Document, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTopicTimeSeriesV2', 'query');
    },
    GetTopicPosts(variables: GetTopicPostsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTopicPostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTopicPostsQuery>(GetTopicPostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTopicPosts', 'query');
    },
    GetTopicNews(variables: GetTopicNewsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTopicNewsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTopicNewsQuery>(GetTopicNewsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTopicNews', 'query');
    },
    GetTopicCreators(variables: GetTopicCreatorsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTopicCreatorsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTopicCreatorsQuery>(GetTopicCreatorsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTopicCreators', 'query');
    },
    GetCategoriesList(variables?: GetCategoriesListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCategoriesListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCategoriesListQuery>(GetCategoriesListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCategoriesList', 'query');
    },
    GetCategory(variables: GetCategoryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCategoryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCategoryQuery>(GetCategoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCategory', 'query');
    },
    GetCategoryTopics(variables: GetCategoryTopicsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCategoryTopicsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCategoryTopicsQuery>(GetCategoryTopicsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCategoryTopics', 'query');
    },
    GetCategoryTimeSeries(variables: GetCategoryTimeSeriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCategoryTimeSeriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCategoryTimeSeriesQuery>(GetCategoryTimeSeriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCategoryTimeSeries', 'query');
    },
    GetCategoryPosts(variables: GetCategoryPostsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCategoryPostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCategoryPostsQuery>(GetCategoryPostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCategoryPosts', 'query');
    },
    GetCategoryNews(variables: GetCategoryNewsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCategoryNewsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCategoryNewsQuery>(GetCategoryNewsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCategoryNews', 'query');
    },
    GetCategoryCreators(variables: GetCategoryCreatorsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCategoryCreatorsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCategoryCreatorsQuery>(GetCategoryCreatorsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCategoryCreators', 'query');
    },
    GetCreatorsList(variables?: GetCreatorsListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCreatorsListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCreatorsListQuery>(GetCreatorsListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCreatorsList', 'query');
    },
    GetCreator(variables: GetCreatorQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCreatorQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCreatorQuery>(GetCreatorDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCreator', 'query');
    },
    GetCreatorTimeSeries(variables: GetCreatorTimeSeriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCreatorTimeSeriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCreatorTimeSeriesQuery>(GetCreatorTimeSeriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCreatorTimeSeries', 'query');
    },
    GetCreatorPosts(variables: GetCreatorPostsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCreatorPostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCreatorPostsQuery>(GetCreatorPostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCreatorPosts', 'query');
    },
    GetCoinsList(variables?: GetCoinsListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCoinsListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCoinsListQuery>(GetCoinsListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCoinsList', 'query');
    },
    GetCoinsListV2(variables?: GetCoinsListV2QueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCoinsListV2Query> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCoinsListV2Query>(GetCoinsListV2Document, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCoinsListV2', 'query');
    },
    GetCoin(variables: GetCoinQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCoinQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCoinQuery>(GetCoinDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCoin', 'query');
    },
    GetCoinMeta(variables: GetCoinMetaQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCoinMetaQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCoinMetaQuery>(GetCoinMetaDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCoinMeta', 'query');
    },
    GetCoinTimeSeries(variables: GetCoinTimeSeriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCoinTimeSeriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCoinTimeSeriesQuery>(GetCoinTimeSeriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCoinTimeSeries', 'query');
    },
    GetStocksList(variables?: GetStocksListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetStocksListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetStocksListQuery>(GetStocksListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetStocksList', 'query');
    },
    GetStocksListV2(variables?: GetStocksListV2QueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetStocksListV2Query> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetStocksListV2Query>(GetStocksListV2Document, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetStocksListV2', 'query');
    },
    GetStock(variables: GetStockQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetStockQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetStockQuery>(GetStockDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetStock', 'query');
    },
    GetStockTimeSeries(variables: GetStockTimeSeriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetStockTimeSeriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetStockTimeSeriesQuery>(GetStockTimeSeriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetStockTimeSeries', 'query');
    },
    GetNftsList(variables?: GetNftsListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetNftsListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetNftsListQuery>(GetNftsListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetNftsList', 'query');
    },
    GetNftsListV2(variables?: GetNftsListV2QueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetNftsListV2Query> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetNftsListV2Query>(GetNftsListV2Document, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetNftsListV2', 'query');
    },
    GetNft(variables: GetNftQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetNftQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetNftQuery>(GetNftDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetNft', 'query');
    },
    GetNftTimeSeries(variables: GetNftTimeSeriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetNftTimeSeriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetNftTimeSeriesQuery>(GetNftTimeSeriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetNftTimeSeries', 'query');
    },
    GetNftTimeSeriesV2(variables: GetNftTimeSeriesV2QueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetNftTimeSeriesV2Query> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetNftTimeSeriesV2Query>(GetNftTimeSeriesV2Document, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetNftTimeSeriesV2', 'query');
    },
    GetSystemChanges(variables?: GetSystemChangesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetSystemChangesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetSystemChangesQuery>(GetSystemChangesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetSystemChanges', 'query');
    },
    GetPostDetails(variables: GetPostDetailsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPostDetailsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPostDetailsQuery>(GetPostDetailsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPostDetails', 'query');
    },
    GetPostTimeSeries(variables: GetPostTimeSeriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPostTimeSeriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPostTimeSeriesQuery>(GetPostTimeSeriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPostTimeSeries', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;