/**
 * 🌙 LunarCrush Universal SDK - Complete Implementation
 * ====================================================
 *
 * One import, everything works. Optimized for:
 * - Beginner friendliness (reduce churn)
 * - LLM discoverability (AI code generation)
 * - Viral content creation (support article ecosystem)
 * - Zero configuration (works out of the box)
 */

import { LunarCrushMCPClient } from './client/MCPClient';
import { GraphQLClient } from './client/GraphQLClient';
import { RealTimeClient } from './client/RealTimeClient';
import { ViralAnalyzer } from './analyzers/ViralAnalyzer';
import { ContentGenerator } from './generators/ContentGenerator';
import { InsightsEngine } from './analyzers/InsightsEngine';

// Re-export types for convenience
export type {
	TopicDetails,
	CoinDetails,
	CreatorDetails,
	CoinListItem,
	TopicListItem,
	CreatorListItem,
	SearchResult,
	TimeInterval,
	SortDirection,
} from './types/generated';

// Re-export MCP types
export type { MCPClientConfig, MCPTool } from './client/MCPClient';

export interface LunarCrushConfig {
	apiKey: string;
	backendEndpoint?: string;
	enableCaching?: boolean;
	enableRateLimit?: boolean;
	enableViralAnalytics?: boolean;
}

export interface TrendingReport {
	topics: Array<{
		name: string;
		score: number;
		sentiment: number;
		change24h: number;
	}>;
	insights: string[];
	recommendations: string[];
	generatedAt: Date;
}

/**
 * 🚀 The Ultimate LunarCrush SDK
 *
 * @example
 * ```typescript
 * import { useLunarCrush } from 'lunarcrush-comprehensive-sdk';
 *
 * const lc = useLunarCrush('your-api-key');
 * const bitcoin = await lc.getTopic('bitcoin');
 * const trending = await lc.getTrendingTopics();
 * ```
 */
export class LunarCrushUniversal {
	private config: LunarCrushConfig;
	private mcpClient: LunarCrushMCPClient;
	private graphqlClient: GraphQLClient;
	private realtimeClient?: RealTimeClient;
	private viralAnalyzer?: ViralAnalyzer;
	private contentGenerator?: ContentGenerator;
	private insightsEngine?: InsightsEngine;

	constructor(config: LunarCrushConfig) {
		this.config = {
			backendEndpoint: 'https://lunarcrush.cryptoguard-api.workers.dev',
			enableCaching: true,
			enableRateLimit: true,
			enableViralAnalytics: true,
			...config,
		};

		// Initialize core clients
		this.mcpClient = new LunarCrushMCPClient({
			lunarCrushApiKey: this.config.apiKey,
			backendEndpoint: this.config.backendEndpoint,
		});

		this.graphqlClient = new GraphQLClient({
			apiKey: this.config.apiKey,
			endpoint: `${this.config.backendEndpoint}/graphql`,
			enableCaching: this.config.enableCaching,
			enableRateLimit: this.config.enableRateLimit,
		});

		// Initialize optional features
		if (this.config.enableViralAnalytics) {
			this.viralAnalyzer = new ViralAnalyzer(this.graphqlClient);
			this.contentGenerator = new ContentGenerator(this.graphqlClient);
			this.insightsEngine = new InsightsEngine(this.graphqlClient);
		}
	}

	// ===== TIER 1: ESSENTIAL FUNCTIONS (REDUCE CHURN) =====

	/**
	 * Get detailed information about a topic
	 * @example await lc.getTopic('bitcoin')
	 */
	async getTopic(topic: string, options?: { timeframe?: string }) {
		return this.graphqlClient.getTopic(topic, options);
	}

	/**
	 * Get detailed information about a cryptocurrency
	 * @example await lc.getCoin('BTC')
	 */
	async getCoin(symbol: string, options?: { includeMetrics?: boolean }) {
		return this.graphqlClient.getCoin(symbol, options);
	}

	/**
	 * Get information about a creator/influencer
	 * @example await lc.getCreator('elonmusk')
	 */
	async getCreator(handle: string, options?: { includeMetrics?: boolean }) {
		return this.graphqlClient.getCreator(handle, options);
	}

	/**
	 * Get currently trending topics
	 * @example await lc.getTrendingTopics({ limit: 10 })
	 */
	async getTrendingTopics(options?: { limit?: number; timeframe?: string }) {
		return this.graphqlClient.getTrendingTopics(options);
	}

