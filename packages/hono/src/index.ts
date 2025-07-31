// ===================================================================
// 🚀 LUNARCRUSH UNIVERSAL - NATIVE HONO + PURE GRAPHQL
// ===================================================================
// Using native Hono features with pure GraphQL (no Yoga dependency)
// Based on Hono best practices and working resolver patterns
// ===================================================================

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { requestId } from 'hono/request-id'
import { secureHeaders } from 'hono/secure-headers'
import { prettyJSON } from 'hono/pretty-json'
import { HTTPException } from 'hono/http-exception'
import { graphql, buildSchema } from 'graphql'

import { typeDefs } from './schema'
import {
	performHealthCheck,
	healthResponses,
	HealthCheckConfig,
} from './utils/health'
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
} from './services/lunarcrush'

import {
	getNftTimeSeriesV1Fixed,
	getSearchFixed,
	searchPostsFixed,
	getPostDetailsFixed,
	getPostTimeSeriesFixed,
} from './services/lunarcrush-fixes'

// Enhanced Bindings for Hono
type Bindings = {
	LUNARCRUSH_API_KEY: { get(): Promise<string> };
	DB?: any;
	ENVIRONMENT?: string;
	CUSTOM_CORS?: string;
	LUNARCRUSH_CACHE: KVNamespace;
}

// Enhanced Variables for request context
type Variables = {
	requestId: string;
	startTime: number;
	userAgent?: string;
	clientIP?: string;
	user?: any;
}

console.log('🚀 Creating native Hono app with pure GraphQL...')

// Create Hono app with enhanced typing
const app = new Hono<{
	Bindings: Bindings;
	Variables: Variables;
}>()

// ===== NATIVE HONO MIDDLEWARE STACK =====

// Essential middleware (Hono native)
app.use(logger())
app.use(requestId())
app.use(secureHeaders())
app.use(prettyJSON())

