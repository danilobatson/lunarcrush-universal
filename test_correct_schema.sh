#!/bin/bash

echo "🧪 Testing with Correct Schema Field Names"
cd /Users/batson/Desktop/ForTheNerds/lunarcrush-universal/packages/hono

# Start dev server
yarn dev &
DEV_PID=$!
sleep 8

cd ../..

echo "📡 Testing getTopic with real TopicDetails fields..."

# Test with actual field names from TopicDetails type
curl -X POST http://localhost:8787/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ getTopic(topic: \"bitcoin\") { symbol name } }"}' \
  -s | jq . > test_real_fields.json

echo "📊 Result:"
cat test_real_fields.json

# Stop server
kill $DEV_PID 2>/dev/null

echo "✅ Test completed - check test_real_fields.json"
