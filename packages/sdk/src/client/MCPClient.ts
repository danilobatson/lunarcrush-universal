/**
 * LunarCrush MCP (Model Context Protocol) Client
 *
 * This client provides a simple interface to LunarCrush's MCP tools using the official
 * MCP TypeScript SDK. It handles both cached tools list from our backend and direct
 * tool calls to LunarCrush.
 *
 * Developer Experience:
 * ```typescript
 * const client = createMCPClient({ lunarCrushApiKey: 'your-key' });
 * const result = await client.callTool('Topic', { topic: 'bitcoin' });
 * ```
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';

export interface MCPTool {
	name: string;
	description: string;
	inputSchema: any;
}

export interface MCPClientConfig {
	lunarCrushApiKey: string;
	backendEndpoint?: string;
}

export class LunarCrushMCPClient {
	private apiKey: string;
	private backendEndpoint: string;
	private mcpClient: Client | null = null;
	private connected: boolean = false;

	constructor(config: MCPClientConfig) {
		this.apiKey = config.lunarCrushApiKey;
		this.backendEndpoint =
			config.backendEndpoint ||
			'https://lunarcrush.cryptoguard-api.workers.dev';
	}

	/**
	 * Get list of available tools (cached from our optimized backend)
	 */
	async getTools(): Promise<MCPTool[]> {
		try {
			const response = await fetch(`${this.backendEndpoint}/mcp`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.apiKey}`,
				},
				body: JSON.stringify({
					jsonrpc: '2.0',
					id: 'get-tools',
					method: 'tools/list',
				}),
			});

			if (!response.ok) {
				throw new Error(`Backend error: ${response.status}`);
			}

			const mcpResponse = await response.json();

			if (mcpResponse.error) {
				throw new Error(`MCP error: ${mcpResponse.error.message}`);
			}

			return mcpResponse.result?.tools || [];
		} catch (error) {
			console.error('❌ Error fetching tools from backend:', error);
			throw error;
		}
	}

	/**
	 * Call a specific tool directly through LunarCrush MCP server
	 * This is the magic - simple API that handles all the complexity!
	 */
	async callTool(toolName: string, arguments_: any): Promise<any> {
		try {
			// Ensure we're connected to LunarCrush MCP server
			await this.ensureConnected();

			if (!this.mcpClient) {
				throw new Error('MCP client not initialized');
			}

			console.log(`🔧 Calling tool: ${toolName}`, arguments_);

			// Use the official MCP SDK to call the tool
			const result = await this.mcpClient.callTool({
				name: toolName,
				arguments: arguments_,
			});

			console.log(`✅ Tool ${toolName} completed successfully`);
			return result.content;
		} catch (error) {
			console.error(`❌ Error calling tool ${toolName}:`, error);
			throw error;
		}
	}

	/**
	 * Connect to LunarCrush MCP server if not already connected
	 */
	private async ensureConnected(): Promise<void> {
		if (this.connected && this.mcpClient) {
			return;
		}

		try {
			console.log('🔗 Connecting to LunarCrush MCP server...');

			// Create official MCP client
			this.mcpClient = new Client({
				name: 'lunarcrush-universal-client',
				version: '1.0.0',
			});

			// Create SSE transport to LunarCrush
			const transport = new SSEClientTransport(
				new URL(`https://lunarcrush.ai/sse?key=${this.apiKey}`)
			);

			// Connect using official SDK
			await this.mcpClient.connect(transport);
			this.connected = true;

			console.log('✅ Connected to LunarCrush MCP server');
		} catch (error) {
			console.error('❌ Failed to connect to LunarCrush MCP server:', error);
			throw error;
		}
	}

	/**
	 * Disconnect from LunarCrush MCP server
	 */
	async disconnect(): Promise<void> {
		if (this.mcpClient) {
			await this.mcpClient.close();
			this.mcpClient = null;
			this.connected = false;
			console.log('🔌 Disconnected from LunarCrush MCP server');
		}
	}

	/**
	 * Get connection status
	 */
	isConnected(): boolean {
		return this.connected;
	}

	// =========================
	// CONVENIENCE METHODS
	// =========================

	/**
	 * Get topic information (Bitcoin, Ethereum, Apple, etc.)
	 */
	async getTopic(topic: string): Promise<any> {
		return await this.callTool('Topic', { topic });
	}

	/**
	 * Search for topics, posts, creators, etc.
	 */
	async search(query: string): Promise<any> {
		return await this.callTool('Search', { query });
	}

	/**
	 * Get list of cryptocurrencies with filtering and sorting
	 */
	async getCryptocurrencies(
		options: {
			filter?: string;
			sort?: string;
			limit?: number;
		} = {}
	): Promise<any> {
		return await this.callTool('Cryptocurrencies', options);
	}

	/**
	 * Get list of stocks with filtering and sorting
	 */
	async getStocks(
		options: {
			sector?: string;
			sort?: string;
			limit?: number;
		} = {}
	): Promise<any> {
		return await this.callTool('Stocks', options);
	}

	/**
	 * Get creator/influencer information
	 */
	async getCreator(screenName: string, network?: string): Promise<any> {
		return await this.callTool('Creator', { screenName, network });
	}

	/**
	 * Get specific post information
	 */
	async getPost(id: string, network?: string): Promise<any> {
		return await this.callTool('Post', { id, network });
	}

	/**
	 * Get time series data for a topic
	 */
	async getTopicTimeSeries(options: {
		topic: string;
		interval: string;
		metrics?: string[];
	}): Promise<any> {
		return await this.callTool('Topic_Time_Series', options);
	}

	/**
	 * Get popular posts for a topic
	 */
	async getTopicPosts(options: {
		topic: string;
		interval?: string;
		from_date?: string;
		to_date?: string;
	}): Promise<any> {
		return await this.callTool('Topic_Posts', options);
	}

	/**
	 * Fetch data using LunarCrush path
	 */
	async fetch(id: string): Promise<any> {
		return await this.callTool('Fetch', { id });
	}

	/**
	 * Authenticate and get user info
	 */
	async authenticate(apiKey?: string): Promise<any> {
		return await this.callTool('Authentication', {
			apiKey: apiKey || this.apiKey,
		});
	}
}

/**
 * Factory function to create MCP client with simple API
 */
export function createMCPClient(config: MCPClientConfig): LunarCrushMCPClient {
	return new LunarCrushMCPClient(config);
}

/**
 * Simple function-based API for one-off tool calls
 */
export async function callTool(
	toolName: string,
	arguments_: any,
	apiKey: string,
	backendEndpoint?: string
): Promise<any> {
	const client = createMCPClient({
		lunarCrushApiKey: apiKey,
		backendEndpoint,
	});

	try {
		return await client.callTool(toolName, arguments_);
	} finally {
		await client.disconnect();
	}
}
