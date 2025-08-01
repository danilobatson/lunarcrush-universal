// ===================================================================
// 🚀 LUNARCRUSH UNIVERSAL - NATIVE HONO + PURE GRAPHQL
// ===================================================================
// Using native Hono features with pure GraphQL (no Yoga dependency)
// Based on Hono best practices and working resolver patterns
// ===================================================================

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { requestId } from 'hono/request-id';
import { secureHeaders } from 'hono/secure-headers';
import { prettyJSON } from 'hono/pretty-json';
import { HTTPException } from 'hono/http-exception';
import { graphql, buildSchema } from 'graphql';
import { timeout } from 'hono/timeout';
import { bodyLimit } from 'hono/body-limit';
import { showRoutes } from 'hono/dev';

import { getCookie, setCookie } from 'hono/cookie';
import { apiReference } from '@scalar/hono-api-reference';

import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { sha256 } from '@noble/hashes/sha256';
import { bytesToHex } from '@noble/hashes/utils';
import sanitizeHtml from 'sanitize-html';
import { AnalyticsEngine } from '@cloudflare/workers-analytics-engine';

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

import {
	getNftTimeSeriesV1Fixed,
	getSearchFixed,
	searchPostsFixed,
	getPostDetailsFixed,
	getPostTimeSeriesFixed,
} from './services/lunarcrush-fixes';

const graphqlSchema = z.object({
	query: z.string().min(1, 'Query is required').max(10000, 'Query too long'),
	variables: z.object({}).optional(),
	operationName: z.string().optional(),
});

// Enhanced Bindings for Hono
type Bindings = {
	LUNARCRUSH_API_KEY: { get(): Promise<string> };
	DB?: any;
	ENVIRONMENT?: string;
	CUSTOM_CORS?: string;
	LUNARCRUSH_CACHE: KVNamespace;
};

// Enhanced Variables for request context
type Variables = {
	requestId: string;
	startTime: number;
	userAgent?: string;
	clientIP?: string;
	user?: any;
	userApiKeyHash?: string;
	getApiKey?: () => string | null;
	metrics?: any;
};

function simpleHashApiKey(apiKey: string): string {
	const hash = sha256(new TextEncoder().encode(apiKey));
	return bytesToHex(hash).substring(0, 8); // First 8 chars
}

console.log('🚀 Creating native Hono app with pure GraphQL...');

// Create Hono app with enhanced typing
const app = new Hono<{
	Bindings: Bindings;
	Variables: Variables;
}>();

// ===== NATIVE HONO MIDDLEWARE STACK =====

// Essential middleware (Hono native)
app.use(logger());
app.use(requestId());
app.use(secureHeaders());
app.use('*', timeout(30000));
app.use(
	'*',
	bodyLimit({
		maxSize: 1024 * 1024, // 1MB limit
		onError: (c) => {
			return c.json(
				{
					error: 'Request body too large',
					message: 'Maximum allowed size is 1MB',
					requestId: c.get('requestId'),
				},
				413
			);
		},
	})
); // 1MB limit
app.use(prettyJSON());

// Sanitization middleware
app.use('*', async (c, next) => {
	const originalConsole = { ...console };

	const sanitizeValue = (value: any): any => {
		if (typeof value === 'string') {
			return (
				value
					// Remove API key patterns (common formats)
					.replace(/\b[a-zA-Z0-9_-]{20,}\b/g, '[REDACTED_KEY]')
					.replace(/Bearer\s+[a-zA-Z0-9_-]+/gi, 'Bearer [REDACTED]')
					.replace(
						/Authorization:\s*Bearer\s+[a-zA-Z0-9_-]+/gi,
						'Authorization: Bearer [REDACTED]'
					)
					// Remove any potential secrets
					.replace(
						/(api[_-]?key|token|secret|password)[:=]\s*[a-zA-Z0-9_-]+/gi,
						'$1: [REDACTED]'
					)
			);
		}

		if (typeof value === 'object' && value !== null) {
			const sanitized = Array.isArray(value) ? [] : {};
			for (const [key, val] of Object.entries(value)) {
				if (
					/api[_-]?key|authorization|token|secret|password|bearer/i.test(key)
				) {
					sanitized[key] = '[REDACTED]';
				} else {
					sanitized[key] = sanitizeValue(val);
				}
			}
			return sanitized;
		}

		return value;
	};

	// Override console methods with sanitization
	['log', 'error', 'warn', 'info', 'debug'].forEach((method) => {
		console[method] = (...args) => {
			const sanitizedArgs = args.map(sanitizeValue);
			originalConsole[method](...sanitizedArgs);
		};
	});

	await next();

	// Restore console
	Object.assign(console, originalConsole);
});

// Enhanced CORS (Hono native)
app.use(
	'/*',
	cors({
		origin: (origin) => {
			return origin || '*';
		},
		allowMethods: ['GET', 'POST', 'OPTIONS'],
		allowHeaders: [
			'Content-Type',
			'Authorization',
			'Accept',
			'Origin',
			'X-Requested-With',
			'x-cache-ttl',
		],
		credentials: true,
	})
);

// Request context middleware (Hono pattern)
app.use('*', async (c, next) => {
	c.set('startTime', Date.now());
	c.set('userAgent', c.req.header('User-Agent') || 'unknown');
	c.set('clientIP', c.req.header('CF-Connecting-IP') || 'unknown');
	await next();
});

// Helper function
function getErrorType(status: number): string {
	switch (status) {
		case 400:
			return 'BAD_REQUEST';
		case 401:
			return 'UNAUTHORIZED';
		case 403:
			return 'FORBIDDEN';
		case 404:
			return 'NOT_FOUND';
		case 413:
			return 'PAYLOAD_TOO_LARGE';
		case 429:
			return 'RATE_LIMITED';
		default:
			return 'HTTP_ERROR';
	}
}