// Enhanced CORS (Hono native)
app.use('/*', cors({
	origin: (origin) => {
		console.log('🌐 CORS origin check:', origin);
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
}))

// Request context middleware (Hono pattern)
app.use('*', async (c, next) => {
	c.set('startTime', Date.now())
	c.set('userAgent', c.req.header('User-Agent') || 'unknown')
	c.set('clientIP', c.req.header('CF-Connecting-IP') || 'unknown')
	await next()
})

// ===== HEALTH ENDPOINTS (HONO NATIVE) =====

app.get('/health', async (c) => {
	try {
		const apiKey = await c.env.LUNARCRUSH_API_KEY.get();

		if (!apiKey) {
			return c.json({
				status: 'degraded',
				timestamp: new Date().toISOString(),
				error: 'API key not configured',
				requestId: c.get('requestId'),
				responseTime: Date.now() - c.get('startTime')
			}, 200);
		}

		const healthConfig: HealthCheckConfig = {
			apiKey,
			database: c.env.DB,
			environment: c.env.ENVIRONMENT || 'production',
		};

		const healthResult = await performHealthCheck(healthConfig);

		// Enhanced health response with Hono context
		return c.json({
			...healthResult,
			requestId: c.get('requestId'),
			responseTime: Date.now() - c.get('startTime'),
			client: {
				ip: c.get('clientIP'),
				userAgent: c.get('userAgent')
			},
			features: [
				'native-hono',
				'pure-graphql',
				'cloudflare-workers',
				'kv-caching',
				'enhanced-middleware'
			]
		}, 200);
	} catch (error) {
		return c.json({
			status: 'error',
			timestamp: new Date().toISOString(),
			error: error instanceof Error ? error.message : 'Health check error',
			requestId: c.get('requestId'),
			responseTime: Date.now() - c.get('startTime')
		}, 200);
	}
});

app.get('/healthz', (c) => c.json(healthResponses.liveness()));
app.get('/ready', async (c) => {
	try {
		const testApiKey = await c.env.LUNARCRUSH_API_KEY.get();
		const isReady = Boolean(testApiKey);
		return c.json(healthResponses.readiness(isReady), isReady ? 200 : 503);
	} catch {
		return c.json(healthResponses.readiness(false), 503);
	}
});
app.get('/ping', (c) => c.text(healthResponses.basic()));

// ===== SAME CACHING FUNCTION (PRESERVED FROM WORKING VERSION) =====
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

		const fullCacheKey = `demo:${cacheKey}`;
		const cached = await kv.get(fullCacheKey);

		if (cached) {
			console.log(`📖 Demo cache HIT: ${fullCacheKey}`);
			return JSON.parse(cached);
		}

		console.log(`📖 Demo cache MISS: ${fullCacheKey}`);
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
	// Health resolvers (preserved exactly)
	health: async () => {
		try {
			const apiKey = await env.LUNARCRUSH_API_KEY.get();
			const healthConfig: HealthCheckConfig = {
				apiKey,
				database: env.DB,
				environment: env.ENVIRONMENT || 'production',
			};
			const healthResult = await performHealthCheck(healthConfig);
			return JSON.stringify(healthResult);
		} catch (error) {
			return JSON.stringify({
				status: 'error',
				message: error.message,
			});
		}
	},

	healthSimple: () => 'LunarCrush API Active - Enhanced & Fixed',

	// All working resolvers (preserved with native Hono context)
	getTopicsList: async (args, context) => {
		const apiKey = await env.LUNARCRUSH_API_KEY.get();
		const config: LunarCrushConfig = { apiKey, baseUrl: 'https://lunarcrush.com/api4/public' };
		return getCachedOrFetch(
			env.LUNARCRUSH_CACHE,
			'topics:list',
			() => getTopicsList(config),
			context?.request
		);
	},

	getTopic: async (args, context) => {
		const apiKey = await env.LUNARCRUSH_API_KEY.get();
		const config: LunarCrushConfig = { apiKey, baseUrl: 'https://lunarcrush.com/api4/public' };
		return getCachedOrFetch(
			env.LUNARCRUSH_CACHE,
			`topic:${args.topic}`,
			() => getTopic(config, args.topic),
			context?.request
		);
	},

	getTopicWhatsup: async (args, context) => {
		const apiKey = await env.LUNARCRUSH_API_KEY.get();
		const config: LunarCrushConfig = { apiKey, baseUrl: 'https://lunarcrush.com/api4/public' };
		return getCachedOrFetch(
			env.LUNARCRUSH_CACHE,
			`topic:${args.topic}:whatsup`,
			() => getTopicWhatsup(config, args.topic),
			context?.request
		);
	},

	// Adding key resolvers (I'll add more after testing)
	getCoin: async (args, context) => {
		const apiKey = await env.LUNARCRUSH_API_KEY.get();
		const config: LunarCrushConfig = { apiKey, baseUrl: 'https://lunarcrush.com/api4/public' };
		return getCachedOrFetch(
			env.LUNARCRUSH_CACHE,
			`coin:${args.symbol}`,
			() => getCoin(config, args.symbol),
			context?.request
		);
	},

	getCoinsList: async (args, context) => {
		const apiKey = await env.LUNARCRUSH_API_KEY.get();
		const config: LunarCrushConfig = { apiKey, baseUrl: 'https://lunarcrush.com/api4/public' };
		return getCachedOrFetch(
			env.LUNARCRUSH_CACHE,
			'coins:list',
			() => getCoinsList(config),
			context?.request
		);
	},
});

// Build GraphQL schema (pure GraphQL, no Yoga)
const schema = buildSchema(typeDefs);

