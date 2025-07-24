/**
 * Universal LunarCrush SDK - EXACT schema match
 * Framework-agnostic client for LunarCrush social intelligence data
 */

export interface LunarCrushConfig {
  // Core configuration
  apiKey?: string;
  mode?: 'demo' | 'production';
  endpoint?: string;
  
  // Data control
  returnKeys?: string[];
  format?: 'json' | 'minimal';
  flatten?: boolean;
  
  // Performance
  cache?: boolean;
  timeout?: number;
  retries?: number;
  
  // AI Integration
  aiMode?: boolean;
  prompt?: string;                // AI prompt for context
  llmIntrospection?: boolean;     // Schema introspection for LLMs
  naturalLanguage?: boolean;      // Natural language query parsing
  promptTemplates?: boolean;      // Include AI prompt templates
  explanations?: boolean;         // Explain data in plain English
  
  // Real-time
  streaming?: boolean;
  realtime?: boolean;
  liveUpdates?: boolean;
  
  // Developer Experience  
  playground?: boolean;
  playgroundUrl?: string;
  redirectToPlayground?: boolean;
  devTools?: boolean;
  docs?: 'static' | 'interactive' | 'none';
  help?: boolean;
  examples?: boolean;
  
  // Debugging
  debug?: boolean;
  verbose?: boolean;
  dryRun?: boolean;
}

export interface APIResponse<T = any> {
  data: T;
  success: boolean;
  cached?: boolean;
  timestamp: number;
  usage?: {
    requests_remaining?: number;
    reset_time?: number;
  };
  // AI Enhancement
  aiContext?: string;
  explanation?: string;
  prompt?: string;
}

// EXACT type matching your GraphQL schema
export interface TopicData {
  topic?: string;               // From TopicDetails
  title?: string;               // From TopicDetails
  topic_rank?: number;          // From TopicDetails
  interactions_24h?: number;    // From TopicDetails
  num_contributors?: number;    // From TopicDetails
  num_posts?: number;          // From TopicDetails
  trend?: string;              // From TopicDetails
  categories?: string[];       // From TopicDetails
  [key: string]: any;
}

// EXACT type matching your GraphQL schema
export interface CoinData {
  id?: number;                 // From CoinListItem
  symbol?: string;             // From CoinListItem
  name?: string;               // From CoinListItem
  price?: number;              // From CoinListItem
  interactions_24h?: number;   // From CoinListItem (NOT interactions!)
  sentiment?: number;          // From CoinListItem
  market_cap?: number;         // From CoinListItem
  percent_change_24h?: number; // From CoinListItem
  alt_rank?: number;           // From CoinListItem
  galaxy_score?: number;       // From CoinListItem
  topic?: string;              // From CoinListItem
  [key: string]: any;
}

export interface CreatorData {
  creator_id?: string;         // From CreatorDetails
  creator_name?: string;       // From CreatorDetails
  creator_display_name?: string; // From CreatorDetails
  creator_followers?: number;  // From CreatorDetails
  creator_avatar?: string;     // From CreatorDetails
  interactions_24h?: number;   // From CreatorDetails
  topic_influence?: Array<{
    topic: string;
    rank: number;
  }>;
  [key: string]: any;
}

export interface PostData {
  id?: string;
  post_title?: string;
  post_created?: number;
  post_sentiment?: number;
  creator_name?: string;
  creator_followers?: number;
  interactions_24h?: number;
  interactions_total?: number;
  [key: string]: any;
}

export class LunarCrushClient {
  private config: Required<LunarCrushConfig>;
  private cache: Map<string, { data: any; timestamp: number }>;

  constructor(config: LunarCrushConfig = {}) {
    this.config = {
      // Core defaults
      apiKey: '',
      mode: 'demo',
      endpoint: 'https://lunarcrush-universal-backend.cryptoguard-api.workers.dev',
      
      // Data control defaults
      returnKeys: [],
      format: 'json',
      flatten: false,
      
      // Performance defaults
      cache: true,
      timeout: 10000,
      retries: 3,
      
      // AI Integration defaults
      aiMode: false,
      prompt: '',
      llmIntrospection: false,
      naturalLanguage: false,
      promptTemplates: false,
      explanations: false,
      
      // Real-time defaults
      streaming: false,
      realtime: false,
      liveUpdates: false,
      
      // Developer Experience defaults
      playground: false,
      playgroundUrl: 'https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/graphql',
      redirectToPlayground: false,
      devTools: false,
      docs: 'static',
      help: false,
      examples: false,
      
      // Debugging defaults
      debug: false,
      verbose: false,
      dryRun: false,
      
      ...config
    };

    this.cache = new Map();
    
    if (this.config.debug) {
      console.log('🚀 LunarCrush SDK initialized:', this.config);
    }
  }

