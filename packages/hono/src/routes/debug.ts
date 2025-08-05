// ===================================================================
// 🐛 Debug and Development Routes
// ===================================================================

import { Hono } from 'hono';
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
 * Sets up debug and development routes
 */
export function setupDebugRoutes(app: HonoApp) {
	// Debug info endpoint
	app.get('/debug/info', async (c) => {
		const requestId = c.get('requestId') || 'unknown';

		return c.json({
			requestId,
			timestamp: new Date().toISOString(),
			method: c.req.method,
			url: c.req.url,
			path: c.req.path,
			headers: Object.fromEntries(c.req.raw.headers.entries()),
			query: Object.fromEntries(c.req.queries()),
			userAgent: c.req.header('User-Agent'),
			ip:
				c.req.header('CF-Connecting-IP') ||
				c.req.header('X-Forwarded-For') ||
				'unknown',
			country: c.req.header('CF-IPCountry') || 'unknown',
			runtime: {
				cf: typeof cf !== 'undefined' ? 'available' : 'not available',
				worker: typeof WorkerGlobalScope !== 'undefined',
			},
		});
	});

	// Environment variables debug (sanitized)
	app.get('/debug/env', async (c) => {
		const env = c.env;

		// Only show non-sensitive environment info
		const sanitizedEnv = {
			hasLunarCrushKey: !!env.LUNARCRUSH_API_KEY,
			hasKVStore: !!env.KV_STORE,
			hasAnalytics: !!env.ANALYTICS,
			environment: env.ENVIRONMENT || 'unknown',
			region: env.CF_REGION || 'unknown',
		};

		return c.json({
			environment: sanitizedEnv,
			timestamp: new Date().toISOString(),
		});
	});

	// KV Store debug
	app.get('/debug/kv', authMiddleware, async (c) => {
		try {
			const kv = c.env.KV_STORE;
			if (!kv) {
				return createErrorResponse(
					c,
					'kv_not_available',
					'KV store not configured',
					500
				);
			}

			// Test KV operations
			const testKey = `debug:test:${Date.now()}`;
			const testValue = { test: true, timestamp: new Date().toISOString() };

			// Write test
			await kv.put(testKey, JSON.stringify(testValue), { expirationTtl: 60 });

			// Read test
			const retrieved = await kv.get(testKey);
			const parsed = retrieved ? JSON.parse(retrieved) : null;

			// Clean up
			await kv.delete(testKey);

			return c.json({
				kvTest: {
					writeSuccess: true,
					readSuccess: !!retrieved,
					dataIntegrity: JSON.stringify(testValue) === JSON.stringify(parsed),
				},
				timestamp: new Date().toISOString(),
			});
		} catch (error) {
			console.error('KV debug error:', error);
			return createErrorResponse(
				c,
				'kv_debug_error',
				'KV store test failed',
				500
			);
		}
	});

	// Cache statistics
	app.get('/debug/cache', authMiddleware, async (c) => {
		try {
			const kv = c.env.KV_STORE;
			if (!kv) {
				return createErrorResponse(
					c,
					'kv_not_available',
					'KV store not configured',
					500
				);
			}

			// This is a simplified cache stats - in a real implementation,
			// you might want to track cache hits/misses in a separate KV key
			const cacheInfo = {
				status: 'available',
				implementation: 'cloudflare-kv',
				timestamp: new Date().toISOString(),
				note: 'Detailed cache statistics would require additional tracking',
			};

			return c.json(cacheInfo);
		} catch (error) {
			console.error('Cache debug error:', error);
			return createErrorResponse(
				c,
				'cache_debug_error',
				'Cache debug failed',
				500
			);
		}
	});

	// API connectivity test
	app.get('/debug/api-test', authMiddleware, async (c) => {
		try {
			const { LUNARCRUSH_API_KEY } = c.env;

			if (!LUNARCRUSH_API_KEY) {
				return createErrorResponse(
					c,
					'api_key_missing',
					'LunarCrush API key not configured',
					500
				);
			}

			// Test API connectivity with a simple request
			const testUrl = 'https://lunarcrush.com/api4/coins?limit=1';

			const startTime = Date.now();
			const response = await fetch(testUrl, {
				headers: {
					Authorization: `Bearer ${LUNARCRUSH_API_KEY}`,
					'Content-Type': 'application/json',
					'User-Agent': 'LunarCrush-Universal-Hono/1.0',
				},
			});
			const endTime = Date.now();

			const responseTime = endTime - startTime;
			const isSuccessful = response.ok;

			let responseData = null;
			try {
				responseData = await response.json();
			} catch (parseError) {
				responseData = { error: 'Failed to parse response JSON' };
			}

			return c.json({
				apiTest: {
					url: testUrl,
					status: response.status,
					statusText: response.statusText,
					responseTime: `${responseTime}ms`,
					success: isSuccessful,
					hasData: !!(responseData && responseData.data),
				},
				timestamp: new Date().toISOString(),
			});
		} catch (error) {
			console.error('API test error:', error);
			return createErrorResponse(
				c,
				'api_test_error',
				'API connectivity test failed',
				500
			);
		}
	});

	// Request tracing endpoint
	app.all('/debug/trace/*', async (c) => {
		const path = c.req.path.replace('/debug/trace', '');
		const method = c.req.method;
		const headers = Object.fromEntries(c.req.raw.headers.entries());
		const query = Object.fromEntries(c.req.queries());

		let body = null;
		try {
			if (['POST', 'PUT', 'PATCH'].includes(method)) {
				body = await c.req.json();
			}
		} catch {
			// Ignore body parsing errors for trace endpoint
		}

		return c.json({
			trace: {
				originalPath: path,
				method,
				headers,
				query,
				body,
				timestamp: new Date().toISOString(),
				requestId: c.get('requestId'),
			},
		});
	});

	// Performance monitoring endpoint
	app.get('/debug/performance', async (c) => {
		const startTime = c.get('startTime') || Date.now();
		const currentTime = Date.now();
		const responseTime = currentTime - startTime;

		// Basic performance metrics
		const metrics = {
			responseTime: `${responseTime}ms`,
			timestamp: new Date().toISOString(),
			memoryUsage:
				typeof process !== 'undefined'
					? process.memoryUsage()
					: 'not available',
			uptime:
				typeof process !== 'undefined' ? process.uptime() : 'not available',
		};

		return c.json(metrics);
	});
}
