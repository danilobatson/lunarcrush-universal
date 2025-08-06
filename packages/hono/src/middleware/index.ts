// ===================================================================
// 🛡️ Middleware Configuration
// ===================================================================

import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { requestId } from 'hono/request-id';
import { secureHeaders } from 'hono/secure-headers';
import { prettyJSON } from 'hono/pretty-json';
import { timeout } from 'hono/timeout';
import { timing } from 'hono/timing';
import { bodyLimit } from 'hono/body-limit';
import { contextStorage } from 'hono/context-storage';
import { etag } from 'hono/etag';
import { HTTPException } from 'hono/http-exception';

/**
 * Simple error handler - let Hono and LunarCrush API handle most error logic
 */
const simpleErrorHandler = (error: Error, c: any) => {
	console.error('Error:', error.message);
	return c.json({ error: error.message }, 500);
};

/**
 * CORS configuration for API access with Apollo Studio support
 */
export const corsMiddleware = cors({
	origin: [
		'*', // Allow all origins for API access
		'https://studio.apollographql.com', // Explicit Apollo Studio support
		'https://sandbox.apollo.dev', // Apollo Sandbox
	],
	allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowHeaders: [
		'Content-Type',
		'Authorization',
		'X-Requested-With',
		'X-API-Key',
		'Accept',
		'Origin',
		'User-Agent',
		'Apollo-Require-Preflight', // Apollo Studio specific
	],
	exposeHeaders: ['X-Request-ID', 'X-Response-Time'],
	credentials: true, // Allow credentials for Apollo Studio
	maxAge: 86400,
});

/**
 * Enhanced security headers middleware with comprehensive protection
 * Optimized for API usage with GraphQL and docs
 */
export const securityMiddleware = secureHeaders({
	contentSecurityPolicy: {
		defaultSrc: ["'self'"],
		styleSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
		scriptSrc: [
			"'self'",
			"'unsafe-inline'",
			"'unsafe-eval'",
			'https://cdn.jsdelivr.net',
		],
		imgSrc: ["'self'", 'data:', 'https:', 'https://cdn.jsdelivr.net'],
		connectSrc: ["'self'", 'https://api.lunarcrush.com', 'wss:', 'ws:'],
		fontSrc: ["'self'", 'https:', 'data:', 'https://cdn.jsdelivr.net'],
		objectSrc: ["'none'"],
		mediaSrc: ["'self'"],
		frameSrc: ["'self'"],
		workerSrc: ["'self'", 'blob:'],
		manifestSrc: ["'self'"],
	},
	crossOriginEmbedderPolicy: false,
	crossOriginResourcePolicy: 'cross-origin',
	referrerPolicy: 'strict-origin-when-cross-origin',
	strictTransportSecurity: 'max-age=31536000; includeSubDomains',
	xContentTypeOptions: 'nosniff',
	xFrameOptions: 'SAMEORIGIN',
	xPermittedCrossDomainPolicies: 'none',
});

/**
 * Request timeout middleware (30 seconds)
 */
export const timeoutMiddleware = timeout(30000);

/**
 * Response compression middleware
 */
/**
 * Simple error handler using Hono's built-in HTTPException
 */
export const errorHandler = (error: Error, c: any) => {
	console.error('Error:', error);

	if (error instanceof HTTPException) {
		return error.getResponse();
	}

	return c.json(
		{
			error: 'Internal Server Error',
			timestamp: new Date().toISOString(),
		},
		500
	);
};

/**
 * Minimal analytics middleware - only for Cloudflare Analytics
 */
export const analyticsMiddleware = async (
	c: any,
	next: () => Promise<void>
) => {
	await next();

	// Simple write to Cloudflare Analytics if available
	try {
		c.env?.ANALYTICS?.writeDataPoint?.({
			blobs: [c.req.method, c.res.status.toString()],
			indexes: [c.req.method],
		});
	} catch {
		// Silent fail - don't break app for analytics
	}
};

/**
 * Sets up all middleware for the Hono app
 * Optimized for Cloudflare Workers
 */
export function setupMiddleware(app: any) {
	// Context storage (enables global context access)
	app.use('*', contextStorage());

	// Performance timing (built-in Hono middleware)
	app.use('*', timing());

	// Request identification and logging
	app.use('*', requestId());
	app.use('*', logger());

	// Security and limits
	app.use('*', corsMiddleware);
	app.use('*', securityMiddleware);
	app.use('*', timeoutMiddleware);
	app.use('*', bodyLimit({ maxSize: 1024 * 1024 })); // 1MB limit

	// Response optimization
	app.use('*', etag());
	app.use('*', prettyJSON());

	// Minimal analytics
	app.use('*', analyticsMiddleware);

	// Error handling (should be last)
	app.onError(errorHandler);
}
