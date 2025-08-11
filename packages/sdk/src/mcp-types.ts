// ===================================================================
// 🤖 MCP Types & Interfaces  
// ===================================================================

/** MCP tool response structure */
export interface MCPResponse {
  content: Array<{
    type: 'text';
    text: string;
  }>;
}

/** MCP client configuration */
export interface MCPConfig {
  apiKey: string;
  endpoint?: string;
  timeout?: number;
}

/** Parsed data from MCP markdown responses */
export interface ParsedMCPData {
  raw: string;
  tables?: Array<Record<string, string>>;
  metadata?: Record<string, any>;
  tsv?: Array<Record<string, string>>;
}

/** MCP tool names - All 11 LunarCrush MCP Tools */
export type MCPToolName = 
  | 'List'                 // 1. Get topics within a category
  | 'Cryptocurrencies'     // 2. Get sorted cryptocurrency lists
  | 'Stocks'               // 3. Get sorted stock lists  
  | 'Topic'                // 4. Get full topic details
  | 'Creator'              // 5. Get creator insights
  | 'Post'                 // 6. Get specific post details
  | 'Topic_Time_Series'    // 7. Get historical time series
  | 'Topic_Posts'          // 8. Get popular posts for topic
  | 'Search'               // 9. Universal search
  | 'Fetch'                // 10. Direct API path access
  | 'Authentication';      // 11. Session authentication
