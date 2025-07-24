// 🌙 LunarCrush Universal SDK - Complete Schema Definition
// =========================================================
// Single source of truth for all LunarCrush API types, schemas, interfaces, and enums
// Generated from API_DOCS.md - Matches LunarCrush API v4 exactly
// Last updated: July 23, 2025

// ===== CORE ENUMS =====

/**
 * Time intervals supported by LunarCrush API
 */
export enum TimeInterval {
	ONE_HOUR = '1h',
	ONE_DAY = '1d',
	ONE_WEEK = '1w',
	ONE_MONTH = '1m',
	THREE_MONTHS = '3m',
	SIX_MONTHS = '6m',
	ONE_YEAR = '1y',
}

/**
 * Time buckets for aggregation
 */
export enum TimeBucket {
	HOUR = 'hour',
	DAY = 'day',
}

/**
 * Sort directions
 */
export enum SortDirection {
	ASC = 'asc',
	DESC = 'desc',
}

/**
 * Post types from social networks
 */
export enum PostType {
	TWEET = 'tweet',
	NEWS = 'news',
	YOUTUBE_VIDEO = 'youtube-video',
	TIKTOK = 'tiktok',
	REDDIT = 'reddit',
	TELEGRAM = 'telegram',
}

/**
 * Social networks supported
 */
export enum SocialNetwork {
	TWITTER = 'twitter',
	YOUTUBE = 'youtube',
	TIKTOK = 'tiktok',
	REDDIT = 'reddit',
	TELEGRAM = 'telegram',
}

/**
 * Asset types
 */
export enum AssetType {
	COIN = 'coin',
	STOCK = 'stock',
	NFT = 'nft',
	TOPIC = 'topic',
	CATEGORY = 'category',
	CREATOR = 'creator',
}

/**
 * Blockchain types
 */
export enum BlockchainType {
	LAYER1 = 'layer1',
	LAYER2 = 'layer2',
	TOKEN = 'token',
}

// ===== FUNDAMENTAL TYPES =====

/**
 * Standard API configuration included in all responses
 */
export interface ApiConfig {
	topic?: string;
	id?: string | number;
	name?: string;
	symbol?: string;
	interval?: string;
	start?: number;
	end?: number;
	bucket?: string;
	metrics?: string[];
	generated?: number;
	sort?: string;
	desc?: boolean;
	limit?: number;
	page?: number;
	total_rows?: number;
	category?: string;
	type?: string;
	remote_api?: string;
}

/**
 * Standard API response wrapper
 */
export interface LunarCrushAPIResponse<T = any> {
	config?: ApiConfig;
	data?: T;
	summary?: string;
	errors?: Array<{
		message: string;
		locations?: Array<{
			line: number;
			column: number;
		}>;
		path?: Array<string | number>;
	}>;
}

/**
 * Blockchain information for assets
 */
export interface BlockchainInfo {
	type: string;
	network: string;
	address?: string | null;
	decimals?: number | null;
}

// ===== TOPIC TYPES (from /topics/* endpoints) =====

/**
 * Topic list item from /topics/list/v1
 */
export interface TopicListItem {
	/** LunarCrush social topic. Can only include letters, numbers, spaces, #, and $ */
	topic: string;
	/** The case sensitive title of the topic or category */
	title: string;
	/** LunarCrush metric for ranking a social topic relative to all other social topics */
	topic_rank: number;
	/** The topic rank from 1 hour ago */
	topic_rank_1h_previous: number;
	/** The topic rank from 24 hours ago */
	topic_rank_24h_previous: number;
	/** The number of unique social contributors to the topic */
	num_contributors: number;
	/** Total number of posts with interactions on this topic in the last 24 hours */
	num_posts: number;
	/** Number of interactions in the last 24 hours */
	interactions_24h: number;
}

/**
 * Topic details from /topic/:topic/v1
 */
export interface TopicDetails {
	/** LunarCrush social topic. Can only include letters, numbers, spaces, #, and $ */
	topic: string;
	/** The case sensitive title of the topic or category */
	title: string;
	/** LunarCrush metric for ranking a social topic relative to all other social topics */
	topic_rank: number;
	/** Related topics */
	related_topics: string[];
	/** Types count data */
	types_count: any;
	/** Types interactions data */
	types_interactions: any;
	/** Types sentiment data */
	types_sentiment: any;
	/** Detailed types sentiment data */
	types_sentiment_detail: any;
	/** Number of interactions in the last 24 hours */
	interactions_24h: number;
	/** The number of unique social contributors to the topic */
	num_contributors: number;
	/** Total number of posts with interactions on this topic in the last 24 hours */
	num_posts: number;
	/** Categories this topic belongs to */
	categories: string[];
	/** Trending direction indicator */
	trend: string;
}

