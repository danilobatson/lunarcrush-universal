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

  const responseData = await response.json() as T;
  console.log(`✅ LunarCrush response received`);
  return responseData;
};

// ✅ FIXED: getCrypto now uses list endpoint to get complete social metrics
export const getCrypto = async (config: LunarCrushConfig, symbol: string): Promise<any> => {
  try {
    console.log(`🔍 getCrypto: ${symbol} (FIXED: using list/v2 endpoint for complete social data)`);
    // ✅ FIXED: Use list/v2 endpoint instead of single coin endpoint to get social metrics
    const response = await makeRequest<any>(config, `/coins/list/v2`, {
      symbols: symbol.toUpperCase(),
      limit: 1
    });
    
    // Return first (and only) item from the list
    if (response.data && response.data.length > 0) {
      console.log(`✅ getCrypto SUCCESS: Found ${response.data.length} result(s) for ${symbol}`);
      console.log(`🎯 Social metrics: sentiment=${response.data[0].sentiment}, social_dominance=${response.data[0].social_dominance}, interactions_24h=${response.data[0].interactions_24h}`);
      return response.data[0];
    } else {
      throw new Error(`No data found for symbol ${symbol}`);
    }
  } catch (error) {
    console.error('❌ getCrypto error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(`${error.statusCode} ${error.statusText}: ${error.message}`);
    }
    throw error;
  }
};

// Keep all other existing functions...
// (I'll include the rest of your existing functions here)
