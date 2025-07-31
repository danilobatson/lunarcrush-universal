#!/bin/bash

echo "🔍 Testing Environment Context Flow"
echo "=================================="

cd /Users/batson/Desktop/ForTheNerds/lunarcrush-universal/packages/hono

echo "🚀 Starting Hono dev server with debug logging..."
yarn dev > ../debug_server.log 2>&1 &
DEV_PID=$!
sleep 10

cd ../..

echo "📡 Testing health endpoint first..."
curl -X GET http://localhost:8787/health -s | jq . > debug_health.json
echo "📊 Health result:"
cat debug_health.json

echo ""
echo "📡 Testing GraphQL hello..."
curl -X POST http://localhost:8787/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ hello }"}' \
  -s | jq . > debug_hello.json
echo "📊 Hello result:"
cat debug_hello.json

echo ""
echo "📡 Testing getTopic with debug..."
curl -X POST http://localhost:8787/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ getTopic(topic: \"bitcoin\") { symbol name } }"}' \
  -s | jq . > debug_gettopic.json
echo "📊 getTopic result:"
cat debug_gettopic.json

echo ""
echo "📋 Checking server logs for environment debug info..."
echo "🔍 Server log (last 20 lines):"
tail -20 packages/debug_server.log

# Stop server
kill $DEV_PID 2>/dev/null

echo ""
echo "✅ Debug test completed"
echo "📁 Results: debug_health.json, debug_hello.json, debug_gettopic.json"
echo "📁 Server log: packages/debug_server.log"
