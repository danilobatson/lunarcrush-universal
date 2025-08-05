/**
 * 🔧 GraphQL Client - High-level wrapper for LunarCrush GraphQL API
 * Handles caching, rate limiting, and error management
 */

import { TopicDetails, CoinDetails, CreatorDetails } from '../types/generated';

export interface GraphQLClientConfig {
	apiKey: string;
	endpoint: string;
	enableCaching?: boolean;
	enableRateLimit?: boolean;
}

export class GraphQLClient {
	private config: GraphQLClientConfig;
	private cache = new Map<string, { data: any; timestamp: number }>();
	private requestQueue: Array<() => Promise<any>> = [];
	private isProcessingQueue = false;

	constructor(config: GraphQLClientConfig) {
		this.config = config;
	}

	private async request(query: string, variables?: any): Promise<any> {
		const cacheKey = `${query}:${JSON.stringify(variables)}`;

		// Check cache
		if (this.config.enableCaching) {
			const cached = this.cache.get(cacheKey);
			if (cached && Date.now() - cached.timestamp < 300000) {
				// 5 minutes
				return cached.data;
			}
		}

		// Rate limiting
		if (this.config.enableRateLimit) {
			return new Promise((resolve, reject) => {
				this.requestQueue.push(async () => {
					try {
						const result = await this.executeRequest(query, variables);
						if (this.config.enableCaching) {
							this.cache.set(cacheKey, { data: result, timestamp: Date.now() });
						}
						resolve(result);
					} catch (error) {
						reject(error);
					}
				});
				this.processQueue();
			});
		}

		const result = await this.executeRequest(query, variables);
		if (this.config.enableCaching) {
			this.cache.set(cacheKey, { data: result, timestamp: Date.now() });
		}
		return result;
	}

	private async processQueue() {
		if (this.isProcessingQueue || this.requestQueue.length === 0) return;

		this.isProcessingQueue = true;
		while (this.requestQueue.length > 0) {
			const request = this.requestQueue.shift()!;
			await request();
			await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms between requests
		}
		this.isProcessingQueue = false;
	}

	private async executeRequest(query: string, variables?: any): Promise<any> {
		try {
			const response = await fetch(this.config.endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.config.apiKey}`,
				},
				body: JSON.stringify({ query, variables }),
			});

			if (!response.ok) {
				throw new Error(
					`GraphQL request failed: ${response.status} ${response.statusText}`
				);
			}

			const result = await response.json();

			if (result.errors) {
				throw new Error(
					`GraphQL errors: ${result.errors.map((e: any) => e.message).join(', ')}`
				);
			}

			return result.data;
		} catch (error) {
			console.error('GraphQL request failed:', error);
			throw error;
		}
	}

	async getTopic(
		topic: string,
		options?: { timeframe?: string }
	): Promise<TopicDetails> {
		const query = `
      query GetTopic($topic: String!, $timeframe: TimeInterval) {
        topic(topic: $topic) {
          id
          name
          description
          category
          sentiment_score
          social_score
          engagement_rate
          follower_count
          post_count
          creator_count
          whatsup(time: $timeframe) {
            summary
            insights
          }
          timeSeries(time: $timeframe) {
            timestamp
            sentiment_score
            social_score
            post_count
          }
        }
      }
    `;

		const variables = {
			topic,
			timeframe: options?.timeframe || 'ONE_DAY',
		};

		const result = await this.request(query, variables);
		return result.topic;
	}

	async getCoin(
		symbol: string,
		options?: { includeMetrics?: boolean }
	): Promise<CoinDetails> {
		const query = `
      query GetCoin($symbol: String!, $includeMetrics: Boolean = true) {
        coin(symbol: $symbol) {
          id
          symbol
          name
          price
          price_change_24h
          market_cap
          volume_24h
          social_score
          sentiment_score
          engagement_rate
          follower_count
          post_count
          creator_count
          @include(if: $includeMetrics) {
            timeSeries(time: ONE_DAY) {
              timestamp
              price
              social_score
              sentiment_score
            }
          }
          blockchain {
            network
            address
            type
            decimals
          }
        }
      }
    `;

		const variables = {
			symbol,
			includeMetrics: options?.includeMetrics ?? true,
		};

		const result = await this.request(query, variables);
		return result.coin;
	}

	async getCreator(
		handle: string,
		options?: { includeMetrics?: boolean }
	): Promise<CreatorDetails> {
		const query = `
      query GetCreator($handle: String!, $includeMetrics: Boolean = true) {
        creator(id: $handle) {
          id
          name
          avatar_url
          follower_count
          following_count
          post_count
          engagement_rate
          influence_score
          sentiment_score
          @include(if: $includeMetrics) {
            timeSeries(time: ONE_DAY) {
              timestamp
              follower_count
              engagement_rate
              influence_score
            }
          }
        }
      }
    `;

		const variables = {
			handle,
			includeMetrics: options?.includeMetrics ?? true,
		};

		const result = await this.request(query, variables);
		return result.creator;
	}

	async getTrendingTopics(options?: { limit?: number; timeframe?: string }) {
		const query = `
      query GetTrendingTopics($limit: Int, $timeframe: TimeInterval) {
        topics(
          limit: $limit
          sort: SOCIAL_SCORE
          direction: DESC
          time: $timeframe
        ) {
          id
          name
          category
          social_score
          sentiment_score
          change24h: social_score_change_24h
          post_count
          creator_count
        }
      }
    `;

		const variables = {
			limit: options?.limit || 20,
			timeframe: options?.timeframe || 'ONE_DAY',
		};

		const result = await this.request(query, variables);
		return result.topics;
	}

	async getTopCoins(options?: { limit?: number; sortBy?: string }) {
		const query = `
      query GetTopCoins($limit: Int, $sortBy: String) {
        coins(
          limit: $limit
          sort: SOCIAL_SCORE
          direction: DESC
        ) {
          id
          symbol
          name
          price
          price_change_24h
          market_cap
          volume_24h
          social_score
          sentiment_score
          change24h: social_score_change_24h
        }
      }
    `;

		const variables = {
			limit: options?.limit || 50,
			sortBy: options?.sortBy || 'social_score',
		};

		const result = await this.request(query, variables);
		return result.coins;
	}
}
