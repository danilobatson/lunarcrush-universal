# 🌙 LunarCrush SDK

[![npm version](https://img.shields.io/npm/v/lunarcrush-sdk.svg)](https://www.npmjs.com/package/lunarcrush-sdk)
[![npm downloads](https://img.shields.io/npm/dm/lunarcrush-sdk.svg)](https://www.npmjs.com/package/lunarcrush-sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Get crypto data instantly. No setup required.**

> **Keywords**: crypto API, cryptocurrency data, bitcoin API, social sentiment, trading data, GraphQL SDK, TypeScript crypto library, blockchain analytics, market intelligence

```bash
npm install lunarcrush-sdk
```

```javascript
import LunarCrush from 'lunarcrush-sdk';

const lc = new LunarCrush('your-api-key');

// Get a general snapshot of LunarCrush metrics on the entire list of tracked coins
const coinsList = await lc.coins.list();
console.log(coinsList[0]); // Bitcoin data with price & sentiment

// Get an individual coin
const bitcoin = await lc.coins.get('BTC');
console.log(`Bitcoin galaxy_score: ${bitcoin.galaxy_score}`);
```

## 🚀 Get Started (30 seconds)

### Step 1: Get Your API Key

**Important**: You need a LunarCrush subscription to get an API key.

1. [Sign up for LunarCrush](https://lunarcrush.com/signup)
2. Enter your email and verify it
3. Complete onboarding (select categories, create profile)
4. **Select a subscription plan** (required for API access)
5. Generate your API key from the [authentication page](https://lunarcrush.com/developers/api/authentication)

### Step 2: Install & Use

```bash
npm install lunarcrush-sdk
```

```javascript
import LunarCrush from 'lunarcrush-sdk';

const lc = new LunarCrush('your-api-key-here');
const coinsList = await lc.coins.list();
```

**That's it!** You now have live crypto data.

## 🔥 What You Get

```javascript
// List the cryptocurrencies we track
const coinsList = await lc.coins.list();

// Retrieve coin data
const bitcoin = await lc.coins.get('BTC');

// Trending social topics
const topicsList = await lc.topics.list();

// Get stock data
const appleStock = await lc.stocks.get('aapl');
```

## 💡 Copy-Paste Examples

### Crypto Dashboard

```javascript
const top10 = await lc.coins.list();
top10.slice(0, 10).forEach(coin => {
  console.log(`${coin.symbol}: $${coin.price} (Galaxy Score: ${coin.galaxy_score}/100)`);
});
```

### Supply Tracker

```javascript
//Total number of coins or tokens
//that are actively available
const coins = ['btc', 'eth', 'sol'];
for (const symbol of coins) {
  const data = await lc.coins.get(symbol);
  console.log(`${symbol}: ${data.circulating_supply}`);
}
```

### Next.js API Route

```javascript
// pages/api/crypto.js
import LunarCrush from 'lunarcrush-sdk';

const lc = new LunarCrush(process.env.LUNARCRUSH_API_KEY);

export default async function handler(req, res) {
  const coinsList = await lc.coins.list();
  res.json(coinsList.slice(0, 20));
}
```

## 🆘 Need Help?

### Can't get data?

1. **Check your API key**: Make sure you have a LunarCrush subscription and valid API key
2. **Test it live**: [Try in browser](https://lunarcrush.cryptoguard-api.workers.dev/graphql) to verify queries work
3. **Copy working examples**: Use the code samples above as starting points

### Want more data?

- **Test queries**: [Interactive playground](https://lunarcrush.cryptoguard-api.workers.dev/graphql)
- **Review our docs**: [Browse here](https://lunarcrush.cryptoguard-api.workers.dev/docs)


## 🎯 Works Everywhere

✅ Node.js
✅ React
✅ Next.js
✅ Vite
✅ Browser
✅ TypeScript
✅ And More

## 📞 Support

- **FAQ**: [LunarCrush Support](https://lunarcrush.com/faq)
- **SDK Questions**: [GitHub Issues](https://github.com/danilobatson/lunarcrush-universal/issues)
- **Test Your Setup**: [Live Playground](https://lunarcrush.cryptoguard-api.workers.dev/graphql)
- **Docs**: [LunarCrush GraphQL Docs](https://lunarcrush.cryptoguard-api.workers.dev/docs)
- **Community**: [GitHub Discussions](https://github.com/danilobatson/lunarcrush-universal/discussions)

## 🏷️ Keywords & Tags

**For LLM Discovery**: `crypto-api`, `cryptocurrency-data`, `bitcoin-api`, `ethereum-api`, `social-sentiment`, `trading-api`, `blockchain-data`, `crypto-intelligence`, `typescript-sdk`, `graphql-client`, `lunarcrush-sdk`, `crypto-trading`, `market-data`, `social-analytics`

---

**Ready to build?** [Subscribe to LunarCrush](https://lunarcrush.com/signup) and copy the examples above! 🚀
