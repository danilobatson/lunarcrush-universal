/* eslint-disable */
// ================================================================
// 🚨 AUTO-GENERATED RESOLVER TYPES - DO NOT EDIT! 🚨
// ================================================================
// Generated from: schema/schema.graphql
// Command: yarn codegen
// Use: import type { Resolvers } from './resolvers-types'
// ================================================================

import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { AppContext } from '../types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: string; output: string; }
  JSON: { input: any; output: any; }
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

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

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

export enum TimeInterval {
  FourHours = 'FOUR_HOURS',
  OneDay = 'ONE_DAY',
  OneHour = 'ONE_HOUR',
  OneMonth = 'ONE_MONTH',
  OneWeek = 'ONE_WEEK'
}

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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Blockchain: ResolverTypeWrapper<Blockchain>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CategoryCreator: ResolverTypeWrapper<CategoryCreator>;
  CategoryDetails: ResolverTypeWrapper<CategoryDetails>;
  CategoryListItem: ResolverTypeWrapper<CategoryListItem>;
  CategoryNews: ResolverTypeWrapper<CategoryNews>;
  CategoryPost: ResolverTypeWrapper<CategoryPost>;
  CategoryTimeSeriesItem: ResolverTypeWrapper<CategoryTimeSeriesItem>;
  CategoryTopic: ResolverTypeWrapper<CategoryTopic>;
  CoinDetails: ResolverTypeWrapper<CoinDetails>;
  CoinListItem: ResolverTypeWrapper<CoinListItem>;
  CoinMeta: ResolverTypeWrapper<CoinMeta>;
  CoinTimeSeriesItem: ResolverTypeWrapper<CoinTimeSeriesItem>;
  CreateTopicInput: CreateTopicInput;
  CreatorDetails: ResolverTypeWrapper<CreatorDetails>;
  CreatorListItem: ResolverTypeWrapper<CreatorListItem>;
  CreatorPost: ResolverTypeWrapper<CreatorPost>;
  CreatorTimeSeriesItem: ResolverTypeWrapper<CreatorTimeSeriesItem>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  NftDetails: ResolverTypeWrapper<NftDetails>;
  NftListItem: ResolverTypeWrapper<NftListItem>;
  NftTimeSeriesItem: ResolverTypeWrapper<NftTimeSeriesItem>;
  PingResponse: ResolverTypeWrapper<PingResponse>;
  PostDetails: ResolverTypeWrapper<PostDetails>;
  PostImage: ResolverTypeWrapper<PostImage>;
  PostMetrics: ResolverTypeWrapper<PostMetrics>;
  PostTimeSeriesItem: ResolverTypeWrapper<PostTimeSeriesItem>;
  Query: ResolverTypeWrapper<{}>;
  SortDirection: SortDirection;
  StockDetails: ResolverTypeWrapper<StockDetails>;
  StockListItem: ResolverTypeWrapper<StockListItem>;
  StockTimeSeriesItem: ResolverTypeWrapper<StockTimeSeriesItem>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SystemChange: ResolverTypeWrapper<SystemChange>;
  SystemHealthResponse: ResolverTypeWrapper<SystemHealthResponse>;
  TimeInterval: TimeInterval;
  Topic: ResolverTypeWrapper<Topic>;
  TopicCreator: ResolverTypeWrapper<TopicCreator>;
  TopicDetails: ResolverTypeWrapper<TopicDetails>;
  TopicInfluence: ResolverTypeWrapper<TopicInfluence>;
  TopicListItem: ResolverTypeWrapper<TopicListItem>;
  TopicNews: ResolverTypeWrapper<TopicNews>;
  TopicPost: ResolverTypeWrapper<TopicPost>;
  TopicTimeSeriesItem: ResolverTypeWrapper<TopicTimeSeriesItem>;
  TopicWhatsup: ResolverTypeWrapper<TopicWhatsup>;
  UnixTimestamp: ResolverTypeWrapper<Scalars['UnixTimestamp']['output']>;
  UserPreferences: ResolverTypeWrapper<UserPreferences>;
  UserPreferencesInput: UserPreferencesInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Blockchain: Blockchain;
  Boolean: Scalars['Boolean']['output'];
  CategoryCreator: CategoryCreator;
  CategoryDetails: CategoryDetails;
  CategoryListItem: CategoryListItem;
  CategoryNews: CategoryNews;
  CategoryPost: CategoryPost;
  CategoryTimeSeriesItem: CategoryTimeSeriesItem;
  CategoryTopic: CategoryTopic;
  CoinDetails: CoinDetails;
  CoinListItem: CoinListItem;
  CoinMeta: CoinMeta;
  CoinTimeSeriesItem: CoinTimeSeriesItem;
  CreateTopicInput: CreateTopicInput;
  CreatorDetails: CreatorDetails;
  CreatorListItem: CreatorListItem;
  CreatorPost: CreatorPost;
  CreatorTimeSeriesItem: CreatorTimeSeriesItem;
  Date: Scalars['Date']['output'];
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  NftDetails: NftDetails;
  NftListItem: NftListItem;
  NftTimeSeriesItem: NftTimeSeriesItem;
  PingResponse: PingResponse;
  PostDetails: PostDetails;
  PostImage: PostImage;
  PostMetrics: PostMetrics;
  PostTimeSeriesItem: PostTimeSeriesItem;
  Query: {};
  StockDetails: StockDetails;
  StockListItem: StockListItem;
  StockTimeSeriesItem: StockTimeSeriesItem;
  String: Scalars['String']['output'];
  SystemChange: SystemChange;
  SystemHealthResponse: SystemHealthResponse;
  Topic: Topic;
  TopicCreator: TopicCreator;
  TopicDetails: TopicDetails;
  TopicInfluence: TopicInfluence;
  TopicListItem: TopicListItem;
  TopicNews: TopicNews;
  TopicPost: TopicPost;
  TopicTimeSeriesItem: TopicTimeSeriesItem;
  TopicWhatsup: TopicWhatsup;
  UnixTimestamp: Scalars['UnixTimestamp']['output'];
  UserPreferences: UserPreferences;
  UserPreferencesInput: UserPreferencesInput;
};

