import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handleGraphQLRequest, createGraphQLServer } from './graphql/server';

const app = new Hono();

// Add CORS middleware
app.use('*', cors());

// Environment interface
interface Environment {
  LUNARCRUSH_API_KEY: {
    get(): Promise<string>;
  };
  CRYPTO_CACHE?: any;
  DB?: any;
}

// ===== API KEY TEST ENDPOINT =====
app.get('/test-api-key', async (c) => {
  try {
    console.log('Testing API key binding access...');
    
    // Test if the binding exists
    if (!c.env?.LUNARCRUSH_API_KEY) {
      return c.json({
        success: false,
        error: 'LUNARCRUSH_API_KEY binding not found',
        available_bindings: Object.keys(c.env || {}),
        timestamp: new Date().toISOString()
      });
    }

    // Get the API key using the correct binding method
    const apiKey = await c.env.LUNARCRUSH_API_KEY.get();
    
    if (!apiKey) {
      return c.json({
        success: false,
        error: 'API key is null or empty',
        binding_exists: !!c.env.LUNARCRUSH_API_KEY,
        timestamp: new Date().toISOString()
      });
    }

    // Test the API key with a simple LunarCrush request
    console.log(`Testing API key: ${apiKey.substring(0, 10)}...`);
    
    const testResponse = await fetch('https://lunarcrush.com/api4/public/coins/BTC/v1', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!testResponse.ok) {
      const errorText = await testResponse.text();
      return c.json({
        success: false,
        error: 'API key authentication failed',
        api_key_length: apiKey.length,
        api_key_prefix: apiKey.substring(0, 10) + '...',
        lunarcrush_status: testResponse.status,
        lunarcrush_error: errorText,
        timestamp: new Date().toISOString()
      });
    }

    const testData = await testResponse.json();

    return c.json({
      success: true,
      message: 'API key is working correctly!',
      api_key_length: apiKey.length,
      api_key_prefix: apiKey.substring(0, 10) + '...',
      lunarcrush_test: {
        status: testResponse.status,
        bitcoin_price: testData.data?.price || 'Not found'
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('API key test error:', error);
    return c.json({
      success: false,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }
});

// ===== GRAPHQL ENDPOINT =====
app.all('/graphql', async (c) => {
  try {
    // Get API key using correct binding method
    const apiKey = await c.env.LUNARCRUSH_API_KEY.get();
    
    if (!apiKey) {
      return c.json({ 
        error: 'LunarCrush API key not configured' 
      }, 500);
    }

    // Create GraphQL server with API key
    const server = await createGraphQLServer({ apiKey });
    
    // Handle the GraphQL request
    return await handleGraphQLRequest(server, c.req.raw);
  } catch (error) {
    console.error('GraphQL error:', error);
    return c.json({ 
      error: 'GraphQL server error',
      message: error.message 
    }, 500);
  }
});

// ===== HEALTH CHECK =====
app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: 'production',
    version: '1.0.0',
    endpoints: {
      graphql: '/graphql',
      health: '/health',
      api_key_test: '/test-api-key'
    }
  });
});

// ===== LEGACY TEST ENDPOINTS (for backwards compatibility) =====
app.get('/test/secret', async (c) => {
  try {
    const apiKey = await c.env.LUNARCRUSH_API_KEY.get();
    return c.json({
      success: !!apiKey,
      api_key: apiKey,
      key_length: apiKey?.length || 0,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return c.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

app.get('/test/lunarcrush', async (c) => {
  try {
    const apiKey = await c.env.LUNARCRUSH_API_KEY.get();
    
    if (!apiKey) {
      return c.json({
        success: false,
        error: 'API key not available'
      });
    }

    const response = await fetch('https://lunarcrush.com/api4/public/coins/BTC/v1', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return c.json({
        success: false,
        error: `API request failed: ${response.status}`
      });
    }

    const data = await response.json();
    
    return c.json({
      success: true,
      lunarcrush: 'connected',
      btc_price: data.data?.price,
      data_sample: {
        symbol: data.data?.symbol,
        name: data.data?.name,
        price: data.data?.price,
        change_24h: data.data?.percent_change_24h,
        market_cap: data.data?.market_cap,
        galaxy_score: data.data?.galaxy_score,
        alt_rank: data.data?.alt_rank
      }
    });
  } catch (error) {
    return c.json({
      success: false,
      error: error.message
    });
  }
});

export default {
  async fetch(request: Request, env: Environment): Promise<Response> {
    return app.fetch(request, env);
  },
};
