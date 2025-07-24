export interface EnhancedLunarCrushConfig extends LunarCrushConfig {
  // AI & LLM Integration
  aiMode?: boolean;
  llmIntrospection?: boolean;
  naturalLanguage?: boolean;
  promptTemplates?: boolean;
  mcpCompatible?: boolean;
  aiContext?: string;
  codeGeneration?: boolean;
  aiSuggestions?: boolean;
  explanations?: boolean;
  
  // Real-time & Streaming
  streaming?: boolean;
  realtime?: boolean;
  subscriptions?: boolean;
  liveUpdates?: boolean;
  updateInterval?: number;
  streamFormat?: 'sse' | 'websocket' | 'polling';
  bufferSize?: number;
  reconnect?: boolean;
  
  // Developer Experience
  playground?: boolean;
  playgroundUrl?: string;
  redirectToPlayground?: boolean;
  devTools?: boolean;
  introspection?: boolean;
  autoComplete?: boolean;
  docs?: 'static' | 'interactive' | 'none';
  help?: boolean;
  examples?: boolean;
  tutorials?: boolean;
  
  // Performance & Optimization
  batchRequests?: boolean;
  pagination?: 'auto' | 'manual' | 'infinite';
  preload?: string[];
  smartCache?: boolean;
  compression?: boolean;
  concurrent?: number;
  priority?: 'speed' | 'accuracy' | 'balanced';
  fallback?: boolean;
  offline?: boolean;
  
  // Cross-Platform Support
  platform?: 'web' | 'node' | 'react-native' | 'deno';
  framework?: 'react' | 'vue' | 'svelte' | 'vanilla';
  environment?: 'browser' | 'worker' | 'extension';
  cors?: boolean;
  polyfills?: boolean;
  treeshaking?: boolean;
  bundleSize?: 'minimal' | 'full' | 'custom';
  
  // Testing & Debugging
  mockMode?: boolean;
  testData?: 'minimal' | 'realistic' | 'comprehensive';
  fixtures?: boolean;
  debugLevel?: 'none' | 'basic' | 'verbose' | 'trace';
  requestLogging?: boolean;
  responseValidation?: boolean;
  performanceMetrics?: boolean;
  errorRecovery?: 'none' | 'manual' | 'auto';
  retryStrategies?: string[];
  circuitBreaker?: boolean;
  
  // Data Transformation
  transform?: {
    dates?: 'iso' | 'timestamp' | 'human';
    numbers?: 'precise' | 'human' | 'scientific';
    currency?: string;
  };
  
  // Advanced Querying
  queryBuilder?: boolean;
  sqlLike?: boolean;
  graphqlIntrospection?: boolean;
  customResolvers?: boolean;
  fuzzySearch?: boolean;
  facetedSearch?: boolean;
  aggregations?: boolean;
  analytics?: boolean;
  queryPlanning?: boolean;
  cacheStrategy?: 'conservative' | 'balanced' | 'aggressive';
  prefetch?: boolean;
}
