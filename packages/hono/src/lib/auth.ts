// ===================================================================
// 🔐 Authentication & Security Utilities
// ===================================================================

import { sha256 } from '@noble/hashes/sha256';
import { bytesToHex } from '@noble/hashes/utils';

/**
 * Simple hash function for API key validation
 */
export function simpleHashApiKey(apiKey: string): string {
	const hash = sha256(new TextEncoder().encode(apiKey));
	return bytesToHex(hash).slice(0, 16);
}

/**
 * Validates API key format and basic requirements
 */
export const validateKey = (apiKey: string) => {
	if (!apiKey || typeof apiKey !== 'string') {
		return { valid: false, error: 'API key is required' };
	}

	if (apiKey.length < 10) {
		return { valid: false, error: 'API key too short' };
	}

	return { valid: true };
};

/**
 * Extracts API key from various sources (header, query, body)
 */
export const extractApiKey = (c: any): string | null => {
	// Try Authorization header first
	const authHeader = c.req.header('authorization');
	if (authHeader?.startsWith('Bearer ')) {
		return authHeader.slice(7);
	}

	// Try X-API-Key header
	const apiKeyHeader = c.req.header('x-api-key');
	if (apiKeyHeader) {
		return apiKeyHeader;
	}

	// Try query parameter
	const queryApiKey = c.req.query('api_key');
	if (queryApiKey) {
		return queryApiKey;
	}

	return null;
};
