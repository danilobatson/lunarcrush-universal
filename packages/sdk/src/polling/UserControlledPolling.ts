/**
 * 📊 User-Controlled Polling - Rate Limit Aware
 * =============================================
 *
 * Polling system where USER controls frequency to manage their LunarCrush rate limits.
 * Each poll = 1 API call against user's quota.
 *
 * Architecture:
 * User Code → Our Polling Manager → LunarCrush API (uses user's rate limits)
 */

import { LunarCrushMCPClient } from '../client/MCPClient';

export interface PollingOptions {
	// User-controlled settings
	interval: number; // Milliseconds between polls
	topics: string[];
	userApiKey: string;

	// Rate limit management
	rateLimitBudget?: {
		dailyLimit: number;
		currentUsage: number;
		resetTime: Date;
	};

	// Change detection
	changeThreshold?: number; // Only emit on significant changes

	// Callbacks
	onData?: (topic: string, data: any, changes?: DataChange[]) => void;
	onRateLimitWarning?: (usage: number, limit: number) => void;
	onError?: (topic: string, error: Error) => void;
}

export interface DataChange {
	field: string;
	oldValue: any;
	newValue: any;
	changePercent?: number;
	timestamp: Date;
}

export interface PollingStats {
	totalCalls: number;
	successfulCalls: number;
	failedCalls: number;
	rateLimitHits: number;
	avgResponseTime: number;
	estimatedDailyCalls: number;
	nextReset?: Date;
}

export class UserControlledPolling {
	private activePolls = new Map<string, NodeJS.Timeout>();
	private lastData = new Map<string, any>();
	private stats: PollingStats = {
		totalCalls: 0,
		successfulCalls: 0,
		failedCalls: 0,
		rateLimitHits: 0,
		avgResponseTime: 0,
		estimatedDailyCalls: 0,
	};

	constructor(private mcpClient: LunarCrushMCPClient) {}

	/**
	 * Start polling with user-defined frequency
	 * Returns cleanup function
	 */
	startPolling(options: PollingOptions): () => void {
		const {
			interval,
			topics,
			userApiKey,
			rateLimitBudget,
			changeThreshold = 5,
			onData,
			onRateLimitWarning,
			onError,
		} = options;

		// Validate user's polling configuration
		this.validatePollingConfig(options);

		// Calculate estimated daily usage
		const dailyCalls = this.calculateDailyUsage(interval, topics.length);
		this.stats.estimatedDailyCalls = dailyCalls;

		// Warn about rate limit usage
		if (rateLimitBudget && dailyCalls > rateLimitBudget.dailyLimit * 0.8) {
			onRateLimitWarning?.(dailyCalls, rateLimitBudget.dailyLimit);
		}

		// Start polling each topic
		topics.forEach((topic) => {
			const pollId = `${topic}-${Date.now()}`;

			const intervalId = setInterval(async () => {
				await this.pollTopic(topic, userApiKey, {
					changeThreshold,
					onData,
					onError,
					rateLimitBudget,
				});
			}, interval);

			this.activePolls.set(pollId, intervalId);

			// Initial poll
			this.pollTopic(topic, userApiKey, {
				changeThreshold,
				onData,
				onError,
				rateLimitBudget,
			});
		});

		// Return cleanup function
		return () => {
			this.stopAllPolling();
		};
	}

