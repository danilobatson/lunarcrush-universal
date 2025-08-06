// ===================================================================
// 🐛 Debug and Development Routes
// ===================================================================

import { Hono } from 'hono';
import { extractApiKey, validateKey } from '../lib/auth';
import type { Bindings, Variables } from '../lib/types';

type HonoApp = Hono<{ Bindings: Bindings; Variables: Variables }>;

/**
 * Sets up debug and development routes (consolidated)
 */
export function setupDebugRoutes(app: HonoApp) {
	// Unified debug endpoint with optional sections
	app.get('/debug', async (c) => {
		const includeHeaders = c.req.query('headers') === 'true';
		const includeEnv = c.req.query('env') === 'true';
		const includeKV = c.req.query('kv') === 'true';
		const includeAuth = c.req.query('auth') === 'true';

		const requestId = c.get('requestId') || 'unknown';
		const env = c.env;

		const debug: any = {
			requestId,
			timestamp: new Date().toISOString(),
			method: c.req.method,
			url: c.req.url,
			path: c.req.path,
			userAgent: c.req.header('User-Agent'),
			ip:
				c.req.header('CF-Connecting-IP') ||
				c.req.header('X-Forwarded-For') ||
				'unknown',
			country: c.req.header('CF-IPCountry') || 'unknown',
			runtime: {
				cf: typeof cf !== 'undefined' ? 'available' : 'not available',
				worker: typeof WorkerGlobalScope !== 'undefined',
				cloudflare_workers: true,
			},
			memory: process.memoryUsage?.() || {},
			help: {
				parameters: {
					'?headers=true': 'Include request headers',
					'?env=true': 'Include environment info',
					'?kv=true': 'Include KV store status (requires auth)',
					'?auth=true': 'Include auth status (requires API key)',
				},
				examples: [
					'/debug',
					'/debug?headers=true',
					'/debug?env=true&headers=true',
					'/debug?kv=true (with API key)',
				],
			},
		};

		// Include headers if requested
		if (includeHeaders) {
			// Sanitize sensitive headers
			const headers = Object.fromEntries(c.req.raw.headers.entries());
			if (headers.authorization) {
				headers.authorization = 'Bearer ***';
			}
			if (headers['x-api-key']) {
				headers['x-api-key'] = '***';
			}
			debug.headers = headers;
			debug.query = Object.fromEntries(c.req.queries());
		}

		// Include environment info if requested
		if (includeEnv) {
			debug.environment = {
				hasLunarCrushKey: !!env.LUNARCRUSH_API_KEY,
				hasKVStore: !!env.LUNARCRUSH_CACHE,
				hasDatabase: !!env.DB,
				hasAnalytics: !!env.ANALYTICS,
				environment: env.ENVIRONMENT || 'unknown',
				region: env.CF_REGION || 'unknown',
			};
		}

		// Include KV store debug if requested (requires auth)
		if (includeKV) {
			const apiKey = extractApiKey(c);
			if (!apiKey) {
				debug.kv = { error: 'API key required for KV debugging' };
			} else {
				try {
					const kv = env.LUNARCRUSH_CACHE;
					if (!kv) {
						debug.kv = { error: 'KV store not available' };
					} else {
						// Test KV store
						const testKey = `debug:${Date.now()}`;
						await kv.put(testKey, 'test', { expirationTtl: 60 });
						const testValue = await kv.get(testKey);
						await kv.delete(testKey);

						debug.kv = {
							available: true,
							test_successful: testValue === 'test',
							namespace: 'LUNARCRUSH_CACHE',
						};
					}
				} catch (error) {
					debug.kv = {
						error: error instanceof Error ? error.message : 'Unknown KV error',
					};
				}
			}
		}

		// Include auth status if requested
		if (includeAuth) {
			const apiKey = extractApiKey(c);
			if (!apiKey) {
				debug.auth = { status: 'no_api_key', message: 'No API key provided' };
			} else {
				const validation = validateKey(apiKey);
				debug.auth = {
					status: validation.valid ? 'valid' : 'invalid',
					message: validation.error || 'API key is valid',
					keyHash: validation.keyHash || null,
				};
			}
		}

		return c.json(debug);
	});
}
