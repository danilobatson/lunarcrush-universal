// ===================================================================
// 🌙 LunarCrush SDK - Complete API Coverage
// ===================================================================
// 🤖 This file provides complete coverage of LunarCrush API v4

import { GraphQLClient } from 'graphql-request';
import { getSdk } from './generated/operations';

// ===================================================================
// 🔧 TYPES & INTERFACES
// ===================================================================

/** Unix timestamp as string (e.g., "1640995200") */
export type UnixTimestamp = string;

export class LunarCrushError extends Error {
	constructor(
		message: string,
		public statusCode?: number,
		public statusText?: string
	) {
		super(message);
		this.name = 'LunarCrushError';
	}
}

export interface LunarCrushConfig {
	apiKey: string;
	endpoint?: string;
	timeout?: number;
	headers?: Record<string, string>;
	cache?: boolean;
	retries?: number;
}

interface TimeSeriesOptions {
	interval?: string;
	/** Unix timestamp string (e.g., "1640995200") */
	start?: UnixTimestamp;
	/** Unix timestamp string (e.g., "1640995200") */
	end?: UnixTimestamp;
	bucket?: string;
}

interface PostsOptions {
	/** Unix timestamp string (e.g., "1640995200") */
	start?: UnixTimestamp;
	/** Unix timestamp string (e.g., "1640995200") */
	end?: UnixTimestamp;
}

interface ListOptions {
	sort?: string;
	filter?: string;
	limit?: number;
	desc?: string;
	page?: number;
}

interface SearchOptions {
	term?: string;
	searchJson?: string;
}

// ===================================================================
// 🚀 LUNARCRUSH SDK CLASS - COMPLETE API COVERAGE
// ===================================================================

/**
 * 🌙 LunarCrush SDK - Complete Production Ready SDK
 *
 */
export class LunarCrush {
	private sdk: ReturnType<typeof getSdk>;

	constructor(apiKeyOrConfig?: string | LunarCrushConfig) {
		const config = this.buildConfig(apiKeyOrConfig);
		const client = new GraphQLClient(config.endpoint!, {
			headers: {
				Authorization: `Bearer ${config.apiKey}`,
				'Content-Type': 'application/json',
				...config.headers,
			},
		});
		this.sdk = getSdk(client, this.withErrorHandling);
	}

	private buildConfig(input?: string | LunarCrushConfig): LunarCrushConfig {
		if (typeof input === 'string') {
			return {
				apiKey: input,
				endpoint: 'https://lunarcrush.cryptoguard-api.workers.dev/graphql',
			};
		}

		const apiKey = input?.apiKey;

		if (!apiKey) throw new LunarCrushError('API key required');

		return {
			apiKey,
			endpoint:
				input?.endpoint ||
				'https://lunarcrush.cryptoguard-api.workers.dev/graphql',
			...input,
		};
	}

	private withErrorHandling = async (action: () => Promise<any>) => {
		try {
			return await action();
		} catch (error: any) {
			throw new LunarCrushError(
				error.response?.errors?.[0]?.message || error.message,
				error.response?.status
			);
		}
	};

	// ================================================================
	// 🎯 TOPICS API - Social Sentiment & AI Analysis
	// ================================================================
	topics = {
		list: () => this.sdk.GetTopicsList().then((r) => r.getTopicsList),
		get: (topic: string) =>
			this.sdk.GetTopic({ topic }).then((r) => r.getTopic),
		whatsup: (topic: string) =>
			this.sdk.GetTopicWhatsup({ topic }).then((r) => r.getTopicWhatsup),
		timeSeries: (topic: string, options: TimeSeriesOptions = {}) =>
			this.sdk
				.GetTopicTimeSeries({ topic, ...options })
				.then((r) => r.getTopicTimeSeries),
		timeSeriesV2: (topic: string, bucket?: string) =>
			this.sdk
				.GetTopicTimeSeriesV2({ topic, bucket })
				.then((r) => r.getTopicTimeSeriesV2),
		posts: (topic: string, options: PostsOptions = {}) =>
			this.sdk
				.GetTopicPosts({ topic, ...options })
				.then((r) => r.getTopicPosts),
		news: (topic: string) =>
			this.sdk.GetTopicNews({ topic }).then((r) => r.getTopicNews),
		creators: (topic: string) =>
			this.sdk.GetTopicCreators({ topic }).then((r) => r.getTopicCreators),
	};