	/**
	 * Get top cryptocurrencies by social metrics
	 * @example await lc.getTopCoins({ limit: 20 })
	 */
	async getTopCoins(options?: { limit?: number; sortBy?: string }) {
		return this.graphqlClient.getTopCoins(options);
	}

	/**
	 * List all available MCP tools
	 * @example const tools = await lc.listTools()
	 */
	async listTools() {
		return this.mcpClient.getTools();
	}

	/**
	 * Call a specific MCP tool
	 * @example await lc.callTool('Topic', { topic: 'bitcoin' })
	 */
	async callTool(toolName: string, arguments_: any) {
		return this.mcpClient.callTool(toolName, arguments_);
	}

	/**
	 * Get sentiment for a topic or coin (one-liner)
	 * @example const sentiment = await lc.getSentiment('bitcoin')
	 */
	async getSentiment(query: string): Promise<number> {
		const result = await this.callTool('Topic', { topic: query });
		return result?.sentiment_score || 0;
	}

	/**
	 * Get social score for a coin (one-liner)
	 * @example const score = await lc.getSocialScore('BTC')
	 */
	async getSocialScore(symbol: string): Promise<number> {
		const coin = await this.getCoin(symbol);
		return coin?.galaxy_score || 0;
	}

	// ===== TIER 2: CONTENT CREATION (VIRAL SUPPORT) =====

	/**
	 * Generate a trending report for content creation
	 * @example const report = await lc.generateTrendingReport('crypto')
	 */
	async generateTrendingReport(
		category: string = 'crypto'
	): Promise<TrendingReport> {
		if (!this.contentGenerator) {
			throw new Error(
				'Viral analytics not enabled. Set enableViralAnalytics: true'
			);
		}
		return this.contentGenerator.generateTrendingReport(category);
	}

	/**
	 * Generate market insights for multiple assets
	 * @example const insights = await lc.generateMarketInsights(['BTC', 'ETH'])
	 */
	async generateMarketInsights(symbols: string[]): Promise<string[]> {
		if (!this.contentGenerator) {
			throw new Error(
				'Viral analytics not enabled. Set enableViralAnalytics: true'
			);
		}
		return this.contentGenerator.generateMarketInsights(symbols);
	}

	/**
	 * Get social summary for a topic (perfect for articles)
	 * @example const summary = await lc.generateSocialSummary('bitcoin')
	 */
	async generateSocialSummary(topic: string): Promise<string> {
		if (!this.contentGenerator) {
			throw new Error(
				'Viral analytics not enabled. Set enableViralAnalytics: true'
			);
		}
		return this.contentGenerator.generateSocialSummary(topic);
	}

	/**
	 * Get viral potential score for content
	 * @example const score = await lc.getViralPotential('ethereum')
	 */
	async getViralPotential(topic: string): Promise<number> {
		if (!this.viralAnalyzer) {
			throw new Error(
				'Viral analytics not enabled. Set enableViralAnalytics: true'
			);
		}
		return this.viralAnalyzer.getViralPotential(topic);
	}

	/**
	 * Get viral tweets for a topic
	 * @example const tweets = await lc.getViralTweets('bitcoin', { hours: 24 })
	 */
	async getViralTweets(
		topic: string,
		options?: { hours?: number; minEngagement?: number }
	) {
		const result = await this.callTool('Posts', {
			topic,
			time: options?.hours ? `${options.hours}h` : '24h',
			limit: 50,
		});

		// Filter for high engagement
		const minEngagement = options?.minEngagement || 1000;
		return (
			result?.posts?.filter(
				(post: any) => (post.interactions || 0) >= minEngagement
			) || []
		);
	}

	/**
	 * Get trending creators for content collaboration
	 * @example const creators = await lc.getTrendingCreators({ timeframe: '1d' })
	 */
	async getTrendingCreators(options?: {
		timeframe?: string;
		category?: string;
	}) {
		const result = await this.callTool('Creators', {
			sort: 'social_score',
			time: options?.timeframe || '1d',
			limit: 20,
		});
		return result?.creators || [];
	}

	/**
	 * Get breaking news and events
	 * @example const news = await lc.getBreakingNews({ category: 'crypto' })
	 */
	async getBreakingNews(options?: { category?: string; limit?: number }) {
		const trending = await this.getTrendingTopics({
			limit: options?.limit || 10,
			timeframe: '1h',
		});

		// Filter for rapidly changing topics (breaking news indicators)
		return trending.filter((topic: any) => Math.abs(topic.change24h || 0) > 50);
	}

	// ===== TIER 3: REAL-TIME FEATURES =====

