import { createGraphQLClient, GraphQLClient } from '../utils/graphql';
import type { LunarCrushClientConfig } from '@lunarcrush/shared-types';
import { GRAPHQL_QUERIES } from '@lunarcrush/shared-types';

export class LunarCrushClient {
	private client: GraphQLClient;

	constructor(config: LunarCrushClientConfig = {}) {
		this.client = createGraphQLClient({
			endpoint:
				config.endpoint ||
				'https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/graphql',
			headers: config.headers,
		});
	}

	// ===== HEALTH =====
	async health(): Promise<string> {
		const response = await this.client.request(GRAPHQL_QUERIES.HEALTH);
		return response.health;
	}

	// ===== TOPICS METHODS (STANDARDIZED) =====

	/**
	 * Get list of trending topics
	 */
	async getTopicsList(): Promise<any[]> {
		const response = await this.client.request(GRAPHQL_QUERIES.GET_TOPICS_LIST);
		return response.getTopicsList;
	}

	/**
	 * Get detailed information for a specific topic
	 * @param topic Topic name or hashtag
	 */
	async getTopic(topic: string): Promise<any> {
		const response = await this.client.request(GRAPHQL_QUERIES.GET_TOPIC, {
			topic,
		});
		return response.getTopic;
	}

	/**
	 * Get AI-generated summary for a topic
	 * @param topic Topic name or hashtag
	 */
	async getTopicWhatsup(topic: string): Promise<any> {
		const response = await this.client.request(
			GRAPHQL_QUERIES.GET_TOPIC_WHATSUP,
			{ topic }
		);
		return response.getTopicWhatsup;
	}

	/**
	 * Get time series data for a topic
	 * @param topic Topic name or hashtag
	 * @param options Time series parameters
	 */
	async getTopicTimeSeries(
		topic: string,
		options: {
			bucket?: string;
			interval?: string;
			start?: string;
			end?: string;
		} = {}
	): Promise<any[]> {
		const response = await this.client.request(
			GRAPHQL_QUERIES.GET_TOPIC_TIME_SERIES,
			{
				topic,
				...options,
			}
		);
		return response.getTopicTimeSeries;
	}

	/**
	 * Get posts related to a topic
	 * @param topic Topic name or hashtag
	 * @param options Time range parameters
	 */
	async getTopicPosts(
		topic: string,
		options: {
			start?: string;
			end?: string;
		} = {}
	): Promise<any[]> {
		const response = await this.client.request(
			GRAPHQL_QUERIES.GET_TOPIC_POSTS,
			{
				topic,
				...options,
			}
		);
		return response.getTopicPosts;
	}

	/**
	 * Get news related to a topic
	 * @param topic Topic name or hashtag
	 */
	async getTopicNews(topic: string): Promise<any[]> {
		const response = await this.client.request(GRAPHQL_QUERIES.GET_TOPIC_NEWS, {
			topic,
		});
		return response.getTopicNews;
	}

	/**
	 * Get creators discussing a topic
	 * @param topic Topic name or hashtag
	 */
	async getTopicCreators(topic: string): Promise<any[]> {
		const response = await this.client.request(
			GRAPHQL_QUERIES.GET_TOPIC_CREATORS,
			{ topic }
		);
		return response.getTopicCreators;
	}

	// ===== COINS METHODS (STANDARDIZED) =====

	/**
	 * Get list of cryptocurrencies with social and price data
	 * @param options Query parameters for filtering and pagination
	 */
	async getCoinsList(
		options: {
			sort?: string;
			filter?: string;
			limit?: number;
			desc?: string;
			page?: number;
		} = {}
	): Promise<any[]> {
		const response = await this.client.request(
			GRAPHQL_QUERIES.GET_COINS_LIST,
			options
		);
		return response.getCoinsList;
	}

	/**
	 * Get detailed information for a single cryptocurrency
	 * @param coin Cryptocurrency symbol or name (e.g., 'BTC', 'bitcoin')
	 */
	async getCoin(coin: string): Promise<any> {
		const response = await this.client.request(GRAPHQL_QUERIES.GET_COIN, {
			coin,
		});
		return response.getCoin;
	}

