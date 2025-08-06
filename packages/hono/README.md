# 🚀 LunarCrush Universal - Production Hono GraphQL API

> **Production-ready GraphQL API with comprehensive LunarCrush integration and security-focused health monitoring**

[![Production Ready](https://img.shields.io/badge/Production-Ready-brightgreen)](https://lunarcrush.cryptoguard-api.workers.dev) [![GraphQL](https://img.shields.io/badge/GraphQL-40%2B%20Resolvers-E10098)](https://graphql.org/) [![Hono](https://img.shields.io/badge/Hono-Native-orange)](https://hono.dev/) [![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-F38020)](https://workers.cloudflare.com/)

## 🎯 Production Status

- ✅ **GraphQL-First**: All data access through comprehensive GraphQL API with 40+ resolvers
- ✅ **Security-Focused**: Simplified health monitoring without system information exposure
- ✅ **Performance**: Intelligent KV caching with <231ms average response time
- ✅ **Enterprise Ready**: Authentication, rate limiting, CORS, security headers
- ✅ **Live Deployment**: [Production API](https://lunarcrush.cryptoguard-api.workers.dev)

## 🎉 API Coverage

**Complete LunarCrush Integration:**

- **GraphQL Resolvers**: 40+ resolvers covering all LunarCrush API functionality
- **Success Rate**: 85%+ validated across all resolver categories  
- **Data Types**: Cryptocurrencies, Topics, Categories, Creators, Stocks, NFTs, Posts
- **Performance**: Sub-second responses with intelligent caching
- **Security**: Minimal health endpoints without system information exposure
- **Data Coverage**: 1000+ cryptocurrencies, stocks, NFTs, and social intelligence

## 🏗️ Clean Architecture

```text
src/
├── index.ts                    # 🚀 Main application entry (GraphQL-focused)
├── schema.ts                   # 📋 Auto-generated from schema/schema.graphql
├── routes/                     # 🎯 DX-focused endpoints
│   ├── health.ts              # 🏥 Health monitoring & metrics
│   ├── docs.ts                # 📚 API documentation & specs
│   ├── debug.ts               # 🐛 Development utilities
│   └── main.ts                # 🎯 GraphQL-first routing (cleaned)
├── services/
│   ├── lunarcrush.ts          # 🔧 Core LunarCrush API integration
│   ├── lunarcrush-fixes.ts    # 🛠️ Enhanced resolver implementations
│   └── caching.ts             # ⚡ Intelligent KV caching layer
├── graphql/
│   └── resolvers.ts           # 🚀 Centralized GraphQL resolvers (40+)
└── utils/
    └── health.ts              # 🏥 Comprehensive health monitoring
```

### 🔥 Advanced Features

- **🛡️ Security**: Rate limiting, CORS, input sanitization, secure headers
- **📊 Monitoring**: Real-time metrics, health checks, dynamic performance tracking
- **⚡ Caching**: Intelligent KV layer with configurable TTL
- **🎯 GraphQL-First**: Clean separation of concerns with resolver-based architecture

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

| Endpoint   | Purpose                           | Auth Required |
| ---------- | --------------------------------- | ------------- |
| `/graphql` | Main GraphQL API                  | ✅             |
| `/docs`    | Interactive API documentation     | ❌             |
| `/health`  | Simplified health check (secure)  | ❌             |
| `/debug`   | Development utilities             | ✅             |
| `/`        | LLM-friendly homepage             | ❌             |

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

- **API Key Authentication**: Secure Bearer token validation
- **Simplified Health Monitoring**: Security-focused endpoints without system information exposure
- **Rate Limiting**: Prevents API abuse and protects resources
- **Input Sanitization**: SQL injection and XSS protection
- **CORS Protection**: Configurable cross-origin policies
- **Security Headers**: HSTS, CSP, and comprehensive protection

## 📊 Performance Features

- **KV Caching**: Intelligent response caching with configurable TTL
- **Real-time Metrics**: Dynamic performance tracking
- **Response Compression**: Gzip compression for all responses
- **CDN Integration**: Global edge distribution via Cloudflare Workers
- **Security-First Design**: Minimal attack surface with essential monitoring

## 🐛 Development Tools

- **Debug Endpoint**: Inspect headers, environment, and cache
- **Health Monitoring**: Comprehensive system health checks
- **Error Tracking**: Detailed error reporting and logging
- **GraphQL Playground**: Interactive query exploration

## 📈 Monitoring & Observability

### Health Checks

```bash
# Basic health check (security-focused)
curl https://your-api.workers.dev/health

# GraphQL system health
curl -X POST https://your-api.workers.dev/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"query { systemHealth { status uptime version } }"}'
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

- **Development**: Verbose logging, debug endpoints enabled
- **Staging**: Reduced logging, limited debug access
- **Production**: Minimal logging, debug endpoints disabled

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
