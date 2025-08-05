/**
 * 📝 Content Generator - Create viral-optimized content from LunarCrush data
 * Generates reports, insights, and summaries perfect for articles and social media
 */

import { GraphQLClient } from '../client/GraphQLClient';
import { TrendingReport } from '../LunarCrushUniversal';

export class ContentGenerator {
	constructor(private graphqlClient: GraphQLClient) {}

	/**
	 * Generate a comprehensive trending report for content creation
	 */
	async generateTrendingReport(
		_category: string = 'crypto'
	): Promise<TrendingReport> {
		const topics = await this.graphqlClient.getTrendingTopics({
			limit: 20,
			timeframe: 'ONE_DAY',
		});

		const coins = await this.graphqlClient.getTopCoins({
			limit: 10,
			sortBy: 'social_score',
		});

		// Process topics for the report
		const reportTopics = topics.slice(0, 10).map((topic: any) => ({
			name: topic.name,
			score: topic.social_score || 0,
			sentiment: topic.sentiment_score || 0,
			change24h: topic.change24h || 0,
		}));

		// Generate insights
		const insights = this.generateInsightsFromData(topics, coins);
		const recommendations = this.generateRecommendations(topics, coins);

		return {
			topics: reportTopics,
			insights,
			recommendations,
			generatedAt: new Date(),
		};
	}

	/**
	 * Generate market insights for multiple assets
	 */
	async generateMarketInsights(symbols: string[]): Promise<string[]> {
		const insights: string[] = [];

		for (const symbol of symbols) {
			try {
				const coin = await this.graphqlClient.getCoin(symbol);
				const insight = this.generateCoinInsight(coin);
				if (insight) insights.push(insight);
			} catch (error) {
				console.warn(`Could not generate insight for ${symbol}:`, error);
			}
		}

		return insights;
	}

	/**
	 * Generate social summary for a topic (perfect for article intros)
	 */
	async generateSocialSummary(topic: string): Promise<string> {
		try {
			const topicData = await this.graphqlClient.getTopic(topic);
			return this.generateTopicSummary(topicData);
		} catch (error) {
			console.warn(`Could not generate summary for ${topic}:`, error);
			return `Unable to generate summary for ${topic}. Please check the topic name and try again.`;
		}
	}

	/**
	 * Generate insights from trending data
	 */
	private generateInsightsFromData(topics: any[], _coins: any[]): string[] {
		const insights: string[] = [];

		// Sentiment analysis
		const avgSentiment =
			topics.reduce((sum, t) => sum + (t.sentiment_score || 0), 0) /
			topics.length;
		if (avgSentiment > 0.3) {
			insights.push(
				`📈 Overall market sentiment is bullish with an average score of ${avgSentiment.toFixed(2)}`
			);
		} else if (avgSentiment < -0.3) {
			insights.push(
				`📉 Market sentiment is bearish with an average score of ${avgSentiment.toFixed(2)}`
			);
		} else {
			insights.push(
				`😐 Market sentiment is neutral with an average score of ${avgSentiment.toFixed(2)}`
			);
		}

		// Volatility insights
		const highVolatility = topics.filter(
			(t) => Math.abs(t.change24h || 0) > 50
		);
		if (highVolatility.length > 3) {
			insights.push(
				`⚡ High volatility detected: ${highVolatility.length} topics showing >50% changes`
			);
		}

		// Top performer
		const topTopic = topics[0];
		if (topTopic) {
			insights.push(
				`🏆 "${topTopic.name}" is leading discussions with a social score of ${topTopic.social_score}`
			);
		}

		// Emerging trends
		const emergingTopics = topics.filter((t) => (t.change24h || 0) > 100);
		if (emergingTopics.length > 0) {
			insights.push(
				`🚀 Emerging trends: ${emergingTopics.map((t) => t.name).join(', ')} showing rapid growth`
			);
		}

		return insights;
	}

	/**
	 * Generate actionable recommendations
	 */
	private generateRecommendations(topics: any[], _coins: any[]): string[] {
		const recommendations: string[] = [];

		// Content opportunities
		const highSentiment = topics.filter((t) => (t.sentiment_score || 0) > 0.5);
		if (highSentiment.length > 0) {
			recommendations.push(
				`✍️ Create positive content around: ${highSentiment
					.slice(0, 3)
					.map((t) => t.name)
					.join(', ')}`
			);
		}

		const controversial = topics.filter(
			(t) => Math.abs(t.sentiment_score || 0) > 0.7
		);
		if (controversial.length > 0) {
			recommendations.push(
				`🔥 Engage in trending debates about: ${controversial
					.slice(0, 2)
					.map((t) => t.name)
					.join(', ')}`
			);
		}

		// Timing recommendations
		const rapidGrowth = topics.filter((t) => (t.change24h || 0) > 200);
		if (rapidGrowth.length > 0) {
			recommendations.push(
				`⏰ Act fast on: ${rapidGrowth[0].name} - showing explosive growth`
			);
		}

		// Diversification
		const categories = [
			...new Set(topics.map((t) => t.category).filter(Boolean)),
		];
		if (categories.length > 3) {
			recommendations.push(
				`🎯 Diversify content across categories: ${categories.slice(0, 4).join(', ')}`
			);
		}

		return recommendations;
	}

