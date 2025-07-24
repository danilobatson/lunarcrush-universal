// 🌙 LunarCrush Universal - Shared Client Method Definitions
// =========================================================
// Single source of truth for ALL client method definitions
// Used by both SDK and Backend to ensure consistency

/**
 * Standard method naming convention mapping
 * Maps user-friendly names to actual API endpoint functions
 */
export const CLIENT_METHOD_MAP = {
	// ===== TOPICS =====
	topics: 'getTopicsList',
	topic: 'getTopic',
	topicWhatsup: 'getTopicWhatsup',
	topicTimeSeries: 'getTopicTimeSeries',
	topicTimeSeriesV2: 'getTopicTimeSeriesV2',
	topicPosts: 'getTopicPosts',
	topicNews: 'getTopicNews',
	topicCreators: 'getTopicCreators',

	// ===== COINS/CRYPTOCURRENCIES =====
	coins: 'getCoinsList',
	coinsV2: 'getCoinsListV2',
	coin: 'getCoin',
	coinTimeSeries: 'getCoinTimeSeries',
	coinMeta: 'getCoinMeta',

	// Aliases for better UX
	cryptocurrencies: 'getCoinsList',
	cryptocurrency: 'getCoin',
	cryptocurrencyTimeSeries: 'getCoinTimeSeries',

	// ===== STOCKS =====
	stocks: 'getStocksList',
	stocksV2: 'getStocksListV2',
	stock: 'getStock',
	stockTimeSeries: 'getStockTimeSeries',

	// ===== CATEGORIES =====
	categories: 'getCategoriesList',
	category: 'getCategory',
	categoryTopics: 'getCategoryTopics',
	categoryTimeSeries: 'getCategoryTimeSeries',
	categoryPosts: 'getCategoryPosts',
	categoryNews: 'getCategoryNews',
	categoryCreators: 'getCategoryCreators',

	// ===== CREATORS =====
	creators: 'getCreatorsList',
	creator: 'getCreator',
	creatorTimeSeries: 'getCreatorTimeSeries',
	creatorPosts: 'getCreatorPosts',

	// ===== POSTS =====
	postDetails: 'getPostDetails',
	postTimeSeries: 'getPostTimeSeries',

	// ===== NFTs =====
	nfts: 'getNftsList',
	nftsV2: 'getNftsListV2',
	nft: 'getNft',
	nftTimeSeries: 'getNftTimeSeries',
	nftTimeSeriesV1: 'getNftTimeSeriesV1',

	// ===== SYSTEM =====
	systemChanges: 'getSystemChanges',

	// ===== SEARCH =====
	searches: 'getSearchesList',
	search: 'getSearch',
	searchPosts: 'searchPosts',

	// ===== CONVENIENT ALIASES =====
	bitcoin: () => 'getTopic', // special case - calls getTopic('bitcoin')
	ethereum: () => 'getTopic', // special case - calls getTopic('ethereum')
	topCryptos: 'getCoinsList', // with limit parameter
} as const;

/**
 * Method signature definitions for type safety
 */
export interface ClientMethodSignatures {
	// ===== HEALTH =====
	health(): Promise<string>;

	// ===== TOPICS =====
	topics(): Promise<any[]>;
	topic(topic: string): Promise<any>;
	topicWhatsup(topic: string): Promise<any>;
	topicTimeSeries(
		topic: string,
		options?: {
			bucket?: string;
			interval?: string;
			start?: string;
			end?: string;
		}
	): Promise<any[]>;
	topicTimeSeriesV2(topic: string, bucket?: string): Promise<any[]>;
	topicPosts(
		topic: string,
		options?: {
			start?: string;
			end?: string;
		}
	): Promise<any[]>;
	topicNews(topic: string): Promise<any[]>;
	topicCreators(topic: string): Promise<any[]>;

	// ===== COINS/CRYPTOCURRENCIES =====
	coins(options?: {
		sort?: string;
		filter?: string;
		limit?: number;
		desc?: string;
		page?: number;
	}): Promise<any[]>;
	coinsV2(options?: {
		sort?: string;
		filter?: string;
		limit?: number;
		desc?: string;
		page?: number;
	}): Promise<any[]>;
	coin(coin: string): Promise<any>;
	coinTimeSeries(
		coin: string,
		options?: {
			bucket?: string;
			interval?: string;
			start?: string;
			end?: string;
		}
	): Promise<any[]>;
	coinMeta(coin: string): Promise<any>;