// Metrics middleware
app.use('*', async (c, next) => {
	const start = Date.now();
	await next();
	const responseTime = Date.now() - start;

	// Store metrics in KV (optional, for persistence)
	const endpoint = c.req.path;
	const method = c.req.method;
	const status = c.res.status;

	const apiKeyHash = c.get('userApiKeyHash');

	// Log metrics (you could also store in KV for persistence)
	console.log('📊 API Metrics:', {
		endpoint,
		method,
		status,
		responseTime,
		userAgent: c.get('userAgent')?.substring(0, 50),
		apiKeyHash: apiKeyHash || 'none',
	});

	c.header('X-Response-Time', `${responseTime}ms`);
	c.header('X-Request-ID', c.get('requestId'));
});

// Professional headers middleware
app.use('*', async (c, next) => {
	await next();

	// Keep only the useful ones
	c.header('X-Response-Time', `${Date.now() - c.get('startTime')}ms`);
	c.header('X-Content-Type-Options', 'nosniff');
	c.header('X-Frame-Options', 'DENY');
	c.header('X-XSS-Protection', '1; mode=block');
	c.header('Referrer-Policy', 'strict-origin-when-cross-origin');

	c.header('X-Powered-By', 'LunarCrush');

	// Cache headers (these are actually useful)
	const path = c.req.path;
	if (path === '/health' || path === '/metrics') {
		c.header('Cache-Control', 'no-cache, no-store, must-revalidate');
	}
});

// Cookies
app.use('*', async (c, next) => {
	const sessionId = getCookie(c, 'session-id');
	if (!sessionId) {
		const newSessionId = `sess_${Date.now()}`;
		setCookie(c, 'session-id', newSessionId, { httpOnly: true });
	}
	await next();
});

app.get('/health', async (c) => {
	try {
		const apiKey = await c.env.LUNARCRUSH_API_KEY.get();

		if (!apiKey) {
			return c.json(
				{
					status: 'degraded',
					timestamp: new Date().toISOString(),
					error: 'API key not configured',
					requestId: c.get('requestId'),
					responseTime: Date.now() - c.get('startTime'),
				},
				200
			);
		}

		const healthConfig: HealthCheckConfig = {
			apiKey,
			database: c.env.DB,
			environment: c.env.ENVIRONMENT || 'production',
		};

		const healthResult = await performHealthCheck(healthConfig);

		// Enhanced health response with Hono context
		return c.json(
			{
				...healthResult,
				requestId: c.get('requestId'),
				responseTime: Date.now() - c.get('startTime'),
				client: {
					ip: c.get('clientIP'),
					userAgent: c.get('userAgent'),
				},
				features: [
					'native-hono',
					'pure-graphql',
					'cloudflare-workers',
					'kv-caching',
					'enhanced-middleware',
				],
			},
			200
		);
	} catch (error) {
		return c.json(
			{
				status: 'error',
				timestamp: new Date().toISOString(),
				error: error instanceof Error ? error.message : 'Health check error',
				requestId: c.get('requestId'),
				responseTime: Date.now() - c.get('startTime'),
			},
			200
		);
	}
});

app.get('/ping', (c) => c.text('pong'));

app.get('/metrics', (c) => {
	return c.json({
		service: 'lunarcrush-universal-api',
		timestamp: new Date().toISOString(),
		uptime: process.uptime ? process.uptime() : 'unknown',
		features: [
			'native-hono',
			'user-api-keys',
			'custom-metrics',
			'scalar-docs',
			'enhanced-errors',
		],
		endpoints: {
			'/health': 'Health check',
			'/graphql': 'GraphQL API',
			'/docs': 'API documentation',
			'/metrics': 'Performance metrics',
		},
		performance: {
			framework: 'hono',
			runtime: 'cloudflare-workers',
			caching: 'kv-storage',
		},
	});
});

const getCachedOrFetch = async (
	kv: KVNamespace,
	cacheKey: string,
	fetchFn: () => Promise<any>,
	request?: any, // Change from Request to any
	defaultTtlSeconds = 120
) => {
	try {
		let ttlSeconds = defaultTtlSeconds;

		if (request) {
			let userTTL;

			// Handle both Hono request and Web API Request
			if (request.header && typeof request.header === 'function') {
				// Hono request object
				userTTL = request.header('x-cache-ttl');
			} else if (request.headers && typeof request.headers.get === 'function') {
				// Web API Request object
				userTTL = request.headers.get('x-cache-ttl');
			} else {
				console.log('⚠️ Unknown request object type, skipping TTL check');
			}

			if (userTTL) {
				const parsedTTL = parseInt(userTTL, 10);
				if (parsedTTL > 0 && parsedTTL < 60) {
					return await fetchFn();
				}
				if (parsedTTL >= 60 && parsedTTL <= 1800) {
					ttlSeconds = parsedTTL;
				}
			}
		}

		const fullCacheKey = `demo:${cacheKey}`;
		const cached = await kv.get(fullCacheKey);

		if (cached) {
			return JSON.parse(cached);
		}

		const freshData = await fetchFn();

		await kv.put(fullCacheKey, JSON.stringify(freshData), {
			expirationTtl: ttlSeconds,
		});

		return freshData;
	} catch (error) {
		console.error('❌ Cache error:', error);
		return await fetchFn();
	}
};

