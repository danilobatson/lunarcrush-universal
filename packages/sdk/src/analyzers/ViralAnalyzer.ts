/**
 * 🎯 Viral Analyzer - Social engagement analysis
 * Uses social metrics and engagement patterns for analysis
 */

import { GraphQLClient } from '../client/GraphQLClient';

export class ViralAnalyzer {
	constructor(private graphqlClient: GraphQLClient) {}

	/**
	 * Calculate engagement score for a topic
	 */
	async calculateEngagement(topic: string): Promise<number> {
		try {
			const topicData = await this.graphqlClient.getTopic(topic);

			if (!topicData) return 0;

			// Use available properties from TopicDetails interface
			const interactions = topicData.interactions_24h || 0;
			const posts = topicData.num_posts || 0;
			const contributors = topicData.num_contributors || 0;

			// Simple engagement calculation using available data
			return (interactions * 0.5 + posts * 0.3 + contributors * 0.2) / 100;
		} catch (error) {
			console.warn(`Could not calculate engagement for ${topic}:`, error);
			return 0;
		}
	}

	/**
	 * Get sentiment analysis for a topic
	 */
	async getSentimentAnalysis(topic: string): Promise<{
		sentiment: number;
		positiveRatio: number;
		posts: number;
	}> {
		try {
			const topicData = await this.graphqlClient.getTopic(topic);

			if (!topicData) {
				return { sentiment: 0, positiveRatio: 0, posts: 0 };
			}

			// Use available data from topic details
			const posts = topicData.num_posts || 0;
			const interactions = topicData.interactions_24h || 0;

			// Calculate sentiment based on available data
			// This is a simplified calculation - in real implementation,
			// you'd need actual post data or sentiment scores
			const sentiment = interactions > 0 ? Math.min(interactions / 1000, 1) : 0;
			const positiveRatio = sentiment > 0.5 ? 0.7 : 0.3;

			return {
				sentiment,
				positiveRatio,
				posts,
			};
		} catch (error) {
			console.warn(`Could not analyze sentiment for ${topic}:`, error);
			return { sentiment: 0, positiveRatio: 0, posts: 0 };
		}
	}

	/**
	 * Calculate viral potential for a specific topic
	 */
	async getViralPotential(topic: string): Promise<number> {
		try {
			const topicData = await this.graphqlClient.getTopic(topic);
			if (!topicData) return 0;

			return this.calculateViralScore({
				socialScore: topicData.interactions_24h || 0,
				sentimentScore: 0, // Would need actual sentiment data
				changeRate: 0, // Would need historical data
				engagement: topicData.num_posts || 0,
			});
		} catch (error) {
			console.warn(`Could not analyze viral potential for ${topic}:`, error);
			return 0;
		}
	}

	/**
	 * Calculate viral score using algorithmic approach
	 */
	private calculateViralScore(metrics: {
		socialScore: number;
		sentimentScore: number;
		changeRate: number;
		engagement: number;
	}): number {
		const { socialScore, sentimentScore, changeRate, engagement } = metrics;

		// Normalize scores (0-1)
		const normalizedSocial = Math.min(socialScore / 100, 1);
		const normalizedSentiment = (sentimentScore + 1) / 2; // -1 to 1 → 0 to 1
		const normalizedChange = Math.min(Math.abs(changeRate) / 100, 1);
		const normalizedEngagement = Math.min(engagement / 10000, 1);

		// Weighted viral score calculation
		const viralScore =
			normalizedSocial * 0.3 + // Social score weight: 30%
			normalizedSentiment * 0.2 + // Sentiment weight: 20%
			normalizedChange * 0.3 + // Change rate weight: 30%
			normalizedEngagement * 0.2; // Engagement weight: 20%

		// Boost score for extreme sentiment (both positive and negative go viral)
		const sentimentBoost = Math.abs(sentimentScore) > 0.7 ? 0.2 : 0;

		// Boost score for rapid changes
		const velocityBoost = Math.abs(changeRate) > 50 ? 0.15 : 0;

		return Math.min(viralScore + sentimentBoost + velocityBoost, 1);
	}
}
