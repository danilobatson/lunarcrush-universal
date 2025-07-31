#!/bin/bash

# Review Backend-Yoga Implementation - Deep Dive
# Understand exactly how backend-yoga handles getTopic and data flow

cd /Users/batson/Desktop/ForTheNerds/lunarcrush-universal

echo "🔍 Deep Review: Backend-Yoga Implementation"
echo "==========================================="

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
OUTPUT_FILE="analysis_outputs/backend_yoga_review_${TIMESTAMP}.json"
mkdir -p analysis_outputs

echo "📋 Step 1: Examining backend-yoga getTopic resolver implementation..."

# Look at how resolvers are actually implemented in backend-yoga
echo "🧘 Backend-yoga resolver pattern:"
if [ -f "packages/backend-yoga/src/index.ts" ]; then
    echo "---- Main resolver setup in index.ts ----"
    grep -A 20 -B 5 "getTopic" packages/backend-yoga/src/index.ts || echo "No getTopic found in index.ts"
fi

echo ""
echo "📋 Step 2: Examining the actual getTopic service function..."

echo "🌙 LunarCrush service getTopic function:"
if [ -f "packages/backend-yoga/src/services/lunarcrush.ts" ]; then
    echo "---- getTopic function implementation ----"
    sed -n '/export const getTopic/,/^};$/p' packages/backend-yoga/src/services/lunarcrush.ts
fi

echo ""
echo "📋 Step 3: Checking GraphQL schema definition..."

echo "📊 Schema definition for getTopic:"
if [ -f "schema/schema.graphql" ]; then
    echo "---- getTopic in schema.graphql ----"
    grep -A 10 -B 2 "getTopic" schema/schema.graphql || echo "getTopic not found in schema"
    
    echo ""
    echo "---- TopicDetails type definition ----"
    grep -A 20 -B 2 "type TopicDetails" schema/schema.graphql || echo "TopicDetails not found"
fi

echo ""
echo "📋 Step 4: Understanding the data flow..."

echo "🔄 Backend-yoga data flow analysis:"
echo "1. GraphQL query → resolver function"
echo "2. Resolver calls LunarCrush service"
echo "3. Service returns raw API response.data"
echo "4. GraphQL schema maps fields automatically"

# Create analysis of the actual pattern
cat > "$OUTPUT_FILE" << INNER_EOF
{
  "analysis": "Backend-Yoga Deep Review",
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "key_findings": {
    "resolver_pattern": "Simple service call, return raw data",
    "no_manual_mapping": "GraphQL schema handles field resolution",
    "return_pattern": "return response.data directly",
    "schema_driven": "All fields defined in schema.graphql"
  },
  "correction_needed": {
    "current_hono_issue": "Manually mapping fields in resolver",
    "should_be": "Return raw API response.data",
    "let_graphql_handle": "Field resolution via schema"
  },
  "next_actions": [
    "Fix getTopic resolver to return raw data",
    "Remove manual field mapping",
    "Trust GraphQL schema for field resolution",
    "Test with real API response structure"
  ]
}
INNER_EOF

echo ""
echo "📋 Step 5: Examining our current (incorrect) implementation..."

echo "❌ Current Hono getTopic resolver (with manual mapping):"
if [ -f "packages/hono/src/graphql/pure-resolvers.ts" ]; then
    grep -A 15 "getTopic:" packages/hono/src/graphql/pure-resolvers.ts
fi

echo ""
echo "✅ Analysis complete!"
echo "==================="
echo ""
echo "🎯 Key Insight: Backend-yoga just returns response.data"
echo "🔧 Fix needed: Remove manual field mapping in Hono resolver"
echo "📊 Let GraphQL schema handle field resolution"
echo ""
echo "📤 Upload analysis: $OUTPUT_FILE"
echo "📋 Next: Create fix script to simplify resolver"

