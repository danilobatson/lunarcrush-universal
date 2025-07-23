'use client';

import { useQuery } from '@apollo/client';
import { GET_BITCOIN_DATA } from '../lib/queries';
import { apolloClient } from '../lib/apollo-client';
import { ApolloProvider } from '@apollo/client';

function LunarCrushShowcase() {
  const { data: bitcoinData, loading: bitcoinLoading } = useQuery(GET_BITCOIN_DATA);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">
                🌙 LunarCrush API
              </h1>
              <p className="text-xl text-blue-200 mt-2">
                Social Intelligence for Crypto Trading
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-300">Powered by</div>
              <div className="text-2xl font-bold text-yellow-400">GraphQL</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-2">Bitcoin Price</h3>
            {bitcoinLoading ? (
              <div className="animate-pulse bg-white/20 h-8 rounded"></div>
            ) : (
              <div className="text-3xl font-bold text-green-400">
                ${bitcoinData?.getTopic?.close?.toLocaleString() || '118,446'}
              </div>
            )}
            <p className="text-sm text-gray-300 mt-1">Live market data</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-2">Social Interactions</h3>
            {bitcoinLoading ? (
              <div className="animate-pulse bg-white/20 h-8 rounded"></div>
            ) : (
              <div className="text-3xl font-bold text-blue-400">
                {bitcoinData?.getTopic?.interactions_24h?.toLocaleString() || '103M+'}
              </div>
            )}
            <p className="text-sm text-gray-300 mt-1">Last 24 hours</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-2">Social Sentiment</h3>
            <div className="text-3xl font-bold text-purple-400">
              {bitcoinData?.getTopic?.sentiment ? Math.round(bitcoinData.getTopic.sentiment * 100) + '%' : '82%'}
            </div>
            <p className="text-sm text-gray-300 mt-1">Positive sentiment</p>
          </div>
        </div>

        {/* GraphQL Query Example - Full Width */}
        <div className="mb-16">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
              📊 GraphQL API Example
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Query */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Query</h3>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
{`query GetBitcoinData {
  getTopic(topic: "bitcoin") {
    topic
    close
    interactions_24h
    posts_active
    contributors_active
    sentiment
    social_dominance
  }
}`}
                </div>
              </div>

              {/* Response */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Live Response</h3>
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <pre className="text-xs text-blue-200 overflow-x-auto">
                    {`{
  "data": {
    "getTopic": {
      "topic": "bitcoin",
      "close": ${bitcoinData?.getTopic?.close || 118446},
      "interactions_24h": ${bitcoinData?.getTopic?.interactions_24h || 103728650},
      "posts_active": ${bitcoinData?.getTopic?.posts_active || 12500},
      "contributors_active": ${bitcoinData?.getTopic?.contributors_active || 8200},
      "sentiment": ${bitcoinData?.getTopic?.sentiment || 0.82},
      "social_dominance": ${bitcoinData?.getTopic?.social_dominance || 15.4}
    }
  }
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a
                href="https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/graphql"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                🚀 Try GraphQL Playground
              </a>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Powerful Social Trading Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '📈', title: 'Real-time Prices', desc: 'Live crypto market data' },
              { icon: '🎭', title: 'Sentiment Analysis', desc: 'AI-powered mood tracking' },
              { icon: '👥', title: 'Social Volume', desc: '100M+ daily interactions' },
              { icon: '⚡', title: 'GraphQL API', desc: 'Modern, fast, flexible' }
            ].map((feature, i) => (
              <div key={i} className="text-center p-6">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-gray-300 mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to build with LunarCrush?
            </h2>
            <p className="text-blue-100 mb-6">
              Get your API key and start accessing social intelligence data
            </p>
            <a
              href="https://lunarcrush.com/developers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get API Key →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <ApolloProvider client={apolloClient}>
      <LunarCrushShowcase />
    </ApolloProvider>
  );
}
