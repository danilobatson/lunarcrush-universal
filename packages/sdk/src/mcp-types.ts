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

/** Valid MCP time series intervals */
export type MCPInterval = '1w' | '1m' | '3m' | '6m' | '1y' | 'all';

/** MCP tool names */
export type MCPToolName = 
  | 'Topic'
  | 'Cryptocurrencies' 
  | 'Stocks'
  | 'Creator'
  | 'Topic_Time_Series'
  | 'Topic_Posts'
  | 'Search'
  | 'Post'
  | 'List'
  | 'Fetch';
