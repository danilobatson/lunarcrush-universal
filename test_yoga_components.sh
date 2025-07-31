#!/bin/bash

echo "🧘 Testing Backend-Yoga Components in Hono"
echo "=========================================="

cd /Users/batson/Desktop/ForTheNerds/lunarcrush-universal/packages/hono

# Set up development environment variable
if [ ! -f ".dev.vars" ]; then
    echo "LUNARCRUSH_API_KEY=your_api_key_here" > .dev.vars
    echo "📝 Created .dev.vars - please add your actual API key"
fi

echo "🚀 Starting Hono with backend-yoga components..."
yarn dev > ../test_yoga_server.log 2>&1 &
DEV_PID=$!
sleep 10

cd ../..

echo "📡 Testing health endpoint..."
curl -X GET http://localhost:8787/health -s | jq . > test_yoga_health.json
echo "📊 Health result:"
cat test_yoga_health.json

echo ""
echo "📡 Testing GraphQL health..."
curl -X POST http://localhost:8787/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ health }"}' \
  -s | jq . > test_yoga_graphql_health.json
echo "📊 GraphQL health result:"
cat test_yoga_graphql_health.json

echo ""
echo "📡 Testing getTopic with backend-yoga service..."
curl -X POST http://localhost:8787/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ getTopic(topic: \"bitcoin\") { symbol name close } }"}' \
  -s | jq . > test_yoga_gettopic.json
echo "📊 getTopic result:"
cat test_yoga_gettopic.json

echo ""
echo "📋 Checking server logs..."
echo "🔍 Server log (last 20 lines):"
tail -20 packages/test_yoga_server.log

# Stop server
kill $DEV_PID 2>/dev/null

echo ""
echo "✅ Backend-yoga components test completed"
echo "📁 Results: test_yoga_health.json, test_yoga_graphql_health.json, test_yoga_gettopic.json"