  /**
   * Make HTTP request to GraphQL endpoint
   */
  private async request(query: string, variables: Record<string, any> = {}): Promise<any> {
    const cacheKey = `${query}-${JSON.stringify(variables)}`;
    
    // Check cache first
    if (this.config.cache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      if (Date.now() - cached.timestamp < 60000) { // 1 minute cache
        if (this.config.debug) console.log('📦 Cache hit:', cacheKey);
        return { ...cached.data, cached: true };
      }
    }

    if (this.config.dryRun) {
      if (this.config.debug) console.log('🏃 Dry run - would execute:', { query, variables });
      return { data: { message: 'Dry run mode' } };
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': '@lunarcrush/sdk/1.0.0'
    };

    if (this.config.apiKey) {
      headers['X-API-Key'] = this.config.apiKey;
    }

    if (this.config.prompt) {
      headers['X-AI-Prompt'] = this.config.prompt;
    }

    const body = JSON.stringify({ query, variables });

    if (this.config.verbose) {
      console.log('📤 Request:', { endpoint: this.config.endpoint, headers, body });
    }

    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= this.config.retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        const response = await fetch(`${this.config.endpoint}/graphql`, {
          method: 'POST',
          headers,
          body,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();

        if (this.config.verbose) {
          console.log('📥 Response:', result);
        }

        if (result.errors) {
          throw new Error(`GraphQL Error: ${result.errors[0]?.message || 'Unknown error'}`);
        }

        // Cache successful response
        if (this.config.cache) {
          this.cache.set(cacheKey, { data: result, timestamp: Date.now() });
        }

        return result;
      } catch (error) {
        lastError = error as Error;
        if (attempt < this.config.retries) {
          const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
          if (this.config.debug) console.log(`⏳ Retry ${attempt + 1} in ${delay}ms:`, error);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError || new Error('Request failed');
  }

  /**
   * Filter response data based on returnKeys configuration
   */
  private filterData<T extends Record<string, any>>(data: T): T {
    if (!this.config.returnKeys.length) return data;

    const filtered = {} as T;
    for (const key of this.config.returnKeys) {
      if (key in data) {
        filtered[key as keyof T] = data[key];
      }
    }
    return filtered;
  }

  /**
   * Wrap response in consistent format with AI enhancements
   */
  private wrapResponse<T>(data: T, cached = false): APIResponse<T> {
    const response: APIResponse<T> = {
      data: this.config.format === 'minimal' ? data : this.filterData(data as any),
      success: true,
      cached,
      timestamp: Date.now(),
      usage: {
        requests_remaining: 1000, // TODO: Get from headers
        reset_time: Date.now() + 3600000
      }
    };

    // Add AI context if enabled
    if (this.config.aiMode) {
      response.aiContext = this.config.prompt || 'Social intelligence data analysis';
    }

    // Add explanation if enabled
    if (this.config.explanations && data) {
      response.explanation = this.generateExplanation(data);
    }

    return response;
  }

  /**
   * Generate AI-friendly explanation of data - FIXED
   */
  private generateExplanation(data: any): string {
    if (!data) return 'No data available';
    
    // Handle interactions_24h (most common metric)
    if (data.interactions_24h !== undefined && typeof data.interactions_24h === 'number') {
      const interactions = data.interactions_24h;
      return `This topic has ${interactions.toLocaleString()} interactions in the last 24 hours.`;
    }
    
    // Handle sentiment (with proper type checking)
    if (data.sentiment !== undefined && typeof data.sentiment === 'number') {
      const sentiment = data.sentiment;
      const sentimentText = sentiment > 0.6 ? 'positive' : sentiment < 0.4 ? 'negative' : 'neutral';
      return `This has ${sentimentText} sentiment (${sentiment.toFixed(2)}).`;
    }
    
    // Handle trend (for topic data)
    if (data.trend && typeof data.trend === 'string') {
      return `This topic is trending ${data.trend} with ${data.num_contributors?.toLocaleString() || 'unknown'} contributors.`;
    }
    
    // Handle arrays (like crypto lists)
    if (Array.isArray(data) && data.length > 0) {
      return `Retrieved ${data.length} items with social intelligence data.`;
    }
    
    return 'Social intelligence data retrieved successfully';
  }

  // ============================================================================
  // CORE METHODS - Using EXACT backend schema field names
  // ============================================================================

  /**
   * Get data for any topic using EXACT TopicDetails schema
   */
  async topic(topicSymbol: string): Promise<APIResponse<TopicData>> {
    const query = `
      query GetTopic($topic: String!) {
        getTopic(topic: $topic) {
          topic
          title
          topic_rank
          interactions_24h
          num_contributors
          num_posts
          trend
          categories
        }
      }
    `;

    const result = await this.request(query, { topic: topicSymbol });
    return this.wrapResponse(result.data.getTopic, result.cached);
  }

  /**
   * Get creator/influencer data using EXACT CreatorDetails schema
   */
  async creator(network: string = 'x', id: string): Promise<APIResponse<CreatorData>> {
    const query = `
      query GetCreator($network: String!, $id: String!) {
        getCreator(network: $network, id: $id) {
          creator_id
          creator_name
          creator_display_name
          creator_avatar
          creator_followers
          interactions_24h
          topic_influence {
            topic
            rank
          }
        }
      }
    `;

    const result = await this.request(query, { network, id });
    return this.wrapResponse(result.data.getCreator, result.cached);
  }

  /**
   * Get social posts using EXACT TopicPost schema
   */
  async posts(topic: string, start?: string, end?: string): Promise<APIResponse<PostData[]>> {
    const query = `
      query GetTopicPosts($topic: String!, $start: String, $end: String) {
        getTopicPosts(topic: $topic, start: $start, end: $end) {
          id
          post_title
          post_created
          post_sentiment
          creator_name
          creator_followers
          interactions_24h
          interactions_total
        }
      }
    `;

    const result = await this.request(query, { topic, start, end });
    return this.wrapResponse(result.data.getTopicPosts || [], result.cached);
  }

  /**
   * Get cryptocurrency data using EXACT CoinListItem schema
   */
  async cryptocurrencies(options: {
    sort?: string;
    filter?: string;
    limit?: number;
    desc?: string;
    page?: number;
  } = {}): Promise<APIResponse<CoinData[]>> {
    const query = `
      query GetCoinsList($sort: String, $filter: String, $limit: Int, $desc: String, $page: Int) {
        getCoinsList(sort: $sort, filter: $filter, limit: $limit, desc: $desc, page: $page) {
          id
          symbol
          name
          price
          interactions_24h
          sentiment
          market_cap
          percent_change_24h
          alt_rank
          galaxy_score
          topic
        }
      }
    `;

    const result = await this.request(query, options);
    return this.wrapResponse(result.data.getCoinsList || [], result.cached);
  }

  /**
   * Get stock data using EXACT StockListItem schema
   */
  async stocks(options: {
    sort?: string;
    limit?: number;
    desc?: string;
    page?: number;
  } = {}): Promise<APIResponse<any[]>> {
    const query = `
      query GetStocksList($sort: String, $limit: Int, $desc: String, $page: Int) {
        getStocksList(sort: $sort, limit: $limit, desc: $desc, page: $page) {
          id
          symbol
          name
          price
          interactions_24h
          sentiment
          market_cap
          galaxy_score
        }
      }
    `;

    const result = await this.request(query, options);
    return this.wrapResponse(result.data.getStocksList || [], result.cached);
  }

  /**
   * Get time series data using EXACT TopicTimeSeriesItem schema
   */
  async timeSeries(topic: string, options: {
    bucket?: string;
    interval?: string;
    start?: string;
    end?: string;
  } = {}): Promise<APIResponse<any[]>> {
    const query = `
      query GetTopicTimeSeries($topic: String!, $bucket: String, $interval: String, $start: String, $end: String) {
        getTopicTimeSeries(topic: $topic, bucket: $bucket, interval: $interval, start: $start, end: $end) {
          time
          contributors_active
          interactions
          posts_active
          sentiment
          alt_rank
          close
          market_cap
          volume_24h
        }
      }
    `;

    const result = await this.request(query, { topic, ...options });
    return this.wrapResponse(result.data.getTopicTimeSeries || [], result.cached);
  }

  /**
   * Get sentiment analysis for a topic - FIXED to handle missing sentiment
   */
  async sentiment(topic: string): Promise<APIResponse<{ sentiment?: number; trend: string; explanation?: string }>> {
    // Just use topic data for trend analysis to avoid the null sentiment issue
    const topicData = await this.topic(topic);
    const trend = topicData.data?.trend || 'neutral';
    
    const result: { sentiment?: number; trend: string; explanation?: string } = {
      trend: trend === 'up' ? 'positive' : trend === 'down' ? 'negative' : 'neutral'
    };

    if (this.config.explanations) {
      result.explanation = `Based on social activity, ${topic} is trending ${trend}.`;
    }

    return this.wrapResponse(result);
  }

  // ============================================================================
  // AI & PROMPT METHODS
  // ============================================================================

  /**
   * Set AI prompt for context
   */
  setPrompt(prompt: string): void {
    this.config.prompt = prompt;
    if (this.config.debug) {
      console.log('🤖 AI Prompt set:', prompt);
    }
  }

  /**
   * Get AI-powered insights using prompt context
   */
  async aiAnalyze(topic: string, prompt?: string): Promise<APIResponse<any>> {
    const originalPrompt = this.config.prompt;
    if (prompt) this.setPrompt(prompt);

    try {
      const topicData = await this.topic(topic);
      const sentiment = await this.sentiment(topic);
      
      const analysis = {
        topic,
        data: topicData.data,
        sentiment: sentiment.data,
        aiInsights: {
          prompt: this.config.prompt,
          context: 'Social intelligence analysis',
          recommendation: this.generateRecommendation(topicData.data, sentiment.data)
        }
      };

      return this.wrapResponse(analysis);
    } finally {
      // Restore original prompt
      this.config.prompt = originalPrompt;
    }
  }

  /**
   * Generate AI-style recommendation
   */
  private generateRecommendation(topicData: any, sentimentData: any): string {
    if (!topicData) return 'Insufficient data for recommendation';
    
    const interactions = topicData.interactions_24h || 0;
    const trend = topicData.trend || sentimentData.trend || 'neutral';
    
    if (trend === 'up' && interactions > 50000000) {
      return 'Strong positive momentum with high social engagement - trending topic with significant attention';
    } else if (trend === 'down') {
      return 'Declining social interest detected - monitor for further developments';
    } else if (interactions > 100000000) {
      return 'Extremely high social volume - major topic of discussion';
    } else {
      return 'Stable social perception with normal engagement levels';
    }
  }

  /**
   * Get prompt templates for different use cases
   */
  getPromptTemplates(): Record<string, string> {
    return {
      'crypto-analysis': 'Analyze this cryptocurrency from a social intelligence perspective, focusing on sentiment trends and market implications.',
      'trading-signals': 'Generate trading insights based on social sentiment and engagement metrics.',
      'risk-assessment': 'Evaluate potential risks based on social sentiment and discussion patterns.',
      'trend-detection': 'Identify emerging trends and patterns in social data.',
      'competitive-analysis': 'Compare multiple assets based on social intelligence metrics.'
    };
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  /**
   * Check API health
   */
  async health(): Promise<APIResponse<{ status: string; timestamp: number; message?: string }>> {
    try {
      const query = `query { health }`;
      const result = await this.request(query);
      return this.wrapResponse({ 
        status: 'healthy', 
        timestamp: Date.now(),
        message: result.data.health 
      });
    } catch (error) {
      return this.wrapResponse({ status: 'unhealthy', timestamp: Date.now() });
    }
  }

  /**
   * Get documentation for methods
   */
  docs(method?: string): string {
    const docs = {
      topic: 'Get data for any topic: await client.topic("bitcoin")',
      creator: 'Get creator data: await client.creator("x", "elonmusk")',
      posts: 'Get social posts: await client.posts("bitcoin", "2024-01-01")',
      cryptocurrencies: 'List cryptocurrencies: await client.cryptocurrencies({ sort: "market_cap" })',
      stocks: 'List stocks: await client.stocks({ sort: "market_cap" })',
      timeSeries: 'Get historical data: await client.timeSeries("bitcoin", { interval: "1d" })',
      sentiment: 'Get sentiment: await client.sentiment("bitcoin")',
      aiAnalyze: 'AI analysis: await client.aiAnalyze("bitcoin", "Analyze for trading")',
      setPrompt: 'Set AI prompt: client.setPrompt("Analyze from trading perspective")',
      health: 'Check health: await client.health()'
    };

    if (method && method in docs) {
      return docs[method as keyof typeof docs];
    }

    return Object.entries(docs)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
  }

  /**
   * Open playground with current query
   */
  playground(query?: string): void {
    if (typeof window !== 'undefined') {
      const url = this.config.playgroundUrl + (query ? `?query=${encodeURIComponent(query)}` : '');
      window.open(url, '_blank');
    } else {
      console.log('🎮 Playground URL:', this.config.playgroundUrl);
    }
  }

  /**
   * Update configuration
   */
  configure(newConfig: Partial<LunarCrushConfig>): void {
    this.config = { ...this.config, ...newConfig };
    if (this.config.debug) {
      console.log('⚙️ Configuration updated:', newConfig);
    }
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
    if (this.config.debug) {
      console.log('🗑️ Cache cleared');
    }
  }
}

// Export everything with proper CommonJS compatibility
export default LunarCrushClient;

// CommonJS compatibility
module.exports = LunarCrushClient;
module.exports.default = LunarCrushClient;
module.exports.LunarCrushClient = LunarCrushClient;