	/**
	 * Subscribe to real-time topic updates
	 * @example const unsubscribe = lc.subscribeToTopic('bitcoin', data => console.log(data))
	 */
	subscribeToTopic(topic: string, callback: (data: any) => void): () => void {
		if (!this.realtimeClient) {
			this.realtimeClient = new RealTimeClient(this.config.backendEndpoint!);
		}
		return this.realtimeClient.subscribeToTopic(topic, callback);
	}

	/**
	 * Stream sentiment data for multiple assets
	 * @example const stream = lc.streamSentiment(['BTC', 'ETH'])
	 */
	streamSentiment(assets: string[]) {
		if (!this.realtimeClient) {
			this.realtimeClient = new RealTimeClient(this.config.backendEndpoint!);
		}
		return this.realtimeClient.streamSentiment(assets);
	}

	// ===== TIER 4: ADVANCED ANALYTICS =====

	/**
	 * Generate AI-powered insights
	 * @example const insights = await lc.generateInsights({ coins: ['BTC'] })
	 */
	async generateInsights(options: {
		coins?: string[];
		topics?: string[];
		creators?: string[];
		timeframe?: string;
		includeViralOpportunities?: boolean;
	}) {
		if (!this.insightsEngine) {
			throw new Error(
				'Viral analytics not enabled. Set enableViralAnalytics: true'
			);
		}
		return this.insightsEngine.generateInsights(options);
	}

	// ===== LLM-FRIENDLY NATURAL LANGUAGE FUNCTIONS =====

	/**
	 * Natural language: What's trending in crypto?
	 * @example const trending = await lc.whatIsTrendingInCrypto()
	 */
	async whatIsTrendingInCrypto() {
		return this.getTrendingTopics({ limit: 10 });
	}

	/**
	 * Natural language: How do people feel about X?
	 * @example const sentiment = await lc.howDoPeopleFeelAbout('bitcoin')
	 */
	async howDoPeopleFeelAbout(topic: string) {
		const sentiment = await this.getSentiment(topic);
		return {
			sentiment,
			description:
				sentiment > 0.6
					? 'Very Positive'
					: sentiment > 0.4
						? 'Positive'
						: sentiment > -0.4
							? 'Neutral'
							: sentiment > -0.6
								? 'Negative'
								: 'Very Negative',
		};
	}

	/**
	 * Natural language: Will this go viral?
	 * @example const viral = await lc.willThisGoViral('ethereum news')
	 */
	async willThisGoViral(
		content: string
	): Promise<{ score: number; likelihood: string }> {
		const score = await this.getViralPotential(content);
		return {
			score,
			likelihood:
				score > 0.8
					? 'Very Likely'
					: score > 0.6
						? 'Likely'
						: score > 0.4
							? 'Possible'
							: score > 0.2
								? 'Unlikely'
								: 'Very Unlikely',
		};
	}
}

/**
 * 🚀 Primary export - the magic function that creates everything
 *
 * @example
 * ```typescript
 * import { useLunarCrush } from 'lunarcrush-comprehensive-sdk';
 *
 * const lc = useLunarCrush('your-api-key');
 * const bitcoin = await lc.getTopic('bitcoin');
 * ```
 */
export function useLunarCrush(
	apiKey: string,
	options?: Omit<LunarCrushConfig, 'apiKey'>
): LunarCrushUniversal {
	return new LunarCrushUniversal({ apiKey, ...options });
}

/**
 * 🎯 Main SDK Class - Alias for LunarCrushUniversal
 */
export const LunarCrush = LunarCrushUniversal;

/**
 * 🎯 Quick access functions for one-liners
 */
export const QuickAccess = {
	/**
	 * Quick topic lookup
	 * @example const bitcoin = await QuickAccess.topic('bitcoin', 'your-api-key')
	 */
	async topic(topic: string, apiKey: string) {
		const lc = useLunarCrush(apiKey);
		return lc.getTopic(topic);
	},

	/**
	 * Quick coin lookup
	 * @example const btc = await QuickAccess.coin('BTC', 'your-api-key')
	 */
	async coin(symbol: string, apiKey: string) {
		const lc = useLunarCrush(apiKey);
		return lc.getCoin(symbol);
	},

	/**
	 * Quick trending lookup
	 * @example const trending = await QuickAccess.trending('your-api-key')
	 */
	async trending(apiKey: string) {
		const lc = useLunarCrush(apiKey);
		return lc.getTrendingTopics();
	},
};

// Default export for CommonJS compatibility
export default useLunarCrush;
