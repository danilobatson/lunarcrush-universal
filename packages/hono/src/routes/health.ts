// ===================================================================
// 🏥 Health & Monitoring Routes
// ===================================================================

import { Hono } from 'hono';
import type { Bindings, Variables } from '../lib/types';
import { performHealthCheck } from '../utils/health';

type HonoApp = Hono<{ Bindings: Bindings; Variables: Variables }>;

export const setupHealthRoutes = (app: HonoApp) => {
	// Start time for real uptime calculation
	const startTime = Date.now();

	// ===================================================================
	// UNIFIED HEALTH ENDPOINT
	// ===================================================================

	// Comprehensive health endpoint - returns all status information in one response
	app.get('/health', async (c) => {
		try {
			const uptime = Math.floor((Date.now() - startTime) / 1000);
			const memory = process.memoryUsage?.() || {};

			// Always return comprehensive health information
			const healthResponse = {
				status: 'healthy',
				timestamp: new Date().toISOString(),
				uptime: uptime,
				uptimeFormatted: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${uptime % 60}s`,
				version: '1.0.0',
				environment: c.env.ENVIRONMENT || 'production',
				memory: {
					rss: `${Math.round(memory.rss / 1024 / 1024)}MB`,
					heapTotal: `${Math.round(memory.heapTotal / 1024 / 1024)}MB`,
					heapUsed: `${Math.round(memory.heapUsed / 1024 / 1024)}MB`,
					external: `${Math.round(memory.external / 1024 / 1024)}MB`,
				},
				system: {
					platform: process.platform || 'unknown',
					arch: process.arch || 'unknown',
					node_version: process.version || 'unknown',
				},
				services: {
					lunarcrush_api: !!c.env.LUNARCRUSH_API_KEY,
					kv_cache: !!c.env.LUNARCRUSH_CACHE,
					database: !!c.env.DB,
					analytics: !!c.env.ANALYTICS,
				},
				performance: {
					cache_enabled: true,
					cache_ttl: '300s default',
					deployment: 'Cloudflare Workers Edge Network',
					response_time_note:
						'Real-time metrics - varies by endpoint and cache status',
				},
				endpoints: {
					graphql: `${new URL(c.req.url).origin}/graphql`,
					docs: `${new URL(c.req.url).origin}/docs`,
					charts: `${new URL(c.req.url).origin}/charts/`,
					debug: `${new URL(c.req.url).origin}/debug`,
				},
			};

			return c.json(healthResponse);
		} catch (error) {
			return c.json(
				{
					status: 'error',
					timestamp: new Date().toISOString(),
					error: error instanceof Error ? error.message : 'Unknown error',
					uptime: Math.floor((Date.now() - startTime) / 1000),
				},
				500
			);
		}
	});

	// ===================================================================
	// ALIASES FOR COMPATIBILITY
	// ===================================================================

	// Legacy endpoint redirects - all point to comprehensive health endpoint
	app.get('/ping', (c) => c.redirect('/health'));
	app.get('/metrics', (c) => c.redirect('/health'));
	app.get('/ready', (c) => c.redirect('/health'));
	app.get('/alive', (c) => c.redirect('/health'));
};
