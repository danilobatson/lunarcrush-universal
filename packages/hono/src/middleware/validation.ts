// ===================================================================
// 🔍 Request Validation Middleware - Using Hono Built-ins
// ===================================================================

import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { HTTPException } from 'hono/http-exception';

/**
 * Common GraphQL query validation schema
 */
export const graphqlQuerySchema = z.object({
	query: z.string().min(1, 'GraphQL query is required'),
	variables: z.record(z.any()).optional(),
	operationName: z.string().optional(),
});

/**
 * API Key validation schema
 */
export const apiKeySchema = z.object({
	'x-api-key': z
		.string()
		.min(10, 'API key must be at least 10 characters')
		.regex(/^[a-zA-Z0-9]+$/, 'API key contains invalid characters'),
});

/**
 * GraphQL request validator using Hono's built-in zValidator
 */
export const validateGraphQLRequest = zValidator(
	'json',
	graphqlQuerySchema,
	(result, c) => {
		if (!result.success) {
			throw new HTTPException(400, {
				message: `Invalid GraphQL request: ${result.error.errors
					.map((e) => e.message)
					.join(', ')}`,
			});
		}
	}
);

/**
 * API key header validator using Hono's built-in zValidator
 */
export const validateApiKeyHeader = zValidator(
	'header',
	apiKeySchema,
	(result, c) => {
		if (!result.success) {
			// Don't throw immediately - let auth middleware handle missing API keys
			// This just validates format when present
			return;
		}
	}
);

/**
 * Request body size validation middleware
 */
export const validateRequestSize = async (
	c: any,
	next: () => Promise<void>
) => {
	const contentLength = c.req.header('content-length');

	if (contentLength && parseInt(contentLength) > 1024 * 1024) {
		// 1MB
		throw new HTTPException(413, {
			message: 'Request body too large. Maximum size is 1MB.',
		});
	}

	await next();
};

/**
 * JSON content type validation for POST requests
 */
export const validateContentType = async (
	c: any,
	next: () => Promise<void>
) => {
	if (c.req.method === 'POST') {
		const contentType = c.req.header('content-type');

		if (!contentType || !contentType.includes('application/json')) {
			throw new HTTPException(415, {
				message: 'Content-Type must be application/json for POST requests',
			});
		}
	}

	await next();
};
