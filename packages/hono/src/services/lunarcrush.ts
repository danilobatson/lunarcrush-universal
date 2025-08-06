// ===================================================================
// 🚨 IMPORTED FROM WORKING YOGA BACKEND - COMPLETE API SERVICE
// ===================================================================
// Complete LunarCrush service matching EXACT API documentation
// All functions verified working in Yoga backend

export interface LunarCrushConfig {
	apiKey: string;
	baseUrl?: string;
}

export class LunarCrushError extends Error {
	constructor(
		message: string,
		public statusCode: number,
		public statusText: string
	) {
		super(message);
		this.name = 'LunarCrushError';
	}
}

// Core API request function
const makeRequest = async <T>(
	config: LunarCrushConfig,
	endpoint: string,
	params?: Record<string, any>
): Promise<T> => {
	const baseUrl = config.baseUrl || 'https://lunarcrush.com/api4/public';
	const url = new URL(`${baseUrl}${endpoint}`);

	if (params) {
		Object.entries(params)
			.filter(([_, value]) => value !== undefined && value !== null)
			.forEach(([key, value]) => url.searchParams.append(key, String(value)));
	}

	console.log(`🌙 LunarCrush API Request: ${url.toString()}`);

	const response = await fetch(url.toString(), {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${config.apiKey}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	});

	if (!response.ok) {
		throw new LunarCrushError(
			`LunarCrush API error: ${response.status} ${response.statusText}`,
			response.status,
			response.statusText
		);
	}

	const responseData = (await response.json()) as T;
	console.log(`✅ LunarCrush response received`);
	return responseData;
};

// ===== TOPICS ENDPOINTS (EXACT FROM API DOCS) =====

