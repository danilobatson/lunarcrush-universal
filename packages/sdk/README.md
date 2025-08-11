# 🌙 LunarCrush SDK

[![npm version](https://img.shields.io/npm/v/lunarcrush-sdk.svg)](https://www.npmjs.com/package/lunarcrush-sdk)
[![npm downloads](https://img.shields.io/npm/dm/lunarcrush-sdk.svg)](https://www.npmjs.com/package/lunarcrush-sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Get crypto data instantly. GraphQL API + MCP Integration. No setup required.**

> **Keywords**: crypto API, cryptocurrency data, bitcoin API, social sentiment, trading data, GraphQL SDK, MCP integration, AI workflows, LLM integration, TypeScript crypto library, blockchain analytics, market intelligence

```bash
npm install lunarcrush-sdk
```

```javascript
import LunarCrush from 'lunarcrush-sdk';

const lc = new LunarCrush('your-api-key');

// Get a general snapshot of LunarCrush metrics on the entire list of tracked coins
const coinsList = await lc.coins.list();
console.log(coinsList[0]); // Bitcoin data with price & sentiment

// Get an individual coin
const bitcoin = await lc.coins.get('BTC');
console.log(`Bitcoin galaxy_score: ${bitcoin.galaxy_score}`);
```

## 🚀 Get Started (30 seconds)

### Step 1: Get Your API Key

**Important**: You need a LunarCrush subscription to get an API key.

1. [Sign up for LunarCrush](https://lunarcrush.com/signup)
2. Enter your email and verify it
3. Complete onboarding (select categories, create profile)
4. **Select a subscription plan** (required for API access)
5. Generate your API key from the [authentication page](https://lunarcrush.com/developers/api/authentication)

### Step 2: Install & Use

```bash
npm install lunarcrush-sdk
```

```javascript
import LunarCrush from 'lunarcrush-sdk';

const lc = new LunarCrush('your-api-key-here');
const coinsList = await lc.coins.list();
```

**That's it!** You now have live crypto data.

## 🔥 What You Get

```javascript
// List the cryptocurrencies we track
const coinsList = await lc.coins.list();

// Retrieve coin data
const bitcoin = await lc.coins.get('BTC');

// Trending social topics
const topicsList = await lc.topics.list();

// Get stock data
const appleStock = await lc.stocks.get('aapl');
```

## 💡 Copy-Paste Examples

### Crypto Dashboard

```javascript
const top10 = await lc.coins.list();
top10.slice(0, 10).forEach(coin => {
  console.log(`${coin.symbol}: $${coin.price} (Galaxy Score: ${coin.galaxy_score}/100)`);
});
```

### Supply Tracker

```javascript
//Total number of coins or tokens
//that are actively available
const coins = ['btc', 'eth', 'sol'];
for (const symbol of coins) {
  const data = await lc.coins.get(symbol);
  console.log(`${symbol}: ${data.circulating_supply}`);
}
```

### Next.js API Route

```javascript
// pages/api/crypto.js
import LunarCrush from 'lunarcrush-sdk';

const lc = new LunarCrush(process.env.LUNARCRUSH_API_KEY);

export default async function handler(req, res) {
  const coinsList = await lc.coins.list();
  res.json(coinsList.slice(0, 20));
}
```

## 🤖 MCP (Model Context Protocol)

### Real-Time Social Data for AI Workflows

Connect directly to live crypto social intelligence with clean, simple API:

```javascript
import { createLunarCrushMCP } from 'lunarcrush-sdk';

// Create MCP client for AI workflows
const mcp = await createLunarCrushMCP('your-api-key');

// Clean, direct API calls - no .get() or .list() needed!
const bitcoinData = await mcp.topics('bitcoin');
console.log(bitcoinData.metadata.title); // "Bitcoin (BTC)"
console.log(bitcoinData.tables.length);  // 20+ parsed tables
console.log(bitcoinData.raw);            // Full markdown content

// Time series data as structured TSV
const sentiment = await mcp.timeSeries('bitcoin', {
  metrics: ['sentiment', 'interactions'],
  interval: '1w'  // '1d' | '1w' | '1m' | '3m' | '6m' | '1y' | 'all'
});
console.log(sentiment.tsv); // Array of {time, sentiment, interactions}

// Get AI cryptocurrencies ranked by social sentiment
const aiCryptos = await mcp.cryptocurrencies({
  filter: 'ai',
  sort: 'galaxy_score',
  limit: 10
});
console.log(aiCryptos.tables); // Structured crypto data

// Social creators analysis
const creator = await mcp.creators('elonmusk', 'x');
console.log(creator.metadata.title); // Creator profile data

// Search across all topics
const search = await mcp.search('bitcoin AI trends');
console.log(search.raw); // Relevant social mentions

// Get specific post details
const post = await mcp.posts('1234567890', 'x');
console.log(post.raw); // Post analysis

// Get topic categories
const categories = await mcp.list('cryptocurrencies');
console.log(categories.tables); // Category listings

// Always close the connection
await mcp.close();
```

### GraphQL vs MCP: Choose Your Integration

| Feature            | **GraphQL SDK** | **MCP Integration**      |
| ------------------ | --------------- | ------------------------ |
| **Best For**       | Web/mobile apps | AI assistants & LLMs     |
| **Data Format**    | Structured JSON | Parsed markdown + tables |
| **Connection**     | HTTP requests   | Server-sent events       |
| **Use Case**       | UI components   | AI data processing       |
| **Learning Curve** | Traditional API | AI-native workflows      |

### Dual API Usage

Both APIs use the same LunarCrush subscription:

```typescript
// Use both approaches with one API key
const graphqlClient = createLunarCrush('your-api-key');
const mcp = await createLunarCrushMCP('your-api-key');

// GraphQL: Perfect for app UIs
const appData = await graphqlClient.coins.list({ limit: 10 });

// MCP: Perfect for AI analysis with clean API
const aiData = await mcp.cryptocurrencies({
  filter: 'ai',
  sort: 'galaxy_score',
  limit: 5
});

// MCP provides richer, AI-friendly formats
console.log(aiData.tables);   // Structured tables
console.log(aiData.metadata); // Extracted metadata
console.log(aiData.tsv);      // Time series data
```

### Complete MCP API Reference

**🎯 All 11 LunarCrush MCP Tools - Clean & Simple:**

```javascript
// Topic analysis
await mcp.topics('bitcoin')           // Full topic details with tables
await mcp.timeSeries('bitcoin', opts) // Historical data as TSV
await mcp.topicPosts('bitcoin', opts) // Popular posts for topic

// Market data
await mcp.cryptocurrencies(opts)      // Sorted crypto lists with filters
await mcp.stocks(opts)                // Stock social sentiment data
await mcp.list('cryptocurrencies')    // Topic categories

// Social intelligence
await mcp.creators('elonmusk', 'x')   // Influencer analysis
await mcp.posts('1234567890', 'x')    // Specific post details
await mcp.search('AI crypto')         // Universal social search

// Direct access
await mcp.fetch('/topic/bitcoin')     // Direct API path access
```

**All responses include:**
- `raw` - Complete markdown content for AI processing
- `tables` - Parsed table data as structured objects
- `tsv` - Time series data as structured arrays
- `metadata` - Extracted titles, images, and context

### Why MCP is Perfect for AI

✅ **Direct Integration** - No API parsing needed
✅ **Rich Context** - Markdown with tables, images, links
✅ **Structured Data** - Pre-parsed tables and time series
✅ **Real-time** - Live social intelligence via SSE
✅ **AI-Optimized** - Designed for LLM consumption

## 🆘 Need Help?

### Can't get data?

1. **Check your API key**: Make sure you have a LunarCrush subscription and valid API key
2. **Test it live**: [Try in browser](https://lunarcrush.cryptoguard-api.workers.dev/graphql) to verify queries work
3. **Copy working examples**: Use the code samples above as starting points

### Want more data?

- **Test queries**: [Interactive playground](https://lunarcrush.cryptoguard-api.workers.dev/graphql)
- **Review our docs**: [Browse here](https://lunarcrush.cryptoguard-api.workers.dev/docs)

## 🎯 Works Everywhere

✅ Node.js
✅ React
✅ Next.js
✅ Vite
✅ Browser
✅ TypeScript
✅ AI/MCP Integration
✅ And More

## 📞 Support

- **FAQ**: [LunarCrush Support](https://lunarcrush.com/faq)
- **SDK Questions**: [GitHub Issues](https://github.com/danilobatson/lunarcrush-universal/issues)
- **Test Your Setup**: [Live Playground](https://lunarcrush.cryptoguard-api.workers.dev/graphql)
- **Docs**: [LunarCrush GraphQL Docs](https://lunarcrush.cryptoguard-api.workers.dev/docs)
- **Community**: [GitHub Discussions](https://github.com/danilobatson/lunarcrush-universal/discussions)

## 🏷️ Keywords & Tags

**For LLM Discovery**: `crypto-api`, `cryptocurrency-data`, `bitcoin-api`, `ethereum-api`, `social-sentiment`, `trading-api`, `blockchain-data`, `crypto-intelligence`, `typescript-sdk`, `graphql-client`, `lunarcrush-sdk`, `crypto-trading`, `market-data`, `social-analytics`, `mcp-integration`, `ai-workflows`, `model-context-protocol`

---

**Ready to build?** [Subscribe to LunarCrush](https://lunarcrush.com/signup) and copy the examples above! 🚀
