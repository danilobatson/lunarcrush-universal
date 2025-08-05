// ===================================================================
// 🛡️ Middleware Configuration
// ===================================================================

import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { requestId } from 'hono/request-id';
import { secureHeaders } from 'hono/secure-headers';
import { prettyJSON } from 'hono/pretty-json';
import { timeout } from 'hono/timeout';
import { bodyLimit } from 'hono/body-limit';
import { createErrorHandler } from '../lib/errors';
import type { Bindings, Variables } from '../lib/types';

/**
 * CORS configuration for API access
 */
export const corsMiddleware = cors({
	origin: ['*'],
	allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowHeaders: [
		'Content-Type',
		'Authorization',
		'X-Requested-With',
		'X-API-Key',
		'Accept',
		'Origin',
		'User-Agent',
	],
	exposeHeaders: ['X-Request-ID', 'X-Response-Time'],
	credentials: false,
	maxAge: 86400,
});

/**
 * Security headers middleware
 */
export const securityMiddleware = secureHeaders({
	contentSecurityPolicy: {
		defaultSrc: ["'self'"],
		styleSrc: ["'self'", "'unsafe-inline'"],
		scriptSrc: ["'self'", "'unsafe-inline'"],
		imgSrc: ["'self'", 'data:', 'https:'],
		connectSrc: ["'self'", 'https://api.lunarcrush.com'],
	},
	crossOriginEmbedderPolicy: false,
});

/**
 * Request timeout middleware (30 seconds)
 */
export const timeoutMiddleware = timeout(30000);

/**
 * Body size limit (1MB)
 */
export const bodyLimitMiddleware = bodyLimit({
	maxSize: 1024 * 1024, // 1MB
});

/**
 * Analytics and timing middleware
 */
export const analyticsMiddleware = async (
	c: any,
	next: () => Promise<void>
) => {
	const startTime = Date.now();
	c.set('startTime', startTime);

	await next();

	const endTime = Date.now();
	const responseTime = endTime - startTime;

	// Set response time header
	c.header('X-Response-Time', `${responseTime}ms`);

	// Log analytics data
	const analytics = c.env?.ANALYTICS;
	if (analytics && typeof analytics.writeDataPoint === 'function') {
		try {
			analytics.writeDataPoint({
				blobs: [
					c.req.method,
					c.req.url,
					c.res.status.toString(),
					c.get('requestId') || 'unknown',
				],
				doubles: [responseTime],
				indexes: [c.req.method],
			});
		} catch (error) {
			console.warn('Analytics write failed:', error);
		}
	}
};

/**
 * Sets up all middleware for the Hono app
 */
export function setupMiddleware(app: any) {
	// Basic middleware stack
	app.use('*', requestId());
	app.use('*', logger());
	app.use('*', corsMiddleware);
	app.use('*', securityMiddleware);
	app.use('*', timeoutMiddleware);
	app.use('*', bodyLimitMiddleware);
	app.use('*', prettyJSON());
	app.use('*', analyticsMiddleware);

	// Error handling (should be last)
	app.onError(createErrorHandler());
}
