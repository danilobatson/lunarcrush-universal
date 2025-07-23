import { LunarCrushConfig, createLunarCrushClient } from '../../services/lunarcrush';

// Create resolvers factory function
export const createResolvers = (lunarCrushConfig: LunarCrushConfig) => {
  const client = createLunarCrushClient(lunarCrushConfig);

  return {
    Query: {
      health: () => 'GraphQL server is running with ALL LunarCrush endpoints! 🚀',

      // ===== CRYPTO DATA RESOLVERS =====

      getCrypto: async (_: any, { symbol }: { symbol: string }) => {
        try {
          return await client.getCrypto(symbol);
        } catch (error) {
          console.error('Error fetching crypto:', error);
          throw new Error(`Failed to fetch crypto data for ${symbol}: ${error.message}`);
        }
      },

      getCryptoList: async (_: any, {
        symbols,
        limit = 50,
        realtime = false,
        sort
      }: {
        symbols?: string[],
        limit?: number,
        realtime?: boolean,
        sort?: string
      }) => {
        try {
          return await client.getCryptoList(symbols, limit, realtime);
        } catch (error) {
          console.error('Error fetching crypto list:', error);
          throw new Error(`Failed to fetch crypto list: ${error.message}`);
        }
      },

      getCryptoListV2: async (_: any, {
        symbols,
        limit = 50
      }: {
        symbols?: string[],
        limit?: number
      }) => {
        try {
          return await client.getCryptoListV2(symbols, limit);
        } catch (error) {
          console.error('Error fetching crypto list v2:', error);
          throw new Error(`Failed to fetch crypto list v2: ${error.message}`);
        }
      },

      getCryptoPriceHistory: async (
        _: any,
        { symbol, interval, metrics }: {
          symbol: string;
          interval?: string;
          metrics?: string;
        }
      ) => {
        try {
          return await client.getCryptoPriceHistory(symbol, interval, metrics);
        } catch (error) {
          console.error('Error fetching price history:', error);
          throw new Error(`Failed to fetch price history for ${symbol}: ${error.message}`);
        }
      },

      getCryptoMetadata: async (_: any, { symbol }: { symbol: string }) => {
        try {
          return await client.getCryptoMetadata(symbol);
        } catch (error) {
          console.error('Error fetching crypto metadata:', error);
          throw new Error(`Failed to fetch metadata for ${symbol}: ${error.message}`);
        }
      },

      // ===== SOCIAL INFLUENCER RESOLVERS =====

      getSocialInfluencers: async (_: any, {
        limit = 50,
        sort
      }: {
        limit?: number,
        sort?: string
      }) => {
        try {
          return await client.getSocialInfluencers(limit, sort);
        } catch (error) {
          console.error('Error fetching social influencers:', error);
          throw new Error(`Failed to fetch social influencers: ${error.message}`);
        }
      },

      getSocialInfluencer: async (_: any, {
        platform,
        id
      }: {
        platform: string,
        id: string
      }) => {
        try {
          return await client.getSocialInfluencer(platform, id);
        } catch (error) {
          console.error('Error fetching social influencer:', error);
          throw new Error(`Failed to fetch influencer ${platform}/${id}: ${error.message}`);
        }
      },

      getInfluencerPosts: async (_: any, {
        platform,
        id,
        start,
        end
      }: {
        platform: string,
        id: string,
        start?: string,
        end?: string
      }) => {
        try {
          return await client.getInfluencerPosts(platform, id, start, end);
        } catch (error) {
          console.error('Error fetching influencer posts:', error);
          throw new Error(`Failed to fetch posts for ${platform}/${id}: ${error.message}`);
        }
      },

      getCreatorTimeSeries: async (_: any, {
        platform,
        id,
        interval
      }: {
        platform: string,
        id: string,
        interval?: string
      }) => {
        try {
          return await client.getCreatorTimeSeries(platform, id, interval);
        } catch (error) {
          console.error('Error fetching creator time series:', error);
          throw new Error(`Failed to fetch time series for ${platform}/${id}: ${error.message}`);
        }
      },

      // ===== TOPIC CATEGORY RESOLVERS =====

      getTopicCategories: async (_: any, { limit = 50 }: { limit?: number }) => {
        try {
          return await client.getTopicCategories(limit);
        } catch (error) {
          console.error('Error fetching topic categories:', error);
          throw new Error(`Failed to fetch topic categories: ${error.message}`);
        }
      },

      getTopicCategory: async (_: any, { category }: { category: string }) => {
        try {
          return await client.getTopicCategory(category);
        } catch (error) {
          console.error('Error fetching topic category:', error);
          throw new Error(`Failed to fetch category ${category}: ${error.message}`);
        }
      },

      getCategoryPosts: async (_: any, {
        category,
        start,
        end
      }: {
        category: string,
        start?: string,
        end?: string
      }) => {
        try {
          return await client.getCategoryPosts(category, start, end);
        } catch (error) {
          console.error('Error fetching category posts:', error);
          throw new Error(`Failed to fetch posts for category ${category}: ${error.message}`);
        }
      },

      getCategoryTimeSeries: async (_: any, {
        category,
        interval
      }: {
        category: string,
        interval?: string
      }) => {
        try {
          return await client.getCategoryTimeSeries(category, interval);
        } catch (error) {
          console.error('Error fetching category time series:', error);
          throw new Error(`Failed to fetch time series for category ${category}: ${error.message}`);
        }
      },

      getCategoryCreators: async (_: any, { category }: { category: string }) => {
        try {
          return await client.getCategoryCreators(category);
        } catch (error) {
          console.error('Error fetching category creators:', error);
          throw new Error(`Failed to fetch creators for category ${category}: ${error.message}`);
        }
      },

      getCategoryNews: async (_: any, { category }: { category: string }) => {
        try {
          return await client.getCategoryNews(category);
        } catch (error) {
          console.error('Error fetching category news:', error);
          throw new Error(`Failed to fetch news for category ${category}: ${error.message}`);
        }
      },

      getCategoryTopics: async (_: any, { category }: { category: string }) => {
        try {
          return await client.getCategoryTopics(category);
        } catch (error) {
          console.error('Error fetching category topics:', error);
          throw new Error(`Failed to fetch topics for category ${category}: ${error.message}`);
        }
      },

      // ===== SOCIAL POSTS RESOLVERS =====

      getSocialPosts: async (
        _: any,
        { topic, start, end }: {
          topic: string;
          start?: string;
          end?: string;
        }
      ) => {
        try {
          return await client.getSocialPosts(topic, start, end);
        } catch (error) {
          console.error('Error fetching social posts:', error);
          throw new Error(`Failed to fetch social posts for ${topic}: ${error.message}`);
        }
      },

      getTopicCreators: async (_: any, { topic }: { topic: string }) => {
        try {
          return await client.getTopicCreators(topic);
        } catch (error) {
          console.error('Error fetching topic creators:', error);
          throw new Error(`Failed to fetch creators for topic ${topic}: ${error.message}`);
        }
      },

      // ===== POST RESOLVERS =====

      getPostDetails: async (_: any, {
        postType,
        postId
      }: {
        postType: string,
        postId: string
      }) => {
        try {
          return await client.getPostDetails(postType, postId);
        } catch (error) {
          console.error('Error fetching post details:', error);
          throw new Error(`Failed to fetch post ${postType}/${postId}: ${error.message}`);
        }
      },

      getPostTimeSeries: async (_: any, {
        postType,
        postId
      }: {
        postType: string,
        postId: string
      }) => {
        try {
          return await client.getPostTimeSeries(postType, postId);
        } catch (error) {
          console.error('Error fetching post time series:', error);
          throw new Error(`Failed to fetch time series for post ${postType}/${postId}: ${error.message}`);
        }
      },

      // ===== NEW TOPIC DETAIL RESOLVERS =====

      getTopic: async (_: any, { topic }: { topic: string }) => {
        try {
          return await client.getTopic(topic);
        } catch (error) {
          console.error('Error fetching topic:', error);
          throw new Error(`Failed to fetch topic ${topic}: ${error.message}`);
        }
      },

      getTopicTimeSeries: async (_: any, {
        topic,
        interval
      }: {
        topic: string,
        interval?: string
      }) => {
        try {
          return await client.getTopicTimeSeries(topic, interval);
        } catch (error) {
          console.error('Error fetching topic time series:', error);
          throw new Error(`Failed to fetch time series for topic ${topic}: ${error.message}`);
        }
      },

      // ===== NEW STOCKS RESOLVERS =====

      getStocksList: async (_: any, {}: {}) => {
        try {
          return await client.getStocksList();
        } catch (error) {
          console.error('Error fetching stocks list:', error);
          throw new Error(`Failed to fetch stocks list: ${error.message}`);
        }
      },

    },

    // ===== FUTURE: SUBSCRIPTION RESOLVERS =====
    Subscription: {
      // Placeholder for real-time features
      cryptoPriceUpdates: {
        subscribe: () => {
          // TODO: Implement WebSocket subscription for real-time crypto prices
          throw new Error('Real-time subscriptions not implemented yet');
        }
      },

      socialSentimentUpdates: {
        subscribe: () => {
          // TODO: Implement WebSocket subscription for real-time social sentiment
          throw new Error('Real-time subscriptions not implemented yet');
        }
      },
    },
  };
};
