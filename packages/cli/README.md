# 🚀 Create LunarCrush App

[![npm version](https://img.shields.io/npm/v/create-lunarcrush-app.svg)](https://www.npmjs.com/package/create-lunarcrush-app)
[![Downloads](https://img.shields.io/npm/dm/create-lunarcrush-app.svg)](https://www.npmjs.com/package/create-lunarcrush-app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

**The fastest way to create modern crypto social trading applications with real-time sentiment analysis.**

Create a production-ready Next.js application with live cryptocurrency social data, sentiment analysis, and beautiful visualizations in under 30 seconds.

```bash
npx create-lunarcrush-app my-crypto-app
cd my-crypto-app
npm run dev
```

## ✨ What You Get

🎯 **Complete Next.js App** - Modern React application with TypeScript, Tailwind CSS, and ESLint
📊 **Live Crypto Data** - Real-time Bitcoin price, social interactions, and sentiment metrics
🎨 **Beautiful UI** - Professional dark theme with glassmorphism design
⚡ **GraphQL Integration** - Pre-configured Apollo Client with live API examples
🔧 **Developer Ready** - Hot reload, TypeScript, and production build ready
📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile

## 🎬 Quick Demo

Your generated app displays live data like:
- **Bitcoin Price**: $118,247 (real-time)
- **Social Interactions**: 103,421,847 (24h)
- **Sentiment Score**: 3.2/5.0 (trending positive)
- **Social Dominance**: 15.7% (market share)

## 🚀 Usage

### Interactive Setup
```bash
npx create-lunarcrush-app
```
The CLI will prompt you for:
- ✅ Project name
- ✅ TypeScript (recommended)
- ✅ ESLint configuration
- ✅ Tailwind CSS
- ✅ App Router (Next.js 14+)

### Quick Start
```bash
npx create-lunarcrush-app my-crypto-dashboard
cd my-crypto-dashboard
npm run dev
```

### With Options
```bash
# Create with all modern features
npx create-lunarcrush-app my-app --typescript --tailwind --eslint

# Open in browser automatically
npx create-lunarcrush-app my-app && cd my-app && npm run dev
```

## 📦 What's Included

### Core Technologies
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Apollo Client** - GraphQL state management
- **ESLint** - Code quality and consistency

### LunarCrush Integration
- **Social Trading Data** - Real-time crypto social metrics
- **Sentiment Analysis** - AI-powered market sentiment
- **Price Integration** - Live cryptocurrency prices
- **Social Dominance** - Market share analytics
- **Interaction Tracking** - Engagement metrics

### UI Components
- **Glassmorphism Cards** - Modern transparent design
- **Live Data Displays** - Real-time updating metrics
- **Responsive Layout** - Mobile-first design
- **Loading States** - Smooth user experience
- **Error Handling** - Graceful error boundaries

## 🛠️ Development Workflow

### 1. Generate Your App
```bash
npx create-lunarcrush-app crypto-tracker
```

### 2. Get Your API Key
1. Visit [LunarCrush Developers](https://lunarcrush.com/developers)
2. Sign up for free API access
3. Copy your API key

### 3. Configure Environment
```bash
# Create .env.local
echo "NEXT_PUBLIC_LUNARCRUSH_API_KEY=your_api_key_here" > .env.local
```

### 4. Start Development
```bash
npm run dev
# Open http://localhost:3000
```

### 5. Customize & Deploy
- Modify components in `src/app/`
- Add new GraphQL queries
- Deploy to Vercel, Netlify, or anywhere

## 🎨 Generated Project Structure

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
└── package.json                # Dependencies
```

## 🔗 API Integration Examples

### Real-Time Bitcoin Data
```typescript
const { data, loading, error } = useQuery(GET_BITCOIN_DATA, {
  pollInterval: 30000, // Update every 30 seconds
});
```

### Social Sentiment Analysis
```typescript
const { data: sentiment } = useQuery(GET_SENTIMENT_DATA, {
  variables: { symbol: 'BTC' }
});
```

### Custom Queries
```graphql
query GetCryptoSocial($symbol: String!) {
  getCoin(symbol: $symbol) {
    price
    socialInteractions24h
    sentimentScore
    socialDominance
  }
}
```

## 🌟 Use Cases

### For Developers
- **Learning GraphQL** - Pre-configured Apollo Client setup
- **React/Next.js Practice** - Modern React patterns and hooks
- **TypeScript Projects** - Full type safety and IntelliSense
- **API Integration** - Real-world data fetching examples

### For Businesses
- **Crypto Dashboards** - Social trading applications
- **Market Analysis Tools** - Sentiment and price tracking
- **Portfolio Trackers** - Multi-coin monitoring
- **Trading Bots UI** - Frontend for algorithmic trading

### For Portfolio Projects
- **Full-Stack Demos** - Complete application examples
- **Live Data Integration** - Real API consumption
- **Modern Design** - Professional UI/UX
- **Production Ready** - Deployable applications

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy dist/ folder
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md).

### Development Setup
```bash
git clone https://github.com/danilobatson/lunarcrush-universal.git
cd lunarcrush-universal/packages/cli
npm install
npm run build
npm link
```

### Testing
```bash
npm run dev
# Test with: create-lunarcrush-app test-project
```

## 📊 Stats & Analytics

- **Package Downloads**: Track usage on [npmjs.com](https://www.npmjs.com/package/create-lunarcrush-app)
- **GitHub Stars**: Show your support on [GitHub](https://github.com/danilobatson/lunarcrush-universal)
- **Live Demo**: See examples at [Portfolio](https://danilobatson.github.io/)

## 🔧 Configuration Options

### Environment Variables
```bash
NEXT_PUBLIC_LUNARCRUSH_API_KEY=your_api_key     # Required
NEXT_PUBLIC_API_URL=https://lunarcrush.com/api  # Optional
NEXT_PUBLIC_POLLING_INTERVAL=30000              # Optional
```

### Customization
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

## 📈 Roadmap

- [ ] **Multi-Exchange Support** - Binance, Coinbase, etc.
- [ ] **Advanced Charts** - TradingView integration
- [ ] **Portfolio Tracking** - Multi-coin monitoring
- [ ] **Alert System** - Price and sentiment notifications
- [ ] **Mobile App** - React Native version
- [ ] **Web3 Integration** - Wallet connectivity

## 💡 Tips & Best Practices

### Performance
- Use `pollInterval` sparingly for real-time data
- Implement proper error boundaries
- Cache API responses when possible

### Security
- Never commit API keys to git
- Use environment variables for all secrets
- Validate all user inputs

### Development
- Use TypeScript for better developer experience
- Follow ESLint rules for code consistency
- Write tests for critical functionality

## 🆘 Troubleshooting

### Common Issues

**API Key Not Working**
```bash
# Check environment variables
echo $NEXT_PUBLIC_LUNARCRUSH_API_KEY

# Restart development server
npm run dev
```

**Build Errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**TypeScript Errors**
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

## 📞 Support

- **Documentation**: [LunarCrush API Docs](https://lunarcrush.com/developers)
- **Issues**: [GitHub Issues](https://github.com/danilobatson/lunarcrush-universal/issues)
- **Discussions**: [GitHub Discussions](https://github.com/danilobatson/lunarcrush-universal/discussions)
- **Email**: [djbatson19@gmail.com](mailto:djbatson19@gmail.com)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Danilo Jamaal**
- [**Portfolio**](https://danilobatson.github.io/)
- [**LinkedIn**](https://linkedin.com/in/danilo-batson/)
- [**GitHub**](https://github.com/danilobatson)
- [**Email**](mailto:djbatson19@gmail.com)

---

**⭐ If this helped you, please give it a star on [GitHub](https://github.com/danilobatson/lunarcrush-universal)!**

*Built with ❤️ for the crypto developer community*
