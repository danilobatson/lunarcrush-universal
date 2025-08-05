// ===================================================================
// 🤖 MCP (Model Context Protocol) Endpoints
// ===================================================================

import { Hono } from 'hono';
import { getCachedResponse, setCachedResponse } from '../services/caching';
import { createSuccessResponse, createErrorResponse } from '../lib/errors';
import { extractApiKey, validateKey } from '../lib/auth';
import type { Bindings, Variables } from '../lib/types';

type HonoApp = Hono<{ Bindings: Bindings; Variables: Variables }>;

/**
 * Auth middleware for protected routes
 */
const authMiddleware = async (c: any, next: () => Promise<void>) => {
	const apiKey = extractApiKey(c);

	if (!apiKey) {
		return c.json(
			{
				error: 'missing_api_key',
				message:
					'API key is required. Provide it in Authorization header, X-API-Key header, or api_key query parameter.',
				status: 401,
				timestamp: new Date().toISOString(),
			},
			401
		);
	}

	const validation = validateKey(apiKey);
	if (!validation.valid) {
		return c.json(
			{
				error: 'invalid_api_key',
				message: validation.error,
				status: 401,
				timestamp: new Date().toISOString(),
			},
			401
		);
	}

	// Store validated API key for downstream use
	c.set('apiKey', apiKey);
	await next();
};

/**
 * Sets up MCP-specific routes optimized for AI model consumption
 */
