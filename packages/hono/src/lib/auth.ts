// ===================================================================
// 🔐 Enhanced Authentication with Hono Built-ins
// ===================================================================

import { bearerAuth } from 'hono/bearer-auth';
import { HTTPException } from 'hono/http-exception';

/**
 * Extract API key from various header formats
 */
export const extractApiKey = (c: any): string | null => {
	// Try Authorization header first (Bearer token)
	const authHeader = c.req.header('authorization');
	if (authHeader?.startsWith('Bearer ')) {
		return authHeader.slice(7).trim();
	}

	// Try direct Authorization header
	if (authHeader && !authHeader.startsWith('Bearer ')) {
		return authHeader.trim();
	}

	// Try X-API-Key header
	const apiKeyHeader = c.req.header('x-api-key');
	if (apiKeyHeader) {
		return apiKeyHeader.trim();
	}

	return null;
};

/**
 * Validate API key format and basic structure
 */
export const validateKey = (apiKey: string) => {
	if (!apiKey || typeof apiKey !== 'string') {
		return { valid: false, error: 'API key is required' };
	}

	const trimmed = apiKey.trim();

	// Basic length validation
	if (trimmed.length < 10) {
		return { valid: false, error: 'API key appears to be too short' };
	}

	// Basic format validation (alphanumeric)
	if (!/^[a-zA-Z0-9]+$/.test(trimmed)) {
		return { valid: false, error: 'API key contains invalid characters' };
	}

	return {
		valid: true,
		keyHash: Buffer.from(trimmed.slice(0, 8)).toString('base64'),
	};
};

/**
 * Enhanced authentication middleware using Hono's bearerAuth with fallbacks
 */
export const apiKeyAuth = async (c: any, next: () => Promise<void>) => {
	const apiKey = extractApiKey(c);

	if (!apiKey) {
		throw new HTTPException(401, {
			message:
				'API key required. Use Authorization: Bearer <key>, Authorization: <key>, or X-API-Key: <key>',
		});
	}

	const validation = validateKey(apiKey);
	if (!validation.valid) {
		throw new HTTPException(401, {
			message: validation.error || 'Invalid API key format',
		});
	}

	// Store validated API key for LunarCrush requests
	c.set('apiKey', apiKey);
	c.set('baseUrl', 'https://lunarcrush.com/api4/public');
	c.set('keyHash', validation.keyHash);

	await next();
};

/**
 * Simplified bearer auth middleware for specific endpoints
 * Uses Hono's built-in bearerAuth for strict Bearer token validation
 */
export const strictBearerAuth = bearerAuth({
	token: async (token, c) => {
		const validation = validateKey(token);
		if (!validation.valid) {
			return false;
		}

		// Store for downstream middleware
		c.set('apiKey', token);
		c.set('baseUrl', 'https://lunarcrush.com/api4/public');
		c.set('keyHash', validation.keyHash);

		return true;
	},
	invalidTokenMessage: 'Invalid or missing Bearer token',
});
