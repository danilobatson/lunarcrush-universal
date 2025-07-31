#!/bin/bash

echo "🧪 Testing Simplified getTopic Resolver..."

cd /Users/batson/Desktop/ForTheNerds/lunarcrush-universal/packages/hono

# Start dev server in background
echo "🚀 Starting Hono dev server..."
yarn dev &
DEV_PID=$!

# Wait for server to start
sleep 5

echo "📡 Testing getTopic with bitcoin..."
curl -X POST http://localhost:8787/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ getTopic(topic: \"bitcoin\") { symbol name close sentiment social_score } }"}' \
  | jq . > test_result_simple.json

echo "📊 Test result (simplified resolver):"
cat test_result_simple.json

# Test with different topic
echo ""
echo "📡 Testing getTopic with ethereum..."
curl -X POST http://localhost:8787/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ getTopic(topic: \"ethereum\") { symbol name close sentiment } }"}' \
  | jq . > test_result_ethereum.json

echo "📊 Ethereum test result:"
cat test_result_ethereum.json

# Stop dev server
kill $DEV_PID 2>/dev/null

echo ""
echo "✅ Simplified resolver testing completed"
echo "📁 Results saved to:"
echo "  - test_result_simple.json"
echo "  - test_result_ethereum.json"
