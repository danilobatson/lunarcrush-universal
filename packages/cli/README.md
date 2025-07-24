# 🚀 Create LunarCrush App

[![npm version](https://img.shields.io/npm/v/create-lunarcrush-app.svg)](https://www.npmjs.com/package/create-lunarcrush-app)
[![Downloads](https://img.shields.io/npm/dm/create-lunarcrush-app.svg)](https://www.npmjs.com/package/create-lunarcrush-app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

**The fastest way to create modern crypto social trading applications with real-time sentiment analysis.**

Create a production-ready Next.js application with live cryptocurrency social data, sentiment analysis, and beautiful visualizations in under 30 seconds.

---

## 🚀 **Quick Start - All Package Managers**

### **npm (Node Package Manager)**
```bash
npx create-lunarcrush-app my-crypto-app
cd my-crypto-app
npm install
npm run dev
```

### **Yarn (Classic & Modern)**
```bash
# Yarn Modern (v2+) - Recommended
yarn dlx create-lunarcrush-app my-crypto-app
cd my-crypto-app
yarn install
yarn dev

# Yarn Classic (v1)
yarn create lunarcrush-app my-crypto-app
cd my-crypto-app
yarn install
yarn dev
```

### **pnpm (Fast Package Manager)**
```bash
pnpm dlx create-lunarcrush-app my-crypto-app
cd my-crypto-app
pnpm install
pnpm dev
```

### **Bun (Ultra-fast Runtime)**
```bash
bunx create-lunarcrush-app my-crypto-app
cd my-crypto-app
bun install
bun dev
```

**🎉 Result:** Professional crypto dashboard with live Bitcoin data, 103M+ social interactions, and glassmorphism UI!

---

## ✨ What You Get

🎯 **Complete Next.js App** - Modern React application with TypeScript, Tailwind CSS, and ESLint
📊 **Live Crypto Data** - Real-time Bitcoin price, social interactions, and sentiment metrics
🎨 **Beautiful UI** - Professional dark theme with glassmorphism design
⚡ **GraphQL Integration** - Pre-configured Apollo Client with live API examples
🔧 **Developer Ready** - Hot reload, TypeScript, and production build ready
📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile

## 🎬 Live Demo

Your generated app displays real data like:
- **💰 Bitcoin Price**: $118,247 (real-time)
- **📊 Social Interactions**: 103,421,847 (24h)
- **🎭 Sentiment Score**: 3.2/5.0 (trending positive)
- **📈 Social Dominance**: 15.7% (market share)
- **👥 Contributors**: 122K+ people discussing

---

## 📋 **Package Manager Compatibility**

| Package Manager  | Installation Command             | Run Command   |
| ---------------- | -------------------------------- | ------------- |
| **npm**          | `npx create-lunarcrush-app`      | `npm run dev` |
| **Yarn Modern**  | `yarn dlx create-lunarcrush-app` | `yarn dev`    |
| **Yarn Classic** | `yarn create lunarcrush-app`     | `yarn dev`    |
| **pnpm**         | `pnpm dlx create-lunarcrush-app` | `pnpm dev`    |
| **Bun**          | `bunx create-lunarcrush-app`     | `bun dev`     |

### **Development Commands by Package Manager**

| Task             | npm                  | Yarn              | pnpm              | Bun              |
| ---------------- | -------------------- | ----------------- | ----------------- | ---------------- |
| **Install deps** | `npm install`        | `yarn`            | `pnpm install`    | `bun install`    |
| **Dev server**   | `npm run dev`        | `yarn dev`        | `pnpm dev`        | `bun dev`        |
| **Build**        | `npm run build`      | `yarn build`      | `pnpm build`      | `bun run build`  |
| **Start prod**   | `npm start`          | `yarn start`      | `pnpm start`      | `bun start`      |
| **Lint**         | `npm run lint`       | `yarn lint`       | `pnpm lint`       | `bun lint`       |
| **Type check**   | `npm run type-check` | `yarn type-check` | `pnpm type-check` | `bun type-check` |

---

## 🚀 **Usage Options**

### **Interactive Setup (Recommended)**
```bash
# Choose your package manager
npx create-lunarcrush-app        # npm
yarn dlx create-lunarcrush-app   # yarn modern
pnpm dlx create-lunarcrush-app   # pnpm
bunx create-lunarcrush-app       # bun
```

**The CLI will prompt you for:**
- ✅ Project name
- ✅ TypeScript (recommended)
- ✅ ESLint configuration
- ✅ Tailwind CSS
- ✅ App Router (Next.js 14+)

### **One-Line Setup**
```bash
# Replace 'npm' with your preferred package manager
npx create-lunarcrush-app my-crypto-dashboard && cd my-crypto-dashboard && npm run dev
```

### **Advanced Usage**
```bash
# Specify all options upfront (coming soon)
npx create-lunarcrush-app my-app --typescript --tailwind --eslint --app-router

# Clone from specific template (coming soon)
npx create-lunarcrush-app my-app --template=dashboard
```

---

## 📦 What's Included

### **Core Technologies**
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Apollo Client** - GraphQL state management
- **ESLint** - Code quality and consistency

### **LunarCrush Integration**
- **Social Trading Data** - Real-time crypto social metrics
- **Sentiment Analysis** - AI-powered market sentiment
- **Price Integration** - Live cryptocurrency prices
- **Social Dominance** - Market share analytics
- **Interaction Tracking** - Engagement metrics

### **UI Components**
- **Glassmorphism Cards** - Modern transparent design
- **Live Data Displays** - Real-time updating metrics
- **Responsive Layout** - Mobile-first design
- **Loading States** - Smooth user experience
- **Error Handling** - Graceful error boundaries

---

## 🛠️ **Development Workflow**

### **1. Generate Your App**
```bash
# Choose your package manager
npx create-lunarcrush-app crypto-tracker
```

### **2. Get Your API Key**
1. Visit [LunarCrush Developers](https://lunarcrush.com/developers)
2. Sign up for free API access
3. Copy your API key

### **3. Configure Environment**
```bash
# Create .env.local file
echo "NEXT_PUBLIC_LUNARCRUSH_API_KEY=your_api_key_here" > .env.local
```

### **4. Start Development**
```bash
# Choose based on your package manager
npm run dev     # npm
yarn dev        # yarn
pnpm dev        # pnpm
bun dev         # bun

# Open http://localhost:3000
```

### **5. Customize & Deploy**
- Modify components in `src/app/`
- Add new GraphQL queries
- Deploy to Vercel, Netlify, or anywhere

---

## 🎨 **Generated Project Structure**

```
my-crypto-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage with live data
│   │   └── globals.css         # Global styles
│   ├── lib/
│   │   ├── apollo-client.ts    # GraphQL configuration
│   │   └── utils.ts            # Utility functions
│   └── components/
│       ├── DataCard.tsx        # Reusable data display
│       └── LiveMetrics.tsx     # Real-time metrics
├── public/
├── .env.local                  # API configuration
├── tailwind.config.js          # Styling configuration
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies
└── README.md                   # Project documentation
```

---

## 🔗 **API Integration Examples**

### **Shared GraphQL Queries**
The CLI template uses `@lunarcrush/shared-types` for consistent GraphQL integration:

```typescript
import { GRAPHQL_QUERIES } from '@lunarcrush/shared-types';
import { gql } from '@apollo/client';

// Using shared queries with Apollo Client
const GET_COIN_GQL = gql`${GRAPHQL_QUERIES.GET_COIN}`;

const { data, loading, error } = useQuery(GET_COIN_GQL, {
  variables: { symbol: 'BTC' },
  pollInterval: 30000, // Update every 30 seconds
});
```

### **Real-Time Bitcoin Data**
```typescript
// Using standardized shared queries
const { data } = useQuery(GET_TOPIC_GQL, {
  variables: { topic: 'bitcoin' },
  pollInterval: 30000,
});
```

### **Social Sentiment Analysis**
```typescript
const { data: cryptos } = useQuery(GET_COINS_LIST_GQL, {
  variables: { limit: 10, order_by: 'galaxy_score' }
});
```
}
```

---

## 🌟 **Use Cases**

### **For Developers**
- **Learning GraphQL** - Pre-configured Apollo Client setup
- **React/Next.js Practice** - Modern React patterns and hooks
- **TypeScript Projects** - Full type safety and IntelliSense
- **API Integration** - Real-world data fetching examples

### **For Businesses**
- **Crypto Dashboards** - Social trading applications
- **Market Analysis Tools** - Sentiment and price tracking
- **Portfolio Trackers** - Multi-coin monitoring
- **Trading Bots UI** - Frontend for algorithmic trading

### **For Portfolio Projects**
- **Full-Stack Demos** - Complete application examples
- **Live Data Integration** - Real API consumption
- **Modern Design** - Professional UI/UX
- **Production Ready** - Deployable applications

---

## 🚀 **Deployment**

### **Vercel (Recommended)**
```bash
# Install Vercel CLI globally
npm i -g vercel     # npm
yarn global add vercel    # yarn classic
pnpm add -g vercel       # pnpm
bun add -g vercel        # bun

# Deploy
vercel
```

### **Netlify**
```bash
# Build the project
npm run build     # or yarn/pnpm/bun build

# Deploy dist/ folder to Netlify
```

### **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🔧 **Configuration Options**

### **Environment Variables**
```bash
NEXT_PUBLIC_LUNARCRUSH_API_KEY=your_api_key     # Required
NEXT_PUBLIC_API_URL=https://lunarcrush.com/api  # Optional
NEXT_PUBLIC_POLLING_INTERVAL=30000              # Optional (30 seconds)
NEXT_PUBLIC_THEME=dark                          # Optional (dark/light)
```

### **Customization Examples**
```typescript
// tailwind.config.js - Customize theme
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',    // Customize primary color
        secondary: '#8b5cf6',  // Customize secondary color
      }
    }
  }
}
```

```typescript
// next.config.js - Next.js configuration
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['assets.lunarcrush.com'],
  },
}

