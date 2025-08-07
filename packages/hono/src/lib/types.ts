import { z } from 'zod';

/**
 * A branded string type representing a Unix timestamp.
 * Unix timestamps are numeric values representing seconds since epoch (1970-01-01),
 * but the API accepts them as strings.
 *
 * @example "1640995200" // January 1, 2022 00:00:00 UTC
 */
export type UnixTimestamp = string;

// Cloudflare Worker bindings
export interface Bindings {
	ANALYTICS?: AnalyticsEngine;
	LUNARCRUSH_API_KEY: string;
	LUNARCRUSH_CACHE: KVNamespace;
	ENVIRONMENT: string;
}

// Hono context variables
export interface Variables {
	requestId: string;
	startTime: number;
	userAgent?: string;
	clientIP?: string;
	user?: any;
	userApiKeyHash?: string;
	apiKey?: string;
	getApiKey?: () => string | null;
	metrics?: any;
}

// API key validation result
export interface ApiKeyValidation {
	valid: boolean;
	error?: string;
	keyHash?: string;
}

// Validation schemas
export const graphqlRequestSchema = z.object({
	query: z.string().min(1, 'Query is required').max(10000, 'Query too long'),
	variables: z.record(z.string(), z.any()).optional(),
	operationName: z.string().optional(),
});

export type GraphQLRequest = z.infer<typeof graphqlRequestSchema>;
