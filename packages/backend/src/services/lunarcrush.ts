// Complete working LunarCrush service with all endpoints

export interface LunarCrushConfig {
  apiKey: string;
  baseUrl?: string;
}

export class LunarCrushError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public statusText: string
  ) {
    super(message);
    this.name = 'LunarCrushError';
  }
}

// Core API request function
const makeRequest = async <T>(
  config: LunarCrushConfig,
  endpoint: string,
  params?: Record<string, any>
): Promise<T> => {
  const baseUrl = config.baseUrl || 'https://lunarcrush.com/api4/public';
  const url = new URL(`${baseUrl}${endpoint}`);

  if (params) {
    Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null)
      .forEach(([key, value]) => url.searchParams.append(key, String(value)));
  }

  console.log(`🌙 LunarCrush API Request: ${url.toString()}`);

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new LunarCrushError(
      `LunarCrush API error: ${response.status} ${response.statusText}`,
      response.status,
      response.statusText
    );
  }

  const responseData = await response.json();
  console.log(`✅ LunarCrush response received`);
  return responseData;
};

// ===== ALL EXISTING FUNCTIONS (keeping them all) =====

export const getCrypto = async (config: LunarCrushConfig, symbol: string): Promise<any> => {
  try {
    console.log(`🔍 getCrypto: ${symbol}`);
    const response = await makeRequest<any>(config, `/coins/${symbol.toUpperCase()}/v1`);
    return response.data;
  } catch (error) {
    console.error('❌ getCrypto error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};

export const getCryptoList = async (config: LunarCrushConfig, symbols?: string[], limit?: number, realtime = false): Promise<any[]> => {
  try {
    const params: Record<string, any> = {};
    if (symbols?.length) params.symbols = symbols.join(',');
    if (limit) params.limit = limit;
    const endpoint = realtime ? '/coins/list/v2' : '/coins/list/v1';
    const response = await makeRequest<any>(config, endpoint, params);
    return response.data;
  } catch (error) {
    console.error('❌ getCryptoList error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};

export const getCryptoListV2 = async (config: LunarCrushConfig, symbols?: string[], limit?: number): Promise<any[]> => {
  try {
    const params: Record<string, any> = {};
    if (symbols?.length) params.symbols = symbols.join(',');
    if (limit) params.limit = limit;
    const response = await makeRequest<any>(config, '/coins/list/v2', params);
    return response.data;
  } catch (error) {
    console.error('❌ getCryptoListV2 error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};

export const getCryptoPriceHistory = async (config: LunarCrushConfig, symbol: string, interval?: string, metrics?: string): Promise<any[]> => {
  try {
    const params: Record<string, any> = {};
    if (interval) params.interval = interval;
    if (metrics) params.metrics = metrics;
    const response = await makeRequest<any>(config, `/coins/${symbol.toUpperCase()}/time-series/v2`, params);
    return response.data;
  } catch (error) {
    console.error('❌ getCryptoPriceHistory error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};

export const getCryptoMetadata = async (config: LunarCrushConfig, symbol: string): Promise<any> => {
  try {
    const response = await makeRequest<any>(config, `/coins/${symbol.toUpperCase()}/meta/v1`);
    return response.data;
  } catch (error) {
    console.error('❌ getCryptoMetadata error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};

export const getSocialInfluencers = async (config: LunarCrushConfig, limit: number = 50, sort?: string): Promise<any[]> => {
  try {
    const params: Record<string, any> = {};
    if (sort) params.sort = sort;
    const response = await makeRequest<any>(config, '/creators/list/v1', params);
    const limitedData = limit && limit < response.data.length ? response.data.slice(0, limit) : response.data;
    return limitedData;
  } catch (error) {
    console.error('❌ getSocialInfluencers error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};

export const getSocialInfluencer = async (config: LunarCrushConfig, platform: string, id: string): Promise<any> => {
  try {
    const response = await makeRequest<any>(config, `/creator/${platform}/${id}/v1`);
    return response.data;
  } catch (error) {
    console.error('❌ getSocialInfluencer error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};

export const getInfluencerPosts = async (config: LunarCrushConfig, network: string, id: string, start?: string, end?: string): Promise<any[]> => {
  try {
    const params: Record<string, any> = {};
    if (start) params.start = start;
    if (end) params.end = end;
    const response = await makeRequest<any>(config, `/creator/${network}/${id}/posts/v1`, params);
    return response.data;
  } catch (error) {
    console.error('❌ getInfluencerPosts error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};

export const getCreatorTimeSeries = async (config: LunarCrushConfig, network: string, id: string, interval?: string): Promise<any[]> => {
  try {
    const params: Record<string, any> = {};
    if (interval) params.interval = interval;
    const response = await makeRequest<any>(config, `/creator/${network}/${id}/time-series/v1`, params);
    return response.data;
  } catch (error) {
    console.error('❌ getCreatorTimeSeries error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};

export const getTopicCategories = async (config: LunarCrushConfig, limit: number = 50): Promise<any[]> => {
  try {
    const response = await makeRequest<any>(config, '/categories/list/v1');
    const limitedData = limit && limit < response.data.length ? response.data.slice(0, limit) : response.data;
    return limitedData;
  } catch (error) {
    console.error('❌ getTopicCategories error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};

export const getTopicCategory = async (config: LunarCrushConfig, category: string): Promise<any> => {
  try {
    const response = await makeRequest<any>(config, `/category/${category}/v1`);
    return response.data;
  } catch (error) {
    console.error('❌ getTopicCategory error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};

export const getCategoryPosts = async (config: LunarCrushConfig, category: string, start?: string, end?: string): Promise<any[]> => {
  try {
    const params: Record<string, any> = {};
    if (start) params.start = start;
    if (end) params.end = end;
    const response = await makeRequest<any>(config, `/category/${category}/posts/v1`, params);
    return response.data;
  } catch (error) {
    console.error('❌ getCategoryPosts error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};

export const getCategoryTimeSeries = async (config: LunarCrushConfig, category: string, interval?: string): Promise<any[]> => {
  try {
    const params: Record<string, any> = {};
    if (interval) params.interval = interval;
    const response = await makeRequest<any>(config, `/category/${category}/time-series/v1`, params);
    return response.data;
  } catch (error) {
    console.error('❌ getCategoryTimeSeries error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};

export const getCategoryCreators = async (config: LunarCrushConfig, category: string): Promise<any[]> => {
  try {
    const response = await makeRequest<any>(config, `/category/${category}/creators/v1`);
    return response.data;
  } catch (error) {
    console.error('❌ getCategoryCreators error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};

export const getCategoryNews = async (config: LunarCrushConfig, category: string): Promise<any[]> => {
  try {
    const response = await makeRequest<any>(config, `/category/${category}/news/v1`);
    return response.data;
  } catch (error) {
    console.error('❌ getCategoryNews error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};

export const getCategoryTopics = async (config: LunarCrushConfig, category: string): Promise<any[]> => {
  try {
    const response = await makeRequest<any>(config, `/category/${category}/topics/v1`);
    return response.data;
  } catch (error) {
    console.error('❌ getCategoryTopics error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};

export const getSocialPosts = async (config: LunarCrushConfig, topic: string, start?: string, end?: string): Promise<any[]> => {
  try {
    const params: Record<string, any> = {};
    if (start) params.start = start;
    if (end) params.end = end;
    const response = await makeRequest<any>(config, `/topic/${topic}/posts/v1`, params);
    return response.data;
  } catch (error) {
    console.error('❌ getSocialPosts error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};

export const getTopicCreators = async (config: LunarCrushConfig, topic: string): Promise<any[]> => {
  try {
    const response = await makeRequest<any>(config, `/topic/${topic}/creators/v1`);
    return response.data;
  } catch (error) {
    console.error('❌ getTopicCreators error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};

export const getPostDetails = async (config: LunarCrushConfig, postType: string, postId: string): Promise<any> => {
  try {
    const response = await makeRequest<any>(config, `/posts/${postType}/${postId}/v1`);
    return response.data;
  } catch (error) {
    console.error('❌ getPostDetails error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};

export const getPostTimeSeries = async (config: LunarCrushConfig, postType: string, postId: string): Promise<any[]> => {
  try {
    const response = await makeRequest<any>(config, `/posts/${postType}/${postId}/time-series/v1`);
    return response.data;
  } catch (error) {
    console.error('❌ getPostTimeSeries error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};

// ===== NEW ENDPOINTS =====

export const getTopic = async (config: LunarCrushConfig, topic: string): Promise<any> => {
  try {
    console.log(`🔍 getTopic: ${topic}`);
    const response = await makeRequest<any>(config, `/topic/${topic.toLowerCase()}/v1`);
    return response.data;
  } catch (error) {
    console.error('❌ getTopic error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};

export const getTopicTimeSeries = async (config: LunarCrushConfig, topic: string, interval?: string): Promise<any[]> => {
  try {
    console.log(`🔍 getTopicTimeSeries: ${topic}`);
    const params: Record<string, any> = {};
    if (interval) params.interval = interval;
    const response = await makeRequest<any>(config, `/topic/${topic.toLowerCase()}/time-series/v1`, params);
    return response.data;
  } catch (error) {
    console.error('❌ getTopicTimeSeries error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};

export const getStocksList = async (config: LunarCrushConfig): Promise<any[]> => {
  try {
    console.log(`🔍 getStocksList: NO PARAMETERS (as per API docs)`);

    // The stocks/list/v1 endpoint doesn't accept ANY parameters
    const response = await makeRequest<any>(config, '/stocks/list/v1');
    return response.data;
  } catch (error) {
    console.error('❌ getStocksList error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};


// ===== CLIENT FACTORY =====
export const createLunarCrushClient = (config: LunarCrushConfig) => ({
  // COINS ENDPOINTS
  getCrypto: (symbol: string) => getCrypto(config, symbol),
  getCryptoList: (symbols?: string[], limit?: number, realtime = false) =>
    getCryptoList(config, symbols, limit, realtime),
  getCryptoListV2: (symbols?: string[], limit?: number) =>
    getCryptoListV2(config, symbols, limit),
  getCryptoMetadata: (symbol: string) => getCryptoMetadata(config, symbol),
  getCryptoPriceHistory: (symbol: string, interval?: string, metrics?: string) =>
    getCryptoPriceHistory(config, symbol, interval, metrics),

  // CREATORS ENDPOINTS
  getSocialInfluencers: (limit = 50, sort?: string) =>
    getSocialInfluencers(config, limit, sort),
  getSocialInfluencer: (platform: string, id: string) =>
    getSocialInfluencer(config, platform, id),
  getInfluencerPosts: (network: string, id: string, start?: string, end?: string) =>
    getInfluencerPosts(config, network, id, start, end),
  getCreatorTimeSeries: (network: string, id: string, interval?: string) =>
    getCreatorTimeSeries(config, network, id, interval),

  // CATEGORIES ENDPOINTS
  getTopicCategories: (limit = 50) => getTopicCategories(config, limit),
  getTopicCategory: (category: string) => getTopicCategory(config, category),
  getCategoryPosts: (category: string, start?: string, end?: string) =>
    getCategoryPosts(config, category, start, end),
  getCategoryTimeSeries: (category: string, interval?: string) =>
    getCategoryTimeSeries(config, category, interval),
  getCategoryCreators: (category: string) => getCategoryCreators(config, category),
  getCategoryNews: (category: string) => getCategoryNews(config, category),
  getCategoryTopics: (category: string) => getCategoryTopics(config, category),

  // TOPICS ENDPOINTS
  getSocialPosts: (topic: string, start?: string, end?: string) =>
    getSocialPosts(config, topic, start, end),
  getTopicCreators: (topic: string) => getTopicCreators(config, topic),

  // NEW TOPIC ENDPOINTS
  getTopic: (topic: string) => getTopic(config, topic),
  getTopicTimeSeries: (topic: string, interval?: string) =>
    getTopicTimeSeries(config, topic, interval),

  // POSTS ENDPOINTS
  getPostDetails: (postType: string, postId: string) =>
    getPostDetails(config, postType, postId),
  getPostTimeSeries: (postType: string, postId: string) =>
    getPostTimeSeries(config, postType, postId),

  // NEW STOCKS ENDPOINTS
  getStocksList: () => getStocksList(config),
});

export type LunarCrushClient = ReturnType<typeof createLunarCrushClient>;
