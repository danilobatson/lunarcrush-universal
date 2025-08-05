// ===================================================================
// 🚀 GraphQL Resolvers
// ===================================================================

import type { Bindings } from '../lib/types';

export interface GraphQLContext {
	bindings: Bindings;
	requestId: string;
	apiKey?: string;
}

/**
 * Creates GraphQL resolvers with proper context
 */
export function createResolvers() {
	return {
		Query: {
			// Health check
			health: () => ({
				status: 'ok',
				timestamp: new Date().toISOString(),
				service: 'lunarcrush-universal-hono',
			}),

			// Cryptocurrency endpoints
			coins: async (_: any, args: any, context: GraphQLContext) => {
				const { limit = 50 } = args;
				return fetchFromLunarCrush('/coins', { limit }, context);
			},

			cryptoFeed: async (_: any, args: any, context: GraphQLContext) => {
				const { limit = 20, page = 1 } = args;
				return fetchFromLunarCrush('/feeds', { limit, page }, context);
			},

			cryptoPrices: async (_: any, args: any, context: GraphQLContext) => {
				const { symbol, interval = '1d', limit = 50 } = args;
				return fetchFromLunarCrush(
					'/coins',
					{ symbol, interval, limit },
					context
				);
			},

			cryptoMarketData: async (_: any, args: any, context: GraphQLContext) => {
				const { limit = 50, sort = 'market_cap' } = args;
				return fetchFromLunarCrush('/coins', { limit, sort }, context);
			},

			// Stock endpoints
			stockQuote: async (_: any, args: any, context: GraphQLContext) => {
				const { symbol } = args;
				return fetchFromLunarCrush('/stocks', { symbol }, context);
			},

			stockFeed: async (_: any, args: any, context: GraphQLContext) => {
				const { limit = 20, page = 1 } = args;
				return fetchFromLunarCrush('/stocks/feeds', { limit, page }, context);
			},

			// Topic and social endpoints
			topics: async (_: any, args: any, context: GraphQLContext) => {
				const { limit = 50 } = args;
				return fetchFromLunarCrush('/topics', { limit }, context);
			},

			topicDetails: async (_: any, args: any, context: GraphQLContext) => {
				const { topic } = args;
				return fetchFromLunarCrush(`/topics/${topic}`, {}, context);
			},

			socialPosts: async (_: any, args: any, context: GraphQLContext) => {
				const { symbol, limit = 20, page = 1 } = args;
				return fetchFromLunarCrush('/posts', { symbol, limit, page }, context);
			},

			// Creator endpoints
			creators: async (_: any, args: any, context: GraphQLContext) => {
				const { limit = 50 } = args;
				return fetchFromLunarCrush('/creators', { limit }, context);
			},

			creatorDetails: async (_: any, args: any, context: GraphQLContext) => {
				const { creator } = args;
				return fetchFromLunarCrush(`/creators/${creator}`, {}, context);
			},

			// Search
			search: async (_: any, args: any, context: GraphQLContext) => {
				const { query, type = 'all', limit = 20 } = args;
				return fetchFromLunarCrush(
					'/search',
					{ q: query, type, limit },
					context
				);
			},

			// Time series data
			timeSeries: async (_: any, args: any, context: GraphQLContext) => {
				const { symbol, interval = '1d', start, end } = args;
				return fetchFromLunarCrush(
					'/time-series',
					{ symbol, interval, start, end },
					context
				);
			},
		},

		Mutation: {
			// Placeholder for future mutations
			placeholder: () => ({
				success: false,
				message: 'No mutations implemented yet',
			}),
		},
	};
}

/**
 * Helper function to fetch data from LunarCrush API
 */
async function fetchFromLunarCrush(
	endpoint: string,
	params: Record<string, any>,
	context: GraphQLContext
): Promise<any> {
	try {
		const { LUNARCRUSH_API_KEY } = context.bindings;

		if (!LUNARCRUSH_API_KEY) {
			throw new Error('LunarCrush API key not configured');
		}

		// Build query string
		const queryParams = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				queryParams.append(key, String(value));
			}
		});

		const url = `https://lunarcrush.com/api4${endpoint}?${queryParams.toString()}`;

		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${LUNARCRUSH_API_KEY}`,
				'Content-Type': 'application/json',
				'User-Agent': 'LunarCrush-Universal-Hono/1.0',
			},
		});

		if (!response.ok) {
			throw new Error(
				`LunarCrush API error: ${response.status} ${response.statusText}`
			);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('LunarCrush API fetch error:', error);
		return {
			error: true,
			message: error instanceof Error ? error.message : 'Unknown error',
			requestId: context.requestId,
		};
	}
}
