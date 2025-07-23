import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  DB: D1Database
  LUNARCRUSH_API_KEY: any  // Secrets Store binding 
  ENVIRONMENT: string
}

const app = new Hono<{ Bindings: Bindings }>()

// CORS middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
}))

// Health check endpoint
app.get('/health', (c) => {
  return c.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: c.env.ENVIRONMENT 
  })
})

// Test secret access endpoint
app.get('/test/secret', async (c) => {
  try {
    // Access secret using the correct binding name
    const apiKey = await c.env.LUNARCRUSH_API_KEY.get()
    const hasApiKey = !!apiKey
    const keyPreview = apiKey 
      ? `${apiKey.substring(0, 8)}...` 
      : 'NOT_FOUND'
    
    return c.json({
      secretsAccessible: hasApiKey,
      apiKeyPreview: keyPreview,
      environment: c.env.ENVIRONMENT
    })
  } catch (error) {
    return c.json({
      secretsAccessible: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: c.env.ENVIRONMENT
    }, 500)
  }
})

// Test database access
app.get('/test/database', async (c) => {
  try {
    const result = await c.env.DB.prepare(
      'SELECT COUNT(*) as count FROM projects'
    ).first()
    
    return c.json({
      databaseAccessible: true,
      projectCount: result?.count || 0
    })
  } catch (error) {
    return c.json({
      databaseAccessible: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// Test LunarCrush API integration
app.get('/test/lunarcrush', async (c) => {
  try {
    const apiKey = await c.env.LUNARCRUSH_API_KEY.get()
    
    if (!apiKey) {
      return c.json({ error: 'API key not configured' }, 500)
    }

    // Test LunarCrush API call with correct endpoint
    const response = await fetch('https://lunarcrush.com/api4/public/coins/btc/v1', {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    })

    if (!response.ok) {
      return c.json({ 
        error: 'LunarCrush API call failed', 
        status: response.status,
        statusText: response.statusText
      }, 500)
    }

    const data = await response.json()
    return c.json({
      lunarcrushAccessible: true,
      btcData: {
        symbol: data.data.symbol,
        name: data.data.name,
        price: data.data.price,
        market_cap: data.data.market_cap,
        percent_change_24h: data.data.percent_change_24h,
        galaxy_score: data.data.galaxy_score,
        alt_rank: data.data.alt_rank
      }
    })
  } catch (error) {
    return c.json({
      lunarcrushAccessible: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// 404 handler
app.notFound((c) => c.json({ error: 'Not found' }, 404))

export default app
