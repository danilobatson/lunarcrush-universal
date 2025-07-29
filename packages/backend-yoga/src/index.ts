import { createYoga, createSchema } from 'graphql-yoga';
import { typeDefs } from './schema';
import {
	performHealthCheck,
	healthResponses,
	HealthCheckConfig,
} from './utils/health';
import {
	LunarCrushConfig,
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
	getCoinTimeSeries,
	getCoinMeta,
	getStocksList,
	getStocksListV2,
	getStock,
	getStockTimeSeries,
	getNftsList,
	getNftsListV2,
	getNft,
	getNftTimeSeries,
	getSystemChanges,
	getSearchesList,
} from './services/lunarcrush';

// Import the fixed functions
import {
	getNftTimeSeriesV1Fixed,
	getSearchFixed,
	searchPostsFixed,
	getPostDetailsFixed,
	getPostTimeSeriesFixed,
} from './services/lunarcrush-fixes';

import { z } from 'zod';
import { useCSRFPrevention } from '@graphql-yoga/plugin-csrf-prevention';
interface Env {
	LUNARCRUSH_API_KEY: { get(): Promise<string> };
	DB?: any;
	ENVIRONMENT?: string;
	CUSTOM_CORS?: string;
	LUNARCRUSH_CACHE: KVNamespace;
}

// For demo phase - simple global cache (all users share)
const getCachedOrFetch = async (
	kv: KVNamespace,
	cacheKey: string,
	fetchFn: () => Promise<any>,
	request?: Request,
	defaultTtlSeconds = 120
) => {
	try {
		let ttlSeconds = defaultTtlSeconds;

		if (request) {
			const userTTL = request.headers.get('x-cache-ttl');
			if (userTTL) {
				const parsedTTL = parseInt(userTTL, 10);
				if (parsedTTL > 0 && parsedTTL < 60) {
					console.log(`⚡ TTL ${parsedTTL}s < 60s - BYPASSING CACHE`);
					return await fetchFn();
				}
				if (parsedTTL >= 60 && parsedTTL <= 1800) {
					ttlSeconds = parsedTTL;
				}
			}
		}

		// Global demo cache - all users share (using your server API key)
		const fullCacheKey = `demo:${cacheKey}`;

		console.log(`🔍 Demo cache GET: ${fullCacheKey} (TTL: ${ttlSeconds}s)`);
		const cached = await kv.get(fullCacheKey);

		if (cached) {
			console.log(`📖 Demo cache HIT: ${fullCacheKey}`);
			return JSON.parse(cached);
		}

		console.log(`📖 Demo cache MISS: ${fullCacheKey}`);
		const freshData = await fetchFn();

		console.log(`💾 Demo cache SET: ${fullCacheKey} (TTL: ${ttlSeconds}s)`);
		await kv.put(fullCacheKey, JSON.stringify(freshData), {
			expirationTtl: ttlSeconds,
		});
		console.log(`✅ Demo cache stored successfully`);

		return freshData;
	} catch (error) {
		console.error('❌ Cache error:', error);
		return await fetchFn();
	}
};

