#!/bin/bash

API_KEY="utabw6d2o6flsbqhc7es88mwmdf457xf72aq8y"
BASE_URL="https://lunarcrush.com/api4/public"
GRAPHQL_URL="https://lunarcrush-universal-backend.cryptoguard-api.workers.dev/graphql"

echo "🔍 COMPREHENSIVE LUNARCRUSH ENDPOINT AUDIT"
echo "=========================================="
echo "Testing ALL 23+ endpoints for data completeness"
echo ""

# COINS ENDPOINTS
echo "🪙 COINS ENDPOINTS"
echo "=================="

echo "1. Single Coin vs List Comparison:"
echo "   /coins/BTC/v1 fields:"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/coins/BTC/v1" | jq '.data | keys | length'

echo "   /coins/list/v1 fields:"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/coins/list/v1?symbols=BTC&limit=1" | jq '.data[0] | keys | length'

echo "   /coins/list/v2 fields:"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/coins/list/v2?symbols=BTC&limit=1" | jq '.data[0] | keys | length'

echo ""
echo "2. Crypto Metadata:"
echo "   /coins/BTC/meta/v1:"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/coins/BTC/meta/v1" | jq '.data | keys | length'

echo ""
echo "3. Time Series:"
echo "   /coins/BTC/time-series/v2:"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/coins/BTC/time-series/v2" | jq '.data[0] | keys | length'

echo ""

# STOCKS ENDPOINTS  
echo "📈 STOCKS ENDPOINTS"
echo "=================="

echo "4. Stocks List Comparison:"
echo "   /stocks/list/v1 (basic account):"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/stocks/list/v1?limit=1" | jq '.data[0] | keys | length'

echo "   /stocks/list/v2 (premium account):"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/stocks/list/v2?limit=1" | jq '.data[0] | keys | length'

echo "   Check for sentiment in v1:"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/stocks/list/v1?limit=1" | jq '.data[0] | has("sentiment")'

echo "   Check for sentiment in v2:"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/stocks/list/v2?limit=1" | jq '.data[0] | has("sentiment")'

echo ""

# CREATORS ENDPOINTS
echo "👥 CREATORS ENDPOINTS"
echo "==================="

echo "5. Creators List:"
echo "   /creators/list/v1:"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/creators/list/v1?limit=1" | jq '.data[0] | keys | length'

echo ""
echo "6. Single Creator:"
echo "   /creator/x/elonmusk/v1:"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/creator/x/elonmusk/v1" | jq '.data | keys | length'

echo ""

# CATEGORIES ENDPOINTS
echo "📂 CATEGORIES ENDPOINTS"
echo "======================"

echo "7. Categories List:"
echo "   /categories/list/v1:"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/categories/list/v1?limit=1" | jq '.data[0] | keys | length'

echo ""
echo "8. Single Category:"
echo "   /category/cryptocurrencies/v1:"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/category/cryptocurrencies/v1" | jq '.data | keys | length'

echo ""

# TOPICS ENDPOINTS
echo "📝 TOPICS ENDPOINTS"  
echo "=================="

echo "9. Topic Data:"
echo "   /topic/bitcoin/v1:"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/topic/bitcoin/v1" | jq '.data | keys | length'

echo ""
echo "10. Topics List:"
echo "    /topics/list/v1:"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/topics/list/v1?limit=1" | jq '.data[0] | keys | length'

echo ""

# NFTS ENDPOINTS
echo "🖼️ NFTS ENDPOINTS"
echo "================="

echo "11. NFTs List v2:"
echo "    /nfts/list/v2:"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/nfts/list/v2?limit=1" | jq '.data[0] | keys | length'

echo ""

# POSTS ENDPOINTS
echo "📰 POSTS ENDPOINTS"
echo "=================="

echo "12. Topic Posts:"
echo "    /topic/bitcoin/posts/v1:"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/topic/bitcoin/posts/v1?limit=1" | jq '.data[0] | keys | length'

echo ""

echo "✅ BASIC AUDIT COMPLETE"
echo "======================"
echo "Now checking social metrics availability..."
echo ""

# SOCIAL METRICS DEEP DIVE
echo "🔍 SOCIAL METRICS DEEP DIVE"
echo "============================"

echo "Coins - Social Fields Available:"
echo "Single coin:"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/coins/BTC/v1" | jq '.data | {sentiment, social_dominance, interactions_24h}'

echo "List v1:"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/coins/list/v1?symbols=BTC&limit=1" | jq '.data[0] | {sentiment, social_dominance, interactions_24h}'

echo "List v2:"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/coins/list/v2?symbols=BTC&limit=1" | jq '.data[0] | {sentiment, social_dominance, interactions_24h}'

echo ""
echo "Stocks - Social Fields Available:"
echo "List v1 (basic):"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/stocks/list/v1?limit=1" | jq '.data[0] | {sentiment, social_dominance, interactions_24h}'

echo "List v2 (premium):"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/stocks/list/v2?limit=1" | jq '.data[0] | {sentiment, social_dominance, interactions_24h}'