/**
 * Topic "what's up" summary from /topic/:topic/whatsup/v1
 */
export interface TopicWhatsup {
	config: ApiConfig;
	/** AI-generated summary of the hottest news and social posts */
	summary: string;
}

/**
 * Topic time series data point from /topic/:topic/time-series/v1 and v2
 */
export interface TopicTimeSeriesItem {
	/** Unix timestamp (in seconds) */
	time: number;
	/** Number of unique social accounts with posts that have interactions */
	contributors_active?: number;
	/** Number of unique social accounts that created new posts */
	contributors_created?: number;
	/** Number of all publicly measurable interactions on a social post */
	interactions?: number;
	/** Number of unique social posts with interactions */
	posts_active?: number;
	/** Number of unique social posts created */
	posts_created?: number;
	/** % of posts (weighted by interactions) that are positive. 100% = all positive, 50% = half positive/negative, 0% = all negative */
	sentiment?: number;
	/** The number of posts created that are considered spam */
	spam?: number;
	/** A proprietary score based on how an asset is performing relative to all other assets supported */
	alt_rank?: number;
	/** Circulating Supply - total number of coins/tokens actively available for trade */
	circulating_supply?: number;
	/** Close price for the time period */
	close?: number;
	/** Proprietary score based on technical indicators of price, sentiment, social activity, and correlation factors */
	galaxy_score?: number;
	/** Highest price for the time period */
	high?: number;
	/** Lowest price for the time period */
	low?: number;
	/** Total dollar market value of all circulating supply or outstanding shares */
	market_cap?: number;
	/** The percent of the total market cap that this asset represents */
	market_dominance?: number;
	/** Open price for the time period */
	open?: number;
	/** The percent of the total social volume that this topic represents */
	social_dominance?: number;
	/** Volume in USD for 24 hours up to this data point */
	volume_24h?: number;
}

/**
 * Topic post from /topic/:topic/posts/v1
 */
export interface TopicPost {
	/** Unique id of the social post */
	id: string;
	/** The type of social post */
	post_type: string;
	/** The title text of the social post */
	post_title: string;
	/** The URL to view the social post on the social network */
	post_link: string;
	/** The URL to the primary image for the post if available */
	post_image?: string;
	/** The unix timestamp of when the post was created */
	post_created: number;
	/** Sentiment score between 1-5 (1=very negative, 3=neutral, 5=very positive) */
	post_sentiment: number;
	/** The [network]::[unique_id] for the influencer */
	creator_id: string;
	/** The unique screen name for the influencer */
	creator_name: string;
	/** The chosen display name for the influencer if available */
	creator_display_name: string;
	/** Number of followers the account has */
	creator_followers: number;
	/** The URL to the avatar for the creator */
	creator_avatar: string;
	/** Number of interactions in the last 24 hours */
	interactions_24h: number;
	/** Number of total interactions */
	interactions_total: number;
}

/**
 * Topic news (same structure as TopicPost but from /topic/:topic/news/v1)
 */
export interface TopicNews extends TopicPost {}

/**
 * Topic creator from /topic/:topic/creators/v1
 */
export interface TopicCreator {
	/** The [network]::[unique_id] for the influencer */
	creator_id: string;
	/** The unique screen name for the influencer */
	creator_name: string;
	/** The URL to the avatar for the creator */
	creator_avatar: string;
	/** Number of followers the account has */
	creator_followers: number;
	/** Ranking based on all posts in the last 24 hours that have interactions */
	creator_rank: number;
	/** Number of interactions in the last 24 hours */
	interactions_24h: number;
}

// ===== CATEGORY TYPES (from /categories/* endpoints) =====

/**
 * Category list item from /categories/list/v1
 */
