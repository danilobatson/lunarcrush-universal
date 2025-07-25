import { LunarCrushMCPService } from './mcp-service.js';
import { GeminiAIService, SentimentAnalysis, TrendAnalysis, MarketInsights } from './gemini-service.js';

export interface AIAnalyticsResult {
  symbol: string;
  timestamp: string;
  sentiment: SentimentAnalysis;
  trend: TrendAnalysis;
  insights: MarketInsights;
  confidence_score: number;
  status: string;
}

export class AIAnalyticsService {
  private mcpService: LunarCrushMCPService;
  private geminiService: GeminiAIService;
  private initialized: boolean = false;

  constructor(lunarCrushApiKey: string, geminiApiKey: string) {
    this.mcpService = new LunarCrushMCPService(lunarCrushApiKey);
    this.geminiService = new GeminiAIService(geminiApiKey);
  }

  async initialize(): Promise<boolean> {
    if (this.initialized) {
      return true;
    }

    console.log('🔄 Initializing AI Analytics Service...');
    const success = await this.mcpService.initialize();
    this.initialized = success;

    if (success) {
      console.log('✅ AI Analytics Service ready');
    } else {
      console.log('❌ AI Analytics Service failed to initialize');
    }

    return success;
  }

  async analyzeSymbol(symbol: string): Promise<AIAnalyticsResult> {
    await this.ensureInitialized();

    try {
      console.log(`🔄 Analyzing ${symbol}...`);

      // Get data from MCP
      const cryptoData = await this.mcpService.getCryptoData(symbol);
      const timeSeriesData = await this.mcpService.getTimeSeriesData(symbol, '1w', ['interactions', 'sentiment']);

      // Analyze with AI
      const sentiment = await this.geminiService.analyzeSentiment(cryptoData);
      const trend = await this.geminiService.analyzeTrend(timeSeriesData, cryptoData);
      const insights = await this.geminiService.generateInsights(cryptoData, sentiment, trend);

      const confidenceScore = (sentiment.confidence + trend.strength) / 2;

      console.log(`✅ Analysis completed for ${symbol}`);

      return {
        symbol: symbol.toUpperCase(),
        timestamp: new Date().toISOString(),
        sentiment,
        trend,
        insights,
        confidence_score: confidenceScore,
        status: 'success'
      };

    } catch (error) {
      console.error(`❌ Analysis failed for ${symbol}:`, error);

      // Return error result instead of throwing
      return {
        symbol: symbol.toUpperCase(),
        timestamp: new Date().toISOString(),
        sentiment: {
          sentiment: 'neutral',
          confidence: 0,
          key_themes: ['error'],
          market_signals: ['analysis_failed'],
          risk_assessment: 'high',
          social_volume: 0,
          momentum: 'stable'
        },
        trend: {
          trend_direction: 'sideways',
          strength: 0,
          key_indicators: ['error'],
          time_horizon: '1w',
          price_prediction: {
            direction: 'stable',
            confidence: 0,
            rationale: 'Analysis failed'
          }
        },
        insights: {
          actionable_insights: [`Analysis failed for ${symbol}`],
          risk_factors: ['Data unavailable'],
          opportunities: ['Try again later'],
          recommended_actions: ['Check system status']
        },
        confidence_score: 0,
        status: 'error'
      };
    }
  }

  async getServiceHealth() {
    try {
      const mcpHealth = await this.mcpService.healthCheck();

      return {
        status: 'healthy',
        mcp_status: mcpHealth,
        initialized: this.initialized,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        initialized: this.initialized,
        timestamp: new Date().toISOString()
      };
    }
  }

  private async ensureInitialized() {
    if (!this.initialized) {
      const success = await this.initialize();
      if (!success) {
        throw new Error('Failed to initialize AI Analytics service');
      }
    }
  }

  async close() {
    await this.mcpService.close();
  }
}
