import { streamText, streamSSE } from 'hono/streaming'
import type { Hono } from 'hono'
import type { AppContext } from '../types/generated'

export const setupStreamingRoutes = (app: Hono<AppContext>) => {
  app.get('/api/stream/text', (c) => {
    return streamText(c, async (stream) => {
      await stream.writeln('🚀 Starting LunarCrush data stream...')
      await stream.sleep(1000)

      for (let i = 1; i <= 5; i++) {
        await stream.writeln(`📊 Data packet ${i}: BTC Price: ${(Math.random() * 50000 + 30000).toFixed(2)}`)
        await stream.sleep(1000)
      }

      await stream.writeln('✅ Stream completed!')
    })
  })

  app.get('/api/stream/sse/crypto/:symbol', (c) => {
    const symbol = c.req.param('symbol').toUpperCase()

    return streamSSE(c, async (stream) => {
      let id = 0

      stream.onAbort(() => {
        console.log(`SSE stream aborted for ${symbol}`)
      })

      while (true) {
        const price = Math.random() * 50000 + 30000
        const sentiment = Math.random() * 100
        const volume = Math.random() * 1000000

        await stream.writeSSE({
          data: JSON.stringify({
            symbol,
            price: price.toFixed(2),
            sentiment: sentiment.toFixed(1),
            volume: volume.toFixed(0),
            timestamp: new Date().toISOString(),
            change24h: ((Math.random() - 0.5) * 20).toFixed(2)
          }),
          event: 'crypto-update',
          id: String(id++),
        })

        await stream.sleep(2000)
      }
    })
  })
}
