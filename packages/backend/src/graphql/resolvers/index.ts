import { LunarCrushConfig, createLunarCrushClient } from '../../services/lunarcrush';

// Helper to map GraphQL intervals to API intervals
const mapInterval = (interval: string): '1d' | '1w' | '1m' | '3m' | '6m' | '1y' => {
  const mapping: Record<string, '1d' | '1w' | '1m' | '3m' | '6m' | '1y'> = {
    'ONE_DAY': '1d',
    'ONE_WEEK': '1w',
    'ONE_MONTH': '1m',
    'THREE_MONTHS': '3m',
    'SIX_MONTHS': '6m',
    'ONE_YEAR': '1y',
  };
  return mapping[interval] || '1w';
};

// Create resolvers factory function
export const createResolvers = (lunarCrushConfig: LunarCrushConfig) => {
  const client = createLunarCrushClient(lunarCrushConfig);

  return {
    Query: {
      health: () => 'GraphQL server is running!',
      
      coin: async (_: any, { symbol }: { symbol: string }) => {
        try {
          return await client.getCoin(symbol);
        } catch (error) {
          console.error('Error fetching coin:', error);
          throw new Error(`Failed to fetch coin data for ${symbol}`);
        }
      },

      coins: async (_: any, { symbols, limit }: { symbols?: string[], limit?: number }) => {
        try {
          return await client.getCoins(symbols, limit);
        } catch (error) {
          console.error('Error fetching coins:', error);
          throw new Error('Failed to fetch coins data');
        }
      },

      coinTimeSeries: async (
        _: any,
        { symbol, interval = 'ONE_WEEK', metrics = ['price', 'volume', 'market_cap'] }: {
          symbol: string;
          interval?: string;
          metrics?: string[];
        }
      ) => {
        try {
          return await client.getCoinTimeSeries(symbol, mapInterval(interval), metrics);
        } catch (error) {
          console.error('Error fetching time series:', error);
          throw new Error(`Failed to fetch time series for ${symbol}`);
        }
      },

      socialPosts: async (
        _: any,
        { topic, interval = 'ONE_DAY', limit = 20 }: {
          topic: string;
          interval?: string;
          limit?: number;
        }
      ) => {
        try {
          return await client.getSocialPosts(topic, mapInterval(interval) as '1d' | '1w' | '1m', limit);
        } catch (error) {
          console.error('Error fetching social posts:', error);
          throw new Error(`Failed to fetch social posts for ${topic}`);
        }
      },

      globalMetrics: async () => {
        try {
          return await client.getGlobalMetrics();
        } catch (error) {
          console.error('Error fetching global metrics:', error);
          throw new Error('Failed to fetch global metrics');
        }
      },
    },
  };
};