	// ================================================================
	// 📊 CATEGORIES API - Trend Analysis & Topic Aggregation
	// ================================================================
	categories = {
		list: () => this.sdk.GetCategoriesList().then((r) => r.getCategoriesList),
		get: (category: string) =>
			this.sdk.GetCategory({ category }).then((r) => r.getCategory),
		topics: (category: string) =>
			this.sdk.GetCategoryTopics({ category }).then((r) => r.getCategoryTopics),
		timeSeries: (category: string, options: TimeSeriesOptions = {}) =>
			this.sdk
				.GetCategoryTimeSeries({ category, ...options })
				.then((r) => r.getCategoryTimeSeries),
		posts: (category: string, options: PostsOptions = {}) =>
			this.sdk
				.GetCategoryPosts({ category, ...options })
				.then((r) => r.getCategoryPosts),
		news: (category: string) =>
			this.sdk.GetCategoryNews({ category }).then((r) => r.getCategoryNews),
		creators: (category: string) =>
			this.sdk
				.GetCategoryCreators({ category })
				.then((r) => r.getCategoryCreators),
	};

	// ================================================================
	// 👑 CREATORS API - Influencer Analysis & Topic Influence
	// ================================================================
	creators = {
		list: () => this.sdk.GetCreatorsList().then((r) => r.getCreatorsList),
		get: (network: string, id: string) =>
			this.sdk.GetCreator({ network, id }).then((r) => r.getCreator),
		timeSeries: (
			network: string,
			id: string,
			options: TimeSeriesOptions = {}
		) =>
			this.sdk
				.GetCreatorTimeSeries({ network, id, ...options })
				.then((r) => r.getCreatorTimeSeries),
		posts: (network: string, id: string, options: PostsOptions = {}) =>
			this.sdk
				.GetCreatorPosts({ network, id, ...options })
				.then((r) => r.getCreatorPosts),
	};

	// ================================================================
	// 💰 COINS API - Crypto Social + Market Data Fusion
	// ================================================================
	coins = {
		list: (options: ListOptions = {}) =>
			this.sdk.GetCoinsList(options).then((r) => r.getCoinsList),
		listV2: (options: ListOptions = {}) =>
			this.sdk.GetCoinsListV2(options).then((r) => r.getCoinsListV2),
		get: (coin: string) => this.sdk.GetCoin({ coin }).then((r) => r.getCoin),
		meta: (coin: string) =>
			this.sdk.GetCoinMeta({ coin }).then((r) => r.getCoinMeta),
		timeSeries: (coin: string, options: TimeSeriesOptions = {}) =>
			this.sdk
				.GetCoinTimeSeries({ coin, ...options })
				.then((r) => r.getCoinTimeSeries),
	};

	// ================================================================
	// 📈 STOCKS API - Stock Social Sentiment Analysis
	// ================================================================
	stocks = {
		list: () => this.sdk.GetStocksList().then((r) => r.getStocksList),
		listV2: (options: Omit<ListOptions, 'filter'> = {}) =>
			this.sdk.GetStocksListV2(options).then((r) => r.getStocksListV2),
		get: (stock: string) =>
			this.sdk.GetStock({ stock }).then((r) => r.getStock),
		timeSeries: (stock: string, options: TimeSeriesOptions = {}) =>
			this.sdk
				.GetStockTimeSeries({ stock, ...options })
				.then((r) => r.getStockTimeSeries),
	};

