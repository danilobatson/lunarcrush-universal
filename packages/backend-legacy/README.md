# LunarCrush Universal Backend

🚀 **High-performance GraphQL API backend powered by Cloudflare Workers**

Complete GraphQL API implementation providing access to LunarCrush cryptocurrency social intelligence data with advanced analytics and AI capabilities.

## 🌟 Features

- **📊 GraphQL API**: Complete GraphQL schema with 39 types and 109 query endpoints
- **⚡ Cloudflare Workers**: Serverless deployment with global edge distribution
- **🤖 AI Analytics**: Integrated Gemini AI for advanced sentiment analysis
- **🔗 MCP Integration**: Model Context Protocol support for AI tools
- **📈 Real-time Data**: Live cryptocurrency and social media data
- **🔧 Type Safety**: Built with TypeScript and shared type system

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Start development server
npm run dev
```

### Deploy to Cloudflare Workers

```bash
# Install Wrangler CLI
npm install -g wrangler

# Authenticate with Cloudflare
wrangler auth

# Deploy to production
npm run deploy
```

## 🌐 API Endpoints

### GraphQL Playground
- **Production**: `https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/graphql`
- **Health Check**: `https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/health`

### Core Endpoints

#### Cryptocurrency Data
```graphql
# Get single cryptocurrency
query GetCoin($symbol: String!) {
  getCoin(symbol: $symbol) {
    name
    symbol
    price
    galaxy_score
    alt_rank
    sentiment
    social_dominance
  }
}

# Get cryptocurrency list
query GetCoins($limit: Int, $order_by: String) {
  getCoins(limit: $limit, order_by: $order_by) {
    name
    symbol
    price
    market_cap
    volume_24h
    galaxy_score
  }
}
```

#### Topic & Social Data
```graphql
# Get topic information
query GetTopic($topic: String!) {
  getTopic(topic: $topic) {
    topic
    title
    topic_rank
    interactions_24h
    sentiment
    categories
  }
}

# Get social posts
query GetTopicPosts($topic: String!, $limit: Int) {
  getTopicPosts(topic: $topic, limit: $limit) {
    id
    title
    url
    time
    interactions
  }
}
```

## 🏗️ Architecture

### Tech Stack
- **Runtime**: Cloudflare Workers
- **Language**: TypeScript
- **API**: GraphQL with custom resolvers
- **Database**: Cloudflare D1 (SQLite)
- **AI**: Google Gemini API
- **Types**: `@lunarcrush/shared-types`

### Project Structure
```
src/
├── index.ts                 # Worker entry point
├── graphql/
│   ├── server.ts           # GraphQL server setup
│   ├── resolvers/          # Query resolvers
│   └── schema/             # GraphQL type definitions
├── services/
│   ├── lunarcrush.ts      # LunarCrush API integration
│   └── ai/
│       ├── gemini-service.ts    # AI analytics
│       └── mcp-service.ts       # MCP integration
└── migrations/
    └── 0001_initial_schema.sql  # Database schema
```

## 🔧 Configuration

### Environment Variables
```bash
# Required
LUNARCRUSH_API_KEY=your_lunarcrush_api_key
GEMINI_API_KEY=your_gemini_api_key

# Optional
CORS_ORIGIN=*
MAX_QUERY_DEPTH=10
RATE_LIMIT_RPM=1000
```

### Wrangler Configuration
```toml
name = "lunarcrush-universal-backend"
main = "src/index.ts"
compatibility_date = "2024-01-15"

[vars]
NODE_ENV = "production"

[[d1_databases]]
binding = "DB"
database_name = "lunarcrush-data"
database_id = "your-database-id"
```

## 📊 API Schema

### Available Types
- **Cryptocurrency**: Complete crypto data with 31+ fields
- **Topic**: Social topics with sentiment analysis
- **Creator**: Social media creator information
- **Post**: Social media posts and interactions
- **Stock**: Stock market data with social intelligence
- **Category**: Market categories and classifications

### Supported Queries
- `getCoin(symbol)` - Single cryptocurrency data
- `getCoins(options)` - Cryptocurrency list with filtering
- `getTopic(topic)` - Topic information and metrics
- `getTopics()` - All available topics
- `getTopicPosts(topic, options)` - Social posts for topics
- `getCreators()` - Social media creators
- `getStocks(options)` - Stock market data
- And 15+ more endpoints...

## 🤖 AI Integration

### Gemini Analytics
```typescript
// Sentiment analysis
const analysis = await geminiService.analyzeSentiment(posts);

// Market insights
const insights = await geminiService.generateInsights(marketData);
```

### MCP Integration
```typescript
// Tool integration
const mcpTools = await mcpService.getAvailableTools();

// Execute MCP operations
const result = await mcpService.executeOperation(tool, params);
```

## 🚀 Deployment

### Automatic Deployment
```bash
# Deploy with latest changes
npm run deploy

# Deploy with specific environment
wrangler deploy --env production
```

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy with Wrangler: `wrangler deploy`
3. Verify deployment: Check health endpoint

## 🛠️ Development

### Adding New Resolvers
1. Define types in `src/graphql/schema/types.ts`
2. Implement resolver in `src/graphql/resolvers/`
3. Update shared types in `@lunarcrush/shared-types`
4. Test with GraphQL playground

### Database Migrations
```bash
# Create migration
wrangler d1 migrations create lunarcrush-data "migration_name"

# Apply migration
wrangler d1 migrations apply lunarcrush-data
```

## 📈 Monitoring & Performance

- **Response Time**: <100ms average globally
- **Uptime**: 99.9% with Cloudflare Workers
- **Scaling**: Automatic based on traffic
- **Caching**: Edge caching for optimal performance

## 🔗 Integration

This backend is designed to work seamlessly with:
- **SDK**: `lunarcrush-comprehensive-sdk`
- **CLI**: `create-lunarcrush-app`
- **Types**: `@lunarcrush/shared-types`

## 📚 Documentation

- **GraphQL Schema**: Available at `/graphql` endpoint
- **API Reference**: See `API_DOCS.md` in root directory
- **Type Definitions**: Check `@lunarcrush/shared-types` package

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-endpoint`
3. Add tests and documentation
4. Submit pull request

## 📄 License

MIT License - see LICENSE file for details.
