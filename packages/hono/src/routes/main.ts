// ===================================================================
// 🛣️ Main API Routes
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
	// Skip auth for health check and docs
	const path = c.req.path;
	if (path === '/health' || path === '/docs' || path === '/api-reference') {
		await next();
		return;
	}

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
 * Sets up main API routes
 */
export function setupMainRoutes(app: HonoApp) {
	// Health check (no auth required)
	app.get('/health', (c) => {
		return c.json({
			status: 'ok',
			timestamp: new Date().toISOString(),
			service: 'lunarcrush-universal-hono',
			version: '1.0.0',
			uptime: process.uptime?.() || 'unknown',
		});
	});

	// API documentation redirect
	app.get('/docs', (c) => {
		return c.redirect('/api-reference');
	});

	// Generic proxy endpoint with caching
	app.get('/api/*', authMiddleware, async (c) => {
		try {
			const path = c.req.path.replace('/api', '');
			const params = Object.fromEntries(c.req.queries());

			// Try cache first
			const cacheKey = `api:${path}:${JSON.stringify(params)}`;
			const cached = await getCachedResponse(c.env.KV_STORE, cacheKey);
			if (cached) {
				return c.json(cached);
			}

			// Fetch from LunarCrush
			const result = await fetchFromLunarCrush(path, params, c);

			// Cache successful responses for 5 minutes
			if (result && !result.error) {
				await setCachedResponse(c.env.KV_STORE, cacheKey, result, 300);
			}

			return c.json(result);
		} catch (error) {
			console.error('API route error:', error);
			return createErrorResponse(
				c,
				'api_error',
				'Failed to process API request',
				500
			);
		}
	});

	// Specific cryptocurrency routes
	app.get('/cryptocurrencies', authMiddleware, async (c) => {
		return handleCachedRequest(c, '/coins', {
			limit: c.req.query('limit') || '50',
			sort: c.req.query('sort') || 'market_cap',
		});
	});

	app.get('/cryptocurrencies/:symbol', authMiddleware, async (c) => {
		const symbol = c.req.param('symbol');
		return handleCachedRequest(c, '/coins', { symbol });
	});

	// Stock routes
	app.get('/stocks', authMiddleware, async (c) => {
		return handleCachedRequest(c, '/stocks', {
			limit: c.req.query('limit') || '50',
			sort: c.req.query('sort') || 'market_cap',
		});
	});

	app.get('/stocks/:symbol', authMiddleware, async (c) => {
		const symbol = c.req.param('symbol');
		return handleCachedRequest(c, '/stocks', { symbol });
	});

	// Topic routes
	app.get('/topics', authMiddleware, async (c) => {
		return handleCachedRequest(c, '/topics', {
			limit: c.req.query('limit') || '50',
		});
	});

	app.get('/topics/:topic', authMiddleware, async (c) => {
		const topic = c.req.param('topic');
		return handleCachedRequest(c, `/topics/${topic}`, {});
	});

	// Creator routes
	app.get('/creators', authMiddleware, async (c) => {
		return handleCachedRequest(c, '/creators', {
			limit: c.req.query('limit') || '50',
		});
	});

	app.get('/creators/:creator', authMiddleware, async (c) => {
		const creator = c.req.param('creator');
		return handleCachedRequest(c, `/creators/${creator}`, {});
	});

	// Search route
	app.get('/search', authMiddleware, async (c) => {
		const query = c.req.query('q') || c.req.query('query');
		if (!query) {
			return createErrorResponse(
				c,
				'missing_query',
				'Search query is required',
				400
			);
		}

		return handleCachedRequest(c, '/search', {
			q: query,
			type: c.req.query('type') || 'all',
			limit: c.req.query('limit') || '20',
		});
	});

	// Time series route
	app.get('/time-series/:symbol', authMiddleware, async (c) => {
		const symbol = c.req.param('symbol');
		return handleCachedRequest(c, '/time-series', {
			symbol,
			interval: c.req.query('interval') || '1d',
			start: c.req.query('start'),
			end: c.req.query('end'),
		});
	});

	// Posts/feeds route
	app.get('/posts', authMiddleware, async (c) => {
		return handleCachedRequest(c, '/posts', {
			symbol: c.req.query('symbol'),
			limit: c.req.query('limit') || '20',
			page: c.req.query('page') || '1',
		});
	});
}

/**
 * Helper function to handle cached requests
 */
async function handleCachedRequest(
	c: any,
	endpoint: string,
	params: Record<string, any>
) {
	try {
		// Try cache first
		const cacheKey = `endpoint:${endpoint}:${JSON.stringify(params)}`;
		const cached = await getCachedResponse(c.env.KV_STORE, cacheKey);
		if (cached) {
			return c.json(cached);
		}

		// Fetch from LunarCrush
		const result = await fetchFromLunarCrush(endpoint, params, c);

		// Cache successful responses for 5 minutes
		if (result && !result.error) {
			await setCachedResponse(c.env.KV_STORE, cacheKey, result, 300);
		}

		return c.json(result);
	} catch (error) {
		console.error(`Route error for ${endpoint}:`, error);
		return createErrorResponse(
			c,
			'route_error',
			'Failed to process request',
			500
		);
	}
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