// ===== NATIVE HONO GRAPHQL ENDPOINT =====
app.post('/graphql', async (c) => {
	try {
		const body = await c.req.json();
		const { query, variables = {}, operationName } = body;

		console.log('🔍 Native Hono GraphQL request:', {
			query: query?.substring(0, 100) + '...',
			variables,
			requestId: c.get('requestId')
		});

		// Enhanced context with Hono features
		const context = {
			env: c.env,
			request: c.req,
			requestId: c.get('requestId'),
			clientIP: c.get('clientIP'),
			userAgent: c.get('userAgent'),
			startTime: c.get('startTime')
		};

		console.log('🏗️ Executing with pure graphql() and native Hono...');

		// Pure GraphQL execution (no Yoga dependency)
		const result = await graphql({
			schema,
			source: query,
			rootValue: createResolvers(c.env),
			contextValue: context,
			variableValues: variables,
			operationName
		});

		// Add Hono performance timing
		const responseTime = Date.now() - c.get('startTime');
		if (result.extensions) {
			result.extensions.timing = { responseTime };
			result.extensions.hono = { native: true, requestId: c.get('requestId') };
		} else {
			result.extensions = {
				timing: { responseTime },
				hono: { native: true, requestId: c.get('requestId') }
			};
		}

		console.log('✅ Native Hono GraphQL query executed successfully');
		return c.json(result);
	} catch (error) {
		console.error('❌ Native Hono GraphQL error:', error);
		if (error instanceof HTTPException) {
			return error.getResponse();
		}
		throw new HTTPException(500, {
			message: 'GraphQL execution failed',
			cause: error
		});
	}
});

// ===== NATIVE HONO GRAPHIQL INTERFACE =====
app.get('/graphql', (c) => {
	return c.html(`
<!DOCTYPE html>
<html>
<head>
	<title>GraphiQL - Native Hono + Pure GraphQL</title>
	<link href="https://unpkg.com/graphiql@3.0.6/graphiql.min.css" rel="stylesheet" />
	<style>
		body { margin: 0; font-family: system-ui; }
		.header { background: #1a1a1a; color: #fff; padding: 10px; display: flex; justify-content: space-between; align-items: center; }
		.badge { background: #4ade80; color: #000; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
	</style>
</head>
<body>
	<div class="header">
		<span>🚀 LunarCrush Universal - Native Hono + Pure GraphQL</span>
		<div>
			<span class="badge">Native Hono</span>
			<span class="badge">Pure GraphQL</span>
			<span class="badge">Working</span>
		</div>
	</div>
	<div id="graphiql" style="height: calc(100vh - 50px);"></div>
	<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
	<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
	<script src="https://unpkg.com/graphiql@3.0.6/graphiql.min.js"></script>
	<script>
		const fetcher = (graphQLParams) => {
			return fetch('/graphql', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(graphQLParams),
			}).then(response => response.json());
		};

		const root = ReactDOM.createRoot(document.getElementById('graphiql'));
		root.render(
			React.createElement(GraphiQL, {
				fetcher: fetcher,
				defaultQuery: \`# 🚀 Native Hono + Pure GraphQL - Working!

{
	healthSimple
	getCoin(symbol: "btc") {
		name
		symbol
		price
		market_cap
		alt_rank
	}
	getCoinsList {
		name
		symbol
		price
	}
}\`
			})
		);
	</script>
</body>
</html>`);
});

// ===== NATIVE HONO ERROR HANDLING =====
app.onError((err, c) => {
	console.error('❌ Native Hono error:', err);
	const requestId = c.get('requestId') || 'unknown';
	const responseTime = Date.now() - (c.get('startTime') || Date.now());

	if (err instanceof HTTPException) {
		return err.getResponse();
	}

	return c.json({
		error: 'Internal Server Error',
		message: 'An unexpected error occurred',
		requestId,
		timestamp: new Date().toISOString(),
		responseTime,
		framework: 'native-hono'
	}, 500);
});

app.notFound((c) => {
	return c.json({
		error: 'Not Found',
		message: 'The requested endpoint does not exist',
		path: c.req.path,
		method: c.req.method,
		suggestions: [
			'Try /graphql for GraphQL endpoint',
			'Try /health for health check',
			'Visit /graphql in browser for GraphiQL'
		],
		requestId: c.get('requestId'),
		timestamp: new Date().toISOString(),
		responseTime: Date.now() - (c.get('startTime') || Date.now())
	}, 404);
});

console.log('✅ Native Hono app configured with pure GraphQL');

export default app;