export interface CategoryListItem {
	/** Category identifier */
	category: string;
	/** The case sensitive title of the category */
	title: string;
	/** LunarCrush metric for ranking a category relative to all other categories */
	category_rank: number;
	/** The category rank from 1 hour ago */
	category_rank_1h_previous: number;
	/** The category rank from 24 hours ago */
	category_rank_24h_previous: number;
	/** The number of unique social contributors to the category */
	num_contributors: number;
	/** The percent of the total social volume that this category represents */
	social_dominance: number;
	/** Total number of posts with interactions in this category in the last 24 hours */
	num_posts: number;
	/** Number of interactions in the last 24 hours */
	interactions_24h: number;
}

/**
 * Category details from /category/:category/v1
 */
export interface CategoryDetails {
	/** Category topic */
	topic: string;
	/** The case sensitive title of the category */
	title: string;
	/** Related topics */
	related_topics: string[];
	/** Types count data */
	types_count: any;
	/** Types interactions data */
	types_interactions: any;
	/** Types sentiment data */
	types_sentiment: any;
	/** Detailed types sentiment data */
	types_sentiment_detail: any;
	/** Number of interactions in the last 24 hours */
	interactions_24h: number;
	/** The number of unique social contributors to the category */
	num_contributors: number;
	/** Total number of posts with interactions in this category in the last 24 hours */
	num_posts: number;
	/** Trending direction indicator */
	trend: string;
}

/**
 * Category topic from /category/:category/topics/v1
 */
export interface CategoryTopic {
	/** LunarCrush social topic */
	topic: string;
	/** The case sensitive title of the topic */
	title: string;
	/** Topic rank */
	topic_rank: number;
	/** The topic rank from 1 hour ago */
	topic_rank_1h_previous: number;
	/** The topic rank from 24 hours ago */
	topic_rank_24h_previous: number;
	/** The number of unique social contributors */
	num_contributors: number;
	/** The percent of the total social volume that this topic represents */
	social_dominance: number;
	/** Total number of posts with interactions */
	num_posts: number;
	/** Number of interactions in the last 24 hours */
	interactions_24h: number;
}

/**
 * Category time series data point from /category/:category/time-series/v1
 */
export interface CategoryTimeSeriesItem {
	/** Unix timestamp (in seconds) */
	time: number;
	/** Number of unique social accounts with posts that have interactions */
	contributors_active: number;
	/** Number of unique social accounts that created new posts */
	contributors_created: number;
	/** Number of all publicly measurable interactions */
	interactions: number;
	/** Number of unique social posts with interactions */
	posts_active: number;
	/** Number of unique social posts created */
	posts_created: number;
	/** % of posts (weighted by interactions) that are positive */
	sentiment?: number;
	/** The number of posts created that are considered spam */
	spam: number;
}

/**
 * Category post (same structure as TopicPost)
 */
export interface CategoryPost extends TopicPost {}

/**
 * Category news (same structure as TopicPost)
 */
export interface CategoryNews extends TopicPost {}

/**
 * Category creator (same structure as TopicCreator)
 */
export interface CategoryCreator extends TopicCreator {}

// ===== CREATOR TYPES (from /creators/* endpoints) =====

/**
 * Creator list item from /creators/list/v1
 */
export interface CreatorListItem {
	/** The unique screen name for the influencer */
	creator_name: string;
	/** The chosen display name for the influencer if available */
	creator_display_name: string;
	/** The [network]::[unique_id] for the influencer */
	creator_id: string;
	/** The social network */
	creator_network: string;
	/** The URL to the avatar for the creator */
	creator_avatar: string;
	/** Number of followers the account has */
	creator_followers: number;
	/** Number of posts created */
	creator_posts: number;
	/** Creator ranking */
	creator_rank: number;
	/** Number of interactions in the last 24 hours */
	interactions_24h: number;
}

/**
 * Topic influence data for creators
 */
export interface TopicInfluence {
	/** Topic name */
	topic: string;
	/** Number of posts about this topic */
	count: number;
	/** Percentage of creator's posts about this topic */
	percent: number;
	/** Creator's rank for this topic */
	rank: number;
}

/**
 * Creator details from /creator/:network/:id/v1
 */
export interface CreatorDetails {
	/** The [network]::[unique_id] for the influencer */
	creator_id: string;
	/** The unique screen name for the influencer */
	creator_name: string;
	/** The chosen display name for the influencer if available */
	creator_display_name: string;
	/** The URL to the avatar for the creator */
	creator_avatar: string;
	/** Number of followers the account has */
	creator_followers: number;
	/** Creator ranking */
	creator_rank: string;
	/** Number of interactions in the last 24 hours */
	interactions_24h: number;
	/** Topics the creator has influence in */
	topic_influence: TopicInfluence[];
}

