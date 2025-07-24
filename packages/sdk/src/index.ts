// 🌙 LunarCrush Universal SDK - Main Export
// ==========================================
// Comprehensive crypto social intelligence SDK

export { LunarCrushClient } from './client/LunarCrushClient';

// Export types for comprehensive data structures
export * from './types/api';
export * from './types/client';

// Export GraphQL utilities
export { createGraphQLClient, GraphQLClient } from './utils/graphql';
export type { GraphQLClientConfig } from './utils/graphql';

// Re-export shared types and utilities
export {
	METHOD_MAP,
	METHOD_ALIASES,
	GRAPHQL_QUERIES,
} from '@lunarcrush/shared-types';

// Default export for convenience
export { LunarCrushClient as default } from './client/LunarCrushClient';
