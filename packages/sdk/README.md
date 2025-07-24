# LunarCrush Universal SDK

A framework-agnostic TypeScript SDK for accessing LunarCrush social intelligence data via GraphQL.

## Installation

```bash
npm install lunarcrush-universal-sdk
Quick Start
typescriptimport LunarCrushClient from 'lunarcrush-universal-sdk';

// Initialize client (connects to GraphQL backend)
const client = new LunarCrushClient();

// Get Bitcoin data
const bitcoin = await client.bitcoin();
console.log(`Bitcoin: ${bitcoin.interactions_24h.toLocaleString()} interactions today`);

// Get top cryptocurrencies
const topCryptos = await client.topCryptos(5);
topCryptos.forEach(coin => {
  console.log(`${coin.symbol}: $${coin.price.toFixed(2)}`);
});
API Methods

health() - Check GraphQL backend status
bitcoin() - Get Bitcoin topic data
ethereum() - Get Ethereum topic data
topic(name) - Get any topic data
cryptocurrencies(limit) - List cryptocurrencies
topCryptos(limit) - Top cryptos by social activity

Features

🌐 Framework Agnostic - Works in React, Vue, Node.js, browsers
🔒 No API Key Required - Backend handles authentication
📊 Real-time Data - 100M+ daily social interactions
🔥 TypeScript Support - Fully typed responses
⚡ GraphQL Powered - Efficient data fetching

Configuration
typescriptconst client = new LunarCrushClient({
  baseUrl: 'https://your-backend.com/graphql' // Optional
});
Built with ❤️ for the crypto developer community.