/**
 * Creator time series data point from /creator/:network/:id/time-series/v1
 */
export interface CreatorTimeSeriesItem {
	/** Unix timestamp (in seconds) */
	time: number;
	/** Number of posts created */
	posts_created: number;
	/** Number of interactions */
	interactions: number;
	/** Sentiment score */
	sentiment: number;
}

/**
 * Creator post (same structure as TopicPost)
 */
export interface CreatorPost extends TopicPost {}

// ===== COIN TYPES (from /coins/* endpoints) =====

/**
 * Coin list item from /coins/list/v1 and v2
 */
export interface CoinListItem {
	/** LunarCrush internal ID for the asset */
	id: number;
	/** The symbol for the asset */
	symbol: string;
	/** The full name of the asset */
	name: string;
	/** Current price in USD */
	price: number;
	/** Current price in BTC */
	price_btc: number;
	/** Volume in USD for 24 hours */
	volume_24h: number;
	/** Volatility calculated as standard deviation of price */
	volatility: number;
	/** Circulating supply - total number of coins/tokens actively available */
	circulating_supply: number;
	/** The maximum supply of the asset if available */
	max_supply?: number;
	/** Percent change in price since 1 hour ago */
	percent_change_1h: number;
	/** Percent change in price since 24 hours ago */
	percent_change_24h: number;
	/** Percent change in price since 7 days ago */
	percent_change_7d: number;
	/** Percent change in price since 30 days ago */
	percent_change_30d: number;
	/** Total dollar market value of all circulating supply */
	market_cap: number;
	/** The rank of the asset by market cap */
	market_cap_rank: number;
	/** Number of interactions in the last 24 hours */
	interactions_24h: number;
	/** Total number of posts with interactions in the last 24 hours */
	social_volume_24h: number;
	/** The percent of the total social volume that this topic represents */
	social_dominance: number;
	/** The percent of the total market cap that this asset represents */
	market_dominance: number;
	/** Previous market dominance */
	market_dominance_prev: number;
	/** Proprietary score based on technical indicators and social metrics */
	galaxy_score: number;
	/** The galaxy score from the previous 24 hours */
	galaxy_score_previous: number;
	/** Proprietary score based on asset performance relative to all others */
	alt_rank: number;
	/** The alt rank from the previous 24 hours */
	alt_rank_previous: number;
	/** % of posts (weighted by interactions) that are positive */
	sentiment?: number;
	/** Comma delimited string of sub categories/sectors this asset belongs to */
	categories: string;
	/** Array of blockchains that the asset is part of */
	blockchains?: BlockchainInfo[];
	/** Unix timestamp when price was last updated */
	last_updated_price: number;
	/** Source that last updated the price */
	last_updated_price_by: string;
	/** LunarCrush social topic */
	topic: string;
	/** The URL to the logo for the asset */
	logo: string;
}

/**
 * Coin details from /coins/:coin/v1
 */
export interface CoinDetails {
	/** LunarCrush internal ID for the asset */
	id: number;
	/** The full name of the asset */
	name: string;
	/** The symbol for the asset */
	symbol: string;
	/** Current price in USD */
	price: number;
	/** Current price in BTC */
	price_btc: number;
	/** Total dollar market value of all circulating supply */
	market_cap: number;
	/** Percent change in price since 24 hours ago */
	percent_change_24h: number;
	/** Percent change in price since 7 days ago */
	percent_change_7d: number;
	/** Percent change in price since 30 days ago */
	percent_change_30d: number;
	/** Volume in USD for 24 hours */
	volume_24h: number;
	/** The maximum supply of the asset if available */
	max_supply?: number;
	/** Circulating supply */
	circulating_supply: number;
	/** Close price for the time period */
	close: number;
	/** Galaxy score */
	galaxy_score: number;
	/** Alt rank */
	alt_rank: number;
	/** Volatility */
	volatility: number;
	/** Market cap rank */
	market_cap_rank: number;
}

/**
 * Coin time series data point from /coins/:coin/time-series/v1
 */
export interface CoinTimeSeriesItem extends TopicTimeSeriesItem {}

/**
 * Coin meta information from /coins/:coin/meta/v1
 */