export type BlockchainResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Blockchain'] = ResolversParentTypes['Blockchain']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  decimals?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  network?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryCreatorResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['CategoryCreator'] = ResolversParentTypes['CategoryCreator']> = {
  creator_avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_followers?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  creator_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  interactions_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryDetailsResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['CategoryDetails'] = ResolversParentTypes['CategoryDetails']> = {
  interactions_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  num_contributors?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  num_posts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  related_topics?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topic?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  trend?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  types_count?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  types_interactions?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  types_sentiment?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  types_sentiment_detail?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryListItemResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['CategoryListItem'] = ResolversParentTypes['CategoryListItem']> = {
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  category_rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  category_rank_1h_previous?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  category_rank_24h_previous?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  interactions_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  num_contributors?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  num_posts?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  social_dominance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryNewsResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['CategoryNews'] = ResolversParentTypes['CategoryNews']> = {
  creator_avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_display_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_followers?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  creator_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  interactions_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  interactions_total?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  post_created?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  post_image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  post_link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  post_sentiment?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  post_title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  post_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryPostResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['CategoryPost'] = ResolversParentTypes['CategoryPost']> = {
  creator_avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_display_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_followers?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  creator_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  interactions_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  interactions_total?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  post_created?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  post_image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  post_link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  post_sentiment?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  post_title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  post_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryTimeSeriesItemResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['CategoryTimeSeriesItem'] = ResolversParentTypes['CategoryTimeSeriesItem']> = {
  contributors_active?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  contributors_created?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  interactions?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  posts_active?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  posts_created?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sentiment?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  spam?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryTopicResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['CategoryTopic'] = ResolversParentTypes['CategoryTopic']> = {
  interactions_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  num_contributors?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  num_posts?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  social_dominance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topic?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  topic_rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  topic_rank_1h_previous?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  topic_rank_24h_previous?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CoinDetailsResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['CoinDetails'] = ResolversParentTypes['CoinDetails']> = {
  alt_rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  circulating_supply?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  close?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  galaxy_score?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  market_cap?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  market_cap_rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  max_supply?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  percent_change_7d?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  percent_change_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  percent_change_30d?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price_btc?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  volatility?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  volume_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CoinListItemResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['CoinListItem'] = ResolversParentTypes['CoinListItem']> = {
  alt_rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  alt_rank_previous?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  blockchains?: Resolver<Maybe<Array<Maybe<ResolversTypes['Blockchain']>>>, ParentType, ContextType>;
  categories?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  circulating_supply?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  galaxy_score?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  galaxy_score_previous?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  interactions_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  last_updated_price?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  last_updated_price_by?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  market_cap?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  market_cap_rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  market_dominance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  market_dominance_prev?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  max_supply?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  percent_change_1h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  percent_change_7d?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  percent_change_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  percent_change_30d?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price_btc?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sentiment?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  social_dominance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  social_volume_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topic?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  volatility?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  volume_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CoinMetaResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['CoinMeta'] = ResolversParentTypes['CoinMeta']> = {
  blockchain?: Resolver<Maybe<Array<Maybe<ResolversTypes['Blockchain']>>>, ParentType, ContextType>;
  coingecko_link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coinmarketcap_link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  github_link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  header_image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  header_text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  market_categories?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reddit_link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  short_summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter_link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  videos?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  website_link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  whitepaper_link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CoinTimeSeriesItemResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['CoinTimeSeriesItem'] = ResolversParentTypes['CoinTimeSeriesItem']> = {
  alt_rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  circulating_supply?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  close?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  contributors_active?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  contributors_created?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  galaxy_score?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  high?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  interactions?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  low?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  market_cap?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  market_dominance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  open?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  posts_active?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  posts_created?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sentiment?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  social_dominance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  spam?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  volume_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorDetailsResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['CreatorDetails'] = ResolversParentTypes['CreatorDetails']> = {
  creator_avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_display_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_followers?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  creator_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_rank?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  interactions_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  topic_influence?: Resolver<Maybe<Array<Maybe<ResolversTypes['TopicInfluence']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorListItemResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['CreatorListItem'] = ResolversParentTypes['CreatorListItem']> = {
  creator_avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_display_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_followers?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  creator_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_network?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_posts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  creator_rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  interactions_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorPostResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['CreatorPost'] = ResolversParentTypes['CreatorPost']> = {
  creator_avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_display_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_followers?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  creator_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  interactions_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  interactions_total?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  post_created?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  post_image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  post_link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  post_sentiment?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  post_title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  post_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorTimeSeriesItemResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['CreatorTimeSeriesItem'] = ResolversParentTypes['CreatorTimeSeriesItem']> = {
  creator_rank?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  followers?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  interactions?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  posts_active?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type NftDetailsResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['NftDetails'] = ResolversParentTypes['NftDetails']> = {
  floor_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  market_cap?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  percent_change_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  volume_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NftListItemResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['NftListItem'] = ResolversParentTypes['NftListItem']> = {
  alt_rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  base_crypto?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  floor_price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  galaxy_score?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  interactions_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lunar_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  market_cap?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  percent_change_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  social_contributors?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  social_dominance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  social_volume_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  volume_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NftTimeSeriesItemResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['NftTimeSeriesItem'] = ResolversParentTypes['NftTimeSeriesItem']> = {
  alt_rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  contributors_active?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  contributors_created?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  interactions?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  market_cap?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  posts_active?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  posts_created?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sentiment?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  social_dominance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PingResponseResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['PingResponse'] = ResolversParentTypes['PingResponse']> = {
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostDetailsResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['PostDetails'] = ResolversParentTypes['PostDetails']> = {
  categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  creator_avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_display_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  extraText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['PostImage']>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  metrics?: Resolver<Maybe<ResolversTypes['PostMetrics']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topics?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostImageResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['PostImage'] = ResolversParentTypes['PostImage']> = {
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  src?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostMetricsResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['PostMetrics'] = ResolversParentTypes['PostMetrics']> = {
  bookmarks?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  favorites?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  replies?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  retweets?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  views?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostTimeSeriesItemResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['PostTimeSeriesItem'] = ResolversParentTypes['PostTimeSeriesItem']> = {
  interactions?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getCategoriesList?: Resolver<Maybe<Array<Maybe<ResolversTypes['CategoryListItem']>>>, ParentType, ContextType>;
  getCategory?: Resolver<Maybe<ResolversTypes['CategoryDetails']>, ParentType, ContextType, RequireFields<QueryGetCategoryArgs, 'category'>>;
  getCategoryCreators?: Resolver<Maybe<Array<Maybe<ResolversTypes['CategoryCreator']>>>, ParentType, ContextType, RequireFields<QueryGetCategoryCreatorsArgs, 'category'>>;
  getCategoryNews?: Resolver<Maybe<Array<Maybe<ResolversTypes['CategoryNews']>>>, ParentType, ContextType, RequireFields<QueryGetCategoryNewsArgs, 'category'>>;
  getCategoryPosts?: Resolver<Maybe<Array<Maybe<ResolversTypes['CategoryPost']>>>, ParentType, ContextType, RequireFields<QueryGetCategoryPostsArgs, 'category'>>;
  getCategoryTimeSeries?: Resolver<Maybe<Array<Maybe<ResolversTypes['CategoryTimeSeriesItem']>>>, ParentType, ContextType, RequireFields<QueryGetCategoryTimeSeriesArgs, 'category'>>;
  getCategoryTopics?: Resolver<Maybe<Array<Maybe<ResolversTypes['CategoryTopic']>>>, ParentType, ContextType, RequireFields<QueryGetCategoryTopicsArgs, 'category'>>;
  getCoin?: Resolver<Maybe<ResolversTypes['CoinDetails']>, ParentType, ContextType, RequireFields<QueryGetCoinArgs, 'coin'>>;
  getCoinMeta?: Resolver<Maybe<ResolversTypes['CoinMeta']>, ParentType, ContextType, RequireFields<QueryGetCoinMetaArgs, 'coin'>>;
  getCoinTimeSeries?: Resolver<Maybe<Array<Maybe<ResolversTypes['CoinTimeSeriesItem']>>>, ParentType, ContextType, RequireFields<QueryGetCoinTimeSeriesArgs, 'coin'>>;
  getCoinsList?: Resolver<Maybe<Array<Maybe<ResolversTypes['CoinListItem']>>>, ParentType, ContextType, Partial<QueryGetCoinsListArgs>>;
  getCoinsListV2?: Resolver<Maybe<Array<Maybe<ResolversTypes['CoinListItem']>>>, ParentType, ContextType, Partial<QueryGetCoinsListV2Args>>;
  getCreator?: Resolver<Maybe<ResolversTypes['CreatorDetails']>, ParentType, ContextType, RequireFields<QueryGetCreatorArgs, 'id' | 'network'>>;
  getCreatorPosts?: Resolver<Maybe<Array<Maybe<ResolversTypes['CreatorPost']>>>, ParentType, ContextType, RequireFields<QueryGetCreatorPostsArgs, 'id' | 'network'>>;
  getCreatorTimeSeries?: Resolver<Maybe<Array<Maybe<ResolversTypes['CreatorTimeSeriesItem']>>>, ParentType, ContextType, RequireFields<QueryGetCreatorTimeSeriesArgs, 'id' | 'network'>>;
  getCreatorsList?: Resolver<Maybe<Array<Maybe<ResolversTypes['CreatorListItem']>>>, ParentType, ContextType>;
  getNft?: Resolver<Maybe<ResolversTypes['NftDetails']>, ParentType, ContextType, RequireFields<QueryGetNftArgs, 'id'>>;
  getNftTimeSeries?: Resolver<Maybe<Array<Maybe<ResolversTypes['NftTimeSeriesItem']>>>, ParentType, ContextType, RequireFields<QueryGetNftTimeSeriesArgs, 'id'>>;
  getNftTimeSeriesV2?: Resolver<Maybe<Array<Maybe<ResolversTypes['NftTimeSeriesItem']>>>, ParentType, ContextType, RequireFields<QueryGetNftTimeSeriesV2Args, 'nft'>>;
  getNftsList?: Resolver<Maybe<Array<Maybe<ResolversTypes['NftListItem']>>>, ParentType, ContextType, Partial<QueryGetNftsListArgs>>;
  getNftsListV2?: Resolver<Maybe<Array<Maybe<ResolversTypes['NftListItem']>>>, ParentType, ContextType, Partial<QueryGetNftsListV2Args>>;
  getPostDetails?: Resolver<Maybe<ResolversTypes['PostDetails']>, ParentType, ContextType, RequireFields<QueryGetPostDetailsArgs, 'post_id' | 'post_type'>>;
  getPostTimeSeries?: Resolver<Maybe<Array<Maybe<ResolversTypes['PostTimeSeriesItem']>>>, ParentType, ContextType, RequireFields<QueryGetPostTimeSeriesArgs, 'post_id' | 'post_type'>>;
  getStock?: Resolver<Maybe<ResolversTypes['StockDetails']>, ParentType, ContextType, RequireFields<QueryGetStockArgs, 'stock'>>;
  getStockTimeSeries?: Resolver<Maybe<Array<Maybe<ResolversTypes['StockTimeSeriesItem']>>>, ParentType, ContextType, RequireFields<QueryGetStockTimeSeriesArgs, 'stock'>>;
  getStocksList?: Resolver<Maybe<Array<Maybe<ResolversTypes['StockListItem']>>>, ParentType, ContextType>;
  getStocksListV2?: Resolver<Maybe<Array<Maybe<ResolversTypes['StockListItem']>>>, ParentType, ContextType, Partial<QueryGetStocksListV2Args>>;
  getSystemChanges?: Resolver<Maybe<Array<Maybe<ResolversTypes['SystemChange']>>>, ParentType, ContextType, Partial<QueryGetSystemChangesArgs>>;
  getTopic?: Resolver<Maybe<ResolversTypes['TopicDetails']>, ParentType, ContextType, RequireFields<QueryGetTopicArgs, 'topic'>>;
  getTopicCreators?: Resolver<Maybe<Array<Maybe<ResolversTypes['TopicCreator']>>>, ParentType, ContextType, RequireFields<QueryGetTopicCreatorsArgs, 'topic'>>;
  getTopicNews?: Resolver<Maybe<Array<Maybe<ResolversTypes['TopicNews']>>>, ParentType, ContextType, RequireFields<QueryGetTopicNewsArgs, 'topic'>>;
  getTopicPosts?: Resolver<Maybe<Array<Maybe<ResolversTypes['TopicPost']>>>, ParentType, ContextType, RequireFields<QueryGetTopicPostsArgs, 'topic'>>;
  getTopicTimeSeries?: Resolver<Maybe<Array<Maybe<ResolversTypes['TopicTimeSeriesItem']>>>, ParentType, ContextType, RequireFields<QueryGetTopicTimeSeriesArgs, 'topic'>>;
  getTopicTimeSeriesV2?: Resolver<Maybe<Array<Maybe<ResolversTypes['TopicTimeSeriesItem']>>>, ParentType, ContextType, RequireFields<QueryGetTopicTimeSeriesV2Args, 'topic'>>;
  getTopicWhatsup?: Resolver<Maybe<ResolversTypes['TopicWhatsup']>, ParentType, ContextType, RequireFields<QueryGetTopicWhatsupArgs, 'topic'>>;
  getTopicsList?: Resolver<Maybe<Array<Maybe<ResolversTypes['TopicListItem']>>>, ParentType, ContextType>;
  health?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ping?: Resolver<Maybe<ResolversTypes['PingResponse']>, ParentType, ContextType>;
  systemHealth?: Resolver<Maybe<ResolversTypes['SystemHealthResponse']>, ParentType, ContextType>;
};

export type StockDetailsResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['StockDetails'] = ResolversParentTypes['StockDetails']> = {
  close?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  market_cap?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  market_cap_rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  percent_change_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  volume_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StockListItemResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['StockListItem'] = ResolversParentTypes['StockListItem']> = {
  alt_rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  alt_rank_previous?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  categories?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  galaxy_score?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  galaxy_score_previous?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  interactions_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  last_updated_price?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  last_updated_price_by?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  market_cap?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  market_cap_rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  market_dominance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  market_dominance_prev?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  percent_change_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sentiment?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  social_dominance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  social_volume_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topic?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  volume_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StockTimeSeriesItemResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['StockTimeSeriesItem'] = ResolversParentTypes['StockTimeSeriesItem']> = {
  alt_rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  close?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  contributors_active?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  contributors_created?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  galaxy_score?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  high?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  interactions?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  low?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  market_cap?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  market_dominance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  open?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  posts_active?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  posts_created?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sentiment?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  social_dominance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  spam?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SystemChangeResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['SystemChange'] = ResolversParentTypes['SystemChange']> = {
  asset_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  asset_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  asset_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  change?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SystemHealthResponseResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['SystemHealthResponse'] = ResolversParentTypes['SystemHealthResponse']> = {
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uptime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Topic'] = ResolversParentTypes['Topic']> = {
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topic?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicCreatorResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['TopicCreator'] = ResolversParentTypes['TopicCreator']> = {
  creator_avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_followers?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  creator_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_rank?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  interactions_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicDetailsResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['TopicDetails'] = ResolversParentTypes['TopicDetails']> = {
  categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  interactions_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  num_contributors?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  num_posts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  related_topics?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topic?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topic_rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  trend?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  types_count?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  types_interactions?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  types_sentiment?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  types_sentiment_detail?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicInfluenceResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['TopicInfluence'] = ResolversParentTypes['TopicInfluence']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  percent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  topic?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicListItemResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['TopicListItem'] = ResolversParentTypes['TopicListItem']> = {
  interactions_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  num_contributors?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  num_posts?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topic?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  topic_rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  topic_rank_1h_previous?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  topic_rank_24h_previous?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicNewsResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['TopicNews'] = ResolversParentTypes['TopicNews']> = {
  creator_avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_display_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_followers?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  creator_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  interactions_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  interactions_total?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  post_created?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  post_image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  post_link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  post_sentiment?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  post_title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  post_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicPostResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['TopicPost'] = ResolversParentTypes['TopicPost']> = {
  creator_avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_display_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_followers?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  creator_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  interactions_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  interactions_total?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  post_created?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  post_image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  post_link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  post_sentiment?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  post_title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  post_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicTimeSeriesItemResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['TopicTimeSeriesItem'] = ResolversParentTypes['TopicTimeSeriesItem']> = {
  alt_rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  circulating_supply?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  close?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  contributors_active?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  contributors_created?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  galaxy_score?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  high?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  interactions?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  low?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  market_cap?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  market_dominance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  open?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  posts_active?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  posts_created?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sentiment?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  social_dominance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  spam?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  volume_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicWhatsupResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['TopicWhatsup'] = ResolversParentTypes['TopicWhatsup']> = {
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UnixTimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnixTimestamp'], any> {
  name: 'UnixTimestamp';
}

export type UserPreferencesResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['UserPreferences'] = ResolversParentTypes['UserPreferences']> = {
  currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  favoriteTopics?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  notifications?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  theme?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = AppContext> = {
  Blockchain?: BlockchainResolvers<ContextType>;
  CategoryCreator?: CategoryCreatorResolvers<ContextType>;
  CategoryDetails?: CategoryDetailsResolvers<ContextType>;
  CategoryListItem?: CategoryListItemResolvers<ContextType>;
  CategoryNews?: CategoryNewsResolvers<ContextType>;
  CategoryPost?: CategoryPostResolvers<ContextType>;
  CategoryTimeSeriesItem?: CategoryTimeSeriesItemResolvers<ContextType>;
  CategoryTopic?: CategoryTopicResolvers<ContextType>;
  CoinDetails?: CoinDetailsResolvers<ContextType>;
  CoinListItem?: CoinListItemResolvers<ContextType>;
  CoinMeta?: CoinMetaResolvers<ContextType>;
  CoinTimeSeriesItem?: CoinTimeSeriesItemResolvers<ContextType>;
  CreatorDetails?: CreatorDetailsResolvers<ContextType>;
  CreatorListItem?: CreatorListItemResolvers<ContextType>;
  CreatorPost?: CreatorPostResolvers<ContextType>;
  CreatorTimeSeriesItem?: CreatorTimeSeriesItemResolvers<ContextType>;
  Date?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  NftDetails?: NftDetailsResolvers<ContextType>;
  NftListItem?: NftListItemResolvers<ContextType>;
  NftTimeSeriesItem?: NftTimeSeriesItemResolvers<ContextType>;
  PingResponse?: PingResponseResolvers<ContextType>;
  PostDetails?: PostDetailsResolvers<ContextType>;
  PostImage?: PostImageResolvers<ContextType>;
  PostMetrics?: PostMetricsResolvers<ContextType>;
  PostTimeSeriesItem?: PostTimeSeriesItemResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  StockDetails?: StockDetailsResolvers<ContextType>;
  StockListItem?: StockListItemResolvers<ContextType>;
  StockTimeSeriesItem?: StockTimeSeriesItemResolvers<ContextType>;
  SystemChange?: SystemChangeResolvers<ContextType>;
  SystemHealthResponse?: SystemHealthResponseResolvers<ContextType>;
  Topic?: TopicResolvers<ContextType>;
  TopicCreator?: TopicCreatorResolvers<ContextType>;
  TopicDetails?: TopicDetailsResolvers<ContextType>;
  TopicInfluence?: TopicInfluenceResolvers<ContextType>;
  TopicListItem?: TopicListItemResolvers<ContextType>;
  TopicNews?: TopicNewsResolvers<ContextType>;
  TopicPost?: TopicPostResolvers<ContextType>;
  TopicTimeSeriesItem?: TopicTimeSeriesItemResolvers<ContextType>;
  TopicWhatsup?: TopicWhatsupResolvers<ContextType>;
  UnixTimestamp?: GraphQLScalarType;
  UserPreferences?: UserPreferencesResolvers<ContextType>;
};

