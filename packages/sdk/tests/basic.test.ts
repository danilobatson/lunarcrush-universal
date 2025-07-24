import { describe, it, expect, beforeAll } from 'vitest';
import { LunarCrushClient } from '../src';
describe('LunarCrush SDK Basic Tests', () => {
let client: LunarCrushClient;
beforeAll(() => {
const apiKey = process.env.LUNARCRUSH_API_KEY;
if (!apiKey) {
throw new Error('LUNARCRUSH_API_KEY environment variable is required for tests');
}
client = new LunarCrushClient({
  apiKey,
  timeout: 10000
});
});
it('should authenticate successfully', async () => {
const response = await client.auth();
expect(response).toBeDefined();
expect(response.config).toBeDefined();
expect(response.usage).toBeDefined();
});
it('should get Bitcoin topic data', async () => {
const response = await client.topic('bitcoin');
expect(response).toBeDefined();
expect(response.data).toBeDefined();
expect(response.data.symbol).toBe('BTC');
expect(response.data.name).toBe('Bitcoin');
expect(typeof response.data.interactions_24h).toBe('number');
});
it('should list cryptocurrencies', async () => {
const response = await client.cryptocurrencies({ limit: 5 });
expect(response).toBeDefined();
expect(response.data).toBeDefined();
expect(Array.isArray(response.data)).toBe(true);
expect(response.data.length).toBeGreaterThan(0);
expect(response.data.length).toBeLessThanOrEqual(5);
});
it('should handle errors gracefully', async () => {
try {
await client.topic('nonexistent-crypto-12345');
} catch (error: any) {
expect(error.name).toBe('LunarCrushAPIError');
expect(error.code).toBeGreaterThan(0);
}
});
it('should search for topics', async () => {
const response = await client.search('ethereum');
expect(response).toBeDefined();
expect(response.data).toBeDefined();
});
});
