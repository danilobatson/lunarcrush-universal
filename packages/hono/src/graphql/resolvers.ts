// ===================================================================
// 🚀 GraphQL Resolvers
// ===================================================================

import { getContext } from 'hono/context-storage';
import type { Bindings } from '../lib/types';

import {
	getTopicsList,
	getTopic,
	getTopicWhatsup,
	getTopicTimeSeries,
	getTopicTimeSeriesV2,
	getTopicPosts,
	getTopicNews,
	getTopicCreators,
	getCategoriesList,
	getCategory,
	getCategoryTopics,
	getCategoryTimeSeries,
	getCategoryPosts,
	getCategoryNews,
	getCategoryCreators,
	getCreatorsList,
	getCreator,
	getCreatorTimeSeries,
	getCreatorPosts,
	getCoinsList,
	getCoinsListV2,
	getCoin,
	getCoinMeta,
	getCoinTimeSeries,
	getStocksList,
	getStocksListV2,
	getStock,
	getStockTimeSeries,
	getNftsList,
	getNftsListV2,
	getNft,
	getNftTimeSeries,
	searchPosts,
	getSystemChanges,
	getSearchesList,
	getSearch,
	getPostDetails,
	getPostTimeSeries,
} from '../services/lunarcrush';

import { LunarCrushConfig } from '../services/lunarcrush';

export interface GraphQLContext {
	bindings: Bindings;
	requestId: string;
	lunarcrushApiKey?: string;
	request?: Request;
	headers?: Headers;
}

// Server start time for uptime calculation
const serverStartTime = Date.now();

const getConfig = (): LunarCrushConfig | undefined => {
	const c = getContext();
	const config = {
		apiKey: c.get('apiKey'),
		baseUrl: c.get('baseUrl') || 'https://lunarcrush.com/api4/public',
	};

	if (!config.apiKey || config.apiKey === 'introspection-placeholder') {
		throw new Error('API key required for data queries');
	}
	return config;
};

const getConfigOptional = (): LunarCrushConfig => {
	const c = getContext();
	return {
		apiKey: c.get('apiKey') || '',
		baseUrl: c.get('baseUrl') || 'https://lunarcrush.com/api4/public',
	};
};

/**
 * Creates GraphQL resolvers with proper context
 */