// ===== PURE GRAPHQL RESOLVERS (HONO PATTERN) =====
const createResolvers = (env: Bindings) => ({
	health: async () => {
		try {
			const apiKey = context.getApiKey?.();
			const healthConfig: HealthCheckConfig = {
				apiKey,
				database: env.DB,
				environment: env.ENVIRONMENT || 'production',
			};
			const healthResult = await performHealthCheck(healthConfig);
			healthConfig.apiKey = '[REDACTED]';
			return JSON.stringify(healthResult);
		} catch (error) {
			return JSON.stringify({
				status: 'error',
				message: error.message,
			});
		}
	},

	healthSimple: () => 'LunarCrush API Active - Enhanced & Fixed',

	getTopicsList: async (args, context) => {
		const apiKey = context.getApiKey?.();

		if (!apiKey) {
			throw new Error(
				'API key not found. Please provide your LunarCrush API key in Authorization header.'
			);
		}

		const config: LunarCrushConfig = {
			apiKey,
			baseUrl: context.baseUrl,
		};

		try {
			const result = await getCachedOrFetch(
				env.LUNARCRUSH_CACHE,
				'topics:list',
				() => getTopicsList(config),
				context?.request
			);

			return result;
		} finally {
			config.apiKey = null;
		}
	},

	getTopic: async (args, context) => {
		const apiKey = context.getApiKey?.();
		if (!apiKey) {
			throw new Error(
				'API key not found. Please provide your LunarCrush API key in Authorization header.'
			);
		}

		const config: LunarCrushConfig = {
			apiKey,
			baseUrl: context.baseUrl,
		};

		try {
			const result = await getCachedOrFetch(
				env.LUNARCRUSH_CACHE,
				`topic:${args.topic}:${context.apiKeyHash}`,
				() => getTopic(config, args.topic),
				context?.request
			);

			return result;
		} finally {
			config.apiKey = null;
		}
	},

	getTopicWhatsup: async (args, context) => {
		const apiKey = context.getApiKey?.();

		if (!apiKey) {
			throw new Error(
				'API key not found. Please provide your LunarCrush API key in Authorization header.'
			);
		}

		const config: LunarCrushConfig = {
			apiKey,
			baseUrl: context.baseUrl,
		};
		try {
			const result = getCachedOrFetch(
				env.LUNARCRUSH_CACHE,
				`topic:${args.topic}:whatsup:${context.apiKeyHash}`,
				() => getTopicWhatsup(config, args.topic),
				context?.request
			);

			return result;
		} finally {
			config.apiKey = null;
		}
	},

	getCoin: async (args, context) => {
		const apiKey = context.getApiKey?.();

		if (!apiKey) {
			throw new Error(
				'API key not found. Please provide your LunarCrush API key in Authorization header.'
			);
		}

		const config: LunarCrushConfig = {
			apiKey,
			baseUrl: context.baseUrl,
		};

		try {
			const result = await getCachedOrFetch(
				env.LUNARCRUSH_CACHE,
				`coin:${args.symbol}:${context.apiKeyHash}`,
				() => getCoin(config, args.symbol),
				context?.request
			);

			return result;
		} finally {
			config.apiKey = null;
		}
	},

	getCoinsList: async (args, context) => {
		const apiKey = context.getApiKey?.();
		if (!apiKey) {
			throw new Error(
				'API key not found. Please provide your LunarCrush API key in Authorization header.'
			);
		}

		const config: LunarCrushConfig = {
			apiKey,
			baseUrl: context.baseUrl,
		};
		try {
			const result = getCachedOrFetch(
				env.LUNARCRUSH_CACHE,
				'coins:list',
				() => getCoinsList(config),
				context?.request
			);

			return result;
		} finally {
			config.apiKey = null;
		}
	},
});

app.get(
	'/docs',
	apiReference({
		theme: 'kepler', // Modern purple theme
		spec: {
			url: '/api-spec.json',
		},
		metaData: {
			title: 'LunarCrush Universal API',
			description: 'Beautiful, modern API documentation',
		},
	})
);

