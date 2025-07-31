// Minimal LunarCrush service for Hono - Single Resolver Migration
// Ported from backend-yoga for getTopic functionality only

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

// Core API request function (minimal version)
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
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new LunarCrushError(
      `LunarCrush API error: ${response.status} ${response.statusText}`,
      response.status,
      response.statusText
    );
  }

  const responseData = (await response.json()) as T;
  console.log(`✅ LunarCrush response received`);
  return responseData;
};

// getTopic function (ported from backend-yoga)
export const getTopic = async (
  config: LunarCrushConfig,
  topic: string
): Promise<any> => {
  try {
    const response = await makeRequest<any>(
      config,
      `/topic/${topic.toLowerCase()}/v1`
    );
    return response.data;
  } catch (error) {
    console.error('❌ getTopic error:', error);
    if (error instanceof LunarCrushError) {
      throw new Error(
        `${error.statusCode} ${error.statusText}: ${error.message}`
      );
    }
    throw error;
  }
};
