// ===================================================================
// 🌙 LunarCrush SDK - Generated Functional API (All 39 Resolvers)
// ===================================================================
// 🤖 This file is auto-generated. Do not edit manually.
// 🔄 Run 'npm run codegen' to regenerate.

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

// ===================================================================
// 🚀 LUNARCRUSH SDK CLASS
// ===================================================================

/**
 * 🌙 LunarCrush SDK - Production Ready
 *
 * Ultra-minimal SDK with only resolver-implemented operations.
 * Auto-generated fluent API from GraphQL resolvers.
 */
export class LunarCrush {
	private sdk: ReturnType<typeof getSdk>;

	constructor(apiKeyOrConfig?: string | LunarCrushConfig) {
		const config = this.buildConfig(apiKeyOrConfig);
		const client = new GraphQLClient(config.endpoint!, {
			headers: { Authorization: `Bearer ${config.apiKey}` },
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

		const apiKey =
			input?.apiKey ||
			process.env.LUNARCRUSH_API_KEY ||
			process.env.NEXT_PUBLIC_LUNARCRUSH_API_KEY;

		if (!apiKey) throw new LunarCrushError('API key required');

		return {
			apiKey,
			endpoint:
				input?.endpoint ||
				'https://lunarcrush.cryptoguard-api.workers.dev/graphql',
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
	// 🚀 AUTO-GENERATED FLUENT API - From Resolver Implementations
	// ================================================================

	topics = {
		list: () => this.sdk.GetTopicsList().then((r) => r.getTopicsList),
		get: (topic: string) =>
			this.sdk.GetTopic({ topic }).then((r) => r.getTopic),
		timeSeries: (
			topic: string,
			options: {
				bucket?: string;
				interval?: string;
				start?: string;
				end?: string;
			} = {}
		) =>
			this.sdk
				.GetTopicTimeSeries({ topic, ...options })
				.then((r) => r.getTopicTimeSeries),
		posts: (topic: string, options: { start?: string; end?: string } = {}) =>
			this.sdk
				.GetTopicPosts({ topic, ...options })
				.then((r) => r.getTopicPosts),
		news: (topic: string) =>
			this.sdk.GetTopicNews({ topic }).then((r) => r.getTopicNews),
		creators: (topic: string) =>
			this.sdk.GetTopicCreators({ topic }).then((r) => r.getTopicCreators),
	};

	coins = {
		list: () => this.sdk.GetCoinsList().then((r) => r.getCoinsList),
		get: (symbol: string) =>
			this.sdk.GetCoin({ symbol }).then((r) => r.getCoin),
		meta: (symbol: string) =>
			this.sdk.GetCoinMeta({ symbol }).then((r) => r.getCoinMeta),
		timeSeries: (
			symbol: string,
			options: {
				bucket?: string;
				interval?: string;
				start?: string;
				end?: string;
			} = {}
		) =>
			this.sdk
				.GetCoinTimeSeries({ symbol, ...options })
				.then((r) => r.getCoinTimeSeries),
	};

	categories = {
		list: () => this.sdk.GetCategoriesList().then((r) => r.getCategoriesList),
		get: (category: string) =>
			this.sdk.GetCategory({ category }).then((r) => r.getCategory),
	};

	creators = {
		list: () => this.sdk.GetCreatorsList().then((r) => r.getCreatorsList),
		get: (network: string, id: string) =>
			this.sdk.GetCreator({ network, id }).then((r) => r.getCreator),
	};

	stocks = {
		list: () => this.sdk.GetStocksList().then((r) => r.getStocksList),
		get: (symbol: string) =>
			this.sdk.GetStock({ symbol }).then((r) => r.getStock),
	};

	nfts = {
		list: () => this.sdk.GetNftsList().then((r) => r.getNftsList),
		get: (id: string) => this.sdk.GetNft({ id }).then((r) => r.getNft),
	};

	posts = {
		details: (type: string, id: string) =>
			this.sdk.GetPostDetails({ type, id }).then((r) => r.getPostDetails),
		timeSeries: (
			type: string,
			id: string,
			options: {
				bucket?: string;
				interval?: string;
				start?: string;
				end?: string;
			} = {}
		) =>
			this.sdk
				.GetPostTimeSeries({ type, id, ...options })
				.then((r) => r.getPostTimeSeries),
	};

	// System & Health
	ping = () => this.sdk.Ping().then((r) => r.ping);
	health = () => this.sdk.SystemHealth().then((r) => r.systemHealth);
	hello = () => this.sdk.Hello().then((r) => r.hello);
	systemChanges = () =>
		this.sdk.GetSystemChanges().then((r) => r.getSystemChanges);

	// ===================================================================
	// 🎯 ADDITIONAL DIRECT METHODS FOR 100% RESOLVER COVERAGE
	// ===================================================================

	// Topic Methods
	getTopicWhatsup = (topic: string) =>
		this.sdk.GetTopicWhatsup({ topic }).then((r) => r.getTopicWhatsup);

	getTopicTimeSeriesV2 = (topic: string, bucket?: string) => {
		const variables: { topic: string; bucket?: string } = { topic };
		if (bucket) variables.bucket = bucket;
		return this.sdk
			.GetTopicTimeSeriesV2(variables)
			.then((r) => r.getTopicTimeSeriesV2);
	};

	// Coins Methods
	getCoinsListV2 = () =>
		this.sdk.GetCoinsListV2().then((r) => r.getCoinsListV2);

	// Category Methods
	getCategoryTopics = (category: string) =>
		this.sdk.GetCategoryTopics({ category }).then((r) => r.getCategoryTopics);

	getCategoryTimeSeries = (
		category: string,
		options: {
			interval?: string;
			start?: string;
			end?: string;
		} = {}
	) => {
		const variables: {
			category: string;
			interval?: string;
			start?: string;
			end?: string;
		} = { category };
		if (options.interval) variables.interval = options.interval;
		if (options.start) variables.start = options.start;
		if (options.end) variables.end = options.end;
		return this.sdk
			.GetCategoryTimeSeries(variables)
			.then((r) => r.getCategoryTimeSeries);
	};

	getCategoryPosts = (
		category: string,
		options: {
			start?: string;
			end?: string;
		} = {}
	) => {
		const variables: { category: string; start?: string; end?: string } = {
			category,
		};
		if (options.start) variables.start = options.start;
		if (options.end) variables.end = options.end;
		return this.sdk.GetCategoryPosts(variables).then((r) => r.getCategoryPosts);
	};

	getCategoryNews = (category: string) =>
		this.sdk.GetCategoryNews({ category }).then((r) => r.getCategoryNews);

	getCategoryCreators = (category: string) =>
		this.sdk
			.GetCategoryCreators({ category })
			.then((r) => r.getCategoryCreators);

	// Creator Methods
	getCreatorTimeSeries = (
		network: string,
		id: string,
		options: {
			interval?: string;
			start?: string;
			end?: string;
		} = {}
	) => {
		const variables: {
			network: string;
			id: string;
			interval?: string;
			start?: string;
			end?: string;
		} = { network, id };
		if (options.interval) variables.interval = options.interval;
		if (options.start) variables.start = options.start;
		if (options.end) variables.end = options.end;
		return this.sdk
			.GetCreatorTimeSeries(variables)
			.then((r) => r.getCreatorTimeSeries);
	};

	getCreatorPosts = (
		network: string,
		id: string,
		options: {
			start?: string;
			end?: string;
		} = {}
	) => {
		const variables: {
			network: string;
			id: string;
			start?: string;
			end?: string;
		} = { network, id };
		if (options.start) variables.start = options.start;
		if (options.end) variables.end = options.end;
		return this.sdk.GetCreatorPosts(variables).then((r) => r.getCreatorPosts);
	};

	// Stock Methods
	getStocksListV2 = () =>
		this.sdk.GetStocksListV2().then((r) => r.getStocksListV2);

	getStockTimeSeries = (
		symbol: string,
		options: {
			interval?: string;
			start?: string;
			end?: string;
		} = {}
	) => {
		const variables: {
			symbol: string;
			interval?: string;
			start?: string;
			end?: string;
		} = { symbol };
		if (options.interval) variables.interval = options.interval;
		if (options.start) variables.start = options.start;
		if (options.end) variables.end = options.end;
		return this.sdk
			.GetStockTimeSeries(variables)
			.then((r) => r.getStockTimeSeries);
	};

	// NFT Methods
	getNftsListV2 = () => this.sdk.GetNftsListV2().then((r) => r.getNftsListV2);

	getNftTimeSeries = (
		id: string,
		options: {
			interval?: string;
			start?: string;
			end?: string;
		} = {}
	) => {
		const variables: {
			id: string;
			interval?: string;
			start?: string;
			end?: string;
		} = { id };
		if (options.interval) variables.interval = options.interval;
		if (options.start) variables.start = options.start;
		if (options.end) variables.end = options.end;
		return this.sdk.GetNftTimeSeries(variables).then((r) => r.getNftTimeSeries);
	};
}

// ===================================================================
// 🎯 CONVENIENCE FACTORY FUNCTION
// ===================================================================

/**
 * Create a new LunarCrush SDK instance
 *
 * @param apiKeyOrConfig - API key string or full configuration object
 * @returns Configured LunarCrush SDK instance
 */
export function createLunarCrush(
	apiKeyOrConfig?: string | LunarCrushConfig
): LunarCrush {
	return new LunarCrush(apiKeyOrConfig);
}

// Default export
export default LunarCrush;
