# lunarcrush-comprehensive-sdk

🌙 **Comprehensive TypeScript SDK for LunarCrush crypto social intelligence**

**✨ 100% GraphQL backend coverage with standardized method names and shared type system**

## 🚀 Installation

```bash
npm install lunarcrush-comprehensive-sdk
```

## 📊 SDK Features

This SDK provides **complete access** to LunarCrush data with comprehensive improvements:

- **📈 Methods**: 23 standardized methods with backward compatibility
- **📊 Topic Fields**: 13+ comprehensive topic fields
- **💰 Crypto Fields**: 31+ detailed cryptocurrency fields
- **🎯 Backend Coverage**: 100% GraphQL API coverage
- **🔄 Shared Types**: Uses `@lunarcrush/shared-types` for consistency across all packages

## 🎯 Quick Start

```typescript
import { LunarCrushClient } from 'lunarcrush-comprehensive-sdk';

const client = new LunarCrushClient();

// Get comprehensive Bitcoin data with 13+ fields
const bitcoin = await client.getTopicByName('bitcoin');
console.log({
  topic: bitcoin.topic,
  rank: bitcoin.topic_rank,
  sentiment: bitcoin.types_sentiment,
  categories: bitcoin.categories,
  interactions: bitcoin.interactions_24h
});

// Get comprehensive crypto list with 31+ fields
const cryptos = await client.getCryptocurrencies({ limit: 10 });
console.log({
  name: cryptos[0].name,
  price: cryptos[0].price,
  marketCap: cryptos[0].market_cap,
  galaxyScore: cryptos[0].galaxy_score,
  altRank: cryptos[0].alt_rank,
  sentiment: cryptos[0].sentiment,
  socialDominance: cryptos[0].social_dominance,
  blockchains: cryptos[0].blockchains
});
```

## 📋 All 23 Standardized Methods

### Core Enhanced Methods

- `getApiHealth()` - API health check
- `getTopicByName(topic)` - Get topic data with 13+ fields
- `getTopics()` - List all available topics
- `getCryptocurrencies(options)` - Get crypto list with 31+ fields
- `getCryptocurrency(coin)` - Single cryptocurrency details
- `getBitcoin()`, `getEthereum()` - Enhanced convenience methods

### Comprehensive Data Methods

- `getStocks(options)` - Stock data with social intelligence
- `getStock(symbol)` - Individual stock details
- `getCategories()` - Category listings
- `getCategory(category)` - Category details
- `getCreators()` - Social creator data
- `getCreator(network, id)` - Individual creator details
- `getTopicTimeSeries(topic, options)` - Historical topic data
- `getCryptocurrencyTimeSeries(coin, options)` - Crypto historical data
- `getTopicPosts(topic, options)` - Social posts for topics
- `getTopicNews(topic)` - News articles for topics
- `getSearches()` - Search functionality
- `searchPosts(term, options)` - Search social posts
- `getSystemChanges()` - System updates and changes

## 🔄 Backward Compatibility

All original method names are still supported via aliases:

```typescript
// New standardized names (recommended)
const bitcoin = await client.getTopicByName('bitcoin');
const cryptos = await client.getCryptocurrencies({ limit: 10 });

// Original names (still work)
const bitcoin = await client.topic('bitcoin');
const cryptos = await client.cryptocurrencies({ limit: 10 });
```

## 🏗️ Architecture

This SDK is built on a shared type system using `@lunarcrush/shared-types`:

- **Consistent Types**: All types, enums, and interfaces shared across SDK, CLI, and backend
- **GraphQL Integration**: Pre-built queries optimized for the LunarCrush GraphQL API
- **Type Safety**: Full TypeScript support with comprehensive JSDoc documentation
- **Method Mapping**: Standardized method names with backward compatibility aliases

## 🌙 Powered by LunarCrush

Built for the [LunarCrush](https://lunarcrush.com) GraphQL backend with complete schema coverage.

**Backend Specs:**

- 39 GraphQL Types supported
- 109 Query Endpoints accessible
- 100% Field Coverage achieved
