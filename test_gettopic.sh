#!/bin/bash

echo "🧪 Testing getTopic resolver with real data..."

cd /Users/batson/Desktop/ForTheNerds/lunarcrush-universal/packages/hono

# Start the dev server in background
echo "🚀 Starting Hono dev server..."
yarn dev &
DEV_PID=$!

# Wait for server to start
sleep 5

# Test the getTopic resolver
echo "📡 Testing getTopic resolver..."
curl -X POST http://localhost:8787/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ getTopic(topic: \"bitcoin\") { symbol name price sentiment socialScore } }"}' \
  -o test_result.json

echo "📊 Test result:"
cat test_result.json | jq . || cat test_result.json

# Stop the dev server
kill $DEV_PID 2>/dev/null

echo "✅ Test completed"
