# 🌙 LunarCrush Universal - Complete Social Intelligence Platform

> **Production-ready ecosystem for crypto social intelligence with real-time data**

![GraphQL](https://img.shields.io/badge/GraphQL-Ready-e10098) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue) ![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange) ![Auto-Generated](https://img.shields.io/badge/Schema-Auto--Generated-brightgreen)

## 🚀 **Live Production Endpoint**

### **🌐 [GraphQL API](https://lunarcrush.cryptoguard-api.workers.dev/graphql)**
```
https://lunarcrush.cryptoguard-api.workers.dev/graphql
```
Complete GraphQL API with 38+ resolvers covering 100% of LunarCrush API v4

## 🏗️ **Architecture Overview**

### **Single Source of Truth**
```
schema/schema.graphql → codegen → packages/*/src/generated/
```

### **Packages**
```
lunarcrush-universal/
├── packages/
│   ├── backend-yoga/    # 🚀 GraphQL Yoga + Cloudflare Workers
│   ├── sdk/             # 📦 TypeScript SDK for all platforms
│   └── cli/             # 🔧 Command-line interface
├── schema/
│   └── schema.graphql   # 📋 Single source of truth (673 lines)
└── scripts/
    └── generate-*.js    # 🔄 Auto-generation scripts
```

## 🔥 **Features**

### **🌐 Complete API Coverage**
- ✅ **Topics**: 8 resolvers for social intelligence
- ✅ **Categories**: 7 resolvers for DeFi, NFT, Gaming categories
- ✅ **Creators**: 4 resolvers for influencer tracking
- ✅ **Coins**: 5 resolvers for crypto social + financial data
- ✅ **Stocks**: 4 resolvers for stock social sentiment
- ✅ **NFTs**: 5 resolvers for NFT collection analytics
- ✅ **System**: 5 resolvers for search and system data

### **⚡ Real-time Social Intelligence**
- **100M+ daily interactions** processed from LunarCrush
- **Cross-platform data**: Twitter, Reddit, YouTube, TikTok
- **Live sentiment tracking** and trend detection
- **No mock data** - all real LunarCrush API integration

### **🔄 Auto-Generated Architecture**
- **Single source of truth**: `schema/schema.graphql`
- **Auto-generated types** in each package
- **No manual schema editing** - everything from codegen
- **Future-proof** - LunarCrush API changes only need schema updates

### **🎯 Production Ready**
- **<500ms response times** globally via Cloudflare
- **Built-in error handling** and proper GraphQL errors
- **CORS enabled** for frontend integration
- **GraphiQL playground** for API exploration

## 🚀 **Quick Start**

### **1. Query the Live API**
```bash
curl -X POST https://lunarcrush.cryptoguard-api.workers.dev/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ getTopic(topic: \"bitcoin\") { topic interactions_24h } }"}'
```

### **2. Use GraphiQL Playground**
Visit: https://lunarcrush.cryptoguard-api.workers.dev/graphql

### **3. Example Queries**

**Bitcoin Social Data:**
```graphql
query {
  getTopic(topic: "bitcoin") {
    topic
    title
    interactions_24h
    num_contributors
    trend
    categories
  }
}
```

**Top Cryptocurrencies:**
```graphql
query {
  getCoinsList {
    symbol
    name
    close
    market_cap
    alt_rank
    interactions_24h
  }
}
```

**DeFi Category Analytics:**
```graphql
query {
  getCategory(category: "defi") {
    category
    title
  }
  getCategoryTopics(category: "defi") {
    topic
    title
  }
}
```

## 🔧 **Development**

### **Prerequisites**
```bash
git clone https://github.com/yourusername/lunarcrush-universal
cd lunarcrush-universal
npm install
```

### **CodeGen Workflow**
```bash
# Generate all types from schema
npm run codegen:full

# Generate backend schema only
npm run codegen:backend

# Verify all packages build
npm run codegen:verify
```

### **Local Development**
```bash
# Backend development
cd packages/backend-yoga
npm run dev

# Test all resolvers
npm run test:resolvers
```

### **When LunarCrush API Changes**
```bash
# 1. Edit single source of truth
vim schema/schema.graphql

# 2. Regenerate everything
npm run codegen:full

# 3. Deploy
cd packages/backend-yoga && npm run deploy
```

## 📊 **Performance Metrics**

- **API Response Time**: <500ms globally via Cloudflare
- **Data Freshness**: Updated every 15 minutes from LunarCrush
- **Schema Size**: 673 lines covering complete API
- **Generated Types**: 32 interfaces, 3 enums per package
- **Test Coverage**: 38+ resolvers with comprehensive testing

## 🧪 **Comprehensive Testing**

### **Test All Resolvers**
```bash
cd packages/backend-yoga
npm run test:resolvers
```

### **Expected Output**
```
🧪 LunarCrush Universal - Comprehensive Resolver Testing
🔵 TOPICS RESOLVERS:
  getTopicsList... ✅ 234ms
  getTopic... ✅ 156ms
  getTopicWhatsup... ✅ 289ms

🔵 CATEGORIES RESOLVERS:
  getCategoriesList... ✅ 198ms
  getCategory... ✅ 167ms

📊 OVERALL RESULTS:
✅ Successful: 38/38 (100%)
🎉 ALL RESOLVERS WORKING! Ready for production.
```

## 📚 **Documentation**

- **[CodeGen Guide](./CODEGEN.md)** - Auto-generation workflow
- **[Backend README](./packages/backend-yoga/README.md)** - GraphQL API docs
- **[Schema](./schema/schema.graphql)** - Complete GraphQL schema

## 🎯 **Use Cases**

### **For Crypto Traders**
```graphql
query TradingInsights {
  getTopic(topic: "bitcoin") {
    interactions_24h
    sentiment
    trend
  }
  getCoin(symbol: "BTC") {
    close
    market_cap
    volume_24h
  }
}
```

### **For Content Creators**
```graphql
query SocialTrends {
  getTopicsList {
    topic
    interactions_24h
    trend
  }
  getTopicCreators(topic: "ethereum") {
    name
    followers
    interactions_24h
  }
}
```

### **For Developers**
```graphql
query APIExploration {
  __schema {
    types {
      name
      fields {
        name
        type {
          name
        }
      }
    }
  }
}
```

## 🎨 **For Articles & Tutorials**

This project is perfect for dev.to articles:

1. **"Build a Real-Time Crypto Social Intelligence API with GraphQL Yoga"** (15-20 min read)
2. **"Auto-Generate TypeScript Types from GraphQL Schema"** (10 min read)
3. **"Deploy GraphQL API to Cloudflare Workers in 5 Minutes"** (5 min read)
4. **"Comprehensive GraphQL Resolver Testing Strategy"** (12 min read)

Each tutorial includes:
- ✅ **Copy-paste code examples**
- ✅ **Real data (no mocking)**
- ✅ **Production deployment**
- ✅ **GitHub repo for cloning**

## 🔗 **Links**

- **Live GraphQL API**: https://lunarcrush.cryptoguard-api.workers.dev/graphql
- **LunarCrush API Docs**: https://lunarcrush.com/developers/api/endpoints
- **GraphQL Yoga**: https://the-guild.dev/graphql/yoga-server
- **Cloudflare Workers**: https://workers.cloudflare.com/

## 💼 **For Portfolio & Interviews**

This project demonstrates:

- ✅ **Enterprise-scale data processing** (100M+ daily interactions)
- ✅ **Modern TypeScript development** with full type safety
- ✅ **GraphQL API development** with comprehensive schema
- ✅ **Auto-generation workflows** for maintainable code
- ✅ **Production deployment** on Cloudflare Workers
- ✅ **Comprehensive testing** of all API endpoints
- ✅ **Monorepo management** with clean architecture
- ✅ **Documentation-driven development**

Currently interviewing at **Amazon** - this showcases full-stack TypeScript, GraphQL expertise, and production deployment skills.

---

**Built by [Danilo Jamaal Batson](https://danilobatson.github.io/) - Software Engineer**

🌙 *Bringing social intelligence to crypto trading*