export function createResolvers() {
	return {
		Query: {
			// ===================================================================
			// HEALTH & SYSTEM MONITORING
			// ===================================================================

			// Simple health check - just confirms API is responding
			systemHealth: async () => {
				return {
					status: 'healthy',
					timestamp: new Date().toISOString(),
					uptime: Math.floor((Date.now() - serverStartTime) / 1000),
					version: '1.0.0',
				};
			},

			// Ping check - minimal response
			ping: () => ({
				status: 'pong',
				timestamp: new Date().toISOString(),
			}),


			// ===================================================================
			// LEGACY HEALTH (keeping for backward compatibility)
			// ===================================================================

			// Health & System
			health: async (context: GraphQLContext) => {
				const c = getContext();
				const apiKey = c.get('apiKey');

				if (!apiKey || apiKey === 'introspection-placeholder') {
					return 'healthy';
				}

				// Simple health check without external dependencies
				return 'healthy';
			},

			hello: () => 'Hello from LunarCrush Universal API',

			// ===================================================================
			// LUNARCRUSH DATA QUERIES
			// ===================================================================

			// Topics
			getTopicsList: async (args: any, context: GraphQLContext) => {
				const config: LunarCrushConfig = getConfig();

				return await getTopicsList(config, args);
			},

			getTopic: async (
				{ topic }: { topic: string },
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await getTopic(config, topic);
			},

			getTopicWhatsup: async (
				{ topic }: { topic: string },
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await getTopicWhatsup(config, topic);
			},

			getTopicTimeSeries: async (
				args: {
					topic: string;
					bucket?: string;
					interval?: string;
					start?: string;
					end?: string;
				},
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await getTopicTimeSeries(config, args);
			},

			getTopicTimeSeriesV2: async (
				args: { topic: string; bucket?: string },
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await getTopicTimeSeriesV2(config, args);
			},

			getTopicPosts: async (
				args: { topic: string; start?: string; end?: string },
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await getTopicPosts(config, args);
			},

			getTopicNews: async (
				{ topic }: { topic: string },
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await getTopicNews(config, topic);
			},

			getTopicCreators: async (
				{ topic }: { topic: string },
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await getTopicCreators(config, topic);
			},

			// Categories
			getCategoriesList: async (args: any, context: GraphQLContext) => {
				const config: LunarCrushConfig = getConfig();

				return await getCategoriesList(config, args);
			},

			getCategory: async (
				{ category }: { category: string },
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await getCategory(config, category);
			},

			getCategoryTopics: async (
				{ category }: { category: string },
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await getCategoryTopics(config, category);
			},

			getCategoryTimeSeries: async (
				args: {
					category: string;
					bucket?: string;
					interval?: string;
					start?: string;
					end?: string;
				},
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await getCategoryTimeSeries(config, args);
			},

			getCategoryPosts: async (
				args: { category: string; start?: string; end?: string },
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await getCategoryPosts(config, args);
			},

			getCategoryNews: async (
				{ category }: { category: string },
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await getCategoryNews(config, category);
			},

			getCategoryCreators: async (
				{ category }: { category: string },
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await getCategoryCreators(config, category);
			},

			// Creators
			getCreatorsList: async (args: any, context: GraphQLContext) => {
				const config: LunarCrushConfig = getConfig();

				return await getCreatorsList(config, args);
			},

			getCreator: async (
				args: { network: string; id: string },
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await getCreator(config, args);
			},

			getCreatorTimeSeries: async (
				args: {
					network: string;
					id: string;
					bucket?: string;
					interval?: string;
					start?: string;
					end?: string;
				},
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await getCreatorTimeSeries(config, args);
			},

			getCreatorPosts: async (
				args: { network: string; id: string; start?: string; end?: string },
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await getCreatorPosts(config, args);
			},

			// Coins
			getCoinsList: async (args: any, context: GraphQLContext) => {
				const config: LunarCrushConfig = getConfig();

				return await getCoinsList(config, args);
			},

			getCoinsListV2: async (args: any, context: GraphQLContext) => {
				const config: LunarCrushConfig = getConfig();

				return await getCoinsListV2(config, args);
			},

			getCoin: async (
				{ symbol }: { symbol: string },
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await getCoin(config, symbol);
			},

			getCoinMeta: async (
				{ symbol }: { symbol: string },
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await getCoinMeta(config, symbol);
			},

			getCoinTimeSeries: async (
				args: {
					symbol: string;
					bucket?: string;
					interval?: string;
					start?: string;
					end?: string;
				},
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await getCoinTimeSeries(config, args);
			},

			// Stocks
			getStocksList: async (args: any, context: GraphQLContext) => {
				const config: LunarCrushConfig = getConfig();

				return await getStocksList(config, args);
			},

			getStocksListV2: async (args: any, context: GraphQLContext) => {
				const config: LunarCrushConfig = getConfig();

				return await getStocksListV2(config, args);
			},

			getStock: async (
				{ symbol }: { symbol: string },
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await getStock(config, symbol);
			},

			getStockTimeSeries: async (
				args: {
					symbol: string;
					bucket?: string;
					interval?: string;
					start?: string;
					end?: string;
				},
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await getStockTimeSeries(config, args);
			},

			// NFTs
			getNftsList: async (args: any, context: GraphQLContext) => {
				const config: LunarCrushConfig = getConfig();

				return await getNftsList(config, args);
			},

			getNftsListV2: async (args: any, context: GraphQLContext) => {
				const config: LunarCrushConfig = getConfig();

				return await getNftsListV2(config, args);
			},

			getNft: async ({ id }: { id: string }, context: GraphQLContext) => {
				const config: LunarCrushConfig = getConfig();

				return await getNft(config, id);
			},

			getNftTimeSeries: async (
				{
					id,
					bucket,
					interval,
					start,
					end,
				}: {
					id: string;
					bucket?: string;
					interval?: string;
					start?: string;
					end?: string;
				},
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await getNftTimeSeries(config, {
					nft: id,
					bucket,
					interval,
					start,
					end,
				});
			},

			// Search - COMMENTED OUT FOR NOW (not critical)
			/*
			searchPosts: async (
				{ term, searchJson }: { term?: string; searchJson?: string },
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await searchPosts(config, { term, searchJson });
			},
			*/

			// System
			getSystemChanges: async (args: any, context: GraphQLContext) => {
				const config: LunarCrushConfig = getConfig();

				return await getSystemChanges(config, args);
			},

			// Search functionality - COMMENTED OUT FOR NOW (not critical)
			/*
			getSearchesList: async (args: any, context: GraphQLContext) => {
				const config: LunarCrushConfig = getConfig();

				return await getSearchesList(config, args);
			},

			getSearch: async ({ id }: { id: string }, context: GraphQLContext) => {
				const config: LunarCrushConfig = getConfig();

				return await getSearch(config, id);
			},
			*/

			// Post functionality
			getPostDetails: async (
				args: { type: string; id: string },
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await getPostDetails(config, args);
			},

			getPostTimeSeries: async (
				args: {
					type: string;
					id: string;
					bucket?: string;
					interval?: string;
					start?: string;
					end?: string;
				},
				context: GraphQLContext
			) => {
				const config: LunarCrushConfig = getConfig();

				return await getPostTimeSeries(config, args);
			},
		},
	};
}
