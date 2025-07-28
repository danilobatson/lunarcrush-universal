// LunarCrush Universal - Shared Types Entry Point
// Export all generated types

export * from './generated/types';

// Utility types for API responses
export interface LunarCrushAPIResponse<T = any> {
  data: T;
  status: string;
  message?: string;
}

export interface LunarCrushClientConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
}