	/**
	 * Get time series data for a cryptocurrency
	 * @param coin Cryptocurrency symbol or name
	 * @param options Time series parameters
	 */
	async getCoinTimeSeries(
		coin: string,
		options: {
			bucket?: string;
			interval?: string;
			start?: string;
			end?: string;
		} = {}
	): Promise<any[]> {
		const response = await this.client.request(
			GRAPHQL_QUERIES.GET_COIN_TIME_SERIES,
			{
				coin,
				...options,
			}
		);
		return response.getCoinTimeSeries;
	}

	/**
	 * Get metadata for a cryptocurrency
	 * @param coin Cryptocurrency symbol or name
	 */
	async getCoinMeta(coin: string): Promise<any> {
		const response = await this.client.request(GRAPHQL_QUERIES.GET_COIN_META, {
			coin,
		});
		return response.getCoinMeta;
	}

	// ===== BACKWARD COMPATIBILITY ALIASES =====
	// These provide backward compatibility for existing SDK users

	/**
	 * @deprecated Use getTopic() instead
	 */
	async topic(topic: string): Promise<any> {
		console.warn('⚠️  topic() is deprecated, use getTopic() instead');
		return this.getTopic(topic);
	}

	/**
	 * @deprecated Use getTopicsList() instead
	 */
	async topics(): Promise<any[]> {
		console.warn('⚠️  topics() is deprecated, use getTopicsList() instead');
		return this.getTopicsList();
	}

	/**
	 * @deprecated Use getTopicTimeSeries() instead
	 */
	async topicTimeSeries(
		topic: string,
		options: {
			bucket?: string;
			interval?: string;
			start?: string;
			end?: string;
		} = {}
	): Promise<any[]> {
		console.warn(
			'⚠️  topicTimeSeries() is deprecated, use getTopicTimeSeries() instead'
		);
		return this.getTopicTimeSeries(topic, options);
	}

	/**
	 * @deprecated Use getTopicPosts() instead
	 */
	async topicPosts(
		topic: string,
		options: {
			start?: string;
			end?: string;
		} = {}
	): Promise<any[]> {
		console.warn('⚠️  topicPosts() is deprecated, use getTopicPosts() instead');
		return this.getTopicPosts(topic, options);
	}

	/**
	 * @deprecated Use getTopicNews() instead
	 */
	async topicNews(topic: string): Promise<any[]> {
		console.warn('⚠️  topicNews() is deprecated, use getTopicNews() instead');
		return this.getTopicNews(topic);
	}

	/**
	 * @deprecated Use getCoin() instead
	 */
	async cryptocurrency(coin: string): Promise<any> {
		console.warn('⚠️  cryptocurrency() is deprecated, use getCoin() instead');
		return this.getCoin(coin);
	}

	/**
	 * @deprecated Use getCoinsList() instead
	 */
	async cryptocurrencies(
		options: {
			sort?: string;
			filter?: string;
			limit?: number;
			desc?: string;
			page?: number;
		} = {}
	): Promise<any[]> {
		console.warn(
			'⚠️  cryptocurrencies() is deprecated, use getCoinsList() instead'
		);
		return this.getCoinsList(options);
	}

	/**
	 * @deprecated Use getCoinTimeSeries() instead
	 */
	async cryptocurrencyTimeSeries(
		coin: string,
		options: {
			bucket?: string;
			interval?: string;
			start?: string;
			end?: string;
		} = {}
	): Promise<any[]> {
		console.warn(
			'⚠️  cryptocurrencyTimeSeries() is deprecated, use getCoinTimeSeries() instead'
		);
		return this.getCoinTimeSeries(coin, options);
	}

	/**
	 * Convenience method for Bitcoin data
	 * @deprecated Use getCoin('btc') instead
	 */
	async bitcoin(): Promise<any> {
		console.warn('⚠️  bitcoin() is deprecated, use getCoin("btc") instead');
		return this.getCoin('btc');
	}

	/**
	 * Convenience method for Ethereum data
	 * @deprecated Use getCoin('eth') instead
	 */
	async ethereum(): Promise<any> {
		console.warn('⚠️  ethereum() is deprecated, use getCoin("eth") instead');
		return this.getCoin('eth');
	}
}

export default LunarCrushClient;