module.exports = nextConfig
```

---

## 📈 **Roadmap**

- [ ] **Multi-Exchange Support** - Binance, Coinbase, etc.
- [ ] **Advanced Charts** - TradingView integration
- [ ] **Portfolio Tracking** - Multi-coin monitoring
- [ ] **Alert System** - Price and sentiment notifications
- [ ] **Mobile App** - React Native version
- [ ] **Web3 Integration** - Wallet connectivity
- [ ] **More Templates** - Vue, Svelte, Angular versions

---

## 💡 **Tips & Best Practices**

### **Performance**
- Use `pollInterval` sparingly for real-time data
- Implement proper error boundaries
- Cache API responses when possible
- Optimize images and assets

### **Security**
- Never commit API keys to git
- Use environment variables for all secrets
- Validate all user inputs
- Implement proper CORS policies

### **Development**
- Use TypeScript for better developer experience
- Follow ESLint rules for code consistency
- Write tests for critical functionality
- Use proper Git workflow with conventional commits

---

## 🆘 **Troubleshooting**

### **Common Issues**

**API Key Not Working**
```bash
# Check environment variables
echo $NEXT_PUBLIC_LUNARCRUSH_API_KEY

# Restart development server
npm run dev  # or yarn/pnpm/bun dev
```

**Build Errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run build  # or yarn/pnpm/bun build
```

