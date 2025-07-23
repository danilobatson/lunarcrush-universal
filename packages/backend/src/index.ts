import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { createGraphQLServer, handleGraphQLRequest } from './graphql/server';

// Define types for Cloudflare Workers environment
export interface Env {
  DB: D1Database;
  LUNARCRUSH_API_KEY: any; // Secrets Store binding
}

const app = new Hono<{ Bindings: Env }>();

// Middleware
app.use('*', cors());
app.use('*', logger());

// Health check endpoint
app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: 'production',
    version: '1.0.0',
    endpoints: {
      graphql: '/graphql',
      health: '/health',
      database_test: '/test/database',
      lunarcrush_test: '/test/lunarcrush',
      secret_test: '/test/secret'
    }
  });
});

// GraphQL endpoint
app.all('/graphql', async (c) => {
  try {
    // CORRECT: Use .get() method for Secrets Store
    const apiKey = await c.env.LUNARCRUSH_API_KEY.get();
    if (!apiKey) {
      return c.json({ error: 'LunarCrush API key not configured' }, 500);
    }

    const server = await createGraphQLServer({ apiKey });
    const response = await handleGraphQLRequest(server, c.req.raw);
    
    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    console.error('GraphQL error:', error);
    return c.json({ 
      error: 'Internal GraphQL server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Test endpoints
app.get('/test/secret', async (c) => {
  try {
    // CORRECT: Use .get() method for Secrets Store
    const apiKey = await c.env.LUNARCRUSH_API_KEY.get();
    return c.json({
      success: true,
      hasApiKey: !!apiKey,
      keyLength: apiKey ? apiKey.length : 0,
      keyPreview: apiKey ? `${apiKey.substring(0, 8)}...` : 'Not set'
    });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

app.get('/test/database', async (c) => {
  try {
    const db = c.env.DB;
    const result = await db.prepare('SELECT 1 as test').first();
    return c.json({
      success: true,
      database: 'connected',
      testQuery: result
    });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

app.get('/test/lunarcrush', async (c) => {
  try {
    // CORRECT: Use .get() method for Secrets Store
    const apiKey = await c.env.LUNARCRUSH_API_KEY.get();
    if (!apiKey) {
      return c.json({ error: 'API key not found' }, 500);
    }

    const response = await fetch('https://lunarcrush.com/api4/public/coins/BTC/v1', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return c.json({
      success: true,
      lunarcrush: 'connected',
      btc_price: data.data.price || data.data.close,
      data_sample: {
        symbol: data.data.symbol,
        name: data.data.name,
        price: data.data.price || data.data.close,
        change_24h: data.data.percent_change_24h,
        market_cap: data.data.market_cap,
        galaxy_score: data.data.galaxy_score,
        alt_rank: data.data.alt_rank
      }
    });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// Root endpoint
app.get('/', (c) => {
  return c.json({
    message: 'LunarCrush Universal Backend API',
    version: '1.0.0',
    endpoints: {
      graphql: '/graphql - GraphQL API for crypto data',
      health: '/health - Service health check',
      test_endpoints: {
        database: '/test/database',
        lunarcrush: '/test/lunarcrush', 
        secrets: '/test/secret'
      }
    },
    documentation: 'Visit /graphql for interactive GraphQL documentation'
  });
});

export default app;