	/**
	 * Poll a single topic (1 API call against user's rate limit)
	 */
	private async pollTopic(
		topic: string,
		userApiKey: string,
		options: {
			changeThreshold: number;
			onData?: PollingOptions['onData'];
			onError?: PollingOptions['onError'];
			rateLimitBudget?: PollingOptions['rateLimitBudget'];
		}
	): Promise<void> {
		const startTime = Date.now();
		this.stats.totalCalls++;

		try {
			// Make API call using user's key (counts against their rate limit)
			const data = await this.mcpClient.callTool('Topic', {
				topic,
				userApiKey, // This is key - uses user's rate limits, not ours
			});

			const responseTime = Date.now() - startTime;
			this.updateResponseTimeStats(responseTime);
			this.stats.successfulCalls++;

			// Check for significant changes
			const lastData = this.lastData.get(topic);
			const changes = lastData
				? this.detectChanges(lastData, data, options.changeThreshold)
				: [];

			// Only emit if significant changes or first time
			if (!lastData || changes.length > 0) {
				options.onData?.(topic, data, changes);
			}

			// Store for next comparison
			this.lastData.set(topic, data);
		} catch (error) {
			this.stats.failedCalls++;

			// Check if it's a rate limit error
			if (this.isRateLimitError(error)) {
				this.stats.rateLimitHits++;
				console.warn(
					`Rate limit hit for ${topic}. Consider reducing polling frequency.`
				);
			}

			options.onError?.(topic, error as Error);
		}
	}

	/**
	 * Batch polling for efficiency (still uses user's rate limits)
	 */
	async batchPoll(
		topics: string[],
		userApiKey: string,
		options?: {
			changeThreshold?: number;
			maxConcurrent?: number;
		}
	): Promise<
		Map<string, { data?: any; error?: Error; changes?: DataChange[] }>
	> {
		const results = new Map();
		const maxConcurrent = options?.maxConcurrent || 3;
		const changeThreshold = options?.changeThreshold || 5;

		// Process in batches to avoid overwhelming the API
		for (let i = 0; i < topics.length; i += maxConcurrent) {
			const batch = topics.slice(i, i + maxConcurrent);

			const batchPromises = batch.map(async (topic) => {
				try {
					const data = await this.mcpClient.callTool('Topic', {
						topic,
						userApiKey,
					});
					const lastData = this.lastData.get(topic);
					const changes = lastData
						? this.detectChanges(lastData, data, changeThreshold)
						: [];

					this.lastData.set(topic, data);
					return { topic, data, changes };
				} catch (error) {
					return { topic, error: error as Error };
				}
			});

			const batchResults = await Promise.all(batchPromises);
			batchResults.forEach((result) => {
				results.set(result.topic, {
					data: result.data,
					error: result.error,
					changes: result.changes,
				});
			});

			// Brief pause between batches to be respectful
			if (i + maxConcurrent < topics.length) {
				await new Promise((resolve) => setTimeout(resolve, 100));
			}
		}

		return results;
	}

	/**
	 * Get polling statistics and rate limit insights
	 */
	getStats(): PollingStats & {
		rateLimitInsights: {
			callsPerHour: number;
			callsPerDay: number;
			efficiency: number; // successful calls / total calls
			avgTimeBetweenCalls: number;
		};
	} {
		const callsPerHour = this.stats.totalCalls; // Simplified - would track time windows
		const efficiency =
			this.stats.totalCalls > 0
				? this.stats.successfulCalls / this.stats.totalCalls
				: 0;

		return {
			...this.stats,
			rateLimitInsights: {
				callsPerHour,
				callsPerDay: this.stats.estimatedDailyCalls,
				efficiency,
				avgTimeBetweenCalls: 0, // Would calculate from actual intervals
			},
		};
	}

