import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

export class LunarCrushMCPService {
	private client: Client | null = null;
	private transport: StreamableHTTPClientTransport | null = null;
	private apiKey: string;
	private sessionId: string | null = null;

	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}

	async initialize(): Promise<boolean> {
		try {
			console.log('🔄 Initializing MCP with Basic Auth...');

			// Use Basic Auth (most reliable for APIs)
			const basicAuthHeader =
				'Basic ' + Buffer.from(`user:${this.apiKey}`).toString('base64');

			this.transport = new StreamableHTTPClientTransport(
				new URL('https://lunarcrush.ai/mcp')
			);

			this.client = new Client(
				{
					name: 'lunarcrush-universal-backend',
					version: '1.0.0',
				},
				{
					capabilities: {
						tools: {},
						resources: {},
					},
				}
			);

			await this.client.connect(this.transport);

			// Test the connection
			await this.client.callTool({
				name: 'Search',
				arguments: { query: 'test' },
			});

			this.sessionId = this.transport.sessionId || 'unknown';
			console.log('✅ MCP client connected with Basic Auth');
			console.log(`📋 Session ID: ${this.sessionId}`);

			return true;
		} catch (error) {
			console.log('❌ Basic Auth failed, trying URL parameter method...');

			try {
				// Fallback to URL parameter method
				this.transport = new StreamableHTTPClientTransport(
					new URL(`https://lunarcrush.ai/mcp?key=${this.apiKey}`)
				);

				this.client = new Client(
					{
						name: 'lunarcrush-universal-backend',
						version: '1.0.0',
					},
					{
						capabilities: {
							tools: {},
							resources: {},
						},
					}
				);

				await this.client.connect(this.transport);

				// Test the connection
				await this.client.callTool({
					name: 'Search',
					arguments: { query: 'test' },
				});

				this.sessionId = this.transport.sessionId || 'unknown';
				console.log('✅ MCP client connected with URL parameter');
				console.log(`📋 Session ID: ${this.sessionId}`);

				return true;
			} catch (urlError) {
				console.error('❌ All authentication methods failed:', urlError);
				return false;
			}
		}
	}

	async getCryptoData(symbol: string) {
		this.ensureConnected();

		const result = await this.client!.callTool({
			name: 'Topic',
			arguments: { topic: symbol.toLowerCase() },
		});

		return result.content;
	}

	async getCryptoList(
		options: {
			sort?: string;
			limit?: number;
			filter?: string;
		} = {}
	) {
		this.ensureConnected();

		const { sort = 'alt_rank', limit = 100, filter = '' } = options;

		const result = await this.client!.callTool({
			name: 'Cryptocurrencies',
			arguments: { sort, limit, filter },
		});

		return result.content;
	}

	async searchTopics(query: string) {
		this.ensureConnected();

		const result = await this.client!.callTool({
			name: 'Search',
			arguments: { query },
		});

		return result.content;
	}

	async getTimeSeriesData(
		topic: string,
		interval: string = '1w',
		metrics: string[] = ['interactions']
	) {
		this.ensureConnected();

		const result = await this.client!.callTool({
			name: 'Topic_Time_Series',
			arguments: { topic, interval, metrics },
		});

		return result.content;
	}

	async getTopicPosts(topic: string, interval: string = '1w') {
		this.ensureConnected();

		const result = await this.client!.callTool({
			name: 'Topic_Posts',
			arguments: { topic, interval },
		});

		return result.content;
	}

	private ensureConnected() {
		if (!this.client) {
			throw new Error('MCP client not initialized. Call initialize() first.');
		}
	}

	async healthCheck() {
		try {
			this.ensureConnected();

			await this.client!.callTool({
				name: 'Search',
				arguments: { query: 'bitcoin' },
			});

			return { status: 'healthy', sessionId: this.sessionId };
		} catch (error) {
			return {
				status: 'unhealthy',
				error: error instanceof Error ? error.message : 'Unknown error',
			};
		}
	}

	async close() {
		if (this.client) {
			await this.client.close();
			console.log('✅ MCP client closed');
		}
	}
}
