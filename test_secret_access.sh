#!/bin/bash

echo "🔐 Testing Secret Access - LUNARCRUSH_API_KEY"
echo "============================================="

cd /Users/batson/Desktop/ForTheNerds/lunarcrush-universal/packages/hono

echo "🚀 Starting Hono dev server..."
yarn dev &
DEV_PID=$!
sleep 10

cd ../..

echo "📡 Testing simple health query first..."
curl -X POST http://localhost:8787/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ hello }"}' \
  -s | jq . > test_hello.json

echo "📊 Hello test result:"
cat test_hello.json

echo ""
echo "📡 Testing getTopic with secret access..."
curl -X POST http://localhost:8787/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ getTopic(topic: \"bitcoin\") { symbol name } }"}' \
  -s | jq . > test_secret_access.json

echo "📊 Secret access test result:"
cat test_secret_access.json

# Check server logs for secret-related errors
echo ""
echo "📋 Checking for secret-related errors in server logs..."
if grep -q "Secret.*not found\|LUNARCRUSH_API_KEY.*not found" *.log 2>/dev/null; then
    echo "❌ Secret access errors found:"
    grep "Secret\|LUNARCRUSH_API_KEY" *.log 2>/dev/null
else
    echo "✅ No secret access errors found"
fi

# Stop server
kill $DEV_PID 2>/dev/null

echo "✅ Secret access test completed"