app.get('/api-spec.json', (c) => {
	const baseUrl = new URL(c.req.url).origin;

	return c.json({
		openapi: '3.0.0',
		info: {
			title: 'LunarCrush Universal API',
			version: '1.0.0',
			description: `# 🚀 LunarCrush Universal API

Social intelligence data for crypto, stocks, and NFTs. Built with native Hono + pure GraphQL for maximum performance on Cloudflare Workers.

## 🔬 Interactive GraphQL Playground

**Try queries instantly in our GraphQL Playground:**
👉 **[Open GraphQL Playground](${baseUrl}/graphql)** 👈

The playground provides:
- ✨ Real-time query execution
- 📖 Full schema exploration
- 🔍 Query validation and autocomplete
- 📊 Response formatting and analysis

Perfect for testing queries before implementing in your app!

---`,
			'x-keywords': [
				'GraphQL',
				'cryptocurrency',
				'Bitcoin',
				'Ethereum',
				'social intelligence',
				'trading API',
				'market sentiment',
				'crypto API',
			],
			'x-use-cases': [
				'Trading bot development',
				'Cryptocurrency sentiment analysis',
				'Social media trend tracking',
				'Portfolio management tools',
				'Market research applications',
			],
			'x-ai-friendly': true,
			contact: {
				name: 'LunarCrush API Support',
				url: 'https://lunarcrush.com',
				email: 'support@lunarcrush.com',
			},
			license: {
				name: 'MIT',
				url: 'https://opensource.org/licenses/MIT',
			},
		},
		servers: [
			{ url: 'http://localhost:8787', description: 'Development Server' },
			{
				url: 'https://lunarcrush.cryptoguard-api.workers.dev',
				description: 'Production Server',
			},
		],
		paths: {
			'/graphql': {
				post: {
					summary: 'GraphQL API - Social Intelligence Data',
					description:
						'Execute GraphQL queries for comprehensive crypto social intelligence. Requires your LunarCrush API key.',
					tags: ['GraphQL'],
					security: [{ BearerAuth: [] }],
					requestBody: {
						required: true,
						content: {
							'application/json': {
								schema: {
									type: 'object',
									required: ['query'],
									properties: {
										query: {
											type: 'string',
											description: 'GraphQL query string',
											examples: {
												'Quick Health Check': {
													value: '{ healthSimple }',
													summary: 'Test API connectivity',
												},
												'Bitcoin Analysis': {
													value:
														'{ getCoin(symbol: "btc") { name price market_cap alt_rank galaxy_score } }',
													summary: 'Get Bitcoin market + social data',
												},
												'Multi-Coin Comparison': {
													value:
														'{ btc: getCoin(symbol: "btc") { name price alt_rank } eth: getCoin(symbol: "eth") { name price alt_rank } }',
													summary: 'Compare multiple cryptocurrencies',
												},
												'Topic Intelligence': {
													value:
														'{ getTopic(topic: "bitcoin") { topic title sentiment social_score } }',
													summary: 'Social sentiment analysis',
												},
											},
										},
										variables: {
											type: 'object',
											description: 'Variables for dynamic queries (optional)',
											example: { symbol: 'eth' },
										},
										operationName: {
											type: 'string',
											description:
												'Operation name for multi-operation queries (optional)',
											example: 'GetCoinData',
										},
									},
								},
								examples: {
									'Start Here - Health Check': {
										summary: '✅ Test your API key and connectivity',
										value: { query: '{ healthSimple }' },
									},
									'Bitcoin Deep Dive': {
										summary: '🚀 Complete Bitcoin analysis',
										value: {
											query:
												'{ getCoin(symbol: "btc") { name symbol price market_cap alt_rank galaxy_score sentiment social_score } }',
										},
									},
									'Dynamic Query with Variables': {
										summary: '⚡ Reusable parameterized queries',
										value: {
											query:
												'query GetCoin($symbol: String!) { getCoin(symbol: $symbol) { name price alt_rank } }',
											variables: { symbol: 'eth' },
											operationName: 'GetCoin',
										},
									},
									'Portfolio Tracking': {
										summary: '📊 Track multiple coins at once',
										value: {
											query:
												'{ btc: getCoin(symbol: "btc") { name price } eth: getCoin(symbol: "eth") { name price } sol: getCoin(symbol: "sol") { name price } }',
										},
									},
								},
							},
						},
					},
					responses: {
						200: {
							description: 'GraphQL response with data and metadata',
							content: {
								'application/json': {
									schema: {
										type: 'object',
										properties: {
											data: {
												type: 'object',
												description: 'Query results',
												example: {
													getCoin: {
														name: 'Bitcoin',
														symbol: 'BTC',
														price: 67234.56,
														market_cap: 1327000000000,
														alt_rank: 1,
													},
												},
											},
											extensions: {
												type: 'object',
												description: 'Performance and request metadata',
												example: {
													timing: { responseTime: 223 },
													hono: { native: true, requestId: 'f7c1b72f-32d0' },
												},
											},
										},
									},
								},
							},
						},
						400: {
							description: 'Missing API key or invalid query',
							content: {
								'application/json': {
									example: {
										errors: [
											{
												message:
													'API key not found. Please provide your LunarCrush API key in Authorization header.',
											},
										],
									},
								},
							},
						},
						401: {
							description: 'Invalid LunarCrush API key',
							content: {
								'application/json': {
									example: {
										errors: [
											{
												message:
													'API Unauthorized: LunarCrush API error: 401 Unauthorized',
											},
										],
									},
								},
							},
						},
					},
				},
				get: {
					summary: 'GraphQL Playground (Apollo Studio)',
					description:
						'Redirects to Apollo Studio for interactive GraphQL exploration',
					tags: ['GraphQL'],
					responses: {
						302: {
							description: 'Redirect to Apollo Studio GraphQL Playground',
						},
					},
				},
			},
			'/health': {
				get: {
					summary: 'System Health Check',
					description:
						'Comprehensive health status including API connectivity and system info',
					tags: ['Monitoring'],
					responses: {
						200: {
							description: 'Detailed health status',
							content: {
								'application/json': {
									example: {
										status: 'healthy',
										timestamp: '2025-07-31T23:22:45.213Z',
										version: '1.0.0',
										requestId: 'f7c1b72f-32d0-4e52-bed8-12658c24927c',
										responseTime: 17,
										features: [
											'native-hono',
											'pure-graphql',
											'cloudflare-workers',
										],
										checks: {
											api: {
												status: 'healthy',
												error: 'All 40 GraphQL resolvers verified working',
											},
											database: { status: 'healthy' },
										},
									},
								},
							},
						},
					},
				},
			},
			'/metrics': {
				get: {
					summary: 'Performance Metrics',
					description: 'API performance metrics and service information',
					tags: ['Monitoring'],
					responses: {
						200: {
							description: 'Service metrics and performance data',
							content: {
								'application/json': {
									example: {
										service: 'lunarcrush-universal-api',
										timestamp: '2025-07-31T23:22:45.213Z',
										features: [
											'native-hono',
											'user-api-keys',
											'custom-metrics',
											'scalar-docs',
										],
										endpoints: {
											'/health': 'Health check',
											'/graphql': 'GraphQL API',
											'/docs': 'API documentation',
											'/metrics': 'Performance metrics',
										},
										performance: {
											framework: 'hono',
											runtime: 'cloudflare-workers',
											caching: 'kv-storage',
										},
									},
								},
							},
						},
					},
				},
			},
			'/docs': {
				get: {
					summary: 'Interactive API Documentation',
					description: 'Beautiful, modern API documentation with Scalar UI',
					tags: ['Documentation'],
					responses: {
						200: {
							description: 'Interactive documentation interface',
						},
					},
				},
			},
			'/ping': {
				get: {
					summary: 'Simple Connectivity Test',
					description: 'Basic ping-pong test for uptime monitoring',
					tags: ['Monitoring'],
					responses: {
						200: {
							description: 'Pong response',
							content: {
								'text/plain': {
									example: 'pong',
								},
							},
						},
					},
				},
			},
		},
		components: {
			securitySchemes: {
				BearerAuth: {
					type: 'http',
					scheme: 'bearer',
					description:
						'Your LunarCrush API key. Get one at https://lunarcrush.com/developers',
					bearerFormat: 'API Key',
				},
			},
			examples: {
				SimpleHealthCheck: {
					summary: 'Test API Connection',
					value: { query: '{ healthSimple }' },
				},
				BitcoinAnalysis: {
					summary: 'Bitcoin Market + Social Data',
					value: {
						query:
							'{ getCoin(symbol: "btc") { name symbol price market_cap alt_rank galaxy_score sentiment } }',
					},
				},
				MultiCoinComparison: {
					summary: 'Compare Top Cryptocurrencies',
					value: {
						query:
							'{ btc: getCoin(symbol: "btc") { name price alt_rank } eth: getCoin(symbol: "eth") { name price alt_rank } sol: getCoin(symbol: "sol") { name price alt_rank } }',
					},
				},
			},
		},
		tags: [
			{
				name: 'GraphQL',
				description:
					'🚀 Social intelligence data via GraphQL - requires your LunarCrush API key',
			},
			{
				name: 'Monitoring',
				description: '📊 System health, metrics, and performance monitoring',
			},
			{
				name: 'Documentation',
				description: '📚 API documentation and interactive tools',
			},
		],
		'x-getting-started': {
			description: 'Quick start guide for the LunarCrush Universal API',
			steps: [
				'1. Get your LunarCrush API key at https://lunarcrush.com/developers',
				'2. Test connectivity: POST /graphql with { "query": "{ healthSimple }" }',
				'3. Add Authorization: Bearer YOUR_API_KEY header',
				'4. Try Bitcoin data: { "query": "{ getCoin(symbol: \\"btc\\") { name price } }" }',
				'5. Explore full schema at /graphql (redirects to Apollo Studio)',
			],
		},
	});
});

