#!/bin/bash

# LunarCrush API Endpoint Audit Script
API_KEY="utabw6d2o6flsbqhc7es88mwmdf457xf72aq8y"
BASE_URL="https://lunarcrush.com/api4/public"
GRAPHQL_URL="https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/graphql"

echo "🚀 LunarCrush Universal Backend - Endpoint Audit"
echo "================================================="
echo "Testing raw LunarCrush API vs GraphQL responses"
echo ""

# Test 1: Single Coin vs List Endpoints
echo "📊 TEST 1: COIN ENDPOINTS COMPARISON"
echo "-----------------------------------"

echo "1a. Single Coin Endpoint (/coins/BTC/v1):"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/coins/BTC/v1" | jq '.data | keys'

echo ""
echo "1b. Coins List v1 (/coins/list/v1?symbols=BTC):"  
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/coins/list/v1?symbols=BTC&limit=1" | jq '.data[0] | keys'

echo ""
echo "1c. Coins List v2 (/coins/list/v2?symbols=BTC):"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/coins/list/v2?symbols=BTC&limit=1" | jq '.data[0] | keys'

echo ""
echo "📊 TEST 2: SOCIAL METRICS AVAILABILITY"
echo "------------------------------------"

echo "2a. Single Coin - Social Metrics:"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/coins/BTC/v1" | jq '.data | {sentiment, social_dominance, interactions_24h}'

echo ""
echo "2b. List v1 - Social Metrics:"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/coins/list/v1?symbols=BTC&limit=1" | jq '.data[0] | {sentiment, social_dominance, interactions_24h}'

echo ""
echo "2c. List v2 - Social Metrics:"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/coins/list/v2?symbols=BTC&limit=1" | jq '.data[0] | {sentiment, social_dominance, interactions_24h}'

echo ""
echo "📊 TEST 3: GRAPHQL vs RAW API COMPARISON"
echo "--------------------------------------"

echo "3a. GraphQL getCrypto Response:"
curl -s -X POST $GRAPHQL_URL \
  -H "Content-Type: application/json" \
  -d '{"query": "query { getCrypto(symbol: \"BTC\") { symbol name price sentiment social_dominance interactions_24h galaxy_score alt_rank } }"}' | jq '.data.getCrypto'

echo ""
echo "3b. Raw API List v2 Response (what GraphQL should return):"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/coins/list/v2?symbols=BTC&limit=1" | jq '.data[0] | {symbol, name, price, sentiment, social_dominance, interactions_24h, galaxy_score, alt_rank}'

echo ""
echo "✅ AUDIT COMPLETE"
echo "================="
echo "Compare the responses above to identify missing fields"
