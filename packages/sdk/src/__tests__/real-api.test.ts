import { describe, it, expect } from 'vitest';
import LunarCrushClient from '../index';

// These tests hit the real API - run separately
describe('Real API Tests', () => {
  const client = new LunarCrushClient({
    mode: 'demo',
    debug: true,
    aiMode: true,
    prompt: 'Analyze crypto social data',
    explanations: true
  });

  it('should get topic data using EXACT schema', async () => {
    const result = await client.topic('bitcoin');
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    // Expect EXACT field names from TopicDetails schema
    if (result.data) {
      expect(result.data).toHaveProperty('topic');
      expect(result.data).toHaveProperty('title');
    }
    console.log('✅ Topic result:', result);
  }, 10000);

  it('should get cryptocurrency list using EXACT schema', async () => {
    const result = await client.cryptocurrencies({ limit: 5 });
    expect(result.success).toBe(true);
    expect(Array.isArray(result.data)).toBe(true);
    // Expect EXACT field names from CoinListItem schema
    if (result.data && result.data.length > 0) {
      expect(result.data[0]).toHaveProperty('symbol');
      expect(result.data[0]).toHaveProperty('interactions_24h'); // NOT interactions!
    }
    console.log('✅ Crypto list result:', result);
  }, 10000);

  it('should check health', async () => {
    const result = await client.health();
    expect(result.success).toBe(true);
    expect(result.data.status).toBe('healthy');
    console.log('✅ Health result:', result);
  }, 10000);

  it('should handle AI prompts', async () => {
    client.setPrompt('Analyze from trading perspective');
    const templates = client.getPromptTemplates();
    expect(templates).toHaveProperty('crypto-analysis');
    expect(templates).toHaveProperty('trading-signals');
    console.log('✅ AI templates:', Object.keys(templates));
  });

  it('should perform AI analysis with explanations', async () => {
    const result = await client.aiAnalyze('bitcoin', 'What does the social data tell us?');
    expect(result.success).toBe(true);
    expect(result.data.aiInsights).toBeDefined();
    expect(result.explanation).toBeDefined(); // Should have explanation
    console.log('✅ AI analysis result:', result);
  }, 15000);
});
