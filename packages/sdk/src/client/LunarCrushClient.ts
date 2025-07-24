import { createGraphQLClient, GraphQLClient } from '../utils/graphql';
import {
  HEALTH_QUERY,
  GET_TOPIC_QUERY,
  GET_TOPICS_LIST_QUERY,
  GET_COINS_LIST_QUERY,
  GET_COIN_QUERY,
  GET_STOCKS_LIST_QUERY,
  GET_STOCK_QUERY,
  GET_CATEGORIES_LIST_QUERY,
  GET_CATEGORY_QUERY,
  GET_CREATORS_LIST_QUERY,
  GET_CREATOR_QUERY,
  GET_TOPIC_TIME_SERIES_QUERY,
  GET_COIN_TIME_SERIES_QUERY,
  GET_TOPIC_POSTS_QUERY,
  GET_TOPIC_NEWS_QUERY,
  GET_SEARCHES_LIST_QUERY,
  SEARCH_POSTS_QUERY,
  GET_SYSTEM_CHANGES_QUERY,
} from '../utils/queries';

export interface LunarCrushClientConfig {
  endpoint?: string;
  headers?: Record<string, string>;
}

export class LunarCrushClient {
  private client: GraphQLClient;

  constructor(config: LunarCrushClientConfig = {}) {
    this.client = createGraphQLClient({
      endpoint: config.endpoint || 'https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/graphql',
      headers: config.headers,
    });
  }

  // ===== HEALTH =====
  async health(): Promise<string> {
    const response = await this.client.request(HEALTH_QUERY);
    return response.health;
  }

  // ===== TOPICS METHODS (COMPREHENSIVE) =====

  async topic(topic: string): Promise<any> {
    const response = await this.client.request(GET_TOPIC_QUERY, { topic });
    return response.getTopic;
  }

  async topics(): Promise<any[]> {
    const response = await this.client.request(GET_TOPICS_LIST_QUERY);
    return response.getTopicsList;
  }

  async topicTimeSeries(
    topic: string,
    options: {
      bucket?: string;
      interval?: string;
      start?: string;
      end?: string;
    } = {}
  ): Promise<any[]> {
    const response = await this.client.request(GET_TOPIC_TIME_SERIES_QUERY, {
      topic,
      ...options,
    });
    return response.getTopicTimeSeries;
  }

  async topicPosts(
    topic: string,
    options: {
      start?: string;
      end?: string;
    } = {}
  ): Promise<any[]> {
    const response = await this.client.request(GET_TOPIC_POSTS_QUERY, {
      topic,
      ...options,
    });
    return response.getTopicPosts;
  }

  async topicNews(topic: string): Promise<any[]> {
    const response = await this.client.request(GET_TOPIC_NEWS_QUERY, { topic });
    return response.getTopicNews;
  }

  // ===== COINS METHODS (COMPREHENSIVE) =====

  async cryptocurrencies(
    options: {
      sort?: string;
      filter?: string;
      limit?: number;
      desc?: string;
      page?: number;
    } = {}
  ): Promise<any[]> {
    const response = await this.client.request(GET_COINS_LIST_QUERY, options);
    return response.getCoinsList;
  }

  async cryptocurrency(coin: string): Promise<any> {
    const response = await this.client.request(GET_COIN_QUERY, { coin });
    return response.getCoin;
  }

  async cryptocurrencyTimeSeries(
    coin: string,
    options: {
      bucket?: string;
      interval?: string;
      start?: string;
      end?: string;
    } = {}
  ): Promise<any[]> {
    const response = await this.client.request(GET_COIN_TIME_SERIES_QUERY, {
      coin,
      ...options,
    });
    return response.getCoinTimeSeries;
  }

  // ===== STOCKS METHODS (NEW) =====

  async stocks(
    options: {
      sort?: string;
      limit?: number;
      desc?: string;
      page?: number;
    } = {}
  ): Promise<any[]> {
    const response = await this.client.request(GET_STOCKS_LIST_QUERY, options);
    return response.getStocksList;
  }

  async stock(stock: string): Promise<any> {
    const response = await this.client.request(GET_STOCK_QUERY, { stock });
    return response.getStock;
  }

  // ===== CATEGORIES METHODS (NEW) =====

  async categories(): Promise<any[]> {
    const response = await this.client.request(GET_CATEGORIES_LIST_QUERY);
    return response.getCategoriesList;
  }

  async category(category: string): Promise<any> {
    const response = await this.client.request(GET_CATEGORY_QUERY, { category });
    return response.getCategory;
  }

  // ===== CREATORS METHODS (NEW) =====

  async creators(): Promise<any[]> {
    const response = await this.client.request(GET_CREATORS_LIST_QUERY);
    return response.getCreatorsList;
  }

  async creator(network: string, id: string): Promise<any> {
    const response = await this.client.request(GET_CREATOR_QUERY, { network, id });
    return response.getCreator;
  }

  // ===== SEARCH METHODS (NEW) =====

  async searches(): Promise<any[]> {
    const response = await this.client.request(GET_SEARCHES_LIST_QUERY);
    return response.getSearchesList;
  }

  async searchPosts(term?: string, searchJson?: string): Promise<any> {
    const response = await this.client.request(SEARCH_POSTS_QUERY, { term, searchJson });
    return response.searchPosts;
  }

  // ===== SYSTEM METHODS (NEW) =====

  async systemChanges(): Promise<any[]> {
    const response = await this.client.request(GET_SYSTEM_CHANGES_QUERY);
    return response.getSystemChanges;
  }

  // ===== CONVENIENT ALIASES (MAINTAINING BACKWARD COMPATIBILITY) =====

  async bitcoin(): Promise<any> {
    return this.topic('bitcoin');
  }

  async ethereum(): Promise<any> {
    return this.topic('ethereum');
  }

  async topCryptos(limit = 10): Promise<any[]> {
    return this.cryptocurrencies({ limit, sort: 'galaxy_score' });
  }

  // ===== COMPREHENSIVE DATA SHOWCASE METHODS =====

  async getComprehensiveTopicData(topic: string): Promise<{
    details: any;
    timeSeries: any[];
    posts: any[];
    news: any[];
  }> {
    const [details, timeSeries, posts, news] = await Promise.all([
      this.topic(topic),
      this.topicTimeSeries(topic, { bucket: '1d' }),
      this.topicPosts(topic),
      this.topicNews(topic),
    ]);

    return { details, timeSeries, posts, news };
  }

  async getComprehensiveCryptoData(coin: string): Promise<{
    details: any;
    timeSeries: any[];
  }> {
    const [details, timeSeries] = await Promise.all([
      this.cryptocurrency(coin),
      this.cryptocurrencyTimeSeries(coin, { bucket: '1d' }),
    ]);

    return { details, timeSeries };
  }
}