export interface CoinMeta {
	/** Asset ID */
	id: number;
	/** Asset symbol */
	symbol: string;
	/** Asset name */
	name: string;
	/** Asset description */
	description?: string;
	/** Asset logo URL */
	logo?: string;
	/** Website URL */
	website?: string;
	/** Social links */
	social_links?: {
		twitter?: string;
		telegram?: string;
		discord?: string;
		reddit?: string;
	};
	/** Technical details */
	technical?: {
		whitepaper?: string;
		source_code?: string;
		block_explorer?: string;
	};
}

// ===== STOCK TYPES (from /stocks/* endpoints) =====

/**
 * Stock list item from /stocks/list/v1 and v2
 */
export interface StockListItem {
	/** LunarCrush internal ID for the asset */
	id: number;
	/** The symbol for the stock */
	symbol: string;
	/** The full name of the stock */
	name: string;
	/** Current price in USD */
	price: number;
	/** Volume in USD for 24 hours */
	volume_24h: number;
	/** Percent change in price since 24 hours ago */
	percent_change_24h: number;
	/** Total dollar market value */
	market_cap: number;
	/** The rank of the stock by market cap */
	market_cap_rank: number;
	/** Number of interactions in the last 24 hours */
	interactions_24h: number;
	/** Total number of posts with interactions in the last 24 hours */
	social_volume_24h: number;
	/** The percent of the total social volume that this stock represents */
	social_dominance: number;
	/** The percent of the total market cap that this stock represents */
	market_dominance: number;
	/** Previous market dominance */
	market_dominance_prev?: number;
	/** Galaxy score */
	galaxy_score: number;
	/** Previous galaxy score */
	galaxy_score_previous: number;
	/** Alt rank */
	alt_rank: number;
	/** Previous alt rank */
	alt_rank_previous: number;
	/** Sentiment percentage */
	sentiment?: number;
	/** Categories */
	categories: string;
	/** Associated topic */
	topic: string;
	/** Logo URL */
	logo: string;
}

/**
 * Stock details from /stocks/:stock/v1
 */
export interface StockDetails {
	/** LunarCrush internal ID for the asset */
	id: number;
	/** The full name of the stock */
	name: string;
	/** The symbol for the stock */
	symbol: string;
	/** Current price in USD */
	price: number;
	/** Market cap */
	market_cap: number;
	/** Percent change in price since 24 hours ago */
	percent_change_24h: number;
	/** Volume for 24 hours */
	volume_24h: number;
	/** Close price */
	close: number;
	/** Market cap rank */
	market_cap_rank: number;
}

/**
 * Stock time series data point from /stocks/:stock/time-series/v1
 */
export interface StockTimeSeriesItem extends TopicTimeSeriesItem {}

// ===== NFT TYPES (from /nfts/* endpoints) =====

/**
 * NFT list item from /nfts/list/v1 and v2
 */
export interface NFTListItem {
	/** LunarCrush internal ID for the NFT */
	id: number;
	/** The symbol for the NFT collection */
	symbol: string;
	/** The full name of the NFT collection */
	name: string;
	/** Floor price in USD */
	price: number;
	/** Volume in USD for 24 hours */
	volume_24h: number;
	/** Percent change in price since 24 hours ago */
	percent_change_24h: number;
	/** Total market value */
	market_cap: number;
	/** Market cap rank */
	market_cap_rank: number;
	/** Number of interactions in the last 24 hours */
	interactions_24h: number;
	/** Social volume in 24 hours */
	social_volume_24h: number;
	/** Social dominance percentage */
	social_dominance: number;
	/** Galaxy score */
	galaxy_score: number;
	/** Previous galaxy score */
	galaxy_score_previous: number;
	/** Alt rank */
	alt_rank: number;
	/** Previous alt rank */
	alt_rank_previous: number;
	/** Sentiment percentage */
	sentiment?: number;
	/** Categories */
	categories: string;
	/** Associated topic */
	topic: string;
	/** Logo URL */
	logo: string;
}

/**
 * NFT details from /nfts/:nft/v1
 */
export interface NFTDetails {
	/** LunarCrush internal ID */
	id: number;
	/** NFT collection name */
	name: string;
	/** NFT collection symbol */
	symbol: string;
	/** Floor price */
	price: number;
	/** Market cap */
	market_cap: number;
	/** 24h percent change */
	percent_change_24h: number;
	/** 24h volume */
	volume_24h: number;
	/** Market cap rank */
	market_cap_rank: number;
}

