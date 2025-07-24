# 🚀 lunarcrush-sdk

> **Universal TypeScript SDK for real-time crypto social intelligence with AI analysis**

[![npm version](https://img.shields.io/npm/v/lunarcrush-sdk)](https://www.npmjs.com/package/lunarcrush-sdk)
[![npm downloads](https://img.shields.io/npm/dm/lunarcrush-sdk)](https://www.npmjs.com/package/lunarcrush-sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](#)

## ⚡ Quick Start

```bash
npm install lunarcrush-sdk
typescriptimport LunarCrushClient from 'lunarcrush-sdk';

const client = new LunarCrushClient({ aiMode: true });

// Get Bitcoin social intelligence
const bitcoin = await client.topic('bitcoin');
console.log(`Bitcoin: ${bitcoin.data.interactions_24h.toLocaleString()} interactions!`);

// AI-powered analysis
const analysis = await client.aiAnalyze('bitcoin', 'Trading signals?');
console.log(analysis.data.aiInsights.recommendation);
🔥 Real Data (Live)
Current Bitcoin metrics:

103,577,588 social interactions in 24 hours
106,995 active contributors discussing Bitcoin
AI-powered insights and trading recommendations

✨ Features

🤖 AI Integration - Built-in GPT prompts and explanations
⚡ Real-time Data - 100M+ daily social interactions processed
🌐 Universal - React, Vue, Node.js, browser compatible
🔄 Smart Caching - Automatic with configurable TTL
📊 Complete API - All LunarCrush endpoints via GraphQL
🛡️ Production Ready - Error handling, retries, TypeScript

📚 Full Documentation
See the complete project for:

GraphQL API backend
CLI tools (create-lunarcrush-app)
Examples and tutorials
Production deployment guides


Built by Danilo Batson | LinkedIn
