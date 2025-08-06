# 🚀 LunarCrush Universal - Production Hono GraphQL API

> **Production-ready GraphQL API with comprehensive LunarCrush integration**

## 🎯 Production Status

- ✅ **GraphQL-First**: All data access through comprehensive GraphQL API with 41+ resolvers
- ✅ **Performance**: Intelligent KV caching with optimized response times
- ✅ **Enterprise Ready**: Authentication, CORS, security headers, validation middleware
- ✅ **Live Deployment**: [Production API](https://lunarcrush.cryptoguard-api.workers.dev)

## 🎉 API Coverage

**Complete LunarCrush Integration:**

- **GraphQL Resolvers**: 41 resolvers comprehensively tested with 100% success rate
- **Data Types**: Cryptocurrencies, Topics, Categories, Creators, Stocks, NFTs, Posts, System Health
- **Performance**: Optimized response times with intelligent caching and compression
- **Data Coverage**: 1000+ cryptocurrencies, stocks, NFTs, and social intelligence
- **Security**: No rate limiting (handled upstream by LunarCrush), input validation, secure headers

## 🏗️ Clean Architecture

```text
src/
├── index.ts                    # 🚀 Main application entry (GraphQL-focused)
├── schema.ts                   # 📋 Auto-generated from schema/schema.graphql
├── routes/                     # 🎯 Documentation and API specification
│   └── docs.ts                # 📚 API documentation, homepage, SEO (robots.txt, sitemap)
├── middleware/                 # 🛡️ Security and request handling
│   ├── index.ts               # 🔧 Main middleware setup (CORS, security, compression)
│   └── validation.ts          # ✅ Request validation using @hono/zod-validator
├── graphql/
│   └── resolvers.ts           # 🚀 Centralized GraphQL resolvers (41 total)
├── services/
│   ├── lunarcrush.ts          # 🔧 Core LunarCrush API integration
│   ├── lunarcrush-fixes.ts    # 🛠️ Enhanced resolver implementations
│   └── caching.ts             # ⚡ Intelligent KV caching layer
├── lib/
│   ├── auth.ts                # � Enhanced authentication with multiple header support
│   └── types.ts               # 📋 Type definitions and interfaces
└── types/
    └── generated.ts           # 🤖 Auto-generated TypeScript types from GraphQL schema
```

### 🔥 Advanced Features

- **🛡️ Security**: Input validation with Zod schemas, CORS, secure headers, authentication
- **📊 Monitoring**: Real-time metrics, health checks via GraphQL (`systemHealth`, `ping`)
- **⚡ Caching**: Intelligent KV layer with configurable TTL and compression
- **🎯 GraphQL-First**: Clean separation of concerns with resolver-based architecture
- **🔧 Middleware**: Uses official Hono packages for validation, error handling, compression

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Cloudflare account with Workers enabled
- LunarCrush API key

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Cloudflare Workers
npm run deploy
```

### Environment Variables

```bash
LUNARCRUSH_API_KEY=your_api_key_here
LUNARCRUSH_CACHE=your_kv_namespace
ENVIRONMENT=development|production
```

## 📚 API Documentation

### GraphQL Endpoint

```
POST /graphql
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "query": "query { getCoinsList(limit: 10) { data { symbol name price } } }"
}
```

### Available Endpoints

| Endpoint         | Purpose                       | Auth Required | Features                           |
| ---------------- | ----------------------------- | ------------- | ---------------------------------- |
| `/graphql`       | Main GraphQL API              | ✅             | 41 resolvers, playground, schema   |
| `/docs`          | Interactive API documentation | ❌             | Scalar API reference, live testing |
| `/`              | LLM-friendly homepage         | ❌             | Text/HTML format detection         |
| `/robots.txt`    | SEO robots configuration      | ❌             | Search engine optimization         |
| `/sitemap.xml`   | XML sitemap for indexing      | ❌             | SEO and discovery                  |
| `/api-spec.json` | OpenAPI specification         | ❌             | API schema and documentation       |

### GraphQL Schema Highlights

**Cryptocurrency Data:**

- `getCoinsList` - List cryptocurrencies with filters
- `getCoin` - Get detailed coin information
- `getCoinTimeSeries` - Historical price/volume data

**Social Intelligence:**

- `getTopicsList` - Trending topics
- `getTopic` - Topic-specific data
- `getTopicTimeSeries` - Topic performance over time

**Market Data:**

- `getStocksList` - Stock market data
- `getCreatorsList` - Social media creators
- `getNftsList` - NFT collections

## 🛡️ Security Features

- **API Key Authentication**: Secure Bearer token validation with multiple header format support
- **Input Validation**: Request validation using `@hono/zod-validator` with proper error handling
- **Security Headers**: HSTS, CSP, X-Frame-Options, and comprehensive protection
- **CORS Protection**: Configurable cross-origin policies with Apollo Studio support
- **Error Handling**: Simplified error responses using Hono's `HTTPException` patterns
- **No Rate Limiting**: Removed custom rate limiting as LunarCrush API handles this upstream

## 📊 Performance Features

- **KV Caching**: Intelligent response caching with configurable TTL
- **Compression**: Gzip compression for all responses using Hono's built-in middleware
- **Real-time Metrics**: Dynamic performance tracking and monitoring
- **CDN Integration**: Global edge distribution via Cloudflare Workers
- **Security-First Design**: Minimal attack surface with essential monitoring via GraphQL
- **Environment-Aware**: Proper Cloudflare Workers environment variable handling

## � Architecture Improvements

### Recent Middleware Enhancements
- **Removed Rate Limiting**: LunarCrush API handles rate limiting upstream - no custom implementation needed
- **Official Hono Packages**: Replaced custom middleware with `@hono/zod-validator`, `@hono/sentry`, compression
- **Environment-Aware**: Fixed Sentry configuration to use `c.env` instead of `process.env` for Cloudflare Workers
- **Simplified Error Handling**: Using Hono's built-in `HTTPException` instead of custom error handlers
- **Enhanced Security**: API-focused security headers with stricter CSP and frame protection
- **Input Validation**: Type-safe request validation with clear error messages
- **Better Performance**: Added compression middleware and optimized security headers

### Clean Codebase
- **Less Custom Code**: Replaced custom implementations with proven Hono middleware packages
- **Better Maintainability**: Following Hono best practices and official patterns
- **Type Safety**: Enhanced validation using Zod schemas throughout the application

- **Error Tracking**: Detailed error reporting using Hono's `HTTPException` patterns
- **GraphQL Playground**: Interactive query exploration at `/graphql`
- **Live Reloading**: Fast development iteration with Wrangler dev
- **Input Validation**: Type-safe request validation using `@hono/zod-validator`
- **Environment Variables**: Proper Cloudflare Workers `c.env` usage instead of `process.env`

## 📈 Monitoring & Observability

### Health Checks

```bash
# GraphQL system health
curl -X POST https://your-api.workers.dev/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"query { systemHealth { status uptime version } }"}'

# Simple ping check
curl -X POST https://your-api.workers.dev/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"query { ping { status timestamp } }"}'
```

### Performance Metrics

- **Response Times**: Real-time calculation per request
- **Cache Hit Rates**: KV cache performance tracking
- **Error Rates**: Automatic error categorization
- **Uptime**: Dynamic uptime calculation from start time

## 🚀 Deployment

### Cloudflare Workers

```bash
# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:production

# Deploy with specific environment
npm run deploy -- --env production
```

### Environment Configuration

The API automatically detects the deployment environment and adjusts:

- **Development**: Verbose logging, enhanced error messages
- **Staging**: Reduced logging, limited access
- **Production**: Minimal logging, optimized performance

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [API Docs](https://lunarcrush.cryptoguard-api.workers.dev/docs)
- **GraphQL Playground**: [Interactive Explorer](https://lunarcrush.cryptoguard-api.workers.dev/graphql)
- **Issues**: [GitHub Issues](https://github.com/danilobatson/lunarcrush-universal/issues)

---

Built with ❤️ using [Hono](https://hono.dev/) and [GraphQL](https://graphql.org/)
