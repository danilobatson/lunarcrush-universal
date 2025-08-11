// ===================================================================
// 🤖 LunarCrush MCP Client - AI-Native Integration
// ===================================================================

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';
import type { MCPResponse, MCPConfig, ParsedMCPData, MCPToolName } from './mcp-types';

class MCPError extends Error {
  constructor(message: string, public toolName?: string) {
    super(message);
    this.name = 'MCPError';
  }
}

/**
 * 🤖 LunarCrush MCP Client - Direct AI Integration
 *
 * Connects directly to LunarCrush's Model Context Protocol server
 * for real-time social intelligence data in AI workflows.
 */
export class LunarCrushMCP {
  private client?: Client;
  private config: Required<MCPConfig>;

  constructor(apiKeyOrConfig: string | MCPConfig) {
    this.config = this.buildConfig(apiKeyOrConfig);
  }

  private buildConfig(input: string | MCPConfig): Required<MCPConfig> {
    if (typeof input === 'string') {
      return {
        apiKey: input,
        endpoint: 'https://lunarcrush.ai/sse',
        timeout: 30000
      };
    }

    if (!input.apiKey) {
      throw new MCPError('API key required');
    }

    return {
      endpoint: 'https://lunarcrush.ai/sse',
      timeout: 30000,
      ...input
    };
  }

  /**
   * Connect to MCP server
   */
  async connect(): Promise<void> {
    try {
      const transport = new SSEClientTransport(
        new URL(`${this.config.endpoint}?key=${this.config.apiKey}`)
      );

      this.client = new Client({
        name: 'lunarcrush-sdk-mcp',
        version: '1.0.0'
      });

      await this.client.connect(transport);
    } catch (error: any) {
      throw new MCPError(`MCP connection failed: ${error.message}`);
    }
  }

  /**
   * Execute MCP tool with error handling
   */
  private async callTool(toolName: MCPToolName, args: Record<string, any>): Promise<ParsedMCPData> {
    if (!this.client) {
      await this.connect();
    }

    try {
      const result = await this.client!.callTool({
        name: toolName,
        arguments: args
      });

      return this.parseResponse(result as MCPResponse);
    } catch (error: any) {
      throw new MCPError(`Tool ${toolName} failed: ${error.message}`, toolName);
    }
  }

  /**
   * Parse MCP markdown response into structured data
   */
  private parseResponse(response: MCPResponse): ParsedMCPData {
    const text = response.content?.[0]?.text || '';

    const parsed: ParsedMCPData = {
      raw: text,
      tables: this.parseMarkdownTables(text),
      tsv: this.parseTSV(text),
      metadata: this.extractMetadata(text)
    };

    return parsed;
  }

  /**
   * Parse markdown tables into objects
   */
  private parseMarkdownTables(text: string): Array<Record<string, string>> {
    const tables: Array<Record<string, string>> = [];
    const tableRegex = /\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n?)+)/g;

    let match;
    while ((match = tableRegex.exec(text)) !== null) {
      const headers = match[1].split('|').map(h => h.trim()).filter(h => h);
      const rows = match[2].trim().split('\n');

      const tableData = rows.map(row => {
        const cells = row.split('|').map(c => c.trim()).filter(c => c);
        const rowObj: Record<string, string> = {};
        headers.forEach((header, i) => {
          rowObj[header] = cells[i] || '';
        });
        return rowObj;
      });

      tables.push(...tableData);
    }

    return tables;
  }

  /**
   * Parse TSV data into objects
   */
  private parseTSV(text: string): Array<Record<string, string>> {
    const lines = text.split('\n').filter(line => line.includes('\t'));
    if (lines.length < 2) return [];

    const headers = lines[0].split('\t');
    return lines.slice(1).map(line => {
      const values = line.split('\t');
      const obj: Record<string, string> = {};
      headers.forEach((header, i) => {
        obj[header] = values[i] || '';
      });
      return obj;
    });
  }

  /**
   * Extract metadata from markdown headers and text
   */
  private extractMetadata(text: string): Record<string, any> {
    const metadata: Record<string, any> = {};

    // Extract title
    const titleMatch = text.match(/^#\s+(.+)$/m);
    if (titleMatch) metadata.title = titleMatch[1];

    // Extract images
    const imageMatches = text.match(/!\[([^\]]*)\]\(([^)]+)\)/g);
    if (imageMatches) {
      metadata.images = imageMatches.map(match => {
        const [, alt, src] = match.match(/!\[([^\]]*)\]\(([^)]+)\)/) || [];
        return { alt, src };
      });
    }

    return metadata;
  }

  // ================================================================
  // 🎯 API Methods - Matching GraphQL SDK Structure
  // ================================================================

  /**
   * 📊 Topics API - Social sentiment analysis
   */
  topics = {
    get: (topic: string) => this.callTool('Topic', { topic }),
    timeSeries: (topic: string, options: { metrics?: string[], interval?: string } = {}) =>
      this.callTool('Topic_Time_Series', { topic, ...options }),
    posts: (topic: string, options: { interval?: string } = {}) =>
      this.callTool('Topic_Posts', { topic, ...options })
  };

  /**
   * 💰 Cryptocurrencies API
   */
  cryptocurrencies = {
    list: (options: { filter?: string, sort?: string, limit?: number } = {}) =>
      this.callTool('Cryptocurrencies', options)
  };

  /**
   * 📈 Stocks API
   */
  stocks = {
    list: (options: { sector?: string, sort?: string, limit?: number } = {}) =>
      this.callTool('Stocks', options)
  };

  /**
   * 👑 Creators API
   */
  creators = {
    get: (screenName: string, network = 'x') =>
      this.callTool('Creator', { screenName, network })
  };

  /**
   * 🔍 Search API
   */
  search = (query: string) => this.callTool('Search', { query });

  /**
   * 📝 Posts API
   */
  posts = {
    get: (network: string, id: string) =>
      this.callTool('Post', { network, id })
  };

  /**
   * 📋 Lists API
   */
  lists = {
    get: (category: string) => this.callTool('List', { category })
  };

  /**
   * 🔄 Direct fetch API
   */
  fetch = (path: string) => this.callTool('Fetch', { id: path });

  /**
   * Close MCP connection
   */
  async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = undefined;
    }
  }
}

export { MCPError };