// Add this before your GraphQL routes
app.get('/', (c) => {
	const accept = c.req.header('Accept') || '';
	const userAgent = c.req.header('User-Agent') || '';

	// Detect if it's likely an LLM/bot vs human browser
	const isLLM =
		userAgent.includes('bot') ||
		userAgent.includes('GPT') ||
		accept.includes('text/plain') ||
		accept.includes('text/markdown');

	if (isLLM || c.req.query('format') === 'text') {
		// ULTIMATE LLM-optimized response
		return c.text(`# LunarCrush Universal API - Complete Developer Guide

## Overview
GraphQL API providing real-time social intelligence data for 1000+ cryptocurrencies including Bitcoin, Ethereum, Solana, and emerging tokens. Built on Hono + Cloudflare Workers for maximum performance.

## 🚀 Quick Start for Developers

### Step 1: Get Your API Key
1. Visit: https://lunarcrush.com/developers
2. Create free account and generate API key

### Step 2: Test the API
Visit our interactive documentation: ${new URL(c.req.url).origin}/docs
Or use the GraphQL playground: ${new URL(c.req.url).origin}/graphql

### Step 3: Make Your First Request
\`\`\`bash
curl -X POST ${new URL(c.req.url).origin}/graphql \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{"query": "{ getCoin(symbol: \\"btc\\") { name price market_cap sentiment } }"}'
\`\`\`

## 📊 Core Data Available

### Cryptocurrency Data:
- **Market Data**: Price, market cap, volume, price changes
- **Social Intelligence**: Sentiment scores, social dominance, galaxy scores
- **Ranking**: AltRank, topic rank, social rankings
- **Trends**: Historical data, time series analysis

### Supported Assets:
- **Major Coins**: Bitcoin (BTC), Ethereum (ETH), Solana (SOL), etc.
- **Altcoins**: 1000+ supported cryptocurrencies
- **Stocks**: Social sentiment for major tech stocks
- **NFTs**: Collection data and trending NFTs

## 🛠️ Development Tools & Resources

### Official SDK (Recommended)
\`\`\`bash
npm install lunarcrush-comprehensive-sdk
\`\`\`

**Usage Example:**
\`\`\`javascript
import { LunarCrushSDK } from 'lunarcrush-comprehensive-sdk';

const sdk = new LunarCrushSDK({
  apiKey: 'your-api-key',
  endpoint: '${new URL(c.req.url).origin}/graphql'
});

// Get Bitcoin data
const bitcoin = await sdk.getCoin('btc');
console.log(\`Bitcoin price: $\${bitcoin.price}\`);
\`\`\`

### CLI Tool (Quick Setup)
\`\`\`bash
npx create-lunarcrush-app my-crypto-app
cd my-crypto-app
npm start
\`\`\`

This generates a complete starter app with:
- Pre-configured API client
- Example queries and components
- Authentication setup
- Error handling
- TypeScript support

### Source Code & Examples
- **Main Repository**: https://github.com/danilobatson/lunarcrush-universal
- **SDK Package**: https://www.npmjs.com/package/lunarcrush-comprehensive-sdk
- **CLI Package**: https://www.npmjs.com/package/create-lunarcrush-app

## 📖 Learning Resources

### Articles & Tutorials:
- **Crypto Dashboard Tutorial**: https://dev.to/dbatson/build-a-real-time-crypto-sentiment-dashboard-in-20-minutes-with-nextjs-2h84
- **Vite + Workers Guide**: https://dev.to/dbatson/build-a-lightning-fast-crypto-sentiment-dashboard-with-vite-and-cloudflare-workers-in-15-minutes-1315
- **Follow for Updates**: https://twitter.com/jamaalbuilds

### Developer Portfolio:
- **Portfolio**: https://danilobatson.github.io/

## 🔧 API Endpoints

### Primary GraphQL Endpoint:
- **URL**: \`POST ${new URL(c.req.url).origin}/graphql\`
- **Authentication**: Bearer token in Authorization header
- **Content-Type**: application/json

### Documentation & Tools:
- **Interactive Docs**: \`GET ${new URL(c.req.url).origin}/docs\` (Scalar UI)
- **GraphQL Playground**: \`GET ${new URL(c.req.url).origin}/graphql\` (Apollo Studio)
- **OpenAPI Spec**: \`GET ${new URL(c.req.url).origin}/api-spec.json\`
- **Health Check**: \`GET ${new URL(c.req.url).origin}/health\`

## 📝 Complete Query Examples

### Basic Cryptocurrency Data:
\`\`\`graphql
query GetCryptoBasics {
  getCoin(symbol: "btc") {
    name
    symbol
    price
    market_cap
    percent_change_24h
    alt_rank
    galaxy_score
  }
}
\`\`\`

### Multi-Coin Portfolio Tracking:
\`\`\`graphql
query PortfolioTracking {
  bitcoin: getCoin(symbol: "btc") {
    name
    price
    percent_change_24h
    market_cap
  }
  ethereum: getCoin(symbol: "eth") {
    name
    price
    percent_change_24h
    market_cap
  }
  solana: getCoin(symbol: "sol") {
    name
    price
    percent_change_24h
    market_cap
  }
}
\`\`\`

### Social Intelligence Analysis:
\`\`\`graphql
query SocialIntelligence {
  getTopic(topic: "bitcoin") {
    topic
    title
    sentiment
    social_score
    social_dominance
    galaxy_score
  }
  getTopicsList {
    topic
    title
    category
    topic_rank
  }
}
\`\`\`

### Dynamic Queries with Variables:
\`\`\`graphql
query GetCoinData($symbol: String!) {
  getCoin(symbol: $symbol) {
    name
    symbol
    price
    market_cap
    alt_rank
    galaxy_score
    sentiment
    social_score
    percent_change_24h
    percent_change_7d
  }
}
\`\`\`

**Variables:**
\`\`\`json
{
  "symbol": "eth"
}
\`\`\`

### Complete Market Analysis:
\`\`\`graphql
query MarketAnalysis {
  # Get top coins
  getCoinsList {
    name
    symbol
    price
    market_cap
    alt_rank
  }

  # Get social trends
  getTopicsList {
    topic
    title
    sentiment
    social_score
  }

  # Health check
  healthSimple
}
\`\`\`

## 🚨 Error Handling

### Common Errors and Solutions:

**401 Unauthorized:**
\`\`\`json
{
  "errors": [{
    "message": "API key not found. Please provide your LunarCrush API key in Authorization header."
  }]
}
\`\`\`
**Solution**: Add \`Authorization: Bearer YOUR_API_KEY\` header

**400 Bad Request:**
\`\`\`json
{
  "errors": [{
    "message": "Query is required"
  }]
}
\`\`\`
**Solution**: Ensure your GraphQL query is valid and not empty

**LunarCrush API Errors:**
\`\`\`json
{
  "errors": [{
    "message": "API Unauthorized: LunarCrush API error: 401 Unauthorized"
  }]
}
\`\`\`
**Solution**: Check your LunarCrush API key is valid at https://lunarcrush.com/developers

## 🔨 Framework Integration Examples

### React/Next.js Integration:
\`\`\`javascript
// hooks/useLunarCrush.js
import { useState, useEffect } from 'react';

export function useCoinData(symbol) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('${new URL(c.req.url).origin}/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${process.env.LUNARCRUSH_API_KEY}\`
        },
        body: JSON.stringify({
          query: \`
            query GetCoin($symbol: String!) {
              getCoin(symbol: $symbol) {
                name price market_cap sentiment
              }
            }
          \`,
          variables: { symbol }
        })
      });

      const result = await response.json();
      setData(result.data.getCoin);
      setLoading(false);
    };

    fetchData();
  }, [symbol]);

  return { data, loading };
}
\`\`\`

### Node.js Backend Integration:
\`\`\`javascript
// services/lunarcrush.js
class LunarCrushService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.endpoint = '${new URL(c.req.url).origin}/graphql';
  }

  async query(query, variables = {}) {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${this.apiKey}\`
      },
      body: JSON.stringify({ query, variables })
    });

    return response.json();
  }

  async getCoin(symbol) {
    const query = \`
      query GetCoin($symbol: String!) {
        getCoin(symbol: $symbol) {
          name price market_cap sentiment galaxy_score
        }
      }
    \`;

    const result = await this.query(query, { symbol });
    return result.data?.getCoin;
  }
}

module.exports = { LunarCrushService };
\`\`\`

### Python Integration:
\`\`\`python
import requests
import json

class LunarCrushAPI:
    def __init__(self, api_key):
        self.api_key = api_key
        self.endpoint = "${new URL(c.req.url).origin}/graphql"

    def query(self, query, variables=None):
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }

        payload = {"query": query}
        if variables:
            payload["variables"] = variables

        response = requests.post(
            self.endpoint,
            headers=headers,
            json=payload
        )
        return response.json()

    def get_coin(self, symbol):
        query = """
        query GetCoin($symbol: String!) {
            getCoin(symbol: $symbol) {
                name price market_cap sentiment
            }
        }
        """
        result = self.query(query, {"symbol": symbol})
        return result.get("data", {}).get("getCoin")

# Usage
api = LunarCrushAPI("your-api-key")
bitcoin = api.get_coin("btc")
print(f"Bitcoin price: ${bitcoin['price']}")
\`\`\`

## 💡 Common Use Cases

### 1. Trading Bot Development:
- Monitor sentiment changes for trading signals
- Track social dominance for trend identification
- Set up alerts for galaxy score changes

### 2. Portfolio Tracking:
- Real-time price monitoring
- Social sentiment overlay on portfolio
- Performance comparison with social metrics

### 3. Market Research:
- Analyze correlation between social metrics and price
- Track emerging coins by social activity
- Monitor influencer impact on token prices

### 4. Dashboard Creation:
- Build crypto sentiment dashboards
- Create social intelligence reports
- Display trending cryptocurrencies

## 🔄 Rate Limits & Best Practices

### Rate Limits:
- Default: 100 requests per 15 minutes per API key
- Burst: Up to 10 requests per second
- Caching: Responses cached for 2 minutes by default

### Best Practices:
1. **Cache responses** when possible to reduce API calls
2. **Use specific queries** - only request data you need
3. **Batch requests** using GraphQL aliases for multiple coins
4. **Handle errors gracefully** with proper retry logic
5. **Monitor usage** via response headers

### Custom Cache Control:
Add \`x-cache-ttl\` header to control cache duration:
\`\`\`bash
curl -H "x-cache-ttl: 300" -H "Authorization: Bearer YOUR_KEY" ...
\`\`\`

## 🆘 Troubleshooting

### Connection Issues:
1. Verify endpoint URL: \`${new URL(c.req.url).origin}/graphql\`
2. Check network connectivity
3. Ensure HTTPS is used (not HTTP)

### Authentication Issues:
1. Verify API key format (should be your LunarCrush API key)
2. Check Authorization header format: \`Bearer YOUR_API_KEY\`
3. Ensure API key is active at https://lunarcrush.com/developers

### Query Issues:
1. Validate GraphQL syntax at ${new URL(c.req.url).origin}/graphql
2. Check field availability in schema documentation
3. Verify variable types match schema requirements

### Performance Issues:
1. Use GraphQL aliases for multiple queries in one request
2. Limit field selection to required data only
3. Implement client-side caching

## 📞 Support & Community

### Get Help:
- **API Documentation**: ${new URL(c.req.url).origin}/docs
- **GraphQL Playground**: ${new URL(c.req.url).origin}/graphql
- **GitHub Issues**: https://github.com/danilobatson/lunarcrush-universal/issues
- **Follow Updates**: https://twitter.com/jamaalbuilds

### Contributing:
- **Main Repo**: https://github.com/danilobatson/lunarcrush-universal
- **SDK Development**: Contributions welcome for new features
- **Documentation**: Help improve examples and guides

This API is actively maintained and optimized for developer productivity. Perfect for building crypto trading bots, sentiment analysis tools, portfolio trackers, and market research applications.

---
Built with ❤️ using Hono + Cloudflare Workers | Powered by LunarCrush Data`);
	}

	// For human browsers, redirect to docs
	return c.redirect('/docs');
});