	/**
	 * Recommend optimal polling frequency based on usage patterns
	 */
	recommendPollingFrequency(
		topic: string,
		rateLimitBudget: number,
		otherTopics: string[] = []
	): {
		recommended: number; // milliseconds
		reasoning: string;
		dailyUsage: number;
	} {
		const topicVolatility = this.getTopicVolatility(topic);
		const totalTopics = otherTopics.length + 1;
		const budgetPerTopic = Math.floor(rateLimitBudget / totalTopics);

		// Calculate based on volatility and budget
		let recommended: number;
		let reasoning: string;

		if (topicVolatility > 0.7) {
			// High volatility - more frequent polling
			recommended = Math.max(
				60000,
				(24 * 60 * 60 * 1000) / (budgetPerTopic * 0.8)
			);
			reasoning = 'High volatility topic - frequent updates recommended';
		} else if (topicVolatility < 0.3) {
			// Low volatility - less frequent polling
			recommended = Math.max(
				300000,
				(24 * 60 * 60 * 1000) / (budgetPerTopic * 0.4)
			);
			reasoning = 'Low volatility topic - infrequent polling sufficient';
		} else {
			// Medium volatility
			recommended = Math.max(
				120000,
				(24 * 60 * 60 * 1000) / (budgetPerTopic * 0.6)
			);
			reasoning = 'Medium volatility topic - balanced polling frequency';
		}

		const dailyUsage = Math.ceil((24 * 60 * 60 * 1000) / recommended);

		return { recommended, reasoning, dailyUsage };
	}

	/**
	 * Stop all active polling
	 */
	stopAllPolling(): void {
		this.activePolls.forEach((intervalId) => {
			clearInterval(intervalId);
		});
		this.activePolls.clear();
	}

	/**
	 * Stop polling for specific topic
	 */
	stopPolling(topic: string): void {
		const pollsToStop: string[] = [];
		this.activePolls.forEach((intervalId, pollId) => {
			if (pollId.startsWith(topic)) {
				clearInterval(intervalId);
				pollsToStop.push(pollId);
			}
		});
		pollsToStop.forEach((pollId) => this.activePolls.delete(pollId));
	}

	// Private helper methods
	private validatePollingConfig(options: PollingOptions): void {
		if (options.interval < 10000) {
			console.warn(
				'Polling interval less than 10 seconds may hit rate limits quickly'
			);
		}

		if (options.topics.length > 10 && options.interval < 60000) {
			console.warn(
				`Polling ${options.topics.length} topics every ${options.interval}ms may exceed rate limits`
			);
		}
	}

	private calculateDailyUsage(interval: number, topicCount: number): number {
		const callsPerDay = (24 * 60 * 60 * 1000) / interval;
		return Math.ceil(callsPerDay * topicCount);
	}

	private detectChanges(
		oldData: any,
		newData: any,
		threshold: number
	): DataChange[] {
		const changes: DataChange[] = [];
		const fieldsToWatch = [
			'social_score',
			'sentiment_score',
			'post_count',
			'price',
		];

		fieldsToWatch.forEach((field) => {
			const oldValue = oldData[field];
			const newValue = newData[field];

			if (typeof oldValue === 'number' && typeof newValue === 'number') {
				const changePercent =
					oldValue !== 0 ? Math.abs((newValue - oldValue) / oldValue) * 100 : 0;

				if (changePercent >= threshold) {
					changes.push({
						field,
						oldValue,
						newValue,
						changePercent,
						timestamp: new Date(),
					});
				}
			}
		});

		return changes;
	}

	private isRateLimitError(error: any): boolean {
		return (
			error?.status === 429 ||
			error?.message?.toLowerCase().includes('rate limit') ||
			error?.message?.toLowerCase().includes('too many requests')
		);
	}

	private updateResponseTimeStats(responseTime: number): void {
		const currentAvg = this.stats.avgResponseTime;
		const totalCalls = this.stats.totalCalls;

		this.stats.avgResponseTime =
			totalCalls === 1
				? responseTime
				: (currentAvg * (totalCalls - 1) + responseTime) / totalCalls;
	}

	private getTopicVolatility(topic: string): number {
		// Simple heuristic - in real implementation, this could be based on historical data
		const volatilityMap: Record<string, number> = {
			bitcoin: 0.8,
			ethereum: 0.7,
			dogecoin: 0.9,
			tesla: 0.6,
			apple: 0.4,
			microsoft: 0.3,
		};

		return volatilityMap[topic.toLowerCase()] || 0.5;
	}
}