	/**
	 * Generate insight for a specific coin
	 */
	private generateCoinInsight(coin: any): string | null {
		if (!coin) return null;

		const sentiment = coin.sentiment_score || 0;
		const socialScore = coin.social_score || 0;
		const priceChange = coin.price_change_24h || 0;

		let insight = `${coin.symbol}: `;

		// Social vs Price correlation
		if (socialScore > 70 && priceChange > 5) {
			insight += `Strong social buzz (${socialScore}) correlating with +${priceChange.toFixed(2)}% price gain`;
		} else if (socialScore > 70 && priceChange < -5) {
			insight += `High social activity (${socialScore}) despite -${Math.abs(priceChange).toFixed(2)}% price drop - potential buying opportunity`;
		} else if (socialScore < 30 && priceChange > 10) {
			insight += `Price pumping +${priceChange.toFixed(2)}% with low social buzz (${socialScore}) - watch for FOMO`;
		} else {
			insight += `Moderate activity with ${socialScore} social score and ${priceChange.toFixed(2)}% price change`;
		}

		// Add sentiment context
		if (sentiment > 0.5) {
			insight += ` - Community is optimistic`;
		} else if (sentiment < -0.5) {
			insight += ` - Community sentiment is negative`;
		}

		return insight;
	}

	/**
	 * Generate comprehensive topic summary
	 */
	private generateTopicSummary(topicData: any): string {
		const {
			name,
			social_score,
			sentiment_score,
			post_count,
			creator_count,
			whatsup,
		} = topicData;

		let summary = `${name} is currently `;

		// Activity level
		if (social_score > 80) {
			summary += 'extremely active ';
		} else if (social_score > 50) {
			summary += 'highly active ';
		} else if (social_score > 20) {
			summary += 'moderately active ';
		} else {
			summary += 'showing limited activity ';
		}

		summary += `in social discussions with a score of ${social_score}. `;

		// Sentiment context
		if (sentiment_score > 0.3) {
			summary += `The community sentiment is positive (${sentiment_score.toFixed(2)}), `;
		} else if (sentiment_score < -0.3) {
			summary += `The community sentiment is negative (${sentiment_score.toFixed(2)}), `;
		} else {
			summary += `The community sentiment is neutral (${sentiment_score.toFixed(2)}), `;
		}

		// Engagement stats
		summary += `with ${post_count || 0} recent posts from ${creator_count || 0} creators. `;

		// Add whatsup insights if available
		if (whatsup?.summary) {
			summary += `Key developments: ${whatsup.summary}`;
		}

		return summary;
	}

	/**
	 * Generate viral-optimized headlines
	 */
	generateViralHeadlines(topic: string, data: any): string[] {
		const headlines: string[] = [];
		const sentiment = data.sentiment_score || 0;
		const change = data.change24h || 0;

		// Controversy-driven headlines
		if (Math.abs(sentiment) > 0.7) {
			headlines.push(
				`Why Everyone Is ${sentiment > 0 ? 'Obsessed' : 'Panicking'} About ${topic}`
			);
			headlines.push(`The ${topic} Debate That's Dividing the Internet`);
		}

		// Growth-driven headlines
		if (change > 100) {
			headlines.push(
				`${topic} Just Exploded ${change.toFixed(0)}% - Here's Why`
			);
			headlines.push(
				`I Analyzed ${topic}'s Viral Moment - The Results Shocked Me`
			);
		}

		// Mystery/curiosity headlines
		headlines.push(`The ${topic} Pattern Everyone Missed (Until Now)`);
		headlines.push(`What ${topic} Reveals About the Future of Crypto`);
		headlines.push(`5 Things About ${topic} That Will Blow Your Mind`);

		return headlines;
	}

	/**
	 * Generate social media posts
	 */
	generateSocialPosts(
		topic: string,
		data: any
	): {
		twitter: string;
		linkedin: string;
		tiktok: string;
	} {
		const sentiment = data.sentiment_score || 0;
		const socialScore = data.social_score || 0;

		return {
			twitter: `🔥 ${topic} is trending with ${socialScore} social score! ${sentiment > 0 ? '📈' : sentiment < 0 ? '📉' : '😐'} Community sentiment: ${sentiment > 0 ? 'Bullish' : sentiment < 0 ? 'Bearish' : 'Neutral'} #crypto #${topic.toLowerCase().replace(/\s+/g, '')}`,

			linkedin: `Interesting developments in ${topic}: Social engagement has reached ${socialScore} with community sentiment at ${sentiment.toFixed(2)}. This presents ${sentiment > 0 ? 'opportunities' : 'challenges'} for investors and content creators alike. What's your take on the current ${topic} landscape?`,

			tiktok: `POV: You're tracking ${topic} and see it hit ${socialScore} social score 👀 ${sentiment > 0 ? 'Bullish vibes' : sentiment < 0 ? 'Bear market feelings' : 'Neutral energy'} only ✨ #${topic.toLowerCase().replace(/\s+/g, '')} #cryptocheck #socialmedia`,
		};
	}
}