	// ================================================================
	// 🖼️ NFTS API - NFT Collection Social Tracking
	// ================================================================
	nfts = {
		list: (options: Omit<ListOptions, 'filter'> = {}) =>
			this.sdk.getNftsList(options).then((r) => r.getNftsList),
		listV2: (options: Omit<ListOptions, 'filter'> = {}) =>
			this.sdk.GetNftsListV2(options).then((r) => r.getNftsListV2),
		get: (id: string) => this.sdk.GetNft({ id }).then((r) => r.getNft),
		timeSeries: (id: string, options: TimeSeriesOptions = {}) =>
			this.sdk
				.GetNftTimeSeries({ id, ...options })
				.then((r) => r.getNftTimeSeries),
	};

	// ================================================================
	// 📝 POSTS API - Viral Content Analysis
	// ================================================================
	posts = {
		details: (post_type: string, post_id: string) =>
			this.sdk
				.GetPostDetails({ post_type, post_id })
				.then((r) => r.getPostDetails),
		timeSeries: (post_type: string, post_id: string) =>
			this.sdk
				.GetPostTimeSeries({ post_type, post_id })
				.then((r) => r.getPostTimeSeries),
	};

	// ================================================================
	// 🔍 SEARCH API - Custom Trend Tracking & Aggregations
	// ================================================================
	// search = {
	// 	list: () => this.sdk.GetSearchesList().then((r) => r.getSearchesList),

	// 	get: (slug: string) =>
	// 		this.sdk.GetSearch({ slug }).then((r) => r.getSearch),
	// 	posts: (options: SearchOptions = {}) =>
	// 		this.sdk.SearchPosts(options).then((r) => r.searchPosts),

	// 	create: (name: string, searchJson: string, priority?: boolean) =>
	// 		this.sdk
	// 			.CreateSearch({ name, searchJson, priority })
	// 			.then((r) => r.createSearch),
	// 	update: (
	// 		slug: string,
	// 		options: {
	// 			name?: string;
	// 			searchJson?: string;
	// 			priority?: boolean;
	// 		} = {}
	// 	) =>
	// 		this.sdk.UpdateSearch({ slug, ...options }).then((r) => r.updateSearch),
	// 	delete: (slug: string) =>
	// 		this.sdk.DeleteSearch({ slug }).then((r) => r.deleteSearch),
	// };

	// ================================================================
	// 🎯 SYSTEM API - Health & Monitoring
	// ================================================================
	system = {
		health: () => this.sdk.SystemHealth().then((r) => r.systemHealth),
		ping: () => this.sdk.Ping().then((r) => r.ping),
		changes: (options: PostsOptions = {}) =>
			this.sdk.GetSystemChanges(options).then((r) => r.getSystemChanges),
	};

	// ================================================================
	// 🔧 USER API - Preferences & Demo Features
	// ================================================================
	user = {
		generateDemoToken: () =>
			this.sdk.GenerateDemoToken().then((r) => r.generateDemoToken),
		updatePreferences: (input: {
			theme?: string;
			currency?: string;
			notifications?: boolean;
			favoriteTopics?: string[];
		}) =>
			this.sdk
				.UpdateUserPreferences({ input })
				.then((r) => r.updateUserPreferences),
		createTopic: (input: {
			topic: string;
			category: string;
			description?: string;
		}) => this.sdk.CreateTopic({ input }).then((r) => r.createTopic),
	};

	// ================================================================
	// 🚀 LEGACY COMPATIBILITY METHODS (Deprecated - Use Organized APIs Above)
	// ================================================================

	// /** @deprecated Use topics.whatsup() instead */
	// getTopicWhatsup = (topic: string) => this.topics.whatsup(topic);

	// /** @deprecated Use topics.timeSeriesV2() instead */
	// getTopicTimeSeriesV2 = (topic: string, bucket?: string) =>
	// 	this.topics.timeSeriesV2(topic, bucket);

	// /** @deprecated Use coins.listV2() instead */
	// getCoinsListV2 = (options: ListOptions = {}) => this.coins.listV2(options);

