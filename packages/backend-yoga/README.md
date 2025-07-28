# 🌙 LunarCrush Universal - GraphQL Yoga Backend

> **Production-ready GraphQL API for LunarCrush social intelligence data**

## 🚀 **Live Endpoint**
```
https://lunarcrush.cryptoguard-api.workers.dev/graphql
```

## 🎯 **Features**

### **Complete API Coverage**
- ✅ **38+ GraphQL Resolvers** - 100% LunarCrush API v4 coverage
- ✅ **Real-time Data** - No mocking, direct LunarCrush integration
- ✅ **Auto-generated Schema** - Single source of truth from `schema/schema.graphql`

### **Topics Intelligence (8 endpoints)**
- `getTopicsList` - Trending topics by social volume
- `getTopic` - Detailed topic analytics
- `getTopicWhatsup` - AI-generated topic summaries
- `getTopicTimeSeries` - Historical social metrics
- `getTopicPosts` - Social posts mentioning topic
- `getTopicNews` - News articles about topic
- `getTopicCreators` - Influencers discussing topic

### **Categories (7 endpoints)**
- Complete category-based social intelligence
- DeFi, NFT, Gaming, and more categories
- Category-specific time series and creator data

### **Creators (4 endpoints)**
- Social media influencer tracking
- Cross-platform creator analytics
- Creator engagement metrics

### **Financial Data (14 endpoints)**
- **Coins**: BTC, ETH, and 1000+ cryptocurrencies
- **Stocks**: AAPL, TSLA, and major stocks with social data
- **NFTs**: CryptoPunks, BAYC, and trending collections

### **System (5 endpoints)**
- Search functionality
- System changes tracking
- Post-level analytics

## 🏗️ **Architecture**

### **Single Source of Truth**
```
schema/schema.graphql → codegen → src/schema.ts → GraphQL Yoga
```

### **Auto-Generated Schema**
- **Never edit `src/schema.ts` manually**
- Edit `schema/schema.graphql` and run `npm run codegen`
- Ensures consistency across all packages

### **GraphQL Yoga + Cloudflare Workers**
- Modern GraphQL server with inline resolvers
- Edge deployment for <200ms global response times
- Built-in CORS, GraphiQL, and error handling

## 🔧 **Development**

### **Prerequisites**
```bash
# From project root
npm run codegen:all  # Generate schema and types
```

### **Local Development**
```bash
cd packages/backend-yoga
npm run dev          # Start Wrangler dev server
```

### **Testing**
```bash
# Test all 38+ resolvers
npm run test:resolvers

# Test specific category
node test-all-resolvers.js | grep "Topics"
```

### **Deployment**
```bash
npm run deploy       # Deploy to Cloudflare Workers
```

## 📊 **Performance**

- **Response Time**: <500ms globally via Cloudflare
- **Data Freshness**: Updated every 15 minutes from LunarCrush
- **Rate Limits**: Handled automatically with proper error messages
- **Caching**: Edge caching for improved performance

## 🔍 **Example Queries**

### **Get Bitcoin Social Data**
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

### **Top Cryptocurrencies**
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

### **Creator Analytics**
```graphql
query {
  getCreator(network: "twitter", id: "elonmusk") {
    id
    name
    display_name
    followers
    interactions_24h
  }
}
```

## 🛠️ **CodeGen Workflow**

### **When LunarCrush API Changes**
```bash
# 1. Update the single source of truth
vim ../../schema/schema.graphql

# 2. Regenerate all files
npm run codegen

# 3. Test and deploy
npm run test:resolvers
npm run deploy
```

### **Adding New Resolvers**
1. Add to `schema/schema.graphql`
2. Run `npm run codegen`
3. Add resolver implementation to `src/index-comprehensive.ts`
4. Add service function to `src/services/lunarcrush.ts`
5. Test with `npm run test:resolvers`

## 🔐 **Environment Setup**

### **Required Secrets (Cloudflare Workers)**
```bash
# Set via Wrangler CLI
wrangler secret put LUNARCRUSH_API_KEY
```

### **Local Development**
```bash
# Create .dev.vars file
echo "LUNARCRUSH_API_KEY=your_api_key_here" > .dev.vars
```

## 📚 **Generated Files**

### **Auto-Generated (Never Edit)**
- `src/schema.ts` - GraphQL schema for Yoga
- `src/generated/types.ts` - TypeScript types

### **Manual Files**
- `src/index-comprehensive.ts` - Resolver implementations
- `src/services/lunarcrush.ts` - LunarCrush API client
- `wrangler.toml` - Cloudflare Workers config

## 🎯 **For Articles & Tutorials**

This backend is designed for 15-30 minute development tutorials:

1. **Clone and Setup** (3 minutes)
2. **Add API Key** (2 minutes)
3. **Deploy to Cloudflare** (5 minutes)
4. **Test GraphQL Queries** (10 minutes)
5. **Build Dashboard** (15 minutes)

Perfect for dev.to articles about GraphQL, Cloudflare Workers, and crypto social intelligence!

## 🔗 **Links**

- **GraphQL Playground**: https://lunarcrush.cryptoguard-api.workers.dev/graphql
- **LunarCrush API Docs**: https://lunarcrush.com/developers/api/endpoints
- **Cloudflare Workers**: https://workers.cloudflare.com/

---

Built with ❤️ for crypto social intelligence
