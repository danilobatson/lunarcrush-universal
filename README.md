# 🚀 LunarCrush Universal Backend

> **Production-Ready GraphQL API** providing complete access to LunarCrush's crypto social intelligence data with 39 endpoints, real-time sentiment analysis, and advanced social metrics.

[![Live API](https://img.shields.io/badge/Live%20API-Production-green)](https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/graphql)
[![npm](https://img.shields.io/npm/v/create-lunarcrush-app.svg)](https://www.npmjs.com/package/create-lunarcrush-app)
[![GraphQL](https://img.shields.io/badge/GraphQL-Introspection%20Enabled-blue)](https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/graphql)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange)](https://workers.cloudflare.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)

## 🎯 **Quick Start - Build a Crypto Social Trading App**

**Create a professional crypto dashboard in 30 seconds:**

### With npm/npx:
```bash
npx create-lunarcrush-app my-crypto-dashboard
cd my-crypto-dashboard
npm run dev
```

### With Yarn:
```bash
# Modern Yarn (v2+)
yarn dlx create-lunarcrush-app my-crypto-dashboard

# Classic Yarn
yarn create lunarcrush-app my-crypto-dashboard

cd my-crypto-dashboard
yarn dev
```

### With pnpm:
```bash
pnpm dlx create-lunarcrush-app my-crypto-dashboard
cd my-crypto-dashboard
pnpm dev
```

**🎉 Result:** Professional Next.js app with live Bitcoin price ($118K+), 103M+ social interactions, and beautiful glassmorphism UI!

---

## 🔥 **What You Get**

### **📦 CLI Tool (`create-lunarcrush-app`)**
- **🚀 Instant Setup**: Production-ready Next.js apps in 30 seconds
- **📊 Live Data**: Real Bitcoin price, social metrics, sentiment analysis
- **🎨 Modern UI**: Glassmorphism design with dark theme
- **⚡ GraphQL Ready**: Pre-configured Apollo Client
- **📱 Responsive**: Works on desktop, tablet, mobile

### **🌟 Production GraphQL API**
- **39 GraphQL Queries** covering all LunarCrush endpoints
- **50+ GraphQL Types** with complete schema introspection
- **Real-time Social Data**: 103M+ crypto interactions tracked daily
- **Advanced Metrics**: Galaxy scores, social dominance, sentiment analysis
- **Platform Breakdowns**: Twitter, YouTube, TikTok, Reddit, News sentiment

### **🚀 Technical Excellence**
- **Cloudflare Workers**: Global edge deployment with <200ms responses
- **D1 Database**: SQLite with projects and usage tracking
- **Apollo Server 5.0**: Professional GraphQL implementation
- **TypeScript**: Full type safety with comprehensive interfaces
- **CORS Configured**: Works with Apollo Studio and all GraphQL clients

---

## 🏗️ **Architecture**

```
lunarcrush-universal/
├── packages/
│   ├── backend/              # 🚀 Cloudflare Workers API (COMPLETE)
│   │   ├── src/
│   │   │   ├── graphql/      # Apollo Server + GraphiQL
│   │   │   ├── services/     # LunarCrush integration (27KB)
│   │   │   ├── types/        # TypeScript definitions
│   │   │   └── index.ts      # Hono server with CORS
│   │   └── wrangler.toml     # Cloudflare configuration
│   ├── cli/                  # 🔧 Create-app CLI (PUBLISHED ✅)
│   ├── client/               # 📦 Universal client library
│   ├── types/                # 🔗 Shared TypeScript definitions
│   └── templates/            # 📋 Framework templates
├── apps/
│   ├── docs/                 # 📚 Documentation site
│   └── examples/             # 💡 Example implementations
└── tools/
    ├── scripts/              # 🛠️ Development scripts
    └── config/               # ⚙️ Shared configurations
```

---

## 🚀 **API Usage Examples**

### **GraphiQL Explorer (Fast)**
```bash
# Open the GraphiQL interface
open https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/graphql
```

### **Apollo Studio (Professional)**
1. Go to [Apollo Studio Sandbox](https://studio.apollographql.com/sandbox)
2. Enter endpoint: `https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/graphql`
3. Click "Connect" - auto-loads full schema with 39 queries!

### **Example Queries**

```graphql
# Get Bitcoin with complete social intelligence
{
  getTopic(topic: "bitcoin") {
    topic
    title
    interactions_24h        # 103M+ daily interactions
    types_interactions      # Platform breakdown
    types_sentiment         # Per-platform sentiment
    num_contributors        # 122K+ people discussing
  }
}

# Get top cryptocurrencies with social + financial data
{
  getCoinsList {
    symbol
    name
    price                   # Real-time price
    market_cap
    interactions_24h        # Social volume
    social_dominance        # Market share of discussions
    galaxy_score           # LunarCrush proprietary score
    alt_rank               # Social-based ranking
  }
}

# Health check
{ health }
```

---

## 📊 **Real Data Examples**

**Bitcoin Social Intelligence (Live Data):**
- **💰 Price**: $118,293.97
- **📊 Daily Interactions**: 103,813,882
- **🐦 Twitter**: 77.1M tweets (sentiment: 80/100)
- **📺 YouTube**: 14.8M videos (sentiment: 82/100)
- **🎵 TikTok**: 11.4M videos (sentiment: 67/100)
- **📰 News**: 356K articles (sentiment: 81/100)
- **👥 Contributors**: 122,274 people discussing

---

## 🛠️ **Development**

### **Get Started with CLI Development**
```bash
# Clone the repository
git clone https://github.com/danilobatson/lunarcrush-universal.git
cd lunarcrush-universal

# Install dependencies
yarn install

# Run CLI locally
cd packages/cli
npm run dev

# Test CLI
npm run build
npm link
create-lunarcrush-app test-project
```

### **Backend Development**
```bash
# Start local development
cd packages/backend
npm run dev

# Deploy to production
npm run deploy

# Database operations
npm run db:migrate
npm run db:query "SELECT * FROM projects"
```

### **Workspace Commands**
```bash
# Install dependencies
yarn install

# Run all packages
yarn dev

# Build all packages
yarn build

# Format code
yarn format
```

---

## 📋 **Package Manager Support**

### **CLI Tool Usage**
| Package Manager  | Command                                 |
| ---------------- | --------------------------------------- |
| **npm/npx**      | `npx create-lunarcrush-app my-app`      |
| **Yarn Modern**  | `yarn dlx create-lunarcrush-app my-app` |
| **Yarn Classic** | `yarn create lunarcrush-app my-app`     |
| **pnpm**         | `pnpm dlx create-lunarcrush-app my-app` |

### **Development Commands**
| Task           | npm             | Yarn         | pnpm           |
| -------------- | --------------- | ------------ | -------------- |
| **Install**    | `npm install`   | `yarn`       | `pnpm install` |
| **Dev Server** | `npm run dev`   | `yarn dev`   | `pnpm dev`     |
| **Build**      | `npm run build` | `yarn build` | `pnpm build`   |
| **Test**       | `npm test`      | `yarn test`  | `pnpm test`    |

---

## 🎯 **Current Status: Phase 1 Complete ✅**

**Phase:** Foundation Setup (100% Complete)
**Next Phase:** CLI Development & Blog Article Creation
**Live API:** https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/graphql

### **✅ Completed:**
- [x] **Production GraphQL API** with 39 endpoints
- [x] **CLI Tool Published** on npm as `create-lunarcrush-app`
- [x] **Live Data Integration** with 103M+ daily interactions
- [x] **Modern Tech Stack** (TypeScript, GraphQL, Cloudflare Workers)
- [x] **Professional Documentation** with Apollo Studio support

### **🎯 Next Priorities:**
1. **Framework Templates** - React, Next.js, Vue templates with pre-built components
2. **Blog Article Creation** - "Build Advanced Crypto Social Analytics in 20 Minutes"
3. **Documentation Site** - Comprehensive guides and examples
4. **NPM Client Library** - `@lunarcrush/universal-client`

---

## 📈 **Business Impact**

### **Developer Value:**
- **Complete Social Data**: Only comprehensive GraphQL wrapper for LunarCrush
- **Production Ready**: Enterprise-grade deployment on Cloudflare Workers
- **Modern Stack**: TypeScript + GraphQL + Edge computing showcase
- **Portfolio Gold**: Demonstrates advanced API integration skills

### **LunarCrush Growth Strategy:**
- **Target**: 75-250 new API signups monthly per article
- **Approach**: Comprehensive tutorials showcasing rich social data
- **Unique Value**: Advanced social metrics not available elsewhere
- **Developer Experience**: Fastest path from idea to deployed app

---

## 🏆 **What Makes This Special**

**🌟 This is the only comprehensive GraphQL API providing:**
- Complete LunarCrush social intelligence data
- Platform-specific sentiment breakdowns (Twitter vs TikTok vs YouTube)
- Creator topic influence rankings for social trading signals
- Real-time social volume with 100M+ daily interactions
- Advanced metrics like Galaxy Scores and AltRank

**🚀 Built with modern best practices:**
- Cloudflare Workers for global edge performance
- Apollo Server with full introspection
- TypeScript for complete type safety
- Professional GraphQL tooling (GraphiQL + Apollo Studio)
- Comprehensive error handling and logging

---

## 📞 **Contact & Portfolio**

**Danilo Jamaal Batson** - Senior Software Engineer
📧 [djbatson19@gmail.com](mailto:djbatson19@gmail.com)
🔗 [LinkedIn](https://linkedin.com/in/danilo-batson)
🌐 [Portfolio](https://danilobatson.github.io/)

---

## 📄 **License**

MIT License - Open source and free to use.

---

<div align="center">

**🌙 Built with LunarCrush Social Intelligence Data**

[![API Status](https://img.shields.io/badge/API-Live-green)](https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/health)
[![GraphQL Playground](https://img.shields.io/badge/GraphQL-Explorer-blue)](https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/graphql)
[![CLI Tool](https://img.shields.io/badge/CLI-npm%20published-orange)](https://www.npmjs.com/package/create-lunarcrush-app)

**⭐ Star this repo if you found it helpful!**

</div>