export const getTopicsList = async (config: LunarCrushConfig): Promise<any> => {
	try {
		const response = await makeRequest<any>(config, '/topics/list/v1');
		return response.data;
	} catch (error) {
		console.error('❌ getTopicsList error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getTopic = async (
	config: LunarCrushConfig,
	topic: string
): Promise<any> => {
	try {
		const response = await makeRequest<any>(
			config,
			`/topic/${topic.toLowerCase()}/v1`
		);
		return response.data;
	} catch (error) {
		console.error('❌ getTopic error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getTopicWhatsup = async (
	config: LunarCrushConfig,
	topic: string
): Promise<any> => {
	try {
		const response = await makeRequest<any>(
			config,
			`/topic/${topic.toLowerCase()}/whatsup/v1`
		);
		return response;
	} catch (error) {
		console.error('❌ getTopicWhatsup error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getTopicTimeSeries = async (
	config: LunarCrushConfig,
	args: {
		topic: string;
		bucket?: string;
		interval?: string;
		start?: string;
		end?: string;
	}
): Promise<any[]> => {
	const { topic, bucket, interval, start, end } = args;
	try {
		const params: Record<string, any> = {};
		if (bucket) params.bucket = bucket;
		if (interval) params.interval = interval;
		if (start) params.start = start;
		if (end) params.end = end;

		const response = await makeRequest<any>(
			config,
			`/topic/${topic.toLowerCase()}/time-series/v1`,
			params
		);
		return response.data;
	} catch (error) {
		console.error('❌ getTopicTimeSeries error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getTopicTimeSeriesV2 = async (
	config: LunarCrushConfig,
	args: {
		topic: string;
		bucket?: string;
	}
): Promise<any[]> => {
	const { topic, bucket } = args;
	try {
		const params: Record<string, any> = {};
		if (bucket) params.bucket = bucket;

		const response = await makeRequest<any>(
			config,
			`/topic/${topic.toLowerCase()}/time-series/v2`,
			params
		);
		return response.data;
	} catch (error) {
		console.error('❌ getTopicTimeSeriesV2 error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getTopicPosts = async (
	config: LunarCrushConfig,
	args: { topic: string; start?: string; end?: string }
): Promise<any[]> => {
	const { topic, start, end } = args;
	try {
		const params: Record<string, any> = {};
		if (start) params.start = start;
		if (end) params.end = end;

		const response = await makeRequest<any>(
			config,
			`/topic/${topic.toLowerCase()}/posts/v1`,
			params
		);
		return response.data;
	} catch (error) {
		console.error('❌ getTopicPosts error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getTopicNews = async (
	config: LunarCrushConfig,
	topic: string
): Promise<any[]> => {
	try {
		const response = await makeRequest<any>(
			config,
			`/topic/${topic.toLowerCase()}/news/v1`
		);
		return response.data;
	} catch (error) {
		console.error('❌ getTopicNews error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getTopicCreators = async (
	config: LunarCrushConfig,
	topic: string
): Promise<any[]> => {
	try {
		const response = await makeRequest<any>(
			config,
			`/topic/${topic.toLowerCase()}/creators/v1`
		);
		return response.data;
	} catch (error) {
		console.error('❌ getTopicCreators error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

// ===== CATEGORIES ENDPOINTS (EXACT FROM API DOCS) =====

export const getCategoriesList = async (
	config: LunarCrushConfig
): Promise<any[]> => {
	try {
		const response = await makeRequest<any>(config, '/categories/list/v1');
		return response.data;
	} catch (error) {
		console.error('❌ getCategoriesList error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getCategory = async (
	config: LunarCrushConfig,
	category: string
): Promise<any> => {
	try {
		const response = await makeRequest<any>(config, `/category/${category}/v1`);
		return response.data;
	} catch (error) {
		console.error('❌ getCategory error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getCategoryTopics = async (
	config: LunarCrushConfig,
	category: string
): Promise<any[]> => {
	try {
		const response = await makeRequest<any>(
			config,
			`/category/${category}/topics/v1`
		);
		return response.data;
	} catch (error) {
		console.error('❌ getCategoryTopics error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getCategoryTimeSeries = async (
	config: LunarCrushConfig,
	args: {
		category: string;
		bucket?: string;
		interval?: string;
		start?: string;
		end?: string;
	}
): Promise<any[]> => {
	const { category, bucket, interval, start, end } = args;
	try {
		const params: Record<string, any> = {};
		if (bucket) params.bucket = bucket;
		if (interval) params.interval = interval;
		if (start) params.start = start;
		if (end) params.end = end;

		const response = await makeRequest<any>(
			config,
			`/category/${category}/time-series/v1`,
			params
		);
		return response.data;
	} catch (error) {
		console.error('❌ getCategoryTimeSeries error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getCategoryPosts = async (
	config: LunarCrushConfig,
	args: {
		category: string;
		start?: string;
		end?: string;
	}
): Promise<any[]> => {
	const { category, start, end } = args;
	try {
		const params: Record<string, any> = {};
		if (start) params.start = start;
		if (end) params.end = end;

		const response = await makeRequest<any>(
			config,
			`/category/${category}/posts/v1`,
			params
		);
		return response.data;
	} catch (error) {
		console.error('❌ getCategoryPosts error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getCategoryNews = async (
	config: LunarCrushConfig,
	category: string
): Promise<any[]> => {
	try {
		const response = await makeRequest<any>(
			config,
			`/category/${category}/news/v1`
		);
		return response.data;
	} catch (error) {
		console.error('❌ getCategoryNews error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getCategoryCreators = async (
	config: LunarCrushConfig,
	category: string
): Promise<any[]> => {
	try {
		const response = await makeRequest<any>(
			config,
			`/category/${category}/creators/v1`
		);
		return response.data;
	} catch (error) {
		console.error('❌ getCategoryCreators error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

// ===== CREATORS ENDPOINTS (EXACT FROM API DOCS) =====

export const getCreatorsList = async (
	config: LunarCrushConfig
): Promise<any[]> => {
	try {
		const response = await makeRequest<any>(config, '/creators/list/v1');
		return response.data;
	} catch (error) {
		console.error('❌ getCreatorsList error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getCreator = async (
	config: LunarCrushConfig,
	args: {
		network: string;
		id: string;
	}
): Promise<any> => {
	const { network, id } = args;
	try {
		const response = await makeRequest<any>(
			config,
			`/creator/${network}/${id}/v1`
		);
		return response.data;
	} catch (error) {
		console.error('❌ getCreator error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getCreatorTimeSeries = async (
	config: LunarCrushConfig,
	args: {
		network: string;
		id: string;
		bucket?: string;
		interval?: string;
		start?: string;
		end?: string;
	}
): Promise<any[]> => {
	const { network, id, bucket, interval, start, end } = args;
	try {
		const params: Record<string, any> = {};
		if (bucket) params.bucket = bucket;
		if (interval) params.interval = interval;
		if (start) params.start = start;
		if (end) params.end = end;

		const response = await makeRequest<any>(
			config,
			`/creator/${network}/${id}/time-series/v1`,
			params
		);
		return response.data;
	} catch (error) {
		console.error('❌ getCreatorTimeSeries error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getCreatorPosts = async (
	config: LunarCrushConfig,
	args: {
		network: string;
		id: string;
		start?: string;
		end?: string;
	}
): Promise<any[]> => {
	try {
		const params: Record<string, any> = {};
		if (args.start) params.start = args.start;
		if (args.end) params.end = args.end;

		const response = await makeRequest<any>(
			config,
			`/creator/${args.network}/${args.id}/posts/v1`,
			params
		);
		return response.data;
	} catch (error) {
		console.error('❌ getCreatorPosts error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

// ===== COINS ENDPOINTS (EXACT FROM API DOCS) =====

export const getCoinsList = async (
	config: LunarCrushConfig,
	args: {
		sort?: string;
		filter?: string;
		limit?: number;
		desc?: string;
		page?: number;
	}
): Promise<any[]> => {
	const { sort, filter, limit, desc, page } = args;
	try {
		const params: Record<string, any> = {};
		if (sort) params.sort = sort;
		if (filter) params.filter = filter;
		if (limit) params.limit = limit;
		if (desc) params.desc = desc;
		if (page) params.page = page;

		const response = await makeRequest<any>(config, '/coins/list/v1', params);
		return response.data;
	} catch (error) {
		console.error('❌ getCoinsList error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getCoinsListV2 = async (
	config: LunarCrushConfig,
	args: {
		sort?: string;
		filter?: string;
		limit?: number;
		desc?: string;
		page?: number;
	}
): Promise<any[]> => {
	const { sort, filter, limit, desc, page } = args;
	try {
		const params: Record<string, any> = {};
		if (sort) params.sort = sort;
		if (filter) params.filter = filter;
		if (limit) params.limit = limit;
		if (desc) params.desc = desc;
		if (page) params.page = page;

		const response = await makeRequest<any>(config, '/coins/list/v2', params);
		return response.data;
	} catch (error) {
		console.error('❌ getCoinsListV2 error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getCoin = async (
	config: LunarCrushConfig,
	coin: string
): Promise<any> => {
	try {
		const response = await makeRequest<any>(config, `/coins/${coin}/v1`);
		return response.data;
	} catch (error) {
		console.error('❌ getCoin error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getCoinTimeSeries = async (
	config: LunarCrushConfig,
	args: {
		coin: string;
		bucket?: string;
		interval?: string;
		start?: string;
		end?: string;
	}
): Promise<any[]> => {
	const { coin, bucket, interval, start, end } = args;
	try {
		const params: Record<string, any> = {};
		if (bucket) params.bucket = bucket;
		if (interval) params.interval = interval;
		if (start) params.start = start;
		if (end) params.end = end;

		const response = await makeRequest<any>(
			config,
			`/coins/${coin}/time-series/v2`,
			params
		);
		return response.data;
	} catch (error) {
		console.error('❌ getCoinTimeSeries error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getCoinMeta = async (
	config: LunarCrushConfig,
	coin: string
): Promise<any> => {
	try {
		const response = await makeRequest<any>(config, `/coins/${coin}/meta/v1`);
		return response.data;
	} catch (error) {
		console.error('❌ getCoinMeta error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

// ===== STOCKS ENDPOINTS (EXACT FROM API DOCS) =====

export const getStocksList = async (
	config: LunarCrushConfig,
	args: {
		sort?: string;
		limit?: number;
		desc?: string;
		page?: number;
	}
): Promise<any[]> => {
	const { sort, limit, desc, page } = args;
	try {
		const params: Record<string, any> = {};
		if (sort) params.sort = sort;
		if (limit) params.limit = limit;
		if (desc) params.desc = desc;
		if (page) params.page = page;

		const response = await makeRequest<any>(config, '/stocks/list/v1', params);
		return response.data;
	} catch (error) {
		console.error('❌ getStocksList error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getStocksListV2 = async (
	config: LunarCrushConfig,
	args: {
		sort?: string;
		limit?: number;
		desc?: string;
		page?: number;
	}
): Promise<any[]> => {
	const { sort, limit, desc, page } = args;
	try {
		const params: Record<string, any> = {};
		if (sort) params.sort = sort;
		if (limit) params.limit = limit;
		if (desc) params.desc = desc;
		if (page) params.page = page;

		const response = await makeRequest<any>(config, '/stocks/list/v2', params);
		return response.data;
	} catch (error) {
		console.error('❌ getStocksListV2 error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getStock = async (
	config: LunarCrushConfig,
	stock: string
): Promise<any> => {
	try {
		const response = await makeRequest<any>(config, `/stocks/${stock}/v1`);
		return response.data;
	} catch (error) {
		console.error('❌ getStock error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getStockTimeSeries = async (
	config: LunarCrushConfig,
	args: {
		stock: string;
		bucket?: string;
		interval?: string;
		start?: string;
		end?: string;
	}
): Promise<any[]> => {
	const { stock, bucket, interval, start, end } = args;
	try {
		const params: Record<string, any> = {};
		if (bucket) params.bucket = bucket;
		if (interval) params.interval = interval;
		if (start) params.start = start;
		if (end) params.end = end;

		const response = await makeRequest<any>(
			config,
			`/stocks/${stock}/time-series/v2`,
			params
		);
		return response.data;
	} catch (error) {
		console.error('❌ getStockTimeSeries error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

// ===== NFTS ENDPOINTS (EXACT FROM API DOCS) =====

export const getNftsList = async (
	config: LunarCrushConfig,
	args: {
		sort?: string;
		limit?: number;
		desc?: string;
		page?: number;
	}
): Promise<any[]> => {
	const { sort, limit, desc, page } = args;
	try {
		const params: Record<string, any> = {};
		if (sort) params.sort = sort;
		if (limit) params.limit = limit;
		if (desc) params.desc = desc;
		if (page) params.page = page;

		const response = await makeRequest<any>(config, '/nfts/list/v1', params);
		return response.data;
	} catch (error) {
		console.error('❌ getNftsList error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getNftsListV2 = async (
	config: LunarCrushConfig,
	args: {
		sort?: string;
		limit?: number;
		desc?: string;
		page?: number;
	}
): Promise<any[]> => {
	const { sort, limit, desc, page } = args;
	try {
		const params: Record<string, any> = {};
		if (sort) params.sort = sort;
		if (limit) params.limit = limit;
		if (desc) params.desc = desc;
		if (page) params.page = page;

		const response = await makeRequest<any>(config, '/nfts/list/v2', params);
		return response.data;
	} catch (error) {
		console.error('❌ getNftsListV2 error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getNft = async (
	config: LunarCrushConfig,
	nft: string
): Promise<any> => {
	try {
		const response = await makeRequest<any>(config, `/nfts/${nft}/v1`);
		return response.data;
	} catch (error) {
		console.error('❌ getNft error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getNftTimeSeries = async (
	config: LunarCrushConfig,
	args: {
		nft: string;
		bucket?: string;
		interval?: string;
		start?: string;
		end?: string;
	}
): Promise<any[]> => {
	const { nft, bucket, interval, start, end } = args;
	try {
		const params: Record<string, any> = {};
		if (bucket) params.bucket = bucket;
		if (interval) params.interval = interval;
		if (start) params.start = start;
		if (end) params.end = end;

		const response = await makeRequest<any>(
			config,
			`/nfts/${nft}/time-series/v2`,
			params
		);
		return response.data;
	} catch (error) {
		console.error('❌ getNftTimeSeries error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getNftTimeSeriesV1 = async (
	config: LunarCrushConfig,
	nft: string
): Promise<any> => {
	try {
		const response = await makeRequest<any>(
			config,
			`/nfts/${nft}/time-series/v1`
		);
		return response;
	} catch (error) {
		console.error('❌ getNftTimeSeriesV1 error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

// ===== SYSTEM ENDPOINTS (EXACT FROM API DOCS) =====

export const getSystemChanges = async (
	config: LunarCrushConfig,
	args: { start?: string; end?: string }
): Promise<any[]> => {
	const { start, end } = args;
	try {
		const params: Record<string, any> = {};
		if (start) params.start = start;
		if (end) params.end = end;

		const response = await makeRequest<any>(config, '/system/changes', params);
		return response.data;
	} catch (error) {
		console.error('❌ getSystemChanges error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

// ===== SEARCHES ENDPOINTS (EXACT FROM API DOCS) =====

export const getSearchesList = async (
	config: LunarCrushConfig
): Promise<any[]> => {
	try {
		const response = await makeRequest<any>(config, '/searches/list');
		return response.data;
	} catch (error) {
		console.error('❌ getSearchesList error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getSearch = async (
	config: LunarCrushConfig,
	slug: string
): Promise<any> => {
	try {
		const response = await makeRequest<any>(config, `/searches/${slug}`);
		return response;
	} catch (error) {
		console.error('❌ getSearch error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const searchPosts = async (
	config: LunarCrushConfig,
	args: {
		term?: string;
		searchJson?: string;
	}
): Promise<any> => {
	const { term, searchJson } = args;
	try {
		const params: Record<string, any> = {};
		if (term) params.term = term;
		if (searchJson) params.search_json = searchJson;

		const response = await makeRequest<any>(config, '/searches/search', params);

		// Ensure we return an array for GraphQL schema compatibility
		if (response && response.data && Array.isArray(response.data)) {
			return response.data;
		} else if (Array.isArray(response)) {
			return response;
		} else {
			// Return empty array if no proper data structure
			return [];
		}
	} catch (error) {
		console.error('❌ searchPosts error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getPostDetails = async (
	config: LunarCrushConfig,
	args: {
		type: string;
		id: string;
	}
): Promise<any> => {
	const { type, id } = args;
	try {
		const response = await makeRequest<any>(config, `/posts/${type}/${id}/v1`);
		return response;
	} catch (error) {
		console.error('❌ getPostDetails error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};

export const getPostTimeSeries = async (
	config: LunarCrushConfig,
	args: {
		type: string;
		id: string;
		bucket?: string;
		interval?: string;
		start?: string;
		end?: string;
	}
): Promise<any[]> => {
	const { type, id, bucket, interval, start, end } = args;
	try {
		const params: Record<string, any> = {};
		if (bucket) params.bucket = bucket;
		if (interval) params.interval = interval;
		if (start) params.start = start;
		if (end) params.end = end;

		const response = await makeRequest<any>(
			config,
			`/posts/${type}/${id}/time-series/v1`,
			params
		);
		return response.data;
	} catch (error) {
		console.error('❌ getPostTimeSeries error:', error);
		if (error instanceof LunarCrushError) {
			throw new Error(
				`${error.statusCode} ${error.statusText}: ${error.message}`
			);
		}
		throw error;
	}
};
// ===== CLIENT FACTORY WITH ALL EXACT ENDPOINTS =====
export const createLunarCrushClient = (config: LunarCrushConfig) => ({
	// TOPICS ENDPOINTS
	getTopicsList: () => getTopicsList(config),
	getTopic: (topic: string) => getTopic(config, topic),
	getTopicWhatsup: (topic: string) => getTopicWhatsup(config, topic),
	getTopicTimeSeries: (
		topic: string,
		bucket?: string,
		interval?: string,
		start?: string,
		end?: string
	) => getTopicTimeSeries(config, topic, bucket, interval, start, end),
	getTopicTimeSeriesV2: (topic: string, bucket?: string) =>
		getTopicTimeSeriesV2(config, topic, bucket),
	getTopicPosts: (topic: string, start?: string, end?: string) =>
		getTopicPosts(config, topic, start, end),
	getTopicNews: (topic: string) => getTopicNews(config, topic),
	getTopicCreators: (topic: string) => getTopicCreators(config, topic),

	// CATEGORIES ENDPOINTS
	getCategoriesList: () => getCategoriesList(config),
	getCategory: (category: string) => getCategory(config, category),
	getCategoryTopics: (category: string) => getCategoryTopics(config, category),
	getCategoryTimeSeries: (
		category: string,
		bucket?: string,
		interval?: string,
		start?: string,
		end?: string
	) => getCategoryTimeSeries(config, category, bucket, interval, start, end),
	getCategoryPosts: (category: string, start?: string, end?: string) =>
		getCategoryPosts(config, category, start, end),
	getCategoryNews: (category: string) => getCategoryNews(config, category),
	getCategoryCreators: (category: string) =>
		getCategoryCreators(config, category),

	// CREATORS ENDPOINTS
	getCreatorsList: () => getCreatorsList(config),
	getCreator: (network: string, id: string) => getCreator(config, network, id),
	getCreatorTimeSeries: (
		network: string,
		id: string,
		bucket?: string,
		interval?: string,
		start?: string,
		end?: string
	) => getCreatorTimeSeries(config, network, id, bucket, interval, start, end),
	getCreatorPosts: (
		network: string,
		id: string,
		start?: string,
		end?: string
	) => getCreatorPosts(config, network, id, start, end),

	// COINS ENDPOINTS
	getCoinsList: (
		sort?: string,
		filter?: string,
		limit?: number,
		desc?: string,
		page?: number
	) => getCoinsList(config, sort, filter, limit, desc, page),
	getCoinsListV2: (
		sort?: string,
		filter?: string,
		limit?: number,
		desc?: string,
		page?: number
	) => getCoinsListV2(config, sort, filter, limit, desc, page),
	getCoin: (coin: string) => getCoin(config, coin),
	getCoinTimeSeries: (
		coin: string,
		bucket?: string,
		interval?: string,
		start?: string,
		end?: string
	) => getCoinTimeSeries(config, coin, bucket, interval, start, end),
	getCoinMeta: (coin: string) => getCoinMeta(config, coin),

	// STOCKS ENDPOINTS
	getStocksList: (
		sort?: string,
		limit?: number,
		desc?: string,
		page?: number
	) => getStocksList(config, sort, limit, desc, page),
	getStocksListV2: (
		sort?: string,
		limit?: number,
		desc?: string,
		page?: number
	) => getStocksListV2(config, sort, limit, desc, page),
	getStock: (stock: string) => getStock(config, stock),
	getStockTimeSeries: (
		stock: string,
		bucket?: string,
		interval?: string,
		start?: string,
		end?: string
	) => getStockTimeSeries(config, stock, bucket, interval, start, end),

	// NFTS ENDPOINTS
	getNftsList: (sort?: string, limit?: number, desc?: string, page?: number) =>
		getNftsList(config, sort, limit, desc, page),
	getNftsListV2: (
		sort?: string,
		limit?: number,
		desc?: string,
		page?: number
	) => getNftsListV2(config, sort, limit, desc, page),
	getNft: (nft: string) => getNft(config, nft),
	getNftTimeSeries: (
		nft: string,
		bucket?: string,
		interval?: string,
		start?: string,
		end?: string
	) => getNftTimeSeries(config, nft, bucket, interval, start, end),
	getNftTimeSeriesV1: (nft: string) => getNftTimeSeriesV1(config, nft),

	// SYSTEM ENDPOINTS
	getSystemChanges: (start?: string, end?: string) =>
		getSystemChanges(config, start, end),

	// SEARCHES ENDPOINTS
	getSearchesList: () => getSearchesList(config),
	getSearch: (slug: string) => getSearch(config, slug),
	searchPosts: (term?: string, searchJson?: string) =>
		searchPosts(config, { term, searchJson }),

	//POSTS ENDPOINTS
	getPostDetails: (type: string, id: string) =>
		getPostDetails(config, { type, id }),
	getPostTimeSeries: (
		type: string,
		id: string,
		bucket?: string,
		interval?: string,
		start?: string,
		end?: string
	) => getPostTimeSeries(config, { type, id, bucket, interval, start, end }),
});

export type LunarCrushClient = ReturnType<typeof createLunarCrushClient>;