export function setupMCPRoutes(app: HonoApp) {
	// MCP Protocol Discovery endpoints
	app.get('/mcp/tools', async (c) => {
		try {
			const tools = [
				{
					name: 'get_trending_topics',
					description: 'Get trending topics from LunarCrush',
					inputSchema: {
						type: 'object',
						properties: {
							limit: {
								type: 'number',
								description: 'Number of topics to return',
							},
						},
					},
				},
				{
					name: 'get_topic_details',
					description: 'Get detailed information about a specific topic',
					inputSchema: {
						type: 'object',
						properties: {
							topic: {
								type: 'string',
								description: 'Topic name to get details for',
							},
						},
						required: ['topic'],
					},
				},
				{
					name: 'get_cryptocurrencies',
					description: 'Get top cryptocurrencies by social activity',
					inputSchema: {
						type: 'object',
						properties: {
							count: {
								type: 'number',
								description: 'Number of cryptocurrencies to return',
							},
						},
					},
				},
				{
					name: 'search',
					description: 'Search across topics, cryptocurrencies, and content',
					inputSchema: {
						type: 'object',
						properties: {
							query: { type: 'string', description: 'Search query' },
						},
						required: ['query'],
					},
				},
			];

			return c.json({
				tools,
				version: '1.0.0',
				capabilities: ['tool_discovery', 'tool_execution'],
			});
		} catch (error) {
			return createErrorResponse(c, 'tool_discovery_failed', error);
		}
	});

	// MCP Tool execution endpoint
	app.post('/mcp/call', async (c) => {
		try {
			const body = await c.req.json();
			const { name, arguments: args } = body;

			if (!name) {
				return createErrorResponse(
					c,
					'missing_tool_name',
					'Tool name is required'
				);
			}

			let result;

			switch (name) {
				case 'get_trending_topics':
					const limit = args?.limit || 10;
					// Simulate trending topics response
					result = {
						topics: Array.from({ length: limit }, (_, i) => ({
							topic: `Topic ${i + 1}`,
							score: Math.random() * 100,
							sentiment: Math.random() * 2 - 1,
						})),
					};
					break;

				case 'get_topic_details':
					if (!args?.topic) {
						return createErrorResponse(
							c,
							'missing_topic',
							'Topic parameter is required'
						);
					}
					result = {
						topic: args.topic,
						title: `Details for ${args.topic}`,
						score: Math.random() * 100,
						sentiment: Math.random() * 2 - 1,
						posts: Math.floor(Math.random() * 1000),
					};
					break;

				case 'get_cryptocurrencies':
					const count = args?.count || 10;
					result = {
						cryptocurrencies: Array.from({ length: count }, (_, i) => ({
							symbol: `COIN${i + 1}`,
							name: `Cryptocurrency ${i + 1}`,
							price: Math.random() * 100000,
							change24h: (Math.random() - 0.5) * 20,
						})),
					};
					break;

				case 'search':
					if (!args?.query) {
						return createErrorResponse(
							c,
							'missing_query',
							'Query parameter is required'
						);
					}
					result = {
						query: args.query,
						results: Array.from({ length: 5 }, (_, i) => ({
							type: i % 2 === 0 ? 'topic' : 'crypto',
							name: `${args.query} Result ${i + 1}`,
							score: Math.random() * 100,
						})),
					};
					break;

				default:
					return createErrorResponse(
						c,
						'unknown_tool',
						`Unknown tool: ${name}`
					);
			}

			return c.json({
				result,
				success: true,
				toolName: name,
			});
		} catch (error) {
			return createErrorResponse(c, 'tool_execution_failed', error);
		}
	});

	// MCP-optimized endpoints for AI models
	app.get('/mcp/topics/all', authMiddleware, async (c) => {
		try {
			const cacheKey = 'mcp:topics:all';
			const cached = await getCachedResponse(c.env.KV_STORE, cacheKey);
			if (cached) {
				return c.json(cached);
			}

			const result = await fetchFromLunarCrush('/topics', { limit: '100' }, c);

			if (result && !result.error) {
				await setCachedResponse(c.env.KV_STORE, cacheKey, result, 300);
			}

			return c.json(result);
		} catch (error) {
			console.error('MCP topics error:', error);
			return createErrorResponse(
				c,
				'mcp_topics_error',
				'Failed to fetch topics',
				500
			);
		}
	});

	app.get('/mcp/cryptocurrencies/top/:count', authMiddleware, async (c) => {
		try {
			const count = c.req.param('count') || '20';
			const cacheKey = `mcp:crypto:top:${count}`;
			const cached = await getCachedResponse(c.env.KV_STORE, cacheKey);
			if (cached) {
				return c.json(cached);
			}

			const result = await fetchFromLunarCrush(
				'/coins',
				{
					limit: count,
					sort: 'market_cap',
				},
				c
			);

			if (result && !result.error) {
				await setCachedResponse(c.env.KV_STORE, cacheKey, result, 300);
			}

			return c.json(result);
		} catch (error) {
			console.error('MCP crypto error:', error);
			return createErrorResponse(
				c,
				'mcp_crypto_error',
				'Failed to fetch cryptocurrencies',
				500
			);
		}
	});

	app.get('/mcp/stocks/top/:count', authMiddleware, async (c) => {
		try {
			const count = c.req.param('count') || '20';
			const cacheKey = `mcp:stocks:top:${count}`;
			const cached = await getCachedResponse(c.env.KV_STORE, cacheKey);
			if (cached) {
				return c.json(cached);
			}

			const result = await fetchFromLunarCrush(
				'/stocks',
				{
					limit: count,
					sort: 'market_cap',
				},
				c
			);

			if (result && !result.error) {
				await setCachedResponse(c.env.KV_STORE, cacheKey, result, 300);
			}

			return c.json(result);
		} catch (error) {
			console.error('MCP stocks error:', error);
			return createErrorResponse(
				c,
				'mcp_stocks_error',
				'Failed to fetch stocks',
				500
			);
		}
	});

	app.get('/mcp/topic/:topic', authMiddleware, async (c) => {
		try {
			const topic = c.req.param('topic');
			const cacheKey = `mcp:topic:${topic}`;
			const cached = await getCachedResponse(c.env.KV_STORE, cacheKey);
			if (cached) {
				return c.json(cached);
			}

			const result = await fetchFromLunarCrush(`/topics/${topic}`, {}, c);

			if (result && !result.error) {
				await setCachedResponse(c.env.KV_STORE, cacheKey, result, 600); // 10 min cache for topic details
			}

			return c.json(result);
		} catch (error) {
			console.error('MCP topic error:', error);
			return createErrorResponse(
				c,
				'mcp_topic_error',
				'Failed to fetch topic details',
				500
			);
		}
	});

	app.get('/mcp/creator/:creator', authMiddleware, async (c) => {
		try {
			const creator = c.req.param('creator');
			const cacheKey = `mcp:creator:${creator}`;
			const cached = await getCachedResponse(c.env.KV_STORE, cacheKey);
			if (cached) {
				return c.json(cached);
			}

			const result = await fetchFromLunarCrush(`/creators/${creator}`, {}, c);

			if (result && !result.error) {
				await setCachedResponse(c.env.KV_STORE, cacheKey, result, 600); // 10 min cache for creator details
			}

			return c.json(result);
		} catch (error) {
			console.error('MCP creator error:', error);
			return createErrorResponse(
				c,
				'mcp_creator_error',
				'Failed to fetch creator details',
				500
			);
		}
	});

	app.get('/mcp/timeseries/:symbol/:timeframe', authMiddleware, async (c) => {
		try {
			const symbol = c.req.param('symbol');
			const timeframe = c.req.param('timeframe');
			const cacheKey = `mcp:timeseries:${symbol}:${timeframe}`;
			const cached = await getCachedResponse(c.env.KV_STORE, cacheKey);
			if (cached) {
				return c.json(cached);
			}

			const result = await fetchFromLunarCrush(
				'/time-series',
				{
					symbol,
					interval: timeframe,
				},
				c
			);

			if (result && !result.error) {
				await setCachedResponse(c.env.KV_STORE, cacheKey, result, 180); // 3 min cache for time series
			}

			return c.json(result);
		} catch (error) {
			console.error('MCP timeseries error:', error);
			return createErrorResponse(
				c,
				'mcp_timeseries_error',
				'Failed to fetch time series data',
				500
			);
		}
	});

	app.get('/mcp/posts/:symbol/:timeframe', authMiddleware, async (c) => {
		try {
			const symbol = c.req.param('symbol');
			const timeframe = c.req.param('timeframe');
			const cacheKey = `mcp:posts:${symbol}:${timeframe}`;
			const cached = await getCachedResponse(c.env.KV_STORE, cacheKey);
			if (cached) {
				return c.json(cached);
			}

			const result = await fetchFromLunarCrush(
				'/posts',
				{
					symbol,
					interval: timeframe,
					limit: '50',
				},
				c
			);

			if (result && !result.error) {
				await setCachedResponse(c.env.KV_STORE, cacheKey, result, 300); // 5 min cache for posts
			}

			return c.json(result);
		} catch (error) {
			console.error('MCP posts error:', error);
			return createErrorResponse(
				c,
				'mcp_posts_error',
				'Failed to fetch posts',
				500
			);
		}
	});

	app.get('/mcp/search/:query', authMiddleware, async (c) => {
		try {
			const query = c.req.param('query');
			const type = c.req.query('type') || 'all';
			const cacheKey = `mcp:search:${query}:${type}`;
			const cached = await getCachedResponse(c.env.KV_STORE, cacheKey);
			if (cached) {
				return c.json(cached);
			}

			const result = await fetchFromLunarCrush(
				'/search',
				{
					q: query,
					type,
					limit: '25',
				},
				c
			);

			if (result && !result.error) {
				await setCachedResponse(c.env.KV_STORE, cacheKey, result, 600); // 10 min cache for search
			}

			return c.json(result);
		} catch (error) {
			console.error('MCP search error:', error);
			return createErrorResponse(
				c,
				'mcp_search_error',
				'Failed to perform search',
				500
			);
		}
	});

	app.get('/mcp/fetch/:symbol', authMiddleware, async (c) => {
		try {
			const symbol = c.req.param('symbol');
			const cacheKey = `mcp:fetch:${symbol}`;
			const cached = await getCachedResponse(c.env.KV_STORE, cacheKey);
			if (cached) {
				return c.json(cached);
			}

			// Try coins first, then stocks if not found
			let result = await fetchFromLunarCrush('/coins', { symbol }, c);

			if (result.error || !result.data) {
				result = await fetchFromLunarCrush('/stocks', { symbol }, c);
			}

			if (result && !result.error) {
				await setCachedResponse(c.env.KV_STORE, cacheKey, result, 300);
			}

			return c.json(result);
		} catch (error) {
			console.error('MCP fetch error:', error);
			return createErrorResponse(
				c,
				'mcp_fetch_error',
				'Failed to fetch symbol data',
				500
			);
		}
	});

	// Batch endpoint for multiple requests
	app.post('/mcp/batch', authMiddleware, async (c) => {
		try {
			const body = await c.req.json();
			const { requests } = body;

			if (!Array.isArray(requests)) {
				return createErrorResponse(
					c,
					'invalid_batch',
					'Requests must be an array',
					400
				);
			}

			if (requests.length > 10) {
				return createErrorResponse(
					c,
					'batch_limit_exceeded',
					'Maximum 10 requests per batch',
					400
				);
			}

			const results = await Promise.all(
				requests.map(async (req: any) => {
					try {
						const { endpoint, params = {} } = req;
						const cacheKey = `mcp:batch:${endpoint}:${JSON.stringify(params)}`;

						// Try cache first
						const cached = await getCachedResponse(c.env.KV_STORE, cacheKey);
						if (cached) {
							return { success: true, data: cached };
						}

						const result = await fetchFromLunarCrush(endpoint, params, c);

						if (result && !result.error) {
							await setCachedResponse(c.env.KV_STORE, cacheKey, result, 300);
						}

						return { success: true, data: result };
					} catch (error) {
						return {
							success: false,
							error: error instanceof Error ? error.message : 'Unknown error',
						};
					}
				})
			);

			return c.json({ batch_results: results });
		} catch (error) {
			console.error('MCP batch error:', error);
			return createErrorResponse(
				c,
				'mcp_batch_error',
				'Failed to process batch request',
				500
			);
		}
	});
}

/**
 * Fetch data from LunarCrush API
 */
async function fetchFromLunarCrush(
	endpoint: string,
	params: Record<string, any>,
	c: any
) {
	try {
		const { LUNARCRUSH_API_KEY } = c.env;

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
		return createSuccessResponse(data);
	} catch (error) {
		console.error('LunarCrush API fetch error:', error);
		return createErrorResponse(
			c,
			'api_fetch_error',
			error instanceof Error ? error.message : 'Unknown error',
			500
		);
	}
}