// Add these SEO endpoints
app.get('/robots.txt', (c) => {
	return c.text(`User-agent: *
Allow: /
Allow: /docs
Allow: /health
Allow: /metrics
Allow: /api-spec.json

Sitemap: ${new URL(c.req.url).origin}/sitemap.xml

# For AI crawlers and LLMs
User-agent: GPTBot
Allow: /
Allow: /docs
Allow: /api-spec.json

User-agent: ChatGPT-User
Allow: /docs
Allow: /api-spec.json`);
});

app.get('/sitemap.xml', (c) => {
	const baseUrl = new URL(c.req.url).origin;
	return c.text(
		`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/docs</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/api-spec.json</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`,
		200,
		{
			'Content-Type': 'application/xml',
		}
	);
});

app.use('/graphql', async (c, next) => {
	const authHeader = c.req.header('Authorization');

	if (authHeader) {
		let userApiKey = authHeader.startsWith('Bearer ')
			? authHeader.replace('Bearer ', '')
			: authHeader;

		// Create hash for logging/caching (no raw key exposure)
		const keyHash = simpleHashApiKey(userApiKey);

		// Store ONLY hash and secure accessor
		c.set('userApiKeyHash', keyHash);

		// Secure key accessor - key only exists during function execution
		c.set('getApiKey', () => {
			// Key is returned but not stored anywhere permanently
			return userApiKey;
		});

		// SECURITY: Clear the original variable
		userApiKey = null;

		console.log('🔑 API key secured (hash):', keyHash);
	} else {
		console.log('🔑 No Authorization header found');
		c.set('getApiKey', () => null);
	}

	await next();

	// SECURITY: Clear accessor after request
	c.set('getApiKey', () => null);
});