/**
 * NFT time series data point from /nfts/:nft/time-series/v1 and v2
 */
export interface NFTTimeSeriesItem extends TopicTimeSeriesItem {}

// ===== SEARCH TYPES (from /searches/* endpoints) =====

/**
 * Search list item from /searches/list/v1
 */
export interface SearchListItem {
	/** Search ID */
	id: string;
	/** Search name */
	name: string;
	/** Search JSON configuration */
	search_json: any;
	/** Priority flag */
	priority: boolean;
	/** Creation timestamp */
	created: number;
}

/**
 * Search parameters for /searches/search/v1
 */
export interface SearchParams {
	/** Search term */
	term?: string;
	/** Search JSON configuration */
	searchJson?: string;
}

// ===== POSTS TYPES (from /posts/* endpoints) =====

/**
 * General post item from /posts/v1
 */
export interface PostItem extends TopicPost {}

/**
 * Posts time series data point from /posts/time-series/v1
 */
export interface PostTimeSeriesItem {
	/** Unix timestamp */
	time: number;
	/** Number of posts */
	posts: number;
	/** Number of interactions */
	interactions: number;
	/** Sentiment score */
	sentiment: number;
}

// ===== SYSTEM TYPES (from /system/* endpoints) =====

/**
 * System change item from /system/changes/v1
 */
export interface SystemChange {
	/** Asset type */
	asset_type: string;
	/** Asset ID */
	asset_id: number;
	/** Asset name */
	asset_name: string;
	/** Type of change */
	change: string;
	/** Change description */
	description: string;
	/** Timestamp of change */
	time: number;
}

// ===== REQUEST PARAMETER TYPES =====

/**
 * Common parameters for list endpoints
 */
export interface ListParams {
	/** Sort by metric */
	sort?: string;
	/** Limit number of results (default: 10, max: 1000) */
	limit?: number;
	/** Sort in descending order */
	desc?: string;
	/** Page number (starts at 0) */
	page?: number;
}

/**
 * Parameters for cryptocurrency list endpoints
 */
export interface CoinListParams extends ListParams {
	/** Filter by categories/sectors */
	filter?: string;
}

/**
 * Parameters for stock list endpoints
 */
export interface StockListParams extends ListParams {}

/**
 * Parameters for time series endpoints
 */
export interface TimeSeriesParams {
	/** Time bucket (hour/day) */
	bucket?: string;
	/** Time interval for convenience */
	interval?: string;
	/** Start timestamp */
	start?: string;
	/** End timestamp */
	end?: string;
}

/**
 * Parameters for posts endpoints
 */
export interface PostsParams {
	/** Start timestamp */
	start?: string;
	/** End timestamp */
	end?: string;
}

/**
 * Parameters for creator endpoints
 */
export interface CreatorParams {
	/** Social network */
	network: string;
	/** Creator ID on the network */
	id: string;
}

// ===== GRAPHQL RESPONSE TYPES =====

/**
 * Standard GraphQL response wrapper
 */
