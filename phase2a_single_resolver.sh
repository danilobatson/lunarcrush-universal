#!/bin/bash

# Phase 2A: Single Resolver Migration - getTopic Only
# Proof of concept: Port one resolver from mock to real data

cd /Users/batson/Desktop/ForTheNerds/lunarcrush-universal

echo "🎯 Phase 2A: Single Resolver Migration (getTopic)"
echo "================================================="

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
OUTPUT_FILE="analysis_outputs/phase2a_single_resolver_${TIMESTAMP}.json"

# Create a feature branch for this focused migration
echo "🌿 Creating feature branch..."
git checkout -b feature/single-resolver-getTopic 2>/dev/null || echo "Branch may already exist"

echo "📋 Step 1: Analyzing current getTopic resolver in Hono..."

# Check current getTopic resolver
CURRENT_RESOLVER=""
if [ -f "packages/hono/src/graphql/pure-resolvers.ts" ]; then
    cd packages/hono
    # Extract just the getTopic resolver
    CURRENT_RESOLVER=$(sed -n '/getTopic:/,/^  [a-zA-Z]/p' src/graphql/pure-resolvers.ts | head -20 | jq -R -s .)
    cd ..
fi

echo "📋 Step 2: Extracting LunarCrush getTopic from backend-yoga..."

# Extract the working getTopic function from backend-yoga
WORKING_GETTOPIC=""
if [ -f "packages/backend-yoga/src/services/lunarcrush.ts" ]; then
    cd packages/backend-yoga
    # Extract getTopic function
    WORKING_GETTOPIC=$(sed -n '/export const getTopic/,/^};$/p' src/services/lunarcrush.ts | jq -R -s .)
    cd ..
fi

echo "📋 Step 3: Checking environment setup..."

# Check if we have environment variables set up
ENV_STATUS=""
NEEDS_ENV_SETUP="False"

if [ -f ".env" ] || [ -f ".env.local" ] || [ -f "packages/hono/.env" ]; then
    ENV_STATUS="found"
else
    ENV_STATUS="missing"
    NEEDS_ENV_SETUP="true"
fi

echo "📋 Step 4: Planning minimal LunarCrush service port..."

# We need to create a minimal service just for getTopic
MIGRATION_PLAN='{
  "target_resolver": "getTopic",
  "current_mock_pattern": "Math.random() * 50000",
  "source_service": "packages/backend-yoga/src/services/lunarcrush.ts",
  "target_location": "packages/hono/src/services/lunarcrush.ts",
  "required_functions": ["getTopic", "makeRequest", "LunarCrushConfig"],
  "environment_needed": "LUNARCRUSH_API_KEY"
}'

# Build analysis JSON
python3 -c "
import json

analysis = {
    'phase': 'Phase 2A - Single Resolver Migration',
    'timestamp': '$(date -u +"%Y-%m-%dT%H:%M:%SZ")',
    'target_resolver': 'getTopic',
    'current_resolver_preview': ${CURRENT_RESOLVER:-'null'},
    'working_service_preview': ${WORKING_GETTOPIC:-'null'},
    'environment_status': '${ENV_STATUS}',
    'needs_env_setup': ${NEEDS_ENV_SETUP},
    'migration_plan': ${MIGRATION_PLAN},
    'next_steps': [
        'Create minimal LunarCrush service for Hono',
        'Set up environment variables',
        'Replace getTopic mock data with real API call',
        'Test single resolver with real data',
        'Verify no performance regression'
    ],
    'success_criteria': [
        'getTopic returns real LunarCrush data',
        'No Math.random() in getTopic resolver',
        'Response time under 100ms for proof of concept',
        'Proper error handling for API failures'
    ]
}

print(json.dumps(analysis, indent=2))
" > "$OUTPUT_FILE"

echo ""
echo "✅ Phase 2A Analysis Complete!"
echo "=============================="
echo ""
echo "🎯 Focus: getTopic resolver only"
echo "📍 Current: Math.random() mock data"
echo "🎯 Target: Real LunarCrush API data"
echo ""
echo "📊 Current getTopic Mock Pattern:"
if [ -f "packages/hono/src/graphql/pure-resolvers.ts" ]; then
    grep -A 5 "getTopic:" packages/hono/src/graphql/pure-resolvers.ts | grep "Math.random" || echo "No Math.random found"
fi
echo ""
echo "🌙 Backend-yoga has working getTopic: $(grep -c "getTopic" packages/backend-yoga/src/services/lunarcrush.ts 2>/dev/null || echo "0") references"
echo ""
echo "🚀 Ready for implementation!"
echo "============================"
echo ""
echo "📤 Upload analysis file: $OUTPUT_FILE"
echo "📋 Next: Run Phase 2B - Implement Single Resolver"
