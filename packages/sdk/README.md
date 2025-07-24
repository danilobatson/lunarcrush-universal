# 🚀 LunarCrush Universal SDK

**The most comprehensive social intelligence SDK for crypto, stocks, and social data.**

[![npm version](https://badge.fury.io/js/%40lunarcrush%2Fsdk.svg)](https://badge.fury.io/js/%40lunarcrush%2Fsdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## ✨ Features

- **🤖 AI-Powered** - Built-in AI analysis with customizable prompts
- **🌐 Universal** - Works in React, Vue, Node.js, vanilla JS, anywhere
- **⚡ Real-time** - Live social intelligence data from LunarCrush
- **🔄 Smart Caching** - Automatic caching with configurable TTL
- **📊 Complete Coverage** - Crypto, stocks, social data, time series
- **🎯 TypeScript** - Full type safety and IntelliSense support
- **🛡️ Production Ready** - Error handling, retries, rate limiting

## 🚀 Quick Start

### Installation

```bash
npm install @lunarcrush/sdk
# or
yarn add @lunarcrush/sdk
# or
pnpm add @lunarcrush/sdk
Basic Usage
javascriptimport LunarCrushClient from '@lunarcrush/sdk';

// Initialize client
const client = new LunarCrushClient({
  apiKey: 'your-lunarcrush-api-key', // Optional: uses demo data if not provided
  aiMode: true,                      // Enable AI features
  explanations: true                 // Get human-readable explanations
});

// Get crypto data
const bitcoin = await client.topic('bitcoin');
console.log(`Bitcoin has ${bitcoin.data.interactions_24h.toLocaleString()} interactions today!`);

// Get AI-powered insights
const analysis = await client.aiAnalyze('bitcoin', 'What does this data tell us about market sentiment?');
console.log(analysis.data.aiInsights.recommendation);

// Get cryptocurrency rankings
const topCryptos = await client.cryptocurrencies({ 
  sort: 'interactions_24h', 
  limit: 10 
});
🤖 AI-Powered Features
Custom AI Prompts
javascript// Set global AI context
client.setPrompt('Analyze from a day trading perspective');

// Get AI analysis with custom prompt
const insights = await client.aiAnalyze('ethereum', 
  'Should I buy ETH based on social sentiment?'
);

// Use pre-built prompt templates
const templates = client.getPromptTemplates();
// Returns: crypto-analysis, trading-signals, risk-assessment, etc.
Smart Explanations
javascriptconst client = new LunarCrushClient({ 
  explanations: true,
  aiMode: true 
});

const result = await client.topic('bitcoin');
console.log(result.explanation);
// "This topic has 104,738,663 interactions in the last 24 hours."
📊 Complete API Coverage
Topics & Social Data
javascript// Get any topic (crypto, stock, person, trend)
const bitcoin = await client.topic('bitcoin');
const tesla = await client.topic('tesla');

// Get social posts
const posts = await client.posts('bitcoin', '2024-01-01');

// Get time series data
const history = await client.timeSeries('bitcoin', {
  interval: '1d',
  start: '2024-01-01'
});
Cryptocurrency Data
javascript// Get crypto rankings
const cryptos = await client.cryptocurrencies({
  sort: 'market_cap',
  limit: 50
});

// Filter by sentiment
const bullishCryptos = cryptos.data.filter(crypto => crypto.sentiment > 80);
Creator & Influencer Data
javascript// Get influencer data
const elonMusk = await client.creator('x', 'elonmusk');
console.log(`Elon has ${elonMusk.data.creator_followers} followers`);
Stock Market Data
javascript// Get stock data with social intelligence
const stocks = await client.stocks({
  sort: 'interactions_24h',
  limit: 20
});
⚙️ Configuration Options
javascriptconst client = new LunarCrushClient({
  // Core Settings
  apiKey: 'your-key',              // Your LunarCrush API key
  mode: 'production',              // 'demo' | 'production'
  endpoint: 'custom-endpoint',     // Override default endpoint
  
  // Data Control
  returnKeys: ['symbol', 'price'], // Only return specific fields
  format: 'minimal',               // 'json' | 'minimal'
  
  // Performance
  cache: true,                     // Enable response caching
  timeout: 10000,                  // Request timeout (ms)
  retries: 3,                      // Number of retries
  
  // AI Features
  aiMode: true,                    // Enable AI features
  prompt: 'Trading context',       // Default AI prompt
  explanations: true,              // Generate explanations
  
  // Developer Experience
  debug: true,                     // Enable debug logging
  playground: true,                // Enable playground integration
  docs: 'interactive'              // Documentation mode
});
🔄 Response Format
All methods return a consistent response format:
javascript{
  data: { /* Your requested data */ },
  success: true,
  cached: false,
  timestamp: 1753319301522,
  usage: {
    requests_remaining: 1000,
    reset_time: 1753322901522
  },
  // AI enhancements (if enabled)
  aiContext: "Social intelligence analysis",
  explanation: "This topic has 104,738,663 interactions in the last 24 hours."
}
🛠️ Framework Integration
React
jsximport { useState, useEffect } from 'react';
import LunarCrushClient from '@lunarcrush/sdk';

function CryptoDashboard() {
  const [bitcoin, setBitcoin] = useState(null);
  const client = new LunarCrushClient({ aiMode: true });

  useEffect(() => {
    client.topic('bitcoin').then(setBitcoin);
  }, []);

  return (
    <div>
      {bitcoin && (
        <div>
          <h2>{bitcoin.data.title}</h2>
          <p>Interactions: {bitcoin.data.interactions_24h.toLocaleString()}</p>
          <p>{bitcoin.explanation}</p>
        </div>
      )}
    </div>
  );
}
Vue 3
vue<template>
  <div v-if="bitcoin">
    <h2>{{ bitcoin.data.title }}</h2>
    <p>Interactions: {{ bitcoin.data.interactions_24h.toLocaleString() }}</p>
    <p>{{ bitcoin.explanation }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import LunarCrushClient from '@lunarcrush/sdk';

const bitcoin = ref(null);
const client = new LunarCrushClient({ aiMode: true });

onMounted(async () => {
  bitcoin.value = await client.topic('bitcoin');
});
</script>
Node.js
javascriptimport LunarCrushClient from '@lunarcrush/sdk';

const client = new LunarCrushClient({
  apiKey: process.env.LUNARCRUSH_API_KEY,
  debug: true
});

// Analyze trending cryptocurrencies
const cryptos = await client.cryptocurrencies({ limit: 10 });
for (const crypto of cryptos.data) {
  const analysis = await client.aiAnalyze(crypto.symbol, 'Trading recommendation?');
  console.log(`${crypto.symbol}: ${analysis.data.aiInsights.recommendation}`);
}
📈 Real-World Examples
Crypto Sentiment Monitor
javascriptasync function monitorSentiment(symbols) {
  const client = new LunarCrushClient({ 
    aiMode: true, 
    explanations: true 
  });
  
  for (const symbol of symbols) {
    const sentiment = await client.sentiment(symbol);
    const analysis = await client.aiAnalyze(symbol, 
      'Should I be concerned about this sentiment trend?'
    );
    
    console.log(`${symbol}: ${sentiment.data.trend} (${analysis.explanation})`);
  }
}

monitorSentiment(['bitcoin', 'ethereum', 'solana']);
Social Trading Signals
javascriptasync function getTradingSignals() {
  const client = new LunarCrushClient({ 
    prompt: 'Generate trading signals based on social data' 
  });
  
  const cryptos = await client.cryptocurrencies({ 
    sort: 'interactions_24h', 
    limit: 20 
  });
  
  const signals = [];
  for (const crypto of cryptos.data) {
    if (crypto.interactions_24h > 10000000 && crypto.sentiment > 75) {
      const analysis = await client.aiAnalyze(crypto.symbol);
      signals.push({
        symbol: crypto.symbol,
        signal: 'BUY',
        reason: analysis.data.aiInsights.recommendation,
        confidence: crypto.sentiment
      });
    }
  }
  
  return signals;
}
🔧 Advanced Usage
Custom Error Handling
javascriptconst client = new LunarCrushClient({
  retries: 5,
  timeout: 15000,
  debug: true
});

try {
  const result = await client.topic('bitcoin');
  console.log('Success:', result);
} catch (error) {
  console.error('Failed after retries:', error.message);
}
Performance Optimization
javascript// Use return keys to get only what you need
const client = new LunarCrushClient({
  returnKeys: ['symbol', 'price', 'interactions_24h'],
  cache: true,
  format: 'minimal'
});

// Batch requests efficiently
const symbols = ['bitcoin', 'ethereum', 'solana'];
const results = await Promise.all(
  symbols.map(symbol => client.topic(symbol))
);
Playground Integration
javascript// Open GraphQL playground for testing
client.playground();

// Open with specific query
client.playground(`
  query {
    getTopic(topic: "bitcoin") {
      title
      interactions_24h
    }
  }
`);
🔑 API Key Setup

Get your free API key: LunarCrush Developer Portal
Set environment variable:
bashexport LUNARCRUSH_API_KEY="your-api-key"

Use in code:
javascriptconst client = new LunarCrushClient({
  apiKey: process.env.LUNARCRUSH_API_KEY
});



Note: Without an API key, the SDK uses demo data that's perfect for testing and development.

📚 Documentation

Complete API Documentation - Interactive GraphQL playground
LunarCrush API Docs - Official API documentation
TypeScript Definitions - Complete type definitions

🧪 Testing
bash# Run all tests
npm test

# Test with real API
npm run test:real

# Build and test package
npm run build
npm pack
🤝 Contributing
We welcome contributions! Please see our Contributing Guide for details.
📄 License
MIT © Danilo Batson
🌟 Built With

LunarCrush API - Social intelligence data
GraphQL - Modern API query language
TypeScript - Type-safe JavaScript


Star ⭐ this repo if you found it helpful!
🚀 Get Started Now | 📖 Full Docs | 💬 Discord
