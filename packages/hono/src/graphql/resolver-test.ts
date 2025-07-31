// Simple resolver test to debug null responses
export const testResolvers = {
  Query: {
    health: () => {
      console.log('🟢 Health resolver called!');
      return 'WORKING!';
    },

    hello: () => {
      console.log('🟢 Hello resolver called!');
      return 'Hello from resolver test!';
    },

    // Test with mock data
    getTopicsList: () => {
      console.log('🟢 getTopicsList resolver called!');
      return [
        {
          topic: 'bitcoin',
          title: 'Bitcoin',
          topic_rank: 1,
          topic_rank_1h_previous: 1,
          topic_rank_24h_previous: 2,
          num_contributors: 10000,
          num_posts: 50000,
          interactions_24h: 1000000
        }
      ];
    },

    getTopic: (_, { topic }) => {
      console.log('🟢 getTopic resolver called with:', topic);
      return {
        topic,
        title: topic?.charAt(0).toUpperCase() + topic?.slice(1) || 'Unknown',
        topic_rank: 1,
        interactions_24h: 1000000,
        num_contributors: 10000,
        num_posts: 50000,
        categories: ['cryptocurrencies'],
        trend: 'up',
        related_topics: ['crypto', 'blockchain'],
        types_count: {},
        types_interactions: {},
        types_sentiment: {},
        types_sentiment_detail: {}
      };
    },

    getCoinsList: () => {
      console.log('🟢 getCoinsList resolver called!');
      return [
        {
          id: 1,
          name: 'Bitcoin',
          symbol: 'BTC',
          logo: 'https://example.com/btc.png',
          price: 45000,
          market_cap: 850000000000,
          alt_rank: 1,
          alt_rank_previous: 1,
          interactions_24h: 1000000,
          sentiment: 75.5,
          social_dominance: 45.2,
          categories: ['cryptocurrencies'],
          galaxy_score: 85.5,
          galaxy_score_previous: 84.2,
          market_cap_rank: 1,
          market_dominance: 45.2,
          market_dominance_prev: 44.8,
          percent_change_1h: 0.5,
          percent_change_24h: 2.3,
          percent_change_7d: 5.1,
          percent_change_30d: 12.8,
          price_btc: 1.0,
          social_volume_24h: 500000,
          topic: 'bitcoin',
          volatility: 3.2,
          volume_24h: 25000000000,
          circulating_supply: 19500000,
          max_supply: 21000000,
          blockchains: [],
          last_updated_price: Date.now(),
          last_updated_price_by: 'test'
        }
      ];
    },

    getCategory: (_, { category }) => {
      console.log('🟢 getCategory resolver called with:', category);
      return {
        category,
        title: category?.charAt(0).toUpperCase() + category?.slice(1) || 'Unknown',
        topic: category,
        interactions_24h: 500000,
        num_contributors: 5000,
        num_posts: 25000,
        trend: 'up',
        related_topics: ['crypto'],
        types_count: {},
        types_interactions: {},
        types_sentiment: {}
      };
    }
  }
};

export default testResolvers;
