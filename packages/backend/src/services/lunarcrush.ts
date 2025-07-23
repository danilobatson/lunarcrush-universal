// Types and interfaces
export interface LunarCrushConfig {
  apiKey: string;
  baseUrl?: string;
}

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
  volume_24h: number;
  galaxy_score?: number;
  alt_rank?: number;
  sentiment?: number;
  social_dominance?: number;
  posts_24h?: number;
  contributors_24h?: number;
  interactions_24h?: number;
}

export interface TimeSeriesData {
  time: string;
  price: number;
  volume: number;
  market_cap: number;
  sentiment?: number;
  social_dominance?: number;
  interactions?: number;
}

export interface SocialPost {
  id: string;
  platform: string;
  content: string;
  author: string;
  followers: number;
  interactions: number;
  sentiment: number;
  created_at: string;
  url?: string;
}

export interface GlobalMetrics {
  total_market_cap?: number;
  total_volume_24h?: number;
  bitcoin_dominance?: number;
  ethereum_dominance?: number;
  market_cap_change_24h?: number;
  volume_change_24h?: number;
}

// Transform functions
const transformCoinData = (raw: any): CoinData => ({
  id: raw.id || raw.symbol,
  symbol: raw.symbol?.toUpperCase() || '',
  name: raw.name || '',
  price: parseFloat(raw.price || raw.close || 0),
  percent_change_24h: parseFloat(raw.percent_change_24h || 0),
  percent_change_7d: parseFloat(raw.percent_change_7d || 0),
  market_cap: parseFloat(raw.market_cap || 0),
  volume_24h: parseFloat(raw.volume_24h || raw.volume || 0),
  galaxy_score: raw.galaxy_score ? parseFloat(raw.galaxy_score) : undefined,
  alt_rank: raw.alt_rank ? parseInt(raw.alt_rank) : undefined,
  sentiment: raw.sentiment ? parseFloat(raw.sentiment) : undefined,
  social_dominance: raw.social_dominance ? parseFloat(raw.social_dominance) : undefined,
  posts_24h: raw.posts_24h ? parseInt(raw.posts_24h) : undefined,
  contributors_24h: raw.contributors_24h ? parseInt(raw.contributors_24h) : undefined,
  interactions_24h: raw.interactions_24h ? parseInt(raw.interactions_24h) : undefined,
});

const transformTimeSeriesData = (raw: any): TimeSeriesData => ({
  time: raw.time || raw.date,
  price: parseFloat(raw.price || raw.close || 0),
  volume: parseFloat(raw.volume || 0),
  market_cap: parseFloat(raw.market_cap || 0),
  sentiment: raw.sentiment ? parseFloat(raw.sentiment) : undefined,
  social_dominance: raw.social_dominance ? parseFloat(raw.social_dominance) : undefined,
  interactions: raw.interactions ? parseInt(raw.interactions) : undefined,
});

const transformSocialPost = (raw: any): SocialPost => ({
  id: raw.id || String(Math.random()),
  platform: raw.platform || raw.network || 'unknown',
  content: raw.content || raw.text || '',
  author: raw.author || raw.username || 'unknown',
  followers: parseInt(raw.followers || raw.follower_count || 0),
  interactions: parseInt(raw.interactions || raw.engagement || 0),
  sentiment: parseFloat(raw.sentiment || 0),
  created_at: raw.created_at || raw.date || new Date().toISOString(),
  url: raw.url || raw.link,
});

const transformGlobalMetrics = (raw: any): GlobalMetrics => ({
  total_market_cap: raw.total_market_cap ? parseFloat(raw.total_market_cap) : undefined,
  total_volume_24h: raw.total_volume_24h ? parseFloat(raw.total_volume_24h) : undefined,
  bitcoin_dominance: raw.bitcoin_dominance ? parseFloat(raw.bitcoin_dominance) : undefined,
  ethereum_dominance: raw.ethereum_dominance ? parseFloat(raw.ethereum_dominance) : undefined,
  market_cap_change_24h: raw.market_cap_change_24h ? parseFloat(raw.market_cap_change_24h) : undefined,
  volume_change_24h: raw.volume_change_24h ? parseFloat(raw.volume_change_24h) : undefined,
});

// Core API request function
const makeRequest = async <T>(
  config: LunarCrushConfig,
  endpoint: string,
  params?: Record<string, any>
): Promise<T> => {
  const baseUrl = config.baseUrl || 'https://lunarcrush.com/api4';
  const url = new URL(`${baseUrl}${endpoint}`);
  
  if (params) {
    Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null)
      .forEach(([key, value]) => url.searchParams.append(key, String(value)));
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`LunarCrush API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// API functions
export const getCoin = async (config: LunarCrushConfig, symbol: string): Promise<CoinData> => {
  const data = await makeRequest<any>(config, `/coins/${symbol.toLowerCase()}/v1`);
  return transformCoinData(data);
};

export const getCoins = async (
  config: LunarCrushConfig,
  symbols?: string[],
  limit?: number
): Promise<CoinData[]> => {
  const params: Record<string, any> = {};
  if (symbols?.length) params.symbols = symbols.join(',');
  if (limit) params.limit = limit;

  const data = await makeRequest<any>(config, '/coins', params);
  return Array.isArray(data.data) ? data.data.map(transformCoinData) : [];
};

export const getCoinTimeSeries = async (
  config: LunarCrushConfig,
  symbol: string,
  interval: '1d' | '1w' | '1m' | '3m' | '6m' | '1y' = '1w',
  metrics: string[] = ['price', 'volume', 'market_cap']
): Promise<TimeSeriesData[]> => {
  const params = {
    interval,
    metrics: metrics.join(',')
  };

  const data = await makeRequest<any>(config, `/coins/${symbol.toLowerCase()}/time-series`, params);
  return Array.isArray(data.data) ? data.data.map(transformTimeSeriesData) : [];
};

export const getSocialPosts = async (
  config: LunarCrushConfig,
  topic: string,
  interval: '1d' | '1w' | '1m' = '1d',
  limit: number = 20
): Promise<SocialPost[]> => {
  const params = { interval, limit };

  const data = await makeRequest<any>(config, `/social/posts/${topic.toLowerCase()}`, params);
  return Array.isArray(data.data) ? data.data.map(transformSocialPost) : [];
};

export const getGlobalMetrics = async (config: LunarCrushConfig): Promise<GlobalMetrics> => {
  const data = await makeRequest<any>(config, '/market/global');
  return transformGlobalMetrics(data);
};

// Factory function to create a configured API client
export const createLunarCrushClient = (config: LunarCrushConfig) => ({
  getCoin: (symbol: string) => getCoin(config, symbol),
  getCoins: (symbols?: string[], limit?: number) => getCoins(config, symbols, limit),
  getCoinTimeSeries: (
    symbol: string,
    interval: '1d' | '1w' | '1m' | '3m' | '6m' | '1y' = '1w',
    metrics: string[] = ['price', 'volume', 'market_cap']
  ) => getCoinTimeSeries(config, symbol, interval, metrics),
  getSocialPosts: (
    topic: string,
    interval: '1d' | '1w' | '1m' = '1d',
    limit: number = 20
  ) => getSocialPosts(config, topic, interval, limit),
  getGlobalMetrics: () => getGlobalMetrics(config),
});

export type LunarCrushClient = ReturnType<typeof createLunarCrushClient>;
