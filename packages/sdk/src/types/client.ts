// 🌙 LunarCrush Universal SDK - Client Configuration Types
// ========================================================

export interface LunarCrushClientConfig {
  endpoint?: string;
  headers?: Record<string, string>;
}

export interface GraphQLClientConfig {
  endpoint: string;
  headers?: Record<string, string>;
}

// Export for backward compatibility
export type LunarCrushConfig = LunarCrushClientConfig;
