import { GoogleGenerativeAI } from '@google/generative-ai';

export interface SentimentAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  key_themes: string[];
  market_signals: string[];
  risk_assessment: 'low' | 'medium' | 'high';
  social_volume: number;
  momentum: 'increasing' | 'decreasing' | 'stable';
}

export interface TrendAnalysis {
  trend_direction: 'bullish' | 'bearish' | 'sideways';
  strength: number;
  key_indicators: string[];
  time_horizon: '1d' | '1w' | '1m';
  price_prediction: {
    direction: 'up' | 'down' | 'stable';
    confidence: number;
    rationale: string;
  };
}

export interface MarketInsights {
  actionable_insights: string[];
  risk_factors: string[];
  opportunities: string[];
  recommended_actions: string[];
}

export class GeminiAIService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.1,
        topP: 0.8,
        maxOutputTokens: 4096,
        responseMimeType: "application/json"
      }
    });
  }

  async analyzeSentiment(cryptoData: any): Promise<SentimentAnalysis> {
    const prompt = `
Analyze crypto social sentiment. Return JSON with this exact structure:

{
  "sentiment": "positive|negative|neutral",
  "confidence": 0.85,
  "key_themes": ["theme1", "theme2"],
  "market_signals": ["signal1", "signal2"],
  "risk_assessment": "low|medium|high",
  "social_volume": 1250,
  "momentum": "increasing|decreasing|stable"
}

Data: ${JSON.stringify(cryptoData, null, 2).substring(0, 2000)}

Focus on sentiment, themes, signals, risk, volume, momentum.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return JSON.parse(text);
    } catch (error) {
      console.error('Gemini sentiment analysis failed:', error);
      // Return fallback data
      return {
        sentiment: 'neutral',
        confidence: 0.5,
        key_themes: ['data_unavailable'],
        market_signals: ['analysis_error'],
        risk_assessment: 'medium',
        social_volume: 0,
        momentum: 'stable'
      };
    }
  }

  async analyzeTrend(timeSeriesData: any, currentData: any): Promise<TrendAnalysis> {
    const prompt = `
Analyze crypto trends. Return JSON with this exact structure:

{
  "trend_direction": "bullish|bearish|sideways",
  "strength": 0.75,
  "key_indicators": ["indicator1", "indicator2"],
  "time_horizon": "1w",
  "price_prediction": {
    "direction": "up|down|stable",
    "confidence": 0.65,
    "rationale": "Brief explanation"
  }
}

Time Series: ${JSON.stringify(timeSeriesData, null, 2).substring(0, 1500)}
Current: ${JSON.stringify(currentData, null, 2).substring(0, 1500)}

Focus on trends, patterns, predictions.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return JSON.parse(text);
    } catch (error) {
      console.error('Gemini trend analysis failed:', error);
      // Return fallback data
      return {
        trend_direction: 'sideways',
        strength: 0.5,
        key_indicators: ['analysis_error'],
        time_horizon: '1w',
        price_prediction: {
          direction: 'stable',
          confidence: 0.5,
          rationale: 'Analysis temporarily unavailable'
        }
      };
    }
  }

  async generateInsights(
    cryptoData: any,
    sentiment: SentimentAnalysis,
    trend: TrendAnalysis
  ): Promise<MarketInsights> {
    const prompt = `
Generate trading insights. Return JSON with this exact structure:

{
  "actionable_insights": ["insight1", "insight2"],
  "risk_factors": ["risk1", "risk2"],
  "opportunities": ["opp1", "opp2"],
  "recommended_actions": ["action1", "action2"]
}

Data: ${JSON.stringify({ cryptoData, sentiment, trend }, null, 2).substring(0, 2000)}

Provide specific, actionable insights.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return JSON.parse(text);
    } catch (error) {
      console.error('Gemini insights generation failed:', error);
      // Return fallback data
      return {
        actionable_insights: ['Monitor market conditions', 'Consider risk management'],
        risk_factors: ['Market volatility', 'Analysis unavailable'],
        opportunities: ['Data gathering', 'Strategy review'],
        recommended_actions: ['Wait for data', 'Use caution']
      };
    }
  }
}