// Add this after your app.use('/graphql') middleware
function extractOperationName(query: string): string {
	const match = query.match(/(?:query|mutation)\s+(\w+)/);
	return match ? match[1] : 'anonymous';
}

// Build GraphQL schema (pure GraphQL, no Yoga)
const schema = buildSchema(typeDefs);

// ===== NATIVE HONO GRAPHQL ENDPOINT =====
app.post('/graphql', zValidator('json', graphqlSchema), async (c) => {
	try {
		const body = await c.req.json();
		const { query, variables = {}, operationName } = body;

		if (query) {
			const operationType = query.trim().startsWith('mutation')
				? 'mutation'
				: 'query';
			const extractedOpName = operationName || extractOperationName(query);

			// Safe: Add headers without request manipulation
			c.header('X-GraphQL-Operation', operationType);
			if (extractedOpName) {
				c.header('X-GraphQL-Operation-Name', extractedOpName);
			}
		}

		// Enhanced context with Hono features
		const context = {
			env: c.env,
			request: c.req,
			requestId: c.get('requestId'),
			clientIP: c.get('clientIP'),
			userAgent: c.get('userAgent'),
			startTime: c.get('startTime'),
			baseUrl: 'https://lunarcrush.com/api4/public',
			apiKeyHash: c.get('userApiKeyHash'),
			getApiKey: c.get('getApiKey'),
		};

		console.log('🏗️ Executing with pure graphql() and native Hono...');

		// Pure GraphQL execution (no Yoga dependency)
		const result = await graphql({
			schema,
			source: query,
			rootValue: createResolvers(c.env),
			contextValue: context,
			variableValues: variables,
			operationName,
		});

		context.getApiKey = () => '[REDACTED]';

		if (result.errors) {
			console.error('❌ GraphQL execution errors:', result.errors);

			// Enhanced GraphQL error response
			if (!result.extensions) {
				result.extensions = {};
			}

			result.extensions.errorDetails = {
				requestId: c.get('requestId'),
				timestamp: new Date().toISOString(),
				suggestions: result.errors.map((err) => {
					if (err.message.includes('API key')) {
						return 'Add Authorization: Bearer YOUR_LUNARCRUSH_API_KEY header';
					}
					if (err.message.includes('Syntax Error')) {
						return 'Check GraphQL query syntax';
					}
					return 'Check request format and try again';
				}),
			};
		}

		// Add Hono performance timing
		const responseTime = Date.now() - c.get('startTime');
		if (result.extensions) {
			result.extensions.timing = { responseTime };
			result.extensions.hono = {
				native: true,
				requestId: c.get('requestId'),
			};
		} else {
			result.extensions = {
				timing: { responseTime },
				hono: { native: true, requestId: c.get('requestId') },
			};
		}

		return c.json(result);
	} catch (error) {
		console.error('❌ GraphQL error (sanitized):', {
			message: error.message,
			requestId: c.get('requestId'),
		});
		if (error instanceof HTTPException) {
			return error.getResponse();
		}
		throw new HTTPException(500, {
			message: 'GraphQL execution failed',
			// Don't include cause which might contain sensitive data
		});
	} finally {
		if (context.getApiKey) {
			context.getApiKey = () => null;
		}
	}
});