export interface GraphQLResponse<T = any> {
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

// ===== UTILITY TYPES =====

/**
 * Comprehensive data for a topic including all related information
 */
export interface ComprehensiveTopicData {
	details: TopicDetails;
	timeSeries: TopicTimeSeriesItem[];
	posts: TopicPost[];
	news: TopicNews[];
	creators: TopicCreator[];
	whatsup?: TopicWhatsup;
}

/**
 * Comprehensive data for a cryptocurrency
 */
export interface ComprehensiveCoinData {
	details: CoinDetails;
	timeSeries: CoinTimeSeriesItem[];
	meta?: CoinMeta;
}

/**
 * Comprehensive data for a stock
 */
export interface ComprehensiveStockData {
	details: StockDetails;
	timeSeries: StockTimeSeriesItem[];
}

/**
 * Comprehensive data for an NFT collection
 */
export interface ComprehensiveNFTData {
	details: NFTDetails;
	timeSeries: NFTTimeSeriesItem[];
}

/**
 * Comprehensive data for a creator
 */
export interface ComprehensiveCreatorData {
	details: CreatorDetails;
	timeSeries: CreatorTimeSeriesItem[];
	posts: CreatorPost[];
}

/**
 * Comprehensive data for a category
 */
export interface ComprehensiveCategoryData {
	details: CategoryDetails;
	topics: CategoryTopic[];
	timeSeries: CategoryTimeSeriesItem[];
	posts: CategoryPost[];
	news: CategoryNews[];
	creators: CategoryCreator[];
}

// ===== CLIENT CONFIGURATION TYPES =====

/**
 * LunarCrush client configuration
 */
export interface LunarCrushClientConfig {
	/** API endpoint URL */
	endpoint?: string;
	/** HTTP headers including Authorization */
	headers?: Record<string, string>;
}

/**
 * GraphQL client configuration
 */
export interface GraphQLClientConfig {
	/** GraphQL endpoint URL */
	endpoint: string;
	/** HTTP headers */
	headers?: Record<string, string>;
}

/**
 * API error class
 */
export class LunarCrushAPIError extends Error {
	constructor(
		message: string,
		public statusCode?: number,
		public response?: any
	) {
		super(message);
		this.name = 'LunarCrushAPIError';
	}
}

// ===== EXPORT COLLECTIONS =====

/**
 * All topic-related types
 */
export type TopicTypes = {
	TopicListItem: TopicListItem;
	TopicDetails: TopicDetails;
	TopicWhatsup: TopicWhatsup;
	TopicTimeSeriesItem: TopicTimeSeriesItem;
	TopicPost: TopicPost;
	TopicNews: TopicNews;
	TopicCreator: TopicCreator;
	ComprehensiveTopicData: ComprehensiveTopicData;
};

/**
 * All coin-related types
 */
export type CoinTypes = {
	CoinListItem: CoinListItem;
	CoinDetails: CoinDetails;
	CoinTimeSeriesItem: CoinTimeSeriesItem;
	CoinMeta: CoinMeta;
	ComprehensiveCoinData: ComprehensiveCoinData;
};

/**
 * All stock-related types
 */
export type StockTypes = {
	StockListItem: StockListItem;
	StockDetails: StockDetails;
	StockTimeSeriesItem: StockTimeSeriesItem;
	ComprehensiveStockData: ComprehensiveStockData;
};

/**
 * All NFT-related types
 */
export type NFTTypes = {
	NFTListItem: NFTListItem;
	NFTDetails: NFTDetails;
	NFTTimeSeriesItem: NFTTimeSeriesItem;
	ComprehensiveNFTData: ComprehensiveNFTData;
};

/**
 * All category-related types
 */
export type CategoryTypes = {
	CategoryListItem: CategoryListItem;
	CategoryDetails: CategoryDetails;
	CategoryTopic: CategoryTopic;
	CategoryTimeSeriesItem: CategoryTimeSeriesItem;
	CategoryPost: CategoryPost;
	CategoryNews: CategoryNews;
	CategoryCreator: CategoryCreator;
	ComprehensiveCategoryData: ComprehensiveCategoryData;
};

/**
 * All creator-related types
 */
export type CreatorTypes = {
	CreatorListItem: CreatorListItem;
	CreatorDetails: CreatorDetails;
	CreatorTimeSeriesItem: CreatorTimeSeriesItem;
	CreatorPost: CreatorPost;
	TopicInfluence: TopicInfluence;
	ComprehensiveCreatorData: ComprehensiveCreatorData;
};

/**
 * All parameter types
 */
export type ParameterTypes = {
	ListParams: ListParams;
	CoinListParams: CoinListParams;
	StockListParams: StockListParams;
	TimeSeriesParams: TimeSeriesParams;
	PostsParams: PostsParams;
	CreatorParams: CreatorParams;
	SearchParams: SearchParams;
};

/**
 * All core types
 */
export type CoreTypes = {
	ApiConfig: ApiConfig;
	LunarCrushAPIResponse: LunarCrushAPIResponse;
	GraphQLResponse: GraphQLResponse;
	BlockchainInfo: BlockchainInfo;
	LunarCrushClientConfig: LunarCrushClientConfig;
	GraphQLClientConfig: GraphQLClientConfig;
	LunarCrushAPIError: typeof LunarCrushAPIError;
};

// Legacy export for backward compatibility
export type LunarCrushConfig = LunarCrushClientConfig;

// Default export containing all types for convenience
const LunarCrushSchema = {
	// Enums
	TimeInterval,
	TimeBucket,
	SortDirection,
	PostType,
	SocialNetwork,
	AssetType,
	BlockchainType,

	// Classes
	LunarCrushAPIError,
};

export default LunarCrushSchema;
