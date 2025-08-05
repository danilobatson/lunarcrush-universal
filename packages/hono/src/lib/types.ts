// ===================================================================
// 🔧 Type Definitions
// ===================================================================

import { z } from 'zod';

// Cloudflare Worker bindings
export interface Bindings {
	LUNARCRUSH_API_KEY: string;
	LUNARCRUSH_CACHE: KVNamespace;
	LUNARCRUSH_MCP_TOOLS: KVNamespace;
	KV_STORE: KVNamespace;
	DB: D1Database;
	ANALYTICS?: AnalyticsEngineDataset;
	ENVIRONMENT?: string;
	CUSTOM_CORS?: string;
	CF_REGION?: string;
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

export const mcpRequestSchema = z.object({
	method: z.string(),
	params: z.record(z.string(), z.any()).optional(),
	arguments: z.record(z.string(), z.any()).optional(),
});

export type GraphQLRequest = z.infer<typeof graphqlRequestSchema>;
export type MCPRequest = z.infer<typeof mcpRequestSchema>;
