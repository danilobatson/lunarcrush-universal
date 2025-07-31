#!/bin/bash

# Phase 2A: Single Resolver Migration - getTopic Only (FIXED)
# Proof of concept: Port one resolver from mock to real data

cd /Users/batson/Desktop/ForTheNerds/lunarcrush-universal

echo "🎯 Phase 2A: Single Resolver Migration (getTopic) - FIXED"
echo "========================================================"

# Create analysis output directory if it doesn't exist
mkdir -p analysis_outputs

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
OUTPUT_FILE="analysis_outputs/phase2a_single_resolver_${TIMESTAMP}.json"

echo "📁 Output file: $OUTPUT_FILE"

# Create a feature branch for this focused migration
echo "🌿 Creating feature branch..."
git checkout -b feature/single-resolver-getTopic 2>/dev/null || echo "Branch may already exist or using existing"

echo "📋 Step 1: Analyzing current getTopic resolver in Hono..."

# Check current getTopic resolver (simplified)
CURRENT_RESOLVER_FOUND="false"
if [ -f "packages/hono/src/graphql/pure-resolvers.ts" ]; then
    if grep -q "getTopic:" packages/hono/src/graphql/pure-resolvers.ts; then
        CURRENT_RESOLVER_FOUND="true"
        echo "✅ Found getTopic resolver in Hono"
    fi
else
    echo "❌ Hono resolvers file not found"
fi

echo "📋 Step 2: Checking for LunarCrush service in backend-yoga..."

# Check for working getTopic function from backend-yoga
WORKING_SERVICE_FOUND="false"
if [ -f "packages/backend-yoga/src/services/lunarcrush.ts" ]; then
    if grep -q "getTopic" packages/backend-yoga/src/services/lunarcrush.ts; then
        WORKING_SERVICE_FOUND="true"
        echo "✅ Found getTopic service in backend-yoga"
    fi
else
    echo "❌ Backend-yoga LunarCrush service not found"
fi

echo "📋 Step 3: Checking environment setup..."

# Check if we have environment variables set up
ENV_STATUS="missing"
NEEDS_ENV_SETUP="true"

if [ -f ".env" ] || [ -f ".env.local" ] || [ -f "packages/hono/.env" ]; then
    ENV_STATUS="found"
    NEEDS_ENV_SETUP="false"
    echo "✅ Environment files found"
else
    echo "❌ No environment files found"
fi

echo "📋 Step 4: Examining mock data patterns..."

# Check for Math.random in getTopic
MOCK_DATA_COUNT=0
if [ -f "packages/hono/src/graphql/pure-resolvers.ts" ]; then
    MOCK_DATA_COUNT=$(grep -c "Math.random" packages/hono/src/graphql/pure-resolvers.ts)
    echo "🎲 Found $MOCK_DATA_COUNT Math.random instances in Hono resolvers"
fi

# Create the JSON analysis file directly
cat > "$OUTPUT_FILE" << INNER_EOF
{
  "phase": "Phase 2A - Single Resolver Migration (FIXED)",
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "target_resolver": "getTopic",
  "analysis": {
    "hono_gettopic_found": $CURRENT_RESOLVER_FOUND,
    "backend_yoga_service_found": $WORKING_SERVICE_FOUND,
    "environment_status": "$ENV_STATUS",
    "needs_env_setup": $NEEDS_ENV_SETUP,
    "mock_data_instances": $MOCK_DATA_COUNT
  },
  "migration_plan": {
    "target_resolver": "getTopic",
    "current_mock_pattern": "Math.random() * 50000",
    "source_service": "packages/backend-yoga/src/services/lunarcrush.ts",
    "target_location": "packages/hono/src/services/lunarcrush.ts",
    "required_functions": ["getTopic", "makeRequest", "LunarCrushConfig"],
    "environment_needed": "LUNARCRUSH_API_KEY"
  },
  "current_state": {
    "hono_resolver_file_exists": $([ -f "packages/hono/src/graphql/pure-resolvers.ts" ] && echo 'true' || echo 'false'),
    "backend_yoga_service_exists": $([ -f "packages/backend-yoga/src/services/lunarcrush.ts" ] && echo 'true' || echo 'false'),
    "schema_file_exists": $([ -f "schema/schema.graphql" ] && echo 'true' || echo 'false')
  },
  "next_steps": [
    "Create minimal LunarCrush service for Hono",
    "Set up environment variables if needed",
    "Replace getTopic mock data with real API call",
    "Test single resolver with real data",
    "Verify no performance regression"
  ],
  "success_criteria": [
    "getTopic returns real LunarCrush data",
    "No Math.random() in getTopic resolver",
    "Response time under 100ms for proof of concept",
    "Proper error handling for API failures"
  ]
}
INNER_EOF

echo ""
echo "✅ Phase 2A Analysis Complete!"
echo "=============================="
echo ""
echo "🎯 Focus: getTopic resolver only"
echo "📍 Current: Math.random() mock data"
echo "🎯 Target: Real LunarCrush API data"
echo ""
echo "📊 Analysis Summary:"
echo "  • Hono getTopic found: $CURRENT_RESOLVER_FOUND"
echo "  • Backend-yoga service found: $WORKING_SERVICE_FOUND"
echo "  • Environment setup: $ENV_STATUS"
echo "  • Mock data instances: $MOCK_DATA_COUNT"
echo ""
echo "📁 Analysis file created: $OUTPUT_FILE"
echo ""
echo "🔍 Let's also extract some actual code samples..."

# Extract actual code samples for reference
if [ -f "packages/hono/src/graphql/pure-resolvers.ts" ]; then
    echo ""
    echo "📝 Current getTopic resolver (Hono):"
    echo "=================================="
    grep -A 10 "getTopic:" packages/hono/src/graphql/pure-resolvers.ts || echo "Could not extract getTopic"
fi

if [ -f "packages/backend-yoga/src/services/lunarcrush.ts" ]; then
    echo ""
    echo "📝 Working getTopic service (Backend-yoga):"
    echo "=========================================="
    grep -A 15 "export const getTopic" packages/backend-yoga/src/services/lunarcrush.ts || echo "Could not extract getTopic service"
fi

echo ""
echo "🚀 Ready for Phase 2B - Implementation!"
echo "======================================="
echo ""
echo "📤 Upload the analysis file: $OUTPUT_FILE"
echo "📋 Next: Create implementation script"