**TypeScript Errors**
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

**Package Manager Issues**
```bash
# Clear node_modules and lockfile
rm -rf node_modules package-lock.json  # npm
rm -rf node_modules yarn.lock          # yarn
rm -rf node_modules pnpm-lock.yaml     # pnpm

# Reinstall dependencies
npm install    # npm
yarn install   # yarn
pnpm install   # pnpm
bun install    # bun
```

---

## 🤝 **Contributing**

We welcome contributions! Please see our [Contributing Guide](https://github.com/danilobatson/lunarcrush-universal/blob/main/CONTRIBUTING.md).

### **Development Setup**
```bash
git clone https://github.com/danilobatson/lunarcrush-universal.git
cd lunarcrush-universal/packages/cli
npm install
npm run build
npm link
```

### **Testing**
```bash
npm run dev
# Test with: create-lunarcrush-app test-project
```

---

## 📊 **Stats & Analytics**

- **📦 Package Downloads**: Track usage on [npmjs.com](https://www.npmjs.com/package/create-lunarcrush-app)
- **⭐ GitHub Stars**: Show your support on [GitHub](https://github.com/danilobatson/lunarcrush-universal)
- **🌐 Live Demo**: See examples at [Portfolio](https://danilobatson.github.io/)
- **📚 Documentation**: Complete guides in [Main Repository](https://github.com/danilobatson/lunarcrush-universal)

---

## 📞 **Support**

- **📖 Documentation**: [LunarCrush API Docs](https://lunarcrush.com/developers)
- **🐛 Issues**: [GitHub Issues](https://github.com/danilobatson/lunarcrush-universal/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/danilobatson/lunarcrush-universal/discussions)
- **📧 Email**: [djbatson19@gmail.com](mailto:djbatson19@gmail.com)

---

## 📄 **License**

MIT License - see [LICENSE](https://github.com/danilobatson/lunarcrush-universal/blob/main/LICENSE) file for details.

---

## 👨‍💻 **Author**

**Danilo Jamaal Batson**
- **🌐 Portfolio**: [danilobatson.github.io](https://danilobatson.github.io/)
- **💼 LinkedIn**: [linkedin.com/in/danilo-batson](https://linkedin.com/in/danilo-batson/)
- **🐙 GitHub**: [@danilobatson](https://github.com/danilobatson)
- **📧 Email**: [djbatson19@gmail.com](mailto:djbatson19@gmail.com)

---

<div align="center">

**⭐ If this helped you, please give it a star on [GitHub](https://github.com/danilobatson/lunarcrush-universal)!**

*Built with ❤️ for the crypto developer community*

[![API Status](https://img.shields.io/badge/API-Live-green)](https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/health)
[![GraphQL Playground](https://img.shields.io/badge/GraphQL-Explorer-blue)](https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/graphql)

</div>
