// 🌙 Backend Package - Generated Type Usage Examples
// ==================================================
// Use generated types in your GraphQL resolvers

import {
  TopicListItem,
  CoinDetails,
  TopicDetails,
  CreatorDetails,
  CategoryListItem
} from './generated/types';

// Example resolver using generated types
export const resolvers = {
  Query: {
    getTopic: async (_, { topic }): Promise<TopicDetails> => {
      // Your LunarCrush API call here
      return {
        topic,
        title: "Bitcoin",
        topic_rank: 1,
        // ... all other TopicDetails fields
      };
    },

    getCoin: async (_, { coin }): Promise<CoinDetails> => {
      // Your LunarCrush API call here
      return {
        id: 1,
        name: "Bitcoin",
        symbol: "BTC",
        // ... all other CoinDetails fields
      };
    }
  }
};
