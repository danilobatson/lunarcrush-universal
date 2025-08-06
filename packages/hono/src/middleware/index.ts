// ===================================================================
// 🛡️ Middleware Configuration
// ===================================================================
// Note: Rate limiting is handled by LunarCrush API upstream

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
import { sentry } from '@hono/sentry';

// Import validation utilities
export * from './validation';

/**
 * Sentry error tracking middleware - properly configured for Cloudflare Workers
 * Note: Configuration happens in setupMiddleware to access c.env
 */
/**
 * Enhanced error handler using Hono's built-in HTTPException
 * Simplified to rely more on Hono's built-in error handling
 */
export const errorHandler = (error: Error, c: any) => {
	// HTTPException is already properly formatted by Hono
	if (error instanceof HTTPException) {
		return error.getResponse();
	}

	// For all other errors, use a simple, secure approach
	console.error('Unexpected error:', error.message);

	return c.json(
		{
			error: 'Internal Server Error',
			message: 'Something went wrong',
			timestamp: new Date().toISOString(),
		},
		500
	);
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
 * Using Hono's built-in secure headers with sensible defaults
 */
export const securityMiddleware = secureHeaders({
	contentSecurityPolicy: {
		defaultSrc: ["'self'"],
		styleSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
		scriptSrc: [
			"'self'",
			"'unsafe-inline'",
			"'unsafe-eval'", // Required for GraphQL playground
			'https://cdn.jsdelivr.net',
		],
		imgSrc: ["'self'", 'data:', 'https:'],
		connectSrc: ["'self'", 'https://api.lunarcrush.com'],
		fontSrc: ["'self'", 'https:', 'data:'],
		objectSrc: ["'none'"],
		frameAncestors: ["'none'"], // Prevent clickjacking
	},
	crossOriginResourcePolicy: 'cross-origin',
	referrerPolicy: 'strict-origin-when-cross-origin',
	strictTransportSecurity: 'max-age=31536000; includeSubDomains',
	xContentTypeOptions: 'nosniff',
	xFrameOptions: 'DENY', // Stricter than SAMEORIGIN for API
});

/**
 * Request timeout middleware (30 seconds)
 */
export const timeoutMiddleware = timeout(30000);

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

	// Error tracking (configured properly with c.env)
	app.use('*', async (c, next) => {
		// Only add Sentry if DSN is configured
		if (c.env?.SENTRY_DSN) {
			const sentryMiddleware = sentry({
				dsn: c.env.SENTRY_DSN,
				environment: c.env.ENVIRONMENT || 'production',
				tracesSampleRate: 0.1, // Capture 10% of transactions for performance monitoring
			});
			return sentryMiddleware(c, next);
		}
		await next();
	});

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

	// Response optimization (LunarCrush API handles rate limiting)
	app.use('*', etag());
	app.use('*', prettyJSON());

	// Minimal analytics
	app.use('*', analyticsMiddleware);

	// Error handling (should be last)
	app.onError(errorHandler);
}