	// Aliases
	cryptocurrencies(options?: {
		sort?: string;
		filter?: string;
		limit?: number;
		desc?: string;
		page?: number;
	}): Promise<any[]>;
	cryptocurrency(coin: string): Promise<any>;
	cryptocurrencyTimeSeries(
		coin: string,
		options?: {
			bucket?: string;
			interval?: string;
			start?: string;
			end?: string;
		}
	): Promise<any[]>;

	// ===== STOCKS =====
	stocks(options?: {
		sort?: string;
		limit?: number;
		desc?: string;
		page?: number;
	}): Promise<any[]>;
	stocksV2(options?: {
		sort?: string;
		limit?: number;
		desc?: string;
		page?: number;
	}): Promise<any[]>;
	stock(stock: string): Promise<any>;
	stockTimeSeries(
		stock: string,
		options?: {
			bucket?: string;
			interval?: string;
			start?: string;
			end?: string;
		}
	): Promise<any[]>;

	// ===== CATEGORIES =====
	categories(): Promise<any[]>;
	category(category: string): Promise<any>;
	categoryTopics(category: string): Promise<any[]>;
	categoryTimeSeries(
		category: string,
		options?: {
			bucket?: string;
			interval?: string;
			start?: string;
			end?: string;
		}
	): Promise<any[]>;
	categoryPosts(
		category: string,
		options?: {
			start?: string;
			end?: string;
		}
	): Promise<any[]>;
	categoryNews(category: string): Promise<any[]>;
	categoryCreators(category: string): Promise<any[]>;

	// ===== CREATORS =====
	creators(): Promise<any[]>;
	creator(network: string, id: string): Promise<any>;
	creatorTimeSeries(
		network: string,
		id: string,
		options?: {
			bucket?: string;
			interval?: string;
			start?: string;
			end?: string;
		}
	): Promise<any[]>;
	creatorPosts(
		network: string,
		id: string,
		options?: {
			start?: string;
			end?: string;
		}
	): Promise<any[]>;

	// ===== POSTS =====
	postDetails(postType: string, postId: string): Promise<any>;
	postTimeSeries(postType: string, postId: string): Promise<any[]>;

	// ===== NFTs =====
	nfts(options?: {
		sort?: string;
		limit?: number;
		desc?: string;
		page?: number;
	}): Promise<any[]>;
	nftsV2(options?: {
		sort?: string;
		limit?: number;
		desc?: string;
		page?: number;
	}): Promise<any[]>;
	nft(nft: string): Promise<any>;
	nftTimeSeries(
		nft: string,
		options?: {
			bucket?: string;
			interval?: string;
			start?: string;
			end?: string;
		}
	): Promise<any[]>;
	nftTimeSeriesV1(nft: string): Promise<any>;

	// ===== SYSTEM =====
	systemChanges(): Promise<any[]>;

	// ===== SEARCH =====
	searches(): Promise<any[]>;
	search(slug: string): Promise<any>;
	searchPosts(term?: string, searchJson?: string): Promise<any>;

	// ===== CONVENIENCE METHODS =====
	bitcoin(): Promise<any>;
	ethereum(): Promise<any>;
	topCryptos(limit?: number): Promise<any[]>;

	// ===== COMPREHENSIVE DATA METHODS =====
	getComprehensiveTopicData(topic: string): Promise<{
		details: any;
		timeSeries: any[];
		posts: any[];
		news: any[];
	}>;
	getComprehensiveCryptoData(coin: string): Promise<{
		details: any;
		timeSeries: any[];
	}>;
}

/**
 * Base client configuration
 */
export interface BaseClientConfig {
	/** API endpoint or GraphQL endpoint */
	endpoint?: string;
	/** HTTP headers */
	headers?: Record<string, string>;
	/** API key for direct API access */
	apiKey?: string;
}

/**
 * Client implementation types
 */
export type ClientImplementationType = 'graphql' | 'rest' | 'hybrid';

/**
 * Universal client configuration
 */
export interface UniversalClientConfig extends BaseClientConfig {
	/** Type of client implementation */
	type?: ClientImplementationType;
	/** Base URL for REST API calls */
	baseUrl?: string;
}
