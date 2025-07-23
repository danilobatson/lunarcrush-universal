#!/bin/bash

API_KEY="utabw6d2o6flsbqhc7es88mwmdf457xf72aq8y"
BASE_URL="https://lunarcrush.com/api4/public"

echo "🧪 TESTING EACH ENDPOINT - RAW RESPONSES"
echo "========================================"

# Test 1: COINS ENDPOINTS
echo ""
echo "1️⃣ COINS/BTC/V1 (currently used by getCrypto - missing social data):"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/coins/BTC/v1" | jq '.'

echo ""
echo "2️⃣ COINS/LIST/V2 (what getCrypto SHOULD use - has social data):"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/coins/list/v2?symbols=BTC&limit=1" | jq '.'

echo ""
echo "3️⃣ COINS/BTC/META/V1 (metadata):"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/coins/BTC/meta/v1" | jq '.'

echo ""
echo "4️⃣ COINS/BTC/TIME-SERIES/V2 (price history):"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/coins/BTC/time-series/v2?limit=2" | jq '.'

echo ""
echo "5️⃣ STOCKS/LIST/V1 (basic - might be restricted):"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/stocks/list/v1?limit=1" 

echo ""
echo "6️⃣ STOCKS/LIST/V2 (premium - should work):"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/stocks/list/v2?limit=1" | jq '.'

echo ""
echo "7️⃣ CREATORS/LIST/V1 (might be restricted):"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/creators/list/v1?limit=1"

echo ""
echo "8️⃣ CREATOR/X/ELONMUSK/V1 (single creator):"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/creator/x/elonmusk/v1" | jq '.'

echo ""
echo "9️⃣ CATEGORIES/LIST/V1 (might be restricted):"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/categories/list/v1?limit=1"

echo ""
echo "🔟 CATEGORY/CRYPTOCURRENCIES/V1 (single category):"
curl -s -H "Authorization: Bearer $API_KEY" "$BASE_URL/category/cryptocurrencies/v1" | jq '.'