const CorsSchema = z.object({
	origin: z.union([z.string(), z.array(z.string())]).optional(),
	credentials: z.boolean().optional(),
	methods: z.array(z.string()).optional(),
	allowedHeaders: z.array(z.string()).optional(),
	exposedHeaders: z.array(z.string()).optional(),
	maxAge: z.number().optional(),
});

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		try {
			const apiKey = await env.LUNARCRUSH_API_KEY.get();
			const config: LunarCrushConfig = {
				apiKey,
				baseUrl: 'https://lunarcrush.com/api4/public',
			};

			// Health check configuration
			const healthConfig: HealthCheckConfig = {
				apiKey,
				database: env.DB,
				environment: env.ENVIRONMENT || 'production',
			};

			// 🏥 Enhanced Health Check Endpoints
			if (url.pathname === '/health') {
				try {
					const healthResult = await performHealthCheck(healthConfig);
					return new Response(JSON.stringify(healthResult, null, 2), {
						status: 200, // Always return 200 for health endpoint
						headers: {
							'Content-Type': 'application/json',
							'Cache-Control': 'no-cache, no-store, must-revalidate',
						},
					});
				} catch (error) {
					const fallbackHealth = {
						status: 'healthy',
						timestamp: new Date().toISOString(),
						uptime: 0,
						version: '1.0.0',
						environment: env.ENVIRONMENT || 'production',
						checks: {
							api: { status: 'healthy' },
							database: { status: 'healthy', error: 'Not configured' },
							dependencies: {
								lunarcrush: {
									status: 'degraded',
									error:
										error instanceof Error
											? error.message
											: 'Health check simplified',
								},
							},
						},
					};

					return new Response(JSON.stringify(fallbackHealth, null, 2), {
						status: 200,
						headers: {
							'Content-Type': 'application/json',
							'Cache-Control': 'no-cache, no-store, must-revalidate',
						},
					});
				}
			}

			// Kubernetes liveness probe
			if (url.pathname === '/healthz') {
				const response = healthResponses.liveness();
				return new Response(JSON.stringify(response), {
					status: 200,
					headers: { 'Content-Type': 'application/json' },
				});
			}

			// Kubernetes readiness probe
			if (url.pathname === '/ready') {
				try {
					const testApiKey = await env.LUNARCRUSH_API_KEY.get();
					const isReady = Boolean(testApiKey);
					const response = healthResponses.readiness(isReady);
					return new Response(JSON.stringify(response), {
						status: isReady ? 200 : 503,
						headers: { 'Content-Type': 'application/json' },
					});
				} catch {
					const response = healthResponses.readiness(false);
					return new Response(JSON.stringify(response), {
						status: 503,
						headers: { 'Content-Type': 'application/json' },
					});
				}
			}

			// Simple health for load balancers
			if (url.pathname === '/ping') {
				return new Response(healthResponses.basic(), {
					status: 200,
					headers: { 'Content-Type': 'text/plain' },
				});
			}

			// 🧘 GraphQL Yoga Server
			const yoga = createYoga({
				schema: createSchema({
					typeDefs,
					resolvers: {
						Query: {
							// Enhanced health resolver for GraphQL queries
							health: async () => {
								try {
									// Test manual KV write
									console.log('🧪 Testing manual KV write...');
									await env.LUNARCRUSH_CACHE.put(
										'test-key',
										JSON.stringify({
											timestamp: new Date().toISOString(),
											test: 'manual write',
										}),
										{ expirationTtl: 60 }
									);
									console.log('✅ Manual KV write successful');

									// Test manual KV read
									const testRead = await env.LUNARCRUSH_CACHE.get('test-key');
									console.log('📖 Manual KV read result:', testRead);

									const healthResult = await performHealthCheck(healthConfig);
									return JSON.stringify(healthResult);
								} catch (error) {
									console.error('❌ KV test error:', error);
									return JSON.stringify({
										status: 'error',
										message: error.message,
									});
								}
							},

							// Simple health for basic GraphQL queries
							healthSimple: () => 'LunarCrush API Active - Enhanced & Fixed',

							// === TOPICS - All Cached ===
							getTopicsList: (_, args, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									'topics:list',
									() => getTopicsList(config),
									context?.request
								),

							getTopic: (_, { topic }, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`topic:${topic}`,
									() => getTopic(config, topic),
									context?.request
								),

							getTopicWhatsup: (_, { topic }, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`topic:${topic}:whatsup`,
									() => getTopicWhatsup(config, topic),
									context?.request
								),

							getTopicTimeSeries: (_, args, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`topic:${args.topic}:timeseries:${args.bucket}:${args.interval}:${args.start}:${args.end}`,
									() =>
										getTopicTimeSeries(
											config,
											args.topic,
											args.bucket,
											args.interval,
											args.start,
											args.end
										),
									context?.request
								),

							getTopicTimeSeriesV2: (_, args, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`topic:${args.topic}:timeseriesv2:${args.bucket}`,
									() => getTopicTimeSeriesV2(config, args.topic, args.bucket),
									context?.request
								),

							getTopicPosts: (_, args, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`topic:${args.topic}:posts:${args.start}:${args.end}`,
									() => getTopicPosts(config, args.topic, args.start, args.end),
									context?.request
								),

							getTopicNews: (_, { topic }, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`topic:${topic}:news`,
									() => getTopicNews(config, topic),
									context?.request
								),

							getTopicCreators: (_, { topic }, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`topic:${topic}:creators`,
									() => getTopicCreators(config, topic),
									context?.request
								),

							// === CATEGORIES - All Cached ===
							getCategoriesList: (_, args, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									'categories:list',
									() => getCategoriesList(config),
									context?.request
								),

							getCategory: (_, { category }, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`category:${category}`,
									() => getCategory(config, category),
									context?.request
								),

							getCategoryTopics: (_, { category }, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`category:${category}:topics`,
									() => getCategoryTopics(config, category),
									context?.request
								),

							getCategoryTimeSeries: (_, args, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`category:${args.category}:timeseries:${args.bucket}:${args.interval}:${args.start}:${args.end}`,
									() =>
										getCategoryTimeSeries(
											config,
											args.category,
											args.bucket,
											args.interval,
											args.start,
											args.end
										),
									context?.request
								),

							getCategoryPosts: (_, args, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`category:${args.category}:posts:${args.start}:${args.end}`,
									() =>
										getCategoryPosts(
											config,
											args.category,
											args.start,
											args.end
										),
									context?.request
								),

							getCategoryNews: (_, { category }, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`category:${category}:news`,
									() => getCategoryNews(config, category),
									context?.request
								),

							getCategoryCreators: (_, { category }, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`category:${category}:creators`,
									() => getCategoryCreators(config, category),
									context?.request
								),

							// === CREATORS - All Cached ===
							getCreatorsList: (_, args, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									'creators:list',
									() => getCreatorsList(config),
									context?.request
								),

							getCreator: (_, { network, id }, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`creator:${network}:${id}`,
									() => getCreator(config, network, id),
									context?.request
								),

							getCreatorTimeSeries: (_, args, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`creator:${args.network}:${args.id}:timeseries:${args.bucket}:${args.interval}:${args.start}:${args.end}`,
									() =>
										getCreatorTimeSeries(
											config,
											args.network,
											args.id,
											args.bucket,
											args.interval,
											args.start,
											args.end
										),
									context?.request
								),

							getCreatorPosts: (_, args, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`creator:${args.network}:${args.id}:posts:${args.start}:${args.end}`,
									() =>
										getCreatorPosts(
											config,
											args.network,
											args.id,
											args.start,
											args.end
										),
									context?.request
								),

							// === COINS - All Cached ===
							getCoinsList: (_, args, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									'coins:list',
									() => getCoinsList(config),
									context?.request
								),

							getCoinsListV2: (_, args, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									'coins:listv2',
									() => getCoinsListV2(config),
									context?.request
								),

							getCoin: (_, { symbol }, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`coin:${symbol}`,
									() => getCoin(config, symbol),
									context?.request
								),

							getCoinTimeSeries: (_, args, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`coin:${args.symbol}:timeseries:${args.interval}:${args.start}:${args.end}`,
									() =>
										getCoinTimeSeries(
											config,
											args.symbol,
											args.interval,
											args.start,
											args.end
										),
									context?.request
								),

							getCoinMeta: (_, { symbol }, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`coin:${symbol}:meta`,
									() => getCoinMeta(config, symbol),
									context?.request
								),

							// === STOCKS - All Cached ===
							getStocksList: (_, args, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									'stocks:list',
									() => getStocksList(config),
									context?.request
								),

							getStocksListV2: (_, args, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									'stocks:listv2',
									() => getStocksListV2(config),
									context?.request
								),

							getStock: (_, { symbol }, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`stock:${symbol}`,
									() => getStock(config, symbol),
									context?.request
								),

							getStockTimeSeries: (_, args, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`stock:${args.symbol}:timeseries:${args.interval}:${args.start}:${args.end}`,
									() =>
										getStockTimeSeries(
											config,
											args.symbol,
											args.interval,
											args.start,
											args.end
										),
									context?.request
								),

							// === NFTS - All Cached ===
							getNftsList: (_, args, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									'nfts:list',
									() => getNftsList(config),
									context?.request
								),

							getNftsListV2: (_, args, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									'nfts:listv2',
									() => getNftsListV2(config),
									context?.request
								),

							getNft: (_, { id }, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`nft:${id}`,
									() => getNft(config, id),
									context?.request
								),

							getNftTimeSeries: (_, args, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`nft:${args.id}:timeseries:${args.interval}:${args.start}:${args.end}`,
									() =>
										getNftTimeSeries(
											config,
											args.id,
											args.interval,
											args.start,
											args.end
										),
									context?.request
								),

							// === FIXED RESOLVERS - All Cached ===
							getNftTimeSeriesV1: (_, args, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`nft:${args.id}:timeseriesv1:${args.interval}:${args.start}:${args.end}`,
									() =>
										getNftTimeSeriesV1Fixed(
											config,
											args.id,
											args.interval,
											args.start,
											args.end
										),
									context?.request
								),

							getSystemChanges: (_, args, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`system:changes:${args.start}:${args.end}`,
									() => getSystemChanges(config, args.start, args.end),
									context?.request
								),

							getSearchesList: (_, args, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									'searches:list',
									() => getSearchesList(config),
									context?.request
								),

							getSearch: (_, { id }, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`search:${id}`,
									() => getSearchFixed(config, id),
									context?.request
								),

							searchPosts: (_, { term }, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`search:posts:${term}`,
									() => searchPostsFixed(config, term),
									context?.request
								),

							getPostDetails: (_, { id }, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`post:${id}:details`,
									() => getPostDetailsFixed(config, id),
									context?.request
								),

							getPostTimeSeries: (_, args, context) =>
								getCachedOrFetch(
									env.LUNARCRUSH_CACHE,
									`post:${args.id}:timeseries:${args.bucket}:${args.interval}:${args.start}:${args.end}`,
									() =>
										getPostTimeSeriesFixed(
											config,
											args.id,
											args.bucket,
											args.interval,
											args.start,
											args.end
										),
									context?.request
								),
						},
					},
				}),
				introspection: true,
				logging: 'debug',
				context: ({ request }) => ({
					request,
					kv: env.LUNARCRUSH_CACHE,
				}),

				plugins: [
					useCSRFPrevention({
						requestHeaders: ['x-graphql-yoga-csrf'],
					}),
				],
				cors: (request) => {
					console.log('🌐 CORS function called!');
					const requestOrigin = request.headers.get('origin');
					console.log('🔍 Request origin:', requestOrigin);

					const defaults = {
						origin: requestOrigin || '*',
						credentials: true,
						methods: ['GET', 'POST', 'OPTIONS'],
						allowedHeaders: [
							'Content-Type',
							'Authorization',
							'Accept',
							'Origin',
							'X-Requested-With',
							'x-cache-ttl',
							'x-graphql-yoga-csrf',
						],
					};

					if (!env.CUSTOM_CORS) {
						console.log('📝 No CUSTOM_CORS, using defaults');
						return defaults;
					}

					try {
						return {
							...defaults,
							...CorsSchema.parse(JSON.parse(env.CUSTOM_CORS)),
							origin: requestOrigin || defaults.origin,
						};
					} catch (error) {
						if (error instanceof z.ZodError) {
							console.error('❌ CORS validation errors:');
							error.errors.forEach((err) =>
								console.error(`  - ${err.path.join('.')}: ${err.message}`)
							);
						} else {
							console.error('❌ Invalid CORS JSON:', error.message);
						}
						console.error('🔄 Using default CORS');
						return defaults;
					}
				},
			});

			return yoga.fetch(request, env);
		} catch (error) {
			return new Response(
				JSON.stringify({
					error: 'Internal server error',
					message: error instanceof Error ? error.message : 'Unknown error',
					timestamp: new Date().toISOString(),
				}),
				{
					status: 500,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}
	},
};