// Replace your current app.get('/graphql') with:
app.get('/graphql', (c) => {
	// Get the current host and protocol dynamically
	const url = new URL(c.req.url);
	const endpoint = `${url.protocol}//${url.host}/graphql`;

	// Simple Apollo Studio URL with just the endpoint
	const apolloUrl = `https://studio.apollographql.com/sandbox/explorer?endpoint=${encodeURIComponent(endpoint)}`;

	return c.redirect(apolloUrl);
});
// ===== NATIVE HONO ERROR HANDLING =====
app.onError((err, c) => {
	const requestId = c.get('requestId') || 'unknown';
	const isDev = (c.env.ENVIRONMENT || 'development') === 'development';

	const sanitizedMessage = err.message
		?.replace(/\b[a-zA-Z0-9_-]{20,}\b/g, '[REDACTED_KEY]')
		?.replace(/Bearer\s+[a-zA-Z0-9_-]+/gi, 'Bearer [REDACTED]')
		?.replace(/api[_-]?key[:=]\s*[a-zA-Z0-9_-]+/gi, 'api_key: [REDACTED]');

	const sanitizedStack =
		isDev && err.stack
			? err.stack
					.replace(/\b[a-zA-Z0-9_-]{20,}\b/g, '[REDACTED_KEY]')
					.replace(/Bearer\s+[a-zA-Z0-9_-]+/gi, 'Bearer [REDACTED]')
					.substring(0, 200)
			: undefined;

	console.error('❌ Sanitized Error:', {
		message: sanitizedMessage,
		type: err.name,
		requestId,
		path: c.req.path,
	});

	if (err instanceof HTTPException) {
		return c.json(
			{
				error: {
					type: getErrorType(err.status),
					message: sanitizedMessage,
					status: err.status,
					requestId,
					timestamp: new Date().toISOString(),
					...(isDev && { stack: sanitizedStack }),
				},
			},
			err.status
		);
	}

	return c.json(
		{
			error: {
				type: 'INTERNAL_ERROR',
				message: isDev ? sanitizedMessage : 'An unexpected error occurred',
				requestId,
				timestamp: new Date().toISOString(),
			},
		},
		500
	);
});
app.notFound((c) => {
	return c.json(
		{
			error: '404 Not Found',
			message: `${c.req.method} ${c.req.path} does not exist`,
			availableEndpoints: [
				'POST /graphql - GraphQL API',
				'GET /docs - API documentation',
				'GET /health - Health check',
			],
			requestId: c.get('requestId'),
		},
		404
	);
});

console.log('✅ Native Hono app configured with pure GraphQL');

if (process.env.NODE_ENV !== 'production') {
	console.log('📋 Available routes:');
	console.log(showRoutes(app));
}

export default app;
