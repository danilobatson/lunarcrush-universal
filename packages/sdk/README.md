# 🌙 LunarCrush SDK

[![npm version](https://img.shields.io/npm/v/lunarcrush-sdk.svg)](https://www.npmjs.com/package/lunarcrush-sdk)
[![npm downloads](https://img.shields.io/npm/dm/lunarcrush-sdk.svg)](https://www.npmjs.com/package/lunarcrush-sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Get crypto data instantly. GraphQL API + MCP Integration. No setup required.**

> **Keywords**: crypto API, cryptocurrency data, bitcoin API, social sentiment, trading data, GraphQL SDK, MCP integration, AI workflows, LLM integration, TypeScript crypto library, blockchain analytics, market intelligence

```bash
npm install lunarcrush-sdk
javascriptimport LunarCrush from 'lunarcrush-sdk';

const lc = new LunarCrush('your-api-key');

// Get a general snapshot of LunarCrush metrics on the entire list of tracked coins
const coinsList = await lc.coins.list();
console.log(coinsList[0]); // Bitcoin data with price & sentiment

// Get an individual coin
const bitcoin = await lc.coins.get('BTC');
console.log(`Bitcoin galaxy_score: ${bitcoin.galaxy_score}`);
🚀 Get Started (30 seconds)
Step 1: Get Your API Key
Important: You need a LunarCrush subscription to get an API key.

Sign up for LunarCrush
Enter your email and verify it
Complete onboarding (select categories, create profile)
Select a subscription plan (required for API access)
Generate your API key from the authentication page

Step 2: Install & Use
bashnpm install lunarcrush-sdk
javascriptimport LunarCrush from 'lunarcrush-sdk';

const lc = new LunarCrush('your-api-key-here');
const coinsList = await lc.coins.list();
That's it! You now have live crypto data.
🔥 What You Get
javascript// List the cryptocurrencies we track
const coinsList = await lc.coins.list();

// Retrieve coin data
const bitcoin = await lc.coins.get('BTC');

// Trending social topics
const topicsList = await lc.topics.list();

// Get stock data
const appleStock = await lc.stocks.get('aapl');
💡 Copy-Paste Examples
Crypto Dashboard
javascriptconst top10 = await lc.coins.list();
top10.slice(0, 10).forEach(coin => {
  console.log(`${coin.symbol}: $${coin.price} (Galaxy Score: ${coin.galaxy_score}/100)`);
});
Supply Tracker
javascript//Total number of coins or tokens
//that are actively available
const coins = ['btc', 'eth', 'sol'];
for (const symbol of coins) {
  const data = await lc.coins.get(symbol);
  console.log(`${symbol}: ${data.circulating_supply}`);
}
Next.js API Route
javascript// pages/api/crypto.js
import LunarCrush from 'lunarcrush-sdk';

const lc = new LunarCrush(process.env.LUNARCRUSH_API_KEY);

export default async function handler(req, res) {
  const coinsList = await lc.coins.list();
  res.json(coinsList.slice(0, 20));
}
🤖 MCP (Model Context Protocol)
Real-Time Social Data for AI Workflows
Connect directly to live crypto social intelligence:
javascriptimport { createLunarCrushMCP } from 'lunarcrush-sdk';

// Create MCP client for AI workflows
const mcp = await createLunarCrushMCP('your-api-key');

// Get parsed data perfect for AI processing
const bitcoinData = await mcp.topics('bitcoin');
console.log(bitcoinData.metadata.title); // "Bitcoin (BTC)"
console.log(bitcoinData.tables.length);  // 20+ parsed tables
console.log(bitcoinData.raw);            // Full markdown content

// Time series data as structured TSV
const sentiment = await mcp.timeSeries('bitcoin', {
  metrics: ['sentiment', 'interactions'],
  interval: '1w'  // '1w' | '1m' | '3m' | '6m' | '1y' | 'all'
});
console.log(sentiment.tsv); // Array of {time, sentiment, interactions}

// Social creators analysis
const creator = await mcp.creators('elonmusk');
console.log(creator.metadata.title); // Creator profile data

// Search across all topics
const searchResults = await mcp.search('bitcoin AI trends');
console.log(searchResults.raw); // Relevant social mentions

// Crypto rankings with filters
const aiCryptos = await mcp.cryptocurrencies({
  filter: 'ai',
  sort: 'galaxy_score',
  limit: 10
});

// Stock social sentiment
const techStocks = await mcp.stocks({
  sector: 'technology',
  limit: 5
});

// Always close the connection
await mcp.close();
GraphQL vs MCP: Choose Your Integration
FeatureGraphQL SDKMCP IntegrationBest ForWeb/mobile appsAI assistants & LLMsData FormatStructured JSONParsed markdown + tablesConnectionHTTP requestsServer-sent eventsUse CaseUI componentsAI data processingLearning CurveTraditional APIAI-native workflows
Dual API Usage
Both APIs use the same LunarCrush subscription:
typescript// Use both approaches with one API key
const graphqlClient = new LunarCrush('your-api-key');
const mcpClient = await createLunarCrushMCP('your-api-key');

// GraphQL: Perfect for app UIs
const appData = await graphqlClient.coins.list({ limit: 10 });

// MCP: Perfect for AI analysis
const aiData = await mcpClient.cryptocurrencies({
  filter: 'ai',
  sort: 'galaxy_score',
  limit: 5
});

// MCP provides richer, AI-friendly formats
console.log(aiData.tables); // Structured tables
console.log(aiData.metadata); // Extracted metadata

await mcpClient.close();
MCP API Reference
Clean, Simple Methods:
javascript// Topic analysis
await mcp.topics('bitcoin')           // Full topic details
await mcp.timeSeries('bitcoin', {...}) // Historical data
await mcp.topicPosts('bitcoin', {...}) // Social posts

// Market data  
await mcp.cryptocurrencies({...})     // Crypto rankings
await mcp.stocks({...})               // Stock sentiment

// Social intelligence
await mcp.creators('elonmusk')        // Creator insights
await mcp.posts('123456', 'x')        // Post details
await mcp.search('AI crypto')         // Universal search

// Data access
await mcp.list('cryptocurrencies')    // Topic categories
await mcp.fetch('/topic/bitcoin')     // Direct API access
All responses include:

raw - Complete markdown content
tables - Parsed table data as objects
tsv - Time series data as structured arrays
metadata - Extracted titles, images, etc.

🆘 Need Help?
Can't get data?

Check your API key: Make sure you have a LunarCrush subscription and valid API key
Test it live: Try in browser to verify queries work
Copy working examples: Use the code samples above as starting points

Want more data?

Test queries: Interactive playground
Review our docs: Browse here

🎯 Works Everywhere
✅ Node.js
✅ React
✅ Next.js
✅ Vite
✅ Browser
✅ TypeScript
✅ AI/MCP Integration
✅ And More
📞 Support

FAQ: LunarCrush Support
SDK Questions: GitHub Issues
Test Your Setup: Live Playground
Docs: LunarCrush GraphQL Docs
Community: GitHub Discussions

🏷️ Keywords & Tags
For LLM Discovery: crypto-api, cryptocurrency-data, bitcoin-api, ethereum-api, social-sentiment, trading-api, blockchain-data, crypto-intelligence, typescript-sdk, graphql-client, lunarcrush-sdk, crypto-trading, market-data, social-analytics, mcp-integration, ai-workflows

Ready to build? Subscribe to LunarCrush and copy the examples above! 🚀
