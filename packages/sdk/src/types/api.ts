// Base API Response Structure
export interface LunarCrushResponse<T = any> {
  config: {
    id: string;
    title: string;
    description: string;
    generated: number;
    days: number;
    timezone: string;
    time_zone: string;
    server_time: number;
    intervals: string[];
    interval: string;
    limit: number;
    credits: number;
    creditsCost: number;
    remaining: number;
    reset: number;
    resetFormatted: string;
  };
  usage: {
    limit: number;
    used: number;
    remaining: number;
    reset: number;
    resetFormatted: string;
  };
  data: T;
}

// Topic/Asset Data
export interface TopicData {
  id: number;
  symbol: string;
  name: string;
  price?: number;
  price_btc?: number;
  volume_24h?: number;
  market_cap?: number;
  market_cap_rank?: number;
  percent_change_24h?: number;
  percent_change_7d?: number;
  interactions_24h: number;
  posts_active: number;
  contributors_active: number;
  sentiment: number;
  social_dominance: number;
  galaxy_score: number;
  alt_rank: number;
  topic_rank: number;
  trending_score?: number;
  volatility: number;
  news: number;
  spam: number;
  last_updated: number;
}

// Creator Data
export interface CreatorData {
  id: number;
  screen_name: string;
  display_name: string;
  avatar_url: string;
  followers: number;
  following: number;
  interactions_24h: number;
  posts_24h: number;
  engagement_rate: number;
  influence_score: number;
  verified: boolean;
  network: string;
}

// Post Data
export interface PostData {
  id: string;
  title: string;
  url: string;
  text: string;
  interactions: number;
  interactions_24h: number;
  time: number;
  sentiment: number;
  spam: number;
  network: string;
  creator: {
    id: number;
    screen_name: string;
    display_name: string;
    avatar_url: string;
    followers: number;
  };
}

// Search/List Parameters
export interface ListParams {
  limit?: number;
  sort?: string;
  filter?: string;
}

export interface TimeSeriesParams {
  interval?: '1d' | '1w' | '1m' | '3m' | '6m' | '1y' | 'all';
  metrics?: string[];
}

export interface PostsParams {
  interval?: '1d' | '1w' | '1m' | '3m' | '6m' | '1y' | 'all';
  from_date?: string;
  to_date?: string;
}
