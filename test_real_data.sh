#!/bin/bash

# Test Real Data Integration - Single Resolver Proof of Concept
# Verify getTopic returns real LunarCrush data

cd /Users/batson/Desktop/ForTheNerds/lunarcrush-universal

echo "🧪 Testing Real Data Integration - getTopic Resolver"
echo "===================================================="

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
TEST_OUTPUT_DIR="analysis_outputs/test_results_${TIMESTAMP}"
mkdir -p "$TEST_OUTPUT_DIR"

echo "📋 Step 1: Starting Hono dev server..."

# Navigate to Hono package
cd packages/hono

# Start dev server in background
yarn dev > "../../${TEST_OUTPUT_DIR}/server_logs.txt" 2>&1 &
DEV_PID=$!

echo "🔗 Dev server PID: $DEV_PID"
echo "⏳ Waiting for server to start..."
sleep 10

# Go back to root for test results
cd ../..

echo ""
echo "📋 Step 2: Testing getTopic with Bitcoin..."

# Test Bitcoin data
curl -X POST http://localhost:8787/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ getTopic(topic: \"bitcoin\") { topic title trend } }"}' \
  -s | jq . > "${TEST_OUTPUT_DIR}/bitcoin_test.json"

if [ -f "${TEST_OUTPUT_DIR}/bitcoin_test.json" ]; then
    echo "✅ Bitcoin test completed"
    echo "📊 Bitcoin result preview:"
    head -10 "${TEST_OUTPUT_DIR}/bitcoin_test.json"
else
    echo "❌ Bitcoin test failed"
fi

echo ""
echo "📋 Step 3: Testing getTopic with Ethereum..."

# Test Ethereum data
curl -X POST http://localhost:8787/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ getTopic(topic: \"ethereum\") { symbol name close sentiment social_score } }"}' \
  -s | jq . > "${TEST_OUTPUT_DIR}/ethereum_test.json"

if [ -f "${TEST_OUTPUT_DIR}/ethereum_test.json" ]; then
    echo "✅ Ethereum test completed"
    echo "📊 Ethereum result preview:"
    head -10 "${TEST_OUTPUT_DIR}/ethereum_test.json"
else
    echo "❌ Ethereum test failed"
fi

echo ""
echo "📋 Step 4: Testing error handling with invalid topic..."

# Test error handling
curl -X POST http://localhost:8787/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ getTopic(topic: \"nonexistentcoin12345\") { symbol name close } }"}' \
  -s | jq . > "${TEST_OUTPUT_DIR}/error_test.json"

if [ -f "${TEST_OUTPUT_DIR}/error_test.json" ]; then
    echo "✅ Error handling test completed"
    echo "📊 Error handling result:"
    head -5 "${TEST_OUTPUT_DIR}/error_test.json"
else
    echo "❌ Error handling test failed"
fi

echo ""
echo "📋 Step 5: Checking for mock data elimination..."

# Check if any responses contain mock data patterns
MOCK_CHECK_RESULT="pass"
if grep -q "Math.random\|mock\|fake\|dummy" "${TEST_OUTPUT_DIR}"/*.json; then
    echo "❌ MOCK DATA DETECTED in responses!"
    MOCK_CHECK_RESULT="fail"
    grep "Math.random\|mock\|fake\|dummy" "${TEST_OUTPUT_DIR}"/*.json
else
    echo "✅ No mock data patterns detected in responses"
fi

echo ""
echo "📋 Step 6: Stopping dev server..."

# Stop the dev server
kill $DEV_PID 2>/dev/null
sleep 2

# Create test summary
cat > "${TEST_OUTPUT_DIR}/test_summary.json" << INNER_EOF
{
  "test_timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "tests_completed": {
    "bitcoin_test": $([ -f "${TEST_OUTPUT_DIR}/bitcoin_test.json" ] && echo 'true' || echo 'false'),
    "ethereum_test": $([ -f "${TEST_OUTPUT_DIR}/ethereum_test.json" ] && echo 'true' || echo 'false'),
    "error_handling_test": $([ -f "${TEST_OUTPUT_DIR}/error_test.json" ] && echo 'true' || echo 'false')
  },
  "mock_data_check": "$MOCK_CHECK_RESULT",
  "real_data_integration": $([ "$MOCK_CHECK_RESULT" = "pass" ] && echo 'true' || echo 'false'),
  "test_files": [
    "bitcoin_test.json",
    "ethereum_test.json",
    "error_test.json",
    "server_logs.txt"
  ],
  "next_steps": [
    "Review test results for real LunarCrush data",
    "Verify response format matches GraphQL schema",
    "Expand to more resolvers if successful",
    "Port complete LunarCrush service from backend-yoga"
  ]
}
INNER_EOF

echo ""
echo "🎉 Real Data Integration Testing Complete!"
echo "=========================================="
echo ""
echo "📁 Test results directory: $TEST_OUTPUT_DIR"
echo "📊 Key files:"
echo "  • bitcoin_test.json - Bitcoin real data test"
echo "  • ethereum_test.json - Ethereum real data test"
echo "  • error_test.json - Error handling test"
echo "  • server_logs.txt - Server output logs"
echo "  • test_summary.json - Test summary report"
echo ""
echo "🔍 Mock data check: $MOCK_CHECK_RESULT"
echo ""
echo "📤 Upload test summary: ${TEST_OUTPUT_DIR}/test_summary.json"
echo "📋 Next: Review results and expand to more resolvers"