	// /** @deprecated Use categories.topics() instead */
	// getCategoryTopics = (category: string) => this.categories.topics(category);

	// /** @deprecated Use categories.timeSeries() instead */
	// getCategoryTimeSeries = (category: string, options: TimeSeriesOptions = {}) =>
	// 	this.categories.timeSeries(category, options);

	// /** @deprecated Use categories.posts() instead */
	// getCategoryPosts = (category: string, options: PostsOptions = {}) =>
	// 	this.categories.posts(category, options);

	// /** @deprecated Use categories.news() instead */
	// getCategoryNews = (category: string) => this.categories.news(category);

	// /** @deprecated Use categories.creators() instead */
	// getCategoryCreators = (category: string) =>
	// 	this.categories.creators(category);

	// /** @deprecated Use creators.timeSeries() instead */
	// getCreatorTimeSeries = (
	// 	network: string,
	// 	id: string,
	// 	options: TimeSeriesOptions = {}
	// ) => this.creators.timeSeries(network, id, options);

	// /** @deprecated Use creators.posts() instead */
	// getCreatorPosts = (network: string, id: string, options: PostsOptions = {}) =>
	// 	this.creators.posts(network, id, options);

	// /** @deprecated Use stocks.listV2() instead */
	// getStocksListV2 = (options: Omit<ListOptions, 'filter'> = {}) =>
	// 	this.stocks.listV2(options);

	// /** @deprecated Use stocks.timeSeries() instead */
	// getStockTimeSeries = (stock: string, options: TimeSeriesOptions = {}) =>
	// 	this.stocks.timeSeries(stock, options);

	// /** @deprecated Use nfts.listV2() instead */
	// getNftsListV2 = (options: Omit<ListOptions, 'filter'> = {}) =>
	// 	this.nfts.listV2(options);

	// /** @deprecated Use nfts.timeSeries() instead */
	// getNftTimeSeries = (id: string, options: TimeSeriesOptions = {}) =>
	// 	this.nfts.timeSeries(id, options);

	// /** @deprecated Use system.ping() instead */
	// ping = () => this.system.ping();

	// /** @deprecated Use system.health() instead */
	// health = () => this.system.health();

	// /** @deprecated Use system.health() instead */
	// hello = () => this.sdk.Hello().then((r) => r.hello);

	// /** @deprecated Use system.changes() instead */
	// systemChanges = (options: PostsOptions = {}) => this.system.changes(options);
}

// ===================================================================
// 🎯 CONVENIENCE FACTORY FUNCTION
// ===================================================================

/**
 * Create a new LunarCrush SDK instance
 *
 * @param apiKeyOrConfig - API key string or full configuration object
 * @returns Configured LunarCrush SDK instance with complete API coverage
 *
 * @example
 * ```typescript
 * // Simple initialization
 * const lc = createLunarCrush('your-api-key');
 *
 * // Advanced configuration
 * const lc = createLunarCrush({
 *   apiKey: 'your-api-key',
 *   endpoint: 'https://your-custom-endpoint.com/graphql',
 *   timeout: 30000,
 *   headers: { 'Custom-Header': 'value' }
 * });
 *
 * // Usage examples
 * const topics = await lc.topics.list();
 * const bitcoinData = await lc.coins.get('bitcoin');
 * const sentiment = await lc.topics.whatsup('bitcoin');
 * ```
 */
export function createLunarCrush(
	apiKeyOrConfig?: string | LunarCrushConfig
): LunarCrush {
	return new LunarCrush(apiKeyOrConfig);
}

// ===================================================================
// 🎁 EXPORTS
// ===================================================================

// Export types for TypeScript users
export type {
	UnixTimestamp,
	LunarCrushConfig,
	TimeSeriesOptions,
	PostsOptions,
	ListOptions,
	SearchOptions,
};

// Export error class
export { LunarCrushError };

// Default export
export default LunarCrush;
